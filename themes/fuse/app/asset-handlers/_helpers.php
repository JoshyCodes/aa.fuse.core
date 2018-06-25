<?php
namespace Fuse\AssetHandler;
use Fuse;

/**
 * Get cache-busting hashed filename from manifest.json.
 *
 * @param 	string $filename Original name of the file.
 * @return	string Current cache-busting hashed name of the file.
 * @ref 	https://www.alainschlesser.com/bust-cache-content-hash/
 */
function get_asset_from_manifest( $filename, $use_uri_for_returned_file = true ) {

    // Cache the decoded manifest so that we only read it in once.
    $manifest = null;

    if ( null === $manifest ) {

        $manifest_path = Fuse\fuse()->config( 'assets', 'manifest' );

        $manifest = file_exists( $manifest_path )
            ? json_decode( file_get_contents( $manifest_path ), true )
            : [];

    }

    /**
     * If the manifest contains the requested file,
     * return the hashed name and full uri of the asset
     */

    if ( array_key_exists( $filename, $manifest ) ) {

    	// Either use URI or PATH for the returned file.
    	// Default is URI. Passing in false will result in returning the path

    	$file_path = $use_uri_for_returned_file == true

    		? Fuse\fuse()->config( 'assets', 'prod_uri' )
    		: Fuse\fuse()->config( 'assets', 'prod_path' );

        return  $file_path . $manifest[ $filename ];

    }

    // Assume the file has not been hashed when it was not foun within the
    // manifest.

    return $filename;

}
