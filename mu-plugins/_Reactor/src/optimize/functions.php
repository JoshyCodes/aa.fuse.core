<?php

namespace Reactor\Optimize;
use function App\config as app;

/**
 * Allow shortcodes to be used in Widgets. 
 * This is disabled by default! BOOOO!!!
 *
 * @since  1.0.0
 */
add_filter( 'widget_text', 'do_shortcode' );

/**
 * Hard set the default timezone.
 * 
 * For some reason, even when set in WP settings,
 * timezones are still set to the server and not the locale of the business.
 * If we have any date or time based functions, we need the timezone to reflect
 * the timzone of the business this website is being built for!
 *
 * @since  1.0.0
 */

add_action( 'init', __NAMESPACE__ . '\set_timezone');

function set_timezone(){
	date_default_timezone_set( app()->config( 'project', 'timezone' ) );
}


/**
 * REMOVE Support for WP-EMOJIS
 * because the script force loads in header...boooooooo
 *
 * @since  1.0.0
 */
remove_action( 'wp_head', 'print_emoji_detection_script', 7 );
remove_action( 'admin_print_scripts', 'print_emoji_detection_script' );
remove_action( 'wp_print_styles', 'print_emoji_styles' );
remove_action( 'admin_print_styles', 'print_emoji_styles' );

/**
 * Remove RSD Link from WP-Head
 *
 * If you need to add integration with services like Flickr...add this back.
 *
 * @since 1.0
 */
remove_action('wp_head', 'rsd_link');

/**
 * Remove Windows Live Writer
 *
 * @since  1.0.0
 */
remove_action('wp_head', 'wlwmanifest_link');


/**
 * Remove Post Relational Links
 *
 * @since  1.0.0
 */

remove_action( 'wp_head', 'start_post_rel_link' );
remove_action( 'wp_head', 'index_rel_link' );
remove_action( 'wp_head', 'adjacent_posts_rel_link_wp_head' );


/**
 * Remove Comment Feed Links from Head
 * @url https://wordpress.stackexchange.com/questions/190509/where-to-remove-link-from-comments-feed?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa
 **/
add_filter( 'feed_links_show_comments_feed', '__return_false' );

/**
 * Remove WP Shortlink from Head
 */
remove_action('wp_head', 'wp_shortlink_wp_head', 10, 0);

/**
 * Remove oEmbed
 */
