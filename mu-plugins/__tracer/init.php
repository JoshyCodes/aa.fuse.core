<?php
/**
 * Dev Tools
 *
 * @package     Tracer
 * @author      CreativeFuse
 * @license     GPL-2.0+
 *
 * @wordpress-plugin
 * Plugin Name: Tracer
 * Description: A nifty little suite of Wordpress Development & Debugging tools
 * Version:     1.0.0
 * Author:      CreativeFuse
 * Author URI:  https://creativefuse.org
 * License:     GPL-2.0+
 * License URI: http://www.gnu.org/licenses/gpl-2.0.txt
 */

namespace Tracer;


// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die( 'You cannot access this file!' );
}

final class Tracer{

	/**
	 * The one true instance of our theme
     * @var Fuse
     */
	private static $instance;

	/**
	 * Our Configuration Object
	 * @var array
	 */
	public $config = [];

	 /**
     * Instantiation can be done only inside the class itself
     */
	protected function __construct() {

		// Set our config file
		$this->config = include( __DIR__ . '/config/config.php' );

		// Fire up autoloader and load our dependencies
		require_once( dirname(__FILE__, 2 ) . '/__vendor/autoload.php' );

	}

	/**
	 * Cloning singleton is not possible.
	 *
	 * @throws Exception
	 */
	public function __clone(){

	    throw new Exception('You cannot clone singleton object');

	}

	protected function __wakeup() {

		throw new Exception('You cannot wakeup singleton object');

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
	     * 
	     *
	     * 
	     */
	    public static function get_instance(){

	        if (! isset(self::$instance) ) {

	            self::$instance = new self();

	        }

	        return self::$instance;

		}


}


/**
 * Instantiate & return the one true instance of Tracer.
 *
 * @return OBJECT Tracer();
 * 
 */
function tracer(){

	return Tracer::get_instance();
}

tracer();