<?php
namespace CreativeFuse\Analytics;
use Reactor\Helpers;

add_action('init', __NAMESPACE__ . '\load_gtm');

function load_gtm(){

	// Fire off GTM & Hotjar if we are not in a dev environment
	if( ! Helpers\is_dev_env() ){

		add_action( 'wp_head', __NAMESPACE__ . '\load_gtm_head', 1);
		add_action( 'fuse_gtm', __NAMESPACE__ . '\load_gtm_body', 1);

	}

}


function load_gtm_head(){

	include_once( __DIR__ . '/gtm-head.php' );

}


function load_gtm_body(){

	include_once( __DIR__ . '/gtm-body.php' );

}