import Raphael from 'raphael';
import { MensKimono } from './mens';
import { Measurements, measurementsSchema } from './types';

  declare module "raphael" {
    interface RaphaelPaper {
      label(x: number, y: number, t: string, rotate: boolean): RaphaelSet;
      measure(x: number, y: number, v: number, scale: number, rotate: boolean): RaphaelSet;
      vm_line(x: number, y1: number, y2: number, scale: number, val: number): RaphaelSet;
      hm_line(x1: number, x2: number, y: number, scale: number, val: number): RaphaelSet;
      fold(x1: number, y1: number, x2: number, y2: number): RaphaelPath;
      seam(x1: number, y1: number, x2: number, y2: number): RaphaelPath;
    }
  }

  Raphael.fn.measure = function(x: number, y: number, v: number, scale: number, rotate: boolean) {
    var scaled = v / scale;
    var whole = Math.trunc(scaled);
    var rem = scaled - whole;
    var rnd = 0;
  
    if (rem <= 0.125) {
      rnd = 0;
    } else if (0.125 < rem && rem <= 0.375) {
      rnd = 0.25;
    } else if (0.375 < rem && rem  <= 0.625) {
      rnd = 0.5;
    } else if (0.625 < rem && rem  <= 0.875) {
      rnd = 0.75;
    } else if (0.875 < rem) {
      rnd = 1;
    }
    var tmp_v = (whole + rnd).toString() + '"';
    return this.label(x, y, tmp_v, rotate);
  }
  
  Raphael.fn.label = function (x, y, t, rotate) {
    var tmp = this.text(x, y, t).attr({"font-size": 10})
    if (rotate) {
      tmp.rotate(90);
    }
    var bb = tmp.getBBox();
    return this.set().push(
      this.rect(bb.x, bb.y, bb.width, bb.height).attr({"fill": "white", "stroke-width": 0}),
      tmp.toFront()
      )
  }
  
  Raphael.fn.vm_line = function (x: number, y1: number, y2: number,scale: number,  val: number) {
    const line = this.path(`M${x} ${y1}L${x} ${y2}`).attr({'stroke-width': 2, 'arrow-end': "open"});
    const line2 = this.path(`M${x} ${y2}L${x} ${y1}`).attr({'stroke-width': 2, 'arrow-end': "open"});
    const len = line.getTotalLength();

    let lineset = this.set().push(line);
    lineset.push(line2);
    let measure_set = this.measure(x , len/2 + y1, val, scale, true);
    measure_set.forEach(el => {lineset.push(el);});
    return lineset;
  }
  
  Raphael.fn.hm_line = function (x1: number, x2: number, y: number, scale: number, val: number) {
    const line = this.path(`M${x1} ${y}L${x2} ${y}`).attr({'stroke-width': 2, 'arrow-end': "open"});
    const line2 = this.path(`M${x2} ${y}L${x1} ${y}`).attr({'stroke-width': 2, 'arrow-end': "open"});
    const len = line.getTotalLength();

    let lineset = this.set().push(line);
    lineset.push(line2);
    let measure_set = this.measure(x1 + len/2, y, val, scale, false);
    measure_set.forEach(el => {lineset.push(el);});
    return lineset;
  }
  
  Raphael.fn.fold = function (x1: number, y1: number, x2: number, y2: number) {
    return this.path(`M${x1} ${y1}L${x2} ${y2}`).attr({'stroke-dasharray': "- "});
  }
  
  Raphael.fn.seam = function (x1: number, y1: number, x2: number, y2: number) {
    return this.path(`M${x1} ${y1}L${x2} ${y2}`).attr({'stroke-dasharray': "-"});
  }
  

window.onload = function () {
  // let measurements = {
  //   neck_circ: 13,
  //   hips: 38,
  //   height: 58,
  //   neck_floor: 52,
  //   shoulder_sternum: 6,
  //   shoulder_navel: 19,
  //   shoulder: 26,
  //   sleeve: 10,
  //   palm: 4,
  //   handspan: 8,
  // };

  // let kimono = new MensKimono(measurements);
  // kimono.setScale(10);
  // kimono.construct();
  const form = document.getElementById('form');
  if (form) {
    form.addEventListener("submit", generate);
  }


}

function generate(e: Event): void {
  e.preventDefault();
  e.stopPropagation();
  const svgs = document.querySelectorAll('svg');
  svgs.forEach( el => {el.remove();});
  const measurements = formToMeasure();
  let kimono = new MensKimono(measurements);
  // kimono.setScale(10);
  kimono.construct();
}

function formToMeasure(): Measurements {
  const form = new FormData(document.getElementById('form') as HTMLFormElement);
  const obj = Object.fromEntries(form.entries());
  const measurements = measurementsSchema.parse(obj);
  return measurements;
}