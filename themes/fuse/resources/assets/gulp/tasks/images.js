/**
 * images.js - Process non-svg images in our project
 *
 * @since       1.0.0
 * @author      CreativeFuse
 */

'use strict';

module.exports = function ( gulp, plugins, config ) {

	// Define variables
	var handleErrors 	= require( config.gulpDir + 'utils/handleErrors.js' );

		/**
		 * *****************************************************
		 * Our main callable images task
		 * *****************************************************
		 *
		 * Tasks are run synchronously to ensure each step is
		 * completed BEFORE moving on to the next one.
		 *
		 * @since  1.0.0
		 *
		 * *****************************************************
		 */
	

		// Each gulp task returns the result of the 
		// specified functions

		gulp.task( 'images', function () {
			return processImages( config.images );
		} );

		/**
		 * Process our images and move them to the dist folder
		 *
		 * Note: Typically we do not want to optimize them here becasue
		 * we want a higher level of control over the optimization process,
		 * so we stypically will optimize on export in illustrator or photoshop.
		 *
		 * @since 1.0.0
		 */

		function processImages ( settings ) {

			return gulp.src( settings.src )

			    // Deal with errors.
			    .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

			    // move the images to the dist/images folder
			    .pipe( gulp.dest( settings.dest ) ).on( 'end', function () {

			    	// Log Our progress
					plugins.util.log( plugins.util.colors.bgBlack( 'Images are optimized....[images:processImages()]' ) );

				} )

			    //Tell the world!
	           .pipe( plugins.notify( {

	           		title: 'So pretty!',
	           		message: 'Images are optimized.',

	           	} ) );

		}


}