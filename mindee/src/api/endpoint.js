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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomEndpoint = exports.StandardEndpoint = exports.Endpoint = exports.API_HOST_ENVVAR_NAME = exports.API_KEY_ENVVAR_NAME = exports.STANDARD_API_OWNER = void 0;
const https = __importStar(require("https"));
const os = __importStar(require("os"));
const package_json_1 = require("../../package.json");
const url_1 = require("url");
const form_data_1 = __importDefault(require("form-data"));
const logger_1 = require("../logger");
const DEFAULT_MINDEE_API_HOST = "api.mindee.net";
const USER_AGENT = `mindee-api-nodejs@v${package_json_1.version} nodejs-${process.version} ${os.type().toLowerCase()}`;
exports.STANDARD_API_OWNER = "mindee";
exports.API_KEY_ENVVAR_NAME = "MINDEE_API_KEY";
exports.API_HOST_ENVVAR_NAME = "MINDEE_API_HOST";
class Endpoint {
    constructor(owner, urlName, version, apiKey) {
        this.owner = owner;
        this.urlName = urlName;
        this.version = version;
        this.apiKey = apiKey || this.apiKeyFromEnv();
        this.hostname = this.hostnameFromEnv();
        this.urlRoot = `/v1/products/${owner}/${urlName}/v${version}`;
        this.baseHeaders = {
            "User-Agent": USER_AGENT,
            Authorization: `Token ${this.apiKey}`,
        };
    }
    /**
     * Make a request to POST a document for prediction.
     * @param input
     * @param includeWords
     * @param cropper
     */
    predictReqPost(input, includeWords = false, cropper = false) {
        return this.sendFileForPrediction(input, "predict", includeWords, cropper);
    }
    /**
     * Make a request to POST a document for async prediction.
     * @param input
     * @param includeWords
     * @param cropper
     */
    predictAsyncReqPost(input, includeWords = false, cropper = false) {
        return this.sendFileForPrediction(input, "predict_async", includeWords, cropper);
    }
    /**
     * Make a request to GET the status of a document in the queue.
     * @param queueId
     */
    documentQueueReqGet(queueId) {
        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                headers: this.baseHeaders,
                hostname: this.hostname,
                path: `${this.urlRoot}/documents/queue/${queueId}`,
            };
            const req = this.readResponse(options, resolve, reject);
            // potential ECONNRESET if we don't end the request.
            req.end();
        });
    }
    /**
     * Make a request to GET a document.
     * @param documentId
     */
    documentGetReq(documentId) {
        return new Promise((resolve, reject) => {
            const options = {
                method: "GET",
                headers: this.baseHeaders,
                hostname: this.hostname,
                path: `${this.urlRoot}/documents/${documentId}`,
            };
            const req = this.readResponse(options, resolve, reject);
            // potential ECONNRESET if we don't end the request.
            req.end();
        });
    }
    /**
     * Send a file to a prediction API.
     * @param input
     * @param predictUrl
     * @param includeWords
     * @param cropper
     */
    sendFileForPrediction(input, predictUrl, includeWords = false, cropper = false) {
        return new Promise((resolve, reject) => {
            const searchParams = new url_1.URLSearchParams();
            if (cropper) {
                searchParams.append("cropper", "true");
            }
            const form = new form_data_1.default();
            if (input.fileObject instanceof Buffer) {
                form.append("document", input.fileObject, { filename: input.filename });
            }
            else {
                form.append("document", input.fileObject);
            }
            if (includeWords) {
                form.append("include_mvision", "true");
            }
            const headers = { ...this.baseHeaders, ...form.getHeaders() };
            let path = `${this.urlRoot}/${predictUrl}`;
            if (searchParams.keys.length > 0) {
                path += `?${searchParams}`;
            }
            const options = {
                method: "POST",
                headers: headers,
                hostname: this.hostname,
                path: path,
            };
            const req = this.readResponse(options, resolve, reject);
            form.pipe(req);
            // potential ECONNRESET if we don't end the request.
            req.end();
        });
    }
    readResponse(options, resolve, reject) {
        logger_1.logger.debug(`${options.method}: https://${options.hostname}${options.path}`);
        const req = https.request(options, function (res) {
            // when the encoding is set, data chunks will be strings
            res.setEncoding("utf-8");
            let responseBody = "";
            res.on("data", function (chunk) {
                logger_1.logger.debug("Receiving data ...");
                responseBody += chunk;
            });
            res.on("end", function () {
                logger_1.logger.debug("Parsing the response ...");
                // handle empty responses from server, for example in the case of redirects
                if (!responseBody) {
                    responseBody = "{}";
                }
                try {
                    const parsedResponse = JSON.parse(responseBody);
                    try {
                        resolve({
                            messageObj: res,
                            data: parsedResponse,
                        });
                    }
                    catch (error) {
                        logger_1.logger.error("Could not construct the return object.");
                        reject(error);
                    }
                }
                catch (error) {
                    logger_1.logger.error("Could not parse the return as JSON.");
                    logger_1.logger.debug(responseBody);
                    reject(error);
                }
            });
        });
        req.on("error", (err) => {
            reject(err);
        });
        return req;
    }
    apiKeyFromEnv() {
        const envVarValue = process.env[exports.API_KEY_ENVVAR_NAME];
        if (envVarValue) {
            logger_1.logger.debug(`Set ${this.urlName} v${this.version} API key from environment: ${exports.API_KEY_ENVVAR_NAME}`);
            return envVarValue;
        }
        return "";
    }
    hostnameFromEnv() {
        const envVarValue = process.env[exports.API_HOST_ENVVAR_NAME];
        if (envVarValue) {
            logger_1.logger.debug(`Set the API hostname to ${envVarValue}`);
            return envVarValue;
        }
        return DEFAULT_MINDEE_API_HOST;
    }
}
exports.Endpoint = Endpoint;
class StandardEndpoint extends Endpoint {
    constructor(endpointName, version, apiKey) {
        super(exports.STANDARD_API_OWNER, endpointName, version, apiKey);
    }
}
exports.StandardEndpoint = StandardEndpoint;
class CustomEndpoint extends Endpoint {
    constructor(endpointName, accountName, version, apiKey) {
        super(accountName, endpointName, version, apiKey);
    }
}
exports.CustomEndpoint = CustomEndpoint;
