<?php
namespace Fuse;
use Reactor\Helpers;
use Fuse\AssetHandler;

// Get nae of the current post type
$post_type = Helpers\post_type_name();

?>

<footer id="site-footer "class="o-footer o-footer--<?php esc_html_e( $post_type ); ?>">

	<div class="o-container --max --width">
		Hello Footer
		<?php do_action('fuse_footer_content'); ?>
	</div>

</footer>
