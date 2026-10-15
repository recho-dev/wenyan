import { ASCNode, TranspilerOptions } from "../types";
export interface ModuleWrapperOptions {
    src: string;
    moduleName: string;
    scopeName: string;
    markerStart: string;
    markerEnd: string;
}
export declare class BaseTranspiler {
    asc: ASCNode[];
    tmpVarCnt: number;
    randVarCnt: number;
    lib: string;
    constructor(asc: ASCNode[]);
    randVar(): string;
    currTmpVar(): string;
    nextTmpVar(): string;
    transpile(options?: Partial<TranspilerOptions>): {
        result: string;
        imports: string[];
    };
    wrapModule(name: string, src: string): string;
    protected moduleWrapper({ src }: ModuleWrapperOptions): string;
}
