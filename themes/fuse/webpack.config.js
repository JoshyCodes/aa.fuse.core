/**
 * Webpack V4
 *
 * Awesome References
 * @Part 1 - https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
 * @Part 2 - https://medium.freecodecamp.org/how-to-develop-react-js-apps-fast-using-webpack-4-3d772db957e4
 */
const path 							= require( 'path' );
const MiniCssExtractPlugin 			= require('mini-css-extract-plugin');
const WebpackMd5Hash 				= require('webpack-md5-hash');
const CleanWebpackPlugin 			= require('clean-webpack-plugin');
const CleanObsoleteChunks 			= require('webpack-clean-obsolete-chunks');
const BrowserSyncPlugin 			= require('browser-sync-webpack-plugin');
const WebpackAssetsManifest 		= require('webpack-assets-manifest');
const FriendlyErrorsWebpackPlugin 	= require('friendly-errors-webpack-plugin');


const config = {

	entry: {

		app: 	'./resources/assets/js/app.js',
		posts: './resources/assets/js/posts.js',

	},

	output: {

		path: path.resolve( __dirname, '_dist' ),
		filename: '[name].[chunkhash].bundle.js',
		chunkFilename: '[id].[chunkhash].js',
		sourceMapFilename: '[name].map'

	},

	module: {

		rules: [

			/**
			 * Babel Loader
			 */
			{
				test:	/\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
				}
			},

			/**
			 * SCSS Loader w/ POSTCss
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

			}

		]

	},

	plugins: [

		/**
		 * MiniCssExtractPlugin
		 *
		 * @since  1.0.0
		 * 
		 * @repo https://github.com/webpack-contrib/mini-css-extract-plugin
		 * 
		 * @desc Create CSS files from our SCSS files
		 * and bundle them together.
		 * 
		 * @ref https://webpack.js.org/plugins/mini-css-extract-plugin/
		 */
  		new MiniCssExtractPlugin({

            filename: '[name].[contenthash].bundle.css',

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

                proxy: 'https://cf.dev',

                files: [
                    '**/*.php',
                    '_dist/*.js',
                    '_dist/*.svg',
                    '_dist/*.jpg',
                    '_dist/*.png'
                ],

                reloadDelay: 0
            }
        ),

    	/**
    	 * WebpackAssetsManifest
    	 * @since  1.0.0
    	 * 
    	 * Repo : https://github.com/webdeveric/webpack-assets-manifest 
    	 * Desc : This Webpack plugin will generate a JSON file that matches
    	 * the original filename with the hashed version. This will help us
    	 * when it comes time to load our assets.
    	 */
        new WebpackAssetsManifest({}),

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
        new CleanObsoleteChunks({})

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