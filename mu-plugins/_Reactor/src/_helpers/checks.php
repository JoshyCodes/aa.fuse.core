<?php
namespace Reactor\Helpers;
use function App\config as app;


function acf_is_active(){

	if( class_exists('acf') ){

		return true;

	}

}


function gforms_is_active(){

	if( class_exists('GFCommon') ){
 
		return true;

	}

}


/**
 * Is our current environment our dev environment?
 */
function is_dev_env(){

	// check our array of dev environemnts
	// against the current domain

	return array_contains_string_part(

		app()->config( 'env', 'dev' ),
		get_domain()


	);

}