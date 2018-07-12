<?php
namespace Fuse\Layout\ApplyThanks;
use Fuse\Controllers;
use Reactor\Optimize;




// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

    global $post;

	// If we are on a normal page
	if( is_page('thank-you') && $post->post_parent === 28 ){

        add_action('fuse_hero', __NAMESPACE__ . '\load_hero');
        add_action('fuse_content', __NAMESPACE__ . '\add_container');
        add_action('fuse_content', __NAMESPACE__ . '\load_content');


	}

}


function load_hero(){

	$data = [

		'title'		=> 'Thank You for Applying!',
		'sub'		=> 'Your Application Has Been Received',

	];

	Controllers\render( 'fragments/zz-temp-apply/_tmp-o-hero--apply', $data );

}

function add_container(){

	echo '<div class="l-container l-container--max--xs l-container--width">';

}

function load_content(){

	the_content();

}