import { Field, FieldConstructor } from "./field";
/**
 * A field containing a date value.
 */
export declare class DateField extends Field {
    /** Date string in ISO format. */
    value?: string;
    /** Date as a standard JavaScript `Date` object. */
    dateObject?: Date;
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     */
    constructor({ prediction, valueKey, reconstructed, pageId, }: FieldConstructor);
    static compareDates(date1: Date, date2: Date): boolean;
}
