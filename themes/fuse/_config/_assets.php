<?php
namespace Fuse;

return [

    'assets' => [

        'src'   => get_theme_file_uri().'/resources/assets/',
        'prod'  => '/_dist'

    ],

    'jquery' => [

        'version'   => '1.12.4'

    ],

    'fonts' => [

    	'google_fonts' => [

			'Lato:300,400,700,900',
			'Source+Sans+Pro:400,700'

		],

		//No support yet for typekit...but soon!
		'typekit_id' => '',

    ],

    'svg' => [

    	'svg_dir'				=> get_theme_file_path() . '/_dist/svg/',
    	'svg_sprite'			=> get_theme_file_path() . '/_dist/svg/sprite.svg',

    ],

    'cachebust' => [

        'core_stylesheet' => file_exists( get_theme_file_path() . '/_dist/css/app.css' ) ? filemtime( get_theme_file_path() . '/_dist/css/app.css' ) : null,
        'core_js' => file_exists( get_theme_file_path() . '/_dist/js/app.bundle.js' ) ? filemtime( get_theme_file_path() . '/_dist/js/app.bundle.js' ) : null,

    ],
    
];
