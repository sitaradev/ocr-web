import { BaseField, BaseFieldConstructor } from "./base";
/**
 * Represents a classifier value.
 */
export declare class ClassificationField extends BaseField {
    /** The confidence score of the prediction. */
    confidence: number;
    /** The classification. */
    value?: string;
    constructor({ prediction, valueKey, reconstructed, }: BaseFieldConstructor);
}
