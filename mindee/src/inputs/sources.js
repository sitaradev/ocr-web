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
exports.BufferInput = exports.UrlInput = exports.BytesInput = exports.StreamInput = exports.Base64Input = exports.PathInput = void 0;
const fs_1 = require("fs");
const path = __importStar(require("path"));
const handler_1 = require("../errors/handler");
const buffer_1 = require("buffer");
const logger_1 = require("../logger");
const base_1 = require("./base");
class PathInput extends base_1.InputSource {
    constructor({ inputPath }) {
        super({
            inputType: base_1.INPUT_TYPE_PATH,
        });
        this.fileObject = buffer_1.Buffer.alloc(0);
        this.inputPath = inputPath;
        this.filename = path.basename(this.inputPath);
    }
    async init() {
        logger_1.logger.debug(`Loading from: ${this.inputPath}`);
        this.fileObject = buffer_1.Buffer.from(await fs_1.promises.readFile(this.inputPath));
        this.mimeType = await this.checkMimetype();
    }
}
exports.PathInput = PathInput;
class Base64Input extends base_1.InputSource {
    constructor({ inputString, filename }) {
        super({
            inputType: base_1.INPUT_TYPE_BASE64,
        });
        this.fileObject = buffer_1.Buffer.alloc(0);
        this.filename = filename;
        this.inputString = inputString;
    }
    async init() {
        this.fileObject = buffer_1.Buffer.from(this.inputString, "base64");
        this.mimeType = await this.checkMimetype();
        // clear out the string
        this.inputString = "";
    }
}
exports.Base64Input = Base64Input;
class StreamInput extends base_1.InputSource {
    constructor({ inputStream, filename }) {
        super({
            inputType: base_1.INPUT_TYPE_STREAM,
        });
        this.fileObject = buffer_1.Buffer.alloc(0);
        this.filename = filename;
        this.inputStream = inputStream;
    }
    async init() {
        this.fileObject = await this.stream2buffer(this.inputStream);
        this.mimeType = await this.checkMimetype();
    }
    async stream2buffer(stream) {
        return new Promise((resolve, reject) => {
            const _buf = Array();
            stream.on("data", (chunk) => _buf.push(chunk));
            stream.on("end", () => resolve(buffer_1.Buffer.concat(_buf)));
            stream.on("error", (err) => reject(`Error converting stream - ${err}`));
        });
    }
}
exports.StreamInput = StreamInput;
class BytesInput extends base_1.InputSource {
    constructor({ inputBytes, filename }) {
        super({
            inputType: base_1.INPUT_TYPE_BYTES,
        });
        this.fileObject = buffer_1.Buffer.alloc(0);
        this.filename = filename;
        this.inputBytes = inputBytes;
    }
    async init() {
        this.fileObject = buffer_1.Buffer.from(this.inputBytes, "hex");
        this.mimeType = await this.checkMimetype();
        // clear out the string
        this.inputBytes = "";
    }
}
exports.BytesInput = BytesInput;
class UrlInput extends base_1.InputSource {
    constructor({ url }) {
        super({
            inputType: base_1.INPUT_TYPE_URL,
        });
        this.url = url;
    }
    async init() {
        if (!this.url.toLowerCase().startsWith("https")) {
            handler_1.errorHandler.throw(new Error("URL must be HTTPS"));
        }
        this.fileObject = this.url;
    }
}
exports.UrlInput = UrlInput;
class BufferInput extends base_1.InputSource {
    constructor({ buffer, filename }) {
        super({
            inputType: base_1.INPUT_TYPE_BUFFER,
        });
        this.fileObject = buffer;
        this.filename = filename;
    }
    async init() {
        this.mimeType = await this.checkMimetype();
    }
}
exports.BufferInput = BufferInput;
