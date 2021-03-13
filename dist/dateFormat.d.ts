export declare type DateToUserFriendlyTimezone = {
    type: 'device' | 'utc' | 'local';
    gmtOffset?: number;
};
export declare type DateToUserFriendlyOption = {
    lang?: string;
    timezone?: DateToUserFriendlyTimezone;
    isPublished?: boolean;
};
export declare function dateToUserFriendly(jsDate: Date, format: string, option?: DateToUserFriendlyOption): string;
export declare function getLocalYMD(jsDate: Date, separator?: string): string;
export declare function getLocalYMDH(jsDate: Date, separator?: string): string;
export declare function getLocalYM(jsDate: Date, separator?: string): string;
