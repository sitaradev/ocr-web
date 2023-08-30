import { Field, FieldConstructor } from "./field";
/**
 * A company registration item.
 */
export declare class CompanyRegistration extends Field {
    /** Registration identifier. */
    value?: string;
    /** Type of company registration. */
    type: string;
    constructor({ prediction, valueKey, reconstructed, pageId, }: FieldConstructor);
}
