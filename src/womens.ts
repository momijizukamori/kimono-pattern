import {  KimonoPattern } from "./types";
import Raphael from 'raphael';

export class WomensKimono extends KimonoPattern {
    calculate() {
        const bodylength = 2 * (this.m.height ) * this.scale;
        const bodywidth = this.m.shoulder * this.scale;
        const sleevelength = 2 * (this.m.sleeve_length  + this.h.sleeve ) * this.scale;
        const sleevewidth = this.m.sleeve  * this.scale;
        const collarlength = (this.m.neck_floor + (this.m.neck_circ / 2) + this.h.collar)  * this.scale;
        const collarwidth = this.m.handspan  * this.scale;
        const overlaplength = (this.m.height - this.m.shoulder_sternum)  * this.scale;
        const overlapwidth = ((this.m.shoulder / 3) - (this.m.neck_circ / 8))  * this.scale;
        const overlapdiagonal = (this.m.height / 2)  * this.scale;

        const shoulder_offset = bodylength / 2;
        const center = bodywidth / 2;
        const collaroffset = (this.m.neck_circ / 4)  * this.scale;


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
            bottom: 0,
            sidediff : 0,
            sidelength : 0,
            center,
            collaroffset,
            foldoffset: 0,
            bottomoffset: 0,
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
        sleeve_l.seam(this.scale * this.h.radius, this.scale * this.h.sleeve, this.c.sleevewidth, this.scale * this.h.sleeve);
        sleeve_l.path(`M0 ${this.scale * (this.h.radius + this.h.sleeve)} A${this.scale * this.h.radius} ${this.scale * this.h.radius} 0 0 1 ${this.scale * this.h.radius} ${this.scale * this.h.sleeve}`).attr({'stroke-dasharray': "-"});
        sleeve_l.seam(this.scale * this.h.radius, (this.c.sleevelength - this.scale * this.h.sleeve), this.c.sleevewidth, (this.c.sleevelength - this.scale * this.h.sleeve));
        sleeve_l.path(`M0 ${this.c.sleevelength - (this.scale * (this.h.radius + this.h.sleeve))} A${this.scale * this.h.radius} ${this.scale * this.h.radius} 0 0 0 ${this.scale * this.h.radius} ${this.c.sleevelength - (this.scale * this.h.sleeve)}`).attr({'stroke-dasharray': "-"});
        sleeve_l.measure(this.c.sleevewidth/2, this.c.sleevelength - this.scale, this.c.sleevewidth, this.scale, false);
        sleeve_l.vm_line(this.c.sleevewidth/4, 0, this.c.sleevelength, this.scale, this.c.sleevelength);
        sleeve_l.vm_line(this.c.sleevewidth/2, this.h.sleeve * this.scale, this.c.sleevelength/2, this.scale, this.m.sleeve_length * this.scale);
        
        var sleeve_r = Raphael("right_sleeve", this.c.sleevewidth, this.c.sleevelength);
        sleeve_r.rect(0, 0, this.c.sleevewidth, this.c.sleevelength);
        sleeve_r.fold(0, this.c.sleevelength/2, this.c.sleevewidth, this.c.sleevelength/2);
        sleeve_r.seam(0, this.scale * this.h.sleeve, this.c.sleevewidth - this.scale * this.h.radius, this.scale * this.h.sleeve);
        sleeve_r.path(`M${this.c.sleevewidth} ${this.scale * (this.h.radius + this.h.sleeve)} A${this.scale * this.h.radius} ${this.scale * this.h.radius} 0 0 0 ${this.c.sleevewidth - this.scale * this.h.radius} ${this.scale * this.h.sleeve}`).attr({'stroke-dasharray': "-"});
        sleeve_r.seam(0, (this.c.sleevelength - this.scale * this.h.sleeve), this.c.sleevewidth - this.scale * this.h.radius, (this.c.sleevelength - this.scale * this.h.sleeve));
        sleeve_r.path(`M${this.c.sleevewidth} ${this.c.sleevelength - (this.scale * (this.h.radius + this.h.sleeve))} A${this.scale * this.h.radius} ${this.scale * this.h.radius} 0 0 1 ${this.c.sleevewidth - this.scale * this.h.radius} ${this.c.sleevelength - (this.scale * this.h.sleeve)}`).attr({'stroke-dasharray': "-"});
        sleeve_r.measure(this.c.sleevewidth/2, this.c.sleevelength - this.scale, this.c.sleevewidth, this.scale, false);
        sleeve_r.vm_line(this.c.sleevewidth/2, 0.5 * this.scale, this.c.sleevelength/2, this.scale, this.m.sleeve_length * this.scale);
        sleeve_r.vm_line(this.c.sleevewidth/4, 0, this.c.sleevelength, this.scale, this.c.sleevelength);

        var body = Raphael("body", this.c.bodywidth, this.c.bodylength);
        body.rect(0, 0, this.c.bodywidth, this.c.bodylength);
        body.fold(0, this.c.shoulder_offset, this.c.bodywidth, this.c.shoulder_offset);
               
        body.path(`M${this.c.center} ${this.c.shoulder_offset - this.c.collaroffset}L${this.c.center} ${this.c.bodylength}`);
        body.seam(this.c.center - this.c.collaroffset, this.c.shoulder_offset, this.c.center - this.c.collaroffset, this.c.bodylength);
        body.seam(this.c.center + this.c.collaroffset, this.c.shoulder_offset, this.c.center + this.c.collaroffset, this.c.bodylength);
        body.path(`M${this.c.center - this.c.collaroffset} ${this.c.shoulder_offset}A${this.c.collaroffset} ${this.c.collaroffset} 0 0 1 ${this.c.center + this.c.collaroffset} ${this.c.shoulder_offset}`).attr({'stroke-dasharray': "."});
        body.hm_line(this.c.center - this.c.collaroffset, this.c.center + this.c.collaroffset, this.c.bodylength * .75, this.scale, this.c.collaroffset * 2);
        body.vm_line(this.c.bodywidth * .75, this.c.shoulder_offset, this.c.bodylength, this.scale,  this.c.shoulder_offset);

        
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