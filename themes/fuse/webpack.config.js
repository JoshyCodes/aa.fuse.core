/**
 * Webpack V4
 *
 * @author  CreativeFuse
 * @since   1.0.0
 *
 *
 * WP JS Coding Standards Reference: https://make.wordpress.org/core/handbook/best-practices/inline-documentation-standards/javascript/
 *
 * Awesome References
 * @Part 1 - https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
 * @Part 2 - https://medium.freecodecamp.org/how-to-develop-react-js-apps-fast-using-webpack-4-3d772db957e4
 */
const BrowserSyncPlugin             = require('browser-sync-webpack-plugin');
const CleanObsoleteChunks           = require('webpack-clean-obsolete-chunks');
const CleanWebpackPlugin            = require('clean-webpack-plugin');
const CopyWebpackPlugin             = require('copy-webpack-plugin')
const FriendlyErrorsWebpackPlugin   = require('friendly-errors-webpack-plugin');
const MiniCssExtractPlugin          = require('mini-css-extract-plugin');
const SpriteLoaderPlugin            = require('svg-sprite-loader/plugin');
const StyleLintPlugin               = require('stylelint-webpack-plugin');
const WebpackAssetsManifest         = require('webpack-assets-manifest');
const WebpackMd5Hash                = require('webpack-md5-hash');

const devMode                       = process.env.NODE_ENV !== 'production';
const path                          = require( 'path' );

const config = {

	entry: {

		app: 	'./resources/assets/js/app.js',
		posts: './resources/assets/js/posts.js',

	},

	output: {

		path: path.resolve( __dirname, '_dist' ),

		filename: devMode  ? '[name].js' : '[name].[chunkhash].bundle.js',
		chunkFilename: devMode ? '[id].js' : '[id].[chunkhash].js',
		sourceMapFilename: '[name].map'

	},

	module: {

		rules: [

			/**
			 * Babel Loader.
             *
             * A compiler that allows us to use the latest JS standards without
             * breaking stuff on older browsers.
             *
             * @kind    loader
             * @url     https://github.com/babel/babel-loader
             * @since   1.0.0
			 */
			{
				test: /\.(js|jsx)$/,
				exclude: /(node_modules|bower_components)/,
				use: ['babel-loader']
			},
            {
                test:   /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: ['babel-loader', 'eslint-loader']
            },

			/**
			 * SCSS Loader w/ POSTCss
             *
             * @kind    loader
             * @since   1.0.0
             * @uses    MiniCssExtractPlugin
			 */
			{

				test: /\.scss$/,
	            use: [
	                'style-loader',
                	MiniCssExtractPlugin.loader,
                	'css-loader',
                	'postcss-loader',
                	'sass-loader'
	            ],

			},

            /**
             * SVG Sprite Loader.
             *
             * A loader to handle managing our SVG sprites.
             *
             * @kind    loader
             * @url     https://github.com/kisenka/svg-sprite-loader
             * @since   1.0.0
             */

            {
              test: /\.svg$/,
              loader: 'svg-sprite-loader',
              options: {
                    extract: true,
                    spriteFilename: devMode ? 'sprite.svg' : 'sprite.svg',
                }
            }

		]

	},

	plugins: [

		/**
		 * MiniCssExtractPlugin.
         *
         * Create CSS files from our SCSS files and bundle them together.
		 *
		 * @url   https://github.com/webpack-contrib/mini-css-extract-plugin
         * @since 1.0.0
		 *
		 */
  		new MiniCssExtractPlugin({

            filename: devMode ? '[name].css' : '[name].[contenthash].bundle.css',

        }),

        /**
         * StyleLintPlugin.
         *
         * A Stylelint plugin for webpack.
         *
         * @url   https://github.com/webpack-contrib/stylelint-webpack-plugin
         * @since 1.0.0
         *
         */
        new StyleLintPlugin({

            configFile: '.stylelintrc',
            failOnError: false,
            files: '**/*.scss',
            quiet: false,

        }),

  		/**
  		 * WebpackMd5Hash
  		 *
  		 * @since  1.0.0
  		 *
  		 * @repo : https://github.com/erm0l0v/webpack-md5-hash
  		 *
  		 * @desc : Plugin to replace a standard webpack chunkhash with md5.
  		 */
        new WebpackMd5Hash(),

        /**
         * BrowserSyncPlugin
         * @since  1.0.0
         *
         * Repo : https://github.com/Va1/browser-sync-webpack-plugin
         * Desc : Implement Browsersync to use live reloading auto style-injecting
         * when assets are compiled. We are not using Webpack Dev Server because it
         * is a pain in the ass to configure with Wordpress. Unfortunately this means
         * we can not use Hot Module Replacement though :(
         */
    	new BrowserSyncPlugin( {

                injectChanges: true,
                proxy: 'https://cf.dev',

                files: [
                    '**/*.php',
                    '_dist/*.js',
                    '_dist/*.svg',
                    '_dist/*.jpg',
                    '_dist/*.png'
                ],
                open: false,
                reloadDelay: 0
            }
        ),

        /**
         * FriendlyErrorsWebpackPlugin
         * @since  1.0.0
         *
         * Repo : https://github.com/geowarin/friendly-errors-webpack-plugin
         * Desc : recognizes certain classes of webpack errors and cleans, aggregates
         * and prioritizes them to provide a better Developer Experience.
         */
        new FriendlyErrorsWebpackPlugin(),

        /**
         * CleanWebpackPlugin
         * @since  1.0.0
         *
         * Repo : https://github.com/johnagan/clean-webpack-plugin/
         * Desc : Delete files in specified fodler when a new build is run.
         */
        new CleanWebpackPlugin('_dist', {} ),

        /**
         * CleanObsoleteChunks
         * @since  1.0.0
         *
         * Repo : https://github.com/GProst/webpack-clean-obsolete-chunks
         * Desc: Clean old hashed files when new ones are
         * generated when using --watch.
         *
         * This was implemented because clean-webpack-plugin only
         * works when the initial build is run and would leave
         * all the old files behind when new ones are recompiled
         * with new hashes.
         */
        new CleanObsoleteChunks({}),


        new CopyWebpackPlugin([

            // Image Handler + add content hash
            {
                from:   './resources/assets/images/**/*',
                to:     './',
                flatten: true
            },

            // Copy fonts to dist
            {
                from: './resources/assets/fonts/**/*',
                to: './',
                flatten: true
            },

        ]),

        /**
         * WebpackAssetsManifest
         * @since  1.0.0
         *
         * Repo : https://github.com/webdeveric/webpack-assets-manifest
         * Desc : This Webpack plugin will generate a JSON file that matches
         * the original filename with the hashed version. This will help us
         * when it comes time to load our assets.
         */
        new WebpackAssetsManifest({

            // Possible SVG Fix https://github.com/kisenka/svg-sprite-loader/issues/166

        }),


        new SpriteLoaderPlugin({ plainSprite: true })


	],

	/**
	 * @since  1.0.0
	 *
	 * I like the way Roots/Sage looks when running a build,
	 * so I grabbed their stats settings
	 */
	stats: {
	  hash: false,
	  version: false,
	  timings: false,
	  children: false,
	  errors: false,
	  errorDetails: false,
	  warnings: false,
	  chunks: false,
	  modules: false,
	  reasons: false,
	  source: false,
	  publicPath: false,
	}

};

module.exports = config;
