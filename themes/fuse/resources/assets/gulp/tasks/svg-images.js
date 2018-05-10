/**
 * svg-images.js - Handle the processing of our SVG Images
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
	 * Our main callable svg-images task
	 * *****************************************************
	 *
	 * Tasks are run synchronously to ensure each step is
	 * completed BEFORE moving on to the next one.
	 *
	 * @since  1.0.0
	 *
	 * *****************************************************
	 */
	
	gulp.task( 'svg-images', function ( callback ) {

		runSequence(

			'svg-images-clean',
			'svg-images-process',

			callback );

	} );	



	// Each gulp task returns the result of the 
	// specified functions

	gulp.task( 'svg-images-clean', function () {
		return cleanSvgImages( config.images.svg );
	} );


	gulp.task( 'svg-images-process', function () {
		return processSvgImages( config.images.svg );
	} );


	/**
	 * Clean out dist images folder
	 *
	 * @since 1.0.0
	 */
	function cleanSvgImages( settings ) {

		plugins.del( [ settings.clean ] ).then( function () {

			plugins.util.log( plugins.util.colors.bgBlack( 'SVG Images are clean....[svg-images:cleanSvgImages()]' ) );

		});
	};


	/**
	 * Minify/clean SVG images before copying them
	 * to the dist/images folder
	 *
	 * @since 1.0.0
	 *
	 * @return {*}
	 */
	function processSvgImages( settings ) {

		return gulp.src( settings.src )

	           // Deal with errors.
	           .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

	           // Minify SVGs and strip them of bloat
	           .pipe( plugins.svgmin() )

	           // Copy to dest/images folder
	           .pipe( gulp.dest( settings.dest ) ).on( 'end', function () {

	           		// Log our Progress
					plugins.util.log( plugins.util.colors.bgBlack( 'SVG Images are now optimized....[svg-images:processSvgImages()]' ) );

				} )

	           //Browser refresh
	           .pipe( plugins.browserSync.stream() )

	           //Tell the world!
	           .pipe( plugins.notify( {

	           		title: 'Lookin Good!',
	           		message: 'SVG Images are optimized.',

	           	} ) );
	};


}