"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Locale = void 0;
const base_1 = require("./base");
/**
 * The locale detected on the document.
 */
class Locale extends base_1.BaseField {
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     */
    constructor({ prediction, reconstructed = false }) {
        const valueKey = prediction.value !== undefined ? "value" : "language";
        super({ prediction, valueKey, reconstructed });
        this.confidence = prediction.confidence ? prediction.confidence : 0.0;
        this.language = undefined;
        this.country = undefined;
        this.currency = undefined;
        if ("language" in prediction && prediction.language !== "N/A")
            this.language = prediction.language;
        if ("country" in prediction && prediction.country !== "N/A")
            this.country = prediction.country;
        if ("currency" in prediction && prediction.currency !== "N/A")
            this.currency = prediction.currency;
    }
    toString() {
        let outStr = "";
        if (this.value) {
            outStr += `${this.value}; `;
        }
        if (this.language) {
            outStr += `${this.language}; `;
        }
        if (this.country) {
            outStr += `${this.country}; `;
        }
        if (this.currency) {
            outStr += `${this.currency};`;
        }
        return outStr.trimEnd();
    }
}
exports.Locale = Locale;
