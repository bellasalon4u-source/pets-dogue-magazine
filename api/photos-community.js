const send = (res, status, body) => res.status(status).json(body);

module.exports = async function handler(req, res) {
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return send(res, 405, { error: 'method_not_allowed' });
  }

  const base = (process.env.SUPABASE_URL || '').replace(/\/$/, '');
  const key = process.env.SUPABASE_SECRET_KEY || '';

  if (!base || !key) {
    return send(res, 503, { error: 'unavailable' });
  }

  const headers = { apikey: key };

  if (key.startsWith('eyJ')) {
    headers.Authorization = `Bearer ${key}`;
  }

  const read = async (table, params) => {
    const response = await fetch(`${base}/rest/v1/${table}?${params}`, {
      headers,
      signal: AbortSignal.timeout(15000)
    });

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
      const issues = await read('pd_photo_issues', new URLSearchParams({
        select: 'id,number,cover_url',
        published: 'eq.true',
        order: 'number.desc',
        limit: '200'
      }));

      return send(res, 200, { issues });
    }

    if (!['community', 'magazine'].includes(mode)) {
      return send(res, 400, { error: 'invalid_mode' });
    }

    const offset = String(req.query.offset || '0');

    if (!/^\d{1,6}$/.test(offset) || Number(offset) > 100000) {
      return send(res, 400, { error: 'invalid_offset' });
    }

    const params = new URLSearchParams({
      select: 'id,image_url,created_at,media_type',
      status: 'eq.approved',
      source: `eq.${mode}`,
      order: 'created_at.desc,id.desc',
      limit: '31',
      offset
    });

    if (mode === 'magazine') {
      const issue = req.query.issue;

      if (
        typeof issue !== 'string' ||
        !/^[a-z0-9-]{1,80}$/.test(issue)
      ) {
        return send(res, 400, { error: 'invalid_issue' });
      }

      const published = await read(
        'pd_photo_issues',
        new URLSearchParams({
          select: 'id',
          id: `eq.${issue}`,
          published: 'eq.true',
          limit: '1'
        })
      );

      if (!published.length) {
        return send(res, 404, { error: 'not_found' });
      }

      params.set('issue_id', `eq.${issue}`);
    }

    const rows = await read('pd_public_photos', params);

    return send(res, 200, {
      photos: rows.slice(0, 30),
      hasMore: rows.length > 30
    });
  } catch {
    return send(res, 502, {
      error: 'temporarily_unavailable'
    });
  }
};
