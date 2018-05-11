<?php
namespace Fuse\Layout\SinglePost;
use Fuse\Controllers;


// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on a normal page
	if( is_singular( 'post' ) ){

		add_action( 'fuse_content', __NAMESPACE__ . '\load_summary', 5);
		add_action( 'fuse_content', __NAMESPACE__ . '\load_content', 5);

	}

	function load_summary(){

		Controllers\render( 'fragments/posts/post/single/summary' );

	}

	function load_content(){

		Controllers\render( 'fragments/posts/post/single/content' );

	}
	
}