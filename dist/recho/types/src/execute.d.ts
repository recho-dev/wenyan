import { TargetLanguages, LogCallback, ExecuteOptions } from "./types";
export declare function isLangSupportedForEval(lang: TargetLanguages): boolean;
export declare function outputHanziWrapper(log: LogCallback, outputHanzi: boolean): (...args: any[]) => void;
export declare function evalCompiled(compiledCode: string, options?: Partial<ExecuteOptions>): void;
