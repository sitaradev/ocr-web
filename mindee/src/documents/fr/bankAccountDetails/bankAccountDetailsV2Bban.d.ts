import { StringDict } from "../../../fields";
import { Polygon } from "../../../geometry";
/**
 * Full extraction of BBAN, including: branch code, bank code, account and key.
 */
export declare class BankAccountDetailsV2Bban {
    #private;
    /** The BBAN bank code outputted as a string. */
    bbanBankCode: string | null;
    /** The BBAN branch code outputted as a string. */
    bbanBranchCode: string | null;
    /** The BBAN key outputted as a string. */
    bbanKey: string | null;
    /** The BBAN Account number outputted as a string. */
    bbanNumber: string | null;
    /** Confidence score */
    confidence: number;
    /** The document page on which the information was found. */
    pageId: number;
    /**
     * Contains the relative vertices coordinates (points) of a polygon containing
     * the field in the document.
     */
    polygon: Polygon;
    constructor({ prediction }: StringDict);
    /**
     * Default string representation.
     */
    toString(): string;
    /**
     * Output in a format suitable for inclusion in a field list.
     */
    toFieldList(): string;
}
