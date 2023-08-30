"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListField = exports.ListFieldValue = exports.ClassificationField = void 0;
const geometry_1 = require("../../geometry");
class ClassificationField {
    constructor({ prediction }) {
        this.value = prediction["value"];
        this.confidence = prediction["confidence"];
    }
    toString() {
        return `${this.value}`;
    }
}
exports.ClassificationField = ClassificationField;
class ListFieldValue {
    constructor(prediction) {
        /**
         * Contains exactly 4 relative vertices coordinates (points) of a right
         * rectangle containing the word in the document.
         */
        this.bbox = [];
        /**
         * Contains the relative vertices coordinates (points) of a polygon containing
         * the word in the document.
         */
        this.polygon = [];
        this.content = prediction["content"];
        this.confidence = prediction["confidence"];
        if (prediction["polygon"]) {
            this.polygon = prediction["polygon"];
            this.bbox = (0, geometry_1.getBoundingBox)(prediction.polygon);
        }
    }
    toString() {
        return `${this.content}`;
    }
}
exports.ListFieldValue = ListFieldValue;
class ListField {
    constructor({ prediction, reconstructed = false, pageId }) {
        this.values = [];
        this.confidence = prediction["confidence"];
        this.reconstructed = reconstructed;
        this.pageId = pageId !== undefined ? pageId : prediction["page_id"];
        if (Object.prototype.hasOwnProperty.call(prediction, "values")) {
            prediction["values"].forEach((field) => {
                this.values.push(new ListFieldValue(field));
            });
        }
    }
    contentsList() {
        return this.values.map((item) => item.content);
    }
    contentsString(separator = " ") {
        return this.values.map((item) => `${item.content}`).join(separator);
    }
    toString() {
        return this.contentsString();
    }
}
exports.ListField = ListField;
