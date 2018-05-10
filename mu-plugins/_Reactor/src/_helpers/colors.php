<?php
namespace Reactor\Helpers;

// @ref https://gist.github.com/pehbehbeh/2417222
function get_dominant_image_color( $image ){

	$i = imagecreatefromjpeg( $image );

	for ($x=0;$x<imagesx($i);$x++) {

	    for ($y=0;$y<imagesy($i);$y++) {
	        $rgb = imagecolorat($i,$x,$y);
	        $r   = ($rgb >> 16) & 0xFF;
	        $g   = ($rgb >> 8) & 0xFF;
	        $b   = $rgb & 0xFF;

	        $rTotal += $r;
	        $gTotal += $g;
	        $bTotal += $b;
	        $total++;
	    }
	}

	$rAverage = round($rTotal/$total);
	$gAverage = round($gTotal/$total);
	$bAverage = round($bTotal/$total);


	return [ 
		'r' => $rAverage,
		'g' => $gAverage,
		'b' => $bAverage 
	];

}


// @ref https://stackoverflow.com/questions/32962624/convert-rgb-to-hex-color-values-in-php
function convert_rgb_to_hex( $rgb_color ){

	return sprintf("#%02x%02x%02x", $rgb_color['r'], $rgb_color['g'], $rgb_color['b']);

}