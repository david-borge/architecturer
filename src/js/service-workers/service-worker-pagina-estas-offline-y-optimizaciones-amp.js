// Cargar Service Worker de la página de "Estás offline" (uso de PWA)
// Generar favicon maskable: https://maskable.app/editor
// Fuente con optimizaciones básicas para AMP: https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/optimize_amp/?format=websites#consider-using-a-service-worker ("check out this sample that...") y https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449
// Fuente (sin optimizaciones básicas para AMP): https://web.dev/offline-fallback-page/
// CUIDADO: los archivos JS de los Service Workers deben ir a la altura del HTML en las builds.




importScripts('https://storage.googleapis.com/workbox-cdn/releases/3.4.1/workbox-sw.js');

workbox.skipWaiting();
workbox.clientsClaim();

// TODO: Provide an URL to enable a custom offline page
const OFFLINE_PAGE = "http://192.168.1.42:3000/offline.html";

//Pre-cache the AMP Runtime
self.addEventListener('install', event => {
  const urls = [
    'https://cdn.ampproject.org/v0.js',

    // FIXME: TODO: Add AMP extensions used on your pages
    'https://cdn.ampproject.org/v0/amp-sidebar-0.1.js',
    'https://cdn.ampproject.org/v0/amp-video-0.1.js',
    'https://cdn.ampproject.org/v0/amp-script-0.1.js',
    'https://cdn.ampproject.org/v0/amp-consent-0.1.js',
    'https://cdn.ampproject.org/v0/amp-accordion-0.1.js',
    'https://cdn.ampproject.org/v0/amp-bind-0.1.js',
    'https://cdn.ampproject.org/v0/amp-install-serviceworker-0.1.js',
    
    // TODO: Add fonts, icons, logos used on your pages
    'https://fonts.gstatic.com/s/inter/v11/UcC73FwrK3iLTeHuS_fvQtMwCp50KnMa1ZL7.woff2',
    'https://davidborge.es/architecturer/img/logo/architecturer-logo-blanco.svg',
    'https://davidborge.es/architecturer/img/logo/architecturer-logo.svg',
    // 'https://davidborge.es/architecturer/video/inicio/video-movil.webm?v=3',  // FIXME: parece que añadir esta línea hace el aviso "Avoid enormous network payloads" de Lighthouse un poco peor. La verdad no se qué hace la línea.

  ];
  if (OFFLINE_PAGE) {
    urls.push(OFFLINE_PAGE);
  }

  // FIXME: esto provoca un error en la consola y que el análisis de Google Lighthouse no se pueda terminar
  event.waitUntil(
    caches.open(workbox.core.cacheNames.runtime).then(cache => cache.addAll(urls))
  );
  
});

// Enable navigation preload . This is only necessary if navigation routes are not cached,
// see: https://developers.google.com/web/tools/workbox/modules/workbox-navigation-preload
workbox.navigationPreload.enable();

// Fallback to an offline page for navgiation requests if there is no 
// network connection
let navigationStrategy;
if (OFFLINE_PAGE) {
  const networkFirstWithOfflinePage = async (args) => {
    const response = await workbox.strategies.networkFirst().handle(args);
    if ( response) {
      return response;
    }
    return caches.match(OFFLINE_PAGE);
  }
  navigationStrategy = networkFirstWithOfflinePage;
} else {
  navigationStrategy = workbox.strategies.networkFirst();
}
const navigationRoute = new workbox.routing.NavigationRoute(navigationStrategy, {
  // TODO: Optionally, provide a white/blacklist of RegExps to determine
  // which paths will match this route.
  // whitelist: [],
  // blacklist: [],
});
workbox.routing.registerRoute(navigationRoute);

// By default Use a network first strategy to ensure the latest content is used
workbox.routing.setDefaultHandler(workbox.strategies.networkFirst());

// Serve the AMP Runtime from cache and check for an updated version in the background
workbox.routing.registerRoute(
  /https:\/\/cdn\.ampproject\.org\/.*/,
  workbox.strategies.staleWhileRevalidate()
);

// Cache Images
workbox.routing.registerRoute(
  /\.(?:png|gif|jpg|jpeg|svg)$/,
  workbox.strategies.cacheFirst({
    cacheName: 'images',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Days
      }),
    ],
  }),
);

// Google Font Caching 
// see https://developers.google.com/web/tools/workbox/guides/common-recipes#google_fonts
workbox.routing.registerRoute(
  new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
  workbox.strategies.cacheFirst({
    cacheName: 'googleapis',
    plugins: [
      new workbox.cacheableResponse.Plugin({
        statuses: [0, 200]
      }),
      new workbox.expiration.Plugin({
        maxEntries: 30,
      }),
    ],
  }),
);