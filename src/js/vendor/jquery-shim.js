// ------------------------------------------------------------------------
// Project Name: jquery-shim.js
// ------------------------------------------------------------------------

!(function(window) {
  "use strict";

  // if jQuery is already loaded then exit shim
  if (window.jQuery) {
    return;
  }


  // ----------------------------------------------------------------------
  // Constants
  // ----------------------------------------------------------------------

  var class2type = {
    "[object Boolean]"  : "boolean",
    "[object Number]"   : "number",
    "[object String]"   : "string",
    "[object Function]" : "function",
    "[object Array]"    : "array",
    "[object Date]"     : "date",
    "[object RegExp]"   : "regexp",
    "[object Object]"   : "object",
    "[object Error]"    : "error"
  };
  var getProto             = Object.getPrototypeOf;
  var toString             = class2type.toString;
  var hasOwn               = class2type.hasOwnProperty;
  var fnToString           = hasOwn.toString;
  var ObjectFunctionString = fnToString.call(Object);


  // ----------------------------------------------------------------------
  // JQuery Functions
  // ----------------------------------------------------------------------

  var $ = {};

  $.type = function(obj) {
    if (!obj) {
      return obj + "";
    }

    return typeof obj === "object" || typeof obj === "function" ?
        class2type[toString.call(obj)] || "object" :
        typeof obj;
  };

  $.isWindow = function(obj) {
    return obj != null && obj === obj.window;
  };

  $.isFunction = function(obj) {
    return $.type(obj) === "function";
  };

  $.isArray = Array.isArray || function(obj) {
    return $.type(obj) === "array";
  };

  $.isNumeric = function(obj) {
    // As of jQuery 3.0, isNumeric is limited to
    // strings and numbers (primitives or objects)
    // that can be coerced to finite numbers (gh-2662)
    var type = $.type(obj);
    return (type === "number" || type === "string") &&

      // parseFloat NaNs numeric-cast false positives ("")
      // ...but misinterprets leading-number strings, particularly hex literals ("0x...")
      // subtraction forces infinities to NaN
      !isNaN(obj - parseFloat(obj));
  };

  $.isPlainObject = function(obj) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== "[object Object]") {
      return false;
    }

    proto = getProto(obj);

    // Objects with no prototype (e.g., `Object.create(null)`) are plain
    if (!proto) {
      return true;
    }

    // Objects with prototype are plain if they were constructed by a global Object function
    Ctor = hasOwn.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && fnToString.call(Ctor) === ObjectFunctionString;
  };

  $.isEmptyObject = function(obj) {
    /* eslint-disable no-unused-vars */
    var name;
    for (name in obj) {
      return false;
    }
    return true;
  };

  $.extend = function() {
    var options, name, src, copy, copyIsArray, clone,
      target = arguments[0] || {},
      i = 1,
      length = arguments.length,
      deep = false;

    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;

      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }

    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !$.isFunction(target)) {
      target = {};
    }

    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }

    for (; i < length; i++) {

      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {

        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];

          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }

          // Recurse if we're merging plain objects or arrays
          if (deep && copy && ($.isPlainObject(copy) ||
            (copyIsArray = Array.isArray(copy)))) {

            if (copyIsArray) {
              copyIsArray = false;
              clone = src && Array.isArray(src) ? src : [];

            } else {
              clone = src && $.isPlainObject(src) ? src : {};
            }

            // Never move original objects, clone them
            target[name] = $.extend(deep, clone, copy);

          // Don't bring in undefined values
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }

    // Return the modified object
    return target;
  };


  // ----------------------------------------------------------------------
  // Add $ Namespace
  // ----------------------------------------------------------------------

  window.$ = $;

})(window);

