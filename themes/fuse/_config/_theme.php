<?php
namespace Fuse;

return [

    // Core Theme settings
    'theme' => [

        'name'          => 'fuse',
        'version'       =>  '0.0.1',
        'text_domain'   => 'fuse',


        // This is the absolute path to your theme directory.
        'dir' => get_theme_file_path(),

        // This is the web server URI to your theme directory.
        'uri' => get_theme_file_uri(),

    ],

    // Here you may specify an array of paths that should be checked for your views.
    'paths' => [

        'template_root' => get_theme_file_path() . '/resources/views/templates/',
        'fragment_root' => get_theme_file_path() . '/resources/views/partials/',

    ]
   
];
