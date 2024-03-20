const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Register a route for caching assets (stylesheets, scripts, workers) using Stale-While-Revalidate strategy
registerRoute(
  ({ request }) => ["style", "script", "worker"].includes(request.destination), // Check if the request destination is style, script, or worker
  new StaleWhileRevalidate({
    cacheName: "asset-cache", // Name of the cache to store assets
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200], // Cache responses with status 0 (offline) and 200 (successful)
      })
    ]
  })
);
