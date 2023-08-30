"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyRegistration = void 0;
const field_1 = require("./field");
/**
 * A company registration item.
 */
class CompanyRegistration extends field_1.Field {
    constructor({ prediction, valueKey = "value", reconstructed = false, pageId, }) {
        super({ prediction, valueKey, reconstructed, pageId });
        this.type = prediction.type;
    }
}
exports.CompanyRegistration = CompanyRegistration;
