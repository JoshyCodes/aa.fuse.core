/**
 * Webpack V4
 *
 * Awesome References
 * @Part 1 - https://hackernoon.com/a-tale-of-webpack-4-and-how-to-finally-configure-it-in-the-right-way-4e94c8e7e5c1
 * Part 2 - https://medium.freecodecamp.org/how-to-develop-react-js-apps-fast-using-webpack-4-3d772db957e4
 */
const path = require( 'path' );
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const config = {

	entry: {

		app: 	'./resources/assets/js/app.js',
		posts: './resources/assets/js/posts.js',


	},

	output: {

		path: path.resolve( __dirname, '_dist' ),
		filename: '[name].[chunkhash].bundle.js'

	},


	plugins: [

		new CleanWebpackPlugin('_dist', {} ),

		/**
		 * Create CSS files from our SCSS files
		 * and bundle them together.
		 * 
		 * @ref https://webpack.js.org/plugins/mini-css-extract-plugin/
		 */
  		new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].[contenthash].bundle.css',
        }),

        new WebpackMd5Hash(),

    	new BrowserSyncPlugin( {

                proxy: 'https://cf.dev',

                files: [
                    '**/*.php'
                ],

                reloadDelay: 0,
                  advanced: {
                    browserSync: {
                      // https://browsersync.io/docs/options
                      https: {
                        key: '~/Users/dream/Desktop/localdev/zzz-dev-ssl-certs/server.key',
                        cert: '~/Users/dream/Desktop/localdev/zzz-dev-ssl-certs/server.crt'
                      },
                    }
                  }
                // ---end insert
            }
        ),

	],

	module: {

		rules: [

			// Babel Loader
			{
				test:	/\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				}
			},

			// SCSS Loader
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

};

module.exports = config;