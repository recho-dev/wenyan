export declare enum NumberTokenType {
    SIGN = 0,
    DIGIT = 1,
    DECIMAL = 2,
    INT_MULT = 3,
    FRAC_MULT = 4,
    DELIM = 5,
    ZERO = 6,
    BEGIN = 7,
    END = 8
}
export declare type Digit = "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";
export declare type NumberToken = {
    type: NumberTokenType.ZERO | NumberTokenType.DIGIT;
    digit: Digit;
} | {
    type: NumberTokenType.SIGN;
    sign: number;
} | {
    type: NumberTokenType.DECIMAL | NumberTokenType.INT_MULT | NumberTokenType.FRAC_MULT;
    exp: number;
} | {
    type: NumberTokenType.DELIM | NumberTokenType.BEGIN | NumberTokenType.END;
};
export interface ParseResult {
    sign: number;
    exp: number;
    digits: Digit[];
}
export declare function hanzi2numstr(s: string): string | null;
export declare function hanzi2num(s: string): number;
export declare function num2hanzi(n: number, format?: string, precision?: any): string;
export declare function bool2hanzi(b: boolean): string;
