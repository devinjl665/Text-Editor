const butInstall = document.getElementById('buttonInstall');
let deferredPrompt;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();

    deferredPrompt = event;

    butInstall.classList.toggle('hidden', false);
});

// TODO: Implement a click event handler on the `butInstall` element

butInstall.addEventListener('click', async () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();

        const choiceResult = await deferredPrompt.userChoice;

        if (choiceResult.outcome === 'accepted') {
            console.log('Installation prompt has been accepted');
        } else {
            console.log('Installation prompt has been dismissed');
        }

        deferredPrompt = null;
    }

    butInstall.classList.toggle('hidden', false);
});

// TODO: Add an handler for the `appinstalled` event

window.addEventListener('appinstalled', (event) => {
    console.log('App installed:', event);
});
