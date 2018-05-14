<!doctype html>
<html class="no-js" lang="">

<head>

	<meta charset="utf-8">
	<meta http-equiv="x-ua-compatible" content="ie=edge">
	<title><?php wp_title('•','true','right'); ?><?php bloginfo('name'); ?></title>
	<meta name="description" content="">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

	<?php wp_head(); ?>

</head>

<body <?php body_class(); ?>>

	<?php do_action( 'fuse_load_gtm' ); ?>
	
	<?php do_action( 'fuse_after_body_open' ); ?>