import { test } from "@playwright/test";

const mapSettings = [
  { name: "dm2", pos: "1891 -1322 188 21 116 0" },
  { name: "dm3", pos: "1768 -321 1 26 124 0" },
  { name: "dm4", pos: "200 -97 26; 26 303 0" },
  { name: "dm6", pos: "783 -1329 158 28 40 0" },
  { name: "e1m1", pos: "-112 704 56 20 45 0" },
  { name: "e1m2", pos: "117 303 522 29 229 0" },
  // { name: "e1m3", pos: "-544 24 176 20 225 0" },
  // { name: "e1m4", pos: "384 488 1552 26 310 0" },
  // { name: "e1m5", pos: "64 264 592 24 130 0" },
  // { name: "e1m6", pos: "48 912 248 20 315 0" },
  // { name: "e1m7", pos: "-16 384 368 20 315 0" },
];

test.beforeEach(async ({ page }) => {
  await test.step("load fte", async () => {
    await page.setViewportSize({ width: 1024, height: 768 });
    await page.goto("http://localhost:5173");
    await page.waitForTimeout(2000);
    await page.keyboard.press("Escape", { delay: 250 }); // close main menu
  });
});

for (const settings of mapSettings) {
  const { name, pos } = settings;

  test(name, async ({ page }) => {
    test.setTimeout(0);
    const fte = page.locator("#fteCanvas");

    await test.step("download map", async () => {
      await fte.evaluate(`navigator.clipboard.writeText('map ${name}')`);
      await fte.press("Control+V", { delay: 100 });
      await fte.press("Enter", { delay: 100 });

      await fte.press("Tab", { delay: 100 });
      const mapDownload = page.waitForRequest(
        `https://a.quake.world/maps/${name}.bsp`,
      );
      await fte.press("Enter");
      await mapDownload;
      await page.waitForTimeout(250);
    });

    await test.step("load pos", async () => {
      await fte.evaluate(
        `navigator.clipboard.writeText('setpos ${pos}; clear')`,
      );
      await fte.press("Control+V", { delay: 100 });
      await fte.press("Enter", { delay: 100 });
    });

    // screenshot
    await test.step("screenshot", async () => {
      await fte.press("~", { delay: 100 }); // hide console

      await page.screenshot({
        animations: "disabled",
        path: `./dist/${name}.jpg`,
        quality: 90,
        type: "jpeg",
      });
    });
  });
}
