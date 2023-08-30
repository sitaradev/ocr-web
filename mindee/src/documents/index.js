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
exports.eu = exports.us = exports.fr = exports.Document = exports.ProofOfAddressV1 = exports.MindeeVisionV1 = exports.CropperV1 = exports.getLineItems = exports.CustomV1 = exports.FinancialDocumentV1 = exports.FinancialDocumentV0 = exports.PassportV1 = exports.ReceiptV5 = exports.ReceiptV4 = exports.ReceiptV3 = exports.PageGroup = exports.InvoiceSplitterV1 = exports.InvoiceV4 = exports.InvoiceV3 = void 0;
var invoiceV3_1 = require("./invoice/invoiceV3");
Object.defineProperty(exports, "InvoiceV3", { enumerable: true, get: function () { return invoiceV3_1.InvoiceV3; } });
var invoiceV4_1 = require("./invoice/invoiceV4");
Object.defineProperty(exports, "InvoiceV4", { enumerable: true, get: function () { return invoiceV4_1.InvoiceV4; } });
var invoiceSplitterV1_1 = require("./invoiceSplitter/invoiceSplitterV1");
Object.defineProperty(exports, "InvoiceSplitterV1", { enumerable: true, get: function () { return invoiceSplitterV1_1.InvoiceSplitterV1; } });
Object.defineProperty(exports, "PageGroup", { enumerable: true, get: function () { return invoiceSplitterV1_1.PageGroup; } });
var receiptV3_1 = require("./receipt/receiptV3");
Object.defineProperty(exports, "ReceiptV3", { enumerable: true, get: function () { return receiptV3_1.ReceiptV3; } });
var receiptV4_1 = require("./receipt/receiptV4");
Object.defineProperty(exports, "ReceiptV4", { enumerable: true, get: function () { return receiptV4_1.ReceiptV4; } });
var receiptV5_1 = require("./receipt/receiptV5");
Object.defineProperty(exports, "ReceiptV5", { enumerable: true, get: function () { return receiptV5_1.ReceiptV5; } });
var passportV1_1 = require("./passport/passportV1");
Object.defineProperty(exports, "PassportV1", { enumerable: true, get: function () { return passportV1_1.PassportV1; } });
var financialDocumentV0_1 = require("./financialDocument/financialDocumentV0");
Object.defineProperty(exports, "FinancialDocumentV0", { enumerable: true, get: function () { return financialDocumentV0_1.FinancialDocumentV0; } });
var financialDocumentV1_1 = require("./financialDocument/financialDocumentV1");
Object.defineProperty(exports, "FinancialDocumentV1", { enumerable: true, get: function () { return financialDocumentV1_1.FinancialDocumentV1; } });
var customV1_1 = require("./custom/customV1");
Object.defineProperty(exports, "CustomV1", { enumerable: true, get: function () { return customV1_1.CustomV1; } });
var lineitems_1 = require("./custom/lineitems");
Object.defineProperty(exports, "getLineItems", { enumerable: true, get: function () { return lineitems_1.getLineItems; } });
var cropperV1_1 = require("./cropper/cropperV1");
Object.defineProperty(exports, "CropperV1", { enumerable: true, get: function () { return cropperV1_1.CropperV1; } });
var mindeeVisionV1_1 = require("./mindeeVision/mindeeVisionV1");
Object.defineProperty(exports, "MindeeVisionV1", { enumerable: true, get: function () { return mindeeVisionV1_1.MindeeVisionV1; } });
var proofOfAddressV1_1 = require("./proofOfAddress/proofOfAddressV1");
Object.defineProperty(exports, "ProofOfAddressV1", { enumerable: true, get: function () { return proofOfAddressV1_1.ProofOfAddressV1; } });
var document_1 = require("./document");
Object.defineProperty(exports, "Document", { enumerable: true, get: function () { return document_1.Document; } });
exports.fr = __importStar(require("./fr"));
exports.us = __importStar(require("./us"));
exports.eu = __importStar(require("./eu"));
