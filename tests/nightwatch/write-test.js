module.exports = {
  '@tags': ['write'],
  'Show display page' : function (browser) {
    browser
    .url(browser.launch_url)
    .waitForElementVisible('body', 1000)
    .setValue('input[name=email]', 'test@soprasteria.com')
    .setValue('input[name=password]', ['test', browser.Keys.ENTER])
    .waitForElementVisible('.profile', 2000)
    .assert.visible('.profile')
  },
  'Display event form and submit a event' : function (browser) {
    browser
      .click('.createEvent')
      .waitForElementVisible('.event-form', 1000)
      .clearValue('input[name=capacity]')
      .setValue('input[name=name]', 'The node project: del IV')
      .setValue('textarea[name=description]', 'Join the party: The node project: del IV!')
      .setValue('input[name=capacity]', '30')
      .click('select[name="type"] option[value="Talk"]')
      .click('select[name="location"] option[value="58bc68bcc39a054344b0f989"]')
      .setValue('input[name=date]', '03-09-2017')
      .setValue('input[name=duration]', '20:00')
      .setValue('input[name=deadline]', '03-07-2017')
      .click('.submit')
      .waitForElementVisible('.event-items', 1000)
      .pause(2000)
      .assert.visible('.event-items')
      .elements('css selector', '.event-items .event-item', (result) =>{
        browser.assert.ok(result.value.length > 0);
      })
  }
}