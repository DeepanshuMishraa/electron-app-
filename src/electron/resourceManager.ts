import OsUtils from "os-utils";
import fs from "fs";
import { BrowserWindow } from "electron";

const POLLING_INTERVAL = 500;

export function pollResources(mainWindow: BrowserWindow) {
  setInterval(async () => {
    const cpuUsage = await getCPUusage();
    const memUsage = await getMemoryUsage();
    const diskUsage = await getDiskUsage();

    mainWindow.webContents.send("statistics", {
      cpu: { total: 100, usage: cpuUsage * 100 },
      mem: memUsage,
      disk: diskUsage
    });

    console.log(`CPU: ${cpuUsage * 100}% MEM: ${memUsage.usage}% DISK: ${diskUsage.usage * 100}%`);
  }, POLLING_INTERVAL);
}

export async function getStaticData() {
  return {
    cpu: { total: 100, usage: await getCPUusage() * 100 },
    mem: await getMemoryUsage(),
    disk: await getDiskUsage()
  }
}

function getCPUusage(): Promise<number> {
  return new Promise((resolve) => {
    OsUtils.cpuUsage((percentage) => {
      resolve(percentage);
    });
  });
}

async function getMemoryUsage() {
  const totalMem = OsUtils.totalmem();
  const freeMem = OsUtils.freemem();
  return {
    total: Math.floor(totalMem * 1024), // Convert to MB
    usage: Math.floor((totalMem - freeMem) * 1024) // Convert to MB
  };
}

async function getDiskUsage() {
  const stats = fs.statfsSync(process.platform === "win32" ? "C:\\" : "/");
  const total = stats.bsize * stats.blocks;
  const free = stats.bfree * stats.bsize;
  return {
    total: Math.floor(total / 1_000_000_000),
    usage: 1 - free / total
  }
}
