<?php
namespace Fuse\AssetHandler;
use Fuse;

add_action( 'wp_enqueue_scripts', __NAMESPACE__ . '\enqueue_hashed_files', 1);

function enqueue_hashed_files( string $type ){

	$dist_uri = Fuse\fuse()->config( 'assets', 'prod_uri' );
	$dist_dir_files = new \DirectoryIterator( Fuse\fuse()->config( 'assets', 'prod_path' ) );	

	foreach ($dist_dir_files as $file) {

		$full_name 			= basename($file);
		$basename			= get_file_basename( $full_name );

		$full_enqueue_src 	= $dist_uri . $full_name;

		if ( pathinfo($file, PATHINFO_EXTENSION) === 'js') {

			$deps = get_file_dependencies( $basename );

			wp_enqueue_script( $full_name, $full_enqueue_src, $deps, false, true );

		}


	}

}


function get_file_basename( $full_name ){

	$file_base = basename($full_name);

	return substr( $file_base, 0, strpos( $file_base, '.') );

}


function get_file_dependencies( string $file_name ){
	
	switch($file_name) {

	    case 'app':
	        $deps = array();
	        break;

	    case 'posts':
	        $deps = array('app');
	        break;

	    default:
	        $deps = array();               
	        break;

	}

	return $deps;

}