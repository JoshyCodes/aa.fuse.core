/**
 * Desc				: Inits polyfill for browsers that do not properly support SVG local file reference
 * Requirement		: svg4everybody must already be loaded before we run this init;
 * 
 * @since 1.0.0
 * @author CreativeFuse
 */

'use strict';

 ;(function( $, window, document, undefined ){

 	// Init Function
 	$(document).ready( function() {
 		svg4everybody();
 	});

 })( jQuery, window, document );


