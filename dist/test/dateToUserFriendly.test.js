"use strict";

var _chai = require("chai");

var _dateFormat = require("../lib/dateFormat");

var dateTimeStr = '2019-12-17 18:35:47';
var dateTimeStr2 = '2020-01-01 0:35:47';
var now = new Date(dateTimeStr);
var now2 = new Date(dateTimeStr2);
describe('dateToUserFriendly 파라미터 오류 체크', function () {
  it("".concat(dateTimeStr, "\uC758 \uD30C\uB9AC\uBBF8\uD130 \uC5C6\uC73C\uBA74 null \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(), null);
  });
  it("".concat(dateTimeStr, "\uC758 jsDate \uC544\uB2CC \uD30C\uB77C\uBBF8\uD130\uC774\uBA74 null \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now.toString(), 'A1'), null);
  });
  it("".concat(dateTimeStr, "\uC758 format \uD30C\uB77C\uBBF8\uD130 \uC5C6\uC73C\uBA74 null \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now), null);
  });
  it("".concat(dateTimeStr, "\uC758 format \uD30C\uB77C\uBBF8\uD130 \uAE38\uC774\uAC00 2\uAC00 \uC544\uB2C8\uBA74 null \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A33'), null);
  });
  it("".concat(dateTimeStr, "\uC758 format \uD30C\uB77C\uBBF8\uD130 \uC720\uD6A8\uD558\uC9C0 \uC54A\uC73C\uBA74 null \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A8'), null);
  });
});
describe('dateToUserFriendly A1: Month, Date, Day, HH:00', function () {
  it("".concat(dateTimeStr, "\uC758 format A1 \uACB0\uACFC\uB294 '12/17(\uD654) 18:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A1'), '12/17(화) 18:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format A1 \uACB0\uACFC\uB294 '1/1(\uC218) 00:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'A1'), '1/1(수) 00:00');
  });
  it("".concat(dateTimeStr, "\uC758 format A1, 'fr' \uACB0\uACFC\uB294 'Dec 17 Tue 18:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A1', {
      lang: 'fr'
    }), 'Dec 17 Tue 18:00');
  });
  it("".concat(dateTimeStr, "\uC758 format A1, timezone: 'device' \uACB0\uACFC\uB294 '12/17(\uD654) 18:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A1', {
      timezone: {
        type: 'device'
      }
    }), '12/17(화) 18:00');
  });
  it("".concat(dateTimeStr, "\uC758 format A1, timezone: 'utc' \uACB0\uACFC\uB294 '12/17(\uD654) 09:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A1', {
      timezone: {
        type: 'utc'
      }
    }), '12/17(화) 09:00');
  });
  it("".concat(dateTimeStr, "\uC758 format A1, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 '12/17(\uD654) 17:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A1', {
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), '12/17(화) 17:00');
  });
  it("".concat(dateTimeStr, "\uC758 format A1, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 '12/17(\uD654) 04:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A1', {
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      }
    }), '12/17(화) 04:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format A1, 'en', timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 'Dec 31 Tue 10:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'A1', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      }
    }), 'Dec 31 Tue 10:00');
  });
});
describe('dateToUserFriendly A2 Month, Date, Day, HH:MM', function () {
  it("".concat(dateTimeStr, "\uC758 format A2 \uACB0\uACFC\uB294 '12/17(\uD654) 18:35' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A2'), '12/17(화) 18:35');
  });
  it("".concat(dateTimeStr, "\uC758 format A2, lang:'jp' \uACB0\uACFC\uB294 '2019-12-17 Tue 18:35' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A2', {
      lang: 'jp'
    }), '2019-12-17 Tue 18:35');
  });
  it("".concat(dateTimeStr, "\uC758 format A2, timezone: 'utc' \uACB0\uACFC\uB294 '12/17(\uD654) 09:35' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A2', {
      timezone: {
        type: 'utc'
      }
    }), '12/17(화) 09:35');
  });
  it("".concat(dateTimeStr, "\uC758 format A2, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 '12/17(\uD654) 17:35' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A2', {
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), '12/17(화) 17:35');
  });
  it("".concat(dateTimeStr, "\uC758 format A2, lang:'en', timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 '2019-12-17 Tue 04:35' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A2', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      }
    }), '2019-12-17 Tue 04:35');
  });
});
describe('dateToUserFriendly A3: Month, Date, Day, HH', function () {
  it("".concat(dateTimeStr, "\uC758 format A3 \uACB0\uACFC\uB294 '12/17(\uD654) 18\uC2DC' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A3'), '12/17(화) 18시');
  });
  it("".concat(dateTimeStr, "\uC758 format A3, 'au' \uACB0\uACFC\uB294 'Dec 17 Tue 18H' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A3', {
      lang: 'au'
    }), 'Dec 17 Tue 18H');
  });
  it("".concat(dateTimeStr, "\uC758 format A3, timezone: 'utc' \uACB0\uACFC\uB294 '12/17(\uD654) 9\uC2DC' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A3', {
      timezone: {
        type: 'utc'
      }
    }), '12/17(화) 9시');
  });
  it("".concat(dateTimeStr, "\uC758 format A3, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 '12/17(\uD654) 17\uC2DC' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A3', {
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), '12/17(화) 17시');
  });
  it("".concat(dateTimeStr, "\uC758 format A3, lang:'en', timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 'Dec 17 Tue 4H' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A3', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      }
    }), 'Dec 17 Tue 4H');
  });
});
describe("dateToUserFriendly A4: For HCS. Both Published/Measured. Date: ".concat(dateTimeStr), function () {
  it("".concat(dateTimeStr, "\uC758 format A4 \uACB0\uACFC\uB294 '12/17(\uD654) 18\uC2DC \uBC1C\uD45C (17\uC2DC \uD3C9\uADE0)' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A4'), '12/17(화) 18시 발표 (17시 평균)');
  });
  it("".concat(dateTimeStr, "\uC758 format A4, en\uC758 \uACB0\uACFC\uB294 'Published: 2019-12-17 Tue 18:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A4', {
      lang: 'en'
    }), 'Published: 2019-12-17 Tue 18:00');
  });
  it("".concat(dateTimeStr, "\uC758 format A4, timezone: 'utc' \uACB0\uACFC\uB294 '12/17(\uD654) 9\uC2DC \uBC1C\uD45C (8\uC2DC \uD3C9\uADE0)' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A4', {
      timezone: {
        type: 'utc'
      }
    }), '12/17(화) 9시 발표 (8시 평균)');
  });
  it("".concat(dateTimeStr, "\uC758 format A4, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 '12/17(\uD654) 17\uC2DC \uBC1C\uD45C (16\uC2DC \uD3C9\uADE0)' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A4', {
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), '12/17(화) 17시 발표 (16시 평균)');
  });
  it("".concat(dateTimeStr, "\uC758 format A4, lang:'en', timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 'Published: 2019-12-17 Tue 04:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A4', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      }
    }), 'Published: 2019-12-17 Tue 04:00');
  });
  it("".concat(dateTimeStr, "\uC758 format A4, 'en', isPublished: false, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 'Average: 2019-12-17 Tue 03:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'A4', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      },
      isPublished: false
    }), 'Average: 2019-12-17 Tue 04:00');
  });
});
describe("dateToUserFriendly A4: For HCS. Both Published/Measured. Date: ".concat(dateTimeStr2), function () {
  it("".concat(dateTimeStr2, "\uC758 format A4 \uACB0\uACFC\uB294 '1/1(\uC218) 0\uC2DC \uBC1C\uD45C (23\uC2DC \uD3C9\uADE0)' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'A4'), '1/1(수) 0시 발표 (23시 평균)');
  });
  it("".concat(dateTimeStr2, "\uC758 format A4, en\uC758 \uACB0\uACFC\uB294 'Published: 2020-01-01 Wed 00:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'A4', {
      lang: 'en'
    }), 'Published: 2020-01-01 Wed 00:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format A4, timezone: 'utc' \uACB0\uACFC\uB294 '12/31(\uD654) 15\uC2DC \uBC1C\uD45C (14\uC2DC \uD3C9\uADE0)' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'A4', {
      timezone: {
        type: 'utc'
      }
    }), '12/31(화) 15시 발표 (14시 평균)');
  });
  it("".concat(dateTimeStr2, "\uC758 format A4, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 '12/31(\uD654) 23\uC2DC \uBC1C\uD45C (22\uC2DC \uD3C9\uADE0)' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'A4', {
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), '12/31(화) 23시 발표 (22시 평균)');
  });
  it("".concat(dateTimeStr2, "\uC758 format A4, lang:'en', timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 'Published: 2019-12-31 Tue 10:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'A4', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      }
    }), 'Published: 2019-12-31 Tue 10:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format A4, 'en', isPublished: false, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 'Average: 2019-12-31 Tue 10:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'A4', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      },
      isPublished: false
    }), 'Average: 2019-12-31 Tue 10:00');
  });
});
describe('dateToUserFriendly B1: Year, Month, Date, Day, Hour', function () {
  it("".concat(dateTimeStr, "\uC758 format B1 \uACB0\uACFC\uB294 '2019\uB144 12/17(\uD654) 18:00' \uC774\uB2E4"), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'B1'), '2019년 12/17(화) 18:00');
  });
  it("".concat(dateTimeStr, "\uC758 format B1, 'fr' \uACB0\uACFC\uB294 '2019-12-17 Tue 18:00' \uC774\uB2E4"), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'B1', {
      lang: 'fr'
    }), '2019-12-17 Tue 18:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format B1, timezone: 'utc' \uACB0\uACFC\uB294 '2019\uB144 12/31(\uD654) 15:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B1', {
      timezone: {
        type: 'utc'
      }
    }), '2019년 12/31(화) 15:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format B1, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 '2019\uB144 12/31(\uD654) 23:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B1', {
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), '2019년 12/31(화) 23:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format B1, 'en', isPublished: false, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 '2019-12-31 Tue 10:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B1', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      },
      isPublished: false
    }), '2019-12-31 Tue 10:00');
  });
});
describe('dateToUserFriendly B2: Year, Month, Date, Day', function () {
  it("".concat(dateTimeStr, "\uC758 format B2 \uACB0\uACFC\uB294 '2019\uB144 12/17(\uD654)' \uC774\uB2E4"), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'B2'), '2019년 12/17(화)');
  });
  it("".concat(dateTimeStr, "\uC758 format B2, 'en' \uACB0\uACFC\uB294 '2019-12-17 Tue' \uC774\uB2E4"), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'B2', {
      lang: 'en'
    }), '2019-12-17 Tue');
  });
  it("".concat(dateTimeStr2, "\uC758 format B2, timezone: 'utc' \uACB0\uACFC\uB294 '2019\uB144 12/31(\uD654)' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B2', {
      timezone: {
        type: 'utc'
      }
    }), '2019년 12/31(화)');
  });
  it("".concat(dateTimeStr2, "\uC758 format B2, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 '2019\uB144 12/31(\uD654)' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B2', {
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), '2019년 12/31(화)');
  });
  it("".concat(dateTimeStr2, "\uC758 format B2, 'en', isPublished: false, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 '2019-12-31 Tue' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B2', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      },
      isPublished: false
    }), '2019-12-31 Tue');
  });
});
describe('dateToUserFriendly B3: Published/Measured Date time', function () {
  it("".concat(dateTimeStr, "\uC758 format B3 \uACB0\uACFC\uB294 '2019\uB144 12/17(\uD654) 18\uC2DC \uBC1C\uD45C' \uC774\uB2E4"), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'B3'), '2019년 12/17(화) 18시 발표');
  });
  it("".concat(dateTimeStr, "\uC758 format B3, 'en' \uACB0\uACFC\uB294 'Published: 2019-12-17 Tue 18:00' \uC774\uB2E4"), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'B3', {
      lang: 'en'
    }), 'Published: 2019-12-17 Tue 18:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format B3, isPublished: true, timezone: 'utc' \uACB0\uACFC\uB294 '2019\uB144 12/31(\uD654) 15\uC2DC \uBC1C\uD45C' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B3', {
      timezone: {
        type: 'utc'
      },
      isPublished: true
    }), '2019년 12/31(화) 15시 발표');
  });
  it("".concat(dateTimeStr2, "\uC758 format B3, isPublished: false, timezone: 'utc' \uACB0\uACFC\uB294 '2019\uB144 12/31(\uD654) 14\uC2DC \uD3C9\uADE0' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B3', {
      timezone: {
        type: 'utc'
      },
      isPublished: false
    }), '2019년 12/31(화) 14시 평균');
  });
  it("".concat(dateTimeStr2, "\uC758 format B3, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 'Published: 2019-12-31 Tue 23:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B3', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), 'Published: 2019-12-31 Tue 23:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format B3, en, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 'Average: 2019-12-31 Tue 23H' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B3', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      },
      isPublished: false
    }), 'Average: 2019-12-31 Tue 22H');
  });
  it("".concat(dateTimeStr2, "\uC758 format B3, 'ko', isPublished: false, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 '2019\uB144 12/31(\uD654) 9\uC2DC \uD3C9\uADE0' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B3', {
      lang: 'ko',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      },
      isPublished: false
    }), '2019년 12/31(화) 9시 평균');
  });
  it("".concat(dateTimeStr2, "\uC758 format B3, 'en', isPublished: false, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 'Average: 2019-12-31 Tue 09H' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B3', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      },
      isPublished: false
    }), 'Average: 2019-12-31 Tue 09H');
  });
});
describe('dateToUserFriendly B4: Published/Measured Date time', function () {
  it("".concat(dateTimeStr2, "\uC758 format B4, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 'Published: 2019-12-31 Tue 23:00' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B4', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      }
    }), 'Published: 2019-12-31 Tue 23:00');
  });
  it("".concat(dateTimeStr2, "\uC758 format B4, en, timezone: \uC911\uAD6D \uACB0\uACFC\uB294 'Average: 2019-12-31 Tue 22:00~59' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B4', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: 480
      },
      isPublished: false
    }), 'Average: 2019-12-31 Tue 22:00~59');
  });
  it("".concat(dateTimeStr2, "\uC758 format B4, 'ko', isPublished: true, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 '2019\uB144 12/31(\uD654) 10\uC2DC \uBC1C\uD45C' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B4', {
      lang: 'ko',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      },
      isPublished: true
    }), '2019년 12/31(화) 10시 발표');
  });
  it("".concat(dateTimeStr2, "\uC758 format B4, 'en', isPublished: false, timezone: \uB274\uC695 -300 \uACB0\uACFC\uB294 'Average: 2019-12-31 Tue 09:00~59' \uC774\uB2E4 "), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now2, 'B4', {
      lang: 'en',
      timezone: {
        type: 'gmtOffset',
        gmtOffset: -300
      },
      isPublished: false
    }), 'Average: 2019-12-31 Tue 09:00~59');
  });
});
describe('dateToUserFriendly C1: Only Hour. hh:00', function () {
  it("".concat(dateTimeStr, "\uC758 format C1 \uACB0\uACFC\uB294 '18:00' \uC774\uB2E4"), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'C1'), '18:00');
  });
  it("".concat(dateTimeStr, "\uC758 format C1, 'en' \uACB0\uACFC\uB294 '18:00' \uC774\uB2E4"), function () {
    _chai.assert.equal((0, _dateFormat.dateToUserFriendly)(now, 'C1', {
      lang: 'en'
    }), '18:00');
  });
});
//# sourceMappingURL=dateToUserFriendly.test.js.map