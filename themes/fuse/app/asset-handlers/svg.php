<?php
namespace Fuse\AssetHandler;
use Reactor\Helpers;
use enshrined\svgSanitize\Sanitizer; // From _Reactor

/**
 * Inject our SVG sprite into our web page!
 *
 * @return void
 */
function inject_svg_sprite(){

	//  Check to see if our sprite exists & set it
	//  if it does
	$sprite = file_exists( get_asset_from_manifest('sprite.svg', false) ) ?? null;

	// Bail if it doesn't
	if( ! $sprite )
		return;

		// Create a new sanitizer instance
		$sanitizer = new Sanitizer(); ?>

		<!-- SVG Sprite Definitions -->
		<div class="fuse--sprite-defs" style="display:none;">
			<?php
				// Return a sanitized SVG Sprite
				$sanitizer->sanitize( include get_asset_from_manifest('sprite.svg', false) );
			?>
		</div>

<?php }


/**
 * Get an SVG via either local reference
 * or from a file
 *
 * @param array $svg_request_settings
 * @return void
 */
function get_svg( array $svg_request_settings ){

    /**
	 * Set our function defaults & merge with
	 * passed in $settings params
	 */

	$settings = array_merge(

		array(

			'type'   		=> 'sprite',
			'name'  		=> '',
			'class'  	    => '',
            'title'			=> '',
            'location'      => \Fuse\fuse()->config( 'svg_dir' ),

		),

		$svg_request_settings

	);

    if( $settings['type'] === 'sprite' ){

        return render_svg_from_sprite( $settings['name'], $settings['title'], $settings['class'] );

    } else {

        return render_svg_from_file( $settings['name'], $settings['location'] );

    }


}

/**
 * Render an SVG from our sprite file
 *
 * @param [type] $name
 * @param [type] $title
 * @param [type] $class
 * @return void
 */
function render_svg_from_sprite( $name, $title, $class ){

	$svg = '';
	$svg .= '<svg class="c-svg-icon c-svg-icon--'. $name .' '. $class .'" xmlns=http://www.w3.org/2000/svg role="img" >';
		$svg .= '<title>'.$title.'</title>';
		$svg .= '<use xlink:href="#' . $name .'"></use>';
	$svg .= '</svg>';

	return $svg;

}

/**
 * Render an SVG from a file
 *
 * @param [type] $name
 * @param [type] $location
 * @return void
 */
function render_svg_from_file( $name, $location ){

	// Create a new sanitizer instance
	$sanitizer = new Sanitizer();

	// Return our sanitized SVG
    return $sanitizer->sanitize( file_get_contents( $location . $name . '.svg' ) );

}