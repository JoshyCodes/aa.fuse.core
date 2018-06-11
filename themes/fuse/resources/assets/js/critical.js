import '../scss/critical/critical.scss';
const FontFaceObserver = require( 'fontfaceobserver' );

(function(){

	// Optimization for Repeat Views
	if( sessionStorage.fontsLoaded ) {

		document.documentElement.className += " fuse--fonts-loaded";

		return;
		
	}
	
	const fontA = new FontFaceObserver('merriweatherregular', {
			weight: 400
		});

	const fontB = new FontFaceObserver('merriweatherbold', {
			weight: 700
		});
		
	const fontC = new FontFaceObserver('ProximaNova-Bold', {
			weight: 700
		});

	const fontD = new FontFaceObserver('ProximaNovaT-Thin', {
			weight: 100
		});
		
	Promise.all([

		fontA.load(null, 10000),
		fontB.load(null, 10000),
		fontC.load(null, 10000),
		fontD.load(null, 10000)

	]).then(function () {

		document.documentElement.className += " fuse--fonts-loaded";

		// Optimization for Repeat Views
		sessionStorage.fontsLoaded = true; 

	});

})();