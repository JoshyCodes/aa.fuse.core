<?php
use Fuse\Controllers;
?>

<div class="tmp-o-post__back-to-all">

        <div class="tmp-m-title-group">

            <h1 class="tmp-m-title-group__title a-heading--bold">
                <?= $data['title']; ?>
            </h1>

            <div class="tmp-m-title-group__sub">
                <h2 class="a-heading--thin"><?= $data['sub']; ?></h2>
            </div>

            <a class="tmp-m-btn tmp-m-btn--footer" href="<?= esc_url( get_post_type_archive_link( 'post' ) ); ?>">
                Read More Blogs
            </a>

        </div>

</div>