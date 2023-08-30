import { Document, DocumentConstructorProps } from "../document";
import { BaseField, Taxes, PaymentDetails, Locale, Amount, TextField, DateField, CompanyRegistration } from "../../fields";
export declare class InvoiceV3 extends Document {
    #private;
    /** Total amount with the tax amount of the purchase. */
    locale: Locale;
    /** The nature of the invoice. */
    documentType: BaseField;
    /** The total amount with tax included. Same as totalIncl. */
    totalAmount: Amount;
    /** The creation date of the invoice. */
    date: DateField;
    /** The due date of the invoice. */
    dueDate: DateField;
    /** The created time of the invoice */
    time: TextField;
    /** The total tax. */
    totalTax: Amount;
    /** The total amount without the tax value. Same as totalExcl. */
    totalNet: Amount;
    /** The supplier name. */
    supplier: TextField;
    /** The supplier address. */
    supplierAddress: TextField;
    /** The invoice number. */
    invoiceNumber: TextField;
    /** The company regitration information. */
    companyRegistration: CompanyRegistration[];
    /** The name of the customer. */
    customerName: TextField;
    /** The address of the customer. */
    customerAddress: TextField;
    /** The list of the taxes. */
    taxes: Taxes;
    /** The payment information. */
    paymentDetails: PaymentDetails[];
    /** The company registration information for the customer. */
    customerCompanyRegistration: CompanyRegistration[];
    /** The total amount without the tax value. */
    get totalExcl(): Amount;
    /** The total amount without the tax value. */
    set totalExcl(value: Amount);
    /** The total amount with tax included. */
    get totalIncl(): Amount;
    /** The total amount with tax included. */
    set totalIncl(value: Amount);
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
