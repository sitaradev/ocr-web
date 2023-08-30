"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FullText = void 0;
const geometry = __importStar(require("../geometry"));
function orderLines(fullText) {
    const lines = [];
    const indexes = [];
    let current = undefined;
    fullText.forEach(() => {
        let line = [];
        fullText.forEach((word, idx) => {
            if (!indexes.includes(idx)) {
                if (current === undefined) {
                    current = word;
                    indexes.push(idx);
                    line = [current];
                }
                else {
                    const centroid = geometry.getCentroid(word.polygon);
                    if (geometry.isPointInPolygonY(centroid, current.polygon)) {
                        line.push(word);
                        indexes.push(idx);
                    }
                }
            }
        });
        current = undefined;
        if (line.length > 0) {
            lines.push(line);
        }
    });
    const orderedLines = [];
    lines.forEach((line) => {
        const sortedLine = line.sort((a, b) => {
            return geometry.relativeX(a.polygon) - geometry.relativeX(b.polygon);
        });
        orderedLines.push(sortedLine);
    });
    orderedLines.reverse();
    return orderedLines;
}
/**
 * OCR extraction from the entire document.
 */
class FullText {
    constructor() {
        this.words = [];
    }
    /**
     * Order all text on a page into lines.
     * WARNING: This feature is experimental.
     */
    toLines() {
        return orderLines(this.words);
    }
    /**
     * WARNING: This feature is experimental.
     */
    toString() {
        let outStr = "";
        const lines = this.toLines();
        lines.forEach((line) => {
            const lineStr = line.map((word) => word.text).join(" ");
            outStr += `${lineStr}\n`;
        });
        return outStr;
    }
}
exports.FullText = FullText;
