import { StringDict } from "./base";
import { Field } from "./field";
interface PaymentDetailsConstructor {
    prediction: StringDict;
    valueKey?: string;
    accountNumberKey?: string;
    ibanKey?: string;
    routingNumberKey?: string;
    swiftKey?: string;
    reconstructed?: boolean;
    pageId?: number;
}
/**
 * Information on a single payment.
 */
export declare class PaymentDetails extends Field {
    #private;
    /** Synonym for the `iban` property */
    value?: string | undefined;
    /** The account number. */
    accountNumber: string | undefined;
    /** The International Bank Account Number (IBAN). */
    iban: string | undefined;
    /** The routing number. */
    routingNumber: string | undefined;
    /** The bank's SWIFT Business Identifier Code (BIC). */
    swift: string | undefined;
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict to get the iban
     * @param {String} accountNumberKey - Key to use to get the account number in the prediction dict
     * @param {String} ibanKey - Key to use to get the IBAN in the prediction dict
     * @param {String} routingNumberKey - Key to use to get the routing number in the prediction dict
     * @param {String} swiftKey - Key to use to get the SWIFT in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     */
    constructor({ prediction, valueKey, accountNumberKey, ibanKey, routingNumberKey, swiftKey, reconstructed, pageId, }: PaymentDetailsConstructor);
    toString(): string;
}
export {};
