<?php
namespace Fuse\AssetHandler;
use Reactor\Helpers;
use Fuse;

function inject_svg_sprite(){

	//  Check to see if our sprite exists & set it
	//  if it does
	$sprite = file_exists( get_asset_from_manifest('sprite.svg', false) ) ?? null;

	// Bail if it doesn't
	if( ! $sprite )
		return; ?>

		<!-- Begin SVG Sprite Definitions -->
		<div class="fuse--sprite-defs" style="display:none;">
			<?php include get_asset_from_manifest('sprite.svg', false); ?>
		</div>
		<!-- End SVG Sprite Definitions -->

<?php }
