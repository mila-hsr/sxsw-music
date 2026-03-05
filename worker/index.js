// SXSW Music Worker - Content Negotiation
// Serves HTML, Markdown, or JSON based on Accept header / query params

const ORIGIN = 'https://mila-hsr.github.io/sxsw-music/dist';

export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname.replace(/\/+$/, '') || '/music';

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders() });
    }

    // Direct file requests
    if (path.endsWith('/artists.json') || url.searchParams.get('format') === 'json') {
      return serve(`${ORIGIN}/artists.json`, 'application/json; charset=utf-8');
    }
    if (url.searchParams.get('format') === 'md') {
      return serve(`${ORIGIN}/index.md`, 'text/markdown; charset=utf-8');
    }

    // Content negotiation
    const accept = request.headers.get('Accept') || '';
    const ua = (request.headers.get('User-Agent') || '').toLowerCase();
    const isAgent = /curl|wget|python|httpie|bot|crawl/.test(ua);

    if (accept.includes('application/json')) {
      return serve(`${ORIGIN}/artists.json`, 'application/json; charset=utf-8');
    }
    if (accept.includes('text/markdown') || (isAgent && !accept.includes('text/html'))) {
      return serve(`${ORIGIN}/index.md`, 'text/markdown; charset=utf-8');
    }

    // Default: HTML
    return serve(`${ORIGIN}/index.html`, 'text/html; charset=utf-8');
  }
};

async function serve(url, contentType) {
  const resp = await fetch(url);
  if (!resp.ok) {
    return new Response('Not found', { status: 404, headers: corsHeaders() });
  }
  const body = await resp.text();
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
