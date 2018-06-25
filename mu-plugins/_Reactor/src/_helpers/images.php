<?php

namespace Reactor\Helpers;



/**
 * Output either the URL or ALT of a post's featured image or an ACF image
 *
 * @param  string $source   The source of the image ( accepts 'post', 'acf', 'acf_sub', or 'acf_options')
 * @param  string $type     The type of data we are requesting ( accepts 'url' or 'alt' )
 * @param  string $id       ID of the Image ( blank for post, or enter the acf field id )
 * @param  string $size     Size of the image to be requested ( default = full )
 *
 * @return string           Either the URL or alt of the image, both appropriately sanitized.
 * @access	public 
 * 
 * @since 1.0.0
 */

function get_img_meta( $image_request_settings ){

	/**
	 * Set our function defaults & merge with
	 * passed in $settings params
	 */

	$settings = array_merge(

		array(
			
			'source'		=> 'post',
			'type'   		=> '',
			'field_id'  	=> null, // Used for ACF requests
			'term'  		=> null,
			'size'			=> 'full',
			'fallback'		=> '', // Define a fallback image
			'show_falback'	=> false,
		),

		$image_request_settings

	);

	// Set up our variable that will hold our returned value
	$data = '';

	/**
	 * Depending on the source we are getting our data from,
	 * we will call different functions;
	 */
	switch( $settings['source'] ){

		case 'post':
			$data = get_post_img_meta( $settings );
			break;

		case 'acf':
			$data = get_acf_img_meta( $settings );
			break;

		case 'acf_sub':
			$data = get_acf_img_meta_from_subfield( $settings );
			break;

		case 'acf_options':
			$data = get_acf_img_meta_from_options( $settings );
			break;
	}

	return $data;

}

/**
 * Get Img Meta data from a posts featured image
 * @param  array  $settings [description]
 * @return [type]           [description]
 */
function get_post_img_meta( array $settings ){

	// access $post global if not defined (meaning  we are outside the loop)
	if( ! $post ){
		global $post;
	}

	// Set up variable to hold our data
	$data = '';

	// Bail if theme doesn't support or if there is no thumbnail
	if( ! current_theme_supports( 'post-thumbnails' ) && has_post_thumbnail( $post->ID ) )
		return $data;

	// Get the image ID
	$image_id = get_post_thumbnail_id( $post->ID );

	/**
	 * Get the URL
	 */
	if( $settings['type'] === 'url' ){

		$data = get_post_thumbnail_url( $image_id );

		return $data;

	}

	/**
	 * Get Alt Text
	 */
	if( $settings['type'] === 'alt' ){

		$data = get_post_thumb_alt( $image_id );

		return $data;

	}

	// If we get here, we have no data,
	// so return our initial value for $data
	return $data;

}

/**
 * Get an Image URL from an image based off of its ID
 */
function get_post_thumbnail_url( $image_id ) {

	// Get featured image object
	$featured_image = wp_get_attachment_image_src( $image_id , $settings['size'] );

	// Get just the URL of the image
	return esc_url( $featured_image[0] );

}

/**
 * Get an image Alt text from an image based off of its ID
 */
function get_post_thumb_alt( $image_id ){

	// Escape and Return Alt
	return esc_html( get_post_meta( $image_id, '_wp_attachment_image_alt', true) );

}

/**
 * Get Img Meta data from an ACF Field
 * @param  array  $settings [description]
 * @return [type]           [description]
 */
function get_acf_img_meta( array $settings ){

	// Variable to hold our data
	$data = '';

	// Bail if the field we are looking at has no data
	if( ! get_field( $settings['field_id'], $settings['term'] ) )
		return;

	//If we are getting the URL of an ACF Image
	if( $settings['type'] === 'url' ){

		$data	= get_field( $settings['field_id'], $settings['term'] );
		$data	= $data['url'];

		return esc_url( $data );
	}

	// If we are getting the alt attribute of an ACF Image
	if( $settings['type'] === 'alt' ){

		$data	= get_field( $settings['field_id'], $settings['term'] );
		$data 	= $data['alt'];

		// Return the data & bail
		return esc_html( $data );
	}

	// If we get here, we have no data,
	// so return our initial value for $data
	return $data;

}

/**
 * Get Img Meta data from an ACF Subfield
 * @param  array  $settings [description]
 * @return [type]           [description]
 */
function get_acf_img_meta_from_subfield( array $settings ){

	// Variable to hold our data
	$data = '';

	// Bail if the field we are looking at has no data
	if( ! get_sub_field( $settings['field_id'], $settings['term'] ) )
		return;

	//If we are getting the URL of an ACF Image
	if( $settings['type'] === 'url' ){

		$data	= get_sub_field( $settings['field_id'], 'options' );
		$data	= $data['url'];

		return esc_url( $data );
	}

	// If we are getting the alt attribute of an ACF Image
	if( $settings['type'] === 'alt' ){

		$data	= get_sub_field( $settings['field_id'], 'options' );
		$data 	= $data['alt'];

		// Return the data & bail
		return esc_html( $data );
	}

	// If we get here, we have no data,
	// so return our initial value for $data
	return $data;

}

/**
 * Get Img Meta data from an ACF Options Page Image
 * @param  array  $settings [description]
 * @return [type]           [description]
 */
function get_acf_img_meta_from_options( array $settings ){

	// Variable to hold our data
	$data = '';

	// Bail if the field we are looking at has no data
	if( ! get_field( $settings['field_id'], 'options' ) )
		return;

	//If we are getting the URL of an ACF Image
	if( $settings['type'] === 'url' ){

		$data	= get_field( $settings['field_id'], 'options' );
		$data	= $data['url'];

		return esc_url( $data );
	}

	// If we are getting the alt attribute of an ACF Image
	if( $settings['type'] === 'alt' ){

		$data	= get_field( $settings['field_id'], 'options' );
		$data 	= $data['alt'];

		// Return the data & bail
		return esc_html( $data );
	}

	// If we get here, we have no data,
	// so return our initial value for $data
	return $data;

}