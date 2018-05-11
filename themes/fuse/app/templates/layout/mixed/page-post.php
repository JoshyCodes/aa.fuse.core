<?php
namespace Fuse\Layout\PagePost;
use Fuse\Controllers;




// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on a normal page
	if( is_page() || is_singular( 'post' ) ){

		add_action( 'fuse_before_loop', __NAMESPACE__	. '\load_article_wrapper', 1);

	}

	// Load the article wrapper
	function load_article_wrapper(){

		Controllers\render( 'structure/article-open' );

	}

}