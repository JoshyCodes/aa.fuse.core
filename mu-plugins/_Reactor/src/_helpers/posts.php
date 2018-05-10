<?php

namespace Reactor\Helpers;

/**
 * Get a usable version of the Current Post Type from the post object
 *
 * @access public
 * @return		string 		lower case name of post type with space separated by hyphens
 * 
 * @since  1.0.0
 */
function post_type_name( $echo = true ){

	// usable outside of the loop
	global $post;

	$current_post_type = $post->post_type;

	$replace = '_';

	$with = '-';

	// Replace underscores with hyphens
	$post_type_name = str_replace( $replace, $with, $current_post_type );

	// sanitize
	$post_type_name = esc_attr( $post_type_name );

	if( $echo == true ){

		echo $post_type_name;

	} else {

		return $post_type_name;

	}
		
}

/**
 * Get a usable version of the Current Term Name from the post object
 *
 * @access public
 * @return		string 		lower case name of post type with space separated by hyphens
 * 
 * @since  1.0.0
 */
function term_name( $echo = true ){

	// useable outside of the loop
	global $post;

	$term = get_term_by( 'slug', get_query_var( 'term' ), get_query_var( 'taxonomy' ) );

	// Replace underscores with hyphens
	$term = $term->slug;

	// sanitize
	$term = esc_attr( $term );

	if( $echo == true ){

		echo $term;

	} else {

		return $term;

	}

}