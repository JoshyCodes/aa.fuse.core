<?php
use Reactor\Helpers;

$data = [
	'current_post_type' => Helpers\post_type_name()
];

?>

<header id="site-header" class="o-header o-header--<?= $data['current_post_type']; ?>">

	<div class="l-container l-container--max--l l-container--width">

		<?php do_action( 'fuse_header_content' ); ?>

	</div>

</header>