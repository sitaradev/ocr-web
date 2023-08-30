import { Document, DocumentConstructorProps } from "../document";
import { CompanyRegistration, DateField, Locale, TextField } from "../../fields";
export declare class ProofOfAddressV1 extends Document {
    /** ISO date yyyy-mm-dd. Works both for European and US dates. */
    date: DateField;
    /** All extrated ISO date yyyy-mm-dd. Works both for European and US dates. */
    dates: DateField[];
    /** Address of the document's issuer. */
    issuerAddress: TextField;
    /** Generic: VAT NUMBER, TAX ID, COMPANY REGISTRATION NUMBER or country specific. */
    issuerCompanyRegistration: CompanyRegistration[];
    /** Name of the person or company issuing the document. */
    issuerName: TextField;
    /** ISO 639-1 code, works best with ca, de, en, es, fr, it, nl and pt. */
    locale: Locale;
    /** Address of supplier. */
    recipientAddress: TextField;
    /** Generic: VAT NUMBER, TAX ID, COMPANY REGISTRATION NUMBER or country specific. */
    recipientCompanyRegistration: CompanyRegistration[];
    /** Name of the document's recipient. */
    recipientName: TextField;
    constructor({ prediction, orientation, extras, inputSource, pageId, }: DocumentConstructorProps);
    toString(): string;
}
