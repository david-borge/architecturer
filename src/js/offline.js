// Script para la recarga de la página
// Fuente: https://web.dev/offline-fallback-page/




// Manual reload feature.
document.querySelector("#btn-recargar-la-pagina").addEventListener("click", () => {
    window.location.reload();
});

// Listen to changes in the network state, reload when online.
// This handles the case when the device is completely offline.
window.addEventListener('online', () => {
    window.location.reload();
});

// FIXME: esto hace que entre en un bucle continuo de recargas
// Check if the server is responding and reload the page if it is.
// This handles the case when the device is online, but the server
// is offline or misbehaving.
/* async function checkNetworkAndReload() {
    try {
    const response = await fetch('.');
    // Verify we get a valid response from the server
    if (response.status >= 200 && response.status < 500) {
        window.location.reload();
        return;
    }
    } catch {
    // Unable to connect to the server, ignore.
    }
    window.setTimeout(checkNetworkAndReload, 2500);
}
checkNetworkAndReload(); */