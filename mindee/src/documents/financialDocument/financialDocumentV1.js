"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FinancialDocumentV1_instances, _FinancialDocumentV1_lineItemsSeparator, _FinancialDocumentV1_lineItemsToString;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialDocumentV1 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
const financialDocumentV1LineItem_1 = require("./financialDocumentV1LineItem");
/**
 * Document data for Financial Document, API version 1.
 */
class FinancialDocumentV1 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
            fullText: fullText,
        });
        _FinancialDocumentV1_instances.add(this);
        /** List of Reference numbers, including PO number. */
        this.referenceNumbers = [];
        /** List of payment details associated to the supplier. */
        this.supplierPaymentDetails = [];
        /** List of company registrations associated to the supplier. */
        this.supplierCompanyRegistrations = [];
        /** List of company registrations associated to the customer. */
        this.customerCompanyRegistrations = [];
        /** List of line item details. */
        this.lineItems = [];
        this.locale = new fields_1.Locale({
            prediction: prediction["locale"],
            valueKey: "language",
        });
        this.invoiceNumber = new fields_1.TextField({
            prediction: prediction["invoice_number"],
            pageId: pageId,
        });
        prediction["reference_numbers"].map((itemPrediction) => this.referenceNumbers.push(new fields_1.TextField({
            prediction: itemPrediction,
            pageId: pageId,
        })));
        this.date = new fields_1.DateField({
            prediction: prediction["date"],
            pageId: pageId,
        });
        this.dueDate = new fields_1.DateField({
            prediction: prediction["due_date"],
            pageId: pageId,
        });
        this.totalNet = new fields_1.Amount({
            prediction: prediction["total_net"],
            pageId: pageId,
        });
        this.totalAmount = new fields_1.Amount({
            prediction: prediction["total_amount"],
            pageId: pageId,
        });
        this.taxes = new fields_1.Taxes().init(prediction["taxes"], pageId);
        prediction["supplier_payment_details"].map((itemPrediction) => this.supplierPaymentDetails.push(new fields_1.PaymentDetails({
            prediction: itemPrediction,
            pageId: pageId,
        })));
        this.supplierName = new fields_1.TextField({
            prediction: prediction["supplier_name"],
            pageId: pageId,
        });
        prediction["supplier_company_registrations"].map((itemPrediction) => this.supplierCompanyRegistrations.push(new fields_1.CompanyRegistration({
            prediction: itemPrediction,
            pageId: pageId,
        })));
        this.supplierAddress = new fields_1.TextField({
            prediction: prediction["supplier_address"],
            pageId: pageId,
        });
        this.supplierPhoneNumber = new fields_1.TextField({
            prediction: prediction["supplier_phone_number"],
            pageId: pageId,
        });
        this.customerName = new fields_1.TextField({
            prediction: prediction["customer_name"],
            pageId: pageId,
        });
        prediction["customer_company_registrations"].map((itemPrediction) => this.customerCompanyRegistrations.push(new fields_1.CompanyRegistration({
            prediction: itemPrediction,
            pageId: pageId,
        })));
        this.customerAddress = new fields_1.TextField({
            prediction: prediction["customer_address"],
            pageId: pageId,
        });
        this.documentType = new fields_1.ClassificationField({
            prediction: prediction["document_type"],
        });
        this.subcategory = new fields_1.ClassificationField({
            prediction: prediction["subcategory"],
        });
        this.category = new fields_1.ClassificationField({
            prediction: prediction["category"],
        });
        this.totalTax = new fields_1.Amount({
            prediction: prediction["total_tax"],
            pageId: pageId,
        });
        this.tip = new fields_1.Amount({
            prediction: prediction["tip"],
            pageId: pageId,
        });
        this.time = new fields_1.TextField({
            prediction: prediction["time"],
            pageId: pageId,
        });
        prediction["line_items"].map((itemPrediction) => this.lineItems.push(new financialDocumentV1LineItem_1.FinancialDocumentV1LineItem({
            prediction: itemPrediction,
            pageId: pageId,
        })));
    }
    toString() {
        const referenceNumbers = this.referenceNumbers
            .map((item) => item.toString())
            .join(", ");
        const supplierPaymentDetails = this.supplierPaymentDetails
            .map((item) => item.toString())
            .join("\n                 ");
        const customerCompanyRegistrations = this.customerCompanyRegistrations
            .map((item) => item.toString())
            .join("; ");
        const supplierCompanyRegistrations = this.supplierCompanyRegistrations
            .map((item) => item.toString())
            .join("; ");
        const outStr = `Financial Document V1 Prediction
================================
:Filename: ${this.filename}
:Locale: ${this.locale}
:Invoice Number: ${this.invoiceNumber}
:Reference Numbers: ${referenceNumbers}
:Purchase Date: ${this.date}
:Due Date: ${this.dueDate}
:Total Net: ${this.totalNet}
:Total Amount: ${this.totalAmount}
:Taxes: ${this.taxes}
:Supplier Payment Details: ${supplierPaymentDetails}
:Supplier name: ${this.supplierName}
:Supplier Company Registrations: ${customerCompanyRegistrations}
:Supplier Address: ${this.supplierAddress}
:Supplier Phone Number: ${this.supplierPhoneNumber}
:Customer name: ${this.customerName}
:Customer Company Registrations: ${supplierCompanyRegistrations}
:Customer Address: ${this.customerAddress}
:Document Type: ${this.documentType}
:Purchase Subcategory: ${this.subcategory}
:Purchase Category: ${this.category}
:Total Tax: ${this.totalTax}
:Tip and Gratuity: ${this.tip}
:Purchase Time: ${this.time}
:Line Items: ${__classPrivateFieldGet(this, _FinancialDocumentV1_instances, "m", _FinancialDocumentV1_lineItemsToString).call(this)}
`;
        return FinancialDocumentV1.cleanOutString(outStr);
    }
}
exports.FinancialDocumentV1 = FinancialDocumentV1;
_FinancialDocumentV1_instances = new WeakSet(), _FinancialDocumentV1_lineItemsSeparator = function _FinancialDocumentV1_lineItemsSeparator(char) {
    let outStr = "  ";
    outStr += `+${char.repeat(38)}`;
    outStr += `+${char.repeat(14)}`;
    outStr += `+${char.repeat(10)}`;
    outStr += `+${char.repeat(12)}`;
    outStr += `+${char.repeat(14)}`;
    outStr += `+${char.repeat(14)}`;
    outStr += `+${char.repeat(12)}`;
    return outStr + "+";
}, _FinancialDocumentV1_lineItemsToString = function _FinancialDocumentV1_lineItemsToString() {
    if (this.lineItems.length === 0) {
        return "";
    }
    const lines = this.lineItems
        .map((item) => item.toTableLine())
        .join(`\n${__classPrivateFieldGet(this, _FinancialDocumentV1_instances, "m", _FinancialDocumentV1_lineItemsSeparator).call(this, "-")}\n  `);
    let outStr = "";
    outStr += `\n${__classPrivateFieldGet(this, _FinancialDocumentV1_instances, "m", _FinancialDocumentV1_lineItemsSeparator).call(this, "-")}\n `;
    outStr += " | Description                         ";
    outStr += " | Product code";
    outStr += " | Quantity";
    outStr += " | Tax Amount";
    outStr += " | Tax Rate (%)";
    outStr += " | Total Amount";
    outStr += " | Unit Price";
    outStr += ` |\n${__classPrivateFieldGet(this, _FinancialDocumentV1_instances, "m", _FinancialDocumentV1_lineItemsSeparator).call(this, "=")}`;
    outStr += `\n  ${lines}`;
    outStr += `\n${__classPrivateFieldGet(this, _FinancialDocumentV1_instances, "m", _FinancialDocumentV1_lineItemsSeparator).call(this, "-")}`;
    return outStr;
};
