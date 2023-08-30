/// <reference types="node" />
import { PageOptions } from "../inputs";
export interface SplitPdf {
    file: Buffer;
    totalPagesRemoved: number;
}
/**
 * Cut pages from a pdf file. If pages index are out of bound, it will throw an error.
 * @param file
 * @param pageOptions
 * @returns the new cutted pdf file.
 */
export declare function extractPages(file: Buffer, pageOptions: PageOptions): Promise<SplitPdf>;
export declare function countPages(file: Buffer): Promise<number>;
