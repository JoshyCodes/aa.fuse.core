/**
 * styles.js - Builds the distribution stylesheets
 *
 * Tasks include:
 *      1. Linting
 *      2. Compiles the Sass files into CSS and stores them into the Distribution location
 *      3. Minifies the CSS in the Distribution location
 *      4. Moves the style.css file from the Distribution location to the root of your theme
 *
 * @since       1.0.0
 * @author      CreativeFuse
 */

'use strict';

module.exports = function ( gulp, plugins, config ) {

	// Define variables
	var handleErrors 	= require( config.gulpDir + 'utils/handleErrors.js' ),
		mqpacker 		= require( 'css-mqpacker' ),
		runSequence 	= require('run-sequence').use(gulp);


	/**
	 * *****************************************************
	 * Our main callable styles task
	 * *****************************************************
	 *
	 * Tasks are run synchronously to ensure each step is
	 * completed BEFORE moving on to the next one.
	 *
	 * @since  1.0.0
	 *
	 * *****************************************************
	 */
	
	gulp.task( 'styles', function ( callback ) {

		runSequence(

			'styles-clean',
			'styles-build-scss',
			'styles-minify',

			callback );

	} );


	// Each gulp task returns the result of the 
	// specified functions

	gulp.task( 'styles-clean', function () {
		return cleanStyles( config.styles.clean );
	} );


	gulp.task( 'styles-build-scss', function () {
		return buildScss( config.styles.postcss );
	} );


	gulp.task( 'styles-minify', function () {
		return minifyStyles( config.styles.cssnano );
	} );


	/**
	 * *****************************************************
	 * Task functions
	 * *****************************************************
	 *
	 * Instead of building our full tasks inside each of the 
	 * gulp.task() methods, we are building our own functions
	 * and returning the result.
	 *
	 * *****************************************************
	 */

	/**
	 * Delete the old .css files in the dist folder before we minify and optimize
	 *
	 * @since 1.0.0
	 *
	 * @param settings
	 * @returns {*}
	 */
	function cleanStyles( settings ) {

		return plugins.del( settings.src ).then(function(){

			// Log our progress
			plugins.util.log( plugins.util.colors.bgBlack( 'Styles are now clean....[cleanStyles()]' ) );

		});

	}



	/**
	 * Compile Sass and run stylesheet through PostCSS.
	 *
	 * @since 1.0.3
	 *
	 * @param settings
	 * @returns {*}
	 */
	function buildScss( settings ) {

		return gulp.src( settings.src )


			 	// Catch any errors right off the bat
	           .pipe( plugins.plumber( {

		           errorHandler: handleErrors

	           } ) )

	           // Start a sourcemap before modifying
	           // the file in any way
	           .pipe( plugins.sourcemaps.init() )

	           // Let's get sassy
	           .pipe( plugins.sass( {

		          	errLogToConsole: true,
		          	outputStyle: 'expanded' // Options: nested, expanded, compact, compressed

	           } ) )

	           /**
	            * Autoprefix all of our CSS
	            * Unpack and bundle all media queries
	            */
	           .pipe( plugins.postcss( [

		           plugins.autoprefixer( settings.autoprefixer ),
		           mqpacker(),

	           ] ) )

	           // Output the sourcemap once we have
	           // processed our file with sass
	           .pipe( plugins.sourcemaps.write() )

	           // Rename the file
	           .pipe( plugins.rename( {

	           		basename: settings.name

	           	} ) )

	           // log our progress
	           .pipe( gulp.dest( settings.dest ) ).on( 'end', function () {

					plugins.util.log( plugins.util.colors.bgBlack( 'Sass has been compiled into native CSS....[styles:buildSass()]' ) );

				} )

	           // Fire browser sync to auto-inject the new changes
	           .pipe( plugins.browserSync.stream() );
	}


	/**
	 * Minify and optimize style.css.
	 *
	 * @since 1.0.3
	 *
	 * @param settings {}
	 * @returns {*}
	 */
	function minifyStyles( settings ) {

		return gulp.src( settings.src, function( cb ){

				// log our progress
				plugins.util.log( plugins.util.colors.bgBlack( 'styles are now minified and optimized....[styles:minifyStyles()]' ) );

			})

			// Catch any errors right off the bat
           .pipe( plugins.plumber( {

           		errorHandler: handleErrors

           	}))

           // Minify the stylesheet
           .pipe( plugins.cssnano( {

	           safe: true

           }))

           // Rename the file
           .pipe( plugins.rename( {

           		basename: settings.name,
           		suffix: '.min'

           	}))


           // Place the file in its final destination
           .pipe( gulp.dest( settings.dest ) )


           // Kick off a live browser reload
           .pipe( plugins.browserSync.stream() )


           // Tell the world
           .pipe( plugins.notify( {

           		title: 'Boom! Done!',
           		message: 'Styles successfully processed!'

           	}));


	};

};