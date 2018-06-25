<?php
namespace Fuse;

return [

    'assets' => [

    	'manifest'	=> get_theme_file_path() . '/_dist/manifest.json',
        'prod_path' => get_theme_file_path() . '/_dist/',
        'prod_uri'  => get_theme_file_uri() . '/_dist/',
        'src'       => get_theme_file_uri() .'/resources/assets/',


    ],

    'jquery' => [

        'version'   => '1.12.4'

    ],

    'svg' => [

    	'svg_dir'				=> get_theme_file_path() . '/_dist/svg/',
    	'svg_sprite'			=> get_theme_file_path() . '/_dist/svg/sprite.svg',

    ]

];
