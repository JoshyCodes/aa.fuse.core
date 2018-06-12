/**
 * After the DOM is loaded, we can fire our
 * injection function. Trying to fire it before the DOM
 * is loaded will end with our inject container
 * returning null - because it won't exist yet.
 * 
 * We are opting for this ajax method because a simple
 * PHP inject results in the SVG sprite not being cached.
 * With the AJAX method, the file and the request are cached.
 * 
 * Based on: https://css-tricks.com/ajaxing-svg-sprite/
 */
document.addEventListener('DOMContentLoaded', function() {

    // The container we are injecting our SVG into
    const container = document.querySelector( '.js-fuse--svg-sprite-defs' );

    injectSVGSprite( container );

});

/**
 * Get the SVG file and then append the
 * contents to our SVG container.
 */
function injectSVGSprite( container ){

    const request = new XMLHttpRequest();

    // Grab our SVG Sprite!
    request.open( "GET", "./wp-content/themes/fuse/_dist/sprite.svg", true );
    request.responseType = "document";
    
    // On success, attempt the injection
    request.onload = function(e) {

        try{
            
            // parse the response
            const svg = request.responseXML.documentElement; 
            container.append( svg );

        }

        // Catch errors ( remove console log in production )
        catch(e){

            console.log(e);

        }
    }

    request.send();

}