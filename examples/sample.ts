import { app, BrowserWindow } from "electron";
import * as path from "path";
import Splash from '../src/main';

let mainWindow: Electron.BrowserWindow;


function createWindow() {
  // Create the browser window with default `show: false`.
  mainWindow = new BrowserWindow({ width: 800, height: 400, show: false });
  // and load the index.html of the app.
  mainWindow.loadURL('https://techcrunch.com/')
  // configure splash screen.
  var splash = new Splash({
    title: "Web",
    description: "my super cool app",
    color: "#000"
  });
  // start splash screen.
  var splashInstance = splash.start();

  // Emmited once when window is ready to be shown.
  mainWindow.once('ready-to-show', () => {
    // destroy our splash instance.
    splashInstance.destroy();
    // show our main app.
    mainWindow.show();
  })
  // Emitted when the window is closed.
  mainWindow.on("closed", () => {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it"s common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
