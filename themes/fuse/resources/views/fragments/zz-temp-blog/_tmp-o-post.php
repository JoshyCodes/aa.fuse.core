<?php
	use Reactor\Helpers;
?>

<div class="tmp-o-post__content">

	<div class="tmp-o-post__featured">
		<img class="tmp-o-post__featured__media" src="<?= Helpers\get_img_meta( [ 'type' => 'url' ]); ?>" alt="<?= Helpers\get_img_meta( [ 'type' => 'alt' ]); ?>">
	</div>

	<?php the_content(); ?>

</div>