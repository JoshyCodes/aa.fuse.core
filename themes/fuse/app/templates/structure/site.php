<?php
namespace Fuse\Structure;
use Fuse\Controllers;
use Fuse\AssetHandler;
use Reactor\Helpers;

/**
 * Load Critical styles & scripts first. These
 * wil lget injected straight into the head :)
 */
add_action( 'wp_head', __NAMESPACE__ . '\inject_critical_scripts_and_styles', 1);


// Bring in site assets
add_action( 'wp_enqueue_scripts',	__NAMESPACE__ . '\load_core_app_styles', 999999999 ); // LOAD LAST to make sure we override any plugin styles
add_action( 'wp_enqueue_scripts',	__NAMESPACE__ . '\load_core_app_script', 1 );
add_action( 'fuse_after_body_open', __NAMESPACE__ . '\load_svg_sprite', 1 );

add_action( 'fuse_site_begin',		__NAMESPACE__ . '\open_site',		1 );
add_action( 'fuse_header',			__NAMESPACE__ . '\load_header',		1 );
add_action( 'fuse_footer',			__NAMESPACE__ . '\load_footer',		1 );
add_action( 'fuse_site_end',		__NAMESPACE__ . '\close_site',		1 );




/**
 * Inline Critical CSS & JS
 *
 * https://gomakethings.com/inlining-critical-css-for-better-web-performance/
 */

function inject_critical_scripts_and_styles(){

	// to do = pass array into function

	$files = [

		'critical.css' 	=> 'style',
		'critical.js'	=> 'script',

	];


	// Put this in it's own injection helper function
	foreach( $files as $file => $tag ){

		$critical 	= AssetHandler\get_asset_from_manifest( $file, false );

		if( file_exists( $critical )){

		    echo "<{$tag}>".file_get_contents( $critical )."</{$tag}>";

		}


	}

}

/**
 * Register & enqueue the main stylesheet for our application
 */

function load_core_app_styles(){

	$stylesheet = [

		'handle' 			=> 'app-styles',
		'src'				=> AssetHandler\get_asset_from_manifest( 'app.css' ),
		'dependencies'		=> null,
		'version'			=> null,
		'media'				=> 'all',

	];


	wp_register_style( $stylesheet['handle'], $stylesheet['src'], $stylesheet['dependencies'], $stylesheet['version'], $stylesheet['media'] );
	wp_enqueue_style( $stylesheet['handle'] );


}


/**
 * Register & enqueue the main script for our application
 */

function load_core_app_script(){

	$script = [

		'handle' 			=> 'app-script',
		'src'				=> AssetHandler\get_asset_from_manifest( 'app.js' ),
		'dependencies'		=> ['jquery'],
		'version'			=> null,
		'load_in_footer'	=> 'true',

	];

	wp_register_script( $script['handle'], $script['src'], $script['dependencies'], $script['version'], $script['load_in_footer'] );
	wp_enqueue_script( $script['handle'] );


}

function load_svg_sprite(){

	AssetHandler\inject_svg_sprite();

}


function open_site(){

	Controllers\render( 'structure/head' );

}


function load_header(){

	Controllers\render( 'structure/header' );

}

function load_footer(){

	Controllers\render( 'structure/footer' );

}

function close_site(){

	Controllers\render( 'structure/site-end' );

}
