"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getEcoaTime = getEcoaTime;
exports.getEcoaTime2 = getEcoaTime2;
exports.toEcoaTime = toEcoaTime;
exports.getKstLambdaDate = getKstLambdaDate;
exports.ecoaTimeToJsDate = ecoaTimeToJsDate;
exports.dateToUserFriendly = dateToUserFriendly;

// This function has bugs. Use toEcoaTime(). 2018.1.15
function getEcoaTime(date) {
  var ecoaTime = '' + date.getFullYear() + (date.getMonth() + 1 < 10 ? '0' + date.getMonth() + 1 : date.getMonth() + 1) + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + '00';
  return ecoaTime;
} // 0시는 전날 24시로 변경한다. 
// 예) 2일 0시는 1일 24시이다. 따라서, 2017010020000 은 201710012400 이 되도록 한다.


function getEcoaTime2(dateTime) {
  var month = dateTime.getMonth() + 1;
  var hour = dateTime.getHours();
  var date = dateTime.getDate();
  date = hour === 0 ? date - 1 : date;
  hour = hour === 0 ? 24 : hour;
  console.log("getEcoaTime2: original Hour=".concat(dateTime.getHours(), ", new ").concat(month, ".").concat(date, ". ").concat(hour, ":00"));
  console.log(dateTime.getMonth() + 1 < 10 ? '0' + dateTime.getMonth() + 1 : dateTime.getMonth() + 1);
  console.log(month < 10 ? '0' + month : month);
  var ecoaTime = '' + dateTime.getFullYear() + (month < 10 ? '0' + month : month) + (date < 10 ? '0' + date : date) + (hour < 10 ? '0' + hour : hour) + '00';
  console.log(ecoaTime);
  return ecoaTime;
}

function toEcoaTime(t) {
  //console.log(`    toEcoaTime(${t})`);
  var date = new Date(t); //console.log(`      ${date.toLocaleString()}`);
  //console.log(`toEcoaTime: date.getHours():`,date.getHours())

  var dateDecr = null;

  if (date.getHours() == 0) {
    dateDecr = new Date(date.getTime() - 24 * 3600 * 1000);
  } else {
    dateDecr = date;
  }

  var month = '';

  if (dateDecr.getMonth() < 9) {
    month = '0' + (dateDecr.getMonth() + 1);
  } else {
    month = '' + (dateDecr.getMonth() + 1);
  }

  var dateStr = '';

  if (dateDecr.getDate() < 10) {
    dateStr = '0' + dateDecr.getDate();
  } else {
    dateStr = '' + dateDecr.getDate();
  }

  var hoursStr = '';

  if (date.getHours() == 0) {
    hoursStr = '24';
  } else if (date.getHours() < 10) {
    hoursStr = '0' + date.getHours();
  } else {
    hoursStr = '' + date.getHours();
  }

  return dateDecr.getFullYear() + '' + month + dateStr + hoursStr + '00';
}

function getKstLambdaDate() {
  var utcTime = new Date(); // In Lambda, time is UTC unlike EC2 instance

  var kstTime = new Date(utcTime.getTime() + 9 * 60 * 60 * 1000);
  return kstTime;
} // convert ecoaTime to standard JS Date object
// 24시인 경우 23시 기준 JS Date를 구한 후 다시 1시간을 더하여 JS Date를 만든다
// 실제 시간이 2018년 1월 1일 0시일 때, EcoaTime은 2017123124 로 표현된다


function ecoaTimeToJsDate(time) {
  if (time == 0) {
    // time is 0 when misebig failed to connect to internet
    // just return current time
    var _now = new Date();

    return new Date(_now.getFullYear(), _now.getMonth(), _now.getDate(), _now.getHours());
  }

  var hour = time.substr(8, 2);
  var now = null;

  if (hour === '24') {
    //console.log(`hour is 24`)
    now = new Date(time.substr(0, 4), // Year
    time.substr(4, 2) - 1, // Month
    time.substr(6, 2), // Date
    '23', // Hour
    time.substr(10, 2));
    now = new Date(now.getTime() + 3600 * 1000);
  } else {
    //console.log(`hour is not 24`)
    now = new Date(time.substr(0, 4), time.substr(4, 2) - 1, time.substr(6, 2), time.substr(8, 2), time.substr(10, 2));
  }

  return now;
} // Type 1: 4/23(월) 19:00 에서 분을 항상 00 으로 함
// Type 2: 4/23(월) 19:23 분까지 표시함
// Type 3: 4/23(월) 19시 로 시간까지만 표시함
// Type 4: 4/23(월) 19시 발표(18시 측정) 기준
// Type 5: 2019년 4/23(월)
// Type 6: 2019년 4/23(월) 17시 발표
// Type 7: 2019.4.23(월) 07:00
// Type 8: 2019.4.23(Mon) 07:00 English version of type 7
// Type 9: 2019.4.23(Mon) 08:00 UTC time
// Type 10: 19:00 


function dateToUserFriendly(date, type) {
  var krDays = ['(일)', '(월)', '(화)', '(수)', '(목)', '(금)', '(토)'];
  var enDays = ['(Sun)', '(Mon)', '(Tue)', '(Wed)', '(Thu)', '(Fri)', '(Sun)']; //console.log(`time.dateToUserFriendly(): date: `, date.toString())

  var finalDateStr = '';
  var monthDateDayStr = date.getMonth() + 1 + '/' + date.getDate() + krDays[date.getDay()];
  var hour = date.getHours();
  var twoDigitHour = hour < 10 ? '0' + hour : hour;
  var hourStr = hour.toString();
  var min = date.getMinutes();

  switch (type) {
    case 1:
      finalDateStr = monthDateDayStr + ' ' + hourStr + ':00';
      break;

    case 2:
      finalDateStr = monthDateDayStr + ' ' + hourStr + ':' + (min < 10 ? '0' + min : min);
      break;

    case 3:
      finalDateStr = monthDateDayStr + ' ' + hourStr + '시';
      break;

    case 4:
      var measureTime = new Date(date.getTime() - 1000 * 3600);

      var _hour = measureTime.getHours();

      finalDateStr = monthDateDayStr + ' ' + hourStr + '시 발표 (' + _hour + '시 측정)';
      break;

    case 5:
      finalDateStr = date.getFullYear() + '년' + ' ' + monthDateDayStr;
      break;

    case 6:
      finalDateStr = date.getFullYear() + '년' + ' ' + monthDateDayStr + ' ' + hourStr + '시 발표';
      break;

    case 7:
      finalDateStr = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + krDays[date.getDay()] + ' ' + twoDigitHour + ':00';
      break;

    case 8:
      finalDateStr = date.getFullYear() + '.' + (date.getMonth() + 1) + '.' + date.getDate() + enDays[date.getDay()] + ' ' + twoDigitHour + ':00';
      break;

    case 9:
      var utcHour = date.getUTCHours();
      var finalUtcHour = utcHour < 10 ? '0' + utcHour : utcHour;
      finalDateStr = date.getUTCFullYear() + '.' + (date.getUTCMonth() + 1) + '.' + date.getUTCDate() + enDays[date.getUTCDay()] + ' ' + finalUtcHour + ':00';
      break;

    case 10:
      finalDateStr = hourStr + ':00';
      break;

    default:
  }

  return finalDateStr;
}
/*
module.exports = {
    getEcoaTime,
    getEcoaTime2,
    toEcoaTime,
    getKstLambdaDate,
    dateToUserFriendly,
    ecoaTimeToJsDate,
}
*/