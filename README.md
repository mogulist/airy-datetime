# Airy Date Time Utilities
Date and time utilities for Airy/MiseBig

## Install and import 

```
$ npm i -S https://github.com/HerbertLim/airy-datetime.git

import {dateToUserFriendly} from 'misebig-util';
```

# Date Format

## `dateToUserFriendly(date, format, {lang, timezone, isPublished})`
Generates user friendly date time string from JS Date. 

`date`:
- Javascript Date object

`format`:

- A1: Month, Date, Day, HH:00
  - ko: `4/23(월) 19:00`
  - en: `Apr 23 Mon 19:00`   
- A2: Month, Date, Day, HH:MM
  - ko: `4/23(월) 19:23`
  - en: `Apr 23 Mon 19:23`
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

`lang`:
- First two digit in locale
- Currently supports only `ko` and `en`. Other languages are considered as `en`.

`timezone`: 
- `{type, [gmtOffset]}`
- `type` : 'device' | 'utc' | 'local'
  - `device`: Time zone of smartphone or web browser
  - `utc`: Time zone is UTC
  - `local`: Time zone is as specified in `gmtOffset`
- `gmtOffset`: GTM Offset in minutets. e.g., 540, -180
  - required only when `type` is 'local'
- if `timezone` parameter is omitted, timezone is consisdered as 'device'

`isPublished`:
- If true, date time is published time. If false, date time is measured time.
- Default is true.


# Conversion between JS Date and ecoaTime
`ecoatime` is represented as `201912311800`: 
a string of four digit year, two digit month, two digit date, 
two digit hours, and two digit minutes.

Note: 0:00 is represented as 24:00. For example, 2018-01-01 00:00 is 2017123124 in `ecoaTime`


## `jsDateToEcoaTime(jsDate)`
Converts Javascript Date to `ecoaTime`. 

Params
- date: Javascript Date object

Returns
- ecoaTime
- null if parameter is invalid or undefined


## `ecoaTimeToJsDate(ecoaTime)`
Converts ecoaTime to Javascript Date object.

Params
- ecoaTime

Returns
- date: Javascript Date object
- null if parameter is invalid or undefined

If given ecoaTime is 24:00, create JS Date of previous date, and then add 1 hour.


# Etc

## `getKstLambdaDate()`
AWS Lambda 함수의 타임은 UTC이다. Lambda 함수에서 한국 시간 KST을 리턴한다. AWS Lambda에서는 `new Date()`가 아닌 이 함수를 이용해야 한다.