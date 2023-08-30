"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountDetailsV2 = void 0;
const document_1 = require("../../document");
const fields_1 = require("../../../fields");
const bankAccountDetailsV2Bban_1 = require("./bankAccountDetailsV2Bban");
/**
 * Document data for Bank Account Details, API version 2.
 */
class BankAccountDetailsV2 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
            fullText: fullText,
        });
        this.accountHoldersNames = new fields_1.TextField({
            prediction: prediction["account_holders_names"],
            pageId: pageId,
        });
        this.bban = new bankAccountDetailsV2Bban_1.BankAccountDetailsV2Bban({
            prediction: prediction["bban"],
            pageId: pageId,
        });
        this.iban = new fields_1.TextField({
            prediction: prediction["iban"],
            pageId: pageId,
        });
        this.swiftCode = new fields_1.TextField({
            prediction: prediction["swift_code"],
            pageId: pageId,
        });
    }
    toString() {
        const outStr = `FR Bank Account Details V2 Prediction
=====================================
:Filename: ${this.filename}
:Account Holder's Names: ${this.accountHoldersNames}
:Basic Bank Account Number: ${this.bban.toFieldList()}
:IBAN: ${this.iban}
:SWIFT Code: ${this.swiftCode}
`;
        return BankAccountDetailsV2.cleanOutString(outStr);
    }
}
exports.BankAccountDetailsV2 = BankAccountDetailsV2;
