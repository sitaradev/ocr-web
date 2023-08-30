"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptV4 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
class ReceiptV4 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
            fullText: fullText,
        });
        this.locale = new fields_1.Locale({
            prediction: prediction.locale,
        });
        this.totalTax = new fields_1.Amount({
            prediction: prediction.total_tax,
            pageId: pageId,
        });
        this.totalAmount = new fields_1.Amount({
            prediction: prediction.total_amount,
            pageId: pageId,
        });
        this.totalNet = new fields_1.Amount({
            prediction: prediction.total_net,
            pageId: pageId,
        });
        this.tip = new fields_1.Amount({
            prediction: prediction.tip,
            pageId: pageId,
        });
        this.date = new fields_1.DateField({
            prediction: prediction.date,
            pageId: pageId,
        });
        this.category = new fields_1.ClassificationField({
            prediction: prediction.category,
        });
        this.subCategory = new fields_1.ClassificationField({
            prediction: prediction.subcategory,
        });
        this.documentType = new fields_1.TextField({
            prediction: prediction.document_type,
            pageId: pageId,
        });
        this.supplier = new fields_1.TextField({
            prediction: prediction.supplier,
            pageId: pageId,
        });
        this.time = new fields_1.TextField({
            prediction: prediction.time,
            pageId: pageId,
        });
        this.taxes = new fields_1.Taxes().init(prediction["taxes"], pageId);
    }
    toString() {
        const outStr = `Receipt V4 Prediction
=====================
:Filename: ${this.filename}
:Total amount: ${this.totalAmount}
:Total net: ${this.totalNet}
:Tip: ${this.tip}
:Date: ${this.date}
:Category: ${this.category}
:Subcategory: ${this.subCategory}
:Document type: ${this.documentType}
:Time: ${this.time}
:Supplier name: ${this.supplier}
:Taxes: ${this.taxes}
:Total tax: ${this.totalTax}
:Locale: ${this.locale}
`;
        return ReceiptV4.cleanOutString(outStr);
    }
}
exports.ReceiptV4 = ReceiptV4;
