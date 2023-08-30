"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _BankAccountDetailsV2Bban_instances, _BankAccountDetailsV2Bban_printableValues;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BankAccountDetailsV2Bban = void 0;
/**
 * Full extraction of BBAN, including: branch code, bank code, account and key.
 */
class BankAccountDetailsV2Bban {
    constructor({ prediction }) {
        _BankAccountDetailsV2Bban_instances.add(this);
        /** Confidence score */
        this.confidence = 0.0;
        /**
         * Contains the relative vertices coordinates (points) of a polygon containing
         * the field in the document.
         */
        this.polygon = [];
        this.bbanBankCode = prediction["bban_bank_code"];
        this.bbanBranchCode = prediction["bban_branch_code"];
        this.bbanKey = prediction["bban_key"];
        this.bbanNumber = prediction["bban_number"];
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
        const printable = __classPrivateFieldGet(this, _BankAccountDetailsV2Bban_instances, "m", _BankAccountDetailsV2Bban_printableValues).call(this);
        return ("Bank Code: " +
            printable.bbanBankCode +
            ", Branch Code: " +
            printable.bbanBranchCode +
            ", Key: " +
            printable.bbanKey +
            ", Account Number: " +
            printable.bbanNumber);
    }
    /**
     * Output in a format suitable for inclusion in a field list.
     */
    toFieldList() {
        const printable = __classPrivateFieldGet(this, _BankAccountDetailsV2Bban_instances, "m", _BankAccountDetailsV2Bban_printableValues).call(this);
        return `
  :Bank Code: ${printable.bbanBankCode}
  :Branch Code: ${printable.bbanBranchCode}
  :Key: ${printable.bbanKey}
  :Account Number: ${printable.bbanNumber}`.trimEnd();
    }
}
exports.BankAccountDetailsV2Bban = BankAccountDetailsV2Bban;
_BankAccountDetailsV2Bban_instances = new WeakSet(), _BankAccountDetailsV2Bban_printableValues = function _BankAccountDetailsV2Bban_printableValues() {
    return {
        bbanBankCode: this.bbanBankCode ?? "",
        bbanBranchCode: this.bbanBranchCode ?? "",
        bbanKey: this.bbanKey ?? "",
        bbanNumber: this.bbanNumber ?? "",
    };
};
