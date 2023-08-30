import { StringDict } from "./base";
import { Polygon } from "../geometry";
export interface PositionFieldConstructor {
    prediction: StringDict;
    valueKey?: string;
    pageId?: number | undefined;
}
/**
 * A field indicating a position or area on the document.
 */
export declare class PositionField {
    /** Straight rectangle. */
    boundingBox: Polygon;
    /** Free polygon with up to 30 vertices. */
    polygon: Polygon;
    /** Free polygon with 4 vertices. */
    quadrangle: Polygon;
    /** Rectangle that may be oriented (can go beyond the canvas). */
    rectangle: Polygon;
    /** The document page on which the information was found. */
    pageId: number | undefined;
    constructor({ prediction, pageId }: PositionFieldConstructor);
    toString(): string;
}
