<?php
namespace Fuse;

return [

   'files' => [

        // Base
        'setup/theme',
        'helpers',
        'admin',
        'filters',

        // Enqueues
        'asset-handlers/_helpers',
        'asset-handlers/fonts',
        'asset-handlers/images',
        'asset-handlers/scripts',
        'asset-handlers/styles',
        'asset-handlers/svg',

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
        'templates/layout/page/apply-page',
        'templates/layout/page/apply-thank-you-page',

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
        'templates/layout/legacy-thanks'

   ]

];
