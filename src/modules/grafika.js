export class Molberts {
	molberts;
	ctx;
	meerogs;

	ziimeetAtteelu(img, x, y, izm, caursp) {
		this.ctx.globalAlpha = caursp;
		this.ctx.drawImage(img, x * this.meerogs, y * this.meerogs, img.width * this.meerogs * izm, img.height * this.meerogs * izm);
		this.ctx.globalAlpha = 1;
	}

	atjaunotMeerogu(n, m) {
		if (n > m) {
			this.meerogs = m / n;
		} else this.meerogs = 1;
	}

	atjaunot(w, h) {
		this.molberts.width = w;
		this.molberts.height = h;
	}
	
	constructor(div) {
		this.molberts = document.createElement("canvas");
		this.ctx = this.molberts.getContext("2d");
		
		document.getElementById(div).appendChild(this.molberts);
	}
}

export class Garins {
	img;
	x;
	y;
	izmeers;
	caursp;
	constructor(img, x, y, izm, caursp) {
		this.img = new Image();
		this.img.src = URL.createObjectURL(img);

		this.x = x;
		this.y = y;
		this.izmeers = izm;
		this.caursp = caursp;
	}
}