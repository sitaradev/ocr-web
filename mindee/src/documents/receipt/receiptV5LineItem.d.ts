import { StringDict } from "../../fields";
import { Polygon } from "../../geometry";
/**
 * List of line item details.
 */
export declare class ReceiptV5LineItem {
    #private;
    /** The item description. */
    description: string | null;
    /** The item quantity. */
    quantity: number | null;
    /** The item total amount. */
    totalAmount: number | null;
    /** The item unit price. */
    unitPrice: number | null;
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
     * Output in a format suitable for inclusion in an rST table.
     */
    toTableLine(): string;
}
