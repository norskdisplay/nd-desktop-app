// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process unless
// nodeIntegration is set to true in webPreferences.
// Use preload.js to selectively enable features
// needed in the renderer process.
(async () => {
	const [config, status] = await Promise.all([
		window.ipcRenderer.invoke('get-config'),
		window.ipcRenderer.invoke('get-config-status') 
	])
	window.config = config
	window.configStatus = status
})()