<?php
use Fuse\Controllers;

?>


<div class="o-side__right">

		<!-- Call to Action Component -->
		<div class="o-panel o-panel__right o-panel__right__cta">

			<div class="o-panel__container">

				<!-- Call to Action Component -->
				<?php Controllers\render( 'fragments/zz-legacy/_cta-main' ); ?>

			</div>

		</div>


		<div class="o-panel o-panel__right o-panel__right__form o-panel__right--hidden o-panel__right--hidden--bottom">

				<div class="o-panel__container">

					<!-- Form Component -->

					<?php Controllers\render( 'fragments/zz-legacy/_form-main' ); ?>

				</div>

		</div>

</div>