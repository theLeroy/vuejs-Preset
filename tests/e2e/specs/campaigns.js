// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  beforeEach: function (browser, done) {
    browser.setAuthCookie(() => {
      done()
    })
    // console.log(browser.globals.cookie)
    // browser.url(process.env.VUE_DEV_SERVER_URL)
    //   .setCookie(browser.globals.cookie, () => {
    //     done()
    //   })
  },
  'showCampaigns': browser => {
    browser
      .url(browser.globals.test_settings.launch_url + 'campaigns')
      .waitForElementVisible('.page-container', 15000)
      .assert.elementCount('.tile', '> 1')
      .pause(100)
      .click('.tile:last-child')
      .pause(100)
      .assert.urlContains('campaign/add')
      .end()
  },
  'createCampaign': browser => {
    browser
      .url(browser.globals.test_settings.launch_url + 'campaign/add')
      .waitForElementVisible('.card', 5000)
      .setValue('input[id=name', 'Test Campaign')
      .setValue('textarea', 'some random Text')
      .click('.right button')
      .assert.urlContains('campaign/add')
      .waitForElementVisible('.selected .tile:nth-last-child(2)', 5000)
      .click('.selected .tile:first-child')
      .click('.selected .tile:first-child')
      .assert.elementCount('.unselected .tile', 2)
      .click('.unselected .tile:first-child')
      .assert.elementCount('.unselected .tile', 1)
      .click('.right button')
      .assert.urlContains('campaign/add/exercises')
      .waitForElementVisible('.selected .tile:nth-last-child(2)', 5000)
      .click('.selected .tile:first-child')
      .assert.elementCount('.unselected .tile', 1)
      .click('.right button')
      .assert.urlContains('campaign/add/overview')
      .click('.right button')
      .waitForElementVisible('.page-container', 5000)
      .waitForElementVisible('.tile:nth-last-child(2) h1', 5000)
      .assert.containsText('.tile:nth-last-child(2) h1', 'Test Campaign')
      .assert.containsText('.tile:nth-last-child(2) h3', 'some random Text')
      .click('.tile:nth-last-child(2)')
      .pause(50)
      .assert.urlContains('campaign/')
      .assert.elementCount('.tile', 2)
      .end()
  }
}
