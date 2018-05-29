<?php
namespace Fuse\Layout\TemplateLanding;
use Fuse\Controllers;


// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on our landing page
	if( is_page_template( 'template-landing.php' ) || is_page_template( 'template-legacy-splash.php' ) ){

		/**
		 * Remove the Header and Footer
		 */
		remove_action( 'fuse_header', 'Fuse\Structure\load_header', 1 );
		remove_action( 'fuse_footer', 'Fuse\Structure\load_footer', 1 );
		

	}

	
}