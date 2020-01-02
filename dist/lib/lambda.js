"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getKstLambdaDate = getKstLambdaDate;

function getKstLambdaDate() {
  var utcTime = new Date(); // In Lambda, time is UTC unlike EC2 instance

  var kstTime = new Date(utcTime.getTime() + 9 * 60 * 60 * 1000);
  return kstTime;
}
//# sourceMappingURL=lambda.js.map