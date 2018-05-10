<?php
namespace CreativeFuse\Creatives;
use Reactor\Factory\ShortcodeFactory;

// Fire off registration
add_action( 'init', __NAMESPACE__ . '\register_shortcode');

function register_shortcode(){

	// Register new Shortcode
	$config = include_once( __DIR__ . '/config.php' );
	$homefeed = new ShortcodeFactory( $config );

}


// Processing Function
function process_shortcode(  $config, $attributes, $content, $shortcode_name ){

	// Start Output Buffer
	ob_start();
		

	return ob_get_clean();

}

/**
 * Render the final shortcode output & pass in all available variables
 * to the included partial file.
 * 
 * @param  [type] $stories        [description]
 * @param  [type] $config         [description]
 * @param  [type] $attributes     [description]
 * @param  [type] $content        [description]
 * @param  [type] $shortcode_name [description]
 */
function render_shortcode( $stories, $config, $attributes, $content, $shortcode_name ){
	
	include( $config[ 'view']  );

}