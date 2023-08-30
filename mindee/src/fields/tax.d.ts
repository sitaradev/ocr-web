import { StringDict } from "./base";
import { Field } from "./field";
interface TaxConstructor {
    prediction: StringDict;
    valueKey?: string;
    rateKey?: string;
    codeKey?: string;
    baseKey?: string;
    reconstructed?: boolean;
    pageId?: number;
}
/**
 * Represent a single tax line.
 */
export declare class TaxField extends Field {
    #private;
    /** The tax amount. */
    value?: number;
    /** The tax rate. */
    rate?: number;
    /**  The tax code (HST, GST... for Canadian; City Tax, State tax for US, etc..). */
    code?: string;
    /**  The tax base */
    base?: number;
    /** The document page on which the information was found. */
    pageId: number;
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict to get the tax value
     * @param {String} rateKey - Key to use to get the tax rate in the prediction dict
     * @param {String} codeKey - Key to use to get the tax code in the prediction dict
     * @param {String} baseKey - Key to use to get the base tax in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageNumber - Page ID for multi-page document
     */
    constructor({ prediction, valueKey, rateKey, codeKey, baseKey, reconstructed, pageId, }: TaxConstructor);
    /**
     * Output in a format suitable for inclusion in an rST table.
     */
    toTableLine(): string;
    /**
     * Default string representation.
     */
    toString(): string;
}
/**
 * Represent all items.
 */
export declare class Taxes extends Array<TaxField> {
    #private;
    init(prediction: StringDict[], pageId: number | undefined): this;
    toString(): string;
}
export {};
