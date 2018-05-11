<?php
namespace Fuse\Layout\FrontPage;
use Fuse\Controllers;




// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on the Front Page of our site
	if( is_front_page() ){

	}

	
}