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

export const fabricWidthSchema = z.coerce.number().gt(13).lt(120).default(54);
  
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

// export interface KimonoPattern {
//     meas: Measurements;
//     calc: CalcMeasurements;
//     construct(measure: Measurements): RaphaelElement[];
//     calculate(scale: number): void;
//     setScale(scale: number): void;
// }

export abstract class KimonoPattern {
    m: Measurements;
    c!: CalcMeasurements;
    scale: number;

    constructor(measurements: Measurements)  {
        this.m = measurements;
        this.scale = 10;
        this.calculate();
    }

    setScale(scale: number) {
        this.scale = scale;
        this.calculate();
    }

    abstract construct(): RaphaelPaper[];
    abstract calculate(): void;


}