<?php
namespace Fuse;
use Reactor\Helpers;

// Get name of the current post type
$data = [

	'current_post_type'		=> Helpers\post_type_name()

];

?>


<?php do_action( 'fuse_site_begin' ); ?>

	<div id="site-wrapper" class="o-site-wrapper o-site-wrapper--<?= $data['current_post_type']; ?>">

		<?php do_action( 'fuse_header' ); ?>

		<?php do_action( 'fuse_before_content_div' ); ?>

			<div id="site-content" class="o-content o-content--<?= $data['current_post_type']; ?>">

					<?php do_action( 'fuse_before_main_div' ); ?>

					<main class="o-content__main">

						<?php do_action( 'fuse_hero' ); ?>

						<?php if( have_posts() ){ ?>

								<?php do_action( 'fuse_before_loop' ); ?>

									<?php while( have_posts() ): the_post(); ?>

										<?php do_action( 'fuse_before_content' ); ?>

											<?php do_action( 'fuse_content' ); ?>

										<?php do_action( 'fuse_after_content' ); ?>

									<?php endwhile; ?>

								<?php do_action( 'fuse_after_loop' ); ?>

						<?php } else { ?>


							<?php do_action( 'fuse_no_content' ); ?>


						<?php } ?>

					</main>

					<?php do_action( 'fuse_after_main_div' ); ?>

			</div>

		<?php do_action( 'fuse_after_content_div' ); ?>

		<?php do_action( 'fuse_footer' ); ?>

	</div>

<?php do_action( 'fuse_site_end' ); ?>
