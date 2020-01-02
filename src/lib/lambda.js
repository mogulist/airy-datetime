export function getKstLambdaDate() {
    const utcTime = new Date() // In Lambda, time is UTC unlike EC2 instance
    const kstTime = new Date(utcTime.getTime() + 9*60*60*1000)
    return kstTime;
}