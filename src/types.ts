import { RaphaelPaper } from "raphael";

export interface Measurements {
    neck_circ: number; // C
    hips: number; // G
    height: number; // J
    neck_floor: number; // K
    shoulder_sternum: number; // N
    shoulder_navel: number; // Q
    shoulder: number; // A (women) or B (men)
    sleeve: number; // H (women) or I (men)
    palm: number; // Y
    handspan: number; // W
}

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
    shoulder: number;
    bottom_sidelength: number;
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
        this.scale = 1;
        this.calculate();
    }

    setScale(scale: number) {
        this.scale = scale;
        this.calculate();
    }

    abstract construct(): RaphaelPaper[];
    abstract calculate(): void;


}