<?php
/**
 * GTM's Main Class
 *
 * @since  1.0.0
 * @package CFi\Module\GTM
 * @author CreativeFuse
 * 
 * The main class responsible for loading the config file and instantiating GTM.
 *
 */

namespace CFi\Module\GTM;

class GTM{

	/**
	 * The location of the config file
	 *
	 * @var  string
	 * @since 1.0.0
	 */
	private $config_file_location;

	/**
	 * An Array of all of the modules
	 * to load and instantiate
	 */
	private $config;

	/**
	 * Supported theme hooks
	 * @since 1.1.0
	 */
	 public $supported_theme_hooks;

	/**
	 * The current theme
	 * @since 1.1.0
	 */
	private $current_theme_name;

	/**
	 * The custom hook you will use to
	 * load tag maanger if none of the
	 * theme conditions match. If custom hook
	 * is used, then the developer, must add the
	 * appropriate do_action hook right after the
	 * opening body tag in the child theme files
	 *
	 * @since 1.1.0
	 *
	 */
	 private $custom_hook;

    /**
	 * The actual hook to be used to load
	 * Google Tag Manager
	 * @since 1.1.0
	 */
	 private $gtm_body_hook;


	 public function run(){

	 	// Load our config
	 	$this->load_config();

	 	/**
		 * Setup Methods
		 */
		add_action( 'init', array( $this, 'register_supported_theme_hooks'), 1);
		add_action( 'init', array( $this, 'set_current_theme_name'), 1);
		add_action( 'init', array( $this, 'set_custom_hook'), 1);
		add_action( 'init', array( $this, 'set_gtm_body_hook'), 1);
		
		/**
		 * The main function that dynamically loads the GTM Scripts
		 * into the appropriate spots
		 *
		 */
		add_action( 'init', array( $this, 'load_gtm' ), 2 );


	 }


	/**
	 * Load our config file
	 *
	 * @since  1.0.0
	 */

	private function load_config(){


		// Define our config file path
		$this->config_file_location = dirname(__DIR__ ) . '/config/module.php';

		// Build our config array if the config file exists

		if( file_exists( $this->config_file_location ) ){

			$this->config = require_once( $this->config_file_location );

		}


	}

	/**
	 * Return our config file with or without
	 * a parameter passed.
	 *
	 * @since 1.0.0
	 * @return string $key the key to use for the key => value pair in the array
	 * 
	 */
	private function get_config( $key = '' ){

		// Locally define our config file
		$_config = $this->config;


		// If we have a key, let's use it to get a value
		if( $key ){
			
			$_config = $this->config[ $key ];

		} 
		
		return $_config;

	}

	/**
	 * Set the array of supported themes
	 * and their corresponding body hooks
	 * to be used to load Google Tag Manager
	 *
	 *****************************
	 *
	 * 		CURRENLTY SUPPORTED THEMES
	 *
	 * 		X Theme
	 *		Jupiter 5
	 *		Custom Themes
	 *
	 ******************************
	 *
	 * You can easily add support for your theme
	 * by adding it to the array of registerd theme hooks in the config file
	 * just make sure to use an all-lowercase name for your theme,
	 * as the theme name that is dynamically returned will always,
	 * be lowercase.
	 *
	 */

	public function register_supported_theme_hooks(){

		$this->supported_theme_hooks = $this->get_config( 'supported_hooks' );

	}

	/**
	 * Return the array of supported themes
	 * and theme hooks
	 */
	private function get_supported_theme_hook_array(){

		return $this->supported_theme_hooks;

	}

	/**
	 * Set the name of the current theme
	 */
	public function set_current_theme_name(){

		$this->current_theme_name = wp_get_theme();
		$this->current_theme_name = strtolower( $this->current_theme_name['Template'] );

	}

	/**
	 * Return the name of the current theme
	 *
	 */
	public function  get_current_theme_name(){
		return $this->current_theme_name;
	}

	/**
	 * Set the custom hook if needed
	 */
	public function set_custom_hook(){

		if( $this->get_config( 'custom_hook' ) != null ){

			$this->custom_hook = $this->get_config( 'custom_hook' );

		}

	}


	/** Set the actual hook to be used to load
	 * Google Tag Manager right after the
	 * opening body tag.
	 *
	 */
	public function set_gtm_body_hook(){
		/**
		 * If the current theme name is in our array of supported themes,
		 * then set the gtm_body_hook equal to the supported themes hook.
		 *
		 */
		if( array_key_exists( $this->get_current_theme_name(), $this->supported_theme_hooks ) ){

			$this->gtm_body_hook = $this->supported_theme_hooks[ $this->get_current_theme_name() ];

		} else {
			
			/**
			 * If the current theme is not supported,
			 * then we will use the custom hook as defined in the config
			 * @note - dev must create corresponding do_action( 'custom_hook_name' );
			 */

			$this->gtm_body_hook = $this->custom_hook;
		}

	}

	/**
	 * Return the hook to be uses to load GTM
	 *
	 */

	public function get_gtm_body_hook(){
		return $this->gtm_body_hook;
	}

	/**
	*  Loads the first part of Google Tag Manager in the Head as per docs and then
	*  dynamically loads the seconds part in the body as per docs.
	* @Uses wp_head
	* @uses the return of get_gtm_body_hook() to load the body script
	* @note this action needs to be called right after the opening body tag
	*  as required by google tag manager
	* @since 1.1.0
	*/
	public function load_gtm(){

		// Only load GTM of the user is not logged in AND
		// we are not on any admin pages
		if( ! \is_user_logged_in() && ! \is_admin() ){

			if( $this->get_config( 'container' )['id'] ){

				add_action( 'wp_head', array( $this, 'load_gtm_head' ), 1 );
				add_action( $this->get_gtm_body_hook(), array( $this, 'load_gtm_body' ), 1 );

			}

		}

	}

	public function load_gtm_head(){

		$script_file = include_once ( dirname(__DIR__ ) . '/assets/scripts/gtm-head.php' );
		$script = str_replace( '{{container_id}}', $this->get_config('container')['id'], $script_file );

		echo $script;

	}

	public function load_gtm_body(){


		$script_file = include_once ( dirname(__DIR__ ) . '/assets/scripts/gtm-body.php' );
		$script = str_replace( '{{container_id}}', $this->get_config('container')['id'], $script_file );

		echo $script;

	}



}


/**
 * Instantiate our one true instance of GTM
 *
 * We can use this function to retrieve the main instance of 
 * GTM after it has been instantiated. It will NEVER 
 * instantiate 2 instances of GTM. This can be useful for
 * getting data from a GTM property without having to decalre
 * a global and see if $gtm is already set each time.
 *
 * @since  1.0.0
 * 
 */

function gtm(){

	global $gtm;

	if( ! isset( $gtm ) ){

		$gtm = new GTM;
		$gtm->run();

	}

	return $gtm;
}

gtm();


