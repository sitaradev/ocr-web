"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TextField = void 0;
const field_1 = require("./field");
/**
 * A field containing a text value.
 */
class TextField extends field_1.Field {
    constructor({ prediction, valueKey = "value", reconstructed = false, pageId, }) {
        super({ prediction, valueKey, reconstructed, pageId });
    }
}
exports.TextField = TextField;
