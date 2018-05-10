<?php
namespace Fuse;
use Fuse\Controllers;

// If we have a basename in play, use it, otherwise, assume index.php
$template = Controllers\get_template_base() ?? 'index';

?>


<?php do_action( 'fuse_header' ); ?>

<?php do_action( 'fuse_before_content_div' ); ?>

	<div id="site-content" class="o-content o-content--<?php esc_html_e( $template); ?>">
			
			<?php do_action( 'fuse_before_main_div' ); ?>

			<main class="o-content__main">

				<?php do_action( 'fuse_before_content' ); ?>

					<?php Controllers\load_template( $template ) ?>

				<?php do_action( 'fuse_after_content' ); ?>

			</main>

			<?php do_action( 'fuse_after_main_div' ); ?>

	</div>

<?php do_action( 'fuse_after_content_div' ); ?>

<?php do_action( 'fuse_footer' ); ?>