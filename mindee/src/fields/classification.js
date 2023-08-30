"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassificationField = void 0;
const base_1 = require("./base");
/**
 * Represents a classifier value.
 */
class ClassificationField extends base_1.BaseField {
    constructor({ prediction, valueKey = "value", reconstructed = false, }) {
        super({ prediction, valueKey, reconstructed });
        this.confidence = prediction.confidence ? prediction.confidence : 0.0;
    }
}
exports.ClassificationField = ClassificationField;
