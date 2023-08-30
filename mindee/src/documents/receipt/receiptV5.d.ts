import { Document, DocumentConstructorProps } from "../document";
import { Amount, ClassificationField, CompanyRegistration, DateField, Locale, TaxField, TextField } from "../../fields";
import { ReceiptV5LineItem } from "./receiptV5LineItem";
/**
 * Document data for Expense Receipt, API version 5.
 */
export declare class ReceiptV5 extends Document {
    #private;
    /** The purchase category among predefined classes. */
    category: ClassificationField;
    /** The date the purchase was made. */
    date: DateField;
    /** One of: 'CREDIT CARD RECEIPT', 'EXPENSE RECEIPT'. */
    documentType: ClassificationField;
    /** List of line item details. */
    lineItems: ReceiptV5LineItem[];
    /** The locale detected on the document. */
    locale: Locale;
    /** The purchase subcategory among predefined classes for transport and food. */
    subcategory: ClassificationField;
    /** The address of the supplier or merchant. */
    supplierAddress: TextField;
    /** List of company registrations associated to the supplier. */
    supplierCompanyRegistrations: CompanyRegistration[];
    /** The name of the supplier or merchant. */
    supplierName: TextField;
    /** The phone number of the supplier or merchant. */
    supplierPhoneNumber: TextField;
    /** List of tax lines information. */
    taxes: TaxField[];
    /** The time the purchase was made. */
    time: TextField;
    /** The total amount of tip and gratuity. */
    tip: Amount;
    /** The total amount paid: includes taxes, discounts, fees, tips, and gratuity. */
    totalAmount: Amount;
    /** The net amount paid: does not include taxes, fees, and discounts. */
    totalNet: Amount;
    /** The total amount of taxes. */
    totalTax: Amount;
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
