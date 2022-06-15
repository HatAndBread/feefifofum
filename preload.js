const { contextBridge, ipcRenderer } = require('electron')

document.addEventListener('DOMContentLoaded', () => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "../dist/output.css";
  document.head.appendChild(link);
  console.log(document.head);
});

contextBridge.exposeInMainWorld('API', {
    openWindow: (windowName) => ipcRenderer.send('open-window', windowName)
});
