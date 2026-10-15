import { BaseTranspiler, ModuleWrapperOptions } from "./base";
import { TranspilerOptions } from "../types";
export default class RubyCompiler extends BaseTranspiler {
    protected moduleWrapper({ src, markerStart, markerEnd }: ModuleWrapperOptions): string;
    rename(name: any): string;
    lowerAllPinYinAndMakeItGlobal(asc: any): any;
    transpile(options?: Partial<TranspilerOptions>): {
        result: string;
        imports: string[];
    };
    lib: string;
}
