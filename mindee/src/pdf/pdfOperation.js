"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.countPages = exports.extractPages = void 0;
const handler_1 = require("../errors/handler");
const pdf_lib_1 = require("pdf-lib");
const inputs_1 = require("../inputs");
const errors_1 = require("../errors");
/**
 * Cut pages from a pdf file. If pages index are out of bound, it will throw an error.
 * @param file
 * @param pageOptions
 * @returns the new cutted pdf file.
 */
async function extractPages(file, pageOptions) {
    const currentPdf = await pdf_lib_1.PDFDocument.load(file, {
        ignoreEncryption: true,
    });
    const newPdf = await pdf_lib_1.PDFDocument.create();
    if (pageOptions.pageIndexes.length > currentPdf.getPageCount()) {
        handler_1.errorHandler.throw(new errors_1.MindeeError(`The total indexes of pages to cut is superior to the total page count of the file (${currentPdf.getPageCount()}).`));
    }
    if (currentPdf.getPageCount() < pageOptions.onMinPages) {
        return { file: file, totalPagesRemoved: 0 };
    }
    const pageIndexes = [];
    pageOptions.pageIndexes.forEach((pageIndex) => {
        if (pageIndex < 0) {
            pageIndexes.push(currentPdf.getPageCount() - Math.abs(pageIndex));
        }
        else {
            pageIndexes.push(pageIndex);
        }
    });
    if (!pageIndexes.every((v) => currentPdf.getPageIndices().includes(v))) {
        handler_1.errorHandler.throw(new errors_1.MindeeError(`Some indexes pages
        (${pageIndexes.join(",")})
        don't exist in the file
        (${currentPdf.getPageIndices().join(", ")})`));
    }
    if (pageOptions.operation === inputs_1.PageOptionsOperation.KeepOnly) {
        const keptPages = await newPdf.copyPages(currentPdf, pageIndexes);
        keptPages.forEach((keptPage) => {
            newPdf.addPage(keptPage);
        });
    }
    else if (pageOptions.operation === inputs_1.PageOptionsOperation.Remove) {
        const pagesToKeep = currentPdf
            .getPageIndices()
            .filter((v) => !pageIndexes.includes(v));
        const keptPages = await newPdf.copyPages(currentPdf, pagesToKeep);
        keptPages.forEach((keptPage) => {
            newPdf.addPage(keptPage);
        });
    }
    else {
        throw new Error(`The operation ${pageOptions.operation} is not available.`);
    }
    const sumRemovedPages = currentPdf.getPageCount() - newPdf.getPageCount();
    const fileBuffer = Buffer.from(await newPdf.save());
    return { file: fileBuffer, totalPagesRemoved: sumRemovedPages };
}
exports.extractPages = extractPages;
async function countPages(file) {
    const currentPdf = await pdf_lib_1.PDFDocument.load(file, {
        ignoreEncryption: true,
    });
    return currentPdf.getPageCount();
}
exports.countPages = countPages;
