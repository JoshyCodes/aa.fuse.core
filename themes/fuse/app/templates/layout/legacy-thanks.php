<?php
namespace Fuse\Layout\LegacyThanks;
use Fuse\Controllers;

// Fire our setup once we have all  Wordpress data
add_action( 'wp', __NAMESPACE__ . '\setup');

function setup(){

	// If we are on our splash page
	if( is_page_template( 'template-legacy-thanks.php' ) ){

		add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\load_legacy_fonts', 1 );

		add_action( 'wp_head', __NAMESPACE__ . '\load_legacy_typekit', 1);

		add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\load_legacy_splash_assets', 999 );

		add_action( 'fuse_content', __NAMESPACE__ . '\load_legacy_thanks_wrapper' );

		/**
		 * Remove the main site scripts & styles
		 */

		remove_action( 'wp_head', 'Fuse\Structure\inject_critical_scripts_and_styles', 1);
		remove_action( 'fuse_after_body_open', 'Fuse\Structure\load_svg_sprite', 1);
		remove_action( 'wp_enqueue_scripts', 'Fuse\Structure\load_core_app_styles', 999999999 );
		remove_action( 'wp_enqueue_scripts', 'Fuse\Structure\load_core_app_script', 1 );

	}

	function load_legacy_thanks_wrapper(){

		Controllers\render( 'fragments/zz-legacy/_thank-you' );

	}


	function load_legacy_splash_assets(){

		wp_enqueue_style( 'legacy-splash', get_theme_file_uri() . '/_legacy-dist/legacy-splash.css' );
		wp_enqueue_script( 'legacy-splash-scripts', get_theme_file_uri() . '/_legacy-dist/legacy-splash.bundle.js', 'jquery', '1.0.0', true );


	}


		/**
		 * Load all of the fonts for our site when we are not on admin pages
		 *
		 * THIS IS LEGACY ONLY AND IT IS TERRIBLE!!
		 * DO NOT USE THIS ANYWHERE ELSE AND FOR THE LOVE OF
		 * GOD DELETE IT FOREVER WHEN WE ARE DONE WITH THIS SPLASH PAGE
		 */

		function build_google_font_request(){


			// Build our array of font families and weights to enqueue

			$font_families = array(

				'Nunito' => [

					'regular',
					'semi-bold',
					'semi-bold-italic'


				]

			);


			// Set font weight definitions

			$weight_definitions = array(

				'thin' 				=> '100',
				'extra-light'		=> '200',
				'light'				=> '300',
				'regular'			=> '400',
				'medium'			=> '500',
				'semi-bold' 		=> '600',
				'semi-bold-italic' 	=> '600i',
				'bold' 				=> '700',
				'extra-bold'		=> '800',
				'black'				=> '900',

			);


			// Set Method Variables

			$family_prefix 	= '|';
			$family_sep		= ':';
			$weight_sep		= ',';

			// Initiate the blank variables used to build our string

			$weights_array	= [];
			$fonts 			= '';
			$count			= '1';


			// Loop through all font families in our Font Family Array
			foreach( $font_families as $family => $weights ){

				//For each family, loop through the font weights
				foreach( $weights as $weight  ){

					// If the defined weight exists in our definitions array
					if( array_key_exists( $weight, $weight_definitions ) ){

						// Add the current weight value definition to
						// our weights array
						$weights_array[] = $weight_definitions[ $weight ];

					}

				}


				// After we loop through all of the weights in the
				// given family implode our font weights for that family
				$font_weights = implode( $weight_sep, $weights_array );

				// Unset our array at the end of each loop or
				// else new eieghts will be appended to the old!
				// We don't want that!

				unset( $weights_array );


	  			// Only add the separator before the family name
	  			// if we are PAST the first iteration

	  			if( $count > 1 ){

					// Add our family prefix element
					$family = $family_prefix . $family;

				}


				// Build our string on each pass
				$fonts .= $family . $family_sep . $font_weights;

				// Add to our iteration count
				$count ++;

			}


			// | is an illegal HTML character and must be escaped

			$with = '%7C';
			$fonts = str_replace( $family_prefix, $with, $fonts );

			//	Build our final font argument array to get passed to
			//	our google font request

			$font_args = array( 'family' => $fonts );

			// Return our font argument
			return $font_args;

		}


		/**
		 * Load all of the fonts for our site when we are not on admin pages
		 *
		 * @since  1.0.0
		 */

		/**
		 *
		 * THIS IS LEGACY ONLY AND IT IS TERRIBLE!!
		 * DO NOT USE THIS ANYWHERE ELSE AND FOR THE LOVE OF
		 * GOD DELETE IT FOREVER WHEN WE ARE DONE WITH THIS SPLASH PAGE
		 */

		function load_legacy_fonts(){

			$google_font_base = '//fonts.googleapis.com/css';

			// Register our final font request
			wp_register_style( 'legacy-splash-fonts', add_query_arg( build_google_font_request(), $google_font_base ), array(), null );

			// Load font if not in admin area
			if( ! is_admin() ){

				wp_enqueue_style( 'legacy-splash-fonts' );

			}

		}


		function load_legacy_typekit(){ ?>


			<!-- Load Adobe Typekit -->
			<script src="https://use.typekit.net/efu5ywp.js"></script>
			<script>try{Typekit.load({ async: true });}catch(e){}</script>

		<?php }


}
