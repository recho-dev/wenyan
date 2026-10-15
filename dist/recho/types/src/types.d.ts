export declare type TargetLanguages = "js" | "py" | "rb";
export declare type RomanizeSystem = "none" | "pinyin" | "unicode" | "baxter";
export declare type LogCallback = (...args: any[]) => void;
export declare type CacheObject = Record<string, string>;
export declare type StandardLibraryObject = Record<string, string> & Record<TargetLanguages, Record<string, string>>;
export interface CompileOnlyOptions {
    lang: TargetLanguages;
    romanizeIdentifiers: RomanizeSystem;
    resetVarCnt: boolean;
    logCallback: LogCallback;
    errorCallback: LogCallback;
    lib: StandardLibraryObject;
    strict: Boolean;
}
export interface ImportOptions {
    entryFilepath?: string;
    importPaths: string | string[];
    importCache: CacheObject;
    importContext: Record<string, string | {
        entry: string;
        src?: string;
    }>;
    allowHttp: boolean;
    trustedHosts: string[];
    requestTimeout: number;
}
export declare type CompileOptions = CompileOnlyOptions & ImportOptions;
export interface MarcoOptions {
    lib: CompileOnlyOptions["lib"];
    lang: TargetLanguages;
    importOptions: ImportOptions;
}
export interface TranspilerState {
    /** How many blocks (functions, loops, conditionals, ...) are open. */
    depth: number;
    /** How many values are pending, waiting for 名之曰, 書之, 噫, ... */
    pending: number;
}
export interface TranspilerOptions {
    imports: string[];
    /** Called after each operation of the AST with the transpiler's state. */
    onOp: (index: number, state: TranspilerState) => void;
}
export interface ExecuteOptions {
    lang: TargetLanguages;
    outputHanzi: boolean;
    scoped: boolean;
    output: LogCallback;
}
export declare type MacroDefinition = [string, string];
export interface ImportedModule {
    moduleName: string;
    src: string;
    entry?: string;
}
export declare type TokenType = "ans" | "assgn" | "bool" | "call" | "cmp" | "comment" | "ctnr" | "ctrl" | "data" | "decl" | "discard" | "expr" | "iden" | "import" | "lit" | "lop" | "macro" | "mod" | "name" | "not" | "num" | "op" | "opord" | "print" | "rassgn" | "take" | "try" | "type" | "throw";
export declare type Token = [TokenType, string | undefined, number] | ["ans"];
export interface ASCNodeCommon {
    pos: number;
}
export interface ASCNodeOperator {
    op: "op+" | "op-" | "op/" | "op%";
    lhs?: Token;
    rhs?: Token;
}
export interface ASCNodeReturn {
    op: "return";
    value?: Token;
}
export interface ASCNodeIf {
    op: "if";
    test: Token[];
    elseif?: boolean;
    not?: boolean;
}
export interface ASCNodeFunction {
    op: "fun";
    arity: number;
    args: {
        name: string;
        type: string;
    }[];
    elseif?: boolean;
    not?: boolean;
}
export interface ASCNodeWithValue {
    op: "not" | "whilen" | "comment";
    value: Token;
}
export interface ASCNodeName {
    op: "name";
    names: string[];
}
export interface ASCNodeReassign {
    op: "reassign";
    lhs: Token;
    rhs?: Token;
    lhssubs?: Token;
    rhssubs?: Token;
    del?: boolean;
}
export interface ASCNodeCat {
    op: "cat";
    containers: Token[];
}
export interface ASCNodeFor {
    op: "for";
    container: Token;
    iterator: string;
}
export interface ASCNodeCall {
    op: "call";
    fun: Token;
    args?: Token[];
    pop?: boolean;
}
export interface ASCNodeLength {
    op: "length";
    container: Token;
}
export interface ASCNodeTake {
    op: "take";
    count: number;
}
export interface ASCNodeTemp {
    op: "temp";
    iden: Token;
}
export interface ASCNodeImport {
    op: "import";
    file: string;
    iden: string[];
}
export interface ASCNodePush {
    op: "push";
    container: Token;
    values: Token[];
}
export interface ASCNodeWithError {
    op: "catcherr" | "throw";
    error?: Token;
    message?: Token;
    name?: string;
}
export interface ASCNodeSubscript {
    op: "subscript";
    container: Token;
    value: Token;
}
export interface ASCNodeVariable {
    op: "var";
    count: number;
    type: string;
    values: (Token | [])[];
    public: boolean;
    names?: string[];
}
export interface ASCNodePropertry {
    op: "prop";
    type: string;
    name: string;
    value: Token;
}
export interface ASCNodeGlobal {
    op: "global";
}
export interface ASCNodeEOF {
    op: "EOF";
}
export interface ASCNodeSimple {
    op: "break" | "end" | "print" | "else" | "continue" | "objbody" | "funbody" | "whiletrue" | "try" | "tryend" | "catch" | "discard" | "funend" | "objend";
}
export declare type ASCNode = ASCNodeCommon & (ASCNodeOperator | ASCNodeSimple | ASCNodeReturn | ASCNodeIf | ASCNodeFunction | ASCNodeWithValue | ASCNodeName | ASCNodeReassign | ASCNodeImport | ASCNodeTake | ASCNodeWithError | ASCNodeTemp | ASCNodeCat | ASCNodeFor | ASCNodeLength | ASCNodePush | ASCNodeCall | ASCNodeSubscript | ASCNodeVariable | ASCNodePropertry | ASCNodeGlobal | ASCNodeEOF);
export declare function isASCNodeOperator(node: ASCNode): node is ASCNodeCommon & ASCNodeOperator;
export interface IdenType {
    type: "any" | "nil" | "fun" | "obj" | "arr" | "str" | "bol" | "num" | string;
    name?: string;
    isarg?: boolean;
    in?: IdenType;
    out?: IdenType;
    element?: IdenType;
    fields?: {};
}
export declare type TypeScope = Record<string, IdenType>;
export declare type TypeSignature = [[number, number, number], TypeScope][];
