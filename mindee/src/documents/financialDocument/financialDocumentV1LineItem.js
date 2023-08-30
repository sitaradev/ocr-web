"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _FinancialDocumentV1LineItem_instances, _FinancialDocumentV1LineItem_printableValues;
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialDocumentV1LineItem = void 0;
const amount_1 = require("../../fields/amount");
/**
 * List of line item details.
 */
class FinancialDocumentV1LineItem {
    constructor({ prediction }) {
        _FinancialDocumentV1LineItem_instances.add(this);
        /** Confidence score */
        this.confidence = 0.0;
        /**
         * Contains the relative vertices coordinates (points) of a polygon containing
         * the field in the document.
         */
        this.polygon = [];
        this.description = prediction["description"];
        this.productCode = prediction["product_code"];
        this.quantity = +parseFloat(prediction["quantity"]).toFixed(3);
        if (isNaN(this.quantity)) {
            this.quantity = null;
        }
        this.taxAmount = +parseFloat(prediction["tax_amount"]).toFixed(3);
        if (isNaN(this.taxAmount)) {
            this.taxAmount = null;
        }
        this.taxRate = +parseFloat(prediction["tax_rate"]).toFixed(3);
        if (isNaN(this.taxRate)) {
            this.taxRate = null;
        }
        this.totalAmount = +parseFloat(prediction["total_amount"]).toFixed(3);
        if (isNaN(this.totalAmount)) {
            this.totalAmount = null;
        }
        this.unitPrice = +parseFloat(prediction["unit_price"]).toFixed(3);
        if (isNaN(this.unitPrice)) {
            this.unitPrice = null;
        }
        this.pageId = prediction["page_id"];
        this.confidence = prediction["confidence"] ? prediction.confidence : 0.0;
        if (prediction["polygon"]) {
            this.polygon = prediction.polygon;
        }
    }
    /**
     * Default string representation.
     */
    toString() {
        const printable = __classPrivateFieldGet(this, _FinancialDocumentV1LineItem_instances, "m", _FinancialDocumentV1LineItem_printableValues).call(this);
        return ("Description: " +
            printable.description +
            "Product code: " +
            printable.productCode +
            "Quantity: " +
            printable.quantity +
            "Tax Amount: " +
            printable.taxAmount +
            "Tax Rate (%): " +
            printable.taxRate +
            "Total Amount: " +
            printable.totalAmount +
            "Unit Price: " +
            printable.unitPrice).trim();
    }
    /**
     * Output in a format suitable for inclusion in an rST table.
     */
    toTableLine() {
        const printable = __classPrivateFieldGet(this, _FinancialDocumentV1LineItem_instances, "m", _FinancialDocumentV1LineItem_printableValues).call(this);
        return ("| " +
            (printable.description.length > 33
                ? printable.description.substring(0, 33) + "..."
                : printable.description).padEnd(36) +
            " | " +
            printable.productCode.padEnd(12) +
            " | " +
            printable.quantity.padEnd(8) +
            " | " +
            printable.taxAmount.padEnd(10) +
            " | " +
            printable.taxRate.padEnd(12) +
            " | " +
            printable.totalAmount.padEnd(12) +
            " | " +
            printable.unitPrice.padEnd(10) +
            " |");
    }
}
exports.FinancialDocumentV1LineItem = FinancialDocumentV1LineItem;
_FinancialDocumentV1LineItem_instances = new WeakSet(), _FinancialDocumentV1LineItem_printableValues = function _FinancialDocumentV1LineItem_printableValues() {
    return {
        description: this.description ?? "",
        productCode: this.productCode ?? "",
        quantity: this.quantity !== null ? (0, amount_1.floatToString)(this.quantity) : "",
        taxAmount: this.taxAmount !== null ? (0, amount_1.floatToString)(this.taxAmount) : "",
        taxRate: this.taxRate !== null ? (0, amount_1.floatToString)(this.taxRate) : "",
        totalAmount: this.totalAmount !== null ? (0, amount_1.floatToString)(this.totalAmount) : "",
        unitPrice: this.unitPrice !== null ? (0, amount_1.floatToString)(this.unitPrice) : "",
    };
};
