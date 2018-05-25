// https://novelist.xyz/tech/progressive-background-image-loading/
'use strict';

;(function( $, window, document, undefined ){


	// Holder for our images array
	var images = [];


	var initProgressiveImageHandler = function(){

		images = $('.m-progressive-bg-image');

		images.each( function(){


			return loadImage( $(this) );
	

		});



	};


	var loadImage = function( currentImage ){

		// Get the actual elements that hold data we need to work with
		var thumbnail 			= currentImage.find('.m-progressive-bg-image__thumb'),
			fullImage 			= currentImage.find('.m-progressive-bg-image__full'),
			
			// Get the full image src path
			fullImageSrc 				= thumbnail.attr( "data-src" );

			// Create a new image object
		var img = new Image;

			// Grab our full image src from the main div data-src
			img.src = fullImageSrc;

			// As soon as the page has fully rendered and all assets loaded,
			// fire off the swap.

			img.onload 	= function(){

				// Finally set the bg image for our full image
				fullImage.css( 'background-image', 'url(' + fullImageSrc + ')' );

				// Set the full image to loaded
				fullImage.addClass( '--loaded' );

				// Hide the thumnail image
				thumbnail.addClass( '--hidden' );

				// remove the thumbnail form the images array
				cleanThumbnail( currentImage  );

			}

	};


	/**
	 * Kick off our Init Function
	 */
	$(document).ready( function() {
		
		initProgressiveImageHandler();

	});
	

})( jQuery, window, document );