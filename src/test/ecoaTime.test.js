import {assert} from 'chai';
import {jsDateToEcoaTime, ecoaTimeToJsDate} from '../lib/ecoaTime';

const dateTimeStr1 = '2020-01-01 0:35:47';
const testDate1 = new Date(dateTimeStr1)
const ecoaTime1 = '201912312400';

describe('jsDateToEcoaTime 테스트', () => {
    it(`파라미터를 지정하지 않으면 null 이 리턴된다`, () => {
        assert.equal(jsDateToEcoaTime(), null)
    })
    it(`${dateTimeStr1} 를 ecoaTime으로 변환하면 '201912312400'이다`, () => {
        assert.equal(jsDateToEcoaTime(testDate1), '201912312400')
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
})
