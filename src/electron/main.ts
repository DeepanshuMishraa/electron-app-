import { app, BrowserWindow, ipcMain } from 'electron';
import path from "path";
import { isDev } from './util.js';
import { pollResources, getStaticData } from './resourceManager.js';
import { getPreloadPath } from './pathResolver.js';
app.on("ready", () => {
  const mainWindow = new BrowserWindow({
    webPreferences: {
      preload: getPreloadPath()
    }
  });
  if (isDev()) {
    mainWindow.loadURL("http://localhost:3000");
  } else {
    mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
  }

  pollResources(mainWindow);

  ipcMain.handle("getStaticData", async () => {
    return await getStaticData();
  });
});
