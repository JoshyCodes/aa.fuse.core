<?php
namespace Reactor;

return [

	'files' => [

		// Helpers
		'_helpers/strings',
		'_helpers/arrays',
		'_helpers/urls',
		'_helpers/query-strings',
		'_helpers/checks',
		'_helpers/colors',
		'_helpers/images',
		'_helpers/svg',
		'_helpers/posts',
		
		// Security
		'security/functions',

		// Optimizations
		'optimize/functions',
		'optimize/remove-embeds',

		// Integrations,
		'integrations/acf/acf',
		'integrations/gforms/gforms',

		// Factories
		'factories/class.module-factory',
		'factories/class.shortcode-factory'
	]

];