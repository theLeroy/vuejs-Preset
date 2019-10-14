// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'login': browser => {
    browser
      .url(browser.globals.test_settings.launch_url)
      .waitForElementVisible('#app', 5000)
      .waitForElementVisible('.login-container', 5000)
      .assert.elementPresent('.login-container')
      .setValue('input[name=email]', 'admin@swisscom.com')
      .setValue('input[name=password]', 'admin')
      .click('button')
      .waitForElementVisible('.home', 5000)
      .getCookies(cookies => {
        console.log('cookies')
        console.log(cookies)
      })
      .getCookie('AccessToken', cookie => {
        // console.log('cookies')
        // console.log(cookies)
        browser.globals.cookie = cookie
        console.log(browser.globals.cookie)
        browser.assert.containsText('p', 'I am not affected by the dark mode.')
          .end()
      })
  }
}
