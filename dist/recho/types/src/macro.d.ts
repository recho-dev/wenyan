import { MarcoOptions, MacroDefinition } from "./types";
export declare function extractMacros(src: string, options: MarcoOptions): MacroDefinition[];
export declare function expandMacros(src: string, macros: MacroDefinition[]): string;
