/**
 * svg-icons-indiv.js - Processes individual SVG icons that are, for whatever reason, not part of our sprite
 *
 *
 * @since       1.0.0
 * @author      CreativeFuse
 */

'use strict';

module.exports = function ( gulp, plugins, config ) {

	// Define variables
	var handleErrors 	= require( config.gulpDir + 'utils/handleErrors.js' ),
		runSequence 	= require('run-sequence').use(gulp);


	/**
	 * *****************************************************
	 * Our main callable svg-icons-indiv task
	 * *****************************************************
	 *
	 * Tasks are run synchronously to ensure each step is
	 * completed BEFORE moving on to the next one.
	 *
	 * @since  1.0.0
	 *
	 * *****************************************************
	 */
	
	gulp.task( 'svg-icons-indiv', function ( callback ) {

		runSequence(

			'svg-icon-indiv-clean',
			'svg-individual-icon-process',

			callback );

	} );	



	// Each gulp task returns the result of the 
	// specified functions

	gulp.task( 'svg-icon-indiv-clean', function () {
		return cleanIndivIcons( config.icons.svg );
	} );


	gulp.task( 'svg-individual-icon-process', function () {
		return processIndividualIcons( config.icons.svg );
	} );


	/**
	 * Remove our existing icon files before
	 * continuing.
	 *
	 * @since  1.0.0
	 */
	function cleanIndivIcons( settings ) {

		plugins.del( [ settings.clean  + settings.prefix + '*.svg' ] ).then( function () {

			plugins.util.log( plugins.util.colors.bgBlack( 'Individual SVG Icons are now clean....[svg-icons-indiv:cleanIndivIcons()]' ) );

		});
	};

	/**
	 * Minify, concatenate, and clean our Individual SVG icons.
	 *
	 * @since 1.0.0
	 *
	 * @return {*}
	 */
	function processIndividualIcons( settings ) {

		return gulp.src( settings.indivSrc )

	           // Deal with errors.
	           .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

	           // Minify and optimize
	           .pipe( plugins.svgmin() )

	           // Alter the html in our SVGs
	           .pipe( plugins.cheerio( {

		           run: function ( $ ) {

			           // Make sure no color is defined
			           $( '[fill]' ).removeAttr( 'fill' );

		           },

		           parserOptions: {xmlMode: true}

	           } ) )

	           // Process new Icon Name
	           .pipe( plugins.rename( { prefix: settings.prefix } ) )

	           // Copy icon to dist/images folder
	           .pipe( gulp.dest( settings.dest ) ).on( 'end', function () {

	           		// Log our Progress
					plugins.util.log( plugins.util.colors.bgBlack( 'Individual SVG Icons are now optimized....[svg-icons-indiv:processIndividualIcons()]' ) );

				} )

	           // Reload browser
	           .pipe( plugins.browserSync.stream() )

	           // Tell the world!
	           .pipe( plugins.notify( {

	           		title: 'Hot Sauce!',
	           		message: 'Individual SVG Icons are optimized!',

	           	}));
	};


}