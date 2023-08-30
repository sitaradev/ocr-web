"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _ReceiptV5_instances, _ReceiptV5_lineItemsSeparator, _ReceiptV5_lineItemsToString;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReceiptV5 = void 0;
const document_1 = require("../document");
const fields_1 = require("../../fields");
const receiptV5LineItem_1 = require("./receiptV5LineItem");
/**
 * Document data for Expense Receipt, API version 5.
 */
class ReceiptV5 extends document_1.Document {
    constructor({ prediction, orientation = undefined, extras = undefined, inputSource = undefined, fullText = undefined, pageId = undefined, }) {
        super({
            inputSource: inputSource,
            pageId: pageId,
            orientation: orientation,
            extras: extras,
            fullText: fullText,
        });
        _ReceiptV5_instances.add(this);
        /** List of line item details. */
        this.lineItems = [];
        /** List of company registrations associated to the supplier. */
        this.supplierCompanyRegistrations = [];
        this.category = new fields_1.ClassificationField({
            prediction: prediction["category"],
        });
        this.date = new fields_1.DateField({
            prediction: prediction["date"],
            pageId: pageId,
        });
        this.documentType = new fields_1.ClassificationField({
            prediction: prediction["document_type"],
        });
        prediction["line_items"].map((itemPrediction) => this.lineItems.push(new receiptV5LineItem_1.ReceiptV5LineItem({
            prediction: itemPrediction,
            pageId: pageId,
        })));
        this.locale = new fields_1.Locale({
            prediction: prediction["locale"],
        });
        this.subcategory = new fields_1.ClassificationField({
            prediction: prediction["subcategory"],
        });
        this.supplierAddress = new fields_1.TextField({
            prediction: prediction["supplier_address"],
            pageId: pageId,
        });
        prediction["supplier_company_registrations"].map((itemPrediction) => this.supplierCompanyRegistrations.push(new fields_1.CompanyRegistration({
            prediction: itemPrediction,
            pageId: pageId,
        })));
        this.supplierName = new fields_1.TextField({
            prediction: prediction["supplier_name"],
            pageId: pageId,
        });
        this.supplierPhoneNumber = new fields_1.TextField({
            prediction: prediction["supplier_phone_number"],
            pageId: pageId,
        });
        this.taxes = new fields_1.Taxes().init(prediction["taxes"], pageId);
        this.time = new fields_1.TextField({
            prediction: prediction["time"],
            pageId: pageId,
        });
        this.tip = new fields_1.Amount({
            prediction: prediction["tip"],
            pageId: pageId,
        });
        this.totalAmount = new fields_1.Amount({
            prediction: prediction["total_amount"],
            pageId: pageId,
        });
        this.totalNet = new fields_1.Amount({
            prediction: prediction["total_net"],
            pageId: pageId,
        });
        this.totalTax = new fields_1.Amount({
            prediction: prediction["total_tax"],
            pageId: pageId,
        });
    }
    toString() {
        const outStr = `Receipt V5 Prediction
=====================
:Filename: ${this.filename}
:Expense Locale: ${this.locale}
:Purchase Category: ${this.category}
:Purchase Subcategory: ${this.subcategory}
:Document Type: ${this.documentType}
:Purchase Date: ${this.date}
:Purchase Time: ${this.time}
:Total Amount: ${this.totalAmount}
:Total Net: ${this.totalNet}
:Total Tax: ${this.totalTax}
:Tip and Gratuity: ${this.tip}
:Taxes: ${this.taxes}
:Supplier Name: ${this.supplierName}
:Supplier Company Registrations: ${this.supplierCompanyRegistrations.join(`${" ".repeat(32)}`)}
:Supplier Address: ${this.supplierAddress}
:Supplier Phone Number: ${this.supplierPhoneNumber}
:Line Items: ${__classPrivateFieldGet(this, _ReceiptV5_instances, "m", _ReceiptV5_lineItemsToString).call(this)}
`;
        return ReceiptV5.cleanOutString(outStr);
    }
}
exports.ReceiptV5 = ReceiptV5;
_ReceiptV5_instances = new WeakSet(), _ReceiptV5_lineItemsSeparator = function _ReceiptV5_lineItemsSeparator(char) {
    let outStr = "  ";
    outStr += `+${char.repeat(38)}`;
    outStr += `+${char.repeat(10)}`;
    outStr += `+${char.repeat(14)}`;
    outStr += `+${char.repeat(12)}`;
    return outStr + "+";
}, _ReceiptV5_lineItemsToString = function _ReceiptV5_lineItemsToString() {
    if (!this.lineItems || this.lineItems.length === 0) {
        return "";
    }
    const lines = this.lineItems
        .map((item) => item.toTableLine())
        .join(`\n${__classPrivateFieldGet(this, _ReceiptV5_instances, "m", _ReceiptV5_lineItemsSeparator).call(this, "-")}\n  `);
    let outStr = "";
    outStr += `\n${__classPrivateFieldGet(this, _ReceiptV5_instances, "m", _ReceiptV5_lineItemsSeparator).call(this, "-")}\n `;
    outStr += " | Description                         ";
    outStr += " | Quantity";
    outStr += " | Total Amount";
    outStr += " | Unit Price";
    outStr += ` |\n${__classPrivateFieldGet(this, _ReceiptV5_instances, "m", _ReceiptV5_lineItemsSeparator).call(this, "=")}`;
    outStr += `\n  ${lines}`;
    outStr += `\n${__classPrivateFieldGet(this, _ReceiptV5_instances, "m", _ReceiptV5_lineItemsSeparator).call(this, "-")}`;
    return outStr;
};
