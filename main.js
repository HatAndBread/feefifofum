const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV || "development";
console.log(`Environment: ${isDev ? "Development" : "Production"}`);

if (isDev) {
  require("electron-reload")("./", {
    debug: true,
    watchRenderer: true,
  });
}

const backgroundColor = "#313639";

const htmlFile = (fileName) =>
  path.join(__dirname, "templates", `${fileName}.html`);
const preload = path.join(__dirname, "preload.js");

const openDevTools = (window) => {
  if (!isDev) return;
  window.webContents.openDevTools({ mode: "detach" });
};

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor,
    webPreferences: {
      preload,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(htmlFile("index"));

  openDevTools(mainWindow);
  mainWindow.on("closed", () => {
    app.quit();
  });
  return mainWindow;
};

const openNewWindow = (windowName) => {
  const newWindow = new BrowserWindow({
    backgroundColor,
    webPreferences: {
      preload,
    },
  });
  newWindow.loadFile(htmlFile(windowName));
  newWindow.setTitle(windowName);
  openDevTools(newWindow);
  return newWindow;
};

app.whenReady().then(() => {
  const mainWindow = createWindow();
  ipcMain.on("open-window", (_event, windowName) => {
    const newWindow = openNewWindow(windowName, mainWindow);
    const id = newWindow.id;
    newWindow.on("closed", () => {
      mainWindow.webContents.send("window-closed", {sender: id});
    });
    mainWindow.webContents.send("new-instrument", {
      instrument: windowName,
      sender: id,
    });
  });

  ipcMain.on("tone-message", (event, message) => {
    const webContents = event.sender;
    const win = BrowserWindow.fromWebContents(webContents);
    message.sender = win.id;
    mainWindow.webContents.send("tone-message", message);
  });

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

const fileMenu = {
  label: "File",
  submenu: [
    {
      label: "Quit",
      accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl+Q",
      click: () => {
        app.quit();
      },
    },
  ],
};

const mainMenuTemplate = [fileMenu];

if (process.platform === "darwin") mainMenuTemplate.push(fileMenu);

const menu = Menu.buildFromTemplate(mainMenuTemplate);
Menu.setApplicationMenu(menu);
