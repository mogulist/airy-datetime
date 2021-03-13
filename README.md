# Date Time Utilities
Date and time utilities for Airy/MiseBig

## Usage 

```
$ npm i -S https://github.com/HerbertLim/airy-datetime.git
$ yarn add https://github.com/HerbertLim/airy-datetime.git

import { dateToUserFriendly } from 'airy-datetime';
```
### Test
Test with Jest: `$ yarn test`

## APIs

### dateToUserFriendly
Generates user friendly date time string from JS Date. 

#### `dateToUserFriendly(jsDate: Date, format: string, option?: DateToUserFriendlyOption): string`
```
type DateToUserFriendlyOption = {
    lang?: string;
    timezone?: DateToUserFriendlyTimezone;
    isPublished?: boolean;
}

type DateToUserFriendlyTimezone = {
    type: 'device' | 'utc' | 'local';
    gmtOffset?: number;
}
```
##### option
`lang`:
- First two digit in locale
- Currently supports only `ko` and `en`. Other languages are considered as `en`.

`timezone`: 
- `{type, [gmtOffset]}`
- `type` : 'device' | 'utc' | 'local'
  - `device`: Time zone of smartphone or web browser
  - `utc`: Time zone is UTC
  - `local`: Time zone is as specified in `gmtOffset`
- `option.gmtOffset`: GTM Offset in minutets. e.g., 540, -180
  - required only when `type` is 'local'
- if `timezone` parameter is omitted, timezone is consisdered as 'device'

`isPublished`:
- If true, date time is published time. If false, date time is measured time.
- Default is true.

##### Available `formats` and expected results
`format`: 'A1', 'A2', 'A3', 'A4', 'B1', 'B2', 'B3', 'B4', 'C1'

- A1: Month, Date, Day, HH:00
  - ko: `4/23(월) 19:00`
  - en: `Apr 23 Mon 19:00`   
- A2: Month, Date, Day, HH:MM
  - ko: `4/23(월) 19:23`
  - en: `2019-04-23 Mon 19:23`
- A3: Month, Date, Day, HH
  - ko: `4/23(월) 19시`
  - en: `Apr 23 Mon 19H`
- A4: For HCS. Both Published/Measured. 
  - ko: `4/23(월) 19시 발표(18시 평균)`
  - en: `Published: 2019-04-23 Mon 19:00`
- B1: Year, Month, Date, Day, Hour
  - ko: `2019년 4/23(월) 07:00`
  - en: `2019-04-23 Mon 07:00`
- B2: Year, Month, Date, Day
  - ko: `2019년 4/23(월)`
  - en: `2019-04-23 Mon`
- B3: Published/Measured Date time 
  - ko: `2019년 4/23(월) 17시 발표|평균`
  - en: `Published: 2019-04-23 Mon 19:00` or `Average: 2019-04-23 Mon 18H`
- B4: Published/Measured Date time. Average of EN version shows range.
  - ko: `2019년 4/23(월) 17시 발표|평균`
  - en: `Published: 2019-04-23 Mon 19:00` or `Average: 2019-04-23 Mon 18:00~59`
- C1: Only Hour. hh:00
  - ko: `19:00`
  - en: `19:00`



### Conversion between JS Date and ecoaTime
`ecoatime` is represented as `201912311800`: 
a string of four digit year, two digit month, two digit date, 
two digit hours, and two digit minutes.

Note: 0:00 is represented as 24:00. For example, 2018-01-01 00:00 is 2017123124 in `ecoaTime`

#### `jsDateToEcoaTime(jsDate: Date): string|null`
Converts Javascript Date to `ecoaTime`. Always set minutes to '00'. If `jsDate` is `2020-03-15 16:33:01`, ecoaTime is `202003151600`.

**Returns**

- ecoaTime
- null if parameter is invalid or undefined

#### `jsDateToEcoaTimeMinute(jsDate: Date): string|null`
Converts Javascript Date to `ecoaTime` including minutes. If `jsDate` is `2020-03-15 16:33:01`, ecoaTime is `202003151633`.

**Returns**

- ecoaTime
- null if parameter is invalid or undefined


#### `ecoaTimeToJsDate(ecoaTime: string): Date|null`
Converts ecoaTime to Javascript Date object.

**Params**

- ecoaTime

**Returns**

- date: Javascript Date object
- null if parameter is invalid or undefined

If given ecoaTime is 24:00, create JS Date of previous date, and then add 1 hour.

#### `ecoaTimeTTL2ExpireAt(ecoaTime: string, ttl: number): number`
Returns expire date in msec, which is calculated from ecoaTime + TTL

**Params**

- ecaoTime
- ttl: Time To Live in msec

**Returns**

expire date in UNIX timestamp (msec)

&nbsp;

### Etc

#### `getKstDate()`
Returns JS Date object with KST timezone. 

AWS Lambda 함수의 디폴트 타임존은 UTC이다. Lambda 함수에서 한국 시간 KST를 활용할 수 있게 해준다. 

### YMDH 유틸리티
Converts JS Date to `yyyymm{dd{hh}}` style string. If '-' is given as a separator, `yyyy-mm{-dd{-hh}}` is returned.
```
getLocalYM(jsDate: Date, separator?: string): string 
getLocalYMD(jsDate: Date, separator?: string): string
getLocalYMDH(jsDate: Date, separator?: string): string
```

