<?php
use Fuse\Controllers;
?>

<div class="tmp-o-hero tmp-o-hero--single">

    <div class="l-container l-container--max--l l-container--width">

        <div class="tmp-m-title-group tmp-o-hero--single__title-group">

            <h1 class="tmp-o-hero__title a-heading--bold">
                <?= $data['title']; ?>
            </h1>

            <div class="tmp-o-hero__meta">
                <h2 class="tmp-o-hero__meta__item a-heading--thin"><?= $data['date']; ?></h2>
                <span class="tmp-o-hero__meta__sep">•</span>
                <h2 class="tmp-o-hero__meta__item a-heading--thin"><?= $data['author']; ?></h2>
            </div>

        </div>

    </div>


</div>