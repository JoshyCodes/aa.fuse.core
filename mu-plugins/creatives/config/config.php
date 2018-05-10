<?php
namespace CreativeFuse\Creatives;


// Merge all config files into a single config object
// to be loaded into our theme
return array_merge(

	[

		'settings' => [

			'name'			=>	'creatives',
			'version'		=>	'1.0.0',
			'description'	=>	'Handles all creatives related functionality',

		],

		// Files to be autoloaded
		'files'	=> [

			// Custom Post Types
			'src/custom/taxonomy.php',
			'src/custom/post-type.php',

			// Shortcodes
			'src/shortcodes/creatives-feed/shortcode.php'

		],

		// Our Views directory for Shortcodes
		'views' => dirname( __FILE__, 2 ) . '/src/views/',

		// Our Views directory for Shortcodes
		'templates' => dirname( __FILE__, 2 ) . '/src/templates/'

	],

	include_once( __DIR__ . '/_post-type.php' ),
	include_once( __DIR__ . '/_taxonomy.php' ),
	include_once( __DIR__ . '/_assets.php' )
	
);