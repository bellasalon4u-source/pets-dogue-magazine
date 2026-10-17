'use strict';

const {
  createHash,
  timingSafeEqual,
  randomUUID
} = require('node:crypto');

const sharp = require('sharp');

const languages = new Set(
  'en uk ru fr de es it pt nl pl cs sk hu ro bg el sv da no fi tr ar hi'
    .split(' ')
);

const digest = value =>
  createHash('sha256').update(value).digest();

const validId = value =>
  typeof value === 'string' &&
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/
    .test(value);

function httpsURL(value) {
  if (typeof value !== 'string' || value.length > 2048) {
    return null;
  }

  try {
    const url = new URL(value);

    return url.protocol === 'https:' &&
      !url.username &&
      !url.password
        ? url.href
        : null;
  } catch {
    return null;
  }
}

function localizedMap(value, max, isImage, base) {
  if (
    !value ||
    typeof value !== 'object' ||
    Array.isArray(value) ||
    Object.keys(value).length > 23
  ) {
    throw Error('invalid_fields');
  }

  const result = {};

  for (const [code, text] of Object.entries(value)) {
    if (
      !languages.has(code) ||
      typeof text !== 'string' ||
      text.length > max
    ) {
      throw Error('invalid_fields');
    }

    const clean = text.trim();
    if (!clean) continue;

    if (isImage) {
      const url = httpsURL(clean);

      if (
        !url ||
        !url.startsWith(
          base +
          '/storage/v1/object/public/pd-community-photos/'
        )
      ) {
        throw Error('invalid_image_url');
      }

      result[code] = url;
    } else {
      result[code] = clean;
    }
  }

  return result;
}

module.exports = async function(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const reply = (status, data) =>
    res.status(status).json(data);

  if (!['GET', 'POST'].includes(req.method)) {
    res.setHeader('Allow', 'GET, POST');
    return reply(405, {error: 'method_not_allowed'});
  }

  const base = (process.env.SUPABASE_URL || '')
    .replace(/\/$/, '');

  const key = process.env.SUPABASE_SECRET_KEY;

  if (!base || !key) {
    return reply(503, {error: 'unavailable'});
  }

  const headers = {
    apikey: key,
    'Content-Type': 'application/json'
  };

  if (key.startsWith('eyJ')) {
    headers.Authorization = 'Bearer ' + key;
  }

  async function request(path, options = {}) {
    const response = await fetch(base + path, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      },
      signal: AbortSignal.timeout(20000)
    });

    if (!response.ok) {
      if (response.status === 409) {
        throw Error('conflict');
      }

      throw Error('upstream');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  const db = (query, options) =>
    request(
      '/rest/v1/pd_photo_ads?' +
      new URLSearchParams(query),
      options
    );

  try {
    if (req.method === 'GET') {
      let lang = String(req.query?.lang || 'en')
        .toLowerCase()
        .split('-')[0];

      lang = ({
        ua: 'uk',
        cz: 'cs',
        gr: 'el',
        se: 'sv',
        dk: 'da'
      })[lang] || lang;

      if (!languages.has(lang)) lang = 'en';

      const rows = await db({
        select:
          'id,title_i18n,description_i18n,' +
          'image_urls_i18n,destination_url,after_photo',
        active: 'eq.true',
        order: 'after_photo.asc,created_at.asc,id.asc',
        limit: '200'
      });

      const ads = rows.map(row => ({
        id: row.id,
        title:
          row.title_i18n?.[lang] ||
          row.title_i18n?.en ||
          '',
        description:
          row.description_i18n?.[lang] ||
          row.description_i18n?.en ||
          '',
        image:
          row.image_urls_i18n?.[lang] ||
          row.image_urls_i18n?.en ||
          '',
        url: row.destination_url,
        after_photo: row.after_photo
      })).filter(row =>
        httpsURL(row.image) && httpsURL(row.url)
      );

      return reply(200, {ads});
    }

    const origin = req.headers.origin;

    if (
      origin &&
      ![
        'https://www.petsanddogue.com',
        'https://petsanddogue.com'
      ].includes(origin)
    ) {
      return reply(403, {error: 'forbidden'});
    }

    const admin = process.env.PETS_DOGUE_ADMIN_KEY;
    const supplied =
      req.headers['x-pets-dogue-admin-key'];

    if (
      !admin ||
      typeof supplied !== 'string' ||
      supplied.length > 1000 ||
      !timingSafeEqual(
        digest(admin),
        digest(supplied)
      )
    ) {
      return reply(401, {error: 'unauthorized'});
    }

    if (
      !(req.headers['content-type'] || '')
        .startsWith('application/json')
    ) {
      return reply(415, {error: 'invalid_format'});
    }

    let body;

    try {
      body = typeof req.body === 'string'
        ? JSON.parse(req.body)
        : req.body;

      if (
        !body ||
        typeof body !== 'object' ||
        Array.isArray(body)
      ) {
        throw Error();
      }

      if (
        Buffer.byteLength(JSON.stringify(body)) >
        1600000
      ) {
        return reply(413, {error: 'too_large'});
      }
    } catch {
      return reply(400, {error: 'invalid_request'});
    }

    if (body.action === 'list') {
      const offset = body.offset ?? 0;

      if (
        !Number.isInteger(offset) ||
        offset < 0 ||
        offset > 10000
      ) {
        return reply(400, {error: 'invalid_offset'});
      }

      const rows = await db({
        select: '*',
        order: 'created_at.desc,id.desc',
        limit: '21',
        offset: String(offset)
      });

      return reply(200, {
        items: rows.slice(0, 20),
        hasMore: rows.length > 20
      });
    }

    if (body.action === 'upload') {
      const prefix = 'data:image/jpeg;base64,';

      if (
        typeof body.image !== 'string' ||
        body.image.length > 1400000 ||
        !body.image.startsWith(prefix) ||
        !/^[A-Za-z0-9+/]+={0,2}$/.test(
          body.image.slice(prefix.length)
        )
      ) {
        return reply(400, {error: 'invalid_image'});
      }

      const input = Buffer.from(
        body.image.slice(prefix.length),
        'base64'
      );

      if (
        input.length < 100 ||
        input.length > 1000000
      ) {
        return reply(400, {error: 'invalid_image'});
      }

      let image;

      try {
        image = await sharp(input, {
          limitInputPixels: 12000000,
          failOn: 'warning'
        })
          .rotate()
          .resize(1600, 1600, {
            fit: 'inside',
            withoutEnlargement: true
          })
          .jpeg({quality: 82})
          .toBuffer();
      } catch {
        return reply(400, {error: 'invalid_image'});
      }

      if (image.length > 1000000) {
        return reply(400, {error: 'too_large'});
      }

      const path = 'ads/' + randomUUID() + '.jpg';

      await request(
        '/storage/v1/object/pd-community-photos/' +
        path,
        {
          method: 'POST',
          headers: {'Content-Type': 'image/jpeg'},
          body: image
        }
      );

      return reply(201, {
        url:
          base +
          '/storage/v1/object/public/' +
          'pd-community-photos/' +
          path
      });
    }

    if (
      !['save', 'delete'].includes(body.action) ||
      !validId(body.id)
    ) {
      return reply(400, {error: 'invalid_request'});
    }

    if (body.action === 'delete') {
      await db(
        {id: 'eq.' + body.id},
        {method: 'DELETE'}
      );

      return reply(200, {ok: true});
    }

    const data = body.ad;

    if (
      !data ||
      typeof data !== 'object' ||
      typeof data.active !== 'boolean' ||
      !Number.isInteger(data.after_photo) ||
      data.after_photo < 1 ||
      data.after_photo > 10000
    ) {
      return reply(400, {error: 'invalid_fields'});
    }

    const url = httpsURL(data.destination_url);

    if (!url) {
      return reply(400, {error: 'invalid_url'});
    }

    const title = localizedMap(
      data.title_i18n, 160, false, base
    );

    const description = localizedMap(
      data.description_i18n, 1000, false, base
    );

    const images = localizedMap(
      data.image_urls_i18n, 2048, true, base
    );

    if (data.active && (!title.en || !images.en)) {
      return reply(400, {error: 'english_required'});
    }

    const record = {
      title_i18n: title,
      description_i18n: description,
      image_urls_i18n: images,
      destination_url: url,
      after_photo: data.after_photo,
      active: data.active,
      updated_at: new Date().toISOString()
    };

    let rows;

    if (body.updated_at) {
      if (
        typeof body.updated_at !== 'string' ||
        !Number.isFinite(Date.parse(body.updated_at))
      ) {
        return reply(400, {error: 'invalid_request'});
      }

      rows = await db(
        {
          id: 'eq.' + body.id,
          updated_at: 'eq.' + body.updated_at
        },
        {
          method: 'PATCH',
          headers: {Prefer: 'return=representation'},
          body: JSON.stringify(record)
        }
      );

      if (!rows.length) {
        return reply(409, {error: 'conflict'});
      }
    } else {
      rows = await db(
        {},
        {
          method: 'POST',
          headers: {Prefer: 'return=representation'},
          body: JSON.stringify({
            ...record,
            id: body.id
          })
        }
      );
    }

    return reply(200, {item: rows[0]});
  } catch (error) {
    if (
      ['invalid_fields', 'invalid_image_url']
        .includes(error.message)
    ) {
      return reply(400, {error: error.message});
    }

    if (error.message === 'conflict') {
      return reply(409, {error: 'conflict'});
    }

    console.error('photos-ads: unavailable');
    return reply(503, {error: 'unavailable'});
  }
};
