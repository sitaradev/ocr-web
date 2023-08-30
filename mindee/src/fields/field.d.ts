import { StringDict, BaseField } from "./base";
import { Polygon, BoundingBox } from "../geometry";
export interface FieldConstructor {
    prediction: StringDict;
    valueKey?: string;
    reconstructed?: boolean;
    pageId?: number | undefined;
}
/**
 * A basic field with position and page information.
 */
export declare class Field extends BaseField {
    /**
     * Contains exactly 4 relative vertices coordinates (points) of a right
     * rectangle containing the field in the document.
     */
    boundingBox: BoundingBox;
    /**
     * Contains the relative vertices coordinates (points) of a polygon containing
     * the field in the document.
     */
    polygon: Polygon;
    /** The document page on which the information was found. */
    pageId: number;
    /** The confidence score of the prediction. */
    confidence: number;
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     * @param {Array<String>} extraFields - Extra fields to get from the prediction and to set as attribute of the Field
     */
    constructor({ prediction, valueKey, reconstructed, pageId, }: FieldConstructor);
    /**
    @param {Field[]} array1 - first Array of Fields
    @param {Field[]} array2 - second Array of Fields
    @param {String} attr - Attribute to compare
    @returns {Boolean} - true if all elements in array1 exist in array2 and vice-versa, false otherwise
     */
    static compareArrays(array1: Field[], array2: Field[], attr?: string): boolean;
    /**
     * @param {Field[]} array - Array of Fields
     * @returns {Number} product of all the fields probaility
     */
    static arrayConfidence(array: Field[]): number;
}
