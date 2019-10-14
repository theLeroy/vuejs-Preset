exports.command = function setAuthCookie (done) {
  this.url(this.globals.test_settings.launch_url)
    .setCookie(this.globals.cookie, () => {
      done()
    })
}
