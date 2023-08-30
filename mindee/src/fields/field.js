"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Field = void 0;
const base_1 = require("./base");
const geometry_1 = require("../geometry");
/**
 * A basic field with position and page information.
 */
class Field extends base_1.BaseField {
    /**
     * @param {Object} prediction - Prediction object from HTTP response
     * @param {String} valueKey - Key to use in the prediction dict
     * @param {Boolean} reconstructed - Does the object is reconstructed (not extracted by the API)
     * @param {Integer} pageId - Page ID for multi-page document
     * @param {Array<String>} extraFields - Extra fields to get from the prediction and to set as attribute of the Field
     */
    constructor({ prediction, valueKey = "value", reconstructed = false, pageId, }) {
        super({ prediction, valueKey, reconstructed });
        /**
         * Contains the relative vertices coordinates (points) of a polygon containing
         * the field in the document.
         */
        this.polygon = [];
        this.pageId = pageId !== undefined ? pageId : prediction["page_id"];
        this.confidence = prediction.confidence ? prediction.confidence : 0.0;
        if (prediction.polygon) {
            this.polygon = prediction.polygon;
        }
        this.boundingBox = (0, geometry_1.getBoundingBox)(this.polygon);
    }
    /**
    @param {Field[]} array1 - first Array of Fields
    @param {Field[]} array2 - second Array of Fields
    @param {String} attr - Attribute to compare
    @returns {Boolean} - true if all elements in array1 exist in array2 and vice-versa, false otherwise
     */
    static compareArrays(array1, array2, attr = "value") {
        const list1 = array1.map((item) => item[attr]);
        const list2 = array2.map((item) => item[attr]);
        if (list1.length !== list2.length)
            return false;
        for (const item1 of list1) {
            if (!list2.includes(item1))
                return false;
        }
        return true;
    }
    /**
     * @param {Field[]} array - Array of Fields
     * @returns {Number} product of all the fields probaility
     */
    static arrayConfidence(array) {
        let total = 1.0;
        for (const field of array) {
            total *= field.confidence;
            if (isNaN(total))
                return 0.0;
        }
        return total;
    }
}
exports.Field = Field;
