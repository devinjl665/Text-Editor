const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// Listen for the 'beforeinstallprompt' event, which is triggered when the app is ready to be installed
window.addEventListener('beforeinstallprompt', (event) => {
    // Store the event object for later use
    window.deferredPrompt = event;
    
    // Show the install button by removing the 'hidden' class
    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    // Get the stored prompt event
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    
    // Show the installation prompt
    promptEvent.prompt();
    window.deferredPrompt = null;

    // Hide the install button after installation prompt is shown
    butInstall.classList.toggle('hidden', true);
});

// TODO: Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    // Clear the stored prompt event after the app is installed
    window.deferredPrompt = null;
});

