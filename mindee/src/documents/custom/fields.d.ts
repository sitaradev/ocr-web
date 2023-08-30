import { StringDict } from "../../fields/base";
import { FieldConstructor } from "../../fields/field";
import { Polygon } from "../../geometry";
export declare class ClassificationField {
    /** The value for the classification. */
    value: string;
    /**
     * The confidence score of the prediction.
     * Note: Score is calculated on **word selection**, not its textual content (OCR).
     */
    confidence: number;
    constructor({ prediction }: {
        prediction: StringDict;
    });
    toString(): string;
}
export declare class ListFieldValue {
    /** Extracted content of the prediction */
    content: string | number;
    /**
     * The confidence score of the prediction.
     * Note: Score is calculated on **word selection**, not its textual content (OCR).
     */
    confidence: number;
    /**
     * Contains exactly 4 relative vertices coordinates (points) of a right
     * rectangle containing the word in the document.
     */
    bbox: Polygon;
    /**
     * Contains the relative vertices coordinates (points) of a polygon containing
     * the word in the document.
     */
    polygon: Polygon;
    constructor(prediction: StringDict);
    toString(): string;
}
export declare class ListField {
    readonly values: ListFieldValue[];
    confidence: number;
    /** True if the field was reconstructed or computed using other fields. */
    reconstructed: boolean;
    /** The document page on which the information was found. */
    pageId: number;
    constructor({ prediction, reconstructed, pageId }: FieldConstructor);
    contentsList(): Array<string | number>;
    contentsString(separator?: string): string;
    toString(): string;
}
