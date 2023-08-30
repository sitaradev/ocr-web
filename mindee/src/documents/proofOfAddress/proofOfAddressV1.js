"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProofOfAddressV1 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
class ProofOfAddressV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
        });
        /** All extrated ISO date yyyy-mm-dd. Works both for European and US dates. */
        this.dates = [];
        /** Generic: VAT NUMBER, TAX ID, COMPANY REGISTRATION NUMBER or country specific. */
        this.issuerCompanyRegistration = [];
        /** Generic: VAT NUMBER, TAX ID, COMPANY REGISTRATION NUMBER or country specific. */
        this.recipientCompanyRegistration = [];
        this.locale = new fields_1.Locale({
            prediction: prediction.locale,
        });
        this.date = new fields_1.DateField({
            prediction: prediction.date,
            pageId: pageId,
        });
        prediction.dates.map((prediction) => this.dates.push(new fields_1.DateField({
            prediction: prediction,
            pageId: pageId,
        })));
        this.issuerAddress = new fields_1.TextField({
            prediction: prediction.issuer_address,
            pageId: pageId,
        });
        prediction.issuer_company_registration.map((prediction) => this.issuerCompanyRegistration.push(new fields_1.CompanyRegistration({
            prediction: prediction,
            pageId: pageId,
        })));
        this.issuerName = new fields_1.TextField({
            prediction: prediction.issuer_name,
            pageId: pageId,
        });
        prediction.recipient_company_registration.map((prediction) => this.recipientCompanyRegistration.push(new fields_1.CompanyRegistration({
            prediction: prediction,
            pageId: pageId,
        })));
        this.recipientAddress = new fields_1.TextField({
            prediction: prediction.recipient_address,
            pageId: pageId,
        });
        this.recipientName = new fields_1.TextField({
            prediction: prediction.recipient_name,
            pageId: pageId,
        });
    }
    toString() {
        const outStr = `----- Proof of Address V1 -----
Filename: ${this.filename}
Locale: ${this.locale}
Issuer Name: ${this.issuerName}
Issuer Company Registrations: ${this.issuerCompanyRegistration
            .map((icr) => icr.value)
            .join(", ")}
Issuer Address: ${this.issuerAddress}
Recipient Name: ${this.recipientName}
Recipient Company Registrations: ${this.recipientCompanyRegistration
            .map((rcr) => rcr.value)
            .join(", ")}
Recipient Address: ${this.recipientAddress}
Dates: ${this.dates.map((rcr) => rcr.value).join("\n       ")}
Date of Issue: ${this.date}
----------------------
`;
        return ProofOfAddressV1.cleanOutString(outStr);
    }
}
exports.ProofOfAddressV1 = ProofOfAddressV1;
