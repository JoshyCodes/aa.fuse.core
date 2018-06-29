<?php
namespace Fuse\Layout\SinglePost;
use Fuse\Controllers;
use Fuse\AssetHandler;


// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on a normal page
	if( is_singular( 'post' ) ){

		add_action( 'fuse_header_content', __NAMESPACE__ . '\load_header' );
		add_action( 'fuse_before_content', __NAMESPACE__ . '\load_hero' );
		add_action('fuse_content', __NAMESPACE__ . '\add_container', 1);
		add_action( 'fuse_content', __NAMESPACE__ . '\load_content', 5);
		add_action('fuse_footer_content', __NAMESPACE__ . '\load_footer');
		add_action( 'wp_enqueue_scripts',	__NAMESPACE__ . '\load_posts_script', 1 );


	}

}

function load_header(){

	Controllers\render( 'fragments/zz-temp-blog/_tmp-o-header__inner');

}

function load_hero(){

	// We are outside of the loop so we have to get the author ID
	// and then use it to feth the name later
	global $post;
	$author_id = $post->post_author;

	$data = [

		'bg'		=> 'https://picsum.photos/1920/400',
		'title'		=> get_the_title(),
		'date'		=> get_the_date(),
		'author'	=> get_the_author_meta('display_name', $author_id)

	];

	Controllers\render( 'fragments/zz-temp-blog/_tmp-o-hero--single', $data );


	$data = [

		'summary' => get_the_excerpt()

	];

	Controllers\render( 'fragments/zz-temp-blog/_tmp-o-post__summary', $data);


}

function add_container(){

	echo '<div class="l-container l-container--max--xs l-container--width">';

}



function load_content(){

		Controllers\render( 'fragments/zz-temp-blog/_tmp-o-post' );

}

function load_footer(){

	Controllers\render( 'fragments/zz-temp-blog/_tmp-o-footer__inner' );

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
