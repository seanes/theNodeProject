module.exports = {
  '@tags': ['read'],
  'Show display page' : function (browser) {
    browser
    .url(browser.launch_url)
    .waitForElementVisible('body', 1000)
    .setValue('input[name=email]', 'test@soprasteria.com')
    .setValue('input[name=password]', ['test', browser.Keys.ENTER])
    .waitForElementVisible('.profile', 2000)
    .assert.visible('.profile')
  },
  'Display event form' : function (browser) {
    browser
      .click('.createEvent')
      .pause(1000)
      .assert.visible('.event-form')
      .end();
  }
}