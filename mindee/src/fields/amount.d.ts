import { Field, FieldConstructor } from "./field";
export declare function floatToString(value: number): string;
/**
 * A field containing an amount value.
 */
export declare class Amount extends Field {
    /** The value. */
    value?: number;
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     */
    constructor({ prediction, valueKey, reconstructed, pageId, }: FieldConstructor);
    toString(): string;
}
