<?php
namespace CreativeFuse\Creatives;

return [

	'taxonomy' => [

		/**
		 * Group Taxonomy
		 */
		'interests' => [

			'names' => [

				'name' 		=> 'insterests',
			    'singular' 	=> 'Interest',
			    'plural' 	=> 'Interests',
			    'slug' 		=> 'interest',

			],

			'options' => [

				'hierarchical'		=> true,
				'query_var'			=> true,
				'show_admin_column'	=> true,
				'show_ui'				=> true,
				'has_archive'			=> false,

			],

			'labels' => [

				'edit_item'			=>  'Edit Interest',
				'add_new_item'		=>  'Add New Interest',
				'new_item_name'		=>  'New Interest',

			],

			'filters' => [


			],

			'columns' => [



			]

		]
		
	]

];