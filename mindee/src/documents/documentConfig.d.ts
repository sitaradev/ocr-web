import { InputSource } from "../inputs";
import { Response, Endpoint, EndpointResponse, AsyncPredictResponse } from "../api";
import { Document, FinancialDocumentV0, CustomV1, DocumentSig } from "./index";
import { PageOptions } from "../inputs";
interface CustomDocConstructor {
    endpointName: string;
    accountName: string;
    version: string;
    apiKey: string;
}
export declare class DocumentConfig<DocType extends Document> {
    readonly documentType: string | undefined;
    readonly endpoints: Array<Endpoint>;
    readonly documentClass: DocumentSig<DocType>;
    constructor(documentClass: DocumentSig<DocType>, endpoints: Array<Endpoint>, documentType?: string);
    predict(params: {
        inputDoc: InputSource;
        includeWords: boolean;
        pageOptions?: PageOptions;
        cropper: boolean;
    }): Promise<Response<DocType>>;
    predictAsync(params: {
        inputDoc: InputSource;
        includeWords: boolean;
        pageOptions?: PageOptions;
        cropper: boolean;
    }): Promise<AsyncPredictResponse<DocType>>;
    getQueuedDocument(queuId: string): Promise<AsyncPredictResponse<DocType>>;
    cutDocPages(inputDoc: InputSource, pageOptions: PageOptions): Promise<void>;
    protected predictRequest(inputDoc: InputSource, includeWords: boolean, cropping: boolean): Promise<EndpointResponse>;
    protected handleError(response: EndpointResponse, statusCode?: number): void;
    protected buildResult(response: EndpointResponse, inputFile?: InputSource): Response<DocType>;
    protected checkApiKeys(): void;
}
export declare class CustomDocConfig extends DocumentConfig<CustomV1> {
    constructor({ endpointName, accountName, version, apiKey, }: CustomDocConstructor);
}
export declare class FinancialDocV0Config extends DocumentConfig<FinancialDocumentV0> {
    constructor(apiKey: string);
    protected predictRequest(inputDoc: InputSource, includeWords: boolean, cropping: boolean): Promise<EndpointResponse>;
}
export {};
