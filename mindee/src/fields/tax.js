"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var _TaxField_instances, _TaxField_printableValues, _Taxes_instances, _Taxes_lineSeparator;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Taxes = exports.TaxField = void 0;
const field_1 = require("./field");
const amount_1 = require("./amount");
/**
 * Represent a single tax line.
 */
class TaxField extends field_1.Field {
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict to get the tax value
     * @param {String} rateKey - Key to use to get the tax rate in the prediction dict
     * @param {String} codeKey - Key to use to get the tax code in the prediction dict
     * @param {String} baseKey - Key to use to get the base tax in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageNumber - Page ID for multi-page document
     */
    constructor({ prediction, valueKey = "value", rateKey = "rate", codeKey = "code", baseKey = "base", reconstructed = false, pageId = undefined, }) {
        super({ prediction, valueKey, reconstructed, pageId });
        _TaxField_instances.add(this);
        /** The tax amount. */
        this.value = undefined;
        /** The tax rate. */
        this.rate = undefined;
        /**  The tax code (HST, GST... for Canadian; City Tax, State tax for US, etc..). */
        this.code = undefined;
        /**  The tax base */
        this.base = undefined;
        this.rate = +parseFloat(prediction[rateKey]);
        if (isNaN(this.rate))
            this.rate = undefined;
        this.code = prediction[codeKey]?.toString();
        if (this.code === "N/A" || this.code === "None") {
            this.code = undefined;
        }
        this.value = parseFloat(prediction[valueKey]);
        if (isNaN(this.value)) {
            this.value = undefined;
            this.confidence = 0.0;
        }
        this.base = parseFloat(prediction[baseKey]);
        if (isNaN(this.base))
            this.base = undefined;
    }
    /**
     * Output in a format suitable for inclusion in an rST table.
     */
    toTableLine() {
        const printable = __classPrivateFieldGet(this, _TaxField_instances, "m", _TaxField_printableValues).call(this);
        return ("| " +
            printable.base.padEnd(13) +
            " | " +
            printable.code.padEnd(6) +
            " | " +
            printable.rate.padEnd(8) +
            " | " +
            printable.value.padEnd(13) +
            " |");
    }
    /**
     * Default string representation.
     */
    toString() {
        const printable = __classPrivateFieldGet(this, _TaxField_instances, "m", _TaxField_printableValues).call(this);
        return ("Base: " +
            printable.base +
            ", Code: " +
            printable.code +
            ", Rate (%): " +
            printable.rate +
            ", Amount: " +
            printable.value).trim();
    }
}
exports.TaxField = TaxField;
_TaxField_instances = new WeakSet(), _TaxField_printableValues = function _TaxField_printableValues() {
    return {
        code: this.code ?? "",
        base: this.base !== undefined ? (0, amount_1.floatToString)(this.base) : "",
        rate: this.rate !== undefined ? (0, amount_1.floatToString)(this.rate) : "",
        value: this.value !== undefined ? (0, amount_1.floatToString)(this.value) : "",
    };
};
/**
 * Represent all items.
 */
class Taxes extends Array {
    constructor() {
        super(...arguments);
        _Taxes_instances.add(this);
    }
    init(prediction, pageId) {
        for (const entry of prediction) {
            this.push(new TaxField({
                prediction: entry,
                pageId: pageId,
            }));
        }
        return this;
    }
    toString() {
        let outStr = `
${__classPrivateFieldGet(this, _Taxes_instances, "m", _Taxes_lineSeparator).call(this, "-")}
  | Base          | Code   | Rate (%) | Amount        |
${__classPrivateFieldGet(this, _Taxes_instances, "m", _Taxes_lineSeparator).call(this, "=")}`;
        for (const entry of this.entries()) {
            outStr += `\n  ${entry[1].toTableLine()}\n${__classPrivateFieldGet(this, _Taxes_instances, "m", _Taxes_lineSeparator).call(this, "-")}`;
        }
        return outStr;
    }
}
exports.Taxes = Taxes;
_Taxes_instances = new WeakSet(), _Taxes_lineSeparator = function _Taxes_lineSeparator(char) {
    let outStr = "  ";
    outStr += `+${char.repeat(15)}`;
    outStr += `+${char.repeat(8)}`;
    outStr += `+${char.repeat(10)}`;
    outStr += `+${char.repeat(15)}`;
    return outStr + "+";
};
