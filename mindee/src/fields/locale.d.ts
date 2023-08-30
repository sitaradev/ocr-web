import { BaseField, BaseFieldConstructor } from "./base";
/**
 * The locale detected on the document.
 */
export declare class Locale extends BaseField {
    /** Locale in ISO format. */
    value?: string;
    /** The confidence score of the prediction. */
    confidence: number;
    /** ISO 639-1 language code */
    language?: string;
    /** ISO 3166-1 alpha-2 country code */
    country?: string;
    /** ISO 4217 currency code */
    currency?: string;
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     */
    constructor({ prediction, reconstructed }: BaseFieldConstructor);
    toString(): string;
}
