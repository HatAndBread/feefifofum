const { app, BrowserWindow, Menu, ipcMain } = require("electron");
const path = require("path");

const isDev = process.env.NODE_ENV || "development";
console.log(`Environment: ${isDev ? 'Development' : 'Production'}`)

if (isDev) {
  require("electron-reload")('./dist', {
    debug: true,
    watchRenderer: true
  });
}

const htmlFile = (fileName) =>
  path.join(__dirname, "templates", `${fileName}.html`);
const preload = path.join(__dirname, "preload.js");

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload,
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(htmlFile("index"));

  mainWindow.webContents.openDevTools({ mode: "detach" });
  mainWindow.on("closed", () => {
    app.quit();
  });
};

const openNewWindow = (windowName) => {
  const newWindow = new BrowserWindow({
    webPreferences: {
      preload,
    },
  });
  newWindow.loadFile(htmlFile(windowName));
  newWindow.setTitle(windowName);
  newWindow.openDevTools(newWindow);
};

app.whenReady().then(() => {
  createWindow();
  ipcMain.on("open-window", (event, windowName) => {
    const webContents = event.sender;
    openNewWindow(windowName);
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
