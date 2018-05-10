<?php
namespace CreativeFuse\Creatives;
use PostTypes\PostType;

/**
 * Get Config Settings
 */
$post_type_settings = module()->config( 'post_type' );
$taxonomy_settings = module()->config( 'taxonomy' );

/**
 * Instantiate Our Shows Post Type
 *
 * @since  1.0.0
 */
$creatives = new PostType(

	$post_type_settings['names'],
	$post_type_settings['options'],
	$post_type_settings['labels']

);

// Register Post Type
$creatives->register();

/**
 * Give Post Type Our Taxonomies
 */
$creatives->taxonomy( $taxonomy_settings['insterest']['names']['name'] );

/**
 * Set Up Filters for our post type
 */
$creatives->filters( $post_type_settings['filters'] );


/**
 * Set Post Type Icon
 */

$creatives->icon('dashicons-id-alt');