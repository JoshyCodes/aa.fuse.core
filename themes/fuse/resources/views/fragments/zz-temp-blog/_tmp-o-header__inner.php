<?php
namespace Fuse\Pattern\Molecule;
use Fuse\AssetHandler;
use Reactor\Helpers;
?>

<div class="tmp-o-header__content">

    <a href="<?= esc_url( home_url() ); ?>" class="tmp-o-header__logo">
        <?= AssetHandler\get_svg( [  'name' => 'tmp-fuse-logo' ] ); ?>
    </a>

    <?php if( is_singular('post') ){ ?>

        <a href="<?= esc_url( get_post_type_archive_link( 'post' ) ); ?>" class="tmp-o-header__back">
            <div class="tmp-o-header__back__icon"></div>
            <p class="tmp-o-header__back__copy">Back to All Blogs</p>
        </a>


    <?php } ?>

    <a href="<?= esc_url( home_url() ); ?>" class="tmp-m-btn">
        Let's Chat
    </a>

</div>