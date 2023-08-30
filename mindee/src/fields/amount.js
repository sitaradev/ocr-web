"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Amount = exports.floatToString = void 0;
const field_1 = require("./field");
function floatToString(value) {
    return value.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 3,
        useGrouping: false,
    });
}
exports.floatToString = floatToString;
/**
 * A field containing an amount value.
 */
class Amount extends field_1.Field {
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     */
    constructor({ prediction, valueKey = "value", reconstructed = false, pageId = undefined, }) {
        super({ prediction, valueKey, reconstructed, pageId });
        /** The value. */
        this.value = undefined;
        this.value = +parseFloat(prediction[valueKey]).toFixed(3);
        if (isNaN(this.value)) {
            this.value = undefined;
            this.confidence = 0.0;
        }
    }
    toString() {
        if (this.value !== undefined) {
            return floatToString(this.value);
        }
        return "";
    }
}
exports.Amount = Amount;
