"use strict";

var _chai = require("chai");

var _ecoaTime = require("../lib/ecoaTime");

var dateTimeStr1 = '2020-01-01 0:35:47';
var testDate1 = new Date(dateTimeStr1);
var ecoaTime1 = '201912312400';
describe('jsDateToEcoaTime 테스트', function () {
  it("\uD30C\uB77C\uBBF8\uD130\uB97C \uC9C0\uC815\uD558\uC9C0 \uC54A\uC73C\uBA74 null \uC774 \uB9AC\uD134\uB41C\uB2E4", function () {
    _chai.assert.equal((0, _ecoaTime.jsDateToEcoaTime)(), null);
  });
  it("".concat(dateTimeStr1, " \uB97C ecoaTime\uC73C\uB85C \uBCC0\uD658\uD558\uBA74 '201912312400'\uC774\uB2E4"), function () {
    _chai.assert.equal((0, _ecoaTime.jsDateToEcoaTime)(testDate1), '201912312400');
  });
});
describe('ecoaTimeToJsDate 테스트', function () {
  it("\uD30C\uB77C\uBBF8\uD130\uB97C \uC9C0\uC815\uD558\uC9C0 \uC54A\uC73C\uBA74 null \uC774 \uB9AC\uD134\uB41C\uB2E4", function () {
    _chai.assert.equal((0, _ecoaTime.ecoaTimeToJsDate)(), null);
  });
  it("".concat(ecoaTime1, " \uB97C jsDate ISO format\uC73C\uB85C \uBCC0\uD658\uD558\uBA74 '2019-12-31T15:00:00.000Z'\uC774\uB2E4"), function () {
    _chai.assert.equal((0, _ecoaTime.ecoaTimeToJsDate)(ecoaTime1).toISOString(), '2019-12-31T15:00:00.000Z');
  });
  it("".concat(ecoaTime1, " \uB97C jsDate toLocaleString\uC73C\uB85C \uBCC0\uD658\uD558\uBA74 '2020-1-1 00:00:00'\uC774\uB2E4"), function () {
    _chai.assert.equal((0, _ecoaTime.ecoaTimeToJsDate)(ecoaTime1).toLocaleString(), '2020-1-1 00:00:00');
  });
});
//# sourceMappingURL=ecoaTime.test.js.map