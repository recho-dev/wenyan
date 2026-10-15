import { ImportOptions, CompileOptions, ImportedModule } from "./types";
export declare function importReader(moduleName: string, importOptions?: Partial<ImportOptions>): ImportedModule;
export declare function bundleImports(imports: string[], options: {
    lib: CompileOptions["lib"];
    lang: CompileOptions["lang"];
}, importOptions: ImportOptions): ImportedModule[];
