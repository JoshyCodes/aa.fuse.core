<?php

namespace Reactor\Helpers;


/**
 * Output either the URL or ALT of a post's featured image or an ACF image
 *
 * @param  string $source   The source of the iamge ( accepts 'post', 'acf', 'acf_sub', or 'acf_options')
 * @param  string $type     The type of data we are requesting ( accepts 'url' or 'alt' )
 * @param  string $id       ID of the Image ( blank for post, or enter the acf field id )
 * @param  string $size     Size of the image to be requested ( default = full )
 *
 * @return string           Either the URL or alt of the image, both appropriately sanatized.
 * @access	public 
 * 
 * @since 1.0.0
 */
function get_img_meta( $post, $source, $type, $id = '' , $term = null, $size = 'full'){

	// declare $post global if used outside of the loop


	if( ! $post ){
		global $post;
	}

	//Set a blank Value to prevent errors
	$value = '';

	// If we are getting an image from ACF and if the field we need
	// actually has data.
	if( $source == 'acf' && get_field( $id, $term ) ){

		//If we are getting the URL of an ACF Image
		if( $type == 'url'){
			$value = get_field( $id, $term );
			$value = esc_url( $value['url'] );
		}

		// If we are getting the alt attribute of an ACF Image
		if( $type == 'alt' ){
			$value = get_field( $id, $term );
			$value = esc_html( $value['alt'] );
		}

	}

	if( $source == 'acf_sub' && get_sub_field( $id ) ){

		//If we are getting the URL of an ACF Image
		if( $type == 'url'){
			$value = get_sub_field( $id );
			$value = esc_url( $value['url'] );
		}

		// If we are getting the alt attribute of an ACF Image
		if( $type == 'alt' ){
			$value = get_sub_field( $id );
			$value = esc_html( $value['alt'] );
		}

	}

	if( $source == 'acf_options' && get_field( $id, 'options' ) ){

		//If we are getting the URL of an ACF Image
		if( $type == 'url'){
			$value = get_field( $id, 'options');
			$value = esc_url( $value['url'] );
		}

		// If we are getting the alt attribute of an ACF Image
		if( $type == 'alt' ){
			$value = get_field( $id, 'options' );
			$value = esc_html( $value['alt'] );
		}

	}


	// If we are getting the Featured Image from a WP Post
	if( $source == 'post' ){

		// check to see if the theme supports Featured Images, and one is set
		if (current_theme_supports( 'post-thumbnails' ) && has_post_thumbnail( $post->ID )) {

			// Get the image ID
			$img_id = get_post_thumbnail_id( $post->ID );

			// If we are getting the URL
			if( $type == 'url' ){

				$featured_image = wp_get_attachment_image_src( $img_id , $size );

				// this returns just the URL of the image
				$value = $featured_image[0];
				$value = esc_url( $value );

			}

			// If we are getting the Alt Tag
			if( $type == 'alt' ){

				$value = get_post_meta( $img_id, '_wp_attachment_image_alt', true);
				$value = esc_html( $value );
			}
		}
	}

	return $value;

}