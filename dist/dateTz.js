"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getKstDate = exports.getKstLambdaDate = void 0;
var KST_OFFSET_MIN = 540;
function getKstLambdaDate() {
    var now = new Date();
    var currentDateOffsetMin = now.getTimezoneOffset();
    var dateOffsetMsec = (KST_OFFSET_MIN - currentDateOffsetMin) * 60 * 1000;
    var kstNowDate = new Date(now.getTime() + dateOffsetMsec);
    return kstNowDate;
}
exports.getKstLambdaDate = getKstLambdaDate;
exports.getKstDate = getKstLambdaDate;
