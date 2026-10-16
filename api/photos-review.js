'use strict';

const {
  createHash,
  timingSafeEqual,
  randomUUID
} = require('node:crypto');

const hash = value =>
  createHash('sha256').update(value).digest('hex');

const reasons = ['no_animal', 'unsafe', 'rights', 'other'];

const pathOK = value =>
  typeof value === 'string' &&
  /^[0-9a-f-]{36}\.(jpg|mp4)$/.test(value);

module.exports = async function (req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  const reply = (status, body) => res.status(status).json(body);

  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return reply(405, { error: 'method_not_allowed' });
  }

  const base = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const key = process.env.SUPABASE_SECRET_KEY;
  const admin = process.env.PETS_DOGUE_ADMIN_KEY;

  if (!base || !key) {
    return reply(503, { error: 'unavailable' });
  }

  const allowedOrigins = [
    'https://www.petsanddogue.com',
    'https://petsanddogue.com'
  ];

  if (
    req.headers.origin &&
    !allowedOrigins.includes(req.headers.origin)
  ) {
    return reply(403, { error: 'forbidden' });
  }

  let body;

  try {
    body = typeof req.body === 'string'
      ? JSON.parse(req.body)
      : req.body;

    if (!body || Buffer.byteLength(JSON.stringify(body)) > 8192) {
      throw new Error();
    }
  } catch {
    return reply(400, { error: 'invalid_request' });
  }

  const headers = {
    apikey: key,
    'Content-Type': 'application/json'
  };

  if (key.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${key}`;
  }

  async function request(path, options = {}) {
    const response = await fetch(base + path, {
      ...options,
      headers: {
        ...headers,
        ...options.headers
      },
      signal: AbortSignal.timeout(15000)
    });

    if (!response.ok) {
      throw new Error('upstream');
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
  }

  const db = (path, options) =>
    request('/rest/v1/' + path, options);

  async function remove(bucket, path) {
    if (!pathOK(path)) return;

    await request('/storage/v1/object/' + bucket, {
      method: 'DELETE',
      body: JSON.stringify({
        prefixes: [path]
      })
    });
  }

  let newPublic = null;

  try {
    if (body.action === 'status') {
      if (
        !Array.isArray(body.tokens) ||
        !body.tokens.length ||
        body.tokens.length > 20 ||
        body.tokens.some(token =>
          typeof token !== 'string' ||
          !/^[a-f0-9]{64}$/.test(token)
        )
      ) {
        return reply(400, { error: 'invalid_receipt' });
      }

      const hashes = body.tokens.map(hash);

      const rows = await db(
        'pd_public_photos?' +
        new URLSearchParams({
          select: 'receipt_hash,status,rejection_reason,created_at',
          receipt_hash: `in.(${hashes.join(',')})`,
          source: 'eq.community',
          limit: '40',
          order: 'created_at.desc'
        })
      );

      return reply(200, {
        uploads: hashes.map((receiptHash, index) => ({
          index,
          items: rows
            .filter(row => row.receipt_hash === receiptHash)
            .map(row => ({
              status: row.status,
              reason: row.rejection_reason,
              created_at: row.created_at
            }))
        }))
      });
    }

    const supplied = req.headers['x-pets-dogue-admin-key'];

    if (
      !admin ||
      typeof supplied !== 'string' ||
      supplied.length > 1000 ||
      !timingSafeEqual(
        Buffer.from(hash(supplied)),
        Buffer.from(hash(admin))
      )
    ) {
      return reply(401, { error: 'unauthorized' });
    }

    if (body.action === 'list') {
      const status = ['pending', 'approved', 'blocked']
        .includes(body.status)
        ? body.status
        : 'pending';

      const offset = Number(body.offset || 0);

      if (
        !Number.isInteger(offset) ||
        offset < 0 ||
        offset > 100000
      ) {
        return reply(400, { error: 'invalid_offset' });
      }

      const rows = await db(
        'pd_public_photos?' +
        new URLSearchParams({
          select: 'id,status,media_type,image_url,storage_path,public_path,rejection_reason,created_at,review_version',
          source: 'eq.community',
          status: `eq.${status}`,
          order: 'created_at.desc,id.desc',
          limit: '21',
          offset: String(offset)
        })
      );

      const items = [];

      for (const row of rows.slice(0, 20)) {
        let url = null;

        if (row.status === 'approved') {
          url = row.image_url;
        } else if (row.status === 'pending') {
          let path = row.storage_path;

          if (
            !path &&
            row.image_url?.startsWith(
              base + '/storage/v1/object/pd-photos-review/'
            )
          ) {
            path = row.image_url.split('/').pop();
          }

          if (pathOK(path)) {
            const signed = await request(
              '/storage/v1/object/sign/pd-photos-review/' + path,
              {
                method: 'POST',
                body: JSON.stringify({
                  expiresIn: 300
                })
              }
            );

            if (signed.signedURL) {
              url = base + '/storage/v1' + signed.signedURL;
            }
          }
        }

        items.push({
          id: row.id,
          status: row.status,
          type: row.media_type,
          url,
          reason: row.rejection_reason,
          created_at: row.created_at
        });
      }

      return reply(200, {
        items,
        hasMore: rows.length > 20
      });
    }

    if (
      !['approve', 'reject', 'delete'].includes(body.action) ||
      typeof body.id !== 'string' ||
      !/^[0-9a-f-]{36}$/.test(body.id)
    ) {
      return reply(400, { error: 'invalid_request' });
    }

    if (
      body.action === 'reject' &&
      !reasons.includes(body.reason)
    ) {
      return reply(400, { error: 'invalid_reason' });
    }

    const rows = await db(
      `pd_public_photos?id=eq.${body.id}` +
      '&source=eq.community&select=*&limit=1'
    );

    const row = rows[0];

    if (!row) {
      return reply(404, { error: 'not_found' });
    }

    let privatePath = row.storage_path;

    if (
      !privatePath &&
      row.image_url?.startsWith(
        base + '/storage/v1/object/pd-photos-review/'
      )
    ) {
      privatePath = row.image_url.split('/').pop();
    }

    let oldPublic = row.public_path;

    if (
      !oldPublic &&
      row.image_url?.startsWith(
        base + '/storage/v1/object/public/pd-community-photos/'
      )
    ) {
      oldPublic = row.image_url.split('/').pop();
    }

    const patch = {
      reviewed_at: new Date().toISOString(),
      review_version: row.review_version + 1
    };

    if (body.action === 'approve') {
      if (row.status !== 'pending' || !pathOK(privatePath)) {
        return reply(409, { error: 'conflict' });
      }

      newPublic = `${randomUUID()}.${
        row.media_type === 'video' ? 'mp4' : 'jpg'
      }`;

      await request('/storage/v1/object/copy', {
        method: 'POST',
        body: JSON.stringify({
          bucketId: 'pd-photos-review',
          sourceKey: privatePath,
          destinationBucket: 'pd-community-photos',
          destinationKey: newPublic
        })
      });

      Object.assign(patch, {
        status: 'approved',
        rejection_reason: null,
        public_path: newPublic,
        image_url:
          `${base}/storage/v1/object/public/` +
          `pd-community-photos/${newPublic}`
      });
    } else {
      Object.assign(patch, {
        status: 'blocked',
        image_url: null,
        rejection_reason:
          body.action === 'delete' ? 'other' : body.reason
      });
    }

    const changed = await db(
      `pd_public_photos?id=eq.${row.id}` +
      `&review_version=eq.${row.review_version}`,
      {
        method: 'PATCH',
        headers: {
          Prefer: 'return=representation'
        },
        body: JSON.stringify(patch)
      }
    );

    if (!changed.length) {
      return reply(409, { error: 'conflict' });
    }

    newPublic = null;
    let cleanupPending = false;

    const cleanup = [
      ['pd-photos-review', privatePath],
      [
        'pd-community-photos',
        body.action === 'approve' ? null : oldPublic
      ]
    ];

    for (const [bucket, path] of cleanup) {
      try {
        await remove(bucket, path);
      } catch {
        cleanupPending = true;
        console.error('photos-review: cleanup_failed');
      }
    }

    return reply(200, {
      ok: true,
      cleanupPending
    });
  } catch {
    if (newPublic) {
      try {
        const saved = await db(
          'pd_public_photos?' +
          new URLSearchParams({
            select: 'id',
            public_path: 'eq.' + newPublic,
            limit: '1'
          })
        );

        if (saved.length) {
          newPublic = null;
        }
      } catch {
        newPublic = null;
        console.error('photos-review: uncertain_update_retained');
      }
    }

    console.error('photos-review: upstream_failed');

    return reply(503, { error: 'unavailable' });
  } finally {
    if (newPublic) {
      try {
        await remove('pd-community-photos', newPublic);
      } catch {
        console.error('photos-review: orphan_cleanup_failed');
      }
    }
  }
};
