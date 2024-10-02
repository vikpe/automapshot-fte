import {
  defineConfig,
  devices,
  type PlaywrightTestConfig,
} from "@playwright/test";

// https://playwright.dev/docs/test-configuration
export default defineConfig({
  fullyParallel: true,
  workers: 1,
  webServer: {
    command: "yarn dev",
  },
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],
}) satisfies PlaywrightTestConfig;
