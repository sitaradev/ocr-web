"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _a, _PaymentDetails_isKeySet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentDetails = void 0;
const field_1 = require("./field");
/**
 * Information on a single payment.
 */
class PaymentDetails extends field_1.Field {
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict to get the iban
     * @param {String} accountNumberKey - Key to use to get the account number in the prediction dict
     * @param {String} ibanKey - Key to use to get the IBAN in the prediction dict
     * @param {String} routingNumberKey - Key to use to get the routing number in the prediction dict
     * @param {String} swiftKey - Key to use to get the SWIFT in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     */
    constructor({ prediction, valueKey = "iban", accountNumberKey = "account_number", ibanKey = "iban", routingNumberKey = "routing_number", swiftKey = "swift", reconstructed = false, pageId = undefined, }) {
        super({ prediction, valueKey, reconstructed, pageId });
        this.accountNumber = undefined;
        this.iban = undefined;
        this.routingNumber = undefined;
        this.swift = undefined;
        if (__classPrivateFieldGet(PaymentDetails, _a, "m", _PaymentDetails_isKeySet).call(PaymentDetails, prediction[accountNumberKey])) {
            this.accountNumber = prediction[accountNumberKey];
        }
        if (__classPrivateFieldGet(PaymentDetails, _a, "m", _PaymentDetails_isKeySet).call(PaymentDetails, prediction[ibanKey])) {
            this.iban = prediction[ibanKey];
        }
        if (__classPrivateFieldGet(PaymentDetails, _a, "m", _PaymentDetails_isKeySet).call(PaymentDetails, prediction[routingNumberKey])) {
            this.routingNumber = prediction[routingNumberKey];
        }
        if (__classPrivateFieldGet(PaymentDetails, _a, "m", _PaymentDetails_isKeySet).call(PaymentDetails, prediction[swiftKey])) {
            this.swift = prediction[swiftKey];
        }
    }
    toString() {
        let str = "";
        if (this.accountNumber !== undefined) {
            str += `${this.accountNumber}; `;
        }
        if (this.iban !== undefined) {
            str += `${this.iban}; `;
        }
        if (this.routingNumber !== undefined) {
            str += `${this.routingNumber}; `;
        }
        if (this.swift !== undefined) {
            str += `${this.swift}; `;
        }
        return str;
    }
}
exports.PaymentDetails = PaymentDetails;
_a = PaymentDetails, _PaymentDetails_isKeySet = function _PaymentDetails_isKeySet(value) {
    return typeof value === "string" && value !== "N/A";
};
