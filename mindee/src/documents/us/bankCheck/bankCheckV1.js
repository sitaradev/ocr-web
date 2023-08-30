"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankCheckV1 = void 0;
const document_1 = require("../../document");
const fields_1 = require("../../../fields");
class BankCheckV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
        });
        /** List of payees (full name or company name). */
        this.payees = [];
        this.accountNumber = new fields_1.TextField({
            prediction: prediction.account_number,
            pageId: pageId,
        });
        this.checkNumber = new fields_1.TextField({
            prediction: prediction.check_number,
            pageId: pageId,
        });
        this.amount = new fields_1.Amount({
            prediction: prediction.amount,
            pageId: pageId,
        });
        this.checkPosition = new fields_1.PositionField({
            prediction: prediction.check_position,
            pageId: pageId,
        });
        this.issuanceDate = new fields_1.DateField({
            prediction: prediction.date,
            pageId: pageId,
        });
        prediction.payees.map((prediction) => this.payees.push(new fields_1.TextField({
            prediction: prediction,
            pageId: pageId,
        })));
        this.routingNumber = new fields_1.TextField({
            prediction: prediction.routing_number,
            pageId: pageId,
        });
        this.signaturesPositions = new fields_1.PositionField({
            prediction: prediction.signatures_positions,
            pageId: pageId,
        });
    }
    toString() {
        const outStr = `----- US Bank Check V1 -----
Filename: ${this.filename}
Routing number: ${this.routingNumber}
Account number: ${this.accountNumber}
Check number: ${this.checkNumber}
Date: ${this.issuanceDate}
Amount: ${this.amount}
Payees: ${this.payees.map((name) => name.value).join(", ")}
----------------------
`;
        return BankCheckV1.cleanOutString(outStr);
    }
}
exports.BankCheckV1 = BankCheckV1;
