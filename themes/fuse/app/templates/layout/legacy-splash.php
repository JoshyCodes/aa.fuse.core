<?php
namespace Fuse\Layout\LegacySplash;
use Fuse\Controllers;




// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on our splash page
	if( is_page( '' ) ){
		
	}

	
}