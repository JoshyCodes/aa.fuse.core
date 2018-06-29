<?php
namespace Fuse;
use Reactor\Helpers;
use Fuse\AssetHandler;

$data = [

	'current_post_type' => Helpers\post_type_name()

];

?>

<footer id="site-footer "class="o-footer o-footer--<?= $data['current_post_type']; ?>">

		<?php do_action('fuse_footer_content'); ?>

</footer>