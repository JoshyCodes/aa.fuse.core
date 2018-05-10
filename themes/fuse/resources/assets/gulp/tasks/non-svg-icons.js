/**
 * non-svg-icons.js - handles processing non-svg Icons
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

		gulp.task( 'non-svg-icons', function () {
			return processNonSVGIcons( config.icons.nonSvg );
		} );

		/**
		 * The tasks are synchronous to ensure the order is maintained and
		 * avoid any potential conflicts with the promises.
		 *
		 * @since 1.0.0
		 */
		function processNonSVGIcons ( settings ) {

			return gulp.src( settings.src )

			    // Deal with errors.
			    .pipe( plugins.plumber( {errorHandler: handleErrors} ) )


			    // Process new Icon Name
	           .pipe( plugins.rename( { prefix: settings.prefix } ) )

	           // Copy icon to dist/images folder
			    .pipe( gulp.dest( settings.dest ) ).on( 'end', function () {

			    	// Log Our Progres
					plugins.util.log( plugins.util.colors.bgBlack( 'Standard Icons are optimized....[non-svg-icons:processNonSVGIcons()]' ) );

				} );
		}


}