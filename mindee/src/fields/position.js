"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PositionField = void 0;
/**
 * A field indicating a position or area on the document.
 */
class PositionField {
    constructor({ prediction, pageId }) {
        this.pageId = pageId;
        this.boundingBox = prediction.bounding_box;
        this.polygon = prediction.polygon;
        this.quadrangle = prediction.quadrangle;
        this.rectangle = prediction.rectangle;
    }
    toString() {
        return `Polygon with ${this.polygon.length} points.`;
    }
}
exports.PositionField = PositionField;
