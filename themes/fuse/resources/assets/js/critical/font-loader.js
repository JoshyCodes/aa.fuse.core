const FontFaceObserver = require( 'fontfaceobserver' );

(function(){

	// Check from https://css-tricks.com/font-display-masses/
	if (isFontDisplaySupported() === false && "fonts" in document) {

		if( sessionStorage.fontsLoaded ) {

			setFontsLoadedClass();

			return;

		}

		loadFonts();

	} else {

		setFontsLoadedClass();

	}

})();


// Reference https://css-tricks.com/font-display-masses/
function isFontDisplaySupported(){

	const e = document.createElement("style");

	try {

		e.textContent = "@font-face { font-display: swap; }";

		document.documentElement.appendChild(e);

		const isFontDisplaySupported = e.sheet.cssRules[0].cssText.indexOf("font-display") != -1;

		e.remove();

		return isFontDisplaySupported;

	  } catch (e) {}

}

function setFontCacheFlag(){

	// Optimization for Repeat Views
	sessionStorage.fontsLoaded = true;

}

function setFontsLoadedClass(){

	document.documentElement.className += " fuse--fonts-loaded";

}

function loadFonts(){

	const fontA = new FontFaceObserver('merriweatherregular', {
			weight: 400
		});

	const fontB = new FontFaceObserver('merriweatherbold', {
			weight: 700
		});

	const fontC = new FontFaceObserver('ProximaNova-Bold', {
			weight: 700
		});

	const fontD = new FontFaceObserver('ProximaNova-Medium', {
		weight: 500
	});

	const fontE = new FontFaceObserver('ProximaNovaT-Thin', {
			weight: 100
		});


	Promise.all([

		fontA.load(null, 10000),
		fontB.load(null, 10000),
		fontC.load(null, 10000),
		fontD.load(null, 10000),
		fontE.load(null, 10000)

	]).then(function() {
		setFontsLoadedClass();
		setFontCacheFlag();
	});

};
