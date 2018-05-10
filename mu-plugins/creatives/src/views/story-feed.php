<?php
namespace CreativeFuse\Creatives;
use Reactor\Helpers;
use ColorThief\ColorThief;

// start the loop
while ( $creatives->have_posts() ) {

	// Tap into the post
	$creatives->the_post();



}