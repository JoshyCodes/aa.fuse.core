/**
 * serve.js - Serves up a local instance of our build via browsersync - https://browsersync.io/
 * 
 * @since       1.0.0
 * @author      CreativeFuse
 */

'use strict';

module.exports = function ( gulp, plugins, config ) {

	var runSequence 	= require('run-sequence').use(gulp);

	/**
	 * *****************************************************
	 * Our main callable server task
	 * *****************************************************
	 *
	 * Tasks are run synchronously to ensure each step is
	 * completed BEFORE moving on to the next one.
	 *
	 * @since  1.0.0
	 *
	 * *****************************************************
	 */
	
	gulp.task('serve', function( callback ) {


		runSequence(

			'server-load',
			'server-loaded',

			callback );


	});


	gulp.task('server-load', function() {

		return loadServer( config.server );

	});

	
	gulp.task('server-loaded', function() {

		return serverLoaded();

	});

	
	/**
	 * The function responsible for returning our server instance to Gulp
	 * 
	 * @param  {Object} settings for our browsersync instance
	 * @return {Object} our browsersync instance
	 * @since 1.0.0
	 * 
	 * @link https://browsersync.io/docs/options/
	 */
	function loadServer( settings ){


		return plugins.browserSync.init({
			
			files: settings.watchOptions.files,

			proxy: settings.proxy,

			serveStatic: settings.staticServer,

			ghostMode: {

			    clicks: settings.ghostOptions.clicks,
			    forms: settings.ghostOptions.forms,
			    scroll: settings.ghostOptions.scroll

			},

			browser: settings.browser,

			open: settings.open,

			port: settings.port,

			tunnel: settings.tunnel,

			tunnel: settings.tunnelURL,

			injectChanges: settings.injectChanges,
			
			reloadDebounce: settings.watchOptions.debounceDelay,

		});




	}


	/**
	 * Run this after the server has loaded :)
	 */
	function serverLoaded(){

		// Log our progress
		return plugins.util.log( plugins.util.colors.bgBlack( 'The Browsersync server is up and running...[serve:serverLoaded()]' ) );

	}


}