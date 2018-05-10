/**
 * svg-icons-sprite.js - Builds the SVG Icon Sprite
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
	 * Our main callable svg-icons-sprite task
	 * *****************************************************
	 *
	 * Tasks are run synchronously to ensure each step is
	 * completed BEFORE moving on to the next one.
	 *
	 * @since  1.0.0
	 *
	 * *****************************************************
	 */
	
	gulp.task( 'svg-icons-sprite', function ( callback ) {

		runSequence(

			'svg-icon-sprite-clean',
			'svg-sprite-build',

			callback );

	} );	



	// Each gulp task returns the result of the 
	// specified functions

	gulp.task( 'svg-icon-sprite-clean', function () {
		return cleanSpriteIcons( config.icons.svg );
	} );


	gulp.task( 'svg-sprite-build', function () {
		return buildIconSprite( config.icons.svg );
	} );


	/**
	 * Remove our existing final sprite file before
	 * continuing.
	 *
	 * @since  1.0.0
	 */
	function cleanSpriteIcons( settings ) {

		plugins.del( [ settings.clean + settings.name ] ).then( function () {

			plugins.util.log( plugins.util.colors.bgBlack( 'Icon Sprite cleaned....[svg-icons-sprite:cleanSpriteIcons()]' ) );

		});
	};

	/**
	 * Minify, clean & concatenate SVG icons
	 * into one, final SVG sprite file.
	 *
	 * @since 1.0.0
	 *
	 * @return {*}
	 */
	function buildIconSprite( settings ) {

		return gulp.src( settings.spriteSrc )

	           // Deal with errors.
	           .pipe( plugins.plumber( {errorHandler: handleErrors} ) )

	           // Minify and optimize
	           .pipe( plugins.svgmin() )

	           // Combine all SVGs into a single sprite file
	           .pipe( plugins.svgstore( { inlineSvg: true }))

	           // Alter the html in our SVGs
	           .pipe( plugins.cheerio( {

		           run: function ( $ ) {

		           		// Make sure no icons display in our sprite
		           		// until we call them
			           $( 'svg' ).attr( 'style', 'display:none' );

			           // Make sure no color is defined
			           $( '[fill]' ).removeAttr( 'fill' );
		           },

		           parserOptions: {xmlMode: true}	

	           }))

	           // Rename the file
	           .pipe( plugins.rename( settings.name ) )

	           // Place in our Dist folder
	           .pipe( gulp.dest( settings.dest ) ).on( 'end', function () {

	           		// Log our Progress
					plugins.util.log( plugins.util.colors.bgBlack( 'Svg sprite has been created...[svg-icons-sprite:buildIconSprite()]' ) );

				})

	           // Reload the browser
	           .pipe( plugins.browserSync.stream() )


	           // Tell the world
	           .pipe( plugins.notify( {

	           		title: 'Soda anyone?',
	           		message: 'SVG sprite created!',

	           	}));
	};


}