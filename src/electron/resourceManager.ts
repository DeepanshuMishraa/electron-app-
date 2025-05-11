import OsUtils from "os-utils";
import fs from "fs";

const POLLING_INTERVAL = 500;

export function pollResources() {
  setInterval(async () => {
    await getCPUusage();
    const memUsgae = await getMemoryUsage();
    const diskUsage = await getDiskUsage();
    console.log(`MEM: ${memUsgae}% DISK: ${diskUsage.usage}%`);
  }, POLLING_INTERVAL);
}


async function getCPUusage() {
  return await OsUtils.cpuUsage((perchantage) => {
    console.log(`CPU: ${perchantage}%`);
  });
}


async function getMemoryUsage() {
  return await 1 - OsUtils.freememPercentage();
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
