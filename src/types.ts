import { RaphaelPaper } from "raphael";
import { z } from "zod"

// export interface Measurements {
//     neck_circ: number; // C
//     hips: number; // G
//     height: number; // J
//     neck_floor: number; // K
//     shoulder_sternum: number; // N
//     shoulder_navel: number; // Q
//     shoulder: number; // A (women) or B (men)
//     sleeve: number; // H (women) or I (men)
//     palm: number; // Y
//     handspan: number; // W
// }

const fabricWidthSchema = z.coerce.number().gt(13).lt(220).default(54);
const StyleSchema = z.enum(['mens', 'womens']);
const UnitSchema = z.enum(['in', 'cm']);
export type StyleEnum = z.infer<typeof StyleSchema>;
type UnitEnum = z.infer<typeof UnitSchema>;

export const configSchema = z.object({
    style: StyleSchema,
    unit: UnitSchema,
    fabric_width: fabricWidthSchema
});

export type Config = z.infer<typeof configSchema>;

export const measurementsSchema = z.object({
    neck_circ: z.coerce.number().positive(), // C
    hips: z.coerce.number().positive(), // G
    height: z.coerce.number().positive(), // J
    neck_floor: z.coerce.number().positive(), // K
    shoulder_sternum: z.coerce.number().positive(), // N
    shoulder_navel: z.coerce.number().positive(), // Q
    shoulder: z.coerce.number().positive(), // A (women) or B (men)
    sleeve: z.coerce.number().positive(), // H (women) or I (men)
    sleeve_length: z.coerce.number().positive(),
    palm: z.coerce.number().positive(), // Y
    handspan: z.coerce.number().positive() // W
  }).required();

  
export type Measurements = z.infer<typeof measurementsSchema>;

interface CalcMeasurements {
    bodylength: number;
    bodywidth: number;
    sleevelength: number;
    sleevewidth: number;
    collarlength: number;
    collarwidth: number;
    overlaplength: number;
    overlapwidth: number;
    overlapdiagonal: number;
    bottom: number;
    sidediff: number;
    sidelength: number;
    shoulder_offset: number;
    center: number;
    collaroffset: number;
    foldoffset: number;
    bottomoffset: number;
}

type HardcodedMeasurements = {
    fold: number;
    sleeve: number;
    collar: number;
    radius: number;
}

export const hardcoded = {
    in: {
        scale: 10,
        fold: 5,
        sleeve: 0.5,
        collar: 10,
        radius: 3,
    },
    cm: {
        scale: 5,
        fold: 10,
        sleeve: 1.5,
        collar: 25,
        radius: 7
    }
}

export abstract class KimonoPattern {
    m: Measurements;
    c!: CalcMeasurements;
    h: HardcodedMeasurements;
    scale: number;

    constructor(measurements: Measurements, unit: UnitEnum)  {
        let {scale, fold, sleeve, collar, radius} = hardcoded[unit];
        this.m = measurements;
        this.scale = scale;
        this.h = {fold, sleeve, collar, radius};
        this.calculate();
    }

    setScale(scale: number) {
        this.scale = scale;
        this.calculate();
    }

    abstract construct(): RaphaelPaper[];
    abstract calculate(): void;


}