<?php
namespace Fuse;

return [

   'files' => [

        // Base
        'setup',
        'helpers',
        'admin',
        'filters',

        // Controllers
        'controllers/wrappers',
        'controllers/templates',
        'controllers/fragments',
        
        /**
         * Template Files
         */

        // Structure
        'templates/structure/site',

        // Layout • Page
        'templates/layout/page/page',
        'templates/layout/page/front-page',

        // Layout • Archive
        'templates/layout/archive/post',

        // Layout • Single
        'templates/layout/single/post',

        // Layout • Page Templates
        'templates/layout/template/landing',

        // Layout • Mixed Page/Post Types
        'templates/layout/mixed/page-post',


        // Layout • Legacy Pages
        'templates/layout/legacy-splash',

        // Enqueues
        'asset-handlers/helpers',
        'asset-handlers/styles',
        'asset-handlers/scripts',
        'asset-handlers/svg'

   ]

];
