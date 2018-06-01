<div id="cta-form" class="c-form">

	<a class="c-form__close js-close-cta-form">x</a>

	<div class="c-title-group c-title-group--form">
		<h3 class="e-h2 c-title-group__title u-color--gray"><?php esc_html_e( 'Yeah, this may be a form...' );?></h3>
		<h4 class="e-p--common c-title-group__copy"><?php esc_html_e( 'but it\'s also the beginning of some crazy intergalactic awesomeness!' );?></h4>
	</div>

	<?= do_shortcode( '[gravityform id=1 ajax=true]' ); ?>

</div>