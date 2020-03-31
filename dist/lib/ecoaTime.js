"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.jsDateToEcoaTime = jsDateToEcoaTime;
exports.jsDateToEcoaTimeMinute = jsDateToEcoaTimeMinute;
exports.ecoaTimeToJsDate = ecoaTimeToJsDate;
exports.convJsDateToEcoaTime = convJsDateToEcoaTime;

/*
 * Converts Javascript Date to ecoaTime.
 */
function jsDateToEcoaTime(jsDate) {
  if (typeof jsDate == 'undefined') return null;
  var date = new Date(jsDate);
  var dateDecr = getRightDateForEcoatime(date);
  var yearStr = dateDecr.getFullYear();
  var monthStr = getTwoDigitString(dateDecr.getMonth() + 1);
  var dateStr = getTwoDigitString(dateDecr.getDate());
  var hours = date.getHours();
  var hoursStr = hours == 0 ? '24' : getTwoDigitString(hours);
  return yearStr + monthStr + dateStr + hoursStr + '00';
}
/*
 * Converts Javascript Date to ecoaTime including MINUTES
 */


function jsDateToEcoaTimeMinute(jsDate) {
  if (typeof jsDate == 'undefined') return null;
  var date = new Date(jsDate);
  var dateDecr = getRightDateForEcoatime(date);
  var yearStr = dateDecr.getFullYear();
  var monthStr = getTwoDigitString(dateDecr.getMonth() + 1);
  var dateStr = getTwoDigitString(dateDecr.getDate());
  var hours = date.getHours();
  var hoursStr = hours == 0 ? '24' : getTwoDigitString(hours);
  var minutesStr = getTwoDigitString(date.getMinutes());
  return yearStr + monthStr + dateStr + hoursStr + minutesStr;
} // convert ecoaTime to standard JS Date object
// 24시인 경우 23시 기준 JS Date를 구한 후 다시 1시간을 더하여 JS Date를 만든다
// 실제 시간이 2018년 1월 1일 0시일 때, EcoaTime은 2017123124 로 표현된다


function ecoaTimeToJsDate(ecoaTime) {
  if (typeof ecoaTime == 'undefined') return null;

  if (ecoaTime == 0) {
    // time is 0 when misebig failed to connect to internet
    // just return current time
    var _now = new Date();

    return new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), _now.getHours());
  }

  var hour = ecoaTime.substr(8, 2);
  var now = null;

  if (hour === '24') {
    //console.log(`hour is 24`)
    now = new Date(ecoaTime.substr(0, 4), // Year
    ecoaTime.substr(4, 2) - 1, // Month
    ecoaTime.substr(6, 2), // Date
    '23', // Hour
    ecoaTime.substr(10, 2));
    now = new Date(now.getTime() + 3600 * 1000);
  } else {
    //console.log(`hour is not 24`)
    now = new Date(ecoaTime.substr(0, 4), ecoaTime.substr(4, 2) - 1, ecoaTime.substr(6, 2), ecoaTime.substr(8, 2), ecoaTime.substr(10, 2));
  }

  return now;
}
/*
 * If it is 0 hour, date should be changed to yesterday and hour should be 24
 */


function getRightDateForEcoatime(date) {
  return date.getHours() == 0 ? new Date(date.getTime() - 24 * 3600 * 1000) : date;
}
/*
 * returns two digit string with zero padded at start if needed
 */


function getTwoDigitString(number) {
  return number < 10 ? '0' + number.toString() : number.toString();
}
/*
 * jsDate 를 ecoaTime 으로 변환
 *
 * 0시는 전날 24시로 변경한다. 
 * 예) 2일 0시는 1일 24시이다. 따라서, 2017010020000 은 201710012400 이 되도록 한다.
 */


function convJsDateToEcoaTime(jsDate) {
  var month = jsDate.getMonth() + 1;
  var hour = jsDate.getHours();
  var date = jsDate.getDate();
  date = hour === 0 ? date - 1 : date;
  hour = hour === 0 ? 24 : hour;
  console.log("getEcoaTime2: original Hour=".concat(jsDate.getHours(), ", new ").concat(month, ".").concat(date, ". ").concat(hour, ":00"));
  console.log(jsDate.getMonth() + 1 < 10 ? '0' + jsDate.getMonth() + 1 : jsDate.getMonth() + 1);
  console.log(month < 10 ? '0' + month : month);
  var ecoaTime = '' + jsDate.getFullYear() + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date) + (hour < 10 ? '0' + hour : hour) + '00';
  console.log(ecoaTime);
  return ecoaTime;
}
//# sourceMappingURL=ecoaTime.js.map