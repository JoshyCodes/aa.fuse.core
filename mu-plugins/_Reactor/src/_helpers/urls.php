<?php
namespace Reactor\Helpers;

function get_domain(){

	return $_SERVER['HTTP_HOST'];

}


function get_reuest_uri(){

	return $_SERVER['REQUEST_URI'];

}

function get_url_protocol(){

	$protocol = isset( $_SERVER['HTTPS'] )

				? "https"
				: "http";

	return  $protocol;

}

function get_full_url(){

	$url = get_url_protocol() . '://' . get_domain() . get_reuest_uri();

	return $url;

}

function domain_exists( $domain ){

	//check, if a valid url is provided
   if(!filter_var($domain, FILTER_VALIDATE_URL)){
           return false;
   }

   //initialize curl
   $curlInit = curl_init($domain);
   curl_setopt($curlInit,CURLOPT_CONNECTTIMEOUT,10);
   curl_setopt($curlInit,CURLOPT_HEADER,true);
   curl_setopt($curlInit,CURLOPT_NOBODY,true);
   curl_setopt($curlInit,CURLOPT_RETURNTRANSFER,true);

   //get answer
   $response = curl_exec($curlInit);

   curl_close($curlInit);

   if ($response) return true;

   return false;

}

// @ref https://stackoverflow.com/questions/27718170/file-path-without-domain-name-from-wp-get-attachment-url

function strip_domain_from_url( $url ){

   //output local path without beginning slash
   return explode(get_full_url(), $url)[1];
   

}


function strip_protocol_from_url( $url ){

   $url = preg_replace('#^https?://#', '', $url);

   //output local path without beginning slash
   return $url;
   

}