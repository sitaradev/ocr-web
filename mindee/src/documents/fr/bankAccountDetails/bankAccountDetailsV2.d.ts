import { Document, DocumentConstructorProps } from "../../document";
import { TextField } from "../../../fields";
import { BankAccountDetailsV2Bban } from "./bankAccountDetailsV2Bban";
/**
 * Document data for Bank Account Details, API version 2.
 */
export declare class BankAccountDetailsV2 extends Document {
    /** Full extraction of the account holders names. */
    accountHoldersNames: TextField;
    /** Full extraction of BBAN, including: branch code, bank code, account and key. */
    bban: BankAccountDetailsV2Bban;
    /** Full extraction of the IBAN number. */
    iban: TextField;
    /** Full extraction of the SWIFT code. */
    swiftCode: TextField;
    constructor({ prediction, orientation, extras, inputSource, fullText, pageId, }: DocumentConstructorProps);
    toString(): string;
}
