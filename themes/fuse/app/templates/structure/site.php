<?php
namespace Fuse\Structure;
use Fuse\Controllers;
	

add_action( 'fuse_site_begin',	__NAMESPACE__ . '\open_site',	1 );
add_action( 'fuse_header',		__NAMESPACE__ . '\load_header',	1 );
add_action( 'fuse_footer',		__NAMESPACE__ . '\load_footer',	1 );
add_action( 'fuse_site_end',	__NAMESPACE__ . '\close_site',	1 );


function open_site(){

	Controllers\render( 'structure/head' );

}

function load_header(){

	Controllers\render( 'structure/header' );

}

function load_footer(){

	Controllers\render( 'structure/footer' );

}

function close_site(){

	Controllers\render( 'structure/site-end' );

}
