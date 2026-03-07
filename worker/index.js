// SXSW Music Worker - Content Negotiation with Workers Assets
// Static files served via [assets] in wrangler.toml
// This worker handles content negotiation for non-static requests

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    // Direct file requests
    if (url.pathname.endsWith('/artists.json') || url.searchParams.get('format') === 'json') {
      return serveAsset(env, '/artists.json', 'application/json; charset=utf-8');
    }
    if (url.searchParams.get('format') === 'md') {
      return serveAsset(env, '/index.md', 'text/markdown; charset=utf-8');
    }

    // Content negotiation
    const accept = request.headers.get('Accept') || '';
    const ua = (request.headers.get('User-Agent') || '').toLowerCase();
    const isAgent = /curl|wget|python|httpie|bot|crawl/.test(ua);

    if (accept.includes('application/json')) {
      return serveAsset(env, '/artists.json', 'application/json; charset=utf-8');
    }
    if (accept.includes('text/markdown') || (isAgent && !accept.includes('text/html'))) {
      return serveAsset(env, '/index.md', 'text/markdown; charset=utf-8');
    }

    // Default: HTML (rewrite relative paths to absolute /music/ paths)
    return serveAsset(env, '/index.html', 'text/html; charset=utf-8', true);
  }
};

async function serveAsset(env, path, contentType, rewritePaths = false) {
  // Workers Assets binds to env.ASSETS
  const assetUrl = new URL(path, 'https://placeholder.workers.dev');
  const resp = await env.ASSETS.fetch(assetUrl);
  if (!resp.ok) {
    return new Response('Not found', { status: 404, headers: corsHeaders() });
  }
  let body = await resp.text();
  if (rewritePaths) {
    body = body.replace(/fetch\(['"]\.\/artists\.json['"]\)/g, "fetch('/music/artists.json')");
  }
  return new Response(body, {
    headers: {
      'Content-Type': contentType,
      'Vary': 'Accept, User-Agent',
      'Cache-Control': 'public, max-age=300',
      ...corsHeaders(),
    }
  });
}

function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Accept, Content-Type',
  };
}
