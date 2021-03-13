import {
    getLocalYMD,
} from '../src/lib';

const testCases = [
    {
        date: new Date(2021,0,1,16,5),
        separator: '',
        result: '20210101',
    },
    {
        date: new Date(2021,0,1,16,5),
        separator: undefined,
        result: '20210101',
    },
    {
        date: new Date(2021,0,1,16,5),
        separator: '-',
        result: '2021-01-01',
    },
];

describe(``, () => {
    for (const tc of testCases) {
        test(`${tc.date.toString()}, separator:${tc.separator}`, () => {
            expect(getLocalYMD(tc.date, tc.separator)).toBe(tc.result)
        })
    }
})
