<?php
namespace CreativeFuse\Creatives;
use PostTypes\Taxonomy;


/**
 * Get Config Settings
 */

$taxonomy_settings = module()->config( 'taxonomy' );

/**
 * Instantiate Our Group Taxonomy
 *
 * @since  1.0.0
 */
$interests = new Taxonomy(

	$taxonomy_settings['interests']['names'],
	$taxonomy_settings['interests']['options'],
	$taxonomy_settings['interests']['labels']

);



// Register Taxonomies
$interests->register();

