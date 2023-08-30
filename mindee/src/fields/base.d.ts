export type StringDict = {
    [index: string]: any;
};
export interface BaseFieldConstructor {
    prediction: StringDict;
    valueKey?: string;
    reconstructed?: boolean;
}
/**
 * Base class for most fields.
 */
export declare class BaseField {
    /** The value. */
    value?: string | number;
    /** `true` when the field was reconstructed or computed using other fields. */
    reconstructed: boolean;
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     */
    constructor({ prediction, valueKey, reconstructed, }: BaseFieldConstructor);
    compare(other: BaseField): boolean;
    /**
     * @param {BaseField[]} array - Array of Fields
     * @returns {Number} Sum of all the Fields values in the array
     */
    static arraySum(array: BaseField[]): number;
    toString(): string;
}
