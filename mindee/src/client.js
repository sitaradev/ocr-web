"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Client = exports.DocumentClient = void 0;
const inputs_1 = require("./inputs");
const api_1 = require("./api");
const documents_1 = require("./documents");
const documentConfig_1 = require("./documents/documentConfig");
const handler_1 = require("./errors/handler");
const logger_1 = require("./logger");
class DocumentClient {
    constructor(docConfigs, inputSource) {
        this.inputSource = inputSource;
        this.docConfigs = docConfigs;
    }
    /**
     * Send a document to a synchronous endpoint and parse the predictions.
     * @param documentClass
     * @param params
     */
    async parse(documentClass, params = {
        endpointName: "",
        accountName: "",
        fullText: false,
        cropper: false,
        pageOptions: undefined,
    }) {
        const docConfig = this.getDocConfig(documentClass, params.endpointName, params.accountName);
        if (this.inputSource === undefined) {
            throw new Error("The 'parse' function requires an input document.");
        }
        return await docConfig.predict({
            inputDoc: this.inputSource,
            includeWords: this.getBooleanParam(params.fullText),
            pageOptions: params.pageOptions,
            cropper: this.getBooleanParam(params.cropper),
        });
    }
    /**
     * Send the document to an asynchronous endpoint and return its ID in the queue.
     * @param documentClass
     * @param params
     */
    async enqueue(documentClass, params = {
        endpointName: "",
        accountName: "",
        fullText: false,
        cropper: false,
        pageOptions: undefined,
    }) {
        const docConfig = this.getDocConfig(documentClass, params.endpointName, params.accountName);
        if (this.inputSource === undefined) {
            throw new Error("The 'enqueue' function requires an input document.");
        }
        return await docConfig.predictAsync({
            inputDoc: this.inputSource,
            includeWords: this.getBooleanParam(params.fullText),
            pageOptions: params.pageOptions,
            cropper: this.getBooleanParam(params.cropper),
        });
    }
    async parseQueued(documentClass, queueId, params = {
        endpointName: "",
        accountName: "",
    }) {
        const docConfig = this.getDocConfig(documentClass, params.endpointName, params.accountName);
        return await docConfig.getQueuedDocument(queueId);
    }
    getBooleanParam(param) {
        return param !== undefined ? param : false;
    }
    getDocConfig(documentClass, endpointName, accountName) {
        const docType = endpointName === undefined || endpointName === ""
            ? documentClass.name
            : endpointName;
        const found = [];
        this.docConfigs.forEach((config, configKey) => {
            if (configKey[1] === docType) {
                found.push(configKey);
            }
        });
        if (found.length === 0) {
            throw `Document type not configured: '${docType}'`;
        }
        let configKey = [];
        if (found.length === 1) {
            configKey = found[0];
        }
        else if (accountName) {
            configKey = [accountName, docType];
        }
        const docConfig = this.docConfigs.get(configKey);
        if (docConfig === undefined) {
            // TODO: raise error printing all usernames
            throw `Couldn't find the config '${configKey}'`;
        }
        return docConfig;
    }
}
exports.DocumentClient = DocumentClient;
/**
 * Mindee Client
 */
class Client {
    /**
     * @param options
     */
    constructor({ apiKey = "", throwOnError = true, debug = false, }) {
        this.docConfigs = new Map();
        this.apiKey = apiKey;
        handler_1.errorHandler.throwOnError = throwOnError;
        logger_1.logger.level =
            debug ?? process.env.MINDEE_DEBUG
                ? logger_1.LOG_LEVELS["debug"]
                : logger_1.LOG_LEVELS["warn"];
        logger_1.logger.debug("Client initialized");
        this.addStandardEndpoints();
    }
    // TODO: init only those endpoints we actually need.
    addStandardEndpoints() {
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.FinancialDocumentV0.name], new documentConfig_1.FinancialDocV0Config(this.apiKey));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.FinancialDocumentV1.name], new documentConfig_1.DocumentConfig(documents_1.FinancialDocumentV1, [
            new api_1.StandardEndpoint("financial_document", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.InvoiceV3.name], new documentConfig_1.DocumentConfig(documents_1.InvoiceV3, [
            new api_1.StandardEndpoint("invoices", "3", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.InvoiceV4.name], new documentConfig_1.DocumentConfig(documents_1.InvoiceV4, [
            new api_1.StandardEndpoint("invoices", "4", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.InvoiceSplitterV1.name], new documentConfig_1.DocumentConfig(documents_1.InvoiceSplitterV1, [
            new api_1.StandardEndpoint("invoice_splitter", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.ReceiptV3.name], new documentConfig_1.DocumentConfig(documents_1.ReceiptV3, [
            new api_1.StandardEndpoint("expense_receipts", "3", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.ReceiptV4.name], new documentConfig_1.DocumentConfig(documents_1.ReceiptV4, [
            new api_1.StandardEndpoint("expense_receipts", "4", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.ReceiptV5.name], new documentConfig_1.DocumentConfig(documents_1.ReceiptV5, [
            new api_1.StandardEndpoint("expense_receipts", "5", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.PassportV1.name], new documentConfig_1.DocumentConfig(documents_1.PassportV1, [
            new api_1.StandardEndpoint("passport", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.CropperV1.name], new documentConfig_1.DocumentConfig(documents_1.CropperV1, [
            new api_1.StandardEndpoint("cropper", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.fr.IdCardV1.name], new documentConfig_1.DocumentConfig(documents_1.fr.IdCardV1, [
            new api_1.StandardEndpoint("idcard_fr", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.us.BankCheckV1.name], new documentConfig_1.DocumentConfig(documents_1.us.BankCheckV1, [
            new api_1.StandardEndpoint("bank_check", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.fr.BankAccountDetailsV1.name], new documentConfig_1.DocumentConfig(documents_1.fr.BankAccountDetailsV1, [
            new api_1.StandardEndpoint("bank_account_details", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.fr.BankAccountDetailsV2.name], new documentConfig_1.DocumentConfig(documents_1.fr.BankAccountDetailsV2, [
            new api_1.StandardEndpoint("bank_account_details", "2", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.fr.CarteVitaleV1.name], new documentConfig_1.DocumentConfig(documents_1.fr.CarteVitaleV1, [
            new api_1.StandardEndpoint("carte_vitale", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.eu.LicensePlateV1.name], new documentConfig_1.DocumentConfig(documents_1.eu.LicensePlateV1, [
            new api_1.StandardEndpoint("license_plates", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.MindeeVisionV1.name], new documentConfig_1.DocumentConfig(documents_1.MindeeVisionV1, [
            new api_1.StandardEndpoint("mindee_vision", "1", this.apiKey),
        ]));
        this.docConfigs.set([api_1.STANDARD_API_OWNER, documents_1.ProofOfAddressV1.name], new documentConfig_1.DocumentConfig(documents_1.ProofOfAddressV1, [
            new api_1.StandardEndpoint("proof_of_address", "1", this.apiKey),
        ]));
    }
    /**
     * Add a custom endpoint to the client.
     * @param accountName
     * @param endpointName
     * @param version
     */
    addEndpoint({ accountName, endpointName, version = "1", }) {
        this.docConfigs.set([accountName, endpointName], new documentConfig_1.CustomDocConfig({
            accountName: accountName,
            endpointName: endpointName,
            version: version,
            apiKey: this.apiKey,
        }));
        return this;
    }
    /**
     * Load an input document from a local path.
     * @param inputPath
     */
    docFromPath(inputPath) {
        const doc = new inputs_1.PathInput({
            inputPath: inputPath,
        });
        return new DocumentClient(this.docConfigs, doc);
    }
    /**
     * Load an input document from a base64 encoded string.
     * @param inputString
     * @param filename
     */
    docFromBase64(inputString, filename) {
        const doc = new inputs_1.Base64Input({
            inputString: inputString,
            filename: filename,
        });
        return new DocumentClient(this.docConfigs, doc);
    }
    /**
     * Load an input document from a `stream.Readable` object.
     * @param inputStream
     * @param filename
     */
    docFromStream(inputStream, filename) {
        const doc = new inputs_1.StreamInput({
            inputStream: inputStream,
            filename: filename,
        });
        return new DocumentClient(this.docConfigs, doc);
    }
    /**
     * Load an input document from a bytes string.
     * @param inputBytes
     * @param filename
     */
    docFromBytes(inputBytes, filename) {
        const doc = new inputs_1.BytesInput({
            inputBytes: inputBytes,
            filename: filename,
        });
        return new DocumentClient(this.docConfigs, doc);
    }
    /**
     * Load an input document from a URL.
     * @param url
     */
    docFromUrl(url) {
        const doc = new inputs_1.UrlInput({
            url: url,
        });
        return new DocumentClient(this.docConfigs, doc);
    }
    /**
     * Load an input document from a Buffer.
     * @param buffer
     * @param filename
     */
    docFromBuffer(buffer, filename) {
        const doc = new inputs_1.BufferInput({
            buffer: buffer,
            filename: filename,
        });
        return new DocumentClient(this.docConfigs, doc);
    }
    /**
     * Load an empty input document from an asynchronous call.
     */
    docForAsync() {
        return new DocumentClient(this.docConfigs);
    }
}
exports.Client = Client;
