import { Document, DocumentConstructorProps } from "../document";
import { ClassificationField, TaxField, TextField, Amount, Locale, DateField } from "../../fields";
export declare class ReceiptV3 extends Document {
    #private;
    /** Total amount with the tax amount of the purchase. */
    locale: Locale;
    /** Where the purchase was made, the language, and the currency. */
    totalIncl: Amount;
    /** The purchase date. */
    date: DateField;
    /** The type of purchase. */
    category: ClassificationField;
    /** Merchant's name as seen on the receipt. */
    merchantName: TextField;
    /** Time as seen on the receipt in HH:MM format. */
    time: TextField;
    /** Total tax amount of the purchase. */
    totalTax: Amount;
    /** Total amount without tax of the purchase. */
    totalExcl: Amount;
    /** List of different taxes. */
    taxes: TaxField[];
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
