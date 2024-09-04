import { expect, test } from "@playwright/test";

import mapSettings from "./map_settings";

const config = {
  timeout: 20_000,
  size: { width: 1024, height: 768 },
  quality: 90,
};

for (const [name, pos] of Object.entries(mapSettings)) {
  test(name, async ({ page }) => {
    test.setTimeout(config.timeout);
    const fte = page.locator("#fteCanvas");

    await test.step("load fte", async () => {
      await page.setViewportSize(config.size);
      await page.goto("http://localhost:5173");
      await expect(page.locator("#fteEngineIsReady")).toBeAttached();
      await page.keyboard.press("Escape", { delay: 100 }); // close main menu
    });

    await test.step("download map", async () => {
      await page.keyboard.type(`map ${name}`);
      await fte.press("Enter", { delay: 100 });
      await fte.press("Tab", { delay: 100 });
      await fte.press("Enter");
      await expect(page.locator("#fteMapIsReady")).toBeAttached();
    });

    await test.step("load pos", async () => {
      await page.keyboard.type(`setpos ${pos}; clear;`);
      await fte.press("Enter", { delay: 100 });
    });

    // screenshot
    await test.step("screenshot", async () => {
      await fte.press("~", { delay: 100 }); // hide console

      await fte.screenshot({
        animations: "disabled",
        path: `./dist/${name}.jpg`,
        quality: config.quality,
        type: "jpeg",
      });
    });
  });
}
