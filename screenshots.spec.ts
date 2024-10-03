import { expect, test } from "@playwright/test";

import mapConfig from "./config.maps";
import config from "./config";

for (const [name, posAngle] of Object.entries(mapConfig)) {
  test(`#${name}#`, async ({ page }) => {
    test.setTimeout(config.timeout);
    await test.step("load FTE", async () => {
      await page.setViewportSize(config.size);
      await page.goto(`http://localhost:5173?map=${name}&posangle=${posAngle}`);
      await expect(page.locator("#fteEngineIsReady")).toBeAttached();
    });

    const fte = page.locator("#fteCanvas");

    await test.step("download map", async () => {
      await fte.press("Tab", { delay: 100 });
      await fte.press("Enter", { delay: 100 });
    });

    await test.step("set pos/angle", async () => {
      await expect(page.locator("#fteShotIsReady")).toBeAttached({
        timeout: config.mapTimeout,
      });
    });

    await test.step("save screenshot", async () => {
      await fte.screenshot({
        animations: "disabled",
        path: `./dist/${name}.jpg`,
        quality: config.quality,
        type: "jpeg",
      });
    });
  });
}
