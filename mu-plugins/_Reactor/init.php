<?php
/**
 * The plugin bootstrap file
 * @since 1.0.0
 * @package Reactor
 * 
 * Plugin Name: Reactor • Reactor
 * Plugin Description: The core of all Reactor custom functionality.
 * Author: Christopher Hahn - CreativeFuse
 * 
 * Version:           1.0.0
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 */

namespace Reactor;

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die( 'You cannot access this file!' );
}

class Reactor{

   /**
     * The one true instance of Reactor
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

        $this->config = require_once( __DIR__ . '/_config/config.php' );
        $this->init();

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
     * Init Reactor & Load All Files
     */
    private function init(){

        /**
         * Begin loading additional modules if our module framework exists
         */
        if( $this->config('files') ){

            foreach ( $this->config('files') as $file_path ){

                require_once( __DIR__ . '/src/' . $file_path . '.php' );

            }

        }

    }


}

/**
 * Instantiate & return the one true instance of our Reactor Reactor.
 * We never want to instantiate core twice!
 *
 * @return OBJECT $config
 * 
 */
function reactor(){

    return Reactor::get_instance();
    
}
reactor();