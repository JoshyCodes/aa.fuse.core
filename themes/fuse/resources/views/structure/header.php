<?php
use Reactor\Helpers;

// Get nae of the current post type
$post_type = Helpers\post_type_name();

?>

<header id="site-header" class="o-header o-header--<?php esc_html_e( $post_type ); ?>">
	
	<div class="o-container --max --width">
		Hello Header
	</div>

</header>