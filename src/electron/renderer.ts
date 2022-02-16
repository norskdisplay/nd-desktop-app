// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
(async () => {
	const [availablePorts, config] = await Promise.all([
		window.ipcRenderer.invoke('get-available-serial-ports'),
		window.ipcRenderer.invoke('get-config') 
	])
	window.availablePorts = availablePorts
	window.config = config
})()