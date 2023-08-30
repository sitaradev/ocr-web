"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrientationField = void 0;
const base_1 = require("./base");
/**
 * The clockwise rotation to apply (in degrees) to make the image upright.
 */
class OrientationField extends base_1.BaseField {
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     */
    constructor({ prediction, valueKey = "value", reconstructed = false, pageId, }) {
        super({ prediction, valueKey, reconstructed });
        const orientations = [0, 90, 180, 270];
        this.pageId = pageId;
        this.value = parseInt(prediction[valueKey]);
        if (!orientations.includes(this.value))
            this.value = 0;
    }
    toString() {
        return `${this.value} degrees`;
    }
}
exports.OrientationField = OrientationField;
