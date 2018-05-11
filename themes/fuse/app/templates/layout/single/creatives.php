<?php
namespace Fuse\Layout\SingleCreatives;
use Fuse\Controllers;


// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on a normal page
	if( is_singular( 'creatives' ) ){

		add_action( 'fuse_content', __NAMESPACE__ . '\load_content', 5);

	}

	function load_content(){


	}
	
}