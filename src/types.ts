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
    neck_circ: z.coerce.number(), // C
    hips: z.coerce.number(), // G
    height: z.coerce.number(), // J
    neck_floor: z.coerce.number(), // K
    shoulder_sternum: z.coerce.number(), // N
    shoulder_navel: z.coerce.number(), // Q
    shoulder: z.coerce.number(),
    sleeve: z.coerce.number(),
    palm: z.coerce.number(), // Y
    handspan: z.coerce.number() // W
  });
  
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