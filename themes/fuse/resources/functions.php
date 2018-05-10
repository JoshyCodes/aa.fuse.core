<?php
namespace Fuse;

//http://scribu.net/wordpress/theme-wrappers.html
	
/**
 * Here's what's happening with these hooks:
 * 1. WordPress initially detects theme in themes/sage/resources
 * 2. Upon activation, we tell WordPress that the theme is actually in themes/sage/resources/views
 * 3. When we call get_template_directory() or get_template_directory_uri(), we point it back to themes/sage/resources
 *
 * We do this so that the Template Hierarchy will look in themes/sage/resources/views for core WordPress themes
 * But functions.php, style.css, and index.php are all still located in themes/sage/resources
 *
 * This is not compatible with the WordPress Customizer theme preview prior to theme activation
 *
 * get_template_directory()   -> /srv/www/example.com/current/web/app/themes/sage/resources
 * get_stylesheet_directory() -> /srv/www/example.com/current/web/app/themes/sage/resources
 * locate_template()
 * ├── STYLESHEETPATH         -> /srv/www/example.com/current/web/app/themes/sage/resources/views
 * └── TEMPLATEPATH           -> /srv/www/example.com/current/web/app/themes/sage/resources
 */

final class Fuse{

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
     * Main Theme Folder
     */

    public $theme_root;


	 /**
     * Instantiation can be done only inside the class itself
     */
	protected function __construct() {

		$this->set_theme_root();

        // Must load config in before theme root defined
        $this->config = include_once dirname(__FILE__, 2) .'/_config/config.php';

		$this->load_dependencies();

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
     * Tell WP to look in this directory for anything theme related, but look in the root of our project
     * otherwise.
     * @param [type] $path [description]
     */
    private function set_theme_root(){

        $this->theme_root = dirname( __FILE__ );

        array_map(
            'add_filter',
            ['theme_file_path', 'theme_file_uri', 'parent_theme_file_path', 'parent_theme_file_uri'],
            array_fill(0, 4, 'dirname')
        );

    }


    /**
     * Get the config file or a value from the config
     */
    public function config( $key = null, $value = null ){

        // If we are passing in a key, let's get the value
        if( $key && ! $value){

            return $this->config[ $key ];

        }

        // Let's handle getting nested values
        if( $key && $value){

            return $this->config[ $key ][ $value ];

        }

        // If no value is passed, let's just return the config object
        return $this->config;

    }
        

    /**
     * Get the theme root
     */
    public function get_theme_root(){


        return $this->theme_root;

    }

    private function load_dependencies(){

        $dependencies = $this->config( 'files' );

        foreach ( $dependencies as $file ){

            include_once get_theme_file_path() . '/app/' . $file . '.php';

        }

    }


}

/**
 * Instantiate & return the one true instance of our Fuse Theme.
 * We never want to instantiate Fuse twice!
 *
 * @return OBJECT Fuse();
 * 
 */
function fuse(){

	return Fuse::get_instance();

}

fuse();