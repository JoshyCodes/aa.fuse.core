<?php
namespace Fuse\Layout\ArchivePost;
use Fuse\Controllers;
use Fuse\AssetHandler;
use Reactor\Helpers;


// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on our main blog archive page.
	if( is_home() ){

		add_action( 'fuse_header_content', __NAMESPACE__ . '\load_header' );
		add_action( 'fuse_hero', __NAMESPACE__ . '\load_hero' );
		add_action('fuse_before_loop', __NAMESPACE__ . '\add_container', 1);
		add_action('fuse_before_loop', __NAMESPACE__ . '\add_card_group', 2);
		add_action('fuse_content', __NAMESPACE__ . '\load_posts');
		add_action('fuse_footer_content', __NAMESPACE__ . '\load_footer');

	}


}

function load_header(){

	Controllers\render( 'fragments/zz-temp-blog/_tmp-o-header__inner');

}

function load_hero(){

	$data = [

		'bg'		=> 'https://picsum.photos/1920/400',
		'title'		=> 'An Awesome Title',
		'sub'		=> 'And an even more awesome sub title',

	];

	Controllers\render( 'fragments/zz-temp-blog/_tmp-o-hero--archive', $data );

}

function add_container(){

	echo '<div class="l-container l-container--max--l l-container--width">';

}

function add_card_group(){

	echo '<div class="tmp-o-group--cards">';

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

function load_footer(){

	Controllers\render( 'fragments/zz-temp-blog/_tmp-o-footer__inner' );

}
