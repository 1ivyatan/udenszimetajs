const datuIzmainjasNotikums = new Event("jauniDati");
const cilnesPaarsleegshanasNotikums = new Event("paarsleegtaCilne");

export class Fails {
	augsPoga;
	nonjPoga;
	dati = null;

	tiiriit() {
		if (this.dati == null) return;
		this.dati = null;
		this.augsPoga.value = "";
		this.nonjPoga.style.display = "none";
	}

	atvasinaat() {
		this.dati = this.augsPoga.files[0];
		this.nonjPoga.style.display = "block";
	}

	constructor(div) {
		this.augsPoga = document.createElement("input");
		this.augsPoga.type = "file";

		this.nonjPoga = document.createElement("button");
		this.nonjPoga.innerHTML = "Notīrīt";
		this.nonjPoga.style.display = "none";

		document.getElementById(div).appendChild(this.augsPoga);
		document.getElementById(div).appendChild(this.nonjPoga);
	}
}

export class Sliidne {
	min;
	max;
	solis;
	nokluseetais;

	veertiiba = 0;

	sliidne;
	skaitljuPoga;

	atjaunot(min, max, solis, nokluseetais) {
		this.sliidne.min = this.skaitljuPoga.min = this.min = min;
		this.sliidne.max = this.skaitljuPoga.max = this.max = max;
		this.sliidne.step = this.skaitljuPoga.step = this.solis = solis;
		this.sliidne.value = this.skaitljuPoga.value = this.nokluseetais = nokluseetais;
	}

	atjaunotVeertiibu(klase, notikums) {
		if (notikums.target.type == "range") klase.skaitljuPoga.value = klase.sliidne.value;
		else klase.sliidne.value = klase.skaitljuPoga.value;
		klase.veertiiba = klase.skaitljuPoga.value;
		klase.sliidne.dispatchEvent(datuIzmainjasNotikums);
	}

	spiestAtjaunotVeertiibu(veertiiba) {
		this.veertiiba = this.skaitljuPoga.value = this.sliidne.value = veertiiba;
		this.sliidne.dispatchEvent(datuIzmainjasNotikums);
	}
	
	constructor(elements, nosaukums, min, max, solis, nokluseetais) {
		this.min = min;
		this.max = max;
		this.solis = solis;
		this.nokluseetais = nokluseetais;

		this.sliidne = document.createElement("input");
		this.sliidne.type = "range";

		this.skaitljuPoga = document.createElement("input");
		this.skaitljuPoga.type = "number";

		let sliidnesNosaukums = document.createElement("span");
		sliidnesNosaukums.innerHTML = nosaukums + ":";

		this.sliidne.min = this.skaitljuPoga.min = this.min;
		this.sliidne.max = this.skaitljuPoga.max = this.max;
		this.sliidne.step = this.skaitljuPoga.step = this.solis;
		this.sliidne.value = this.skaitljuPoga.value = this.nokluseetais;

		this.sliidne.addEventListener("input", this.atjaunotVeertiibu.bind(this, this));
		this.skaitljuPoga.addEventListener("input", this.atjaunotVeertiibu.bind(this, this));
		/*^vai tā ir javascript'a īpatnība vai pilnīgi loģiska metodes izsaukšana ar .bind()?*/

		this.veertiiba = nokluseetais;

		document.getElementById(elements).appendChild(sliidnesNosaukums);
		document.getElementById(elements).appendChild(this.sliidne);
		document.getElementById(elements).appendChild(this.skaitljuPoga);
	}
}

class Cilne {
	poga;
	saturs;
	constructor(saturs, poga) {
		this.saturs = saturs;
		this.poga = poga;
	}
}

export class Cilnes {
	cilnes;
	izmeers;
	izveeleets;
	notikums;

	paarsleegt(klase, notikums) {
		let i = 0;
		klase.cilnes.forEach((cilne) => {
			if (notikums.target.innerHTML == cilne.poga.innerHTML) {
				cilne.saturs.style.display = "block";
				klase.izveeleets = i;
			} else {
				cilne.saturs.style.display = "none";
				i++;
			}
		});
		this.notikums.dispatchEvent(cilnesPaarsleegshanasNotikums);
	}

	constructor(div, noklNum) {
		div = document.getElementById(div);
		let cilnesSaturi = div.getElementsByTagName("div")[0].children;
		
		this.cilnes = [];
		this.izmeers = cilnesSaturi.length;

		let poguCilnes = document.createElement("div");

		this.notikums = new EventTarget();

		for (let i = 0; i < this.izmeers; i++) {
			let poga = document.createElement("button");
			poga.innerHTML = cilnesSaturi[i].id;
			poga.addEventListener("click", this.paarsleegt.bind(this, this));
			cilnesSaturi[i].style.display = "none";
			this.cilnes[i] = new Cilne(cilnesSaturi[i], poga);
			poguCilnes.append(this.cilnes[i].poga);
		}

		this.izveeleets = noklNum;
		this.cilnes[noklNum].poga.dispatchEvent(new Event("click"));
		div.prepend(poguCilnes);
	}
}