"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dateToUserFriendly = dateToUserFriendly;

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var krDays = ['일', '월', '화', '수', '목', '금', '토'];
var enDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var validFormats = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1'];

function dateToUserFriendly(jsDate, format, option) {
  var defaultOption = {
    lang: 'ko',
    timezone: {
      type: 'device'
    },
    isPublished: true
  };
  var finalOption = option ? _objectSpread({}, defaultOption, {}, option) : defaultOption;
  var lang = finalOption.lang,
      timezone = finalOption.timezone,
      isPublished = finalOption.isPublished;

  if (!jsDate || !_lodash["default"].isDate(jsDate) || !format || format.length != 2 || !validFormats.includes(format)) {
    return null;
  }

  var finalDate;

  if (timezone.type === 'device') {
    finalDate = jsDate;
  } else {
    var currentGmtOffset = -jsDate.getTimezoneOffset();
    var gmtOffset = timezone.type == 'utc' ? 0 : timezone.gmtOffset ? timezone.gmtOffset : currentGmtOffset;
    var relativeOffset = gmtOffset - currentGmtOffset;
    finalDate = new Date(jsDate.getTime() + 60 * 1000 * relativeOffset);
  }

  var finalDateStr = '';
  var isKorean = lang == 'ko';
  var fullYear = finalDate.getFullYear();
  var month = finalDate.getMonth() + 1;
  var month2 = month < 10 ? '0' + month : month;
  var month3 = months[finalDate.getMonth()];
  var date = finalDate.getDate();
  var date2 = date < 10 ? '0' + date : date;
  var day = isKorean ? krDays[finalDate.getDay()] : enDays[finalDate.getDay()];
  var hour = finalDate.getHours();
  var hour2 = hour < 10 ? '0' + hour : hour;
  var min = finalDate.getMinutes();
  var min2 = min < 10 ? '0' + min : min;
  var monthDateDay = isKorean ? "".concat(month, "/").concat(date, "(").concat(day, ")") : "".concat(month3, " ").concat(date, " ").concat(day);
  var hourStr = hour.toString(); //console.log(`isKorean:${isKorean}, lang=${lang}`)

  switch (format) {
    case 'A1':
      finalDateStr = monthDateDay + ' ' + hour2 + ':00';
      break;

    case 'A2':
      finalDateStr = isKorean ? monthDateDay + ' ' + hour2 + ':' + min2 : "".concat(fullYear, "-").concat(month2, "-").concat(date2, " ").concat(day, " ").concat(hour2, ":").concat(min2);
      break;

    case 'A3':
      finalDateStr = monthDateDay + ' ' + hour + (isKorean ? '시' : 'H');
      break;

    case 'A4':
      var measuredDate = new Date(finalDate.getTime() - 1000 * 3600);
      var mHour = measuredDate.getHours();

      if (isKorean) {
        finalDateStr = monthDateDay + ' ' + hourStr + '시 발표 (' + mHour + '시 평균)';
      } else {
        finalDateStr = isPublished ? 'Published: ' : 'Average: ';
        finalDateStr += fullYear + '-' + month2 + '-' + date2;
        finalDateStr += ' ' + day + ' ' + hour2 + ':' + '00';
      }

      break;

    case 'B1':
      finalDateStr = isKorean ? "".concat(fullYear, "\uB144 ").concat(month, "/").concat(date, "(").concat(day, ") ").concat(hour2, ":00") : "".concat(fullYear, "-").concat(month2, "-").concat(date, " ").concat(day, " ").concat(hour2, ":00");
      break;

    case 'B2':
      finalDateStr = isKorean ? "".concat(fullYear, "\uB144 ").concat(monthDateDay) : "".concat(fullYear, "-").concat(month2, "-").concat(date2, " ").concat(day);
      break;

    case 'B3':
    case 'B4':
      var label = isKorean ? isPublished ? '발표' : '평균' : isPublished ? 'Published' : 'Average';
      var finalHour = isKorean ? hour : hour2;

      if (isPublished) {
        finalDateStr = isKorean ? "".concat(fullYear, "\uB144 ").concat(month, "/").concat(date, "(").concat(day, ") ").concat(finalHour, "\uC2DC ").concat(label) : "".concat(label, ": ").concat(fullYear, "-").concat(month2, "-").concat(date2, " ").concat(day, " ").concat(finalHour, ":00");
      } else {
        var _measuredDate = new Date(finalDate.getTime() - 1000 * 3600);

        var _fullYear = _measuredDate.getFullYear();

        var _month = _measuredDate.getMonth() + 1;

        var _month2 = _month < 10 ? '0' + _month : _month;

        var _date = _measuredDate.getDate();

        var _date2 = _date < 10 ? '0' + _date : _date;

        var _day = isKorean ? krDays[_measuredDate.getDay()] : enDays[_measuredDate.getDay()];

        var _hour = _measuredDate.getHours();

        var _hour2 = _hour < 10 ? '0' + _hour : _hour;

        var enTail = isPublished ? ':00' : format == 'B3' ? 'H' : ':00~59';
        finalDateStr = isKorean ? "".concat(_fullYear, "\uB144 ").concat(_month, "/").concat(_date, "(").concat(_day, ") ").concat(_hour, "\uC2DC ").concat(label) : "".concat(label, ": ").concat(_fullYear, "-").concat(_month2, "-").concat(_date2, " ").concat(_day, " ").concat(_hour2).concat(enTail);
      }

      break;

    case 'C1':
      finalDateStr = hourStr + ':00';
      break;

    default:
      return null;
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
//# sourceMappingURL=dateFormat.js.map