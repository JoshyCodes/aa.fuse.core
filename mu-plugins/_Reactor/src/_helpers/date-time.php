<?php

namespace Reactor\Helpers;


function get_todays_date(){

	// Get today's Date
	return date("Ymd");

}


function get_timestamp( $date ){

	// make date string into a timestamp
	return strtotime( $date );

}


function get_todays_timestamp(){

	if( function_exists( 'get_todays_date' ) ){

		// make date string into a timestamp
		return strtotime( get_todays_date() );
	}

}