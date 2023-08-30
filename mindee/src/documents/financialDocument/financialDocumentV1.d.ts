import { Document, DocumentConstructorProps } from "../document";
import { Amount, ClassificationField, CompanyRegistration, DateField, Locale, PaymentDetails, TaxField, TextField } from "../../fields";
import { FinancialDocumentV1LineItem } from "./financialDocumentV1LineItem";
/**
 * Document data for Financial Document, API version 1.
 */
export declare class FinancialDocumentV1 extends Document {
    #private;
    /** The locale detected on the document. */
    locale: Locale;
    /** The invoice number or identifier. */
    invoiceNumber: TextField;
    /** List of Reference numbers, including PO number. */
    referenceNumbers: TextField[];
    /** The date the purchase was made. */
    date: DateField;
    /** The date on which the payment is due. */
    dueDate: DateField;
    /** The net amount paid: does not include taxes, fees, and discounts. */
    totalNet: Amount;
    /** The total amount paid: includes taxes, tips, fees, and other charges. */
    totalAmount: Amount;
    /** List of tax lines information. */
    taxes: TaxField[];
    /** List of payment details associated to the supplier. */
    supplierPaymentDetails: PaymentDetails[];
    /** The name of the supplier or merchant. */
    supplierName: TextField;
    /** List of company registrations associated to the supplier. */
    supplierCompanyRegistrations: CompanyRegistration[];
    /** The address of the supplier or merchant. */
    supplierAddress: TextField;
    /** The phone number of the supplier or merchant. */
    supplierPhoneNumber: TextField;
    /** The name of the customer. */
    customerName: TextField;
    /** List of company registrations associated to the customer. */
    customerCompanyRegistrations: CompanyRegistration[];
    /** The address of the customer. */
    customerAddress: TextField;
    /** One of: 'INVOICE', 'CREDIT NOTE', 'CREDIT CARD RECEIPT', 'EXPENSE RECEIPT'. */
    documentType: ClassificationField;
    /** The purchase subcategory among predefined classes for transport and food. */
    subcategory: ClassificationField;
    /** The purchase category among predefined classes. */
    category: ClassificationField;
    /** The total amount of taxes. */
    totalTax: Amount;
    /** The total amount of tip and gratuity */
    tip: Amount;
    /** The time the purchase was made. */
    time: TextField;
    /** List of line item details. */
    lineItems: FinancialDocumentV1LineItem[];
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
