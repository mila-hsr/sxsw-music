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

    const pathname = url.pathname.replace(/\/+$/, '') || '/';

    // ── /schedule routes ──
    if (pathname === '/schedule' || pathname.match(/^\/schedule\/\d{4}-\d{2}-\d{2}$/)) {
      return handleSchedule(request, env, pathname, url);
    }

    // ── /music root (Discover) ──
    // Direct file requests
    if (pathname === '/artists.json' || url.searchParams.get('format') === 'json') {
      return serveAsset(env, '/artists.json', 'application/json; charset=utf-8');
    }
    if (url.searchParams.get('format') === 'md') {
      return serveAsset(env, '/index.md', 'text/markdown; charset=utf-8');
    }

    // Content negotiation for root
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

// ── Schedule handler with content negotiation ──
async function handleSchedule(request, env, pathname, url) {
  const accept = request.headers.get('Accept') || '';
  const ua = (request.headers.get('User-Agent') || '').toLowerCase();
  const isAgent = /curl|wget|python|httpie|bot|crawl/.test(ua);
  const formatParam = url.searchParams.get('format');

  // Determine which resource to serve
  const isDay = pathname.match(/^\/schedule\/(\d{4}-\d{2}-\d{2})$/);
  const date = isDay ? isDay[1] : null;

  // JSON path
  const jsonPath = date ? `/schedule/${date}.json` : '/schedule/index.json';
  // Markdown path
  const mdPath = date ? `/schedule/${date}.md` : '/schedule/index.md';
  // HTML path — always the same SPA page
  const htmlPath = '/schedule/index.html';

  // Explicit format parameter
  if (formatParam === 'json') {
    return serveAsset(env, jsonPath, 'application/json; charset=utf-8');
  }
  if (formatParam === 'md') {
    return serveAsset(env, mdPath, 'text/markdown; charset=utf-8');
  }

  // Content negotiation via Accept header
  if (accept.includes('application/json')) {
    return serveAsset(env, jsonPath, 'application/json; charset=utf-8');
  }
  if (accept.includes('text/markdown') || (isAgent && !accept.includes('text/html'))) {
    return serveAsset(env, mdPath, 'text/markdown; charset=utf-8');
  }

  // Default: HTML
  return serveAsset(env, htmlPath, 'text/html; charset=utf-8', true);
}

async function serveAsset(env, path, contentType, rewritePaths = false) {
  // Workers Assets binds to env.ASSETS
  const assetUrl = new URL(path, 'https://placeholder.workers.dev');
  const resp = await env.ASSETS.fetch(assetUrl);
  if (!resp.ok) {
    return new Response('Not found', { status: 404, headers: corsHeaders() });
  }
  let body = await resp.text();
  if (rewritePaths) {
    // Rewrite relative paths for /music/ prefix
    body = body.replace(/fetch\(['"]\.\/artists\.json['"]\)/g, "fetch('/music/artists.json')");
    body = body.replace(/fetch\(['"]\.\/schedule\//g, "fetch('/music/schedule/");
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
