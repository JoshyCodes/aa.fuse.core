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
function post_type_name(){

	// If we don't have access to our $post variable
	if( ! isset( $post ) ){

		// Set it (usable outside of the loop)
		global $post;

	}

	// Handle 404 pages
	if( is_404() ){

		return '404';

	}
	
	// Let's gran the current post type and handle it!
	$current_post_type = $post->post_type;

	$replace = '_';
	$with = '-';
	
	// Replace underscores with hyphens and return
	return esc_html( str_replace( $replace, $with, $current_post_type ) );
		
}

/**
 * Get a usable version of the Current Term Name from the post object
 *
 * @access public
 * @return		string 		lower case name of post type with space separated by hyphens
 * 
 * @since  1.0.0
 */
function term_name(){

	// If we don't have access to our $post variable
	if( ! isset( $post ) ){

		// Set it (usable outside of the loop)
		global $post;

	}

	$term = get_term_by( 'slug', get_query_var( 'term' ), get_query_var( 'taxonomy' ) );

	// Replace underscores with hyphens
	$term = $term->slug;

	// sanitize & return
	return esc_html( $term );

}