<?php
namespace Fuse\Controllers;
use Fuse;

// https://viastudio.com/better-partial-templates-in-wordpress/


/**
* Load a template part & pass in variables declared in caller scope. Optionally return as a string.
*
* @param string $path path to template file, minus .php (eg. `content-page`, `partial/folder/template-name`)
* @param array $args map of variables to load into scope
* @param bool $echo echo or return rendered template
*
* @return null or rendered template string
*
* @since  1.0.0
*/

function render( $path, $args = [], $echo = true ) {



	// Set the partial root
	$view_root	= Fuse\fuse()->config( 'paths', 'view_root' );

	// Build the full path to the file we are requesting
	$_path		 	= $view_root . $path;

	// Define the extension as .php for the partial file
	$partial_file	= $_path . '.php';

    // If we have args, let's get bring them into this context
    if ( ! empty( $args ) ){

        $data = $args;

    }

    // Echo the partial and bail
    if ($echo) {

        include( $partial_file );

        return;

    }


    // Return the partial
    ob_start();

        include( locate_template( $partial_file ) );

    // Return & clean the output buffer
    return ob_get_clean();

}
