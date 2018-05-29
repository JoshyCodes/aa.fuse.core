<?php
/**
 * The main config file where we define the 
 * settings for our GTM module.
 *
 * @package CFi\Module\GTM
 * @author CreativeFuse
 */

namespace CFi\Module\GTM;

return array(


	'container'	=> array(

		'id' => 'GTM-MF5S62V'

	),

	'supported_hooks' => array(

		'x' 		=> 'x_before_site_begin',
		'jupiter' 	=> 'theme_after_body_tag_start'

	),

	'custom_hook'	=> 'molecule_after_body_begin',


);