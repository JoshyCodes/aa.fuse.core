<?php

namespace Reactor\Helpers;

/**
 * Build a function to handle the output of svg icons across the site
 *
 * This integrates tightly with our GULP build process for SVG Icons
 *
 * @access public
 *
 * @param string $location the location of the SVG file we need to get.
 * @param string $name the name of the icon
 * @param string $class a custom class entered by the user
 * @param string $type sprite or single ( are we getting an svg from our spritesheet or laoding a single svg? )
 *
 * @since 1.1.0
 */
function svg( $location, $name, $title, $class = '', $type = 'sprite'){

    // If we are using our SVG Sprite
    if(  $type == 'sprite' ){

    	// A custom class
        if( $class ){

            $class = 'c-svg-icon--' . $class;

        }

        $svg = '<svg class="c-svg-icon c-svg-icon--'.$name.' '.esc_attr( $class ).'" xmlns=http://www.w3.org/2000/svg role="img" >';
        	$svg .= '<title>'.esc_html( $title ).'</title>';
           	$svg .= '<use xlink:href="'. $location . '#' . $name .'"></use>';
        $svg .= '</svg>';

	} else {

		$svg = file_get_contents( $location . $name . '.svg' );

	}

    return $svg;

}