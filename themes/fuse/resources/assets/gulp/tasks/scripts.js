/**
 * scripts.js - Builds the distribution JS
 *
 * @package     CreativeFuse
 * @since       1.0.0
 */

'use strict';

module.exports = function ( gulp, plugins, config ) {

	var handleErrors = require( config.gulpDir + 'utils/handleErrors.js' ),
		runSequence = require('run-sequence').use(gulp);

	/**
	 * *****************************************************
	 * Our main callable scripts task
	 * *****************************************************
	 *
	 * Tasks are run synchronously to ensure each step is
	 * completed BEFORE moving on to the next one.
	 *
	 * @since  1.0.0
	 *
	 * *****************************************************
	 */
	gulp.task( 'scripts', function ( callback ) {

		runSequence(

			'scripts-clean',
			'scripts-build-core-bundle',
			'scripts-minify',

			callback );

	} );


	gulp.task( 'scripts-clean', function () {

		return cleanScripts( config.scripts.clean );

	} );


	gulp.task( 'scripts-build-core-bundle', function () {

		return buildCoreScriptBundle( config.scripts.bundle );

	} );


	gulp.task( 'scripts-minify', function () {

		return minifyScripts( config.scripts.uglify );

	} );


	/*******************
	 * Task functions
	 ******************/

	/**
	 * Delete the .js before we minify and optimize
	 *
	 * @since 1.0.0
	 *
	 * @param settings
	 * @returns {*}
	 */
	function cleanScripts( settings ) {

		plugins.del( settings.src ).then(function(){

			// Log our progress
			plugins.util.log( plugins.util.colors.bgBlack( 'Scripts are now clean....[scripts:cleanScripts()]' ) );

		});

	};


	/**
	 * Build our Core Scripts Bundle
	 *
	 * @since 1.0.0
	 *
	 * @returns {*}
	 */
	function buildCoreScriptBundle( settings ) {


		return gulp.src( settings.files )

			// Catch any errors right off te bat
           .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

           // Concat all scripts in our bundle
           .pipe( plugins.concat( settings.name ) )

           .pipe( gulp.dest( settings.dest ) ).on( 'end', function(){

           		// Log our progress
				plugins.util.log( plugins.util.colors.bgBlack( 'Core Script bundle has been built....[scripts:buildCoreScriptBundle()]' ) );


           });

	}


	/**
	 * Minify scripts
	 *
	 * @since 1.0.0
	 */
	function minifyScripts( settings ) {

		return gulp.src( settings.src, function(cb){

			// log our progress
			plugins.util.log( plugins.util.colors.bgBlack( 'Script are now minified and optimized....[scripts:minifyScripts()]' ) );

		} )

				// Catch any errors right off te bat
	           .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

	           .pipe( plugins.rename( {suffix: '.min'} ) )

	           	// Minify the scripts
	           .pipe( plugins.uglify( {
		           mangle: false
	           } ) )

	           // Move final file to dist/js
               .pipe( gulp.dest( settings.dest ) )

               // Tell The World
	           .pipe( plugins.notify( {

	           		title: 'Life is good!',
	           		message: 'Scripts are built :)'

	           	}));
	           
	};
};
