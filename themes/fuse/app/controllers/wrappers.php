<?php
namespace Fuse\Controllers;
use Fuse;

//http://scribu.net/wordpress/theme-wrappers.html


function get_main_template() {
	return Wrapper::$main_template;
}

function get_template_base() {
	return Wrapper::$base;
}


add_filter( 'template_include', array( __NAMESPACE__ . '\Wrapper', 'wrap' ), 99 );

class Wrapper{

	/**
	 * Stores the full path to the main template file
	 */
	static $main_template;

	/**
	 * Stores the base name of the template file; e.g. 'page' for 'page.php' etc.
	 */
	static $base;


	static function wrap( $template ) {


		self::$main_template = $template;

		self::$base = substr( basename( self::$main_template ), 0, -4 );

		if ( 'index' == self::$base )
			self::$base = false;

		$templates = array( '/views/wrappers/' . 'wrapper.php' );


		if ( self::$base )
			array_unshift( $templates, sprintf( '/views/wrappers/' . 'wrapper-%s.php', self::$base ) );

		return locate_template( $templates );
	}
}

