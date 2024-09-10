require('dotenv').config();

const config = {
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    ['junit', { outputFile: 'results/test-results.xml' }],
    [
      'playwright-qase-reporter',
      {
        mode: 'report',
        debug: process.env.QASE_DEBUG,
        testops: {
          api: {
            token: process.env.QASE_TESTOPS_API_TOKEN,
          },
          project: process.env.QASE_TESTOPS_PROJECT,
          uploadAttachments: true,
          run: {
            complete: process.env.QASE_TESTOPS_RUN_COMPLETE,
          },
        },
      },
    ],
  ],
};
module.exports = config;
