const { createHash } = require('node:crypto');

const issueCatalog = {
  "issue-01": [
    "/file_00000000a9d471fda9b4629589be22a9.png",
    "/miso-cover-star-retouched.png",
    "/miso-03.jpg",
    "/miso-07.jpg",
    "/miso-16.jpg",
    "/pablo-01-portrait.jpg",
    "/pablo-02.jpg",
    "/pablo-03.jpg",
    "/pablo-04.jpg",
    "/jessica-02-milk.jpg",
    "/jessica-03-white-bed.jpg",
    "/jessica-05-garden-cocoon.jpg",
    "/jessica-04-window-bed.jpg",
    "/richie-pi-03.jpg",
    "/richie-pi-01.jpg",
    "/richie-pi-02.jpg",
    "/richie-pi-06.jpg",
    "/richie-pi-07.jpg",
    "/richie-pi-04.jpg",
    "/richie-pi-05.jpg",
    "/miso-20.jpg",
    "/miso-06.jpg",
    "/miso-04.jpg",
    "/miso-09.jpg",
    "/miso-london-big-ben.jpg",
    "/miso-with-friend.jpg",
    "/miso-sea-editorial-1.jpg",
    "/miso-15.jpg",
    "/pablo-05.jpg",
    "/pablo-01.jpg",
    "https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1583511655826-05700d52f4d9?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1544568100-847a948585b9?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1601758177266-bc599de87707?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=max&w=1600&q=85",
    "/69922.jpg",
    "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1601758174114-e711c0cbaa69?auto=format&fit=max&w=1600&q=85",
    "https://images.unsplash.com/photo-1558788353-f76d92427f16?auto=format&fit=max&w=1600&q=85",
    "/69232.jpg",
    "/72583.jpg",
    "/69226.jpg",
    "/egypt-mau-full.jpg",
    "/71599.jpg",
    "/69254.jpg",
    "/69220.jpg",
    "/71315.jpg",
    "/cleomoray-generated.jpg",
    "/70116.jpg",
    "/69938.jpg",
    "/69918.jpg",
    "/69927.jpg",
    "/69945.jpg",
    "/71569.jpg",
    "/69243.jpg",
    "/69238.jpg",
    "/69215.jpg",
    "/69221.jpg",
    "/egypt-dolphins-reef.jpg",
    "/egypt-dolphins-pair.jpg",
    "/egypt-dolphins-surface.jpg",
    "/70110.jpg",
    "/70117.jpg",
    "/70674.jpg",
    "/69948.jpg",
    "/69919.jpg",
    "/69920.jpg",
    "/69921.jpg",
    "/69924.jpg",
    "/69925.jpg",
    "/69935.jpg",
    "/69936.jpg",
    "/69983.jpg",
    "/69984.jpg",
    "/70671.jpg",
    "/70673.jpg",
    "/69942.jpg",
    "/69943.jpg",
    "/70766.jpg",
    "/70770.jpg",
    "/70771.jpg",
    "/71564.jpg",
    "/71566.jpg",
    "/71567.jpg",
    "/71570.jpg",
    "/71581.jpg",
    "/71592.jpg",
    "/71593.jpg",
    "/71595.jpg",
    "/71596.jpg",
    "/71597.jpg",
    "/72031.jpg",
    "/72032.jpg",
    "/72568.jpg",
    "/72576.jpg",
    "/72580.jpg",
    "/72582.jpg",
    "/72584.jpg",
    "/72585.jpg",
    "/72587.jpg",
    "/69228.jpg",
    "/69229.jpg",
    "/69230.jpg",
    "/69231.jpg",
    "/69248.jpg",
    "/69252.jpg",
    "/69256.jpg",
    "/69216.jpg",
    "/69222.jpg",
    "/70112.jpg",
    "/70113.jpg",
    "/70114.jpg",
    "/70119.jpg"
  ]
};

const send = (res, status, body) =>
  res.status(status).json(body);

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, {
      error:'method_not_allowed'
    });
  }

  const base = (process.env.SUPABASE_URL || '')
    .replace(/\/$/, '');

  const key = process.env.SUPABASE_SECRET_KEY || '';

  if (!base || !key) {
    return send(res, 503, {error:'unavailable'});
  }

  const headers = {apikey:key};

  if (key.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${key}`;
  }

  const read = async (table, params) => {
    const response = await fetch(
      `${base}/rest/v1/${table}?${params}`,
      {
        headers,
        signal:AbortSignal.timeout(15000)
      }
    );

    if (!response.ok) {
      throw new Error('database_error');
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error('invalid_response');
    }

    return data;
  };

  try {
    const mode = req.query.mode || 'community';

    if (mode === 'issues') {
      const issues = await read(
        'pd_photo_issues',
        new URLSearchParams({
          select:'id,number,cover_url',
          published:'eq.true',
          order:'number.desc',
          limit:'200'
        })
      );

      return send(res, 200, {issues});
    }

    if (!['community','magazine'].includes(mode)) {
      return send(res, 400, {error:'invalid_mode'});
    }

    const offset = String(req.query.offset || '0');

    if (
      !/^\d{1,6}$/.test(offset) ||
      Number(offset) > 100000
    ) {
      return send(res, 400, {error:'invalid_offset'});
    }

    const params = new URLSearchParams({
      select:'id,image_url,created_at,media_type',
      status:'eq.approved',
      source:`eq.${mode}`,
      order:'created_at.desc,id.desc',
      limit:'31',
      offset
    });

    if (mode === 'magazine') {
      const issue = req.query.issue;

      if (
        typeof issue !== 'string' ||
        !/^[a-z0-9-]{1,80}$/.test(issue)
      ) {
        return send(res, 400, {error:'invalid_issue'});
      }

      const published = await read(
        'pd_photo_issues',
        new URLSearchParams({
          select:'id',
          id:`eq.${issue}`,
          published:'eq.true',
          limit:'1'
        })
      );

      if (!published.length) {
        return send(res, 404, {error:'not_found'});
      }

      params.set('issue_id', `eq.${issue}`);
      params.set('limit', '5000');
      params.delete('offset');

      const saved = await read('pd_public_photos', params);
      const combined = [];
      const seen = new Set();

      const canonical = value => {
        try {
          const url = new URL(
            value,
            'https://www.petsanddogue.com'
          );

          if (url.protocol !== 'https:') return '';

          return [
            'www.petsanddogue.com',
            'petsanddogue.com'
          ].includes(url.hostname)
            ? url.pathname
            : url.origin + url.pathname;
        } catch {
          return '';
        }
      };

      for (const row of saved) {
        const url = canonical(row.image_url);

        if (!url || seen.has(url)) continue;

        seen.add(url);
        combined.push(row);
      }

      for (const imageURL of issueCatalog[issue] || []) {
        const url = canonical(imageURL);

        if (!url || seen.has(url)) continue;

        seen.add(url);

        combined.push({
          id:'editorial-' + createHash('sha256')
            .update(issue + ':' + url)
            .digest('hex')
            .slice(0,24),
          image_url:imageURL,
          media_type:'image',
          created_at:null
        });
      }

      const start = Number(offset);

      return send(res, 200, {
        photos:combined.slice(start, start + 30),
        hasMore:combined.length > start + 30,
        total:combined.length
      });
    }

    const rows = await read('pd_public_photos', params);

    return send(res, 200, {
      photos:rows.slice(0,30),
      hasMore:rows.length > 30
    });
  } catch {
    return send(res, 502, {
      error:'temporarily_unavailable'
    });
  }
};
