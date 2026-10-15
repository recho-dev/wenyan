import { BaseTranspiler, ModuleWrapperOptions } from "./base";
import { TranspilerOptions } from "../types";
export default class PythonTranspiler extends BaseTranspiler {
    protected moduleWrapper({ src, markerStart, markerEnd }: ModuleWrapperOptions): string;
    transpile(options?: Partial<TranspilerOptions>): {
        result: string;
        imports: string[];
    };
    lib: string;
}
