require('dotenv').config();

const config = {
  use: {
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  reporter: [
    ['list'],
    [
      'playwright-qase-reporter',
      {
        debug: process.env.QASE_DEBUG,
        testops: {
          api: {
            token: process.env.QASE_API_TOKEN,
          },
          project: 'QD',
          uploadAttachments: true,
          run: {
            complete: false,
          },
        },
      },
    ],
  ],
};
module.exports = config;
