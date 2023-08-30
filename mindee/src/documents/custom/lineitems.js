"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLineItems = exports.LineItems = exports.Line = void 0;
const handler_1 = require("../../errors/handler");
const errors_1 = require("../../errors");
const geometry_1 = require("../../geometry");
const fields_1 = require("./fields");
const math_1 = require("../../math");
class Line {
    constructor(rowNumber, heightTolerance) {
        this.rowNumber = rowNumber;
        this.bbox = [1, 1, 0, 0];
        this.fields = new Map();
        this.heightTolerance = heightTolerance;
    }
    /**
     * Extends the current bbox of the line with the bbox.
     */
    extendWithBbox(bbox) {
        this.bbox = (0, geometry_1.mergeBbox)(this.bbox, bbox);
    }
    /**
     * Extends the current bbox of the line with the polygon.
     */
    extendWith(polygon) {
        this.bbox = (0, geometry_1.mergeBbox)(this.bbox, (0, geometry_1.getBbox)(polygon));
    }
    /**
     * Check if the bbox fits the current line.
     */
    contains(bbox) {
        return (0, math_1.precisionEquals)(this.bbox[1], bbox[1], this.heightTolerance);
    }
    updateField(name, fieldValue) {
        if (!this.fields.has(name)) {
            this.fields.set(name, fieldValue);
        }
        else {
            const existingField = this.fields.get(name);
            if (existingField === undefined) {
                handler_1.errorHandler.throw(new errors_1.MindeeError(`The field '${name}' should exist but was not found.`));
                return;
            }
            const mergedContent = existingField?.content === undefined
                ? fieldValue.content
                : existingField.content + " " + fieldValue.content;
            const mergedBbox = (0, geometry_1.getBBoxForPolygons)([
                existingField.polygon,
                fieldValue.polygon,
            ]);
            this.fields.set(name, new fields_1.ListFieldValue({
                content: mergedContent,
                confidence: existingField.confidence * fieldValue.confidence,
                polygon: (0, geometry_1.getBoundingBoxFromBBox)(mergedBbox),
            }));
        }
    }
}
exports.Line = Line;
class LineItems {
    constructor(lines) {
        this.rows = [];
        this.rows = lines;
    }
}
exports.LineItems = LineItems;
function getLineItems(anchorNames, heigthLineTolerance, fieldNamesTargeted, fields) {
    const fieldsToTransformIntoLines = new Map([...fields].filter(([k]) => fieldNamesTargeted.includes(k)));
    const anchorName = findBestAnchor(anchorNames, fieldsToTransformIntoLines);
    const lineItemsPrepared = prepare(anchorName, fieldsToTransformIntoLines, heigthLineTolerance);
    lineItemsPrepared.rows.forEach((currentLine) => {
        fieldsToTransformIntoLines.forEach((field, fieldName) => {
            field.values.forEach((listFieldValue) => {
                const minYCurrentValue = (0, geometry_1.getMinMaxY)(listFieldValue.polygon).min;
                if (minYCurrentValue < currentLine.bbox[3] &&
                    minYCurrentValue >= currentLine.bbox[1]) {
                    currentLine.updateField(fieldName, listFieldValue);
                }
            });
        });
    });
    return lineItemsPrepared;
}
exports.getLineItems = getLineItems;
function findBestAnchor(possibleAnchorNames, fields) {
    let anchorName = "";
    let anchorRows = 0;
    possibleAnchorNames.forEach((fieldName) => {
        const fieldValues = fields.get(fieldName)?.values;
        if (fieldValues !== undefined && fieldValues.length > anchorRows) {
            anchorRows = fieldValues.length;
            anchorName = fieldName;
        }
    });
    if (anchorName === "") {
        handler_1.errorHandler.throw(new errors_1.MindeeError("No anchor was found."));
    }
    return anchorName;
}
function prepare(anchorName, fields, heigthLineTolerance) {
    const lineItemsPrepared = [];
    const anchorField = fields.get(anchorName);
    if (anchorField === undefined || anchorField.values.length === 0) {
        handler_1.errorHandler.throw(new errors_1.MindeeError("No lines have been detected."));
    }
    let currentLineNumber = 1;
    let currentLine = new Line(currentLineNumber, heigthLineTolerance);
    if (anchorField !== undefined) {
        let currentValue = anchorField.values[0];
        currentLine.extendWith(currentValue.polygon);
        for (let index = 1; index < anchorField.values.length; index++) {
            currentValue = anchorField.values[index];
            const currentFieldBbox = (0, geometry_1.getBbox)(currentValue.polygon);
            if (!currentLine.contains(currentFieldBbox)) {
                lineItemsPrepared.push(currentLine);
                currentLineNumber++;
                currentLine = new Line(currentLineNumber, heigthLineTolerance);
            }
            currentLine.extendWithBbox(currentFieldBbox);
        }
        if (lineItemsPrepared.filter((line) => line.rowNumber === currentLineNumber)
            .length === 0) {
            lineItemsPrepared.push(currentLine);
        }
    }
    return new LineItems(lineItemsPrepared);
}
