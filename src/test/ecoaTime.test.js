import {assert} from 'chai';
import {jsDateToEcoaTime, ecoaTimeToJsDate, jsDateToEcoaTimeMinute} from '../lib/ecoaTime';

const dateTimeStr1 = '2020-01-01 0:35:47';
const testDate1 = new Date(dateTimeStr1)
const ecoaTime1 = '201912312400';

const dateTimeStr2 = '2020-03-01 4:5:47';
const testDate2 = new Date(dateTimeStr2)
const ecoaTime2 = '202003010400';


describe('jsDateToEcoaTime 테스트', () => {
    it(`파라미터를 지정하지 않으면 null 이 리턴된다`, () => {
        assert.equal(jsDateToEcoaTime(), null)
    })
    it(`${dateTimeStr1} 를 ecoaTime으로 변환하면 '201912312400'이다`, () => {
        assert.equal(jsDateToEcoaTime(testDate1), '201912312400')
    })
    it(`${dateTimeStr2} 를 ecoaTime으로 변환하면 ${ecoaTime2}이다`, () => {
        assert.equal(jsDateToEcoaTime(testDate2), ecoaTime2)
    })
})

const dateTimeMinStr1 = '2020-03-01 4:5:47';
const testDateMin1 = new Date(dateTimeMinStr1)
const ecoaTimeMin1 = '202003010405';

describe('jsDateToEcoaTimeMinute 테스트', () => {
    it(`파라미터를 지정하지 않으면 null 이 리턴된다`, () => {
        assert.equal(jsDateToEcoaTimeMinute(), null)
    })
    it(`${dateTimeStr1} 를 ecoaTime으로 변환하면 '201912312435'이다`, () => {
        assert.equal(jsDateToEcoaTimeMinute(testDate1), '201912312435')
    })
    it(`${dateTimeMinStr1} 를 ecoaTime으로 변환하면 ${ecoaTimeMin1}이다`, () => {
        assert.equal(jsDateToEcoaTimeMinute(testDateMin1), ecoaTimeMin1)
    })
})


describe('ecoaTimeToJsDate 테스트', () => {
    it(`파라미터를 지정하지 않으면 null 이 리턴된다`, () => {
        assert.equal(ecoaTimeToJsDate(), null)
    })
    it(`${ecoaTime1} 를 jsDate ISO format으로 변환하면 '2019-12-31T15:00:00.000Z'이다`, () => {
        assert.equal(ecoaTimeToJsDate(ecoaTime1).toISOString(), '2019-12-31T15:00:00.000Z')
    })
    it(`${ecoaTime1} 를 jsDate toLocaleString으로 변환하면 '2020-1-1 00:00:00'이다`, () => {
        assert.equal(ecoaTimeToJsDate(ecoaTime1).toLocaleString(), '2020-1-1 00:00:00')
    })
    it(`${ecoaTimeMin1} 를 jsDate toLocaleString으로 변환하면 '2020-3-1 04:05:00'이다`, () => {
        assert.equal(ecoaTimeToJsDate(ecoaTimeMin1).toLocaleString(), '2020-3-1 04:05:00')
    })
})