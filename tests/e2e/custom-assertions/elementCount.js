// A custom Nightwatch assertion.
// The assertion name is the filename.
// Example usage:
//
//   browser.assert.elementCount(selector, count)
//
// For more information on custom assertions see:
// http://nightwatchjs.org/guide#writing-custom-assertions

exports.assertion = function elementCount (selector, count) {
  let match = /([><])?\s?(\d+)/.exec(count)
  let expectedNumber = Number(match[2])
  let greaterOrSmaller = match[1]
  if (greaterOrSmaller) {
    this.message = `Testing if element <${selector}> has count ${greaterOrSmaller} ${expectedNumber}`
    this.expected = `${greaterOrSmaller} ${expectedNumber}`
    if (greaterOrSmaller === '>') {
      this.pass = val => val > expectedNumber
    } else {
      this.pass = val => val < expectedNumber
    }
  } else {
    this.message = `Testing if element <${selector}> has count: ${count}`
    this.pass = val => val === expectedNumber
    this.expected = expectedNumber
  }
  this.value = res => res.value
  function evaluator (_selector) {
    return document.querySelectorAll(_selector).length
  }
  this.command = cb => this.api.execute(evaluator, [selector], cb)
}
