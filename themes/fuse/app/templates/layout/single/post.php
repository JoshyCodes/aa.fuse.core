<?php
namespace Fuse\Layout\SinglePost;
use Fuse\Controllers;
use Fuse\AssetHandler;


// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on a normal page
	if( is_singular( 'post' ) ){

		add_action( 'fuse_content', __NAMESPACE__ . '\load_summary', 5);
		add_action( 'fuse_content', __NAMESPACE__ . '\load_content', 5);
		add_action( 'wp_enqueue_scripts',	__NAMESPACE__ . '\load_posts_script', 1 );


	}

	function load_summary(){

		Controllers\render( 'fragments/posts/post/single/summary' );

	}

	function load_content(){

		Controllers\render( 'fragments/posts/post/single/content' );

	}


	function load_posts_script(){

		$script = [

			'handle' 			=> 'posts-script',
			'location'			=> AssetHandler\get_asset_from_manifest( 'posts.js' ),
			'dependencies'		=> ['jquery', 'app-script'],
			'version'			=> null,
			'load_in_footer'	=> 'true',

		];

		wp_register_script( $script['handle'], $script['location'], $script['dependencies'], $script['version'], $script['load_in_footer'] );

		wp_enqueue_script( $script['handle'] );

	}



}
