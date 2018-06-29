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

	return str_replace( array( ' ', '_' ), '-', $string );

}

/**
 * Based on: https://gist.github.com/mynameispj/3170442
 */
function get_estimated_reading_time( $content ){

	$word = str_word_count(strip_tags($content));

	// Assume 200 words / minute (a little slower than average)
	$minutes = floor($word / 200);

	$estimate = $minutes . ' min';

	return esc_html( $estimate );
}