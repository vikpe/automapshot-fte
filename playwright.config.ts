import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  fullyParallel: true,
  workers: 6,
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        contextOptions: {
          permissions: ["clipboard-write"],
        },
      },
    },
  ],
}) satisfies PlaywrightTestConfig;
