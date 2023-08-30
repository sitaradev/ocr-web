import { BaseField, BaseFieldConstructor } from "./base";
interface OrientationFieldConstructor extends BaseFieldConstructor {
    pageId: number;
}
/**
 * The clockwise rotation to apply (in degrees) to make the image upright.
 */
export declare class OrientationField extends BaseField {
    /** Degrees of the rotation. */
    value: number;
    /** Page id. */
    pageId: number;
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     */
    constructor({ prediction, valueKey, reconstructed, pageId, }: OrientationFieldConstructor);
    toString(): string;
}
export {};
