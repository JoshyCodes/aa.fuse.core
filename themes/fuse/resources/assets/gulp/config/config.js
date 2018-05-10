/**
 * Gulp tasks runtime configuration script
 *
 * @since       1.0.0
 * @author      CreativeFuse
 */

module.exports = function ( moduleRoot ) {

	/************************************
	 * Module Settings
	 *
	 * ACTION:
	 * You need to change these settings
	 * to fit your project.
	 ***********************************/

		var moduleSettings = {

			// Name of the project
			package:	'ipp',

			// local dev domain proxy for live reload - ie. domain.dev
			localURL:	'localhost', 
			localPort:	3000,

			// Specify path for static server ( if no static server, use '' )
			staticServer: ['./', './'],

			// Tunnel the Browsersync server through a random Public URL?
			tunnel: false,

			// Define a Public URL for browsersync to tunnel through ( must be lowercase & letters ONLY )
			tunnelURL: '',

		};


	/************************************
	 * File & Folder Structure
	 ***********************************/

		/**
		 * Assets folder - path to the location of the assets root folder
		 *
		 * @type {String}
		 */
		var assetsDir = moduleRoot + 'resources/assets/';


		/**
		 * gulp folder - path to where the gulp utils and
		 * tasks are located.
		 *
		 * @type {String}
		 */
		var gulpDir = assetsDir + 'gulp/';

		/**
		 * Distribution folder - path to where the final build, distribution
		 * files will be located.
		 *
		 * @type {String}
		 */
		var distDir = moduleRoot + '_dist/';


		/**
		 * Assets folders - path to where the raw files are located.
		 *
		 * @type {Object}
		 */
		var assetDirs = {

			fonts: 			assetsDir 	+ 'fonts/',
			icons: 			assetsDir 	+ 'icons/',
			images: 		assetsDir 	+ 'images/',
			scss: 			assetsDir 	+ 'scss/',
			scripts:		assetsDir 	+ 'js/', 

			// 3rd part library paths
			node	: 	moduleRoot + 'node_modules/',
			bower	: 	moduleRoot + 'bower_components/',

		}


		/**
		 * Paths
		 *
		 * Paths to specific files or groups of files we 
		 * will need to reference in other groups of
		 * settings.
		 *
		 * @type {Object}
		 */

		var paths = {

			// Scripts and Styles
			css:			['./*.css', '!*.min.css'],
			scss: 			assetDirs.scss + '**/*.scss',
			scripts: 		[ assetDirs.scripts + '*.js', '!' + assetDirs.scripts + '*.min.js' ],
			scriptBundle:	assetDirs.scripts + '**/*.js',

			// Icons
			icons:			[ assetDirs.icons + '*.{jpg,png,gif}', '!' + assetDirs.icons + '*.svg' ],
			svgIcons:		assetDirs.icons + 'svg/' + '*.svg',
			svgSprite:		assetDirs.icons + 'svg/sprite/' + '**/*.svg',

			// Images
			images:			[ assetDirs.images + '*.{jpg,gif,png}', '!' + assetDirs.images + '*.svg' ],
			svgImages:		assetDirs.images + 'svg/' + '**/*.svg'

		};



		/**
		 * Distribution folder - path to where the final build, distribution
		 * files will be located.
		 *
		 * @type {Object}
		 */

		var distDirs = {

			root: 		moduleRoot,
			css: 		moduleRoot + 'resources/',
			scripts:	distDir + 'js/',
			images:		distDir + 'images/',
			icons:		distDir + 'icons/',
			fonts:		distDir + 'fonts/',

		};


		/**
		 * Distribution File Names - names for our final dist files
		 * 
		 * @type {Object}
		 */
		var distFilenames = {

			finalCSS		: 'style',
			bundledJS		: 'core.js',
			iconSprite		: 'sprite.svg',

		};


	/************************************
	 * Task Settings
	 ***********************************/



		/**
		 * *********************************************
		 * Browsersync & Server task settings
		 *
		 * Options: https://browsersync.io/docs/options
		 * *********************************************
		 */

		var serverSettings = {

			online: true,								// Use internet connection?
			open: false,             					// Open project in a new tab on server start?
			injectChanges: true,     					// Auto inject css changes instead of full reload
			proxy: moduleSettings.localURL,  			// Use http://domainname.tld:3000 to use BrowserSync
			staticServer: moduleSettings.staticServer,	// Define our static server
			port: moduleSettings.localPort,				// Define a port for browsersync to use on your local machine
			browser: "google chrome",					// Default Browser to use
			tunnel: moduleSettings.tunnel,				// Tunnel the Browsersync server through a random Public URL?
			tunnelURL: moduleSettings.tunnelURL,		// Define a Public URL for browsersync to tunnel through

			// Define Actions to mirror
			ghostOptions: {

				clicks: false,
			    forms: false,
			    scroll: false

			},

			// Define Options once the server is running and watching files
			watchOptions: {

				debounceDelay: 1000,	// Wait before injecting?


				// We are watching these files for change and will
				// reload our browser if they are modified
				files : [

					'./gulpfile.js',
					gulpDir 			+ 'config/config.js',
					assetDirs.scripts 	+ '**/*.js',
					assetDirs.icons 	+ '**/*.svg',
					assetDirs.images 	+ '**/*.{png,jpg,gif,svg}'

				],

			},
				
			
		};



		/**
		 * **************************************
		 * Task settings for our core stylesheet
		 * @type {Object}
		 * **************************************
		 */

		var stylesSettings = {

			// Clean up before we make a new file
			clean: {

				src : distDirs.css + "*.css*"

			},

			/**
			 * Let's handle our stylesheet output via PostCss
			 *
			 * @ref https://github.com/postcss/gulp-postcss
			 */

			postcss: {

				src: assetDirs.scss + '*.scss', // This will snag all asset/src/scss files in all folders
				dest: distDirs.css,

				/**
				 * Autoprefixer
				 *
				 * @ref https://www.npmjs.com/package/autoprefixer
				 */
				autoprefixer: {
					browsers: [
						'last 2 versions',
						'ie 9',
						'ios 6',
						'android 4'
					]
				},

				name: distFilenames.finalCSS

			},

			// Minification settings for our stylesheet
			cssnano: {

				src: distDirs.css + "*.css",
				dest: distDirs.css,
				name: distFilenames.finalCSS

			},

		};



		/**
		 * ******************************
		 * Task settings for our scripts
		 * @type {Object}
		 * ******************************
		 */

		var scriptsSettings = {


			// Clean up before we make a new file
			clean: {

				src : [ distDirs.scripts + "*.*" ]

			},


			// Concatenate all JS tagged with .core
			bundle: {

				// An array of files to bundle into our final file
				files: [

					assetDirs.scripts + '**/*.core.js'

				],

				dest		: distDirs.scripts,
				name		: distFilenames.bundledJS,

			},

			// Minify the JS before output
			uglify: {

				src: distDirs.scripts + '*.js',
				dest: distDirs.scripts,

			}

		};
		

		/**
		 * ****************************
		 * Task settings for our Icons
		 * 
		 * @type {Object}
		 * ****************************
		 */
		var iconsSettings = {

			// The majority of icons will ideally be SVG
			svg: {
				
				clean: 			distDirs.icons,
				spriteSrc: 		paths.svgSprite,
				indivSrc:		paths.svgIcons,
				dest: 			distDirs.icons,
				name: 			distFilenames.iconSprite,
				prefix:			'icon-',
				
			},

			// We also might have icons that are .png
			nonSvg: {

				clean: 			distDirs.icons,
				src : 			paths.icons,
				dest: 			distDirs.icons,
				prefix: 'icon-'

			},
		};


		/**
		 * ****************************
		 * Task settings for our Images
		 * 
		 * @type {Object}
		 * ****************************
		 */
		var imageSettings = {
			
			clean:	distDirs.images,
			src: 	paths.images,
			dest: 	distDirs.images,

			svg: {

				clean: 	distDirs.images + 'svg/**/*.svg',
				src: 	paths.svgImages,
				dest: 	distDirs.images,


			}

		};

	/************************************
	 * Do not touch below this line.
	 *
	 * The following code assembles up the
	 * configuration object that is returned
	 * to gulpfile.js.
	 ***********************************/

	return {

		// Folder & path settings
		moduleRoot: moduleRoot,
		assetsDir: assetsDir,
		assetDirs: assetDirs,
		dist: distDirs,
		distDir: distDir,
		gulpDir: gulpDir,
		paths: paths,

		// Task settings
		server: serverSettings,
		icons: iconsSettings,
		images: imageSettings,
		scripts: scriptsSettings,
		styles: stylesSettings,
		

	};
};
