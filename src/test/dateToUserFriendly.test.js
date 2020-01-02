import {assert} from 'chai';
import {dateToUserFriendly} from '../lib/dateFormat';

const dateTimeStr = '2019-12-17 18:35:47';
const dateTimeStr2 = '2020-01-01 0:35:47';
const now = new Date(dateTimeStr)
const now2 = new Date(dateTimeStr2)

describe('dateToUserFriendly 파라미터 오류 체크', () => {
    it(`${dateTimeStr}의 파리미터 없으면 null 이다 `, () => {
        assert.equal(dateToUserFriendly(), null)
    })
    it(`${dateTimeStr}의 jsDate 아닌 파라미터이면 null 이다 `, () => {
        assert.equal(dateToUserFriendly(now.toString(), 'A1'), null)
    })
    it(`${dateTimeStr}의 format 파라미터 없으면 null 이다 `, () => {
        assert.equal(dateToUserFriendly(now), null)
    })
    it(`${dateTimeStr}의 format 파라미터 길이가 2가 아니면 null 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A33'), null)
    })
    it(`${dateTimeStr}의 format 파라미터 유효하지 않으면 null 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A8'), null)
    })
})

describe('dateToUserFriendly A1: Month, Date, Day, HH:00', () => {
    it(`${dateTimeStr}의 format A1 결과는 '12/17(화) 18:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A1'), '12/17(화) 18:00')
    })
    it(`${dateTimeStr2}의 format A1 결과는 '1/1(수) 00:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'A1'), '1/1(수) 00:00')
    })
    it(`${dateTimeStr}의 format A1, 'fr' 결과는 'Dec 17 Tue 18:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A1', {lang: 'fr'}), 'Dec 17 Tue 18:00')
    })
    it(`${dateTimeStr}의 format A1, timezone: 'device' 결과는 '12/17(화) 18:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A1', {timezone: {type: 'device'}}), '12/17(화) 18:00')
    })
    it(`${dateTimeStr}의 format A1, timezone: 'utc' 결과는 '12/17(화) 09:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A1', {timezone: {type: 'utc'}}), '12/17(화) 09:00')
    })
    it(`${dateTimeStr}의 format A1, timezone: 중국 결과는 '12/17(화) 17:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A1', {timezone: {type: 'gmtOffset', gmtOffset: 480}}), '12/17(화) 17:00')
    })
    it(`${dateTimeStr}의 format A1, timezone: 뉴욕 -300 결과는 '12/17(화) 04:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A1', {timezone: {type: 'gmtOffset', gmtOffset: -300}}), '12/17(화) 04:00')
    })
    it(`${dateTimeStr2}의 format A1, 'en', timezone: 뉴욕 -300 결과는 'Dec 31 Tue 10:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'A1', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}}), 'Dec 31 Tue 10:00')
    })
})

describe('dateToUserFriendly A2 Month, Date, Day, HH:MM', () => {
    it(`${dateTimeStr}의 format A2 결과는 '12/17(화) 18:35' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A2'), '12/17(화) 18:35')
    })
    it(`${dateTimeStr}의 format A2, lang:'jp' 결과는 '2019-12-17 Tue 18:35' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A2', {lang: 'jp'}), '2019-12-17 Tue 18:35')
    })
    it(`${dateTimeStr}의 format A2, timezone: 'utc' 결과는 '12/17(화) 09:35' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A2', {timezone: {type: 'utc'}}), '12/17(화) 09:35')
    })
    it(`${dateTimeStr}의 format A2, timezone: 중국 결과는 '12/17(화) 17:35' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A2', {timezone: {type: 'gmtOffset', gmtOffset: 480}}), '12/17(화) 17:35')
    })
    it(`${dateTimeStr}의 format A2, lang:'en', timezone: 뉴욕 -300 결과는 '2019-12-17 Tue 04:35' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A2', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}}), '2019-12-17 Tue 04:35')
    })
})

describe('dateToUserFriendly A3: Month, Date, Day, HH', () => {
    it(`${dateTimeStr}의 format A3 결과는 '12/17(화) 18시' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A3'), '12/17(화) 18시')
    })
    it(`${dateTimeStr}의 format A3, 'au' 결과는 'Dec 17 Tue 18H' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A3', {lang: 'au'}), 'Dec 17 Tue 18H')
    })

    it(`${dateTimeStr}의 format A3, timezone: 'utc' 결과는 '12/17(화) 9시' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A3', {timezone: {type: 'utc'}}), '12/17(화) 9시')
    })
    it(`${dateTimeStr}의 format A3, timezone: 중국 결과는 '12/17(화) 17시' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A3', {timezone: {type: 'gmtOffset', gmtOffset: 480}}), '12/17(화) 17시')
    })
    it(`${dateTimeStr}의 format A3, lang:'en', timezone: 뉴욕 -300 결과는 'Dec 17 Tue 4H' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A3', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}}), 'Dec 17 Tue 4H')
    })
})

describe(`dateToUserFriendly A4: For HCS. Both Published/Measured. Date: ${dateTimeStr}`, () => {
    it(`${dateTimeStr}의 format A4 결과는 '12/17(화) 18시 발표 (17시 평균)' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A4'), '12/17(화) 18시 발표 (17시 평균)')
    })
    it(`${dateTimeStr}의 format A4, en의 결과는 'Published: 2019-12-17 Tue 18:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A4', {lang: 'en'}), 'Published: 2019-12-17 Tue 18:00')
    })
    it(`${dateTimeStr}의 format A4, timezone: 'utc' 결과는 '12/17(화) 9시 발표 (8시 평균)' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A4', {timezone: {type: 'utc'}}), '12/17(화) 9시 발표 (8시 평균)')
    })
    it(`${dateTimeStr}의 format A4, timezone: 중국 결과는 '12/17(화) 17시 발표 (16시 평균)' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A4', {timezone: {type: 'gmtOffset', gmtOffset: 480}}), '12/17(화) 17시 발표 (16시 평균)')
    })
    it(`${dateTimeStr}의 format A4, lang:'en', timezone: 뉴욕 -300 결과는 'Published: 2019-12-17 Tue 04:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A4', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}}), 'Published: 2019-12-17 Tue 04:00')
    })
    it(`${dateTimeStr}의 format A4, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 'Average: 2019-12-17 Tue 03:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now, 'A4', 
            {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}, isPublished: false}), 
            'Average: 2019-12-17 Tue 04:00')
    })
})

describe(`dateToUserFriendly A4: For HCS. Both Published/Measured. Date: ${dateTimeStr2}`, () => {
    it(`${dateTimeStr2}의 format A4 결과는 '1/1(수) 0시 발표 (23시 평균)' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'A4'), '1/1(수) 0시 발표 (23시 평균)')
    })
    it(`${dateTimeStr2}의 format A4, en의 결과는 'Published: 2020-01-01 Wed 00:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'A4', {lang: 'en'}), 'Published: 2020-01-01 Wed 00:00')
    })
    it(`${dateTimeStr2}의 format A4, timezone: 'utc' 결과는 '12/31(화) 15시 발표 (14시 평균)' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'A4', {timezone: {type: 'utc'}}), '12/31(화) 15시 발표 (14시 평균)')
    })
    it(`${dateTimeStr2}의 format A4, timezone: 중국 결과는 '12/31(화) 23시 발표 (22시 평균)' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'A4', {timezone: {type: 'gmtOffset', gmtOffset: 480}}), '12/31(화) 23시 발표 (22시 평균)')
    })
    it(`${dateTimeStr2}의 format A4, lang:'en', timezone: 뉴욕 -300 결과는 'Published: 2019-12-31 Tue 10:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'A4', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}}), 'Published: 2019-12-31 Tue 10:00')
    })
    it(`${dateTimeStr2}의 format A4, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 'Average: 2019-12-31 Tue 10:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'A4', 
            {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}, isPublished: false}), 
            'Average: 2019-12-31 Tue 10:00')
    })
})

describe('dateToUserFriendly B1: Year, Month, Date, Day, Hour', () => {
    it(`${dateTimeStr}의 format B1 결과는 '2019년 12/17(화) 18:00' 이다`, () => {
        assert.equal(dateToUserFriendly(now, 'B1'), '2019년 12/17(화) 18:00')
    })
    it(`${dateTimeStr}의 format B1, 'fr' 결과는 '2019-12-17 Tue 18:00' 이다`, () => {
        assert.equal(dateToUserFriendly(now, 'B1', {lang: 'fr'}), '2019-12-17 Tue 18:00')
    })
    it(`${dateTimeStr2}의 format B1, timezone: 'utc' 결과는 '2019년 12/31(화) 15:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B1', {timezone: {type: 'utc'}}), '2019년 12/31(화) 15:00')
    })
    it(`${dateTimeStr2}의 format B1, timezone: 중국 결과는 '2019년 12/31(화) 23:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B1', {timezone: {type: 'gmtOffset', gmtOffset: 480}}), '2019년 12/31(화) 23:00')
    })
    it(`${dateTimeStr2}의 format B1, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 '2019-12-31 Tue 10:00' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B1', 
            {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}, isPublished: false}), 
            '2019-12-31 Tue 10:00')
    })
})

describe('dateToUserFriendly B2: Year, Month, Date, Day', () => {
    it(`${dateTimeStr}의 format B2 결과는 '2019년 12/17(화)' 이다`, () => {
        assert.equal(dateToUserFriendly(now, 'B2'), '2019년 12/17(화)')
    })
    it(`${dateTimeStr}의 format B2, 'en' 결과는 '2019-12-17 Tue' 이다`, () => {
        assert.equal(dateToUserFriendly(now, 'B2', {lang: 'en'}), '2019-12-17 Tue')
    })
    it(`${dateTimeStr2}의 format B2, timezone: 'utc' 결과는 '2019년 12/31(화)' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B2', {timezone: {type: 'utc'}}), '2019년 12/31(화)')
    })
    it(`${dateTimeStr2}의 format B2, timezone: 중국 결과는 '2019년 12/31(화)' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B2', {timezone: {type: 'gmtOffset', gmtOffset: 480}}), '2019년 12/31(화)')
    })
    it(`${dateTimeStr2}의 format B2, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 '2019-12-31 Tue' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B2', 
            {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}, isPublished: false}), 
            '2019-12-31 Tue')
    })
})

describe('dateToUserFriendly B3: Published/Measured Date time', () => {
    it(`${dateTimeStr}의 format B3 결과는 '2019년 12/17(화) 18시 발표' 이다`, () => {
        assert.equal(dateToUserFriendly(now, 'B3'), '2019년 12/17(화) 18시 발표')
    })
    it(`${dateTimeStr}의 format B3, 'en' 결과는 'Published: 2019-12-17 Tue 18:00' 이다`, () => {
        assert.equal(dateToUserFriendly(now, 'B3', {lang: 'en'}), 'Published: 2019-12-17 Tue 18:00')
    })
    it(`${dateTimeStr2}의 format B3, isPublished: true, timezone: 'utc' 결과는 '2019년 12/31(화) 15시 발표' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B3', {timezone: {type: 'utc'}, isPublished: true}), 
            '2019년 12/31(화) 15시 발표')
    })
    it(`${dateTimeStr2}의 format B3, isPublished: false, timezone: 'utc' 결과는 '2019년 12/31(화) 14시 평균' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B3', {timezone: {type: 'utc'}, isPublished: false}), 
            '2019년 12/31(화) 14시 평균')
    })
    it(`${dateTimeStr2}의 format B3, timezone: 중국 결과는 'Published: 2019-12-31 Tue 23:00' 이다 `, () => {
        assert.equal(
            dateToUserFriendly(now2, 'B3', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: 480}}), 
            'Published: 2019-12-31 Tue 23:00'
        )
    })
    it(`${dateTimeStr2}의 format B3, en, timezone: 중국 결과는 'Average: 2019-12-31 Tue 23H' 이다 `, () => {
        assert.equal(
            dateToUserFriendly(now2, 'B3', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: 480}, isPublished: false}), 
            'Average: 2019-12-31 Tue 22H'
        )
    })
    it(`${dateTimeStr2}의 format B3, 'ko', isPublished: false, timezone: 뉴욕 -300 결과는 '2019년 12/31(화) 9시 평균' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B3', 
            {lang: 'ko', timezone: {type: 'gmtOffset', gmtOffset: -300}, isPublished: false}), 
            '2019년 12/31(화) 9시 평균')
    })
    it(`${dateTimeStr2}의 format B3, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 'Average: 2019-12-31 Tue 09H' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B3', 
            {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}, isPublished: false}), 
            'Average: 2019-12-31 Tue 09H')
    })
})

describe('dateToUserFriendly B4: Published/Measured Date time', () => {
    it(`${dateTimeStr2}의 format B4, timezone: 중국 결과는 'Published: 2019-12-31 Tue 23:00' 이다 `, () => {
        assert.equal(
            dateToUserFriendly(now2, 'B4', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: 480}}), 
            'Published: 2019-12-31 Tue 23:00'
        )
    })
    it(`${dateTimeStr2}의 format B4, en, timezone: 중국 결과는 'Average: 2019-12-31 Tue 22:00~59' 이다 `, () => {
        assert.equal(
            dateToUserFriendly(now2, 'B4', {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: 480}, isPublished: false}), 
            'Average: 2019-12-31 Tue 22:00~59'
        )
    })
    it(`${dateTimeStr2}의 format B4, 'ko', isPublished: true, timezone: 뉴욕 -300 결과는 '2019년 12/31(화) 10시 발표' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B4', 
            {lang: 'ko', timezone: {type: 'gmtOffset', gmtOffset: -300}, isPublished: true}), 
            '2019년 12/31(화) 10시 발표')
    })
    it(`${dateTimeStr2}의 format B4, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 'Average: 2019-12-31 Tue 09:00~59' 이다 `, () => {
        assert.equal(dateToUserFriendly(now2, 'B4', 
            {lang: 'en', timezone: {type: 'gmtOffset', gmtOffset: -300}, isPublished: false}), 
            'Average: 2019-12-31 Tue 09:00~59')
    })
})

describe('dateToUserFriendly C1: Only Hour. hh:00', () => {
    it(`${dateTimeStr}의 format C1 결과는 '18:00' 이다`, () => {
        assert.equal(dateToUserFriendly(now, 'C1'), '18:00')
    })
    it(`${dateTimeStr}의 format C1, 'en' 결과는 '18:00' 이다`, () => {
        assert.equal(dateToUserFriendly(now, 'C1', {lang: 'en'}), '18:00')
    })
})