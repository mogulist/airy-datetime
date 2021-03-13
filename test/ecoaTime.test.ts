import {
    jsDateToEcoaTime, 
    ecoaTimeToJsDate, 
    jsDateToEcoaTimeMinute
} from '../src/lib';

const dateTimeStr1 = '2020-01-01 0:35:47';
const testDate1 = new Date(dateTimeStr1)
const ecoaTime1 = '201912312400';

const dateTimeStr2 = '2020-03-01 4:5:47';
const testDate2 = new Date(dateTimeStr2)
const ecoaTime2 = '202003010400';


describe('jsDateToEcoaTime 테스트', () => {
    test(`파라미터를 지정하지 않으면 null 이 리턴된다`, () => {
        expect(jsDateToEcoaTime()).toBe(null)
    })
    test(`${dateTimeStr1} 를 ecoaTime으로 변환하면 '201912312400'이다`, () => {
        expect(jsDateToEcoaTime(testDate1)).toBe('201912312400')
    })
    test(`${dateTimeStr2} 를 ecoaTime으로 변환하면 ${ecoaTime2}이다`, () => {
        expect(jsDateToEcoaTime(testDate2)).toBe(ecoaTime2)
    })
})

const dateTimeMinStr1 = '2020-03-01 4:5:47';
const testDateMin1 = new Date(dateTimeMinStr1)
const ecoaTimeMin1 = '202003010405';

describe('jsDateToEcoaTimeMinute 테스트', () => {
    test(`파라미터를 지정하지 않으면 null 이 리턴된다`, () => {
        expect(jsDateToEcoaTimeMinute()).toBe(null)
    })
    test(`${dateTimeStr1} 를 ecoaTime으로 변환하면 '201912312435'이다`, () => {
        expect(jsDateToEcoaTimeMinute(testDate1)).toBe('201912312435')
    })
    test(`${dateTimeMinStr1} 를 ecoaTime으로 변환하면 ${ecoaTimeMin1}이다`, () => {
        expect(jsDateToEcoaTimeMinute(testDateMin1)).toBe(ecoaTimeMin1)
    })
})


describe('ecoaTimeToJsDate 테스트', () => {
    test(`파라미터를 지정하지 않으면 null 이 리턴된다`, () => {
        expect(ecoaTimeToJsDate()).toBe(null)
    })
    test(`${ecoaTime1} 를 jsDate ISO format으로 변환하면 '2019-12-31T15:00:00.000Z'이다`, () => {
        expect(ecoaTimeToJsDate(ecoaTime1)?.toISOString()).toBe('2019-12-31T15:00:00.000Z')
    })
    test(`${ecoaTime1} 를 jsDate toLocaleString으로 변환하면 '2020. 1. 1. 24시 0분 0초`, () => {
        expect(ecoaTimeToJsDate(ecoaTime1)?.toLocaleString('ko-kr', { hour12: false })).toBe('2020. 1. 1. 24시 0분 0초')
    })
    test(`${ecoaTimeMin1} 를 jsDate toLocaleString으로 변환하면 '2020. 3. 1. 오전 4:05:00`, () => {
        expect(ecoaTimeToJsDate(ecoaTimeMin1)?.toLocaleString()).toBe('2020. 3. 1. 오전 4:05:00')
    })
})