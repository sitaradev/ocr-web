import { StringDict } from "./base";
import { Field } from "./field";
export interface FieldConstructor {
    prediction: StringDict;
    valueKey?: string;
    reconstructed?: boolean;
    pageId?: number | undefined;
}
/**
 * A field containing a text value.
 */
export declare class TextField extends Field {
    /** The value. */
    value?: string;
    constructor({ prediction, valueKey, reconstructed, pageId, }: FieldConstructor);
}
