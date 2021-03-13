import {dateToUserFriendly} from '../src/lib/dateFormat';

const dateTimeStr = '2019-12-17 18:35:47';
const dateTimeStr2 = '2020-01-01 0:35:47';
const dateTimeStr3 = '2020-03-04 07:05:47';
const now = new Date(dateTimeStr)
const now2 = new Date(dateTimeStr2)
const now3 = new Date(dateTimeStr3)

describe('dateToUserFriendly 파라미터 오류 체크', () => {
    test(`${dateTimeStr}의 파리미터 없으면 '' 이다 `, () => {
        //@ts-ignore
        expect(dateToUserFriendly()).toBe('')
    })
    test(`${dateTimeStr}의 jsDate 아닌 파라미터이면 '' 이다 `, () => {
        //@ts-ignore
        expect(dateToUserFriendly(now.toString(), 'A1')).toBe('')
    })
    test(`${dateTimeStr}의 format 파라미터 없으면 '' 이다 `, () => {
        //@ts-ignore
        expect(dateToUserFriendly(now)).toBe('')
    })
    test(`${dateTimeStr}의 format 파라미터 길이가 2가 아니면 '' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A33')).toBe( '')
    })
    test(`${dateTimeStr}의 format 파라미터 유효하지 않으면 '' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A8')).toBe( '')
    })
})

describe('dateToUserFriendly A1: Month, Date, Day, HH:00', () => {
    test(`${dateTimeStr}의 format A1 결과는 '12/17(화) 18:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A1')).toBe( '12/17(화) 18:00')
    })
    test(`${dateTimeStr2}의 format A1 결과는 '1/1(수) 00:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'A1')).toBe( '1/1(수) 00:00')
    })
    test(`${dateTimeStr}의 format A1, 'fr' 결과는 'Dec 17 Tue 18:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A1', {lang: 'fr'})).toBe('Dec 17 Tue 18:00')
    })
    test(`${dateTimeStr}의 format A1, timezone: 'device' 결과는 '12/17(화) 18:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A1', {timezone: {type: 'device'}})).toBe('12/17(화) 18:00')
    })
    test(`${dateTimeStr}의 format A1, timezone: 'utc' 결과는 '12/17(화) 09:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A1', {timezone: {type: 'utc'}})).toBe('12/17(화) 09:00')
    })
    test(`${dateTimeStr}의 format A1, timezone: 중국 결과는 '12/17(화) 17:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A1', {timezone: {type: 'local', gmtOffset: 480}})).toBe('12/17(화) 17:00')
    })
    test(`${dateTimeStr}의 format A1, timezone: 뉴욕 -300 결과는 '12/17(화) 04:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A1', {timezone: {type: 'local', gmtOffset: -300}})).toBe('12/17(화) 04:00')
    })
    test(`${dateTimeStr2}의 format A1, 'en', timezone: 뉴욕 -300 결과는 'Dec 31 Tue 10:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'A1', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}})).toBe('Dec 31 Tue 10:00')
    })
})

describe('dateToUserFriendly A2 Month, Date, Day, HH:MM', () => {
    test(`${dateTimeStr}의 format A2 결과는 '12/17(화) 18:35' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A2')).toBe( '12/17(화) 18:35')
    })
    test(`${dateTimeStr3}의 format A2 결과는 '3/4(화) 07:05' 이다 `, () => {
        expect(dateToUserFriendly(now3, 'A2')).toBe( '3/4(수) 07:05')
    })
    test(`${dateTimeStr}의 format A2, lang:'jp' 결과는 '2019-12-17 Tue 18:35' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A2', {lang: 'jp'})).toBe('2019-12-17 Tue 18:35')
    })
    test(`${dateTimeStr}의 format A2, timezone: 'utc' 결과는 '12/17(화) 09:35' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A2', {timezone: {type: 'utc'}})).toBe('12/17(화) 09:35')
    })
    test(`${dateTimeStr}의 format A2, timezone: 중국 결과는 '12/17(화) 17:35' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A2', {timezone: {type: 'local', gmtOffset: 480}})).toBe('12/17(화) 17:35')
    })
    test(`${dateTimeStr}의 format A2, lang:'en', timezone: 뉴욕 -300 결과는 '2019-12-17 Tue 04:35' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A2', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}})).toBe('2019-12-17 Tue 04:35')
    })
})

describe('dateToUserFriendly A3: Month, Date, Day, HH', () => {
    test(`${dateTimeStr}의 format A3 결과는 '12/17(화) 18시' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A3')).toBe( '12/17(화) 18시')
    })
    test(`${dateTimeStr3}의 format A3 결과는 '3/4(수) 7시' 이다 `, () => {
        expect(dateToUserFriendly(now3, 'A3')).toBe( '3/4(수) 7시')
    })
    test(`${dateTimeStr}의 format A3, 'au' 결과는 'Dec 17 Tue 18H' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A3', {lang: 'au'})).toBe('Dec 17 Tue 18H')
    })

    test(`${dateTimeStr}의 format A3, timezone: 'utc' 결과는 '12/17(화) 9시' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A3', {timezone: {type: 'utc'}})).toBe('12/17(화) 9시')
    })
    test(`${dateTimeStr}의 format A3, timezone: 중국 결과는 '12/17(화) 17시' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A3', {timezone: {type: 'local', gmtOffset: 480}})).toBe('12/17(화) 17시')
    })
    test(`${dateTimeStr}의 format A3, lang:'en', timezone: 뉴욕 -300 결과는 'Dec 17 Tue 4H' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A3', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}})).toBe('Dec 17 Tue 4H')
    })
})

describe(`dateToUserFriendly A4: For HCS. Both Published/Measured. Date: ${dateTimeStr}`, () => {
    test(`${dateTimeStr}의 format A4 결과는 '12/17(화) 18시 발표 (17시 평균)' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A4')).toBe( '12/17(화) 18시 발표 (17시 평균)')
    })
    test(`${dateTimeStr}의 format A4, en의 결과는 'Published: 2019-12-17 Tue 18:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A4', {lang: 'en'})).toBe('Published: 2019-12-17 Tue 18:00')
    })
    test(`${dateTimeStr}의 format A4, timezone: 'utc' 결과는 '12/17(화) 9시 발표 (8시 평균)' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A4', {timezone: {type: 'utc'}})).toBe('12/17(화) 9시 발표 (8시 평균)')
    })
    test(`${dateTimeStr}의 format A4, timezone: 중국 결과는 '12/17(화) 17시 발표 (16시 평균)' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A4', {timezone: {type: 'local', gmtOffset: 480}})).toBe('12/17(화) 17시 발표 (16시 평균)')
    })
    test(`${dateTimeStr}의 format A4, lang:'en', timezone: 뉴욕 -300 결과는 'Published: 2019-12-17 Tue 04:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A4', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}})).toBe('Published: 2019-12-17 Tue 04:00')
    })
    test(`${dateTimeStr}의 format A4, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 'Average: 2019-12-17 Tue 03:00' 이다 `, () => {
        expect(dateToUserFriendly(now, 'A4', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}, isPublished: false}))
        .toBe('Average: 2019-12-17 Tue 04:00')
    })
})

describe(`dateToUserFriendly A4: For HCS. Both Published/Measured. Date: ${dateTimeStr2}`, () => {
    test(`${dateTimeStr2}의 format A4 결과는 '1/1(수) 0시 발표 (23시 평균)' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'A4')).toBe( '1/1(수) 0시 발표 (23시 평균)')
    })
    test(`${dateTimeStr2}의 format A4, en의 결과는 'Published: 2020-01-01 Wed 00:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'A4', {lang: 'en'})).toBe('Published: 2020-01-01 Wed 00:00')
    })
    test(`${dateTimeStr2}의 format A4, timezone: 'utc' 결과는 '12/31(화) 15시 발표 (14시 평균)' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'A4', {timezone: {type: 'utc'}})).toBe('12/31(화) 15시 발표 (14시 평균)')
    })
    test(`${dateTimeStr2}의 format A4, timezone: 중국 결과는 '12/31(화) 23시 발표 (22시 평균)' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'A4', {timezone: {type: 'local', gmtOffset: 480}})).toBe('12/31(화) 23시 발표 (22시 평균)')
    })
    test(`${dateTimeStr2}의 format A4, lang:'en', timezone: 뉴욕 -300 결과는 'Published: 2019-12-31 Tue 10:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'A4', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}})).toBe('Published: 2019-12-31 Tue 10:00')
    })
    test(`${dateTimeStr2}의 format A4, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 'Average: 2019-12-31 Tue 10:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'A4', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}, isPublished: false}))
        .toBe('Average: 2019-12-31 Tue 10:00')
    })
})

describe('dateToUserFriendly B1: Year, Month, Date, Day, Hour', () => {
    test(`${dateTimeStr}의 format B1 결과는 '2019년 12/17(화) 18:00' 이다`, () => {
        expect(dateToUserFriendly(now, 'B1')).toBe( '2019년 12/17(화) 18:00')
    })
    test(`${dateTimeStr}의 format B1, 'fr' 결과는 '2019-12-17 Tue 18:00' 이다`, () => {
        expect(dateToUserFriendly(now, 'B1', {lang: 'fr'})).toBe('2019-12-17 Tue 18:00')
    })
    test(`${dateTimeStr2}의 format B1, timezone: 'utc' 결과는 '2019년 12/31(화) 15:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B1', {timezone: {type: 'utc'}})).toBe('2019년 12/31(화) 15:00')
    })
    test(`${dateTimeStr2}의 format B1, timezone: 중국 결과는 '2019년 12/31(화) 23:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B1', {timezone: {type: 'local', gmtOffset: 480}})).toBe('2019년 12/31(화) 23:00')
    })
    test(`${dateTimeStr2}의 format B1, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 '2019-12-31 Tue 10:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B1', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}, isPublished: false}))
        .toBe('2019-12-31 Tue 10:00')
    })
})

describe('dateToUserFriendly B2: Year, Month, Date, Day', () => {
    test(`${dateTimeStr}의 format B2 결과는 '2019년 12/17(화)' 이다`, () => {
        expect(dateToUserFriendly(now, 'B2')).toBe( '2019년 12/17(화)')
    })
    test(`${dateTimeStr}의 format B2, 'en' 결과는 '2019-12-17 Tue' 이다`, () => {
        expect(dateToUserFriendly(now, 'B2', {lang: 'en'})).toBe('2019-12-17 Tue')
    })
    test(`${dateTimeStr2}의 format B2, timezone: 'utc' 결과는 '2019년 12/31(화)' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B2', {timezone: {type: 'utc'}})).toBe('2019년 12/31(화)')
    })
    test(`${dateTimeStr2}의 format B2, timezone: 중국 결과는 '2019년 12/31(화)' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B2', {timezone: {type: 'local', gmtOffset: 480}})).toBe('2019년 12/31(화)')
    })
    test(`${dateTimeStr2}의 format B2, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 '2019-12-31 Tue' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B2', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}, isPublished: false})) 
        .toBe('2019-12-31 Tue')
    })
})

describe('dateToUserFriendly B3: Published/Measured Date time', () => {
    test(`${dateTimeStr}의 format B3 결과는 '2019년 12/17(화) 18시 발표' 이다`, () => {
        expect(dateToUserFriendly(now, 'B3')).toBe( '2019년 12/17(화) 18시 발표')
    })
    test(`${dateTimeStr}의 format B3, 'en' 결과는 'Published: 2019-12-17 Tue 18:00' 이다`, () => {
        expect(dateToUserFriendly(now, 'B3', {lang: 'en'})).toBe('Published: 2019-12-17 Tue 18:00')
    })
    test(`${dateTimeStr2}의 format B3, isPublished: true, timezone: 'utc' 결과는 '2019년 12/31(화) 15시 발표' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B3', {timezone: {type: 'utc'}, isPublished: true}))
        .toBe('2019년 12/31(화) 15시 발표')
    })
    test(`${dateTimeStr2}의 format B3, isPublished: false, timezone: 'utc' 결과는 '2019년 12/31(화) 14시 평균' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B3', {timezone: {type: 'utc'}, isPublished: false}))
        .toBe('2019년 12/31(화) 14시 평균')
    })
    test(`${dateTimeStr2}의 format B3, timezone: 중국 결과는 'Published: 2019-12-31 Tue 23:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B3', {lang: 'en', timezone: {type: 'local', gmtOffset: 480}}))
        .toBe('Published: 2019-12-31 Tue 23:00')
    })
    test(`${dateTimeStr2}의 format B3, en, timezone: 중국 결과는 'Average: 2019-12-31 Tue 23H' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B3', {lang: 'en', timezone: {type: 'local', gmtOffset: 480}, isPublished: false}))
        .toBe('Average: 2019-12-31 Tue 22H')
    })
    test(`${dateTimeStr2}의 format B3, 'ko', isPublished: false, timezone: 뉴욕 -300 결과는 '2019년 12/31(화) 9시 평균' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B3', {lang: 'ko', timezone: {type: 'local', gmtOffset: -300}, isPublished: false}))
        .toBe('2019년 12/31(화) 9시 평균')
    })
    test(`${dateTimeStr2}의 format B3, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 'Average: 2019-12-31 Tue 09H' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B3', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}, isPublished: false}))
        .toBe('Average: 2019-12-31 Tue 09H')
    })
})

describe('dateToUserFriendly B4: Published/Measured Date time', () => {
    test(`${dateTimeStr2}의 format B4, timezone: 중국 결과는 'Published: 2019-12-31 Tue 23:00' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B4', {lang: 'en', timezone: {type: 'local', gmtOffset: 480}}))
        .toBe('Published: 2019-12-31 Tue 23:00')
    })
    test(`${dateTimeStr2}의 format B4, en, timezone: 중국 결과는 'Average: 2019-12-31 Tue 22:00~59' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B4', {lang: 'en', timezone: {type: 'local', gmtOffset: 480}, isPublished: false}))
        .toBe('Average: 2019-12-31 Tue 22:00~59')
    })
    test(`${dateTimeStr2}의 format B4, 'ko', isPublished: true, timezone: 뉴욕 -300 결과는 '2019년 12/31(화) 10시 발표' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B4', {lang: 'ko', timezone: {type: 'local', gmtOffset: -300}, isPublished: true}))
        .toBe('2019년 12/31(화) 10시 발표')
    })
    test(`${dateTimeStr2}의 format B4, 'en', isPublished: false, timezone: 뉴욕 -300 결과는 'Average: 2019-12-31 Tue 09:00~59' 이다 `, () => {
        expect(dateToUserFriendly(now2, 'B4', {lang: 'en', timezone: {type: 'local', gmtOffset: -300}, isPublished: false}))
        .toBe('Average: 2019-12-31 Tue 09:00~59')
    })
})

describe('dateToUserFriendly C1: Only Hour. hh:00', () => {
    test(`${dateTimeStr}의 format C1 결과는 '18:00' 이다`, () => {
        expect(dateToUserFriendly(now, 'C1')).toBe( '18:00')
    })
    test(`${dateTimeStr}의 format C1, 'en' 결과는 '18:00' 이다`, () => {
        expect(dateToUserFriendly(now, 'C1', {lang: 'en'})).toBe('18:00')
    })
})
