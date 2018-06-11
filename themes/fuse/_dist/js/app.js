/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./resources/assets/js/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/extract-css-chunks-webpack-plugin/dist/loader.js!./node_modules/css-loader/index.js??ref--5-3!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js??ref--5-5!./resources/assets/scss/app/app.scss":
/*!*************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/extract-css-chunks-webpack-plugin/dist/loader.js!./node_modules/css-loader??ref--5-3!./node_modules/postcss-loader/lib!./node_modules/sass-loader/lib/loader.js??ref--5-5!./resources/assets/scss/app/app.scss ***!
  \*************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by extract-css-chunks-webpack-plugin

/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/*!****************************************************!*\
  !*** ./node_modules/style-loader/lib/addStyles.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target) {
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(/*! ./urls */ "./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertInto + " " + options.insertAt.before);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/*!***********************************************!*\
  !*** ./node_modules/style-loader/lib/urls.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./resources/assets/icons/svg sync recursive \\.svg$":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg sync \.svg$ ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./arrow-l.svg": "./resources/assets/icons/svg/arrow-l.svg",
	"./arrow-m.svg": "./resources/assets/icons/svg/arrow-m.svg",
	"./caret-s.svg": "./resources/assets/icons/svg/caret-s.svg",
	"./clock-s.svg": "./resources/assets/icons/svg/clock-s.svg",
	"./clock-xs.svg": "./resources/assets/icons/svg/clock-xs.svg",
	"./donate-s.svg": "./resources/assets/icons/svg/donate-s.svg",
	"./donate-xs.svg": "./resources/assets/icons/svg/donate-xs.svg",
	"./download-s.svg": "./resources/assets/icons/svg/download-s.svg",
	"./email-s.svg": "./resources/assets/icons/svg/email-s.svg",
	"./email-xs.svg": "./resources/assets/icons/svg/email-xs.svg",
	"./facebook-s.svg": "./resources/assets/icons/svg/facebook-s.svg",
	"./instagram-s.svg": "./resources/assets/icons/svg/instagram-s.svg",
	"./like-s.svg": "./resources/assets/icons/svg/like-s.svg",
	"./like-xs.svg": "./resources/assets/icons/svg/like-xs.svg",
	"./menu-l.svg": "./resources/assets/icons/svg/menu-l.svg",
	"./menu-m.svg": "./resources/assets/icons/svg/menu-m.svg",
	"./notes-s.svg": "./resources/assets/icons/svg/notes-s.svg",
	"./notes-xs.svg": "./resources/assets/icons/svg/notes-xs.svg",
	"./phone-s.svg": "./resources/assets/icons/svg/phone-s.svg",
	"./phone-xs.svg": "./resources/assets/icons/svg/phone-xs.svg",
	"./play-l.svg": "./resources/assets/icons/svg/play-l.svg",
	"./play-m.svg": "./resources/assets/icons/svg/play-m.svg",
	"./search-s.svg": "./resources/assets/icons/svg/search-s.svg",
	"./search-xs.svg": "./resources/assets/icons/svg/search-xs.svg",
	"./share-s.svg": "./resources/assets/icons/svg/share-s.svg",
	"./twitter-s.svg": "./resources/assets/icons/svg/twitter-s.svg",
	"./user-s.svg": "./resources/assets/icons/svg/user-s.svg",
	"./user-xs.svg": "./resources/assets/icons/svg/user-xs.svg",
	"./view-s.svg": "./resources/assets/icons/svg/view-s.svg",
	"./view-xs.svg": "./resources/assets/icons/svg/view-xs.svg",
	"./youtube-s.svg": "./resources/assets/icons/svg/youtube-s.svg"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./resources/assets/icons/svg sync recursive \\.svg$";

/***/ }),

/***/ "./resources/assets/icons/svg/arrow-l.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/arrow-l.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "arrow-l-usage",
      viewBox: "0 0 66 66",
      url: __webpack_require__.p + "sprite.svg#arrow-l",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/arrow-m.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/arrow-m.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "arrow-m-usage",
      viewBox: "0 0 34 34",
      url: __webpack_require__.p + "sprite.svg#arrow-m",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/caret-s.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/caret-s.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "caret-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#caret-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/clock-s.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/clock-s.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "clock-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#clock-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/clock-xs.svg":
/*!*************************************************!*\
  !*** ./resources/assets/icons/svg/clock-xs.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "clock-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#clock-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/donate-s.svg":
/*!*************************************************!*\
  !*** ./resources/assets/icons/svg/donate-s.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "donate-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#donate-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/donate-xs.svg":
/*!**************************************************!*\
  !*** ./resources/assets/icons/svg/donate-xs.svg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "donate-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#donate-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/download-s.svg":
/*!***************************************************!*\
  !*** ./resources/assets/icons/svg/download-s.svg ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "download-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#download-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/email-s.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/email-s.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "email-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#email-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/email-xs.svg":
/*!*************************************************!*\
  !*** ./resources/assets/icons/svg/email-xs.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "email-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#email-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/facebook-s.svg":
/*!***************************************************!*\
  !*** ./resources/assets/icons/svg/facebook-s.svg ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "facebook-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#facebook-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/instagram-s.svg":
/*!****************************************************!*\
  !*** ./resources/assets/icons/svg/instagram-s.svg ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "instagram-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#instagram-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/like-s.svg":
/*!***********************************************!*\
  !*** ./resources/assets/icons/svg/like-s.svg ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "like-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#like-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/like-xs.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/like-xs.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "like-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#like-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/menu-l.svg":
/*!***********************************************!*\
  !*** ./resources/assets/icons/svg/menu-l.svg ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "menu-l-usage",
      viewBox: "0 0 66 66",
      url: __webpack_require__.p + "sprite.svg#menu-l",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/menu-m.svg":
/*!***********************************************!*\
  !*** ./resources/assets/icons/svg/menu-m.svg ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "menu-m-usage",
      viewBox: "0 0 34 34",
      url: __webpack_require__.p + "sprite.svg#menu-m",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/notes-s.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/notes-s.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "notes-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#notes-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/notes-xs.svg":
/*!*************************************************!*\
  !*** ./resources/assets/icons/svg/notes-xs.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "notes-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#notes-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/phone-s.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/phone-s.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "phone-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#phone-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/phone-xs.svg":
/*!*************************************************!*\
  !*** ./resources/assets/icons/svg/phone-xs.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "phone-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#phone-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/play-l.svg":
/*!***********************************************!*\
  !*** ./resources/assets/icons/svg/play-l.svg ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "play-l-usage",
      viewBox: "0 0 66 66",
      url: __webpack_require__.p + "sprite.svg#play-l",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/play-m.svg":
/*!***********************************************!*\
  !*** ./resources/assets/icons/svg/play-m.svg ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "play-m-usage",
      viewBox: "0 0 34 34",
      url: __webpack_require__.p + "sprite.svg#play-m",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/search-s.svg":
/*!*************************************************!*\
  !*** ./resources/assets/icons/svg/search-s.svg ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "search-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#search-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/search-xs.svg":
/*!**************************************************!*\
  !*** ./resources/assets/icons/svg/search-xs.svg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "search-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#search-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/share-s.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/share-s.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "share-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#share-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/twitter-s.svg":
/*!**************************************************!*\
  !*** ./resources/assets/icons/svg/twitter-s.svg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "twitter-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#twitter-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/user-s.svg":
/*!***********************************************!*\
  !*** ./resources/assets/icons/svg/user-s.svg ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "user-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#user-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/user-xs.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/user-xs.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "user-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#user-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/view-s.svg":
/*!***********************************************!*\
  !*** ./resources/assets/icons/svg/view-s.svg ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "view-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#view-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/view-xs.svg":
/*!************************************************!*\
  !*** ./resources/assets/icons/svg/view-xs.svg ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "view-xs-usage",
      viewBox: "0 0 14 14",
      url: __webpack_require__.p + "sprite.svg#view-xs",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/icons/svg/youtube-s.svg":
/*!**************************************************!*\
  !*** ./resources/assets/icons/svg/youtube-s.svg ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
      id: "youtube-s-usage",
      viewBox: "0 0 22 22",
      url: __webpack_require__.p + "sprite.svg#youtube-s",
      toString: function () {
        return this.url;
      }
    });

/***/ }),

/***/ "./resources/assets/js/app.js":
/*!************************************!*\
  !*** ./resources/assets/js/app.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(/*! ../scss/app/app.scss */ "./resources/assets/scss/app/app.scss");

__webpack_require__(/*! ../js/app/icons.js */ "./resources/assets/js/app/icons.js");

/***/ }),

/***/ "./resources/assets/js/app/icons.js":
/*!******************************************!*\
  !*** ./resources/assets/js/app/icons.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// Import all SVG Icons
__webpack_require__("./resources/assets/icons/svg sync recursive \\.svg$");

/***/ }),

/***/ "./resources/assets/scss/app/app.scss":
/*!********************************************!*\
  !*** ./resources/assets/scss/app/app.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../node_modules/extract-css-chunks-webpack-plugin/dist/loader.js!../../../../node_modules/css-loader??ref--5-3!../../../../node_modules/postcss-loader/lib!../../../../node_modules/sass-loader/lib/loader.js??ref--5-5!./app.scss */ "./node_modules/extract-css-chunks-webpack-plugin/dist/loader.js!./node_modules/css-loader/index.js??ref--5-3!./node_modules/postcss-loader/lib/index.js!./node_modules/sass-loader/lib/loader.js??ref--5-5!./resources/assets/scss/app/app.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}
    if(false) { var cssReload; }
  

/***/ })

/******/ });