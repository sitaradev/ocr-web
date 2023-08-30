import * as geometry from "../geometry";
export type Word = {
    /**
     * Contains the relative vertices coordinates (points) of a polygon containing
     * the field in the document.
     */
    polygon: geometry.Polygon;
    text: string;
    confidence: number;
};
type Line = Word[];
/**
 * OCR extraction from the entire document.
 */
export declare class FullText {
    words: Word[];
    /**
     * Order all text on a page into lines.
     * WARNING: This feature is experimental.
     */
    toLines(): Line[];
    /**
     * WARNING: This feature is experimental.
     */
    toString(): string;
}
export {};
