import {  KimonoPattern } from "./types";
import Raphael from 'raphael';

export class MensKimono extends KimonoPattern {
    calculate() {
        const bodylength = 2 * (this.m.neck_floor + this.h.fold) * this.scale;
        const bodywidth = this.m.shoulder * this.scale;
        const sleevelength = 2 * (this.m.sleeve_length)  * this.scale;
        const sleevewidth = this.m.sleeve  * this.scale;
        const collarlength = (this.m.neck_floor + (this.m.neck_circ / 2) + this.h.collar)  * this.scale;
        const collarwidth = this.m.handspan  * this.scale;
        const overlaplength = (this.m.neck_floor - this.m.shoulder_sternum)  * this.scale;
        const overlapwidth = ((this.m.hips / 6) + (this.m.neck_circ / 12))  * this.scale;
        const overlapdiagonal = (this.m.neck_floor / 2)  * this.scale;

        const bottom = ((this.m.hips / 2) + (this.m.neck_circ / 4)) * this.scale;
        const sidediff = (bodywidth - bottom) / 2;
        const sidelength = ((this.m.neck_floor - this.m.shoulder_navel) + this.h.fold) * this.scale;
        const shoulder_offset = bodylength / 2;
        const center = bodywidth / 2;
        const collaroffset = (this.m.neck_circ / 4)  * this.scale;
        const foldoffset = this.h.fold * this.scale;
        const bottomoffset = shoulder_offset + (this.m.shoulder_navel * this.scale);

        this.c = {
            bodylength,
            bodywidth,
            sleevelength,
            sleevewidth,
            collarlength,
            collarwidth,
            overlaplength,
            overlapwidth,
            overlapdiagonal,
            bottom,
            sidediff,
            sidelength,
            center,
            collaroffset,
            foldoffset,
            bottomoffset,
            shoulder_offset            
        };
        
    }

    construct() {
        var overlap_l = Raphael("left_overlap", this.c.overlapwidth, this.c.overlaplength);
        overlap_l.rect(0, 0, this.c.overlapwidth, this.c.overlaplength);
        overlap_l.seam(0, 0, this.c.overlapwidth, this.c.overlapdiagonal);
        overlap_l.measure(this.c.overlapwidth/2, this.c.overlaplength - this.scale, this.c.overlapwidth, this.scale, false);
        overlap_l.measure(this.scale, this.c.overlaplength/2, this.c.overlaplength, this.scale, true);
        overlap_l.measure(this.c.overlapwidth - this.scale, this.c.overlaplength/4, this.c.overlapdiagonal, this.scale, true);
        overlap_l.measure(this.c.overlapwidth - this.scale, this.c.overlaplength * .75, this.c.overlaplength - this.c.overlapdiagonal, this.scale, true);
        
        var overlap_r = Raphael("right_overlap", this.c.overlapwidth, this.c.overlaplength);
        overlap_r.rect(0, 0, this.c.overlapwidth, this.c.overlaplength);
        overlap_r.seam(0, this.c.overlapdiagonal, this.c.overlapwidth, 0);
        overlap_r.measure(this.c.overlapwidth/2, this.c.overlaplength - this.scale, this.c.overlapwidth, this.scale, false);
        overlap_r.measure(this.c.overlapwidth - this.scale, this.c.overlaplength/2, this.c.overlaplength, this.scale, true);
        overlap_r.vm_line(this.scale/2, 0, this.c.overlapdiagonal, this.scale, this.c.overlapdiagonal);
        overlap_r.vm_line(this.scale/2, this.c.overlapdiagonal, this.c.overlaplength, this.scale, this.c.overlaplength - this.c.overlapdiagonal);
        
        
        var sleeve_l = Raphael("left_sleeve", this.c.sleevewidth, this.c.sleevelength);
        sleeve_l.rect(0, 0, this.c.sleevewidth, this.c.sleevelength);
        sleeve_l.fold(0, this.c.sleevelength/2, this.c.sleevewidth, this.c.sleevelength/2);
        sleeve_l.measure(this.c.sleevewidth/2, this.c.sleevelength - this.scale, this.c.sleevewidth, this.scale, false);
        sleeve_l.vm_line(this.c.sleevewidth/4, 0, this.c.sleevelength, this.scale, this.c.sleevelength);
        sleeve_l.vm_line(this.c.sleevewidth/2, 0, this.c.sleevelength/2, this.scale, this.c.sleevelength/2);
        
        var sleeve_r = Raphael("right_sleeve", this.c.sleevewidth, this.c.sleevelength);
        sleeve_r.rect(0, 0, this.c.sleevewidth, this.c.sleevelength);
        sleeve_r.fold(0, this.c.sleevelength/2, this.c.sleevewidth, this.c.sleevelength/2);
        sleeve_r.measure(this.c.sleevewidth/2, this.c.sleevelength - this.scale, this.c.sleevewidth, this.scale, false);
        sleeve_r.vm_line(this.c.sleevewidth/2, 0, this.c.sleevelength/2, this.scale, this.c.sleevelength/2);
        sleeve_r.vm_line(this.c.sleevewidth/4, 0, this.c.sleevelength, this.scale, this.c.sleevelength);

        var body = Raphael("body", this.c.bodywidth, this.c.bodylength);
        body.rect(0, 0, this.c.bodywidth, this.c.bodylength);
        body.fold(0, this.c.shoulder_offset, this.c.bodywidth, this.c.shoulder_offset);
        
        body.seam(0, this.c.sidelength - this.c.foldoffset, this.c.bodywidth, this.c.sidelength - this.c.foldoffset);
        body.seam(0, this.c.sidelength, this.c.bodywidth, this.c.sidelength);
        body.fold(0, this.c.sidelength - (this.c.foldoffset/2), this.c.bodywidth, this.c.sidelength - (this.c.foldoffset/2));
        body.seam(this.c.sidediff, 0, this.c.sidediff, this.c.sidelength);
        body.seam(this.c.sidediff, this.c.sidelength, 0, this.c.shoulder_offset);
        body.seam(this.c.bodywidth - this.c.sidediff, 0, this.c.bodywidth - this.c.sidediff, this.c.sidelength);
        body.seam(this.c.bodywidth - this.c.sidediff, this.c.sidelength, this.c.bodywidth, this.c.shoulder_offset);
        
        body.seam(0, this.c.bottomoffset, this.c.bodywidth, this.c.bottomoffset);
        body.seam(0, this.c.bottomoffset + this.c.foldoffset , this.c.bodywidth, this.c.bottomoffset + this.c.foldoffset);
        body.fold(0, this.c.bottomoffset + (this.c.foldoffset/2) , this.c.bodywidth, this.c.bottomoffset + (this.c.foldoffset/2));
        body.seam(0, this.c.shoulder_offset, this.c.sidediff, this.c.bottomoffset);
        body.seam(this.c.sidediff, this.c.bottomoffset, this.c.sidediff, this.c.bodylength );
        body.seam(this.c.bodywidth, this.c.shoulder_offset, this.c.bodywidth - this.c.sidediff, this.c.bottomoffset);
        body.seam(this.c.bodywidth - this.c.sidediff, this.c.bottomoffset, this.c.bodywidth - this.c.sidediff, this.c.bodylength);
        
        
        body.path(`M${this.c.center} ${this.c.shoulder_offset - this.c.collaroffset}L${this.c.center} ${this.c.bodylength}`);
        body.seam(this.c.center - this.c.collaroffset, this.c.shoulder_offset, this.c.center - this.c.collaroffset, this.c.bodylength);
        body.seam(this.c.center + this.c.collaroffset, this.c.shoulder_offset, this.c.center + this.c.collaroffset, this.c.bodylength);
        body.path(`M${this.c.center - this.c.collaroffset} ${this.c.shoulder_offset}A${this.c.collaroffset} ${this.c.collaroffset} 0 0 1 ${this.c.center + this.c.collaroffset} ${this.c.shoulder_offset}`).attr({'stroke-dasharray': "."});
        body.hm_line(this.c.center - this.c.collaroffset, this.c.center + this.c.collaroffset, this.c.bodylength * .75, this.scale, this.c.collaroffset * 2);
        body.vm_line(this.c.bodywidth / 4, this.c.bottomoffset, this.c.bottomoffset + this.c.foldoffset, this.scale, this.c.foldoffset);
        body.vm_line(this.c.bodywidth / 4, this.c.shoulder_offset, this.c.bottomoffset, this.scale,  this.m.shoulder_navel * this.scale);
        body.vm_line(this.c.bodywidth * .75, this.c.shoulder_offset, this.c.bodylength, this.scale,  this.c.shoulder_offset);
        body.hm_line(0, this.c.sidediff, this.c.bodylength * 0.75, this.scale, this.c.sidediff);
        
        var collar = Raphael("collar", this.c.collarwidth, this.c.collarlength);
        collar.rect(0, 0, this.c.collarwidth, this.c.collarlength);
        const collarfold = this.c.collarwidth/3;
        collar.fold(collarfold, 0, collarfold, this.c.collarlength);
        collar.fold(collarfold *2 , 0, collarfold *2 , this.c.collarlength);
        collar.hm_line(0, this.c.collarwidth, this.scale, this.scale, this.c.collarwidth );
        collar.measure(this.c.collarwidth - this.scale, this.c.collarlength/2, this.c.collarlength, this.scale, true );


        return [overlap_l, overlap_r, sleeve_l, sleeve_r, body, collar];
    }
}