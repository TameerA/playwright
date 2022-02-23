


import { PlaywrightTestConfig, devices } from '@playwright/test';


const config: PlaywrightTestConfig = {
    timeout:240000,
    globalTimeout: 18000000,
    reporter: [
      ["./my-reporter.ts"],
      ["list"],
      ["junit", {outputFile: "reports/test-results.xml"}],
      ["allure-playwright"],
      ['json', {outputFile: 'reports/test-results.json'}],
      ['html', {open: 'never'}]
  ],
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  use: {
    browserName: 'chromium',
    trace: 'off',
    screenshot: 'on',
    // viewport: {width: 1400, height: 900},
    video: {
        mode: "on",
        size: {
            width: 1400,
            height: 900,
        }
    },
    contextOptions: {},
    // Browser options
    launchOptions: {
        channel: 'chromium',
        headless: false,
        slowMo: 200,

    },
},
 
  // projects: [
  //   {
  //     name: 'chrome',
  //     use: { ...devices['Desktop Chrome'] },
  //   },
  // ],
 
};
export default config;



/*
import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    channel: 'chrome',
  },
};
export default config;
*/

/*
  {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
*/





// import { PlaywrightTestConfig, devices } from '@playwright/test';


// const config: PlaywrightTestConfig = {
//     timeout: 5 * 60 * 1000,
//   forbidOnly: !!process.env.CI,
//   retries: process.env.CI ? 2 : 0,
//   use: {
//     trace: 'on-first-retry',
//     headless: false,
//   },
//   projects: [
//     {
//       name: 'chrome',
//       use: { ...devices['Desktop Chrome'] },
//     },
//     {
//       name: 'firefox',
//       use: { ...devices['Desktop Firefox'] },
//     },
//     {
//       name: 'webkit',
//       use: { ...devices['Desktop Safari'] },
//     },
//   ],
 
// };
// export default config;



/*
import { PlaywrightTestConfig } from '@playwright/test';
const config: PlaywrightTestConfig = {
  use: {
    channel: 'chrome',
  },
};
export default config;
*/

