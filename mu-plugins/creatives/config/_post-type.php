<?php
namespace CreativeFuse\Creatives;

return [

	/**
	 * Register Our Creatives Custom Post Type
	 */

	'post_type' => [

		'names' => [

			'name' 		=> 'creatives',
		    'singular' 	=> 'Creative',
		    'plural' 	=> 'Creatives',
		    'slug' 		=> 'creative'

		],

		'options' => [

			'public' => true,
			'publicly_queryable' => true,
			'menu_position' => 10,
			'show_ui' => true,
			'query_var' => true,
			'hierarchical' => true,
			'has_archive' => false,
			'capability_type' => 'post',

			'supports'  => [

				'title',
				'editor',
				'thumbnail',
				'excerpt',
				'page-attributes'
			],

			'rewrite'	=> [

		 		'slug' 			=> 'creative',
			 	'with_front'	=> false

			 ],

		],

		'labels' => [

			'edit_item'	  => 'Edit Creative',
			'add_new_item' => 'Add a New Creative',
			'new_item_name'  => 'New Creative Name',

		],

		'filters' => [
			'interests'
		]


	]

];