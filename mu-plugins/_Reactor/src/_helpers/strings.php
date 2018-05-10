<?php
namespace Reactor\Helpers;



function strip_spaces( $string ){

	return str_replace( ' ', '', $string );

}

function replace_space_with_hyphen( $string ){

	return str_replace( ' ', '-', $string );

}


function replace_space_with_underscore( $string ){

	return str_replace( ' ', '_', $string );

}


function replace_space_or_hyphen_with_underscore( $string ){

	return str_replace( array( ' ', '-' ), '_', $string );

}

function replace_space_or_underscore_with_hyphen( $string ){

	return str_replace( array( ' ', '-' ), '_', $string );

}