const KST_OFFSET_MIN = 540;
export function getKstLambdaDate(): Date {
    const now = new Date()
    const currentDateOffsetMin = now.getTimezoneOffset()
    const dateOffsetMsec = (KST_OFFSET_MIN - currentDateOffsetMin)*60*1000;
    const kstNowDate = new Date(now.getTime() + dateOffsetMsec)
    return kstNowDate;
}

export const getKstDate = getKstLambdaDate;
