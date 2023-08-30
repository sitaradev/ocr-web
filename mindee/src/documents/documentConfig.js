"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FinancialDocV0Config = exports.CustomDocConfig = exports.DocumentConfig = void 0;
const api_1 = require("../api");
const index_1 = require("./index");
const handler_1 = require("../errors/handler");
class DocumentConfig {
    constructor(documentClass, endpoints, documentType) {
        this.documentType = documentType;
        this.endpoints = endpoints;
        this.documentClass = documentClass;
    }
    async predict(params) {
        this.checkApiKeys();
        await params.inputDoc.init();
        if (params.pageOptions !== undefined) {
            await this.cutDocPages(params.inputDoc, params.pageOptions);
        }
        const response = await this.predictRequest(params.inputDoc, params.includeWords, params.cropper);
        return this.buildResult(response, params.inputDoc);
    }
    async predictAsync(params) {
        this.checkApiKeys();
        await params.inputDoc.init();
        if (params.pageOptions !== undefined) {
            await this.cutDocPages(params.inputDoc, params.pageOptions);
        }
        const response = await this.endpoints[0].predictAsyncReqPost(params.inputDoc, params.includeWords, params.cropper);
        const statusCode = response.messageObj.statusCode;
        if (statusCode === undefined || statusCode >= 300) {
            this.handleError(response, statusCode);
        }
        return new api_1.AsyncPredictResponse(response.data);
    }
    async getQueuedDocument(queuId) {
        this.checkApiKeys();
        const queueResponse = await this.endpoints[0].documentQueueReqGet(queuId);
        const queueStatusCode = queueResponse.messageObj.statusCode;
        if (queueStatusCode === undefined ||
            queueStatusCode < 200 ||
            queueStatusCode >= 400) {
            this.handleError(queueResponse, queueStatusCode);
        }
        if (queueStatusCode === 302 &&
            queueResponse.messageObj.headers.location !== undefined) {
            const docId = queueResponse.messageObj.headers.location.split("/").pop();
            if (docId !== undefined) {
                const docResponse = await this.endpoints[0].documentGetReq(docId);
                const document = this.buildResult(docResponse);
                return new api_1.AsyncPredictResponse(docResponse.data, document);
            }
        }
        return new api_1.AsyncPredictResponse(queueResponse.data);
    }
    async cutDocPages(inputDoc, pageOptions) {
        if (inputDoc.isPdf()) {
            await inputDoc.cutPdf(pageOptions);
        }
    }
    // this is only a separate function because of financial docs
    async predictRequest(inputDoc, includeWords, cropping) {
        return await this.endpoints[0].predictReqPost(inputDoc, includeWords, cropping);
    }
    handleError(response, statusCode) {
        const errorMessage = JSON.stringify(response.data, null, 2);
        handler_1.errorHandler.throw(new Error(`${this.endpoints[0].urlName} API ${statusCode} HTTP error: ${errorMessage}`));
    }
    buildResult(response, inputFile) {
        const statusCode = response.messageObj.statusCode;
        if (statusCode === undefined || statusCode > 201) {
            this.handleError(response, statusCode);
        }
        return new api_1.Response(this.documentClass, {
            httpResponse: response,
            documentType: this.documentType,
            error: false,
            input: inputFile,
        });
    }
    checkApiKeys() {
        this.endpoints.forEach((endpoint) => {
            if (!endpoint.apiKey) {
                throw new Error(`Missing API key for '${endpoint.urlName} ${endpoint.version}', check your Client configuration.
You can set this using the '${api_1.API_KEY_ENVVAR_NAME}' environment variable.\n`);
            }
        });
    }
}
exports.DocumentConfig = DocumentConfig;
class CustomDocConfig extends DocumentConfig {
    constructor({ endpointName, accountName, version, apiKey, }) {
        const endpoints = [
            new api_1.CustomEndpoint(endpointName, accountName, version, apiKey),
        ];
        super(index_1.CustomV1, endpoints, endpointName);
    }
}
exports.CustomDocConfig = CustomDocConfig;
class FinancialDocV0Config extends DocumentConfig {
    constructor(apiKey) {
        const endpoints = [
            new api_1.StandardEndpoint("invoices", "3", apiKey),
            new api_1.StandardEndpoint("expense_receipts", "3", apiKey),
        ];
        super(index_1.FinancialDocumentV0, endpoints);
    }
    async predictRequest(inputDoc, includeWords, cropping) {
        let endpoint;
        if (inputDoc.isPdf()) {
            endpoint = this.endpoints[0];
        }
        else {
            endpoint = this.endpoints[1];
        }
        return await endpoint.predictReqPost(inputDoc, includeWords, cropping);
    }
}
exports.FinancialDocV0Config = FinancialDocV0Config;
