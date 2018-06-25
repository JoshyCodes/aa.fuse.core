<?php
namespace Fuse\AssetHandler;
use Reactor\Helpers;
use Fuse;

/**
 * Load JQuery from Google CDN if Available. This can lead to huge performance gains
 * since it takes the strain off of our server. Also, the vast majority of users will
 * already have this cached.
 *
 * @since  1.0.0
 * @package Fuse\Enqueues
 * @author  CreativeFuse
 */
add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\maybe_load_jquery_from_google_cdn' );

function maybe_load_jquery_from_google_cdn(){

	// Set the site protocol for our final request
	$protocol			= Helpers\get_url_protocol();

	// What version are we loading
	$jquery_version 	= Fuse\fuse()->config('jquery', 'version');


	/**
	 * Set the testing protocol to http otherwise, none of our checks will work
	 * for domain existence. They all return false on https and only check for http.
	 */
	$jquery_test_url 	= 'http://ajax.googleapis.com/ajax/libs/jquery/' . $jquery_version . '/jquery.min.js';

	// Build the final request url
	$jquery_cdn_url 	= $protocol . '://ajax.googleapis.com/ajax/libs/jquery/' . $jquery_version . '/jquery.min.js';


	/**
	 * Check if the version of jquery we are trying to get from
	 * Google actually exists before we dequeue the WP version
	 * and roll our own
	 */
	if(  Helpers\domain_exists( $jquery_test_url ) ){

		// deregisters the default WordPress jQuery
		wp_deregister_script( 'jquery' );

		 // register the external file
		wp_register_script( 'jquery', $jquery_cdn_url );

		// enqueue the external file
		wp_enqueue_script('jquery');


	}

}
