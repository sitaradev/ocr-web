"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ReceiptV3_instances, _ReceiptV3_checklist, _ReceiptV3_taxesMatchTotal, _ReceiptV3_reconstruct, _ReceiptV3_reconstructTotalExclFromTCCAndTaxes, _ReceiptV3_reconstructTotalTax;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptV3 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
class ReceiptV3 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
            fullText: fullText,
        });
        _ReceiptV3_instances.add(this);
        this.locale = new fields_1.Locale({
            prediction: prediction.locale,
        });
        this.totalTax = new fields_1.Amount({
            prediction: { value: undefined, confidence: 0 },
            pageId: pageId,
        });
        this.totalExcl = new fields_1.Amount({
            prediction: { value: undefined, confidence: 0 },
            pageId: pageId,
        });
        this.totalIncl = new fields_1.Amount({
            prediction: prediction.total_incl,
            pageId: pageId,
        });
        this.date = new fields_1.DateField({
            prediction: prediction.date,
            pageId: pageId,
        });
        this.category = new fields_1.ClassificationField({
            prediction: prediction.category,
        });
        this.merchantName = new fields_1.TextField({
            prediction: prediction.supplier,
            pageId: pageId,
        });
        this.time = new fields_1.TextField({
            prediction: prediction.time,
            pageId: pageId,
        });
        this.taxes = new fields_1.Taxes().init(prediction["taxes"], pageId);
        __classPrivateFieldGet(this, _ReceiptV3_instances, "m", _ReceiptV3_checklist).call(this);
        __classPrivateFieldGet(this, _ReceiptV3_instances, "m", _ReceiptV3_reconstruct).call(this);
    }
    toString() {
        const outStr = `Receipt V3 Prediction
=====================
:Filename: ${this.filename}
:Total amount: ${this.totalIncl}
:Total net: ${this.totalExcl}
:Date: ${this.date}
:Category: ${this.category}
:Time: ${this.time}
:Merchant name: ${this.merchantName}
:Taxes: ${this.taxes}
:Total tax: ${this.totalTax}
:Locale: ${this.locale}
`;
        return ReceiptV3.cleanOutString(outStr);
    }
}
exports.ReceiptV3 = ReceiptV3;
_ReceiptV3_instances = new WeakSet(), _ReceiptV3_checklist = function _ReceiptV3_checklist() {
    this.checklist = { taxesMatchTotalIncl: __classPrivateFieldGet(this, _ReceiptV3_instances, "m", _ReceiptV3_taxesMatchTotal).call(this) };
}, _ReceiptV3_taxesMatchTotal = function _ReceiptV3_taxesMatchTotal() {
    // Check taxes and total amount exist
    if (this.taxes.length === 0 || this.totalIncl.value === undefined) {
        return false;
    }
    // Reconstruct total_incl from taxes
    let totalVat = 0;
    let reconstructedTotal = 0;
    this.taxes.forEach((tax) => {
        if (tax.value === undefined || !tax.rate)
            return false;
        totalVat += tax.value;
        reconstructedTotal += tax.value + (100 * tax.value) / tax.rate;
    });
    // Sanity check
    if (totalVat <= 0)
        return false;
    // Crate epsilon
    const eps = 1 / (100 * totalVat);
    if (this.totalIncl.value * (1 - eps) - 0.02 <= reconstructedTotal &&
        reconstructedTotal <= this.totalIncl.value * (1 + eps) + 0.02) {
        this.taxes.forEach((tax) => {
            tax.confidence = 1.0;
        });
        this.totalTax.confidence = 1.0;
        this.totalIncl.confidence = 1.0;
        return true;
    }
    return false;
}, _ReceiptV3_reconstruct = function _ReceiptV3_reconstruct() {
    __classPrivateFieldGet(this, _ReceiptV3_instances, "m", _ReceiptV3_reconstructTotalExclFromTCCAndTaxes).call(this);
    __classPrivateFieldGet(this, _ReceiptV3_instances, "m", _ReceiptV3_reconstructTotalTax).call(this);
}, _ReceiptV3_reconstructTotalExclFromTCCAndTaxes = function _ReceiptV3_reconstructTotalExclFromTCCAndTaxes() {
    if (this.taxes.length && this.totalIncl.value !== undefined) {
        const totalExcl = {
            value: this.totalIncl.value - fields_1.TextField.arraySum(this.taxes),
            confidence: fields_1.TextField.arrayConfidence(this.taxes) *
                this.totalIncl.confidence,
        };
        this.totalExcl = new fields_1.Amount({
            prediction: totalExcl,
            valueKey: "value",
            reconstructed: true,
        });
    }
}, _ReceiptV3_reconstructTotalTax = function _ReceiptV3_reconstructTotalTax() {
    if (this.taxes.length && this.totalTax.value === undefined) {
        const totalTax = {
            value: this.taxes
                .map((tax) => tax.value || 0)
                .reduce((a, b) => a + b, 0),
            confidence: fields_1.TextField.arrayConfidence(this.taxes),
        };
        if (totalTax.value > 0)
            this.totalTax = new fields_1.Amount({
                prediction: totalTax,
                valueKey: "value",
                reconstructed: true,
            });
    }
};
