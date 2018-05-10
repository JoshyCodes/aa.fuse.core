/**
 * watch.js - Initialize all of our Browsersync Watch Tasks
 *

 * @since       1.0.0
 * @author      CreativeFuse
 */

'use strict';

module.exports = function ( gulp, plugins, config ) {

	/**
	 * Handles the watch tasks.
	 *
	 * @since 1.0.0
	 */
	gulp.task( 'watch', function ( callback ) {

		/**
		 * When these watched files change, we will run the
		 * appropriate processing tasks :)
		 */

		// Styles
		gulp.watch( config.paths.scss, ['styles'] );
		
		// Scripts
		gulp.watch( config.paths.scripts, ['scripts'] );
		gulp.watch( config.paths.scriptBundle, ['scripts'] );

		//Icons
		gulp.watch( config.paths.svgIcons, ['svg-icons-indiv'] );
		gulp.watch( config.paths.svgSprite, ['svg-icons-sprite'] );
		gulp.watch( config.paths.icons, ['non-svg-icons'] );

		//Images
		gulp.watch( config.paths.images, ['images'] );
		gulp.watch( config.paths.svgImages, ['svg-images'] );
		


		// Log our progress
		return plugins.util.log( plugins.util.colors.bgBlack( 'Files are being watched for changes...[watch]' ) );

	});

};