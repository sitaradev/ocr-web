"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _InvoiceV4_instances, _InvoiceV4_checklist, _InvoiceV4_reconstruct;
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvoiceV4 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
const invoiceLineItem_1 = require("./invoiceLineItem");
const checks_1 = require("./checks");
const reconstruction_1 = require("./reconstruction");
/** Invoice V4 */
class InvoiceV4 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            fullText: fullText,
            extras: extras,
        });
        _InvoiceV4_instances.add(this);
        /** List of Reference numbers including PO number. */
        this.referenceNumbers = [];
        /** The payment information. */
        this.supplierPaymentDetails = [];
        /** The supplier company regitration information. */
        this.supplierCompanyRegistrations = [];
        /** The company registration information for the customer. */
        this.customerCompanyRegistrations = [];
        /** Line items details. */
        this.lineItems = [];
        this.locale = new fields_1.Locale({
            prediction: prediction.locale,
            valueKey: "language",
        });
        this.documentType = new fields_1.ClassificationField({
            prediction: prediction.document_type,
        });
        this.referenceNumbers = prediction.reference_numbers.map(function (prediction) {
            return new fields_1.TextField({
                prediction: prediction,
                pageId: pageId,
            });
        });
        this.totalAmount = new fields_1.Amount({
            prediction: prediction.total_amount,
            pageId: pageId,
        });
        this.totalTax = new fields_1.Amount({
            prediction: { value: undefined, confidence: 0.0 },
            pageId: pageId,
        });
        this.totalNet = new fields_1.Amount({
            prediction: prediction.total_net,
            pageId: pageId,
        });
        this.date = new fields_1.DateField({
            prediction: prediction.date,
            pageId,
        });
        this.taxes = new fields_1.Taxes().init(prediction["taxes"], pageId);
        this.supplierCompanyRegistrations =
            prediction.supplier_company_registrations.map(function (prediction) {
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
        this.supplierName = new fields_1.TextField({
            prediction: prediction.supplier_name,
            pageId: pageId,
        });
        this.supplierAddress = new fields_1.TextField({
            prediction: prediction.supplier_address,
            pageId: pageId,
        });
        this.customerName = new fields_1.TextField({
            prediction: prediction.customer_name,
            pageId: pageId,
        });
        this.customerAddress = new fields_1.TextField({
            prediction: prediction.customer_address,
            pageId: pageId,
        });
        prediction.customer_company_registrations.map((prediction) => this.customerCompanyRegistrations.push(new fields_1.CompanyRegistration({
            prediction: prediction,
            pageId: pageId,
        })));
        prediction.supplier_payment_details.map((prediction) => this.supplierPaymentDetails.push(new fields_1.PaymentDetails({
            prediction: prediction,
            pageId: pageId,
        })));
        prediction.line_items.map((prediction) => this.lineItems.push(new invoiceLineItem_1.InvoiceLineItem({
            prediction: prediction,
        })));
        __classPrivateFieldGet(this, _InvoiceV4_instances, "m", _InvoiceV4_checklist).call(this);
        __classPrivateFieldGet(this, _InvoiceV4_instances, "m", _InvoiceV4_reconstruct).call(this);
    }
    toString() {
        const referenceNumbers = this.referenceNumbers
            .map((item) => item.toString())
            .join(", ");
        const paymentDetails = this.supplierPaymentDetails
            .map((item) => item.toString())
            .join("\n                 ");
        const customerCompanyRegistration = this.customerCompanyRegistrations
            .map((item) => item.toString())
            .join("; ");
        const companyRegistration = this.supplierCompanyRegistrations
            .map((item) => item.toString())
            .join("; ");
        let lineItems = "\n";
        if (this.lineItems.length > 0) {
            lineItems =
                "\n  Code           | QTY    | Price   | Amount   | Tax (Rate)       | Description\n  ";
            lineItems += this.lineItems.map((item) => item.toString()).join("\n  ");
        }
        const outStr = `Invoice V4 Prediction
=====================
:Filename: ${this.filename}
:Locale: ${this.locale}
:Invoice number: ${this.invoiceNumber}
:Reference numbers: ${referenceNumbers}
:Invoice date: ${this.date}
:Invoice due date: ${this.dueDate}
:Supplier name: ${this.supplierName}
:Supplier address: ${this.supplierAddress}
:Supplier company registrations: ${companyRegistration}
:Supplier payment details: ${paymentDetails}
:Customer name: ${this.customerName}
:Customer company registrations: ${customerCompanyRegistration}
:Customer address: ${this.customerAddress}
:Line Items: ${lineItems}
:Taxes: ${this.taxes}
:Total tax: ${this.totalTax}
:Total net: ${this.totalNet}
:Total amount: ${this.totalAmount}
`;
        return InvoiceV4.cleanOutString(outStr);
    }
}
exports.InvoiceV4 = InvoiceV4;
_InvoiceV4_instances = new WeakSet(), _InvoiceV4_checklist = function _InvoiceV4_checklist() {
    this.checklist = {
        taxesMatchTotalIncl: (0, checks_1.taxesMatchTotalIncl)(this),
        taxesMatchTotalExcl: (0, checks_1.taxesMatchTotalExcl)(this),
        taxesAndTotalExclMatchTotalIncl: (0, checks_1.taxesAndTotalExclMatchTotalIncl)(this),
    };
}, _InvoiceV4_reconstruct = function _InvoiceV4_reconstruct() {
    (0, reconstruction_1.reconstructTotalTax)(this);
    (0, reconstruction_1.reconstructTotalExcl)(this);
    (0, reconstruction_1.reconstructTotalIncl)(this);
    (0, reconstruction_1.reconstructTotalTaxFromTotals)(this);
};
