import * as ls from "./modules/saskarne.js";
import * as gr from "./modules/grafika.js";

/* mainīgie */
/* ui */
let fonaAvots;
let uudensAvots;
let molberts;
let sliidnes = [null, null, null, null]; /* x, y, izmeers, caursp */
//let redCilnes;

/* gariņi */
let rezhiims = 0; /* 0: attēls; 1: teksts */
let fonaGarins = null;
let uudensGarins = null;
let tekstaGarins = null;

/* procedūras */
function atjaunotMolbertu() {
	molberts.atjaunotMeerogu(fonaGarins.img.width, document.getElementById("molberts").clientWidth);
	molberts.atjaunot(fonaGarins.img.width * molberts.meerogs, fonaGarins.img.height * molberts.meerogs);

	molberts.ziimeetAtteelu(fonaGarins.img, fonaGarins.x, fonaGarins.y, 1, 1);
	if (uudensGarins) molberts.ziimeetAtteelu(uudensGarins.img, uudensGarins.x, uudensGarins.y, uudensGarins.izmeers, uudensGarins.caursp);
}

function saakt() {
	fonaAvots = new ls.Fails("fonaAvotaPoga");
	uudensAvots = new ls.Fails("uudensAvotaPoga");
	molberts = new gr.Molberts("molberts");
	//redCilnes = new ls.Cilnes("redaktoraCilnes", rezhiims);
	sliidnes[0] = new ls.Sliidne("xSliidne", "X", 0, 1, 1, 1);
	sliidnes[1] = new ls.Sliidne("ySliidne", "Y", 0, 1, 1, 1);
	sliidnes[2] = new ls.Sliidne("iSliidne", "Izmērs", 0.01, 3, 0.01, 1);
	sliidnes[3] = new ls.Sliidne("tSliidne", "Caurspīdīgums", 0.01, 1, 0.01, 1);

	/* notikumi */
	fonaAvots.augsPoga.onchange = function() {
		if (!fonaAvots.augsPoga.files[0]) return;
		fonaAvots.atvasinaat();
		fonaGarins = new gr.Garins(fonaAvots.dati, 0, 0, 1, 1);

		fonaGarins.img.onload = function() {
			document.getElementById("redaktors").style.display = "block";

			if (uudensGarins) {
				uudensGarins.x = Math.round(fonaGarins.img.width / 2);
				uudensGarins.y = Math.round(fonaGarins.img.height / 2);
				uudensGarins.izmeers = 1;
				uudensGarins.caursp = 1;

				sliidnes[0].atjaunot(uudensGarins.img.width * -1, fonaGarins.img.width, 1, Math.round(fonaGarins.img.width / 2));
				sliidnes[1].atjaunot(uudensGarins.img.height * -1, fonaGarins.img.height, 1, Math.round(fonaGarins.img.height / 2));
				sliidnes[2].spiestAtjaunotVeertiibu(1);
				sliidnes[3].spiestAtjaunotVeertiibu(1);
			} else atjaunotMolbertu();
		}
	};

	fonaAvots.nonjPoga.onclick = function() {
		document.getElementById("redaktors").style.display = "none";
		if (uudensAvots.dati) uudensAvots.tiiriit();
		fonaAvots.tiiriit();
	};

	uudensAvots.augsPoga.onchange = function() {
		if (!uudensAvots.augsPoga.files[0]) return;
		uudensAvots.atvasinaat();
		uudensGarins = new gr.Garins(uudensAvots.dati, Math.round(fonaGarins.img.width / 2), Math.round(fonaGarins.img.height / 2), 1, 1);
		uudensGarins.img.onload = function() {
			sliidnes[0].atjaunot(uudensGarins.img.width * -1, fonaGarins.img.width, 1, Math.round(fonaGarins.img.width / 2));
			sliidnes[1].atjaunot(uudensGarins.img.height * -1, fonaGarins.img.height, 1, Math.round(fonaGarins.img.height / 2));
			sliidnes[2].spiestAtjaunotVeertiibu(1);
			sliidnes[3].spiestAtjaunotVeertiibu(1);
			document.getElementById("uRedaktors").style.display = "block";
			atjaunotMolbertu();
		}
	};

	uudensAvots.nonjPoga.onclick = function() {
		document.getElementById("uRedaktors").style.display = "none";
		uudensGarins = null;
		uudensAvots.tiiriit();
		atjaunotMolbertu();
	};

	sliidnes[0].sliidne.addEventListener("jauniDati", function() {
		uudensGarins.x = sliidnes[0].veertiiba;
		atjaunotMolbertu();
	});

	sliidnes[1].sliidne.addEventListener("jauniDati", function() {
		uudensGarins.y = sliidnes[1].veertiiba;
		atjaunotMolbertu();
	});

	sliidnes[2].sliidne.addEventListener("jauniDati", function() {
		uudensGarins.izmeers = sliidnes[2].veertiiba;
		atjaunotMolbertu();
	});

	sliidnes[3].sliidne.addEventListener("jauniDati", function() {
		uudensGarins.caursp = sliidnes[3].veertiiba;
		atjaunotMolbertu();
	});

	//redCilnes.notikums.addEventListener("paarsleegtaCilne", function() {
	//	console.log(redCilnes.cilnes[redCilnes.izveeleets].poga.innerHTML);
	//});
}

document.getElementById("saglabaashana").onclick = function() {
	let eksportaMolberts = document.createElement("canvas");
	let ctx = eksportaMolberts.getContext("2d");
	eksportaMolberts.width = fonaGarins.img.width;
	eksportaMolberts.height = fonaGarins.img.height;
	eksportaMolberts.style.display = "none";
	
	ctx.drawImage(fonaGarins.img, 0, 0);

	ctx.globalAlpha = uudensGarins.caursp;
	ctx.drawImage(uudensGarins.img, uudensGarins.x, uudensGarins.y, uudensGarins.img.width * uudensGarins.izmeers, uudensGarins.img.height * uudensGarins.izmeers);

	let eksportaPoga = document.createElement("a");
	eksportaPoga.href = eksportaMolberts.toDataURL();
	eksportaPoga.download = "eksports.png";
	eksportaPoga.style.display = "none";

	document.body.appendChild(eksportaMolberts);
	document.body.appendChild(eksportaPoga);
	eksportaPoga.click();
	document.body.removeChild(eksportaMolberts);
	document.body.removeChild(eksportaPoga);
}

window.onresize = function() {
	if (fonaGarins != null && document.getElementById("redaktors").style.display != "none") atjaunotMolbertu();
}

saakt();