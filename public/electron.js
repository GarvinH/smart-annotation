const {
  app,
  BrowserWindow,
  protocol,
  Notification,
  ipcMain,
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

let myWindow = null;

const gotTheLock = app.requestSingleInstanceLock();

function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      webSecurity: false,
      nodeIntegration: true,
      enableRemoteModule: true,
    },
    // fullscreen: true
  });

  // and load the index.html of the app.
  win.loadURL(
    isDev
      ? "http://localhost:3000/"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );
  win.maximize();

  // Open the DevTools.
  isDev && win.webContents.openDevTools();
}

ipcMain.on("send-notification", (evt, arg) => {
  const notification = {
    title: "Message from eAnnotate: You've been idle",
    body: "Don't forget to come back!",
  };
  new Notification(notification).show();
});

app.whenReady().then(() => {
  protocol.registerFileProtocol("file", (request, callback) => {
    const pathname = decodeURI(request.url.replace("file:///", ""));
    callback(pathname);
  });
});

if (!gotTheLock) {
  app.quit();
} else {
  app.on("second-instance", (event, commandLine, workingDirectory) => {
    // Someone tried to run a second instance, we should focus our window.
    if (myWindow) {
      if (myWindow.isMinimized()) myWindow.restore();
      myWindow.focus();
    }
  });

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Create myWindow, load the rest of the app, etc...
  app.whenReady().then(() => {
    myWindow = createWindow();
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.setLoginItemSettings({
  openAtLogin: true,
});
// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
