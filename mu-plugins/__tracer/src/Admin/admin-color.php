<?php
/**
 * Admin functions to change the look of the admin bar when this plugin
 * is activated, i.e. to differentiate that we are in development mode.
 *
 * @package     Tracer\Admin
 * @since       1.0.0
 * @author      CreativeFuse
 * @link        https://creativefuse.org
 * @license     GNU-2.0+
 */

namespace Tracer\Admin;
use Tracer;

/**
 * Force different admin color scheme when this plugin is active.
 *
 * @since 1.0.0
 *
 * @return string
 */
add_filter( 'get_user_option_admin_color', __NAMESPACE__ . '\set_local_development_admin_color_scheme', 5 );

function set_local_development_admin_color_scheme() {
	return Tracer\tracer()->config( 'admin_color_scheme' );
}

/**
 * Add an admin bar notice to alert user that they are in local development
 * and this plugin is activated.
 *
 * @since 1.0.0
 *
 * @return void
 */
add_action( 'admin_bar_menu', __NAMESPACE__ . '\add_admin_bar_notice', 9999 );

function add_admin_bar_notice() {

	if ( ! is_admin_bar_showing() ) {
		return;
	}

	global $wp_admin_bar;

	$message = Tracer\tracer()->config( 'message' );

	$admin_notice = array(
		'parent' => 'top-secondary',
		'id'     => 'environment-notice',
		'title'  => sprintf( '<span class="adminbar--environment-notice">%s</span>', $message ),
	);

	$wp_admin_bar->add_menu( $admin_notice );

}

/**
 * Render the admin bar CSS.
 *
 * @since 1.0.0
 *
 * @return void
 */
add_action( 'admin_head', __NAMESPACE__ . '\render_admin_bar_css', 9999 );
add_action( 'wp_head', __NAMESPACE__ . '\render_admin_bar_css', 9999 );

function render_admin_bar_css() {
	if ( ! is_admin_bar_showing() ) {
		return;
	}

	ob_start();

		include( Tracer\tracer()->config('dir') . '/assets/css/admin-bar.php' );

		$css_pattern = ob_get_clean();

	vprintf( $css_pattern, Tracer\tracer()->config('colors') );
}