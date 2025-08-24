
import { Hono } from 'hono';

const app = new Hono();

app.get('/api/health', c => c.json({ ok: true }));


export default {
	async fetch(request, env, ctx) {
			const url = new URL(request.url);

			// Log request info
			console.log("[Worker] Incoming request:", {
				method: request.method,
				url: request.url,
				pathname: url.pathname,
				headers: Object.fromEntries(request.headers.entries())
			});

			// Serve API routes
			if (url.pathname.startsWith('/api/')) {
				console.log("[Worker] Routing to API:", url.pathname);
				return app.fetch(request, env, ctx);
			}

			// Serve static assets
			const assetExts = ['.js', '.css', '.png', '.jpg', '.jpeg', '.svg', '.webp', '.ico', '.txt', '.woff', '.woff2', '.ttf', '.map'];
			if (assetExts.some(ext => url.pathname.endsWith(ext))) {
				console.log("[Worker] Routing to static asset:", url.pathname);
				return env.ASSETS.fetch(request);
			}

			// Fallback: serve SPA for all other routes
			console.log("[Worker] Fallback to SPA for:", url.pathname);
				const assetUrl = new URL('/index.html', request.url);
				const assetReq = new Request(assetUrl, request);
				const assetRes = await env.ASSETS.fetch(assetReq);
				console.log('[Worker] index.html response status:', assetRes.status);
				console.log('[Worker] index.html response headers:', Object.fromEntries(assetRes.headers.entries()));
				if (assetRes.status >= 300 && assetRes.status < 400) {
					const location = assetRes.headers.get('Location');
					console.log('[Worker] index.html redirect Location:', location);
					if (location) {
						const followUrl = new URL(location, request.url);
						return await env.ASSETS.fetch(new Request(followUrl, request));
					}
				}
				return assetRes;
		}
};
