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

abstract class ModuleFactory{

	/**
	 * Runtime Configuration parameters
	 *
	 * @var The configuration file for a module
	 */
	public $config;


	/**
	 * 
	 * @var
	 */
	public $name;

	/**
	 * 
	 */
	public $version;

	/**
	 *
	 * @var
	 */
	public $description;

	/**
	 * Addon plugin file.
	 *
	 * @var string
	 */
	public $module_dir;

	/**
	 *
	 * @var array
	 */
	public $module_url;



	/**
	 * Register the module
	 */

	protected function register( $config, $module_dir, $module_url ){

			$this->config 		= $config;
			$this->module_dir	= $module_dir;
			$this->module_url 	= $module_url;

			$this->name 		= $this->config( 'settings', 'name' );
			$this->version		= $this->config( 'settings', 'version' );
			$this->description	= $this->config( 'settings', 'description' );

			$this->autoload( $this->config( 'files' ) );

	}


	/**
	 * Load all files defined in the module config
	 */
	private function autoload( $files ){	

		if( $files ){

			foreach ( $files AS $file ){

				include( $this->get_dir() . '/' . $file );


			}

		}

	}


	/**
	 * Get the config file or a value from the config
	 */
	public function config( $key = '', $value = '' ){

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

	/**
	 * Get the Module Directory
	 * @return [type] [description]
	 */
	public function get_dir(){

		return $this->module_dir;

	}

	/**
	 * Get the Module URL
	 * @return [type] [description]
	 */
	public function get_url(){

		return $this->module_url;

	}


}
