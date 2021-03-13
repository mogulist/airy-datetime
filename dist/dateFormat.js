"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLocalYM = exports.getLocalYMDH = exports.getLocalYMD = exports.dateToUserFriendly = void 0;
var krDays = ['일', '월', '화', '수', '목', '금', '토'];
var enDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
var validFormats = ['A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1'];
function dateToUserFriendly(jsDate, format, option) {
    var _a;
    var defaultOption = { lang: 'ko', timezone: { type: 'device' }, isPublished: true };
    var finalOption = option ? __assign(__assign({}, defaultOption), option) : defaultOption;
    var lang = finalOption.lang, timezone = finalOption.timezone, isPublished = finalOption.isPublished;
    if (!jsDate || typeof jsDate.getDate !== 'function' || !format || format.length != 2 || !validFormats.includes(format)) {
        return '';
    }
    var finalDate;
    if ((timezone === null || timezone === void 0 ? void 0 : timezone.type) === 'device') {
        finalDate = jsDate;
    }
    else {
        var currentGmtOffset = -jsDate.getTimezoneOffset();
        var gmtOffset = (timezone === null || timezone === void 0 ? void 0 : timezone.type) == 'utc' ? 0 : (_a = timezone === null || timezone === void 0 ? void 0 : timezone.gmtOffset) !== null && _a !== void 0 ? _a : currentGmtOffset;
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
    var monthDateDay = isKorean ? month + "/" + date + "(" + day + ")" : month3 + " " + date + " " + day;
    var hourStr = hour.toString();
    switch (format) {
        case 'A1':
            finalDateStr = monthDateDay + ' ' + hour2 + ':00';
            break;
        case 'A2':
            finalDateStr = isKorean ?
                monthDateDay + ' ' + hour2 + ':' + min2 :
                fullYear + "-" + month2 + "-" + date2 + " " + day + " " + hour2 + ":" + min2;
            break;
        case 'A3':
            finalDateStr = monthDateDay + ' ' + hour + (isKorean ? '시' : 'H');
            break;
        case 'A4':
            var measuredDate = new Date(finalDate.getTime() - 1000 * 3600);
            var mHour = measuredDate.getHours();
            if (isKorean) {
                finalDateStr = monthDateDay + ' ' + hourStr + '시 발표 (' + mHour + '시 평균)';
            }
            else {
                finalDateStr = isPublished ? 'Published: ' : 'Average: ';
                finalDateStr += fullYear + '-' + month2 + '-' + date2;
                finalDateStr += ' ' + day + ' ' + hour2 + ':' + '00';
            }
            break;
        case 'B1':
            finalDateStr = isKorean ?
                fullYear + "\uB144 " + month + "/" + date + "(" + day + ") " + hour2 + ":00" :
                fullYear + "-" + month2 + "-" + date + " " + day + " " + hour2 + ":00";
            break;
        case 'B2':
            finalDateStr = isKorean ?
                fullYear + "\uB144 " + monthDateDay :
                fullYear + "-" + month2 + "-" + date2 + " " + day;
            break;
        case 'B3':
        case 'B4':
            var label = isKorean ? (isPublished ? '발표' : '평균') : (isPublished ? 'Published' : 'Average');
            var finalHour = isKorean ? hour : hour2;
            if (isPublished) {
                finalDateStr = isKorean ?
                    fullYear + "\uB144 " + month + "/" + date + "(" + day + ") " + finalHour + "\uC2DC " + label :
                    label + ": " + fullYear + "-" + month2 + "-" + date2 + " " + day + " " + finalHour + ":00";
            }
            else {
                var measuredDate_1 = new Date(finalDate.getTime() - 1000 * 3600);
                var fullYear_1 = measuredDate_1.getFullYear();
                var month_1 = measuredDate_1.getMonth() + 1;
                var month2_1 = month_1 < 10 ? '0' + month_1 : month_1;
                var date_1 = measuredDate_1.getDate();
                var date2_1 = date_1 < 10 ? '0' + date_1 : date_1;
                var day_1 = isKorean ? krDays[measuredDate_1.getDay()] : enDays[measuredDate_1.getDay()];
                var hour_1 = measuredDate_1.getHours();
                var hour2_1 = hour_1 < 10 ? '0' + hour_1 : hour_1;
                var enTail = isPublished ? ':00' : format == 'B3' ? 'H' : ':00~59';
                finalDateStr = isKorean ?
                    fullYear_1 + "\uB144 " + month_1 + "/" + date_1 + "(" + day_1 + ") " + hour_1 + "\uC2DC " + label :
                    label + ": " + fullYear_1 + "-" + month2_1 + "-" + date2_1 + " " + day_1 + " " + hour2_1 + enTail;
            }
            break;
        case 'C1':
            finalDateStr = hourStr + ':00';
            break;
        default:
            return '';
    }
    return finalDateStr;
}
exports.dateToUserFriendly = dateToUserFriendly;
function getLocalYMD(jsDate, separator) {
    var septr = separator || '';
    var year = jsDate.getFullYear().toString();
    var month = getMonth2Digits(jsDate);
    var date = getDate2Digits(jsDate);
    return year + septr + month + septr + date;
}
exports.getLocalYMD = getLocalYMD;
function getLocalYMDH(jsDate, separator) {
    var septr = separator || '';
    var year = jsDate.getFullYear();
    var month = getMonth2Digits(jsDate);
    var date = getDate2Digits(jsDate);
    var hour = getHours2Digits(jsDate);
    return year + septr + month + septr + date + septr + hour;
}
exports.getLocalYMDH = getLocalYMDH;
function getLocalYM(jsDate, separator) {
    var septr = separator || '';
    var year = jsDate.getFullYear();
    var month = getMonth2Digits(jsDate);
    return year + septr + month;
}
exports.getLocalYM = getLocalYM;
function getMonth2Digits(jsDate) {
    return (jsDate.getMonth() + 1).toString().padStart(2, '0');
}
function getDate2Digits(jsDate) {
    return (jsDate.getDate().toString()).padStart(2, '0');
}
function getHours2Digits(jsDate) {
    return (jsDate.getHours().toString()).padStart(2, '0');
}
function getMinutes2Digits(jsDate) {
    return (jsDate.getMinutes().toString()).padStart(2, '0');
}
