module.exports = {

  '@tags': ['smoke'],
  'Show display page' : function (browser) {
    browser
    .url(browser.launch_url)
    .waitForElementVisible('body', 1000)
    .assert.visible("body")
    .assert.title("TheNodeProject")
    .end()
  }

}