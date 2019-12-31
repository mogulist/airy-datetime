"use strict";

var m = require('../index');

var now = new Date();
console.log(m.toEcoaTime(now));
console.log(m.getLevelByAqi(56));
console.log("dateToUserFriendly: ", m.dateToUserFriendly(now, 10));