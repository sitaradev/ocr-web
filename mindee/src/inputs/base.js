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
exports.InputSource = exports.INPUT_TYPE_BUFFER = exports.INPUT_TYPE_URL = exports.INPUT_TYPE_PATH = exports.INPUT_TYPE_BYTES = exports.INPUT_TYPE_BASE64 = exports.INPUT_TYPE_STREAM = void 0;
const fileType = __importStar(require("file-type"));
const path = __importStar(require("path"));
const pdf_1 = require("../pdf");
const logger_1 = require("../logger");
const handler_1 = require("../errors/handler");
exports.INPUT_TYPE_STREAM = "stream";
exports.INPUT_TYPE_BASE64 = "base64";
exports.INPUT_TYPE_BYTES = "bytes";
exports.INPUT_TYPE_PATH = "path";
exports.INPUT_TYPE_URL = "URL";
exports.INPUT_TYPE_BUFFER = "buffer";
const MIMETYPES = new Map([
    [".pdf", "application/pdf"],
    [".heic", "image/heic"],
    [".jpg", "image/jpeg"],
    [".jpeg", "image/jpeg"],
    [".png", "image/png"],
    [".tif", "image/tiff"],
    [".tiff", "image/tiff"],
    [".webp", "image/webp"],
]);
const ALLOWED_INPUT_TYPES = [
    exports.INPUT_TYPE_STREAM,
    exports.INPUT_TYPE_BASE64,
    exports.INPUT_TYPE_BYTES,
    exports.INPUT_TYPE_PATH,
    exports.INPUT_TYPE_URL,
    exports.INPUT_TYPE_BUFFER,
];
class InputSource {
    /**
     * @param {String} inputType - the type of input used in file ("base64", "path", "dummy").
     *                             NB: dummy is only used for tests purposes
     * @param {Boolean} cutPages
     * NB: Because of async calls, init() should be called after creating the object
     */
    constructor({ inputType }) {
        this.filename = "";
        this.mimeType = "";
        // Check if inputType is valid
        if (!ALLOWED_INPUT_TYPES.includes(inputType)) {
            const allowed = Array.from(ALLOWED_INPUT_TYPES.keys()).join(", ");
            handler_1.errorHandler.throw(new Error(`Invalid input type, must be one of ${allowed}.`));
        }
        this.inputType = inputType;
        logger_1.logger.debug(`Loading file from: ${inputType}`);
    }
    async init() {
        throw new Error("not Implemented");
    }
    isPdf() {
        return this.mimeType === "application/pdf";
    }
    async checkMimetype() {
        if (!(this.fileObject instanceof Buffer)) {
            throw new Error(`MIME type cannot be verified on input source of type ${this.inputType}.`);
        }
        let mimeType;
        const fileExt = path.extname(this.filename);
        if (fileExt) {
            mimeType = MIMETYPES.get(fileExt.toLowerCase()) || "";
        }
        else {
            const guess = await fileType.fromBuffer(this.fileObject);
            if (guess !== undefined) {
                mimeType = guess.mime;
            }
            else {
                throw "Could not determine the MIME type of the file";
            }
        }
        if (!mimeType) {
            const allowed = Array.from(MIMETYPES.keys()).join(", ");
            const err = new Error(`Invalid file type, must be one of ${allowed}.`);
            handler_1.errorHandler.throw(err);
        }
        logger_1.logger.debug(`File is of type: ${mimeType}`);
        return mimeType;
    }
    /**
     * Merge PDF pages.
     * @param pageOptions
     */
    async cutPdf(pageOptions) {
        if (!(this.fileObject instanceof Buffer)) {
            throw new Error(`Cannot modify an input source of type ${this.inputType}.`);
        }
        const processedPdf = await (0, pdf_1.extractPages)(this.fileObject, pageOptions);
        this.fileObject = processedPdf.file;
    }
}
exports.InputSource = InputSource;
