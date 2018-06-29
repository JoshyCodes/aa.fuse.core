<?php
use Fuse\AssetHandler;
?>

<div class="tmp-o-footer__content">

    <div class="l-container l-container--max--l l-container--width">

        <div class="tmp-o-footer__logo">
            <?= AssetHandler\get_svg( [  'name' => 'tmp-fuse-logo' ] ); ?>
        </div>

        <p class="tmp-o-footer__copyright">
            &copy; <?= date("Y"); ?> CreativeFuse. All Rights Reserved.
        </p>

        <a class="tmp-o-footer__item" href="<?= esc_url( home_url( '/privacy-policy' ) ); ?>">
            Privacy Policy
        </a>

    </div>

</div>