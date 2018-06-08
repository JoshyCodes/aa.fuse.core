import '../scss/critical/critical.scss';

(function() {
		// Optimization for Repeat Views
		if( sessionStorage.fontsLoadedFoutWithClass ) {
			document.documentElement.className += " fuse--fonts-loaded";
			return;
		}
		if( "fonts" in document ) {
			Promise.all([
				document.fonts.load("1rem merriweatherbold"),
				document.fonts.load("700 1rem merriweatherbold"),
				document.fonts.load("1rem merriweatherregular"),
				document.fonts.load("400 1rem merriweatherregular"),
				document.fonts.load("1rem ProximaNovaT-Thin"),
				document.fonts.load("100 1rem ProximaNovaT-Thin"),
				document.fonts.load("1rem ProximaNova-Bold"),
				document.fonts.load("700 1rem ProximaNova-Bold"),
			]).then(function () {
				document.documentElement.className += " fuse--fonts-loaded";
				// Optimization for Repeat Views
				sessionStorage.fontsLoadedFoutWithClass = true;
			});
		}
	})();
