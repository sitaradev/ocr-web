"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FinancialDocumentV0_instances, _FinancialDocumentV0_initFromApiPrediction, _FinancialDocumentV0_checklist, _FinancialDocumentV0_taxesMatchTotalIncl;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialDocumentV0 = void 0;
const document_1 = require("../document");
const invoiceV3_1 = require("../invoice/invoiceV3");
const receiptV3_1 = require("../receipt/receiptV3");
const fields_1 = require("../../fields");
/**
 * @deprecated You should use FinancialDocumentV1 instead.
 */
class FinancialDocumentV0 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            fullText: fullText,
            extras: extras,
        });
        _FinancialDocumentV0_instances.add(this);
        this.taxes = [];
        this.companyRegistration = [];
        this.paymentDetails = [];
        this.customerCompanyRegistration = [];
        __classPrivateFieldGet(this, _FinancialDocumentV0_instances, "m", _FinancialDocumentV0_initFromApiPrediction).call(this, prediction, inputSource, pageId, orientation, extras);
        __classPrivateFieldGet(this, _FinancialDocumentV0_instances, "m", _FinancialDocumentV0_checklist).call(this);
    }
    toString() {
        const outStr = `-----Financial document-----
Filename: ${this.filename}
Total amount: ${this.totalIncl.value}
Date: ${this.date.value}
Supplier: ${this.supplier.value}
Total taxes: ${this.totalTax.value}
----------------------
`;
        return FinancialDocumentV0.cleanOutString(outStr);
    }
}
exports.FinancialDocumentV0 = FinancialDocumentV0;
_FinancialDocumentV0_instances = new WeakSet(), _FinancialDocumentV0_initFromApiPrediction = function _FinancialDocumentV0_initFromApiPrediction(prediction, inputFile, pageNumber, orientation, extras) {
    if (Object.keys(prediction).includes("invoice_number")) {
        const invoice = new invoiceV3_1.InvoiceV3({
            prediction: prediction,
            inputSource: inputFile,
            pageId: pageNumber,
            orientation: orientation,
            extras: extras,
        });
        this.locale = invoice.locale;
        this.totalIncl = invoice.totalIncl;
        this.totalExcl = invoice.totalExcl;
        this.date = invoice.date;
        this.invoiceNumber = invoice.invoiceNumber;
        this.dueDate = invoice.dueDate;
        this.taxes = invoice.taxes;
        this.supplier = invoice.supplier;
        this.supplierAddress = invoice.supplierAddress;
        this.paymentDetails = invoice.paymentDetails;
        this.companyRegistration = invoice.customerCompanyRegistration;
        this.orientation = invoice.orientation;
        this.totalTax = invoice.totalTax;
        this.time = new fields_1.TextField({
            prediction: { value: undefined, confidence: 0.0 },
        });
        this.customerName = invoice.customerName;
        this.customerAddress = invoice.customerAddress;
        this.customerCompanyRegistration = invoice.customerCompanyRegistration;
    }
    else {
        const receipt = new receiptV3_1.ReceiptV3({
            prediction: prediction,
            inputSource: inputFile,
            pageId: pageNumber,
            orientation: orientation,
            extras: extras,
        });
        this.orientation = receipt.orientation;
        this.date = receipt.date;
        this.dueDate = receipt.date;
        this.taxes = receipt.taxes;
        this.locale = receipt.locale;
        this.totalIncl = receipt.totalIncl;
        this.totalExcl = receipt.totalExcl;
        this.supplier = receipt.merchantName;
        this.supplierAddress = new fields_1.TextField({
            prediction: { value: undefined, confidence: 0.0 },
        });
        this.time = receipt.time;
        this.totalTax = receipt.totalTax;
        this.invoiceNumber = new fields_1.TextField({
            prediction: { value: undefined, confidence: 0.0 },
        });
        this.customerName = new fields_1.TextField({
            prediction: { value: undefined, confidence: 0.0 },
        });
        this.customerAddress = new fields_1.TextField({
            prediction: { value: undefined, confidence: 0.0 },
        });
    }
}, _FinancialDocumentV0_checklist = function _FinancialDocumentV0_checklist() {
    this.checklist = {
        taxesMatchTotalIncl: __classPrivateFieldGet(this, _FinancialDocumentV0_instances, "m", _FinancialDocumentV0_taxesMatchTotalIncl).call(this),
    };
}, _FinancialDocumentV0_taxesMatchTotalIncl = function _FinancialDocumentV0_taxesMatchTotalIncl() {
    // Check taxes and total include exist
    if (this.taxes.length === 0 || this.totalIncl.value === undefined)
        return false;
    // Reconstruct totalIncl from taxes
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
        this.taxes = this.taxes.map((tax) => ({
            ...tax,
            confidence: 1.0,
        }));
        this.totalTax.confidence = 1.0;
        this.totalIncl.confidence = 1.0;
        return true;
    }
    return false;
};
