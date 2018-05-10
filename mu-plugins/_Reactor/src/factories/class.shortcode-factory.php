<?php

/**
 * Reactor Module Abstract CLass
 *
 * @package         Reactor
 * @author          CreativeFuse
 * @license         GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name:     
 * Description:     
 *
 * Version:         1.0.0
 * Author:          CreativeFuse
 * Text Domain:     ipp
 * Requires WP:     4.8
 * Requires PHP:    7.1.4
 */

namespace Reactor\Factory;

class ShortcodeFactory{

	/**
	 * Runtime Configuration parameters
	 *
	 * @var The configuration file for the shortcode
	 */
	public static $config = [];

	public static $attributes = [];


	public function __construct( $config ){

		$this->register( $config );

	}

	/**
	 * Register the shortcode's config file
	 */

	protected function register( $config ){

		// Set our shortcode defaults
		$config = array_merge(

			array(
				'shortcode_name'              => '',
				'do_shortcode_within_content' => true,
				'processing_function'         => null,
				'view'                        => '',
				'defaults'                    => array(),
			),

			$config

		);

		$this->store_config( $config['shortcode_name'], $config );
		$this->add_shortcode( $config['shortcode_name'] );

	}

	public function store_config( $shortcode_name, $config ){

		// Store the settings for this shortcode in our shortcode config by name
		$this->config[ $shortcode_name ] = $config;

	}


	public function add_shortcode( $shortcode_name ){

		if ( ! $this->get_config( $shortcode_name ) ) {

			return false;

		}

		\add_shortcode( $this->get_config( $shortcode_name, 'shortcode_name' ), array( $this, 'process_shortcode_callback' ) );


	}

	public function store_atts( $attributes ){

		// Store the settings for this shortcode in our shortcode config by name
		$this->atts = $attributes;

	}

	public function process_shortcode_callback( $instance_args, $content, $shortcode_name ){

		

		$config = $this->get_config( $shortcode_name );

		// Set shortcode attributes
		$attributes = shortcode_atts(

			$config['defaults'],
			$instance_args,
			$shortcode_name

		);
		
		if ( $content && $config['do_shortcode_within_content'] ) {

			$content = \do_shortcode( $content );

		}


		if ( ! $config['processing_function'] ) {

			return "No shortcode process function defined for " . $shortcode_name . ".";

		}

		$function_name = $config['processing_function'];

		return $function_name( $config, $attributes, $content, $shortcode_name );

	}


	/**
	 * Get the config file or a value from the config
	 */
	public function get_config( $key = '', $value = '' ){

	    // If we are passing in a key, let's get the value
	    if( $key && ! $value){

	        return $this->config[ $key ];

	    }

	    // Let's handle getting nested values
	    if( $key && $value){

	        return $this->config[ $key ][ $value ];

	    }

	    // If no value is passed, let's just return
	    return $this->config;

	}


}
