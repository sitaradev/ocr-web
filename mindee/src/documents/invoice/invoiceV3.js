"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _InvoiceV3_instances, _InvoiceV3_checklist, _InvoiceV3_reconstruct;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceV3 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
const checks_1 = require("./checks");
const reconstruction_1 = require("./reconstruction");
class InvoiceV3 extends document_1.Document {
    /** The total amount without the tax value. */
    get totalExcl() {
        return this.totalNet;
    }
    /** The total amount without the tax value. */
    set totalExcl(value) {
        this.totalNet = value;
    }
    /** The total amount with tax included. */
    get totalIncl() {
        return this.totalAmount;
    }
    /** The total amount with tax included. */
    set totalIncl(value) {
        this.totalAmount = value;
    }
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            fullText: fullText,
            extras: extras,
        });
        _InvoiceV3_instances.add(this);
        /** The company regitration information. */
        this.companyRegistration = [];
        /** The payment information. */
        this.paymentDetails = [];
        /** The company registration information for the customer. */
        this.customerCompanyRegistration = [];
        this.locale = new fields_1.Locale({
            prediction: prediction.locale,
            valueKey: "language",
        });
        this.documentType = new fields_1.BaseField({
            prediction: prediction.document_type,
        });
        this.totalIncl = new fields_1.Amount({
            prediction: prediction.total_incl,
            pageId: pageId,
        });
        this.totalAmount = this.totalIncl;
        this.totalTax = new fields_1.Amount({
            prediction: { value: undefined, confidence: 0.0 },
            pageId: pageId,
        });
        this.totalNet = new fields_1.Amount({
            prediction: prediction.total_excl,
            pageId: pageId,
        });
        this.date = new fields_1.DateField({
            prediction: prediction.date,
            pageId,
        });
        this.taxes = new fields_1.Taxes().init(prediction["taxes"], pageId);
        this.companyRegistration = prediction.company_registration.map(function (prediction) {
            return new fields_1.CompanyRegistration({
                prediction: prediction,
                pageId: pageId,
            });
        });
        this.dueDate = new fields_1.DateField({
            prediction: prediction.due_date,
            pageId: pageId,
        });
        this.invoiceNumber = new fields_1.TextField({
            prediction: prediction.invoice_number,
            pageId: pageId,
        });
        this.supplier = new fields_1.TextField({
            prediction: prediction.supplier,
            pageId: pageId,
        });
        this.supplierAddress = new fields_1.TextField({
            prediction: prediction.supplier_address,
            pageId: pageId,
        });
        this.customerName = new fields_1.TextField({
            prediction: prediction.customer,
            pageId: pageId,
        });
        this.customerAddress = new fields_1.TextField({
            prediction: prediction.customer_address,
            pageId: pageId,
        });
        prediction.customer_company_registration.map((prediction) => this.customerCompanyRegistration.push(new fields_1.CompanyRegistration({
            prediction: prediction,
            pageId: pageId,
        })));
        prediction.payment_details.map((prediction) => this.paymentDetails.push(new fields_1.PaymentDetails({
            prediction: prediction,
            pageId: pageId,
        })));
        __classPrivateFieldGet(this, _InvoiceV3_instances, "m", _InvoiceV3_checklist).call(this);
        __classPrivateFieldGet(this, _InvoiceV3_instances, "m", _InvoiceV3_reconstruct).call(this);
    }
    toString() {
        const paymentDetails = this.paymentDetails
            .map((item) => item.toString())
            .join("\n                 ");
        const customerCompanyRegistration = this.customerCompanyRegistration
            .map((item) => item.toString())
            .join("; ");
        const companyRegistration = this.companyRegistration
            .map((item) => item.toString())
            .join("; ");
        const outStr = `Invoice V3 Prediction
=====================
:Filename: ${this.filename}
:Invoice number: ${this.invoiceNumber}
:Total amount: ${this.totalIncl}
:Total net: ${this.totalExcl}
:Invoice date: ${this.date}
:Invoice due date: ${this.dueDate}
:Supplier name: ${this.supplier}
:Supplier address: ${this.supplierAddress}
:Customer name: ${this.customerName}
:Customer company registration: ${customerCompanyRegistration}
:Customer address: ${this.customerAddress}
:Payment details: ${paymentDetails}
:Company numbers: ${companyRegistration}
:Taxes: ${this.taxes}
:Total tax: ${this.totalTax}
:Locale: ${this.locale}
`;
        return InvoiceV3.cleanOutString(outStr);
    }
}
exports.InvoiceV3 = InvoiceV3;
_InvoiceV3_instances = new WeakSet(), _InvoiceV3_checklist = function _InvoiceV3_checklist() {
    this.checklist = {
        taxesMatchTotalIncl: (0, checks_1.taxesMatchTotalIncl)(this),
        taxesMatchTotalExcl: (0, checks_1.taxesMatchTotalExcl)(this),
        taxesAndTotalExclMatchTotalIncl: (0, checks_1.taxesAndTotalExclMatchTotalIncl)(this),
    };
}, _InvoiceV3_reconstruct = function _InvoiceV3_reconstruct() {
    (0, reconstruction_1.reconstructTotalTax)(this);
    (0, reconstruction_1.reconstructTotalExcl)(this);
    (0, reconstruction_1.reconstructTotalIncl)(this);
    (0, reconstruction_1.reconstructTotalTaxFromTotals)(this);
};
