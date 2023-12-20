window.onload = function () {

Raphael.fn.measure = function (x, y, v, rotate) {
	var scaled = v / scale;
	var whole = Math.trunc(scaled);
	var rem = scaled - whole;
	var rnd = 0;

	if (rem <= 0.125) {
		rnd = 0;
	} else if (0.125 < rem <= 0.375) {
		rnd = 0.25;
	} else if (0.375 < rem <= 0.625) {
		rnd = 0.5;
	} else if (0.625 < rem <= 0.875) {
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

Raphael.fn.vm_line = function (x, y1, y2, val) {
	line = this.path(`M${x} ${y1}L${x} ${y2}`).attr({'stroke-width': 2, 'arrow-end': "open", 'arrow-start': "open"});
	var len = line.getTotalLength();
	return this.set().push(
		line,
		this.measure(x , len/2 + y1, val, true));
}

Raphael.fn.hm_line = function (x1, x2, y, val) {
	line = this.path(`M${x1} ${y}L${x2} ${y}`).attr({'stroke-width': 2, 'arrow-end': "open", 'arrow-start': "open"});
	var len = line.getTotalLength();
	return this.set().push(
		line,
		this.measure(x1 + len/2, y, val, false));
}

Raphael.fn.fold = function (x1, y1, x2, y2) {
	return this.path(`M${x1} ${y1}L${x2} ${y2}`).attr({'stroke-dasharray': "- "});
}

Raphael.fn.seam = function (x1, y1, x2, y2) {
	return this.path(`M${x1} ${y1}L${x2} ${y2}`).attr({'stroke-dasharray': "-"});
}

var b = 26 //input ('Measurement B')
var c = 13 //input ('Measurement C')
var g = 38 //input ('Measurement G')
var i = 10 //input ('Measurement I')
var k = 52 //input ('Measurement K')
var n = 6 //input ('Measurement N')
var w = 8 //input ('Measurement W')
var q = 19
var fabric = 50 // input
var scale = 10

var bodylength = 2 * (k + 5) * scale;
var bodywidth = b * scale;
var sleevelength = 2 * (k / 3)  * scale;
var sleevewidth = i  * scale;
var collarlength = (k + (c / 2) + 10)  * scale;
var collarwidth = w  * scale;
var overlaplength = (k - n)  * scale;
var overlapwidth = ((g / 6) + (c / 12))  * scale;
var overlapdiagonal = (k / 2)  * scale;


var overlap_l = Raphael("left_overlap", overlapwidth, overlaplength);
overlap_l.rect(0, 0, overlapwidth, overlaplength);
overlap_l.seam(0, 0, overlapwidth, overlapdiagonal);
overlap_l.measure(overlapwidth/2, overlaplength - scale, overlapwidth, false);
overlap_l.measure(scale, overlaplength/2, overlaplength, true);
overlap_l.measure(overlapwidth - scale, overlaplength/4, overlapdiagonal, true);
overlap_l.measure(overlapwidth - scale, overlaplength * .75, overlaplength - overlapdiagonal, true);

var overlap_r = Raphael("right_overlap", overlapwidth, overlaplength);
overlap_r.rect(0, 0, overlapwidth, overlaplength);
overlap_r.seam(0, overlapdiagonal, overlapwidth, 0);
overlap_r.measure(overlapwidth/2, overlaplength - scale, overlapwidth, false);
overlap_r.measure(overlapwidth - scale, overlaplength/2, overlaplength, true);
overlap_r.vm_line(scale/2, 0, overlapdiagonal, overlapdiagonal);
overlap_r.vm_line(scale/2, overlapdiagonal, overlaplength, overlaplength - overlapdiagonal);


var sleeve_l = Raphael("left_sleeve", sleevewidth, sleevelength);
sleeve_l.rect(0, 0, sleevewidth, sleevelength);
sleeve_l.fold(0, sleevelength/2, sleevewidth, sleevelength/2);
sleeve_l.measure(sleevewidth/2, sleevelength - scale, sleevewidth, false);
sleeve_l.vm_line(sleevewidth/4, 0, sleevelength, sleevelength);
sleeve_l.vm_line(sleevewidth/2, 0, sleevelength/2, sleevelength/2);

var sleeve_r = Raphael("right_sleeve", sleevewidth, sleevelength);
sleeve_r.rect(0, 0, sleevewidth, sleevelength);
sleeve_r.fold(0, sleevelength/2, sleevewidth, sleevelength/2);
sleeve_r.measure(sleevewidth/2, sleevelength - scale, sleevewidth, false);
sleeve_r.vm_line(sleevewidth/2, 0, sleevelength/2, sleevelength/2);
sleeve_r.vm_line(sleevewidth/4, 0, sleevelength, sleevelength);


bottom = ((g / 2) + (c / 4)) * scale;
sidediff = (bodywidth - bottom) / 2;
sidelength = ((k - q) + 5) * scale;
shoulder = bodylength / 2;
bottom_sidelength = shoulder +( q  * scale);
center = bodywidth / 2;
collaroffset = (c / 4)  * scale;
foldoffset = 5 * scale;
bottomoffset = shoulder + (q * scale);

var body = Raphael("body", bodywidth, bodylength);
body.rect(0, 0, bodywidth, bodylength);
body.fold(0, shoulder, bodywidth, shoulder);

body.seam(0, sidelength - foldoffset, bodywidth, sidelength - foldoffset);
body.seam(0, sidelength, bodywidth, sidelength);
body.fold(0, sidelength - (foldoffset/2), bodywidth, sidelength - (foldoffset/2));
body.seam(sidediff, 0, sidediff, sidelength);
body.seam(sidediff, sidelength, 0, shoulder);
body.seam(bodywidth - sidediff, 0, bodywidth - sidediff, sidelength);
body.seam(bodywidth - sidediff, sidelength, bodywidth, shoulder);

body.seam(0, bottomoffset, bodywidth, bottomoffset);
body.seam(0, bottomoffset + foldoffset , bodywidth, bottomoffset + foldoffset);
body.fold(0, bottomoffset + (foldoffset/2) , bodywidth, bottomoffset + (foldoffset/2));
body.seam(0, shoulder, sidediff, bottomoffset);
body.seam(sidediff, bottomoffset, sidediff, bodylength );
body.seam(bodywidth, shoulder, bodywidth - sidediff, bottomoffset);
body.seam(bodywidth - sidediff, bottomoffset, bodywidth - sidediff, bodylength);


body.path(`M${center} ${shoulder - collaroffset}L${center} ${bodylength}`);
body.seam(center - collaroffset, shoulder, center - collaroffset, bodylength);
body.seam(center + collaroffset, shoulder, center + collaroffset, bodylength);
body.path(`M${center - collaroffset} ${shoulder}A${collaroffset} ${collaroffset} 0 0 1 ${center + collaroffset} ${shoulder}`).attr({'stroke-dasharray': "."});
body.hm_line(center - collaroffset, center + collaroffset, bodylength * .75, collaroffset * 2);
body.vm_line(bodywidth / 4, bottomoffset, bottomoffset + foldoffset, foldoffset);
body.vm_line(bodywidth / 4, shoulder, bottomoffset,  q * scale);
body.vm_line(bodywidth * .75, shoulder, bodylength,  shoulder);
body.hm_line(0, sidediff, bodylength * 0.75, sidediff);

var collar = Raphael("collar", collarwidth, collarlength);
collar.rect(0, 0, collarwidth, collarlength);

};

