<?php
namespace Fuse\Pattern\Molecule;
use Reactor\Helpers;
use ColorThief\ColorThief;


/**
 * Grab Our dominant Image value fro the placeholder and convert it to a hex value.
 * Note that we need to check every step of the way that we have the data necessary
 * to perform this task or else a fatal error will be thrown.
 */
// $dominant_color_rgb = Helpers\get_dominant_image_color( $data['bg'] );

// // If we actually got the dominant RGB Value
// if( $dominant_color_rgb ){

//     // Convert it to a hex value
//     $dominant_color_hex = Helpers\convert_rgb_to_hex( $dominant_color_rgb );

// } else {

//     // Fallback hex value
//     $dominant_color_hex = '#494E54';

// }

?>


<div class="tmp-m-card__wrapper">

    <a class="tmp-m-card tmp-m-card--primary" href="<?= $data['link']; ?>">

        <div class="tmp-m-card__header" style="background-image:url('<?= $data['bg']; ?>');">
        </div>

        <div class="tmp-m-card__body">

            <div class="tmp-m-title-group">
                <h2 class="tmp-m-title-group__headline a-heading--medium"><?= $data['title']; ?></h2>

                <h3 class="tmp-m-title-group__sub a-heading--medium">
                By <?= $data['author']; ?>
                </h3>

                <p class="tmp-m-title-group__copy"><?= $data['copy']; ?></p>
            </div>

        </div>

    </a>

</div>