<?php
namespace Fuse\Layout\ArchivePost;
use Fuse\Controllers;
use Fuse\AssetHandler;
use Reactor\Helpers;


// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on a normal page
	if( is_home() ){

		add_action('fuse_before_loop', __NAMESPACE__ . '\add_container', 1);
		add_action('fuse_before_loop', __NAMESPACE__ . '\add_card_group', 2);
		add_action('fuse_content', __NAMESPACE__ . '\load_posts');

	}


}

function add_container(){

	echo '<div class="l-container l-container--max--l l-container--width">';

}

function add_card_group(){

	echo '<div class="o-group--cards">';

}

function load_posts(){

	$data = [

		'bg'		=> Helpers\get_img_meta( ['type' => 'url'] ),
		'link'		=> get_the_permalink(),
		'title'		=> get_the_title(),
		'author'	=> get_the_author(),
		'date'		=> get_the_date(),
		'copy'		=> get_the_excerpt(),

	];

	Controllers\render( 'fragments/patterns/molecules/card/_primary', $data );

}
