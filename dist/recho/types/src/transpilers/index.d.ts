import { TargetLanguages } from "../types";
import { BaseTranspiler } from "./base";
declare const transpilers: Record<TargetLanguages, typeof BaseTranspiler>;
export default transpilers;
