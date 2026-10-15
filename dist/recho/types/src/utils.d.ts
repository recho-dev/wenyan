/**
 * To check match of a part of string
 */
export declare function match(src: string, startAt: number, target: string): boolean;
export declare const defaultAssertLogger: (...messages: any[]) => void;
export declare const defaultAssert: (logger?: (...messages: any[]) => void) => (msg: string, pos: number, b: any) => void;
export declare function isRoman(x: string): boolean;
