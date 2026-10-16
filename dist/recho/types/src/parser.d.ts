import { CompileOptions, ASCNode, Token, ExecuteOptions } from "./types";
import { hanzi2num, hanzi2numstr, num2hanzi, bool2hanzi } from "./converts/hanzi2num";
import { hanzi2pinyin } from "./converts/hanzi2pinyin";
import { version } from "./version";
import { NUMBER_KEYWORDS, KEYWORDS } from "./keywords";
import { STDLIB } from "./stdlib";
import { evalCompiled } from "./execute";
declare function wy2tokens(txt: string, assert?: (msg: string, pos: number, b: any) => void): Token[];
declare function tokens2asc(tokens: Token[], assert?: (msg: string, pos: number, b: any) => void): ASCNode[];
declare function splitCells(txt: string, assert?: (msg: string, pos: number, b: any) => void): {
    from: number;
    to: number;
}[];
declare function compile(txt: string, options?: Partial<CompileOptions>): string;
declare function execute(source: string, options?: Partial<ExecuteOptions & CompileOptions>): void;
export { compile, splitCells, evalCompiled, execute, version, wy2tokens, tokens2asc, hanzi2num, hanzi2numstr, num2hanzi, bool2hanzi, hanzi2pinyin, KEYWORDS, NUMBER_KEYWORDS, STDLIB };
