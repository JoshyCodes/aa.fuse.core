<?php
namespace Fuse\Layout\Page;
use Fuse\Controllers;
use Reactor\Optimize;




// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on a normal page
	if( is_page() ){


	}



}
