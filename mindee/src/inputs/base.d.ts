/// <reference types="node" />
import { PageOptions } from "./pageOptions";
interface InputProps {
    inputType: string;
}
export declare const INPUT_TYPE_STREAM = "stream";
export declare const INPUT_TYPE_BASE64 = "base64";
export declare const INPUT_TYPE_BYTES = "bytes";
export declare const INPUT_TYPE_PATH = "path";
export declare const INPUT_TYPE_URL = "URL";
export declare const INPUT_TYPE_BUFFER = "buffer";
export declare class InputSource {
    inputType: string;
    filename: string;
    filepath?: string;
    mimeType: string;
    fileObject: Buffer | string;
    /**
     * @param {String} inputType - the type of input used in file ("base64", "path", "dummy").
     *                             NB: dummy is only used for tests purposes
     * @param {Boolean} cutPages
     * NB: Because of async calls, init() should be called after creating the object
     */
    constructor({ inputType }: InputProps);
    init(): Promise<void>;
    isPdf(): boolean;
    checkMimetype(): Promise<string>;
    /**
     * Merge PDF pages.
     * @param pageOptions
     */
    cutPdf(pageOptions: PageOptions): Promise<void>;
}
export {};
