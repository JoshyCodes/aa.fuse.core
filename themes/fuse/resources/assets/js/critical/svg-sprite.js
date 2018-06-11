// https://css-tricks.com/ajaxing-svg-sprite/

    const ajax = new XMLHttpRequest();


    ajax.open("GET", "./wp-content/themes/fuse/_dist/sprite.svg", true);
    ajax.responseType = "document";
    
    ajax.onload = function(e) {

        try{

            const svg = ajax.responseXML.documentElement;
            
            svg.setAttribute("style", "display:none;");

            document.body.insertBefore(
                svg,
                document.querySelector('.o-header')
            );

        }
        catch(e){console.log(e);}
    }

    ajax.send();
