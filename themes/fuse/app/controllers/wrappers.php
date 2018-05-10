<?php
namespace Fuse\Controllers;
use Fuse;

//http://scribu.net/wordpress/theme-wrappers.html


function get_main_template(){
	return Wrapper::$main_template;
}

function get_template_base() {
	return Wrapper::$base;
}

function get_template() {
	return Wrapper::$new_template_path;
}

add_filter( 'template_include', array( __NAMESPACE__ . '\Wrapper', 'wrap' ), 99 );

class Wrapper {
	/**
	 * Stores the full path to the main template file
	 */
	static $main_template;

	/**
	 * Stores the base name of the template file; e.g. 'page' for 'page.php' etc.
	 */
	static $base;

	/**
	 * Stores the path to our new, final template file
	 * @var [type]
	 */
	static $new_template_path;


	public function define_new_template_path(){

		$main_template		= self::get_main_template();
		$template_base 		= self::get_template_base();
		$new_template_root	= Fuse\fuse()->get_config( 'paths', 'template_root' );

		self::$new_template_path = str_replace( $template_base,  $new_template_root . $base, $main_template );

	}

	static function wrap( $template ) {

		self::$main_template = $template;

		self::$base = substr( basename( self::$main_template ), 0, -4 );

		if ( 'index' == self::$base )
			self::$base = false;

		$templates = array( Fuse\fuse()->get_config( 'paths', 'wrapper_root' ) . 'wrapper.php' );

		if ( self::$base )
			array_unshift( $templates, sprintf( Fuse\fuse()->get_config( 'paths', 'wrapper_root' ) . 'wrapper-%s.php', self::$base ) );

		return locate_template( $templates );
	}
}