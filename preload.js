const { contextBridge, ipcRenderer } = require("electron");

const messageTypes = ["tone-message", "new-instrument", "window-closed"];

const listenFunctions = messageTypes.map(
  (x) => () => {
    ipcRenderer.on(x, (_, message) => {
      document.dispatchEvent(new CustomEvent(x, { detail: message }));
    });
  }
);

const addStyle = () => {
  const link = document.createElement("link");
  link.type = "text/css";
  link.rel = "stylesheet";
  link.href = "../dist/output.css";
  document.head.appendChild(link);
};

const dashboardSetup = () => listenFunctions.forEach((f) => f());

document.addEventListener("DOMContentLoaded", () => {
  addStyle();
  document.title.toLowerCase() === "dashboard" && dashboardSetup();
});

contextBridge.exposeInMainWorld("API", {
  openWindow: (windowName) => ipcRenderer.send("open-window", windowName),
  toneMessage: (message) => ipcRenderer.send("tone-message", message),
});

contextBridge.exposeInMainWorld('MESSAGE_TYPES', messageTypes);
