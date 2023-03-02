const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
    console.log("before install");
    event.preventDefault();
    window.deferredPrompt = event;
    butInstall.addEventListener("click", () => {
        console.log("before install click");
        event.prompt();
        butInstall.setAttribute("disabled", true);
        butInstall.textContent = "Installed";
    });
});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {
        return;
    }
    promptEvent.prompt();
    await promptEvent.userChoice;
    window.deferredPrompt = null;
    butInstall.textContent = "Installed";
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    console.log("Successfully installed!");
    window.deferredPrompt = null;
});
