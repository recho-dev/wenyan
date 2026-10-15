import { BaseTranspiler, ModuleWrapperOptions } from "./base";
import { TranspilerOptions } from "../types";
export default class JSCompiler extends BaseTranspiler {
    protected moduleWrapper({ src, scopeName, markerStart, markerEnd }: ModuleWrapperOptions): string;
    transpile(options?: Partial<TranspilerOptions>): {
        result: string;
        imports: string[];
    };
}
