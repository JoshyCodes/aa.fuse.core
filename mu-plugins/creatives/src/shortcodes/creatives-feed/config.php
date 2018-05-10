<?php
/**
 * Sponsors Shortcode Config
 *
 * @package     Playground\Module\Sponsors;
 * @since       0.0.1
 * @author      nvwd
 * @license     GNU-2.0+
 */

namespace CreativeFuse\Creatives;
use CreativeFuse\Creatives;;

return array(

	'shortcode_name'              => 'creatives_feed',

	'do_shortcode_within_content' => true,

	'processing_function'         => __NAMESPACE__ . '\process_shortcode',

	'view'				=> Stories\module()->config( 'views' ) . 'creatives-feed.php',

	'defaults'                    => array(
		
		'count'			=> 1,
		'interests'			=> '',

	),


);