import { Document, DocumentConstructorProps } from "../document";
import { ClassificationField, Taxes, PaymentDetails, Locale, Amount, TextField, DateField, CompanyRegistration } from "../../fields";
import { InvoiceLineItem } from "./invoiceLineItem";
/** Invoice V4 */
export declare class InvoiceV4 extends Document {
    #private;
    /** Locale information. */
    locale: Locale;
    /** The nature of the invoice. */
    documentType: ClassificationField;
    /** List of Reference numbers including PO number. */
    referenceNumbers: TextField[];
    /** The total amount with tax included. */
    totalAmount: Amount;
    /** The creation date of the invoice. */
    date: DateField;
    /** The due date of the invoice. */
    dueDate: DateField;
    /** The total tax. */
    totalTax: Amount;
    /** The total amount without the tax value. */
    totalNet: Amount;
    /** The supplier name. */
    supplierName: TextField;
    /** The supplier address. */
    supplierAddress: TextField;
    /** The payment information. */
    supplierPaymentDetails: PaymentDetails[];
    /** The supplier company regitration information. */
    supplierCompanyRegistrations: CompanyRegistration[];
    /** The invoice number. */
    invoiceNumber: TextField;
    /** The name of the customer. */
    customerName: TextField;
    /** The address of the customer. */
    customerAddress: TextField;
    /** The company registration information for the customer. */
    customerCompanyRegistrations: CompanyRegistration[];
    /** The list of the taxes. */
    taxes: Taxes;
    /** Line items details. */
    lineItems: InvoiceLineItem[];
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
