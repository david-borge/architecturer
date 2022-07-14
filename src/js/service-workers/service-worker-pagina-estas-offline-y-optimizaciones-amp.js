// Cargar Service Worker de la página de "Estás offline" (uso de PWA)
// Generar favicon maskable: https://maskable.app/editor
// Fuente con optimizaciones básicas para AMP: https://github.com/ampproject/amp-sw
//                                             TODO: (no parece muy necesario, pero se puede cotillear) https://github.com/ampproject/amp-sw#modules
// (Old) Fuente con optimizaciones básicas para AMP (V1): https://amp.dev/documentation/guides-and-tutorials/optimize-and-measure/optimize_amp/?format=websites#consider-using-a-service-worker ("check out this sample that...") y https://gist.github.com/sebastianbenz/1d449dee039202d8b7464f1131eae449
// Fuente (sin optimizaciones básicas para AMP): https://web.dev/offline-fallback-page/
// CUIDADO: los archivos JS de los Service Workers deben ir a la altura del HTML en las builds.




importScripts('https://cdn.ampproject.org/sw/amp-sw.js');

AMP_SW.init({

  // cache your static assets
  assetCachingOptions: [{
    regexp: /\.(png|jpg|woff2|woff|css|js)/,
    cachingStrategy: 'CACHE_FIRST',
  }],

  // add an offline page
  offlinePageOptions: {
    url: 'https://192.168.1.42:3000/offline.html',
    assets: [],
  },

});