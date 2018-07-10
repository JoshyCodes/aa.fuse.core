<?php
namespace Fuse\Layout\Apply;
use Fuse\Controllers;
use Reactor\Optimize;




// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on a normal page
	if( is_page( 'frontend-developer' ) ){

		add_action( 'fuse_hero', __NAMESPACE__ . '\load_hero' );
		add_action('fuse_before_loop', __NAMESPACE__ . '\add_container', 1);
		add_action('fuse_content', __NAMESPACE__ . '\load_content');
		add_action('fuse_footer_content', __NAMESPACE__ . '\load_footer');


	}

}


function load_hero(){

	$data = [

		'title'		=> 'Frontend Developer Position',
		'sub'		=> 'Build beautiful things with and for beautiful people.',

	];

	Controllers\render( 'fragments/zz-temp-apply/_tmp-o-hero--apply', $data );

}

function add_container(){

	echo '<div class="l-container l-container--max--s l-container--width">';

}

function load_content(){

	Controllers\render( 'fragments/zz-temp-apply/_tmp-o-post--apply' );

}