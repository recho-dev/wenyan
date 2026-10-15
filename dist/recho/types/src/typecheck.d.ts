import { ASCNode, IdenType, TypeSignature } from "./types";
declare function printType(t: IdenType, n?: number, d?: number): string;
declare function printSignature(signature: TypeSignature): string;
declare function typecheck(asc: ASCNode[], assert?: (msg: string, pos: number, b: any) => void): TypeSignature;
export { typecheck, printType, printSignature };
