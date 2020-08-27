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
/******/ 	__webpack_require__.p = "https://wallet.moneypot.com/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./node_modules/ts-loader/index.js!./src/wallet/workers/WorkerClaimable.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/buffer/index.js":
/*!**************************************!*\
  !*** ./node_modules/buffer/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/buffer/node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/buffer/node_modules/isarray/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/buffer/node_modules/isarray/index.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/moneypot-lib/dist/abstract-transfer.js":
/*!*************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/abstract-transfer.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __webpack_require__(/*! ./util/assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const signature_1 = __webpack_require__(/*! ./signature */ "./node_modules/moneypot-lib/dist/signature.js");
const POD = __webpack_require__(/*! ./pod */ "./node_modules/moneypot-lib/dist/pod.js");
const coin_1 = __webpack_require__(/*! ./coin */ "./node_modules/moneypot-lib/dist/coin.js");
const public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
const buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
class AbstractTransfer {
    constructor({ amount, authorization, fee, inputs }) {
        this.amount = amount;
        this.authorization = authorization;
        this.fee = fee;
        assert_1.default(isHashSorted(inputs));
        this.inputs = inputs;
    }
    static sort(hashable) {
        hashable.sort((a, b) => buffutils.compare(a.hash().buffer, b.hash().buffer));
    }
    static sortHashes(hashes) {
        hashes.sort((a, b) => buffutils.compare(a.buffer, b.buffer));
    }
    static transferHash(td) {
        return hash_1.default.fromMessage('Transfer', buffutils.fromUint64(td.amount), buffutils.fromUint64(td.fee), buffutils.fromUint64(td.inputs.length), ...td.inputs.map(i => i.buffer));
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            amount: this.amount,
            authorization: this.authorization ? this.authorization.toPOD() : null,
            claimant: this.claimant.toPOD(),
            fee: this.fee,
            inputs: this.inputs.map(i => i.toPOD()),
        };
    }
    get claimableAmount() {
        return this.inputAmount() - this.amount - this.fee;
    }
    inputAmount() {
        let amount = 0;
        for (const coin of this.inputs) {
            amount += coin.amount;
        }
        return amount;
    }
    get claimant() {
        return public_key_1.default.combine(this.inputs.map(coin => coin.owner));
    }
    isAuthorized() {
        if (!this.authorization) {
            return false;
        }
        const msg = hash_1.default.fromMessage('authorization', this.hash().buffer).buffer;
        return this.authorization.verify(msg, this.claimant);
    }
    authorize(combinedInputPrivkey) {
        this.authorization = signature_1.default.compute(hash_1.default.fromMessage('authorization', this.hash().buffer).buffer, combinedInputPrivkey);
    }
}
exports.default = AbstractTransfer;
function parseTransferData(data) {
    if (typeof data !== 'object') {
        return new Error('expected an object to deserialize a Transfer');
    }
    const amount = data.amount;
    if (!POD.isAmount(amount)) {
        return new Error('Transfer.fromPOD invalid amount');
    }
    const authorization = data.authorization !== null ? signature_1.default.fromPOD(data.authorization) : undefined;
    if (authorization instanceof Error) {
        return authorization;
    }
    const fee = data.fee;
    if (!POD.isAmount(fee)) {
        return new Error('Transfer.fromPOD invalid fee');
    }
    let inputAmount = 0;
    const inputs = [];
    for (const i of data.inputs) {
        const input = coin_1.default.fromPOD(i);
        if (input instanceof Error) {
            return input;
        }
        inputAmount += input.amount;
        inputs.push(input);
    }
    if (!isHashSorted(inputs)) {
        return new Error('inputs are not in sorted order');
    }
    if (inputAmount < amount + fee) {
        return new Error('not sourcing enough input for amount and fee');
    }
    return { amount, authorization, fee, inputs };
}
exports.parseTransferData = parseTransferData;
function isHashSorted(ts) {
    for (let i = 1; i < ts.length; i++) {
        const c = buffutils.compare(ts[i - 1].hash().buffer, ts[i].hash().buffer);
        if (c > 0) {
            return false;
        }
    }
    return true;
}
function isSorted(ts) {
    for (let i = 1; i < ts.length; i++) {
        const c = buffutils.compare(ts[i - 1].buffer, ts[i].buffer);
        if (c > 0) {
            return false;
        }
    }
    return true;
}
// TODO: these sort can be optimized to check if it's already sorted, if so, just return original
function hashSort(ts) {
    return [...ts].sort((a, b) => buffutils.compare(a.hash().buffer, b.hash().buffer));
}
function sort(ts) {
    return [...ts].sort((a, b) => buffutils.compare(a.buffer, b.buffer));
}
//# sourceMappingURL=abstract-transfer.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/acknowledged.js":
/*!********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/acknowledged.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const signature_1 = __webpack_require__(/*! ./signature */ "./node_modules/moneypot-lib/dist/signature.js");
const hookout_1 = __webpack_require__(/*! ./hookout */ "./node_modules/moneypot-lib/dist/hookout.js");
const fee_bump_1 = __webpack_require__(/*! ./fee-bump */ "./node_modules/moneypot-lib/dist/fee-bump.js");
const lightning_payment_1 = __webpack_require__(/*! ./lightning-payment */ "./node_modules/moneypot-lib/dist/lightning-payment.js");
const lightning_invoice_1 = __webpack_require__(/*! ./lightning-invoice */ "./node_modules/moneypot-lib/dist/lightning-invoice.js");
const hookin_1 = __webpack_require__(/*! ./hookin */ "./node_modules/moneypot-lib/dist/hookin.js");
const claimable_1 = __webpack_require__(/*! ./claimable */ "./node_modules/moneypot-lib/dist/claimable.js");
const status_1 = __webpack_require__(/*! ./status */ "./node_modules/moneypot-lib/dist/status/index.js");
const abstract_status_1 = __webpack_require__(/*! ./status/abstract-status */ "./node_modules/moneypot-lib/dist/status/abstract-status.js");
// T is what is acknowledged, a P is the type of a  T.toPOD()
// type inference of this thing kind of sucks. So it's recommended to use
// x: AcknowledgedX = hi.Acknowledged(....)  to guide it
class Acknowledged {
    // Warning: The constructor does not validate the signature
    constructor(contents, acknowledgement, toPOD) {
        this.acknowledgement = acknowledgement;
        this.contents = contents;
        this.toPOD = () => ({
            acknowledgement: this.acknowledgement.toPOD(),
            ...toPOD(this.contents),
        });
    }
    static acknowledge(contents, acknowledgeKey, toPOD) {
        const hash = contents.hash();
        const acknowledgement = signature_1.default.compute(hash.buffer, acknowledgeKey);
        return new Acknowledged(contents, acknowledgement, toPOD);
    }
    // Need to check .verify()
    static fromPOD(creator, toPOD, data) {
        const contents = creator(data);
        if (contents instanceof Error) {
            throw contents;
        }
        const acknowledgement = signature_1.default.fromPOD(data.acknowledgement);
        if (acknowledgement instanceof Error) {
            return acknowledgement;
        }
        return new Acknowledged(contents, acknowledgement, toPOD);
    }
    verify(acknowledgementPublicKey) {
        const hash = this.contents.hash();
        return this.acknowledgement.verify(hash.buffer, acknowledgementPublicKey);
    }
    hash() {
        return this.contents.hash();
    }
}
exports.default = Acknowledged;
function hookinFromPod(x) {
    return Acknowledged.fromPOD(hookin_1.default.fromPOD, (d) => d.toPOD(), x);
}
exports.hookinFromPod = hookinFromPod;
function feeBumpFromPod(x) {
    return Acknowledged.fromPOD(fee_bump_1.default.fromPOD, (d) => d.toPOD(), x);
}
exports.feeBumpFromPod = feeBumpFromPod;
function lightningPaymentFromPod(x) {
    return Acknowledged.fromPOD(lightning_payment_1.default.fromPOD, (d) => d.toPOD(), x);
}
exports.lightningPaymentFromPod = lightningPaymentFromPod;
function lightningInvoiceFromPod(x) {
    return Acknowledged.fromPOD(lightning_invoice_1.default.fromPOD, (d) => d.toPOD(), x);
}
exports.lightningInvoiceFromPod = lightningInvoiceFromPod;
function hookoutFromPod(x) {
    return Acknowledged.fromPOD(hookout_1.default.fromPOD, (d) => d.toPOD(), x);
}
exports.hookoutFromPod = hookoutFromPod;
function claimableFromPOD(x) {
    return Acknowledged.fromPOD(claimable_1.claimableFromPOD, claimable_1.claimableToPOD, x);
}
exports.claimableFromPOD = claimableFromPOD;
function statusFromPOD(x) {
    return Acknowledged.fromPOD(status_1.statusFromPOD, status_1.statusToPOD, x);
}
exports.statusFromPOD = statusFromPOD;
function acknowledge(x, acknowledgeKey) {
    if (x instanceof hookout_1.default ||
        x instanceof fee_bump_1.default ||
        x instanceof lightning_payment_1.default ||
        x instanceof lightning_invoice_1.default ||
        x instanceof hookin_1.default) {
        return Acknowledged.acknowledge(x, acknowledgeKey, claimable_1.claimableToPOD);
    }
    else if (x instanceof abstract_status_1.default) {
        return Acknowledged.acknowledge(x, acknowledgeKey, status_1.statusToPOD);
    }
    else {
        return Acknowledged.acknowledge(x, acknowledgeKey, (z) => z.toPOD());
    }
}
exports.acknowledge = acknowledge;
//# sourceMappingURL=acknowledged.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/blind.js":
/*!*************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/blind.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const blinded_message_1 = __webpack_require__(/*! ./blinded-message */ "./node_modules/moneypot-lib/dist/blinded-message.js");
const blinded_signature_1 = __webpack_require__(/*! ./blinded-signature */ "./node_modules/moneypot-lib/dist/blinded-signature.js");
const signature_1 = __webpack_require__(/*! ./signature */ "./node_modules/moneypot-lib/dist/signature.js");
const ecc = __webpack_require__(/*! ./util/ecc */ "./node_modules/moneypot-lib/dist/util/ecc/index.js");
function blindMessage(secretRandomSeed, nonce, signer, message) {
    const [unblinder, bm] = ecc.blindMessage(secretRandomSeed, nonce, signer, message);
    return [unblinder, new blinded_message_1.default(bm.c)];
}
exports.blindMessage = blindMessage;
function blindSign(signer, nonce, blindedMessage) {
    const bs = ecc.blindSign(signer.scalar, nonce.scalar, blindedMessage);
    return new blinded_signature_1.default(bs.s);
}
exports.blindSign = blindSign;
function unblind(unblinder, blindedSig) {
    const sig = ecc.unblind(unblinder, blindedSig);
    return new signature_1.default(sig.r, sig.s);
}
exports.unblind = unblind;
//# sourceMappingURL=blind.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/blinded-message.js":
/*!***********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/blinded-message.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bech32 = __webpack_require__(/*! ./util/bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const ecc = __webpack_require__(/*! ./util/ecc/index */ "./node_modules/moneypot-lib/dist/util/ecc/index.js");
const serializedPrefix = 'bmmp'; // blinded message moneypot
class BlindedMessage {
    constructor(challenge) {
        this.c = challenge;
    }
    static fromPOD(data) {
        if (typeof data !== 'string') {
            return new Error('BlindedMessage.fromPOD expected a string');
        }
        const { prefix, words } = bech32.decode(data);
        if (prefix !== serializedPrefix) {
            return new Error('Got prefix: ' + prefix + ' but expected ' + serializedPrefix);
        }
        return BlindedMessage.fromBytes(bech32.fromWords(words));
    }
    static fromBytes(bytes) {
        const c = ecc.Scalar.fromBytes(bytes);
        if (c instanceof Error) {
            return c;
        }
        return new BlindedMessage(c);
    }
    get buffer() {
        return ecc.Scalar.toBytes(this.c);
    }
    toPOD() {
        return bech32.encode(serializedPrefix, bech32.toWords(this.buffer));
    }
}
exports.default = BlindedMessage;
//# sourceMappingURL=blinded-message.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/blinded-signature.js":
/*!*************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/blinded-signature.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert = __webpack_require__(/*! ./util/assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const ecc = __webpack_require__(/*! ./util/ecc */ "./node_modules/moneypot-lib/dist/util/ecc/index.js");
const bech32 = __webpack_require__(/*! ./util/bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const serializedPrefix = 'bsmp'; // blinded signature moneypot
class BlindedSignature {
    constructor(s) {
        this.s = s;
    }
    static fromPOD(data) {
        if (typeof data !== 'string') {
            return new Error('BlindedSignature.fromPOD expected a string');
        }
        const { prefix, words } = bech32.decode(data);
        if (prefix !== serializedPrefix) {
            return new Error('Got prefix: ' + prefix + ' but expected ' + serializedPrefix);
        }
        return BlindedSignature.fromBytes(bech32.fromWords(words));
    }
    static fromBytes(bytes) {
        assert.equal(bytes.length, 32);
        const s = ecc.Scalar.fromBytes(bytes);
        if (s instanceof Error) {
            return s;
        }
        return new BlindedSignature(s);
    }
    get buffer() {
        return ecc.Scalar.toBytes(this.s);
    }
    toPOD() {
        return bech32.encode(serializedPrefix, bech32.toWords(this.buffer));
    }
}
exports.default = BlindedSignature;
//# sourceMappingURL=blinded-signature.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/bolt11.js":
/*!**************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/bolt11.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
const public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
const bech32 = __webpack_require__(/*! ./util/bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const bitcoin_address_1 = __webpack_require__(/*! ./util/bitcoin-address */ "./node_modules/moneypot-lib/dist/util/bitcoin-address.js");
const sha256_1 = __webpack_require__(/*! ./util/bcrypto/sha256 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js");
const ecc = __webpack_require__(/*! ./util/ecc */ "./node_modules/moneypot-lib/dist/util/ecc/index.js");
const signature_1 = __webpack_require__(/*! ./util/ecc/signature */ "./node_modules/moneypot-lib/dist/util/ecc/signature.js");
const signature_2 = __webpack_require__(/*! ./signature */ "./node_modules/moneypot-lib/dist/signature.js");
const bs58check = __webpack_require__(/*! ./util/bs58check */ "./node_modules/moneypot-lib/dist/util/bs58check.js");
const MAX_MILLISATS = BigInt('2100000000000000000');
const MILLISATS_PER_BTC = BigInt(1e11);
const MILLISATS_PER_MILLIBTC = BigInt(1e8);
const MILLISATS_PER_MICROBTC = BigInt(1e5);
const MILLISATS_PER_NANOBTC = BigInt(1e2);
const PICOBTC_PER_MILLISATS = BigInt(10);
// const DIVISORS = {
//   m: BigInt(1e3),
//   u: BigInt(1e6),
//   n: BigInt(1e9),
//   p: BigInt(1e12)
// }
function DIVISORS(l) {
    switch (l) {
        case 'm':
            return BigInt(1e3);
        case 'u':
            return BigInt(1e6);
        case 'n':
            return BigInt(1e9);
        case 'p':
            return BigInt(1e12);
        default:
            throw new Error('unknown denom: ' + l);
    }
}
function hrpToMillisat(hrpString) {
    let divisor, value;
    if (hrpString.slice(-1).match(/^[munp]$/)) {
        divisor = hrpString.slice(-1);
        value = hrpString.slice(0, -1);
    }
    else if (hrpString.slice(-1).match(/^[^munp0-9]$/)) {
        throw new Error('Not a valid multiplier for the amount');
    }
    else {
        value = hrpString;
    }
    if (!value.match(/^\d+$/))
        throw new Error('Not a valid human readable amount');
    let valueBN = BigInt(value);
    let millisatoshisBN = divisor ? (valueBN * MILLISATS_PER_BTC) / DIVISORS(divisor) : valueBN * MILLISATS_PER_BTC;
    if ((divisor === 'p' && valueBN % BigInt(10) != BigInt(0)) || millisatoshisBN > MAX_MILLISATS) {
        throw new Error('Amount is outside of valid range');
    }
    return millisatoshisBN;
}
exports.hrpToMillisat = hrpToMillisat;
function hrpToSat(hrpString) {
    let millisatoshisBN = hrpToMillisat(hrpString);
    if (millisatoshisBN % BigInt(1000) !== BigInt(0)) {
        throw new Error('Amount is outside of valid range');
    }
    return millisatoshisBN / BigInt(1000);
}
exports.hrpToSat = hrpToSat;
function wordsToIntBE(words) {
    let total = 0;
    for (const [index, item] of words.reverse().entries()) {
        total += item * 32 ** index;
    }
    return total;
}
function wordsToBuffer(words, trim) {
    let buffer = bech32.convert(words, 5, 8, true);
    if (trim && (words.length * 5) % 8 !== 0) {
        buffer = buffer.slice(0, -1);
    }
    return buffer;
}
const unknownTagName = 'unknownTag';
const TAGPARSERS = new Map([
    [1, (words) => buffutils.toHex(wordsToBuffer(words, true))],
    [13, (words) => buffutils.toString(wordsToBuffer(words, true))],
    [19, (words) => buffutils.toHex(wordsToBuffer(words, true))],
    [23, (words) => buffutils.toHex(wordsToBuffer(words, true))],
    [6, wordsToIntBE],
    [24, wordsToIntBE],
    [9, fallbackAddressParser],
    [3, routingInfoParser],
]);
function getUnknownParser(tagCode) {
    return (words) => ({
        tagCode,
        words: bech32.encode('unknown', words),
    });
}
// see encoder for details
function fallbackAddressParser(words, network) {
    let version = words[0];
    words = words.slice(1);
    let addressHash = wordsToBuffer(words, true);
    let address = null;
    switch (version) {
        case 17:
            address = bitcoin_address_1.toBase58Check(addressHash, network.pubKeyHash);
            break;
        case 18:
            address = bitcoin_address_1.toBase58Check(addressHash, network.scriptHash);
            break;
        case 0:
            address = bitcoin_address_1.toBech32(addressHash, version, network.bech32);
            break;
        default:
            throw new Error('unknown version: ' + version);
    }
    return {
        code: version,
        address,
        addressHash: buffutils.toHex(addressHash),
    };
}
// first convert from words to buffer, trimming padding where necessary
// parse in 51 byte chunks. See encoder for details.
function routingInfoParser(words) {
    let routes = [];
    let pubkey, shortChannelId, feeBaseMSats, feeProportionalMillionths, cltvExpiryDelta;
    let routesBuffer = wordsToBuffer(words, true);
    while (routesBuffer.length > 0) {
        pubkey = buffutils.toHex(routesBuffer.slice(0, 33)); // 33 bytes
        shortChannelId = buffutils.toHex(routesBuffer.slice(33, 41)); // 8 bytes
        feeBaseMSats = Number.parseInt(buffutils.toHex(routesBuffer.slice(41, 45)), 16); // 4 bytes
        feeProportionalMillionths = Number.parseInt(buffutils.toHex(routesBuffer.slice(45, 49)), 16); // 4 bytes
        cltvExpiryDelta = Number.parseInt(buffutils.toHex(routesBuffer.slice(49, 51)), 16); // 2 bytes
        routesBuffer = routesBuffer.slice(51);
        routes.push({
            pubkey,
            short_channel_id: shortChannelId,
            fee_base_msat: feeBaseMSats,
            fee_proportional_millionths: feeProportionalMillionths,
            cltv_expiry_delta: cltvExpiryDelta,
        });
    }
    return routes;
}
const BECH32CODES = {
    bc: 'bitcoin',
    tb: 'testnet',
    bcrt: 'regtest',
    ltc: 'litecoin',
    tltc: 'litecoin_testnet',
};
const TAGCODES = {
    payment_hash: 1,
    description: 13,
    payee_node_key: 19,
    purpose_commit_hash: 23,
    expire_time: 6,
    min_final_cltv_expiry: 24,
    fallback_address: 9,
    routing_info: 3,
};
// reverse the keys and values of TAGCODES and insert into TAGNAMES
const TAGNAMES = new Map();
for (const [k, v] of Object.entries(TAGCODES)) {
    TAGNAMES.set(v, k);
}
const bitcoinInfo = {
    hashGenesisBlock: '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f',
    port: 8333,
    portRpc: 8332,
    protocol: { magic: 3652501241 },
    bech32: 'bc',
    seedsDns: [
        'seed.bitcoin.sipa.be',
        'dnsseed.bluematt.me',
        'seed.bitcoinstats.com',
        'seed.bitcoin.jonasschnelli.ch',
        'seed.btc.petertodd.org',
        'seed.bitcoin.sprovoost.nl',
        'dnsseed.emzy.de',
    ],
    versions: { bip32: { private: 76066276, public: 76067358 }, bip44: 0, private: 128, public: 0, scripthash: 5 },
    name: 'Bitcoin',
    per1: 100000000,
    unit: 'BTC',
    messagePrefix: '\\u0018Bitcoin Signed Message:\\n',
    testnet: false,
    bip32: { public: 76067358, private: 76066276 },
    pubKeyHash: 0,
    scriptHash: 5,
    wif: 128,
    dustThreshold: null,
};
const testnetInfo = {
    hashGenesisBlock: '000000000933ea01ad0ee984209779baaec3ced90fa3f408719526f8d77f4943',
    port: 18333,
    portRpc: 18332,
    protocol: { magic: 118034699 },
    bech32: 'tb',
    seedsDns: [
        'testnet-seed.alexykot.me',
        'testnet-seed.bitcoin.schildbach.de',
        'testnet-seed.bitcoin.petertodd.org',
        'testnet-seed.bluematt.me',
    ],
    versions: { bip32: { private: 70615956, public: 70617039 }, bip44: 1, private: 239, public: 111, scripthash: 196 },
    name: 'Bitcoin',
    per1: 100000000,
    unit: 'BTC',
    messagePrefix: '\\u0018Bitcoin Signed Message:\\n',
    testnet: true,
    bip32: { public: 70617039, private: 70615956 },
    pubKeyHash: 111,
    scriptHash: 196,
    wif: 239,
    dustThreshold: null,
};
function tagsItems(tags, tagName) {
    let tag = tags.filter((item) => item.tagName === tagName);
    let data = tag.length > 0 ? tag[0].data : undefined;
    return data;
}
function tagsContainItem(tags, tagName) {
    return tagsItems(tags, tagName) !== undefined;
}
function isDefined(t) {
    if (t === undefined) {
        throw new Error('unexpected undefined');
    }
    return t;
}
function decodeBolt11(paymentRequest) {
    if (paymentRequest.slice(0, 2).toLowerCase() !== 'ln') {
        return new Error('Not a proper lightning payment request');
    }
    let decoded;
    try {
        decoded = bech32.decode(paymentRequest);
    }
    catch (err) {
        if (!(err instanceof Error)) {
            err = new Error(err);
        }
        return err;
    }
    let words = Uint8Array.from(decoded.words);
    paymentRequest = paymentRequest.toLowerCase();
    let sigWords = words.slice(-104);
    // grabbing a copy of the words for later, words will be sliced as we parse.
    let wordsNoSig = words.slice(0, -104);
    words = words.slice(0, -104);
    let sigBuffer = bech32.fromWords(sigWords);
    let recoveryFlag = sigBuffer.slice(-1)[0];
    sigBuffer = sigBuffer.slice(0, -1);
    if (!(recoveryFlag in [0, 1, 2, 3]) || sigBuffer.length !== 64) {
        return new Error('Signature is missing or incorrect');
    }
    // Without reverse lookups, can't say that the multipier at the end must
    // have a number before it, so instead we parse, and if the second group
    // doesn't have anything, there's a good chance the last letter of the
    // coin type got captured by the third group, so just re-regex without
    // the number.
    let prefixMatches = decoded.prefix.match(/^ln(\S+?)(\d*)([a-zA-Z]?)$/);
    if (prefixMatches && !prefixMatches[2])
        prefixMatches = decoded.prefix.match(/^ln(\S+)$/);
    if (!prefixMatches) {
        return new Error('Not a proper lightning payment request');
    }
    let coinType;
    let coinNetwork;
    let p1 = prefixMatches[1];
    if (p1 === 'bc') {
        coinType = 'bitcoin';
        coinNetwork = bitcoinInfo;
    }
    else if (p1 == 'tb') {
        coinType = 'testnet';
        coinNetwork = testnetInfo;
    }
    else {
        return new Error('Unknown coin bech32 prefix: ' + p1);
    }
    let value = prefixMatches[2];
    let satoshis, millisatoshis;
    if (value) {
        let divisor = prefixMatches[3];
        try {
            satoshis = Number(hrpToSat(value + divisor));
        }
        catch { }
        millisatoshis = hrpToMillisat(value + divisor);
    }
    else {
        satoshis = undefined;
        millisatoshis = undefined;
    }
    // reminder: left padded 0 bits
    let timestamp = wordsToIntBE(words.slice(0, 7));
    let timestampString = new Date(timestamp * 1000).toISOString();
    words = words.slice(7); // trim off the left 7 words
    let tags = [];
    let tagName, parser, tagLength, tagWords;
    // we have no tag count to go on, so just keep hacking off words
    // until we have none.
    while (words.length > 0) {
        let tagCode = words[0];
        tagName = TAGNAMES.get(tagCode) || unknownTagName;
        parser = TAGPARSERS.get(tagCode) || getUnknownParser(tagCode);
        words = words.slice(1);
        tagLength = wordsToIntBE(words.slice(0, 2));
        words = words.slice(2);
        tagWords = words.slice(0, tagLength);
        words = words.slice(tagLength);
        // See: parsers for more comments
        tags.push({
            tagName,
            data: parser(tagWords, coinNetwork),
        });
    }
    let timeExpireDate, timeExpireDateString;
    // be kind and provide an absolute expiration date.
    // good for logs
    let expirySeconds = 3600; // 1 hour
    if (tagsContainItem(tags, isDefined(TAGNAMES.get(6)))) {
        expirySeconds = isDefined(tagsItems(tags, isDefined(TAGNAMES.get(6))));
    }
    timeExpireDate = timestamp + expirySeconds;
    timeExpireDateString = new Date(timeExpireDate * 1000).toISOString();
    let toSign = buffutils.concat(buffutils.fromString(decoded.prefix), bech32.convert(wordsNoSig, 5, 8, true));
    let payReqHash = sha256_1.default.digest(toSign);
    let sig = signature_2.default.fromBytes(sigBuffer);
    if (sig instanceof Error) {
        return sig;
    }
    let sigPubkeyPoint = signature_1.ecdsaRecover(payReqHash, sig, recoveryFlag);
    let payeeNodeKey = buffutils.toHex(new public_key_1.default(sigPubkeyPoint.x, sigPubkeyPoint.y).buffer);
    const payee = tagsItems(tags, isDefined(TAGNAMES.get(19)));
    if (payee && payee !== payeeNodeKey) {
        return new Error('Lightning Payment Request signature pubkey does not match payee pubkey');
    }
    let finalResult = {
        paymentRequest,
        complete: true,
        prefix: decoded.prefix,
        wordsTemp: bech32.encode('temp', buffutils.concat(wordsNoSig, sigWords)),
        coinType,
        satoshis,
        millisatoshis,
        timestamp,
        timestampString,
        timeExpireDate,
        timeExpireDateString,
        payeeNodeKey,
        signature: buffutils.toHex(sigBuffer),
        recoveryFlag,
        tags,
    };
    return orderKeys(finalResult);
}
exports.decodeBolt11 = decodeBolt11;
function orderKeys(unorderedObj) {
    let orderedObj = {};
    Object.keys(unorderedObj)
        .sort()
        .forEach(key => {
        orderedObj[key] = unorderedObj[key];
    });
    return orderedObj;
}
function satToHrp(satoshis) {
    if (!satoshis.toString().match(/^\d+$/)) {
        throw new Error('satoshis must be an integer');
    }
    let millisatoshisBN = BigInt(satoshis);
    return millisatToHrp(millisatoshisBN * BigInt(1000));
}
exports.satToHrp = satToHrp;
function millisatToHrp(millisatoshis) {
    if (!millisatoshis.toString().match(/^\d+$/)) {
        throw new Error('millisatoshis must be an integer');
    }
    let millisatoshisString = millisatoshis.toString();
    let millisatoshisLength = millisatoshisString.length;
    let divisorString, valueString;
    if (millisatoshisLength > 11 && /0{11}$/.test(millisatoshisString)) {
        divisorString = '';
        valueString = (millisatoshis / MILLISATS_PER_BTC).toString();
    }
    else if (millisatoshisLength > 8 && /0{8}$/.test(millisatoshisString)) {
        divisorString = 'm';
        valueString = (millisatoshis / MILLISATS_PER_MILLIBTC).toString();
    }
    else if (millisatoshisLength > 5 && /0{5}$/.test(millisatoshisString)) {
        divisorString = 'u';
        valueString = (millisatoshis / MILLISATS_PER_MICROBTC).toString();
    }
    else if (millisatoshisLength > 2 && /0{2}$/.test(millisatoshisString)) {
        divisorString = 'n';
        valueString = (millisatoshis / MILLISATS_PER_NANOBTC).toString();
    }
    else {
        divisorString = 'p';
        valueString = (millisatoshis * PICOBTC_PER_MILLISATS).toString();
    }
    return valueString + divisorString;
}
exports.millisatToHrp = millisatToHrp;
function unknownEncoder(data) {
    data.words = bech32.decode(data.words).words;
    return data;
}
const TAGENCODERS = {
    payment_hash: hexToWord,
    description: textToWord,
    payee_node_key: hexToWord,
    purpose_commit_hash: purposeCommitEncoder,
    expire_time: intBEToWords,
    min_final_cltv_expiry: intBEToWords,
    fallback_address: fallbackAddressEncoder,
    routing_info: routingInfoEncoder,
};
function hexToWord(hex) {
    let buffer = buffutils.fromHex(hex);
    if (buffer instanceof Error) {
        throw new Error('invalid hex');
    }
    return bech32.toWords(buffer);
}
function textToWord(text) {
    let buffer = buffutils.fromString(text);
    let words = bech32.toWords(buffer);
    return words;
}
// if text, return the sha256 hash of the text as words.
// if hex, return the words representation of that data.
function purposeCommitEncoder(data) {
    let buffer = buffutils.fromHex(data);
    if (buffer instanceof Error) {
        buffer = sha256_1.default.digest(buffutils.fromString(data));
    }
    return bech32.toWords(buffer);
}
// the code is the witness version OR 17 for P2PKH OR 18 for P2SH
// anything besides code 17 or 18 should be bech32 encoded address.
// 1 word for the code, and right pad with 0 if necessary for the addressHash
// (address parsing for encode is done in the encode function)
function fallbackAddressEncoder(data, network) {
    return buffutils.concat(Uint8Array.of(data.code), hexToWord(data.addressHash));
}
// routing info is encoded first as a large buffer
// 51 bytes for each channel
// 33 byte pubkey, 8 byte short_channel_id, 4 byte millisatoshi base fee (left padded)
// 4 byte fee proportional millionths and a 2 byte left padded CLTV expiry delta.
// after encoding these 51 byte chunks and concatenating them
// convert to words right padding 0 bits.
function routingInfoEncoder(datas) {
    let buffer = Buffer.from([]);
    datas.forEach(data => {
        const pubkeybuff = buffutils.fromHex(data.pubkey);
        if (pubkeybuff instanceof Error) {
            throw new Error('data.pubkey was not hex');
        }
        const shortChannelBuff = buffutils.fromHex(data.short_channel_id);
        if (shortChannelBuff instanceof Error) {
            throw new Error('data.hexToBuffer was not hex');
        }
        buffer = Buffer.concat([buffer, pubkeybuff]);
        buffer = Buffer.concat([buffer, shortChannelBuff]);
        buffer = Buffer.concat([buffer, Buffer.from([0, 0, 0].concat(...intBEToWords(data.fee_base_msat, 8)).slice(-4))]);
        buffer = Buffer.concat([
            buffer,
            Buffer.from([0, 0, 0].concat(...intBEToWords(data.fee_proportional_millionths, 8)).slice(-4)),
        ]);
        buffer = Buffer.concat([buffer, Buffer.from([0].concat(...intBEToWords(data.cltv_expiry_delta, 8)).slice(-2))]);
    });
    return bech32.toWords(buffer);
}
function encodeBolt11(paymentRequest) {
    let data = { ...paymentRequest }; // make a copy, but careful as it's not a deep copy
    data.tags = [...paymentRequest.tags]; // deep copy the tags
    let canReconstruct = !(data.signature === undefined || data.recoveryFlag === undefined);
    // if no cointype is defined, set to testnet
    let coinTypeObj;
    if (data.coinType === undefined && !canReconstruct) {
        data.coinType = 'testnet';
        coinTypeObj = testnetInfo;
    }
    else if (data.coinType === undefined && canReconstruct) {
        throw new Error('Need coinType for proper payment request reconstruction');
    }
    else {
        if (data.coinType === 'bitcoin') {
            coinTypeObj = bitcoinInfo;
        }
        else if (data.coinType === 'testnet') {
            coinTypeObj = testnetInfo;
        }
        else {
            throw new Error('Unknown coin type: ' + data.coinType);
        }
    }
    // use current time as default timestamp (seconds)
    if (data.timestamp === undefined && !canReconstruct) {
        data.timestamp = Math.floor(new Date().getTime() / 1000);
    }
    else if (data.timestamp === undefined && canReconstruct) {
        throw new Error('Need timestamp for proper payment request reconstruction');
    }
    if (data.tags === undefined)
        throw new Error('Payment Requests need tags array');
    // If no payment hash, fail
    if (!tagsContainItem(data.tags, isDefined(TAGNAMES.get(1)))) {
        throw new Error('Lightning Payment Request needs a payment hash');
    }
    // If no description or purpose commit hash/message, fail
    if (!tagsContainItem(data.tags, isDefined(TAGNAMES.get(13))) &&
        !tagsContainItem(data.tags, isDefined(TAGNAMES.get(23)))) {
        data.tags.push({
            tagName: isDefined(TAGNAMES.get(13)),
            data: '',
        });
    }
    // If a description exists, check to make sure the buffer isn't greater than
    // 639 bytes long, since 639 * 8 / 5 = 1023 words (5 bit) when padded
    if (tagsContainItem(data.tags, isDefined(TAGNAMES.get(13))) &&
        Buffer.from(tagsItems(data.tags, isDefined(TAGNAMES.get(13))), 'utf8').length > 639) {
        throw new Error('Description is too long: Max length 639 bytes');
    }
    // if there's no expire time, and it is not reconstructing (must have private key)
    // default to adding a 3600 second expire time (1 hour)
    if (!tagsContainItem(data.tags, isDefined(TAGNAMES.get(6))) && !canReconstruct) {
        data.tags.push({
            tagName: isDefined(TAGNAMES.get(6)),
            data: 3600,
        });
    }
    // if there's no minimum cltv time, and it is not reconstructing (must have private key)
    // default to adding a 9 block minimum cltv time (90 minutes for bitcoin)
    if (!tagsContainItem(data.tags, isDefined(TAGNAMES.get(24))) && !canReconstruct) {
        data.tags.push({
            tagName: isDefined(TAGNAMES.get(24)),
            data: 9,
        });
    }
    let nodePublicKey, tagNodePublicKey;
    // If there is a payee_node_key tag convert to buffer
    if (tagsContainItem(data.tags, isDefined(TAGNAMES.get(19)))) {
        tagNodePublicKey = buffutils.fromHex(tagsItems(data.tags, isDefined(TAGNAMES.get(19))));
        if (tagNodePublicKey instanceof Error) {
            throw new Error('tag19 was not hex encoded');
        }
    }
    // If there is payeeNodeKey attribute, convert to buffer
    if (data.payeeNodeKey) {
        nodePublicKey = buffutils.fromHex(data.payeeNodeKey);
        if (nodePublicKey instanceof Error) {
            throw new Error('payeeNodeKey was not hex encoded');
        }
    }
    if (nodePublicKey && tagNodePublicKey && !buffutils.equal(tagNodePublicKey, nodePublicKey)) {
        throw new Error('payeeNodeKey and tag payee node key do not match');
    }
    // in case we have one or the other, make sure it's in nodePublicKey
    nodePublicKey = nodePublicKey || tagNodePublicKey;
    if (nodePublicKey) {
        data.payeeNodeKey = buffutils.toHex(nodePublicKey);
    }
    let code, addressHash, address;
    // If there is a fallback address tag we must check it is valid
    if (tagsContainItem(data.tags, isDefined(TAGNAMES.get(9)))) {
        let addrData = tagsItems(data.tags, isDefined(TAGNAMES.get(9)));
        // Most people will just provide address so Hash and code will be undefined here
        address = addrData.address;
        addressHash = addrData.addressHash;
        code = addrData.code;
        if (addressHash === undefined || code === undefined) {
            let bech32addr, base58addr;
            try {
                const payload = bech32.decode(address);
                bech32addr = {
                    hash: bech32.fromWords(payload.words.slice(1)),
                    version: payload.words[0],
                    prefix: payload.prefix,
                };
                code = bech32addr.version;
                addressHash = bech32addr.hash;
            }
            catch (e) {
                try {
                    const payload = bs58check.decode(address); // this throws
                    if (payload.length < 21)
                        throw new Error(address + ' is too short');
                    if (payload.length > 21)
                        throw new Error(address + ' is too long');
                    base58addr = {
                        version: payload[0],
                        hash: payload.slice(1),
                    };
                    if (base58addr.version === coinTypeObj.pubKeyHash) {
                        code = 17;
                    }
                    else if (base58addr.version === coinTypeObj.scriptHash) {
                        code = 18;
                    }
                    else {
                        throw new Error('unrecognized address version: ' + base58addr.version);
                    }
                    addressHash = base58addr.hash;
                }
                catch (f) {
                    throw new Error('Fallback address (' + address + ') is unknown');
                }
            }
            if (bech32addr && !(bech32addr.version !== 0)) {
                throw new Error('Fallback address witness version is unknown');
            }
            if (bech32addr && bech32addr.prefix !== coinTypeObj.bech32) {
                throw new Error('Fallback address network type does not match payment request network type');
            }
            if (base58addr &&
                base58addr.version !== coinTypeObj.pubKeyHash &&
                base58addr.version !== coinTypeObj.scriptHash) {
                throw new Error('Fallback address version (base58) is unknown or the network type is incorrect');
            }
            // FIXME: If addressHash or code is missing, add them to the original Object
            // after parsing the address value... this changes the actual attributes of the data object.
            // Not very clean.
            // Without this, a person can not specify a fallback address tag with only the address key.
            addrData.addressHash = buffutils.toHex(addressHash);
            addrData.code = code;
        }
    }
    // If there is route info tag, check that each route has all 4 necessary info
    if (tagsContainItem(data.tags, isDefined(TAGNAMES.get(3)))) {
        let routingInfo = tagsItems(data.tags, isDefined(TAGNAMES.get(3)));
        routingInfo.forEach((route) => {
            if (route.pubkey === undefined ||
                route.short_channel_id === undefined ||
                route.fee_base_msat === undefined ||
                route.fee_proportional_millionths === undefined ||
                route.cltv_expiry_delta === undefined) {
                throw new Error('Routing info is incomplete');
            }
            if (ecc.Point.fromHex(route.pubkey) instanceof Error) {
                throw new Error('Routing info pubkey is not a valid pubkey');
            }
            let shortId = buffutils.fromHex(route.short_channel_id);
            if (shortId instanceof Error || shortId.length !== 8) {
                throw new Error('Routing info short channel id must be 8 bytes');
            }
            if (typeof route.fee_base_msat !== 'number' || Math.floor(route.fee_base_msat) !== route.fee_base_msat) {
                throw new Error('Routing info fee base msat is not an integer');
            }
            if (typeof route.fee_proportional_millionths !== 'number' ||
                Math.floor(route.fee_proportional_millionths) !== route.fee_proportional_millionths) {
                throw new Error('Routing info fee proportional millionths is not an integer');
            }
            if (typeof route.cltv_expiry_delta !== 'number' ||
                Math.floor(route.cltv_expiry_delta) !== route.cltv_expiry_delta) {
                throw new Error('Routing info cltv expiry delta is not an integer');
            }
        });
    }
    let prefix = 'ln';
    prefix += coinTypeObj.bech32;
    let hrpString;
    // calculate the smallest possible integer (removing zeroes) and add the best
    // divisor (m = milli, u = micro, n = nano, p = pico)
    if (data.millisatoshis && data.satoshis) {
        hrpString = millisatToHrp(data.millisatoshis);
        let hrpStringSat = satToHrp(BigInt(data.satoshis));
        if (hrpStringSat !== hrpString) {
            throw new Error('satoshis and millisatoshis do not match');
        }
    }
    else if (data.millisatoshis) {
        hrpString = millisatToHrp(data.millisatoshis);
    }
    else if (data.satoshis) {
        hrpString = satToHrp(BigInt(data.satoshis));
    }
    else {
        hrpString = '';
    }
    // bech32 human readable part is lnbc2500m (ln + coinbech32 + satoshis (optional))
    // lnbc or lntb would be valid as well. (no value specified)
    prefix += hrpString;
    // timestamp converted to 5 bit number array (left padded with 0 bits, NOT right padded)
    let timestampWords = intBEToWords(data.timestamp);
    let tags = data.tags;
    let tagWords = Uint8Array.from([]);
    tags.forEach(tag => {
        const possibleTagNames = Object.keys(TAGENCODERS);
        if (canReconstruct)
            possibleTagNames.push(unknownTagName);
        // check if the tagName exists in the encoders object, if not throw Error.
        if (possibleTagNames.indexOf(tag.tagName) === -1) {
            throw new Error('Unknown tag key: ' + tag.tagName);
        }
        let words;
        if (tag.tagName !== unknownTagName) {
            // each tag starts with 1 word code for the tag
            tagWords = buffutils.concat(tagWords, Uint8Array.of(TAGCODES[tag.tagName]));
            const encoder = TAGENCODERS[tag.tagName];
            words = encoder(tag.data);
        }
        else {
            let result = unknownEncoder(tag.data);
            tagWords = buffutils.concat(tagWords, result.tagCode);
            words = result.words;
        }
        // after the tag code, 2 words are used to store the length (in 5 bit words) of the tag data
        // (also left padded, most integers are left padded while buffers are right padded)
        tagWords = buffutils.concat(tagWords, buffutils.slice(buffutils.concat(Uint8Array.of(0), intBEToWords(words.length)), -2));
        // then append the tag data words
        tagWords = buffutils.concat(tagWords, words);
    });
    // the data part of the bech32 is TIMESTAMP || TAGS || SIGNATURE
    // currently dataWords = TIMESTAMP || TAGS
    let dataWords = buffutils.concat(timestampWords, tagWords);
    // the preimage for the signing data is the buffer of the prefix concatenated
    // with the buffer conversion of the data words excluding the signature
    // (right padded with 0 bits)
    //Buffer.concat([Buffer.from(prefix, 'utf8'), Buffer.from(convert(dataWords, 5, 8))])
    let toSign = buffutils.concat(buffutils.fromString(prefix), bech32.convert(dataWords, 5, 8, true));
    // single SHA256 hash for the signature
    let payReqHash = sha256_1.default.digest(toSign);
    // signature is 64 bytes (32 byte r value and 32 byte s value concatenated)
    // PLUS one extra byte appended to the right with the recoveryID in [0,1,2,3]
    // Then convert to 5 bit words with right padding 0 bits.
    let sigWords;
    if (canReconstruct) {
        /* Since BOLT11 does not require a payee_node_key tag in the specs,
        most parsers will have to recover the pubkey from the signature
        To ensure the tag data has been provided in the right order etc.
        we should check that the data we got and the node key given match when
        reconstructing a payment request from given signature and recoveryID.
        However, if a privatekey is given, the caller is the privkey owner.
        Earlier we check if the private key matches the payee node key IF they
        gave one. */
        if (nodePublicKey) {
            //let recoveredPubkey = secp256k1.recover(payReqHash, Buffer.from(data.signature, 'hex'), data.recoveryFlag, true)
            if (!data.signature || data.recoveryFlag === undefined) {
                throw new Error('expected signature/recoveryFlag to recover pubkey');
            }
            const sig = ecc.Signature.fromHex(data.signature);
            if (sig instanceof Error) {
                throw new Error('expected signature to be valid hex');
            }
            let recoveredPubkey = ecc.Point.toBytes(signature_1.ecdsaRecover(payReqHash, sig, data.recoveryFlag));
            if (nodePublicKey && !buffutils.equal(nodePublicKey, recoveredPubkey)) {
                throw new Error('Signature, message, and recoveryID did not produce the same pubkey as payeeNodeKey');
            }
            sigWords = hexToWord(data.signature + '0' + data.recoveryFlag);
        }
        else {
            throw new Error('Reconstruction with signature and recoveryID requires payeeNodeKey to verify correctness of input data.');
        }
    }
    if (sigWords) {
        dataWords = buffutils.concat(dataWords, sigWords);
    }
    if (data.timestamp === undefined) {
        throw new Error('expected timestamp');
    }
    const tags6Item = tagsItems(data.tags, isDefined(TAGNAMES.get(6)));
    if (tags6Item !== undefined) {
        data.timeExpireDate = data.timestamp + tags6Item;
        data.timeExpireDateString = new Date(data.timeExpireDate * 1000).toISOString();
    }
    data.timestampString = new Date(data.timestamp * 1000).toISOString();
    data.prefix = prefix;
    data.wordsTemp = bech32.encode('temp', dataWords);
    data.complete = !!sigWords;
    if (!data.complete) {
        throw new Error('can not encode incomplete');
    }
    return bech32.encode(prefix, dataWords);
}
exports.encodeBolt11 = encodeBolt11;
function intBEToWords(intBE = 0, bits = 5) {
    let words = [];
    intBE = Math.floor(intBE);
    if (intBE === 0)
        return Uint8Array.of(0);
    while (intBE > 0) {
        words.push(intBE & (Math.pow(2, bits) - 1));
        intBE = Math.floor(intBE / Math.pow(2, bits));
    }
    return Uint8Array.from(words.reverse());
}
//# sourceMappingURL=bolt11.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/claim-request.js":
/*!*********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/claim-request.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const blinded_message_1 = __webpack_require__(/*! ./blinded-message */ "./node_modules/moneypot-lib/dist/blinded-message.js");
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
const signature_1 = __webpack_require__(/*! ./signature */ "./node_modules/moneypot-lib/dist/signature.js");
const magnitude_1 = __webpack_require__(/*! ./magnitude */ "./node_modules/moneypot-lib/dist/magnitude.js");
class ClaimRequest {
    constructor(claimableHash, coinRequests, authorization) {
        this.claimableHash = claimableHash;
        this.coinRequests = coinRequests;
        this.authorization = authorization;
    }
    static newAuthorized(claimableHash, coinRequests, claimantPrivateKey) {
        const hash = ClaimRequest.hashOf(claimableHash, coinRequests);
        const authorization = signature_1.default.compute(hash.buffer, claimantPrivateKey);
        return new ClaimRequest(claimableHash, coinRequests, authorization);
    }
    static fromPOD(data) {
        if (typeof data !== 'object') {
            return new Error('ClaimRequest.fromPOD expected an object');
        }
        const claimableHash = hash_1.default.fromPOD(data.claimableHash);
        if (claimableHash instanceof Error) {
            return claimableHash;
        }
        if (!Array.isArray(data.coinRequests)) {
            return new Error('ClaimRequest.fromPOD expected an array for coinRequests');
        }
        const coinRequests = [];
        for (const coin of data.coinRequests) {
            const blindingNonce = public_key_1.default.fromPOD(coin.blindingNonce);
            if (blindingNonce instanceof Error) {
                return blindingNonce;
            }
            const blindedOwner = blinded_message_1.default.fromPOD(coin.blindedOwner);
            if (blindedOwner instanceof Error) {
                return blindedOwner;
            }
            const magnitude = magnitude_1.default.fromPOD(coin.magnitude);
            if (magnitude instanceof Error) {
                return magnitude;
            }
            coinRequests.push({ blindingNonce, blindedOwner, magnitude });
        }
        const authorization = signature_1.default.fromPOD(data.authorization);
        if (authorization instanceof Error) {
            return authorization;
        }
        return new ClaimRequest(claimableHash, coinRequests, authorization);
    }
    static hashOf(claimableHash, coinRequests) {
        const h = hash_1.default.newBuilder('ClaimRequest');
        h.update(claimableHash.buffer);
        for (const cc of coinRequests) {
            h.update(cc.blindedOwner.buffer);
            h.update(cc.blindingNonce.buffer);
            h.update(cc.magnitude.buffer);
        }
        return h.digest();
    }
    hash() {
        return ClaimRequest.hashOf(this.claimableHash, this.coinRequests);
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            authorization: this.authorization.toPOD(),
            claimableHash: this.claimableHash.toPOD(),
            coinRequests: this.coinRequests.map(cr => ({
                blindedOwner: cr.blindedOwner.toPOD(),
                blindingNonce: cr.blindingNonce.toPOD(),
                magnitude: cr.magnitude.toPOD(),
            })),
        };
    }
    // how much is being claimed
    amount() {
        let n = 0;
        for (const coinRequest of this.coinRequests) {
            n += coinRequest.magnitude.toAmount();
        }
        return n;
    }
}
exports.default = ClaimRequest;
//# sourceMappingURL=claim-request.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/claimable.js":
/*!*****************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/claimable.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hookout_1 = __webpack_require__(/*! ./hookout */ "./node_modules/moneypot-lib/dist/hookout.js");
const fee_bump_1 = __webpack_require__(/*! ./fee-bump */ "./node_modules/moneypot-lib/dist/fee-bump.js");
const lightning_payment_1 = __webpack_require__(/*! ./lightning-payment */ "./node_modules/moneypot-lib/dist/lightning-payment.js");
const lightning_invoice_1 = __webpack_require__(/*! ./lightning-invoice */ "./node_modules/moneypot-lib/dist/lightning-invoice.js");
const hookin_1 = __webpack_require__(/*! ./hookin */ "./node_modules/moneypot-lib/dist/hookin.js");
function claimableToPOD(c) {
    if (c instanceof hookout_1.default) {
        return { kind: 'Hookout', ...c.toPOD() };
    }
    else if (c instanceof fee_bump_1.default) {
        return { kind: 'FeeBump', ...c.toPOD() };
    }
    else if (c instanceof lightning_payment_1.default) {
        return { kind: 'LightningPayment', ...c.toPOD() };
    }
    else if (c instanceof lightning_invoice_1.default) {
        return { kind: 'LightningInvoice', ...c.toPOD() };
    }
    else if (c instanceof hookin_1.default) {
        return { kind: 'Hookin', ...c.toPOD() };
    }
    else {
        const _ = c;
        throw new Error('unknown claimable kind');
    }
}
exports.claimableToPOD = claimableToPOD;
function claimableFromPOD(obj) {
    if (typeof obj !== 'object') {
        return new Error('claimableFromPOD expected an object');
    }
    if (typeof obj.kind !== 'string') {
        return new Error('claimableFromPOD expected a string kind');
    }
    const parser = parserFromKind(obj.kind);
    if (!parser) {
        return new Error('claimableFromPODcouldnt handle that kind');
    }
    const c = parser(obj);
    if (c instanceof Error) {
        return c;
    }
    if (c.hash().toPOD() !== obj.hash) {
        return new Error('hash did not match');
    }
    return c;
}
exports.claimableFromPOD = claimableFromPOD;
function parserFromKind(kind) {
    switch (kind) {
        case 'Hookout':
            return hookout_1.default.fromPOD;
        case 'FeeBump':
            return fee_bump_1.default.fromPOD;
        case 'LightningPayment':
            return lightning_payment_1.default.fromPOD;
        case 'LightningInvoice':
            return lightning_invoice_1.default.fromPOD;
        case 'Hookin':
            return hookin_1.default.fromPOD;
    }
}
exports.parserFromKind = parserFromKind;
// export function podToClaimable(obj: any): Claimable | Error {
//   if (typeof obj !== 'object' || typeof obj.kind !== 'string') {
//     return new Error('parseTransfer expected an object with a kind to parse');
//   }
//   const parser = parsers.get(obj.kind);
//   if (!parser) {
//     return new Error('could not parse a: ' + obj.kind);
//   }
//   return parser(obj);
// }
//# sourceMappingURL=claimable.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/coin.js":
/*!************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/coin.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
const signature_1 = __webpack_require__(/*! ./signature */ "./node_modules/moneypot-lib/dist/signature.js");
const magnitude_1 = __webpack_require__(/*! ./magnitude */ "./node_modules/moneypot-lib/dist/magnitude.js");
const Buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
class Coin {
    constructor(owner, magnitude, receipt) {
        this.owner = owner;
        this.magnitude = magnitude;
        this.receipt = receipt;
    }
    static fromPOD(data) {
        const owner = public_key_1.default.fromPOD(data.owner);
        if (owner instanceof Error) {
            return owner;
        }
        const magnitude = magnitude_1.default.fromPOD(data.magnitude);
        if (magnitude instanceof Error) {
            return magnitude;
        }
        const receipt = signature_1.default.fromPOD(data.receipt);
        if (receipt instanceof Error) {
            return receipt;
        }
        const c = new Coin(owner, magnitude, receipt);
        if (c.hash().toPOD() !== data.hash) {
            return new Error('hash did not match');
        }
        return c;
    }
    get buffer() {
        return Buffutils.concat(this.owner.buffer, this.magnitude.buffer, this.receipt.buffer);
    }
    hash() {
        return hash_1.default.fromMessage('Coin', this.buffer);
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            receipt: this.receipt.toPOD(),
            magnitude: this.magnitude.toPOD(),
            owner: this.owner.toPOD(),
        };
    }
    get amount() {
        return this.magnitude.toAmount();
    }
}
exports.default = Coin;
//# sourceMappingURL=coin.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/custodian-info.js":
/*!**********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/custodian-info.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const bech32 = __webpack_require__(/*! ./util/bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const Buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
class CustodianInfo {
    constructor(acknowledgementKey, currency, fundingKey, blindCoinKeys) {
        this.acknowledgementKey = acknowledgementKey;
        this.currency = currency;
        this.fundingKey = fundingKey;
        this.blindCoinKeys = blindCoinKeys;
    }
    hash() {
        return hash_1.default.fromMessage('Custodian', this.acknowledgementKey.buffer, Buffutils.fromUint32(this.currency.length), Buffutils.fromString(this.currency), this.fundingKey.buffer, ...this.blindCoinKeys.map(bk => bk.buffer));
    }
    // 4 letter code for using in an Address
    prefix() {
        const hash = this.hash().buffer;
        return (bech32.ALPHABET[hash[0] % 32] +
            bech32.ALPHABET[hash[1] % 32] +
            bech32.ALPHABET[hash[2] % 32] +
            bech32.ALPHABET[hash[3] % 32]);
    }
    toPOD() {
        return {
            acknowledgementKey: this.acknowledgementKey.toPOD(),
            currency: this.currency,
            fundingKey: this.fundingKey.toPOD(),
            blindCoinKeys: this.blindCoinKeys.map(bk => bk.toPOD()),
        };
    }
    static fromPOD(d) {
        if (typeof d !== 'object') {
            return new Error('custodian fromPOD expected an object');
        }
        const acknowledgementKey = public_key_1.default.fromPOD(d.acknowledgementKey);
        if (acknowledgementKey instanceof Error) {
            return acknowledgementKey;
        }
        const currency = d.currency;
        if (typeof currency !== 'string') {
            return new Error('custodian expected a stringified currency');
        }
        const fundingKey = public_key_1.default.fromPOD(d.fundingKey);
        if (fundingKey instanceof Error) {
            return fundingKey;
        }
        if (!Array.isArray(d.blindCoinKeys) || d.blindCoinKeys.length !== 31) {
            return new Error('custodian expected an 31-length array for blindCoinKeys');
        }
        const blindCoinKeys = [];
        for (const bkstr of d.blindCoinKeys) {
            const bk = public_key_1.default.fromPOD(bkstr);
            if (bk instanceof Error) {
                return bk;
            }
            blindCoinKeys.push(bk);
        }
        return new CustodianInfo(acknowledgementKey, currency, fundingKey, blindCoinKeys);
    }
}
exports.default = CustodianInfo;
//# sourceMappingURL=custodian-info.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/fee-bump.js":
/*!****************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/fee-bump.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const assert = __webpack_require__(/*! ./util/assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const abstract_transfer_1 = __webpack_require__(/*! ./abstract-transfer */ "./node_modules/moneypot-lib/dist/abstract-transfer.js");
class FeeBump extends abstract_transfer_1.default {
    constructor(transferData, txid) {
        super(transferData);
        this.txid = txid;
        assert.equal(txid.length, 32);
        this.txid = txid;
    }
    static fromPOD(data) {
        const transferData = abstract_transfer_1.parseTransferData(data);
        if (transferData instanceof Error) {
            throw transferData;
        }
        const txid = Buffutils.fromHex(data.txid, 32);
        if (txid instanceof Error) {
            return new Error('FeeBump.fromPOD invalid txid');
        }
        return new FeeBump(transferData, txid);
    }
    get kind() {
        return 'FeeBump';
    }
    toPOD() {
        return {
            ...super.toPOD(),
            txid: Buffutils.toHex(this.txid),
        };
    }
    static hashOf(transferHash, txid) {
        return hash_1.default.fromMessage('FeeBump', transferHash.buffer, txid);
    }
    hash() {
        return FeeBump.hashOf(abstract_transfer_1.default.transferHash(this), this.txid);
    }
}
exports.default = FeeBump;
//# sourceMappingURL=fee-bump.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/hash.js":
/*!************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/hash.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert = __webpack_require__(/*! ./util/assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const bech32 = __webpack_require__(/*! ./util/bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const sha256_1 = __webpack_require__(/*! ./util/bcrypto/sha256 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js");
const Buffutil = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const serializedPrefix = 'hsmp'; // hash moneypot
class Hash {
    constructor(buff) {
        assert.equal(buff.length, 32);
        this.buffer = buff;
    }
    // actually hashes a message(s)
    static fromMessage(prefix, ...message) {
        const buff = sha256_1.default.mac(Buffutil.fromString(prefix), Buffutil.concat(...message));
        return new Hash(buff);
    }
    static newBuilder(prefix) {
        // this can be optimized later:
        const parts = [];
        return new (class {
            update(message) {
                parts.push(message);
            }
            digest() {
                return Hash.fromMessage(prefix, ...parts);
            }
        })();
    }
    static fromPOD(data) {
        if (typeof data !== 'string') {
            return new Error('Hash.fromPOD expected string');
        }
        const { prefix, words } = bech32.decode(data);
        if (prefix !== serializedPrefix) {
            return new Error('hash.fromPOD expected prefix: ' + serializedPrefix + ' but got ' + prefix);
        }
        const bytes = bech32.fromWords(words);
        return new Hash(bytes);
    }
    toPOD() {
        const words = bech32.toWords(this.buffer);
        return bech32.encode(serializedPrefix, words);
    }
}
exports.default = Hash;
//# sourceMappingURL=hash.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/hookin.js":
/*!**************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/hookin.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const private_key_1 = __webpack_require__(/*! ./private-key */ "./node_modules/moneypot-lib/dist/private-key.js");
const public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
const POD = __webpack_require__(/*! ./pod */ "./node_modules/moneypot-lib/dist/pod.js");
const buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
class Hookin {
    constructor(txid, vout, amount, claimant, bitcoinAddress) {
        this.txid = txid;
        this.vout = vout;
        this.amount = amount;
        this.claimant = claimant;
        this.bitcoinAddress = bitcoinAddress;
    }
    static fromPOD(data) {
        if (typeof data !== 'object') {
            return new Error('hookin expected an object');
        }
        const txid = buffutils.fromHex(data.txid, 32);
        if (txid instanceof Error) {
            return txid;
        }
        const vout = data.vout;
        if (!Number.isSafeInteger(vout) || vout < 0 || vout > 65536) {
            return new Error('hookin was given an invalid vout');
        }
        const amount = data.amount;
        if (!POD.isAmount(amount)) {
            return new Error('invalid amount for hookin');
        }
        const claimant = public_key_1.default.fromPOD(data.claimant);
        if (claimant instanceof Error) {
            return claimant;
        }
        const bitcoinAddress = data.bitcoinAddress;
        if (typeof bitcoinAddress !== 'string') {
            return new Error('hookin expected a bitcoin address');
        }
        return new Hookin(txid, vout, amount, claimant, bitcoinAddress);
    }
    static hashOf(txid, vout, amount, claimant, bitcoinAddress) {
        const b = hash_1.default.newBuilder('Hookin');
        b.update(txid);
        b.update(buffutils.fromUint32(vout));
        b.update(buffutils.fromUint64(amount));
        b.update(claimant.buffer);
        b.update(buffutils.fromString(bitcoinAddress));
        return b.digest();
    }
    hash() {
        return Hookin.hashOf(this.txid, this.vout, this.amount, this.claimant, this.bitcoinAddress);
    }
    get kind() {
        return 'Hookin';
    }
    get claimableAmount() {
        // a hookin by itself has no claimable value, it's only after we have some status updates for it being sufficiently confirmed
        return 0;
    }
    getTweak() {
        const bytes = hash_1.default.fromMessage('tweak', this.claimant.buffer).buffer;
        const pk = private_key_1.default.fromBytes(bytes);
        if (pk instanceof Error) {
            throw pk;
        }
        return pk;
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            amount: this.amount,
            claimant: this.claimant.toPOD(),
            txid: buffutils.toHex(this.txid),
            vout: this.vout,
            bitcoinAddress: this.bitcoinAddress,
        };
    }
}
exports.default = Hookin;
//# sourceMappingURL=hookin.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/hookout.js":
/*!***************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/hookout.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const abstract_transfer_1 = __webpack_require__(/*! ./abstract-transfer */ "./node_modules/moneypot-lib/dist/abstract-transfer.js");
class Hookout extends abstract_transfer_1.default {
    constructor(td, bitcoinAddress, priority, rbf) {
        super(td);
        this.bitcoinAddress = bitcoinAddress;
        this.priority = priority;
        this.rbf = rbf;
    }
    static fromPOD(data) {
        const transferData = abstract_transfer_1.parseTransferData(data);
        if (transferData instanceof Error) {
            return transferData;
        }
        const rbf = data.rbf;
        if (typeof rbf !== 'boolean') {
            return new Error('Hookout.fromPOD invalid rbf');
        }
        const bitcoinAddress = data.bitcoinAddress;
        if (typeof bitcoinAddress !== 'string') {
            return new Error('Hookout.fromPOD invalid bitcoin address');
        }
        const priority = data.priority;
        if (['CUSTOM', 'IMMEDIATE', 'BATCH', 'FREE'].indexOf(priority) === -1) {
            return new Error('Unrecognized priority');
        }
        return new Hookout(transferData, bitcoinAddress, priority, rbf);
    }
    get kind() {
        return 'Hookout';
    }
    toPOD() {
        return {
            ...super.toPOD(),
            bitcoinAddress: this.bitcoinAddress,
            priority: this.priority,
            rbf: this.rbf,
        };
    }
    static hashOf(transferDataHash, bitcoinAddress, priority) {
        return hash_1.default.fromMessage('Hookout', transferDataHash.buffer, Buffutils.fromString(bitcoinAddress), Buffutils.fromString(priority[0]) // first letter must be unique
        );
    }
    hash() {
        return Hookout.hashOf(abstract_transfer_1.default.transferHash(this), this.bitcoinAddress, this.priority);
    }
}
exports.default = Hookout;
//# sourceMappingURL=hookout.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/index.js":
/*!*************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/index.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const Buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
exports.Buffutils = Buffutils;
const POD = __webpack_require__(/*! ./pod */ "./node_modules/moneypot-lib/dist/pod.js");
exports.POD = POD;
// types
var blinded_message_1 = __webpack_require__(/*! ./blinded-message */ "./node_modules/moneypot-lib/dist/blinded-message.js");
exports.BlindedMessage = blinded_message_1.default;
var blinded_signature_1 = __webpack_require__(/*! ./blinded-signature */ "./node_modules/moneypot-lib/dist/blinded-signature.js");
exports.BlindedSignature = blinded_signature_1.default;
var hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
exports.Hash = hash_1.default;
var private_key_1 = __webpack_require__(/*! ./private-key */ "./node_modules/moneypot-lib/dist/private-key.js");
exports.PrivateKey = private_key_1.default;
var public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
exports.PublicKey = public_key_1.default;
var signature_1 = __webpack_require__(/*! ./signature */ "./node_modules/moneypot-lib/dist/signature.js");
exports.Signature = signature_1.default;
// models
var coin_1 = __webpack_require__(/*! ./coin */ "./node_modules/moneypot-lib/dist/coin.js");
exports.Coin = coin_1.default;
const custodian_info_1 = __webpack_require__(/*! ./custodian-info */ "./node_modules/moneypot-lib/dist/custodian-info.js");
exports.CustodianInfo = custodian_info_1.default;
var hookin_1 = __webpack_require__(/*! ./hookin */ "./node_modules/moneypot-lib/dist/hookin.js");
exports.Hookin = hookin_1.default;
const hookout_1 = __webpack_require__(/*! ./hookout */ "./node_modules/moneypot-lib/dist/hookout.js");
exports.Hookout = hookout_1.default;
const lightning_payment_1 = __webpack_require__(/*! ./lightning-payment */ "./node_modules/moneypot-lib/dist/lightning-payment.js");
exports.LightningPayment = lightning_payment_1.default;
const fee_bump_1 = __webpack_require__(/*! ./fee-bump */ "./node_modules/moneypot-lib/dist/fee-bump.js");
exports.FeeBump = fee_bump_1.default;
var magnitude_1 = __webpack_require__(/*! ./magnitude */ "./node_modules/moneypot-lib/dist/magnitude.js");
exports.Magnitude = magnitude_1.default;
var abstract_transfer_1 = __webpack_require__(/*! ./abstract-transfer */ "./node_modules/moneypot-lib/dist/abstract-transfer.js");
exports.AbstractTransfer = abstract_transfer_1.default;
__export(__webpack_require__(/*! ./claimable */ "./node_modules/moneypot-lib/dist/claimable.js"));
__export(__webpack_require__(/*! ./status */ "./node_modules/moneypot-lib/dist/status/index.js"));
var compute_claimable_remaining_1 = __webpack_require__(/*! ./status/compute-claimable-remaining */ "./node_modules/moneypot-lib/dist/status/compute-claimable-remaining.js");
exports.computeClaimableRemaining = compute_claimable_remaining_1.default;
// blind functions
__export(__webpack_require__(/*! ./blind */ "./node_modules/moneypot-lib/dist/blind.js"));
// helper coin function
__export(__webpack_require__(/*! ./util/coins */ "./node_modules/moneypot-lib/dist/util/coins.js"));
__export(__webpack_require__(/*! ./bolt11 */ "./node_modules/moneypot-lib/dist/bolt11.js"));
__export(__webpack_require__(/*! ./util/bitcoin-address */ "./node_modules/moneypot-lib/dist/util/bitcoin-address.js"));
var claim_request_1 = __webpack_require__(/*! ./claim-request */ "./node_modules/moneypot-lib/dist/claim-request.js");
exports.ClaimRequest = claim_request_1.default;
const Acknowledged = __webpack_require__(/*! ./acknowledged */ "./node_modules/moneypot-lib/dist/acknowledged.js");
exports.Acknowledged = Acknowledged;
const lightning_invoice_1 = __webpack_require__(/*! ./lightning-invoice */ "./node_modules/moneypot-lib/dist/lightning-invoice.js");
exports.LightningInvoice = lightning_invoice_1.default;
// crypto, should be in it's own lib too..
var random_1 = __webpack_require__(/*! ./util/random */ "./node_modules/moneypot-lib/dist/util/random-browser.js");
exports.random = random_1.default;
var sha256_1 = __webpack_require__(/*! ./util/bcrypto/sha256 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js");
exports.SHA256 = sha256_1.default;
var sha512_1 = __webpack_require__(/*! ./util/bcrypto/sha512 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha512.js");
exports.SHA512 = sha512_1.default;
var ripemd160_1 = __webpack_require__(/*! ./util/bcrypto/ripemd160 */ "./node_modules/moneypot-lib/dist/util/bcrypto/ripemd160.js");
exports.RIPEMD160 = ripemd160_1.default;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/lightning-invoice.js":
/*!*************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/lightning-invoice.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
class LightningInvoice {
    constructor(claimant, paymentRequest) {
        this.claimant = claimant;
        this.paymentRequest = paymentRequest;
    }
    hash() {
        return hash_1.default.fromMessage('LightningInvoice', this.claimant.buffer, buffutils.fromString(this.paymentRequest));
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            claimant: this.claimant.toPOD(),
            paymentRequest: this.paymentRequest,
        };
    }
    get fee() {
        return 0;
    }
    get amount() {
        return 0;
    }
    get claimableAmount() {
        return 0;
    }
    get kind() {
        return 'LightningInvoice';
    }
    static fromPOD(data) {
        if (typeof data !== 'object') {
            return new Error('LightningInvoice.fromPOD expected an object');
        }
        // should we use bolt11 to validate the payment request?
        const claimant = public_key_1.default.fromPOD(data.claimant);
        if (claimant instanceof Error) {
            return new Error('lightninginvoice needs a publickey claimant');
        }
        const paymentRequest = data.paymentRequest;
        if (typeof paymentRequest !== 'string' || !paymentRequest.startsWith('ln')) {
            return new Error('expected valid payment request for lightninginvoice');
        }
        return new LightningInvoice(claimant, paymentRequest);
    }
}
exports.default = LightningInvoice;
//# sourceMappingURL=lightning-invoice.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/lightning-payment.js":
/*!*************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/lightning-payment.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const Buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const bolt11 = __webpack_require__(/*! ./bolt11 */ "./node_modules/moneypot-lib/dist/bolt11.js");
const abstract_transfer_1 = __webpack_require__(/*! ./abstract-transfer */ "./node_modules/moneypot-lib/dist/abstract-transfer.js");
class LightningPayment extends abstract_transfer_1.default {
    constructor(transferData, paymentRequest) {
        super(transferData);
        this.paymentRequest = paymentRequest;
        let pro = bolt11.decodeBolt11(paymentRequest);
        if (pro instanceof Error) {
            throw 'invalid bolt11 invoice: ' + pro.message;
        }
        if (pro.satoshis && pro.satoshis !== transferData.amount) {
            throw 'amount does not match invoice amount';
        }
    }
    static fromPOD(data) {
        const transferData = abstract_transfer_1.parseTransferData(data);
        if (transferData instanceof Error) {
            return transferData;
        }
        try {
            return new LightningPayment(transferData, data.paymentRequest);
        }
        catch (err) {
            return new Error(err);
        }
    }
    get kind() {
        return 'LightningPayment';
    }
    toPOD() {
        return {
            ...super.toPOD(),
            paymentRequest: this.paymentRequest,
        };
    }
    static hashOf(transferDataHash, paymentRequest) {
        return hash_1.default.fromMessage('LightningPayment', transferDataHash.buffer, Buffutils.fromString(paymentRequest));
    }
    hash() {
        return LightningPayment.hashOf(abstract_transfer_1.default.transferHash(this), this.paymentRequest);
    }
}
exports.default = LightningPayment;
//# sourceMappingURL=lightning-payment.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/magnitude.js":
/*!*****************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/magnitude.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Magnitude {
    constructor(n) {
        if (n < 0 || n > 30 || !Number.isInteger(n)) {
            throw new Error('assertion: magnitude must be between 0 and 30');
        }
        this.n = n;
    }
    static fromPOD(d) {
        if (!Number.isSafeInteger(d) || d < 0 || d > 30) {
            return new Error('magnitude expected an integer between 0 and 0');
        }
        return new Magnitude(d);
    }
    toAmount() {
        return 2 ** this.n;
    }
    get buffer() {
        return Uint8Array.of(this.n);
    }
    toPOD() {
        return this.n;
    }
}
exports.default = Magnitude;
Magnitude.MaxMagnitude = 30;
//# sourceMappingURL=magnitude.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/pod.js":
/*!***********************************************!*\
  !*** ./node_modules/moneypot-lib/dist/pod.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isAmount(x) {
    return typeof x === 'number' && Number.isSafeInteger(x) && x >= 0;
}
exports.isAmount = isAmount;
exports.MaxMagnitude = 30;
//# sourceMappingURL=pod.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/private-key.js":
/*!*******************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/private-key.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ecc = __webpack_require__(/*! ./util/ecc */ "./node_modules/moneypot-lib/dist/util/ecc/index.js");
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const public_key_1 = __webpack_require__(/*! ./public-key */ "./node_modules/moneypot-lib/dist/public-key.js");
const bech32 = __webpack_require__(/*! ./util/bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const wif = __webpack_require__(/*! ./util/wif */ "./node_modules/moneypot-lib/dist/util/wif.js");
const random_1 = __webpack_require__(/*! ./util/random */ "./node_modules/moneypot-lib/dist/util/random-browser.js");
const Buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const mu_sig_1 = __webpack_require__(/*! ./util/ecc/mu-sig */ "./node_modules/moneypot-lib/dist/util/ecc/mu-sig.js");
const serializedPrefix = 'privmp'; // private key moneypot
class PrivateKey {
    constructor(scalar) {
        this.scalar = scalar;
    }
    static fromPOD(data) {
        if (typeof data !== 'string') {
            return new Error('PrivateKey.fromPOD expected a string');
        }
        const { prefix, words } = bech32.decode(data);
        if (prefix !== serializedPrefix) {
            return new Error('Got prefix: ' + prefix + ' but expected ' + serializedPrefix);
        }
        return PrivateKey.fromBytes(bech32.fromWords(words));
    }
    static fromBytes(bytes) {
        const s = ecc.Scalar.fromBytes(bytes);
        if (s instanceof Error) {
            return s;
        }
        return new PrivateKey(s);
    }
    static fromRand() {
        const buff = random_1.default(32);
        const s = ecc.Scalar.fromBytes(buff);
        if (s instanceof Error) {
            throw s; // should never really happen..
        }
        return new PrivateKey(s);
    }
    static combine(privkeys) {
        return new PrivateKey(mu_sig_1.privkeyCombine(privkeys.map(p => p.scalar)));
    }
    get buffer() {
        return ecc.Scalar.toBytes(this.scalar);
    }
    toPOD() {
        return bech32.encode(serializedPrefix, bech32.toWords(this.buffer));
    }
    toPublicKey() {
        const point = ecc.Point.fromPrivKey(this.scalar);
        return new public_key_1.default(point.x, point.y);
    }
    tweak(n) {
        const newD = ecc.scalarAdd(this.scalar, n.scalar);
        return new PrivateKey(newD);
    }
    // Just for bitcoin compatibilty, shouldn't really be used...
    toWif(testnet = true) {
        const prefix = testnet ? 0xef : 0x80;
        return wif.encode(prefix, this.buffer, true);
    }
    derive(n) {
        let nBuff;
        if (n instanceof Uint8Array) {
            nBuff = n;
        }
        else if (typeof n === 'bigint') {
            nBuff = Buffutils.fromBigInt(n);
        }
        else if (typeof n === 'number') {
            nBuff = Buffutils.fromVarInt(n);
        }
        else {
            throw new Error('unexpected type for deriving with. must be a Uint8Array | number | bigint');
        }
        const tweakBy = hash_1.default.fromMessage('derive', this.toPublicKey().buffer, nBuff).buffer;
        const tweakByN = ecc.Scalar.fromBytes(tweakBy);
        if (tweakByN instanceof Error) {
            throw tweakByN;
        }
        const newD = ecc.scalarAdd(this.scalar, tweakByN);
        return new PrivateKey(newD);
    }
}
exports.default = PrivateKey;
//# sourceMappingURL=private-key.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/public-key.js":
/*!******************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/public-key.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const hash_1 = __webpack_require__(/*! ./hash */ "./node_modules/moneypot-lib/dist/hash.js");
const ecc = __webpack_require__(/*! ./util/ecc/elliptic */ "./node_modules/moneypot-lib/dist/util/ecc/elliptic.js");
const bech32 = __webpack_require__(/*! ./util/bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const ripemd160_1 = __webpack_require__(/*! ./util/bcrypto/ripemd160 */ "./node_modules/moneypot-lib/dist/util/bcrypto/ripemd160.js");
const sha256_1 = __webpack_require__(/*! ./util/bcrypto/sha256 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js");
const buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const _1 = __webpack_require__(/*! . */ "./node_modules/moneypot-lib/dist/index.js");
const mu_sig_1 = __webpack_require__(/*! ./util/ecc/mu-sig */ "./node_modules/moneypot-lib/dist/util/ecc/mu-sig.js");
const base58_1 = __webpack_require__(/*! ./util/base58 */ "./node_modules/moneypot-lib/dist/util/base58.js");
const serializedPrefix = 'pubmp'; // public key moneypot
class PublicKey {
    // dont directly use...
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    static fromPOD(data) {
        if (typeof data !== 'string') {
            return new Error('PublicKey.fromPOD expected a string');
        }
        const { prefix, words } = bech32.decode(data);
        if (prefix !== serializedPrefix) {
            return new Error('Got prefix: ' + prefix + ' but expected ' + serializedPrefix);
        }
        return PublicKey.fromBytes(bech32.fromWords(words));
    }
    static fromBytes(serialized) {
        const point = ecc.Point.fromBytes(serialized);
        if (point instanceof Error) {
            return point;
        }
        return new PublicKey(point.x, point.y);
    }
    static combine(pubkeys) {
        const t = mu_sig_1.pubkeyCombine(pubkeys);
        return new PublicKey(t.x, t.y);
    }
    get buffer() {
        return ecc.Point.toBytes(this);
    }
    toPOD() {
        return bech32.encode(serializedPrefix, bech32.toWords(this.buffer));
    }
    tweak(n) {
        const newQ = ecc.pointAdd(this, n);
        return new PublicKey(newQ.x, newQ.y);
    }
    derive(n) {
        let nBuff;
        if (n instanceof Uint8Array) {
            nBuff = n;
        }
        else if (typeof n === 'bigint') {
            nBuff = _1.Buffutils.fromBigInt(n);
        }
        else if (typeof n === 'number') {
            nBuff = _1.Buffutils.fromVarInt(n);
        }
        else {
            throw new Error('unexpected type for deriving with. must be a Uint8Array | number | bigint');
        }
        const tweakBy = hash_1.default.fromMessage('derive', this.buffer, nBuff).buffer;
        const tweakByN = ecc.Scalar.fromBytes(tweakBy);
        if (tweakByN instanceof Error) {
            throw tweakByN;
        }
        const tweakPoint = ecc.Point.fromPrivKey(tweakByN);
        const newQ = ecc.pointAdd(this, tweakPoint);
        return new PublicKey(newQ.x, newQ.y);
    }
    hash() {
        return hash_1.default.fromMessage('PublicKey', this.buffer);
    }
    toBitcoinAddress(testnet = true) {
        const prefix = testnet ? 'tb' : 'bc';
        const pubkeyHash = rmd160sha256(this.buffer);
        const words = bech32.toWords(pubkeyHash);
        const version = new Uint8Array(1); // [0]
        return bech32.encode(prefix, buffutils.concat(version, words));
    }
    toNestedBitcoinAddress(testnet = true) {
        const prefix = testnet ? 0xc4 : 0x05;
        const pubkeyHash = rmd160sha256(this.buffer);
        // redeem script
        const redeem = rmd160sha256(buffutils.concat(new Uint8Array([0x00, 0x14]), pubkeyHash));
        // const rmdsha =  rmd160sha256(redeem)
        const addbytes = buffutils.concat(new Uint8Array([prefix]), redeem);
        const sha2 = sha256_1.default.digest(sha256_1.default.digest(addbytes)).slice(0, 4);
        // const checksum = sha2.slice(0, 4)
        const binary = buffutils.concat(addbytes, sha2);
        return base58_1.encode(binary);
    }
    toLegacyBitcoinAddress(testnet = false) {
        const prefix = testnet ? 0x6f : 0x00;
        const hash = rmd160sha256(this.buffer);
        const concatVersion = buffutils.concat(new Uint8Array([prefix]), hash);
        const sha = sha256_1.default.digest(sha256_1.default.digest(concatVersion)).slice(0, 4);
        const enc = buffutils.concat(concatVersion, sha);
        return base58_1.encode(enc);
    }
}
exports.default = PublicKey;
function rmd160sha256(data) {
    return ripemd160_1.default.digest(sha256_1.default.digest(data));
}
//# sourceMappingURL=public-key.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/signature.js":
/*!*****************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/signature.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert = __webpack_require__(/*! ./util/assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const bech32 = __webpack_require__(/*! ./util/bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const Buffutils = __webpack_require__(/*! ./util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const ecc = __webpack_require__(/*! ./util/ecc */ "./node_modules/moneypot-lib/dist/util/ecc/index.js");
const serializedPrefix = 'sigmp'; // signature moneypot
class Signature {
    constructor(r, s) {
        this.r = r;
        this.s = s;
    }
    // actually creates a schnorr sig. This takes a message, not a hash to prevent existential forgeries
    static compute(message, privkey) {
        const sig = ecc.sign(message, privkey.scalar);
        return new Signature(sig.r, sig.s);
    }
    static fromPOD(data) {
        if (typeof data !== 'string') {
            return new Error('Signature.fromPOD expected string');
        }
        const { prefix, words } = bech32.decode(data);
        if (prefix !== serializedPrefix) {
            return new Error('Got prefix: ' + prefix + ' but expected ' + serializedPrefix);
        }
        return Signature.fromBytes(bech32.fromWords(words));
    }
    static fromBytes(bytes) {
        assert.equal(bytes.length, 64);
        const r = ecc.Scalar.fromBytes(bytes.slice(0, 32));
        if (r instanceof Error) {
            return r;
        }
        const s = ecc.Scalar.fromBytes(bytes.slice(32, 64));
        if (s instanceof Error) {
            return s;
        }
        return new Signature(r, s);
    }
    get buffer() {
        return Buffutils.concat(ecc.Scalar.toBytes(this.r), ecc.Scalar.toBytes(this.s));
    }
    verify(message, pubkey) {
        return ecc.verify(pubkey, message, this);
    }
    verifyECDSA(message, pubkey) {
        return ecc.verifyECDSA(pubkey, message, this);
    }
    toPOD() {
        return bech32.encode(serializedPrefix, bech32.toWords(this.buffer));
    }
}
exports.default = Signature;
//# sourceMappingURL=signature.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/abstract-status.js":
/*!******************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/abstract-status.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class AbstractStatus {
    constructor(claimableHash) {
        this.claimableHash = claimableHash;
    }
    get buffer() {
        return this.claimableHash.buffer;
    }
}
exports.default = AbstractStatus;
//# sourceMappingURL=abstract-status.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/bitcoin-transaction-sent.js":
/*!***************************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/bitcoin-transaction-sent.js ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abstract_status_1 = __webpack_require__(/*! ./abstract-status */ "./node_modules/moneypot-lib/dist/status/abstract-status.js");
const hash_1 = __webpack_require__(/*! ../hash */ "./node_modules/moneypot-lib/dist/hash.js");
const buffutils = __webpack_require__(/*! ../util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
class BitcoinTransactionSent extends abstract_status_1.default {
    constructor(claimableHash, txid) {
        super(claimableHash);
        this.txid = txid;
    }
    hash() {
        return hash_1.default.fromMessage('BitcoinTransactionSent', this.buffer, this.txid);
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            claimableHash: this.claimableHash.toPOD(),
            txid: buffutils.toHex(this.txid),
        };
    }
    static fromPOD(obj) {
        if (typeof obj !== 'object') {
            return new Error('BitcoinTransactionSent.fromPOD expected an object');
        }
        const claimableHash = hash_1.default.fromPOD(obj.claimableHash);
        if (claimableHash instanceof Error) {
            return claimableHash;
        }
        const txid = buffutils.fromHex(obj.txid, 32);
        if (txid instanceof Error) {
            return txid;
        }
        return new BitcoinTransactionSent(claimableHash, txid);
    }
}
exports.default = BitcoinTransactionSent;
//# sourceMappingURL=bitcoin-transaction-sent.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/claimed.js":
/*!**********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/claimed.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abstract_status_1 = __webpack_require__(/*! ./abstract-status */ "./node_modules/moneypot-lib/dist/status/abstract-status.js");
const blinded_signature_1 = __webpack_require__(/*! ../blinded-signature */ "./node_modules/moneypot-lib/dist/blinded-signature.js");
const claim_request_1 = __webpack_require__(/*! ../claim-request */ "./node_modules/moneypot-lib/dist/claim-request.js");
const hash_1 = __webpack_require__(/*! ../hash */ "./node_modules/moneypot-lib/dist/hash.js");
// The response embeds the request, to make it easier to store/verify
class Claimed extends abstract_status_1.default {
    constructor(claimRequest, blindedReceipts) {
        super(claimRequest.claimableHash);
        this.claimRequest = claimRequest;
        this.blindedReceipts = blindedReceipts;
    }
    hash() {
        const h = hash_1.default.newBuilder('ClaimResponse');
        h.update(this.claimRequest.hash().buffer);
        for (const blindedReceipt of this.blindedReceipts) {
            h.update(blindedReceipt.buffer);
        }
        return h.digest();
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            claimableHash: this.claimRequest.claimableHash.toPOD(),
            claimRequest: this.claimRequest.toPOD(),
            blindedReceipts: this.blindedReceipts.map(x => x.toPOD()),
        };
    }
    static fromPOD(data) {
        if (typeof data !== 'object') {
            throw new Error('ClaimResponse must be an object');
        }
        const claimRequest = claim_request_1.default.fromPOD(data.claimRequest);
        if (claimRequest instanceof Error) {
            return claimRequest;
        }
        if (data.claimableHash != claimRequest.claimableHash.toPOD()) {
            return new Error('claimRequest claimableHash doesnt claimed statuses');
        }
        if (!Array.isArray(data.blindedReceipts)) {
            return new Error('expected blindedReceipts in ClaimResponse to be an array');
        }
        const blindedReceipts = [];
        for (const bep of data.blindedReceipts) {
            const blindedReceipt = blinded_signature_1.default.fromPOD(bep);
            if (blindedReceipt instanceof Error) {
                return blindedReceipt;
            }
            blindedReceipts.push(blindedReceipt);
        }
        return new Claimed(claimRequest, blindedReceipts);
    }
}
exports.default = Claimed;
//# sourceMappingURL=claimed.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/compute-claimable-remaining.js":
/*!******************************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/compute-claimable-remaining.js ***!
  \******************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const failed_1 = __webpack_require__(/*! ./failed */ "./node_modules/moneypot-lib/dist/status/failed.js");
const claimed_1 = __webpack_require__(/*! ./claimed */ "./node_modules/moneypot-lib/dist/status/claimed.js");
const lightning_payment_sent_1 = __webpack_require__(/*! ./lightning-payment-sent */ "./node_modules/moneypot-lib/dist/status/lightning-payment-sent.js");
const bitcoin_transaction_sent_1 = __webpack_require__(/*! ./bitcoin-transaction-sent */ "./node_modules/moneypot-lib/dist/status/bitcoin-transaction-sent.js");
const invoice_settled_1 = __webpack_require__(/*! ./invoice-settled */ "./node_modules/moneypot-lib/dist/status/invoice-settled.js");
const hookin_accepted_1 = __webpack_require__(/*! ./hookin-accepted */ "./node_modules/moneypot-lib/dist/status/hookin-accepted.js");
const hookin_1 = __webpack_require__(/*! ../hookin */ "./node_modules/moneypot-lib/dist/hookin.js");
const lightning_payment_1 = __webpack_require__(/*! ../lightning-payment */ "./node_modules/moneypot-lib/dist/lightning-payment.js");
function computeClaimableRemaining(c, statuses) {
    let remaining = c.claimableAmount;
    for (const s of statuses) {
        if (s instanceof failed_1.default) {
            remaining += s.rebate;
        }
        else if (s instanceof claimed_1.default) {
            remaining -= s.claimRequest.amount();
        }
        else if (s instanceof lightning_payment_sent_1.default) {
            if (!(c instanceof lightning_payment_1.default)) {
                throw new Error('got lighting payment sent status for a non lightning payment?');
            }
            const overpaid = c.fee - s.totalFees;
            if (overpaid < 0) {
                throw new Error('assertion failed, actual lightning fees higher than paid: ' + c.hash().toPOD());
            }
            remaining += overpaid;
        }
        else if (s instanceof invoice_settled_1.default) {
            remaining += s.amount;
        }
        else if (s instanceof bitcoin_transaction_sent_1.default) {
            // do nothing
        }
        else if (s instanceof hookin_accepted_1.default) {
            if (!(c instanceof hookin_1.default)) {
                throw new Error('assertion failure. hookin accepted for non-hookin?!');
            }
            remaining += Math.max(c.amount - s.consolidationFee, 0);
        }
        else {
            const _ = s;
            throw new Error('Unexpected Status: ' + s);
        }
    }
    if (remaining < 0) {
        throw new Error('assertion failed, claimable remaining is less than 0: ' + c.hash().toPOD());
    }
    return remaining;
}
exports.default = computeClaimableRemaining;
//# sourceMappingURL=compute-claimable-remaining.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/failed.js":
/*!*********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/failed.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abstract_status_1 = __webpack_require__(/*! ./abstract-status */ "./node_modules/moneypot-lib/dist/status/abstract-status.js");
const hash_1 = __webpack_require__(/*! ../hash */ "./node_modules/moneypot-lib/dist/hash.js");
const buffutils = __webpack_require__(/*! ../util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const POD = __webpack_require__(/*! ../pod */ "./node_modules/moneypot-lib/dist/pod.js");
class Failed extends abstract_status_1.default {
    constructor(claimableHash, reason, rebate) {
        super(claimableHash);
        this.reason = reason;
        this.rebate = rebate;
    }
    hash() {
        return hash_1.default.fromMessage('Failed', this.buffer, buffutils.fromString(this.reason), buffutils.fromUint64(this.rebate));
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            claimableHash: this.claimableHash.toPOD(),
            reason: this.reason,
            rebate: this.rebate,
        };
    }
    static fromPOD(obj) {
        if (typeof obj !== 'object') {
            return new Error('Failed.fromPOD expected an object');
        }
        const claimableHash = hash_1.default.fromPOD(obj.claimableHash);
        if (claimableHash instanceof Error) {
            return claimableHash;
        }
        const reason = obj.reason;
        if (typeof reason !== 'string') {
            return new Error('Failed.fromPOD expected a string reason');
        }
        const rebate = obj.rebate;
        if (!POD.isAmount(rebate)) {
            return new Error('rebate is not an amount');
        }
        return new Failed(claimableHash, reason, rebate);
    }
}
exports.default = Failed;
//# sourceMappingURL=failed.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/hookin-accepted.js":
/*!******************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/hookin-accepted.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abstract_status_1 = __webpack_require__(/*! ./abstract-status */ "./node_modules/moneypot-lib/dist/status/abstract-status.js");
const hash_1 = __webpack_require__(/*! ../hash */ "./node_modules/moneypot-lib/dist/hash.js");
const POD = __webpack_require__(/*! ../pod */ "./node_modules/moneypot-lib/dist/pod.js");
const buffutils = __webpack_require__(/*! ../util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
class HookinAccepted extends abstract_status_1.default {
    constructor(claimableHash, consolidationFee) {
        super(claimableHash);
        this.consolidationFee = consolidationFee;
    }
    hash() {
        const h = hash_1.default.newBuilder('HookinAccepted');
        h.update(this.claimableHash.buffer);
        h.update(buffutils.fromUint64(this.consolidationFee));
        return h.digest();
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            claimableHash: this.claimableHash.toPOD(),
            consolidationFee: this.consolidationFee,
        };
    }
    static fromPOD(data) {
        if (typeof data !== 'object') {
            throw new Error('HookinAccepted.fromPOD must take an object');
        }
        const claimableHash = hash_1.default.fromPOD(data.claimableHash);
        if (claimableHash instanceof Error) {
            return claimableHash;
        }
        const consolidationFee = data.consolidationFee;
        if (!POD.isAmount(consolidationFee)) {
            throw new Error('HookinAccepted.fromPOD expected an amount consolidation fee');
        }
        return new HookinAccepted(claimableHash, consolidationFee);
    }
}
exports.default = HookinAccepted;
//# sourceMappingURL=hookin-accepted.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/index.js":
/*!********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/index.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const claimed_1 = __webpack_require__(/*! ./claimed */ "./node_modules/moneypot-lib/dist/status/claimed.js");
const failed_1 = __webpack_require__(/*! ./failed */ "./node_modules/moneypot-lib/dist/status/failed.js");
const bitcoin_transaction_sent_1 = __webpack_require__(/*! ./bitcoin-transaction-sent */ "./node_modules/moneypot-lib/dist/status/bitcoin-transaction-sent.js");
const invoice_settled_1 = __webpack_require__(/*! ./invoice-settled */ "./node_modules/moneypot-lib/dist/status/invoice-settled.js");
const lightning_payment_sent_1 = __webpack_require__(/*! ./lightning-payment-sent */ "./node_modules/moneypot-lib/dist/status/lightning-payment-sent.js");
const hookin_accepted_1 = __webpack_require__(/*! ./hookin-accepted */ "./node_modules/moneypot-lib/dist/status/hookin-accepted.js");
function statusFromPOD(obj) {
    if (typeof obj !== 'object' || typeof obj.kind !== 'string') {
        return new Error('parseTransfer expected an object with a kind to parse');
    }
    const parser = findParser(obj.kind);
    if (parser instanceof Error) {
        return parser;
    }
    const parseResult = parser(obj);
    if (parseResult instanceof Error) {
        return parseResult;
    }
    if (parseResult.hash().toPOD() !== obj.hash) {
        return new Error('status had mismatching hash');
    }
    return parseResult;
}
exports.statusFromPOD = statusFromPOD;
function findParser(kind) {
    switch (kind) {
        case 'Failed':
            return failed_1.default.fromPOD;
        case 'BitcoinTransactionSent':
            return bitcoin_transaction_sent_1.default.fromPOD;
        case 'InvoiceSettled':
            return invoice_settled_1.default.fromPOD;
        case 'Claimed':
            return claimed_1.default.fromPOD;
        case 'LightningPaymentSent':
            return lightning_payment_sent_1.default.fromPOD;
        case 'HookinAccepted':
            return hookin_accepted_1.default.fromPOD;
        default:
            return new Error('Unknown status kind: ' + kind);
    }
}
function statusToPOD(s) {
    if (s instanceof bitcoin_transaction_sent_1.default) {
        return { kind: 'BitcoinTransactionSent', ...s.toPOD() };
    }
    else if (s instanceof failed_1.default) {
        return { kind: 'Failed', ...s.toPOD() };
    }
    else if (s instanceof invoice_settled_1.default) {
        return { kind: 'InvoiceSettled', ...s.toPOD() };
    }
    else if (s instanceof claimed_1.default) {
        return { kind: 'Claimed', ...s.toPOD() };
    }
    else if (s instanceof lightning_payment_sent_1.default) {
        return { kind: 'LightningPaymentSent', ...s.toPOD() };
    }
    else if (s instanceof hookin_accepted_1.default) {
        return { kind: 'HookinAccepted', ...s.toPOD() };
    }
    else {
        const _ = s;
        throw new Error('uknown status: ' + s);
    }
}
exports.statusToPOD = statusToPOD;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/invoice-settled.js":
/*!******************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/invoice-settled.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abstract_status_1 = __webpack_require__(/*! ./abstract-status */ "./node_modules/moneypot-lib/dist/status/abstract-status.js");
const hash_1 = __webpack_require__(/*! ../hash */ "./node_modules/moneypot-lib/dist/hash.js");
const buffutils = __webpack_require__(/*! ../util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const POD = __webpack_require__(/*! ../pod */ "./node_modules/moneypot-lib/dist/pod.js");
class InvoiceSettled extends abstract_status_1.default {
    constructor(claimableHash, amount, rPreimage, time) {
        super(claimableHash);
        this.amount = amount;
        this.rPreimage = rPreimage;
        this.time = time;
    }
    hash() {
        return hash_1.default.fromMessage('InvoiceSettled', this.buffer, buffutils.fromUint64(this.amount), this.rPreimage, buffutils.fromUint64(this.time.getTime()));
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            claimableHash: this.claimableHash.toPOD(),
            amount: this.amount,
            rPreimage: buffutils.toHex(this.rPreimage),
            time: this.time.toISOString(),
        };
    }
    static fromPOD(obj) {
        if (typeof obj !== 'object') {
            return new Error('InvoiceSettled.fromPOD expected an object');
        }
        const claimableHash = hash_1.default.fromPOD(obj.claimableHash);
        if (claimableHash instanceof Error) {
            return claimableHash;
        }
        const amount = obj.amount;
        if (!POD.isAmount(amount)) {
            return new Error('InvoiceSettled.fromPOD expected a valid amount');
        }
        const rPreimage = buffutils.fromHex(obj.rPreimage, 32);
        if (rPreimage instanceof Error) {
            return rPreimage;
        }
        const ms = Date.parse(obj.time);
        if (!Number.isFinite(ms)) {
            return new Error('InvoiceSettled.fromPOD expected a valid time');
        }
        const time = new Date(ms);
        if (time.toISOString() !== obj.time) {
            // canonical check...
            return new Error('InvoiceSettled.fromPOD got a strangely formatted time');
        }
        return new InvoiceSettled(claimableHash, amount, rPreimage, time);
    }
}
exports.default = InvoiceSettled;
//# sourceMappingURL=invoice-settled.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/status/lightning-payment-sent.js":
/*!*************************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/status/lightning-payment-sent.js ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const abstract_status_1 = __webpack_require__(/*! ./abstract-status */ "./node_modules/moneypot-lib/dist/status/abstract-status.js");
const hash_1 = __webpack_require__(/*! ../hash */ "./node_modules/moneypot-lib/dist/hash.js");
const buffutils = __webpack_require__(/*! ../util/buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const POD = __webpack_require__(/*! ../pod */ "./node_modules/moneypot-lib/dist/pod.js");
class LightningPaymentSent extends abstract_status_1.default {
    constructor(claimableHash, paymentPreimage, totalFees) {
        super(claimableHash);
        this.paymentPreimage = paymentPreimage;
        this.totalFees = totalFees;
    }
    hash() {
        return hash_1.default.fromMessage('LightningPaymentSent', this.buffer, this.paymentPreimage, buffutils.fromUint64(this.totalFees));
    }
    toPOD() {
        return {
            hash: this.hash().toPOD(),
            claimableHash: this.claimableHash.toPOD(),
            paymentPreimage: buffutils.toHex(this.paymentPreimage),
            totalFees: this.totalFees,
        };
    }
    static fromPOD(obj) {
        if (typeof obj !== 'object') {
            return new Error('LightningPaymentSent.fromPOD expected an object');
        }
        const claimableHash = hash_1.default.fromPOD(obj.claimableHash);
        if (claimableHash instanceof Error) {
            return claimableHash;
        }
        const paymentPreimage = buffutils.fromHex(obj.paymentPreimage, 32);
        if (paymentPreimage instanceof Error) {
            return paymentPreimage;
        }
        const totalFees = obj.totalFees;
        if (!POD.isAmount(totalFees)) {
            return new Error('LightningPaymentSent.fromPOD expected a valid totalFees');
        }
        return new LightningPaymentSent(claimableHash, paymentPreimage, totalFees);
    }
}
exports.default = LightningPaymentSent;
//# sourceMappingURL=lightning-payment-sent.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/assert.js":
/*!*******************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/assert.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function default_1(x) {
    if (!x) {
        throw new Error('assertion failed');
    }
}
exports.default = default_1;
function equal(l, r) {
    if (l !== r) {
        console.error('assertion failed: ', l, ' !=== ', r);
        throw new Error('assertion failed');
    }
}
exports.equal = equal;
function is(l, r) {
    if (!(l instanceof r)) {
        console.error('assertion failed: ', l, ' is not instance of ', r);
        throw new Error('assertion failed');
    }
}
exports.is = is;
function check(f, x) {
    if (f(x) !== true) {
        console.error('assertion failed: ', x, ' didnt pass the test');
        throw new Error('assertion failed');
    }
}
exports.check = check;
//# sourceMappingURL=assert.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/base58.js":
/*!*******************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/base58.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
if (ALPHABET.length >= 255) {
    throw new TypeError('Alphabet too long');
}
const BASE_MAP = new Uint8Array(256);
BASE_MAP.fill(255);
for (let i = 0; i < ALPHABET.length; i++) {
    const x = ALPHABET.charAt(i);
    const xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
        throw new TypeError(x + ' is ambiguous');
    }
    BASE_MAP[xc] = i;
}
const BASE = ALPHABET.length;
const LEADER = ALPHABET.charAt(0);
const FACTOR = Math.log(BASE) / Math.log(256); // log(BASE) / log(256), rounded up
const iFACTOR = Math.log(256) / Math.log(BASE); // log(256) / log(BASE), rounded up
function encode(source) {
    if (source.length === 0) {
        return '';
    }
    // Skip & count leading zeroes.
    let zeroes = 0;
    let length = 0;
    let pbegin = 0;
    const pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
        pbegin++;
        zeroes++;
    }
    // Allocate enough space in big-endian base58 representation.
    const size = ((pend - pbegin) * iFACTOR + 1) >>> 0;
    const b58 = new Uint8Array(size);
    // Process the bytes.
    while (pbegin !== pend) {
        let carry = source[pbegin];
        // Apply "b58 = b58 * 256 + ch".
        let i = 0;
        for (let it = size - 1; (carry !== 0 || i < length) && it !== -1; it--, i++) {
            carry += (256 * b58[it]) >>> 0;
            b58[it] = carry % BASE >>> 0;
            carry = (carry / BASE) >>> 0;
        }
        if (carry !== 0) {
            throw new Error('Non-zero carry');
        }
        length = i;
        pbegin++;
    }
    // Skip leading zeroes in base58 result.
    let it = size - length;
    while (it !== size && b58[it] === 0) {
        it++;
    }
    // Translate the result into a string.
    let str = LEADER.repeat(zeroes);
    for (; it < size; ++it) {
        str += ALPHABET.charAt(b58[it]);
    }
    return str;
}
exports.encode = encode;
function decodeUnsafe(source) {
    if (typeof source !== 'string') {
        throw new TypeError('Expected String');
    }
    if (source.length === 0) {
        return new Uint8Array(0);
    }
    let psz = 0;
    // Skip leading spaces.
    if (source[psz] === ' ') {
        return;
    }
    // Skip and count leading '1's.
    let zeroes = 0;
    let length = 0;
    while (source[psz] === LEADER) {
        zeroes++;
        psz++;
    }
    // Allocate enough space in big-endian base256 representation.
    const size = ((source.length - psz) * FACTOR + 1) >>> 0; // log(58) / log(256), rounded up.
    const b256 = new Uint8Array(size);
    // Process the characters.
    while (source[psz]) {
        // Decode character
        let carry = BASE_MAP[source.charCodeAt(psz)];
        // Invalid character
        if (carry === 255) {
            return;
        }
        let i = 0;
        for (let it = size - 1; (carry !== 0 || i < length) && it !== -1; it--, i++) {
            carry += (BASE * b256[it]) >>> 0;
            b256[it] = carry % 256 >>> 0;
            carry = (carry / 256) >>> 0;
        }
        if (carry !== 0) {
            throw new Error('Non-zero carry');
        }
        length = i;
        psz++;
    }
    // Skip trailing spaces.
    if (source[psz] === ' ') {
        return;
    }
    // Skip leading zeroes in b256.
    let it = size - length;
    while (it !== size && b256[it] === 0) {
        it++;
    }
    const vch = new Uint8Array(zeroes + (size - it));
    //vch.fill(0x00, 0, zeroes);
    let j = zeroes;
    while (it !== size) {
        vch[j++] = b256[it++];
    }
    return vch;
}
exports.decodeUnsafe = decodeUnsafe;
function decode(str) {
    const buffer = decodeUnsafe(str);
    if (buffer) {
        return buffer;
    }
    throw new Error('Non-base' + BASE + ' character');
}
exports.decode = decode;
//# sourceMappingURL=base58.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/bcrypto/hmac.js":
/*!*************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/bcrypto/hmac.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __webpack_require__(/*! ../assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
class HMAC {
    constructor(Hash, size, x = [], y = []) {
        this.hash = Hash;
        this.size = size;
        this.inner = Hash();
        this.outer = Hash();
    }
    init(key) {
        // Shorten key
        if (key.length > this.size) {
            const h = this.hash();
            h.init();
            h.update(key);
            key = h.final();
            assert_1.default(key.length <= this.size);
        }
        // Pad key
        const pad = new Uint8Array(this.size);
        for (let i = 0; i < key.length; i++)
            pad[i] = key[i] ^ 0x36;
        for (let i = key.length; i < pad.length; i++)
            pad[i] = 0x36;
        this.inner.init();
        this.inner.update(pad);
        for (let i = 0; i < key.length; i++)
            pad[i] = key[i] ^ 0x5c;
        for (let i = key.length; i < pad.length; i++)
            pad[i] = 0x5c;
        this.outer.init();
        this.outer.update(pad);
        return this;
    }
    update(data) {
        this.inner.update(data);
        return this;
    }
    final() {
        this.outer.update(this.inner.final());
        return this.outer.final();
    }
}
exports.default = HMAC;
//# sourceMappingURL=hmac.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/bcrypto/ripemd160.js":
/*!******************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/bcrypto/ripemd160.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(Buffer) {
Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __webpack_require__(/*! ../assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const buffutils = __webpack_require__(/*! ../buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const hmac_1 = __webpack_require__(/*! ./hmac */ "./node_modules/moneypot-lib/dist/util/bcrypto/hmac.js");
const FINALIZED = -1;
const DESC = new Uint8Array(8);
const PADDING = new Uint8Array(64);
PADDING[0] = 0x80;
const r = [
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    10,
    11,
    12,
    13,
    14,
    15,
    7,
    4,
    13,
    1,
    10,
    6,
    15,
    3,
    12,
    0,
    9,
    5,
    2,
    14,
    11,
    8,
    3,
    10,
    14,
    4,
    9,
    15,
    8,
    1,
    2,
    7,
    0,
    6,
    13,
    11,
    5,
    12,
    1,
    9,
    11,
    10,
    0,
    8,
    12,
    4,
    13,
    3,
    7,
    15,
    14,
    5,
    6,
    2,
    4,
    0,
    5,
    9,
    7,
    12,
    2,
    10,
    14,
    1,
    3,
    8,
    11,
    6,
    15,
    13,
];
const rh = [
    5,
    14,
    7,
    0,
    9,
    2,
    11,
    4,
    13,
    6,
    15,
    8,
    1,
    10,
    3,
    12,
    6,
    11,
    3,
    7,
    0,
    13,
    5,
    10,
    14,
    15,
    8,
    12,
    4,
    9,
    1,
    2,
    15,
    5,
    1,
    3,
    7,
    14,
    6,
    9,
    11,
    8,
    12,
    2,
    10,
    0,
    4,
    13,
    8,
    6,
    4,
    1,
    3,
    11,
    15,
    0,
    5,
    12,
    2,
    13,
    9,
    7,
    10,
    14,
    12,
    15,
    10,
    4,
    1,
    5,
    8,
    7,
    6,
    2,
    13,
    14,
    0,
    3,
    9,
    11,
];
const s = [
    11,
    14,
    15,
    12,
    5,
    8,
    7,
    9,
    11,
    13,
    14,
    15,
    6,
    7,
    9,
    8,
    7,
    6,
    8,
    13,
    11,
    9,
    7,
    15,
    7,
    12,
    15,
    9,
    11,
    7,
    13,
    12,
    11,
    13,
    6,
    7,
    14,
    9,
    13,
    15,
    14,
    8,
    13,
    6,
    5,
    12,
    7,
    5,
    11,
    12,
    14,
    15,
    14,
    15,
    9,
    8,
    9,
    14,
    5,
    6,
    8,
    6,
    5,
    12,
    9,
    15,
    5,
    11,
    6,
    8,
    13,
    12,
    5,
    12,
    13,
    14,
    11,
    8,
    5,
    6,
];
const sh = [
    8,
    9,
    9,
    11,
    13,
    15,
    15,
    5,
    7,
    7,
    8,
    11,
    14,
    14,
    12,
    6,
    9,
    13,
    15,
    7,
    12,
    8,
    9,
    11,
    7,
    7,
    12,
    7,
    6,
    15,
    13,
    11,
    9,
    7,
    15,
    11,
    8,
    6,
    6,
    14,
    12,
    13,
    5,
    14,
    13,
    13,
    7,
    5,
    15,
    5,
    8,
    11,
    14,
    14,
    6,
    14,
    6,
    9,
    12,
    9,
    12,
    5,
    15,
    8,
    8,
    5,
    12,
    9,
    12,
    5,
    14,
    6,
    8,
    13,
    6,
    5,
    15,
    13,
    11,
    11,
];
class RIPEMD160 {
    constructor() {
        this.state = new Uint32Array(5);
        this.msg = new Uint32Array(16);
        this.block = Buffer.allocUnsafe(64);
        this.size = FINALIZED;
        this.init();
    }
    init() {
        this.state[0] = 0x67452301;
        this.state[1] = 0xefcdab89;
        this.state[2] = 0x98badcfe;
        this.state[3] = 0x10325476;
        this.state[4] = 0xc3d2e1f0;
        this.size = 0;
        return this;
    }
    update(data) {
        this._update(data, data.length);
        return this;
    }
    final() {
        return this._final(new Uint8Array(20));
    }
    _update(data, len) {
        assert_1.default(this.size !== FINALIZED);
        let pos = this.size & 0x3f;
        let off = 0;
        this.size += len;
        if (pos > 0) {
            let want = 64 - pos;
            if (want > len)
                want = len;
            buffutils.copy(data, this.block, pos, off, off + want);
            pos += want;
            len -= want;
            off += want;
            if (pos < 64)
                return;
            this.transform(this.block, 0);
        }
        while (len >= 64) {
            this.transform(data, off);
            off += 64;
            len -= 64;
        }
        if (len > 0) {
            buffutils.copy(data, this.block, 0, off, off + len);
        }
    }
    /**
     * Finalize RIPEMD160 context.
     * @private
     * @param {Buffer} out
     * @returns {Buffer}
     */
    _final(out) {
        assert_1.default(this.size !== FINALIZED);
        const pos = this.size % 64;
        const len = this.size * 8;
        writeU32(DESC, len, 0);
        writeU32(DESC, len * (1 / 0x100000000), 4);
        this._update(PADDING, 1 + ((119 - pos) % 64));
        this._update(DESC, 8);
        for (let i = 0; i < 5; i++) {
            writeU32(out, this.state[i], i * 4);
            this.state[i] = 0;
        }
        for (let i = 0; i < 16; i++)
            this.msg[i] = 0;
        for (let i = 0; i < 64; i++)
            this.block[i] = 0;
        this.size = FINALIZED;
        return out;
    }
    transform(chunk, pos) {
        const W = this.msg;
        let A = this.state[0];
        let B = this.state[1];
        let C = this.state[2];
        let D = this.state[3];
        let E = this.state[4];
        let Ah = A;
        let Bh = B;
        let Ch = C;
        let Dh = D;
        let Eh = E;
        for (let i = 0; i < 16; i++)
            W[i] = readU32(chunk, pos + i * 4);
        for (let j = 0; j < 80; j++) {
            let a = A + f(j, B, C, D) + W[r[j]] + K(j);
            let b = rotl32(a, s[j]);
            let T = b + E;
            A = E;
            E = D;
            D = rotl32(C, 10);
            C = B;
            B = T;
            a = Ah + f(79 - j, Bh, Ch, Dh) + W[rh[j]] + Kh(j);
            b = rotl32(a, sh[j]);
            T = b + Eh;
            Ah = Eh;
            Eh = Dh;
            Dh = rotl32(Ch, 10);
            Ch = Bh;
            Bh = T;
        }
        const T = this.state[1] + C + Dh;
        this.state[1] = this.state[2] + D + Eh;
        this.state[2] = this.state[3] + E + Ah;
        this.state[3] = this.state[4] + A + Bh;
        this.state[4] = this.state[0] + B + Ch;
        this.state[0] = T;
    }
    static hash() {
        return new RIPEMD160();
    }
    static hmac() {
        return new hmac_1.default(RIPEMD160.hash, 64);
    }
    static digest(...data) {
        const h = new RIPEMD160();
        for (const d of data) {
            h.update(d);
        }
        return h.final();
    }
    static mac(key, data) {
        const m = RIPEMD160.hmac();
        m.init(key);
        m.update(data);
        return m.final();
    }
}
exports.default = RIPEMD160;
/*
 * Helpers
 */
function rotl32(w, b) {
    return (w << b) | (w >>> (32 - b));
}
function f(j, x, y, z) {
    if (j <= 15)
        return x ^ y ^ z;
    if (j <= 31)
        return (x & y) | (~x & z);
    if (j <= 47)
        return (x | ~y) ^ z;
    if (j <= 63)
        return (x & z) | (y & ~z);
    return x ^ (y | ~z);
}
function K(j) {
    if (j <= 15)
        return 0x00000000;
    if (j <= 31)
        return 0x5a827999;
    if (j <= 47)
        return 0x6ed9eba1;
    if (j <= 63)
        return 0x8f1bbcdc;
    return 0xa953fd4e;
}
function Kh(j) {
    if (j <= 15)
        return 0x50a28be6;
    if (j <= 31)
        return 0x5c4dd124;
    if (j <= 47)
        return 0x6d703ef3;
    if (j <= 63)
        return 0x7a6d76e9;
    return 0x00000000;
}
function writeU32(buf, value, offset) {
    buf[offset + 3] = value >>> 24;
    buf[offset + 2] = (value >> 16) & 0xff;
    buf[offset + 1] = (value >> 8) & 0xff;
    buf[offset] = value & 0xff;
}
function readU32(buf, offset) {
    return ((buf[offset + 3] & 0xff) * 0x1000000 +
        (((buf[offset + 2] & 0xff) << 16) | ((buf[offset + 1] & 0xff) << 8) | (buf[offset] & 0xff)));
}
//# sourceMappingURL=ripemd160.js.map
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../buffer/index.js */ "./node_modules/buffer/index.js").Buffer))

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js":
/*!***************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __webpack_require__(/*! ../assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const hmac_1 = __webpack_require__(/*! ./hmac */ "./node_modules/moneypot-lib/dist/util/bcrypto/hmac.js");
const buffutils = __webpack_require__(/*! ../buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
/*
 * Constants
 */
const FINALIZED = -1;
const DESC = new Uint8Array(8);
const PADDING = new Uint8Array(64);
PADDING[0] = 0x80;
const K = new Uint32Array([
    0x428a2f98,
    0x71374491,
    0xb5c0fbcf,
    0xe9b5dba5,
    0x3956c25b,
    0x59f111f1,
    0x923f82a4,
    0xab1c5ed5,
    0xd807aa98,
    0x12835b01,
    0x243185be,
    0x550c7dc3,
    0x72be5d74,
    0x80deb1fe,
    0x9bdc06a7,
    0xc19bf174,
    0xe49b69c1,
    0xefbe4786,
    0x0fc19dc6,
    0x240ca1cc,
    0x2de92c6f,
    0x4a7484aa,
    0x5cb0a9dc,
    0x76f988da,
    0x983e5152,
    0xa831c66d,
    0xb00327c8,
    0xbf597fc7,
    0xc6e00bf3,
    0xd5a79147,
    0x06ca6351,
    0x14292967,
    0x27b70a85,
    0x2e1b2138,
    0x4d2c6dfc,
    0x53380d13,
    0x650a7354,
    0x766a0abb,
    0x81c2c92e,
    0x92722c85,
    0xa2bfe8a1,
    0xa81a664b,
    0xc24b8b70,
    0xc76c51a3,
    0xd192e819,
    0xd6990624,
    0xf40e3585,
    0x106aa070,
    0x19a4c116,
    0x1e376c08,
    0x2748774c,
    0x34b0bcb5,
    0x391c0cb3,
    0x4ed8aa4a,
    0x5b9cca4f,
    0x682e6ff3,
    0x748f82ee,
    0x78a5636f,
    0x84c87814,
    0x8cc70208,
    0x90befffa,
    0xa4506ceb,
    0xbef9a3f7,
    0xc67178f2,
]);
/**
 * SHA256
 */
class SHA256 {
    constructor() {
        this.state = new Uint32Array(8);
        this.msg = new Uint32Array(64);
        this.block = new Uint8Array(64);
        this.size = FINALIZED;
        this.init();
    }
    init() {
        this.state[0] = 0x6a09e667;
        this.state[1] = 0xbb67ae85;
        this.state[2] = 0x3c6ef372;
        this.state[3] = 0xa54ff53a;
        this.state[4] = 0x510e527f;
        this.state[5] = 0x9b05688c;
        this.state[6] = 0x1f83d9ab;
        this.state[7] = 0x5be0cd19;
        this.size = 0;
        return this;
    }
    update(data) {
        this._update(data, data.length);
        return this;
    }
    final() {
        return this._final(new Uint8Array(32));
    }
    _update(data, len) {
        assert_1.default(this.size !== FINALIZED);
        let pos = this.size & 0x3f;
        let off = 0;
        this.size += len;
        if (pos > 0) {
            let want = 64 - pos;
            if (want > len)
                want = len;
            buffutils.copy(data, this.block, pos, off, off + want);
            pos += want;
            len -= want;
            off += want;
            if (pos < 64)
                return;
            this.transform(this.block, 0);
        }
        while (len >= 64) {
            this.transform(data, off);
            off += 64;
            len -= 64;
        }
        if (len > 0) {
            buffutils.copy(data, this.block, 0, off, off + len);
        }
    }
    _final(out) {
        assert_1.default(this.size !== FINALIZED);
        const pos = this.size % 64;
        const len = this.size * 8;
        writeU32(DESC, len * (1 / 0x100000000), 0);
        writeU32(DESC, len, 4);
        this._update(PADDING, 1 + ((119 - pos) % 64));
        this._update(DESC, 8);
        for (let i = 0; i < 8; i++) {
            writeU32(out, this.state[i], i * 4);
            this.state[i] = 0;
        }
        for (let i = 0; i < 64; i++)
            this.msg[i] = 0;
        for (let i = 0; i < 64; i++)
            this.block[i] = 0;
        this.size = FINALIZED;
        return out;
    }
    transform(chunk, pos) {
        const W = this.msg;
        let a = this.state[0];
        let b = this.state[1];
        let c = this.state[2];
        let d = this.state[3];
        let e = this.state[4];
        let f = this.state[5];
        let g = this.state[6];
        let h = this.state[7];
        let i = 0;
        for (; i < 16; i++)
            W[i] = readU32(chunk, pos + i * 4);
        for (; i < 64; i++)
            W[i] = sigma1(W[i - 2]) + W[i - 7] + sigma0(W[i - 15]) + W[i - 16];
        for (i = 0; i < 64; i++) {
            let t1 = h + Sigma1(e);
            t1 += Ch(e, f, g);
            t1 += K[i] + W[i];
            let t2 = Sigma0(a);
            t2 += Maj(a, b, c);
            h = g;
            g = f;
            f = e;
            e = d + t1;
            d = c;
            c = b;
            b = a;
            a = t1 + t2;
        }
        this.state[0] += a;
        this.state[1] += b;
        this.state[2] += c;
        this.state[3] += d;
        this.state[4] += e;
        this.state[5] += f;
        this.state[6] += g;
        this.state[7] += h;
    }
    static hash() {
        return new SHA256();
    }
    static hmac() {
        return new hmac_1.default(SHA256.hash, 64);
    }
    static digest(...data) {
        const h = new SHA256();
        for (const d of data) {
            h.update(d);
        }
        return h.final();
    }
    static mac(key, data) {
        const m = SHA256.hmac();
        m.init(key);
        m.update(data);
        return m.final();
    }
}
exports.default = SHA256;
function Sigma0(x) {
    return ((x >>> 2) | (x << 30)) ^ ((x >>> 13) | (x << 19)) ^ ((x >>> 22) | (x << 10));
}
function Sigma1(x) {
    return ((x >>> 6) | (x << 26)) ^ ((x >>> 11) | (x << 21)) ^ ((x >>> 25) | (x << 7));
}
function sigma0(x) {
    return ((x >>> 7) | (x << 25)) ^ ((x >>> 18) | (x << 14)) ^ (x >>> 3);
}
function sigma1(x) {
    return ((x >>> 17) | (x << 15)) ^ ((x >>> 19) | (x << 13)) ^ (x >>> 10);
}
function Ch(x, y, z) {
    return z ^ (x & (y ^ z));
}
function Maj(x, y, z) {
    return (x & y) | (z & (x | y));
}
function writeU32(buf, value, offset) {
    buf[offset] = value >>> 24;
    buf[offset + 1] = (value >> 16) & 0xff;
    buf[offset + 2] = (value >> 8) & 0xff;
    buf[offset + 3] = value & 0xff;
}
function readU32(buf, offset) {
    return ((buf[offset] & 0xff) * 0x1000000 +
        (((buf[offset + 1] & 0xff) << 16) | ((buf[offset + 2] & 0xff) << 8) | (buf[offset + 3] & 0xff)));
}
//# sourceMappingURL=sha256.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/bcrypto/sha512.js":
/*!***************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/bcrypto/sha512.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __webpack_require__(/*! ../assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const buffutils = __webpack_require__(/*! ../buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const hmac_1 = __webpack_require__(/*! ./hmac */ "./node_modules/moneypot-lib/dist/util/bcrypto/hmac.js");
/*
 * Constants
 */
const FINALIZED = -1;
const DESC = new Uint8Array(16);
const PADDING = new Uint8Array(128);
PADDING[0] = 0x80;
const K = new Uint32Array([
    0x428a2f98,
    0xd728ae22,
    0x71374491,
    0x23ef65cd,
    0xb5c0fbcf,
    0xec4d3b2f,
    0xe9b5dba5,
    0x8189dbbc,
    0x3956c25b,
    0xf348b538,
    0x59f111f1,
    0xb605d019,
    0x923f82a4,
    0xaf194f9b,
    0xab1c5ed5,
    0xda6d8118,
    0xd807aa98,
    0xa3030242,
    0x12835b01,
    0x45706fbe,
    0x243185be,
    0x4ee4b28c,
    0x550c7dc3,
    0xd5ffb4e2,
    0x72be5d74,
    0xf27b896f,
    0x80deb1fe,
    0x3b1696b1,
    0x9bdc06a7,
    0x25c71235,
    0xc19bf174,
    0xcf692694,
    0xe49b69c1,
    0x9ef14ad2,
    0xefbe4786,
    0x384f25e3,
    0x0fc19dc6,
    0x8b8cd5b5,
    0x240ca1cc,
    0x77ac9c65,
    0x2de92c6f,
    0x592b0275,
    0x4a7484aa,
    0x6ea6e483,
    0x5cb0a9dc,
    0xbd41fbd4,
    0x76f988da,
    0x831153b5,
    0x983e5152,
    0xee66dfab,
    0xa831c66d,
    0x2db43210,
    0xb00327c8,
    0x98fb213f,
    0xbf597fc7,
    0xbeef0ee4,
    0xc6e00bf3,
    0x3da88fc2,
    0xd5a79147,
    0x930aa725,
    0x06ca6351,
    0xe003826f,
    0x14292967,
    0x0a0e6e70,
    0x27b70a85,
    0x46d22ffc,
    0x2e1b2138,
    0x5c26c926,
    0x4d2c6dfc,
    0x5ac42aed,
    0x53380d13,
    0x9d95b3df,
    0x650a7354,
    0x8baf63de,
    0x766a0abb,
    0x3c77b2a8,
    0x81c2c92e,
    0x47edaee6,
    0x92722c85,
    0x1482353b,
    0xa2bfe8a1,
    0x4cf10364,
    0xa81a664b,
    0xbc423001,
    0xc24b8b70,
    0xd0f89791,
    0xc76c51a3,
    0x0654be30,
    0xd192e819,
    0xd6ef5218,
    0xd6990624,
    0x5565a910,
    0xf40e3585,
    0x5771202a,
    0x106aa070,
    0x32bbd1b8,
    0x19a4c116,
    0xb8d2d0c8,
    0x1e376c08,
    0x5141ab53,
    0x2748774c,
    0xdf8eeb99,
    0x34b0bcb5,
    0xe19b48a8,
    0x391c0cb3,
    0xc5c95a63,
    0x4ed8aa4a,
    0xe3418acb,
    0x5b9cca4f,
    0x7763e373,
    0x682e6ff3,
    0xd6b2b8a3,
    0x748f82ee,
    0x5defb2fc,
    0x78a5636f,
    0x43172f60,
    0x84c87814,
    0xa1f0ab72,
    0x8cc70208,
    0x1a6439ec,
    0x90befffa,
    0x23631e28,
    0xa4506ceb,
    0xde82bde9,
    0xbef9a3f7,
    0xb2c67915,
    0xc67178f2,
    0xe372532b,
    0xca273ece,
    0xea26619c,
    0xd186b8c7,
    0x21c0c207,
    0xeada7dd6,
    0xcde0eb1e,
    0xf57d4f7f,
    0xee6ed178,
    0x06f067aa,
    0x72176fba,
    0x0a637dc5,
    0xa2c898a6,
    0x113f9804,
    0xbef90dae,
    0x1b710b35,
    0x131c471b,
    0x28db77f5,
    0x23047d84,
    0x32caab7b,
    0x40c72493,
    0x3c9ebe0a,
    0x15c9bebc,
    0x431d67c4,
    0x9c100d4c,
    0x4cc5d4be,
    0xcb3e42b6,
    0x597f299c,
    0xfc657e2a,
    0x5fcb6fab,
    0x3ad6faec,
    0x6c44198c,
    0x4a475817,
]);
class SHA512 {
    constructor() {
        this.state = new Uint32Array(16);
        this.msg = new Uint32Array(160);
        this.block = new Uint8Array(128);
        this.size = FINALIZED;
        this.init();
    }
    /**
     * Initialize SHA512 context.
     */
    init() {
        this.state[0] = 0x6a09e667;
        this.state[1] = 0xf3bcc908;
        this.state[2] = 0xbb67ae85;
        this.state[3] = 0x84caa73b;
        this.state[4] = 0x3c6ef372;
        this.state[5] = 0xfe94f82b;
        this.state[6] = 0xa54ff53a;
        this.state[7] = 0x5f1d36f1;
        this.state[8] = 0x510e527f;
        this.state[9] = 0xade682d1;
        this.state[10] = 0x9b05688c;
        this.state[11] = 0x2b3e6c1f;
        this.state[12] = 0x1f83d9ab;
        this.state[13] = 0xfb41bd6b;
        this.state[14] = 0x5be0cd19;
        this.state[15] = 0x137e2179;
        this.size = 0;
        return this;
    }
    update(data) {
        this._update(data, data.length);
        return this;
    }
    final() {
        return this._final(new Uint8Array(64));
    }
    _update(data, len) {
        assert_1.default(this.size !== FINALIZED);
        let pos = this.size & 0x7f;
        let off = 0;
        this.size += len;
        if (pos > 0) {
            let want = 128 - pos;
            if (want > len)
                want = len;
            buffutils.copy(data, this.block, pos, off, off + want);
            pos += want;
            len -= want;
            off += want;
            if (pos < 128)
                return;
            this.transform(this.block, 0);
        }
        while (len >= 128) {
            this.transform(data, off);
            off += 128;
            len -= 128;
        }
        if (len > 0) {
            buffutils.copy(data, this.block, 0, off, off + len);
        }
    }
    _final(out) {
        assert_1.default(this.size !== FINALIZED);
        const pos = this.size % 128;
        const len = this.size * 8;
        writeU32(DESC, len * (1 / 0x100000000), 8);
        writeU32(DESC, len, 12);
        this._update(PADDING, 1 + ((239 - pos) % 128));
        this._update(DESC, 16);
        for (let i = 0; i < 16; i++) {
            writeU32(out, this.state[i], i * 4);
            this.state[i] = 0;
        }
        for (let i = 0; i < 160; i++)
            this.msg[i] = 0;
        for (let i = 0; i < 128; i++)
            this.block[i] = 0;
        this.size = FINALIZED;
        return out;
    }
    prepare(chunk, pos) {
        const W = this.msg;
        let i = 0;
        for (; i < 32; i++)
            W[i] = readU32(chunk, pos + i * 4);
        for (; i < 160; i += 2) {
            const c0_hi = g1_512_hi(W[i - 4], W[i - 3]);
            const c0_lo = g1_512_lo(W[i - 4], W[i - 3]);
            const c1_hi = W[i - 14];
            const c1_lo = W[i - 13];
            const c2_hi = g0_512_hi(W[i - 30], W[i - 29]);
            const c2_lo = g0_512_lo(W[i - 30], W[i - 29]);
            const c3_hi = W[i - 32];
            const c3_lo = W[i - 31];
            W[i] = sum64_4_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
            W[i + 1] = sum64_4_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo);
        }
    }
    transform(chunk, pos) {
        const W = this.msg;
        this.prepare(chunk, pos);
        let ah = this.state[0];
        let al = this.state[1];
        let bh = this.state[2];
        let bl = this.state[3];
        let ch = this.state[4];
        let cl = this.state[5];
        let dh = this.state[6];
        let dl = this.state[7];
        let eh = this.state[8];
        let el = this.state[9];
        let fh = this.state[10];
        let fl = this.state[11];
        let gh = this.state[12];
        let gl = this.state[13];
        let hh = this.state[14];
        let hl = this.state[15];
        for (let i = 0; i < W.length; i += 2) {
            let c0_hi = hh;
            let c0_lo = hl;
            let c1_hi = s1_512_hi(eh, el);
            let c1_lo = s1_512_lo(eh, el);
            const c2_hi = ch64_hi(eh, el, fh, fl, gh);
            const c2_lo = ch64_lo(eh, el, fh, fl, gh, gl);
            const c3_hi = K[i];
            const c3_lo = K[i + 1];
            const c4_hi = W[i];
            const c4_lo = W[i + 1];
            const T1_hi = sum64_5_hi(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
            const T1_lo = sum64_5_lo(c0_hi, c0_lo, c1_hi, c1_lo, c2_hi, c2_lo, c3_hi, c3_lo, c4_hi, c4_lo);
            c0_hi = s0_512_hi(ah, al);
            c0_lo = s0_512_lo(ah, al);
            c1_hi = maj64_hi(ah, al, bh, bl, ch);
            c1_lo = maj64_lo(ah, al, bh, bl, ch, cl);
            const T2_hi = sum64_hi(c0_hi, c0_lo, c1_hi, c1_lo);
            const T2_lo = sum64_lo(c0_hi, c0_lo, c1_hi, c1_lo);
            hh = gh;
            hl = gl;
            gh = fh;
            gl = fl;
            fh = eh;
            fl = el;
            eh = sum64_hi(dh, dl, T1_hi, T1_lo);
            el = sum64_lo(dl, dl, T1_hi, T1_lo);
            dh = ch;
            dl = cl;
            ch = bh;
            cl = bl;
            bh = ah;
            bl = al;
            ah = sum64_hi(T1_hi, T1_lo, T2_hi, T2_lo);
            al = sum64_lo(T1_hi, T1_lo, T2_hi, T2_lo);
        }
        sum64(this.state, 0, ah, al);
        sum64(this.state, 2, bh, bl);
        sum64(this.state, 4, ch, cl);
        sum64(this.state, 6, dh, dl);
        sum64(this.state, 8, eh, el);
        sum64(this.state, 10, fh, fl);
        sum64(this.state, 12, gh, gl);
        sum64(this.state, 14, hh, hl);
    }
    static hash() {
        return new SHA512();
    }
    static hmac() {
        return new hmac_1.default(SHA512.hash, 128);
    }
    static digest(...data) {
        const h = new SHA512();
        for (const d of data) {
            h.update(d);
        }
        return h.final();
    }
    static mac(key, data) {
        const m = SHA512.hmac();
        m.init(key);
        m.update(data);
        return m.final();
    }
}
exports.default = SHA512;
/*
 * Helpers
 */
function sum64(buf, pos, ah, al) {
    const bh = buf[pos];
    const bl = buf[pos + 1];
    const lo = (al + bl) >>> 0;
    const hi = (lo < al ? 1 : 0) + ah + bh;
    buf[pos] = hi >>> 0;
    buf[pos + 1] = lo;
}
function sum64_hi(ah, al, bh, bl) {
    const lo = (al + bl) >>> 0;
    const hi = (lo < al ? 1 : 0) + ah + bh;
    return hi >>> 0;
}
function sum64_lo(ah, al, bh, bl) {
    const lo = al + bl;
    return lo >>> 0;
}
function sum64_4_hi(ah, al, bh, bl, ch, cl, dh, dl) {
    let carry = 0;
    let lo = al;
    lo = (lo + bl) >>> 0;
    carry += lo < al ? 1 : 0;
    lo = (lo + cl) >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = (lo + dl) >>> 0;
    carry += lo < dl ? 1 : 0;
    const hi = ah + bh + ch + dh + carry;
    return hi >>> 0;
}
function sum64_4_lo(ah, al, bh, bl, ch, cl, dh, dl) {
    const lo = al + bl + cl + dl;
    return lo >>> 0;
}
function sum64_5_hi(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    let carry = 0;
    let lo = al;
    lo = (lo + bl) >>> 0;
    carry += lo < al ? 1 : 0;
    lo = (lo + cl) >>> 0;
    carry += lo < cl ? 1 : 0;
    lo = (lo + dl) >>> 0;
    carry += lo < dl ? 1 : 0;
    lo = (lo + el) >>> 0;
    carry += lo < el ? 1 : 0;
    const hi = ah + bh + ch + dh + eh + carry;
    return hi >>> 0;
}
function sum64_5_lo(ah, al, bh, bl, ch, cl, dh, dl, eh, el) {
    const lo = al + bl + cl + dl + el;
    return lo >>> 0;
}
function rotr64_hi(ah, al, num) {
    const r = (al << (32 - num)) | (ah >>> num);
    return r >>> 0;
}
function rotr64_lo(ah, al, num) {
    const r = (ah << (32 - num)) | (al >>> num);
    return r >>> 0;
}
function shr64_hi(ah, al, num) {
    return ah >>> num;
}
function shr64_lo(ah, al, num) {
    const r = (ah << (32 - num)) | (al >>> num);
    return r >>> 0;
}
function ch64_hi(xh, xl, yh, yl, zh) {
    let r = (xh & yh) ^ (~xh & zh);
    if (r < 0)
        r += 0x100000000;
    return r;
}
function ch64_lo(xh, xl, yh, yl, zh, zl) {
    let r = (xl & yl) ^ (~xl & zl);
    if (r < 0)
        r += 0x100000000;
    return r;
}
function maj64_hi(xh, xl, yh, yl, zh) {
    let r = (xh & yh) ^ (xh & zh) ^ (yh & zh);
    if (r < 0)
        r += 0x100000000;
    return r;
}
function maj64_lo(xh, xl, yh, yl, zh, zl) {
    let r = (xl & yl) ^ (xl & zl) ^ (yl & zl);
    if (r < 0)
        r += 0x100000000;
    return r;
}
function s0_512_hi(xh, xl) {
    const c0_hi = rotr64_hi(xh, xl, 28);
    const c1_hi = rotr64_hi(xl, xh, 2); // 34
    const c2_hi = rotr64_hi(xl, xh, 7); // 39
    let r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
        r += 0x100000000;
    return r;
}
function s0_512_lo(xh, xl) {
    const c0_lo = rotr64_lo(xh, xl, 28);
    const c1_lo = rotr64_lo(xl, xh, 2); // 34
    const c2_lo = rotr64_lo(xl, xh, 7); // 39
    let r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
        r += 0x100000000;
    return r;
}
function s1_512_hi(xh, xl) {
    const c0_hi = rotr64_hi(xh, xl, 14);
    const c1_hi = rotr64_hi(xh, xl, 18);
    const c2_hi = rotr64_hi(xl, xh, 9); // 41
    let r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
        r += 0x100000000;
    return r;
}
function s1_512_lo(xh, xl) {
    const c0_lo = rotr64_lo(xh, xl, 14);
    const c1_lo = rotr64_lo(xh, xl, 18);
    const c2_lo = rotr64_lo(xl, xh, 9); // 41
    let r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
        r += 0x100000000;
    return r;
}
function g0_512_hi(xh, xl) {
    const c0_hi = rotr64_hi(xh, xl, 1);
    const c1_hi = rotr64_hi(xh, xl, 8);
    const c2_hi = shr64_hi(xh, xl, 7);
    let r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
        r += 0x100000000;
    return r;
}
function g0_512_lo(xh, xl) {
    const c0_lo = rotr64_lo(xh, xl, 1);
    const c1_lo = rotr64_lo(xh, xl, 8);
    const c2_lo = shr64_lo(xh, xl, 7);
    let r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
        r += 0x100000000;
    return r;
}
function g1_512_hi(xh, xl) {
    const c0_hi = rotr64_hi(xh, xl, 19);
    const c1_hi = rotr64_hi(xl, xh, 29); // 61
    const c2_hi = shr64_hi(xh, xl, 6);
    let r = c0_hi ^ c1_hi ^ c2_hi;
    if (r < 0)
        r += 0x100000000;
    return r;
}
function g1_512_lo(xh, xl) {
    const c0_lo = rotr64_lo(xh, xl, 19);
    const c1_lo = rotr64_lo(xl, xh, 29); // 61
    const c2_lo = shr64_lo(xh, xl, 6);
    let r = c0_lo ^ c1_lo ^ c2_lo;
    if (r < 0)
        r += 0x100000000;
    return r;
}
function writeU32(buf, value, offset) {
    buf[offset] = value >>> 24;
    buf[offset + 1] = (value >> 16) & 0xff;
    buf[offset + 2] = (value >> 8) & 0xff;
    buf[offset + 3] = value & 0xff;
}
function readU32(buf, offset) {
    return ((buf[offset] & 0xff) * 0x1000000 +
        (((buf[offset + 1] & 0xff) << 16) | ((buf[offset + 2] & 0xff) << 8) | (buf[offset + 3] & 0xff)));
}
//# sourceMappingURL=sha512.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/bech32.js":
/*!*******************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/bech32.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// taken from npm package bech32
Object.defineProperty(exports, "__esModule", { value: true });
const assert = __webpack_require__(/*! ./assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
exports.ALPHABET = 'qpzry9x8gf2tvdw0s3jn54khce6mua7l';
// pre-compute lookup table
const ALPHABET_MAP = new Map();
for (let z = 0; z < exports.ALPHABET.length; z++) {
    const x = exports.ALPHABET.charAt(z);
    if (ALPHABET_MAP.get(x) !== undefined) {
        throw new TypeError(x + ' is ambiguous');
    }
    ALPHABET_MAP.set(x, z);
}
function polymodStep(pre) {
    const b = pre >> 25;
    return (((pre & 0x1ffffff) << 5) ^
        (-((b >> 0) & 1) & 0x3b6a57b2) ^
        (-((b >> 1) & 1) & 0x26508e6d) ^
        (-((b >> 2) & 1) & 0x1ea119fa) ^
        (-((b >> 3) & 1) & 0x3d4233dd) ^
        (-((b >> 4) & 1) & 0x2a1462b3));
}
exports.polymodStep = polymodStep;
function prefixChk(prefix) {
    let chk = 1;
    for (let i = 0; i < prefix.length; ++i) {
        const c = prefix.charCodeAt(i);
        if (c < 33 || c > 126) {
            throw new Error('Invalid prefix (' + prefix + ')');
        }
        chk = polymodStep(chk) ^ (c >> 5);
    }
    chk = polymodStep(chk);
    for (let i = 0; i < prefix.length; ++i) {
        const v = prefix.charCodeAt(i);
        chk = polymodStep(chk) ^ (v & 0x1f);
    }
    return chk;
}
exports.prefixChk = prefixChk;
function encode(prefix, words) {
    prefix = prefix.toLowerCase();
    // determine chk mod
    let chk = prefixChk(prefix);
    let result = prefix + '1';
    for (let i = 0; i < words.length; ++i) {
        const x = words[i];
        if (x >> 5 !== 0) {
            throw new Error('Non 5-bit word');
        }
        chk = polymodStep(chk) ^ x;
        result += exports.ALPHABET.charAt(x);
    }
    for (let i = 0; i < 6; ++i) {
        chk = polymodStep(chk);
    }
    chk ^= 1;
    for (let i = 0; i < 6; ++i) {
        const v = (chk >> ((5 - i) * 5)) & 0x1f;
        result += exports.ALPHABET.charAt(v);
    }
    return result;
}
exports.encode = encode;
function decode(str) {
    if (str.length < 8) {
        throw new TypeError(str + ' too short');
    }
    // don't allow mixed case
    const lowered = str.toLowerCase();
    const uppered = str.toUpperCase();
    if (str !== lowered && str !== uppered) {
        throw new Error('Mixed-case string ' + str);
    }
    str = lowered;
    const split = str.lastIndexOf('1');
    if (split === -1) {
        throw new Error('No separator character for ' + str);
    }
    if (split === 0) {
        throw new Error('Missing prefix for ' + str);
    }
    const prefix = str.slice(0, split);
    const wordChars = str.slice(split + 1);
    if (wordChars.length < 6) {
        throw new Error('Data too short');
    }
    let chk = prefixChk(prefix);
    const words = [];
    for (let i = 0; i < wordChars.length; ++i) {
        const c = wordChars.charAt(i);
        const v = ALPHABET_MAP.get(c);
        if (v === undefined) {
            throw new Error('Unknown character ' + c);
        }
        chk = polymodStep(chk) ^ v;
        // not in the checksum?
        if (i + 6 >= wordChars.length) {
            continue;
        }
        words.push(v);
    }
    if (chk !== 1) {
        throw new Error('Invalid checksum for ' + str);
    }
    return { prefix, words };
}
exports.decode = decode;
function convert(data, inBits, outBits, pad) {
    // data must be array-like
    const totalBits = data.length * inBits;
    let totalBytes = totalBits / outBits;
    totalBytes = pad ? Math.ceil(totalBytes) : Math.floor(totalBytes);
    const buff = new Uint8Array(totalBytes);
    let value = 0;
    let bits = 0;
    const maxV = (1 << outBits) - 1;
    let buffIndex = 0;
    for (let i = 0; i < data.length; ++i) {
        value = (value << inBits) | data[i];
        bits += inBits;
        while (bits >= outBits) {
            bits -= outBits;
            buff[buffIndex++] = (value >> bits) & maxV;
        }
    }
    if (pad) {
        if (bits > 0) {
            buff[buffIndex++] = (value << (outBits - bits)) & maxV;
        }
    }
    else {
        if (bits >= inBits) {
            throw new Error('Excess padding');
        }
        if ((value << (outBits - bits)) & maxV) {
            throw new Error('Non-zero padding');
        }
    }
    assert.equal(buffIndex, buff.length);
    return buff;
}
exports.convert = convert;
function toWords(bytes) {
    return convert(bytes, 8, 5, true);
}
exports.toWords = toWords;
function fromWords(words) {
    return convert(words, 5, 8, false);
}
exports.fromWords = fromWords;
//# sourceMappingURL=bech32.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/bitcoin-address.js":
/*!****************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/bitcoin-address.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const buffutils = __webpack_require__(/*! ./buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
const bech32 = __webpack_require__(/*! ./bech32 */ "./node_modules/moneypot-lib/dist/util/bech32.js");
const bs58check = __webpack_require__(/*! ./bs58check */ "./node_modules/moneypot-lib/dist/util/bs58check.js");
function toBase58Check(hash, version) {
    const payload = new Uint8Array(21);
    payload[0] = version;
    buffutils.copy(hash, payload, 1);
    return bs58check.encode(payload);
}
exports.toBase58Check = toBase58Check;
function toBech32(data, version, prefix) {
    const words = buffutils.concat(buffutils.fromUint8(version), bech32.toWords(data));
    return bech32.encode(prefix, words);
}
exports.toBech32 = toBech32;
function decodeBitcoinAddress(address) {
    if (address.startsWith('bc1') || address.startsWith('tb1')) {
        let decoded;
        try {
            decoded = bech32.decode(address);
        }
        catch (err) {
            return new Error('invalid bech32 encoding for address');
        }
        let network;
        if (decoded.prefix === 'bc') {
            network = 'mainnet';
        }
        else if (decoded.prefix == 'tb') {
            network = 'testnet';
        }
        else {
            return new Error('unknown bech32 prefix');
        }
        const witnessVersion = decoded.words[0];
        if (witnessVersion !== 0) {
            return new Error('unknown witness version');
        }
        const data = bech32.fromWords(decoded.words.slice(1));
        if (data.length === 20) {
            return { kind: 'p2wpkh', network };
        }
        else if (data.length === 32) {
            return { kind: 'p2wsh', network };
        }
        else {
            return new Error('invalid length for bech32 address');
        }
    }
    // must be a bas58 address
    let decoded;
    try {
        decoded = bs58check.decode(address);
    }
    catch (err) {
        return new Error('invalid base58 address');
    }
    if (decoded.length !== 21) {
        return new Error('base58 address of unexpected length');
    }
    switch (decoded[0]) {
        case 0x0:
            return { kind: 'p2pkh', network: 'mainnet' };
        case 0x6f:
            return {
                kind: 'p2pkh',
                network: 'testnet',
            };
        case 0x05:
            return {
                kind: 'p2sh',
                network: 'mainnet',
            };
        case 0xc4:
            return {
                kind: 'p2sh',
                network: 'testnet',
            };
        default:
            return new Error('unknown base58 address prefix');
    }
}
exports.decodeBitcoinAddress = decodeBitcoinAddress;
//# sourceMappingURL=bitcoin-address.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/bs58check.js":
/*!**********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/bs58check.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = __webpack_require__(/*! ./bcrypto/sha256 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js");
const base58 = __webpack_require__(/*! ./base58 */ "./node_modules/moneypot-lib/dist/util/base58.js");
const buffutils = __webpack_require__(/*! ./buffutils */ "./node_modules/moneypot-lib/dist/util/buffutils.js");
function checksumFn(buffer) {
    return sha256_1.default.digest(sha256_1.default.digest(buffer));
}
function encode(payload) {
    const checksum = checksumFn(payload).slice(0, 4);
    return base58.encode(buffutils.concat(payload, checksum));
}
exports.encode = encode;
function decodeRaw(buffer) {
    const payload = buffer.slice(0, -4);
    const checksum = buffer.slice(-4);
    const newChecksum = checksumFn(payload);
    if ((checksum[0] ^ newChecksum[0]) |
        (checksum[1] ^ newChecksum[1]) |
        (checksum[2] ^ newChecksum[2]) |
        (checksum[3] ^ newChecksum[3])) {
        return;
    }
    return payload;
}
// Decode a base58-check encoded string to a buffer, no result if checksum is wrong
function decodeUnsafe(str) {
    const buffer = base58.decodeUnsafe(str);
    if (!buffer) {
        return;
    }
    return decodeRaw(buffer);
}
exports.decodeUnsafe = decodeUnsafe;
function decode(str) {
    const buffer = base58.decode(str);
    const payload = decodeRaw(buffer);
    if (!payload) {
        throw new Error('Invalid checksum');
    }
    return payload;
}
exports.decode = decode;
//# sourceMappingURL=bs58check.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/buffutils.js":
/*!**********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/buffutils.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert = __webpack_require__(/*! ./assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const types = __webpack_require__(/*! ./types */ "./node_modules/moneypot-lib/dist/util/types.js");
function toHex(buff) {
    let result = '';
    for (let i = 0; i < buff.length; i++) {
        const value = buff[i].toString(16);
        result += value.length === 1 ? '0' + value : value;
    }
    return result;
}
exports.toHex = toHex;
function fromHex(hexString, expectedLength = 0) {
    if (typeof hexString !== 'string') {
        return new Error('hexString must actually be hex');
    }
    // TODO: check for invalid chars
    const buff = new Uint8Array(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    if (expectedLength > 0 && buff.length !== expectedLength) {
        return new Error('unexpected length in hex string');
    }
    return buff;
}
exports.fromHex = fromHex;
// returns amount of bytes copied. Does not support partial copies (i.e. target must be big enough)
function copy(buff, target, targetStart = 0, sourceStart = 0, sourceEnd = buff.length) {
    assert.is(buff, Uint8Array);
    assert.is(target, Uint8Array);
    // TODO: this can be optimized with .set
    for (let i = 0; i < sourceEnd - sourceStart; i++) {
        target[i + targetStart] = buff[i + sourceStart];
    }
    return sourceEnd - sourceStart;
}
exports.copy = copy;
function slice(buff, begin = 0, end = buff.length) {
    assert.is(buff, Uint8Array);
    if (begin < 0) {
        begin = Math.max(buff.length + begin, 0);
    }
    return new Uint8Array(buff.buffer, buff.byteOffset + begin, end - begin);
}
exports.slice = slice;
function concat(...buffs) {
    let totalSize = 0;
    for (let i = 0; i < buffs.length; i++) {
        assert.is(buffs[i], Uint8Array);
        totalSize += buffs[i].length;
    }
    const res = new Uint8Array(totalSize);
    let writeAt = 0;
    for (let i = 0; i < buffs.length; i++) {
        res.set(buffs[i], writeAt);
        writeAt += buffs[i].length;
    }
    return res;
}
exports.concat = concat;
function fromUint32(x) {
    assert.check(types.isUint32, x);
    const buff = new ArrayBuffer(4);
    const view = new DataView(buff);
    view.setUint32(0, x);
    return new Uint8Array(buff);
}
exports.fromUint32 = fromUint32;
function fromUint64(x) {
    assert.check(types.isUint64, x);
    const buff = new ArrayBuffer(8);
    const view = new DataView(buff);
    const big = ~~(x / 0x0100000000);
    const low = x % 0x0100000000;
    view.setUint32(0, big);
    view.setUint32(4, low);
    return new Uint8Array(buff);
}
exports.fromUint64 = fromUint64;
function fromUint8(x) {
    assert.check(types.isUint8, x);
    const buff = new Uint8Array(1);
    buff[0] = x;
    return buff;
}
exports.fromUint8 = fromUint8;
function fromVarInt(n) {
    return fromBigInt(BigInt(n));
}
exports.fromVarInt = fromVarInt;
function fromBigInt(n) {
    const out = [];
    const base = BigInt(256);
    while (n >= base) {
        out.push(Number(n % base));
        n = n / base;
    }
    out.push(Number(n));
    const buf = new Uint8Array(out.length);
    buf.set(out.reverse());
    return buf;
}
exports.fromBigInt = fromBigInt;
function toBigInt(bytes) {
    let result = BigInt(0);
    const n = bytes.length;
    // Read input in 8 byte slices
    if (n >= 8) {
        const view = new DataView(bytes.buffer, bytes.byteOffset);
        for (let i = 0, k = n & ~7; i < k; i += 8) {
            const x = view.getBigUint64(i, false);
            result = (result << BigInt(64)) + x;
        }
    }
    // Mop up any remaining bytes
    for (let i = n & ~7; i < n; i++) {
        result = result * BigInt(256) + BigInt(bytes[i]);
    }
    return result;
}
exports.toBigInt = toBigInt;
function fromString(x) {
    assert.check(types.isString, x);
    return new TextEncoder().encode(x);
}
exports.fromString = fromString;
function toString(x) {
    return new TextDecoder().decode(x);
}
exports.toString = toString;
function isAllZero(buff) {
    for (let i = 0; i < buff.length; i++) {
        if (buff[i] !== 0) {
            return false;
        }
    }
    return true;
}
exports.isAllZero = isAllZero;
function compare(a, b) {
    assert.is(a, Uint8Array);
    assert.is(b, Uint8Array);
    const m = Math.min(a.length, b.length);
    for (let i = 0; i < m; i++) {
        const r = a[i] - b[i];
        if (r !== 0) {
            return r;
        }
    }
    if (a.length < b.length) {
        return -1;
    }
    if (b.length < a.length) {
        return 1;
    }
    return 0;
}
exports.compare = compare;
function equal(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            return false;
        }
    }
    return true;
}
exports.equal = equal;
// only constant time if both arrays are the same length
function constTimeEqual(a, b) {
    if (a.length !== b.length) {
        return false;
    }
    let equal = true;
    for (let i = 0; i < a.length; i++) {
        if (a[i] !== b[i]) {
            equal = false; // don't abort early, hopefully the optimizer won't realize it can LOL
        }
    }
    return equal;
}
exports.constTimeEqual = constTimeEqual;
//# sourceMappingURL=buffutils.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/coins.js":
/*!******************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/coins.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert = __webpack_require__(/*! ./assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const magnitude_1 = __webpack_require__(/*! ../magnitude */ "./node_modules/moneypot-lib/dist/magnitude.js");
function amountToMagnitudes(amount) {
    assert.check(Number.isInteger, amount);
    assert.check(x => x >= 0, amount);
    const maxCoinAmount = 2 ** magnitude_1.default.MaxMagnitude;
    let maxCoins = 0; // how many maxCoins we need
    if (amount > maxCoinAmount) {
        const biggerBy = amount - maxCoinAmount;
        maxCoins = Math.floor(biggerBy / maxCoinAmount);
        amount -= maxCoins * maxCoinAmount;
    }
    const coins = [];
    for (let shift = 0; amount > 0; shift++) {
        if (amount % 2 === 1) {
            coins.push(new magnitude_1.default(shift));
        }
        amount >>= 1; // This works because MaxMagnitude is less than 32
    }
    while (maxCoins-- > 0) {
        coins.push(new magnitude_1.default(magnitude_1.default.MaxMagnitude));
    }
    return coins;
}
exports.amountToMagnitudes = amountToMagnitudes;
//# sourceMappingURL=coins.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/ecc/blind.js":
/*!**********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/ecc/blind.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const elliptic_1 = __webpack_require__(/*! ./elliptic */ "./node_modules/moneypot-lib/dist/util/ecc/elliptic.js");
const sha256_1 = __webpack_require__(/*! ../bcrypto/sha256 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/moneypot-lib/dist/util/ecc/util.js");
function blindMessage(secret, nonce, signer, message) {
    const R = nonce;
    const P = signer;
    const alpha = util_1.bufferToBigInt(sha256_1.default.mac(util_1.utf8ToBuffer('alpha'), util_1.concatBuffers(secret, util_1.pointToBuffer(nonce), util_1.pointToBuffer(signer), message)));
    // spin beta until we find quadratic residue
    let retry = 0;
    let beta;
    let RPrime;
    while (true) {
        beta = util_1.bufferToBigInt(sha256_1.default.mac(util_1.utf8ToBuffer('beta'), util_1.concatBuffers(secret, util_1.pointToBuffer(nonce), util_1.pointToBuffer(signer), message, Uint8Array.of(retry))));
        RPrime = elliptic_1.pointAdd(R, elliptic_1.pointMultiply(util_1.curve.g, alpha), elliptic_1.pointMultiply(P, beta));
        if (util_1.jacobi(RPrime.y) === BigInt(1)) {
            break;
        }
        else {
            retry++;
        }
    }
    // the challenge
    const cPrime = util_1.getE(RPrime.x, P, message);
    // the blinded challenge
    const c = elliptic_1.scalarAdd(cPrime, beta);
    return [{ alpha, r: RPrime.x }, { c }];
}
exports.blindMessage = blindMessage;
function blindSign(signer, nonce, { c }) {
    const x = signer;
    const k = nonce;
    const s = elliptic_1.scalarAdd(k, elliptic_1.scalarMultiply(c, x));
    return { s };
}
exports.blindSign = blindSign;
function unblind({ alpha, r }, blindedSig) {
    const s = elliptic_1.scalarAdd(blindedSig.s, alpha);
    return { r, s };
}
exports.unblind = unblind;
//# sourceMappingURL=blind.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/ecc/check.js":
/*!**********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/ecc/check.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const _1 = __webpack_require__(/*! . */ "./node_modules/moneypot-lib/dist/util/ecc/index.js");
// This module exposes functions that:
//
//     - Sanity-check inputs to avoid mistakes
//     - Validate runtime types since lib may be consumed from JS instead of TS
//     - Validate input data / business logic
//
// This module throws CheckError so that check-site can avoid swallowing
// extraneous exceptions.
class CheckError extends Error {
    constructor(...args) {
        super(...args);
        Error.captureStackTrace(this, CheckError);
    }
}
exports.CheckError = CheckError;
// like assert() except it throws CheckError.
//
// Use this instead of manually throwing.
function check(assertion, message) {
    if (!assertion) {
        throw new CheckError(message);
    }
}
exports.check = check;
function privkeysAreUnique(privkeys) {
    // validate runtime type
    check(Array.isArray(privkeys), 'privkeys must be array');
    // validate data
    check(privkeys.length > 0, 'privkeys array was empty');
    const seen = new Set();
    for (const privkey of privkeys) {
        check(isValidPrivkey(privkey), 'privkey must be valid');
        const serialized = _1.Scalar.toHex(privkey);
        check(!seen.has(serialized), 'privkeys must be unique');
        seen.add(serialized);
    }
    return privkeys;
}
exports.privkeysAreUnique = privkeysAreUnique;
function isValidPrivkey(privkey) {
    return typeof privkey === 'bigint' && privkey >= BigInt(1) && privkey < _1.util.curve.n;
}
exports.isValidPrivkey = isValidPrivkey;
// export function checkPrivkey(privkey: Scalar): Scalar {
//     // validate runtime type
//     check(typeof privkey === 'bigint', 'privkey must be bigint')
//     // validate data
//     check(privkey >= BigInt(1) , 'privkey must be in range 1 to n-1')
//     check(privkey < util.curve.n, 'privkey must be in range 1 to n-1')
//     return privkey
// }
function isValidSignature(sig) {
    return (typeof sig === 'object' &&
        typeof sig.r === 'bigint' &&
        typeof sig.s === 'bigint' &&
        sig.r > BigInt(0) &&
        sig.r < _1.util.curve.p &&
        sig.s > BigInt(0) &&
        sig.s < _1.util.curve.n);
}
exports.isValidSignature = isValidSignature;
function isValidPubkey(point) {
    if (typeof point !== 'object') {
        return false;
    }
    const { x, y } = point;
    if (typeof x !== 'bigint') {
        return false;
    }
    if (typeof y !== 'bigint') {
        return false;
    }
    return (y * y - (x * x * x + _1.util.curve.a * x + _1.util.curve.b)) % _1.util.curve.p == BigInt(0);
}
exports.isValidPubkey = isValidPubkey;
//# sourceMappingURL=check.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/ecc/elliptic.js":
/*!*************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/ecc/elliptic.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const check = __webpack_require__(/*! ./check */ "./node_modules/moneypot-lib/dist/util/ecc/check.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/moneypot-lib/dist/util/ecc/util.js");
exports.Scalar = {
    fromBytes(buf) {
        const priv = util_1.bufferToBigInt(buf);
        if (!check.isValidPrivkey(priv)) {
            return new Error('scalar was not valid private key');
        }
        return priv;
    },
    fromHex(hex) {
        const buff = util_1.bufferFromHex(hex);
        if (buff instanceof Error) {
            return buff;
        }
        const priv = util_1.bufferToBigInt(buff);
        if (!check.isValidPrivkey(priv)) {
            return new Error('scalar was not valid private key');
        }
        return priv;
    },
    toBytes(n) {
        return util_1.buffer32FromBigInt(n);
    },
    toHex(n) {
        return util_1.bufferToHex(util_1.buffer32FromBigInt(n));
    },
};
exports.Point = {
    fromPrivKey(privkey) {
        if (!check.isValidPrivkey(privkey)) {
            throw new Error('scalar was not valid private key');
        }
        return pointMultiply(util_1.curve.g, privkey);
    },
    fromBytes(buf) {
        return util_1.pointFromBuffer(buf);
    },
    fromX(x, isOdd) {
        return util_1.pointFromX(x, isOdd ? BigInt(1) : BigInt(0));
    },
    fromHex(hex) {
        const buff = util_1.bufferFromHex(hex);
        if (buff instanceof Error) {
            throw buff;
        }
        return exports.Point.fromBytes(buff);
    },
    toHex(point) {
        return util_1.bufferToHex(util_1.pointToBuffer(point));
    },
    toBytes(point) {
        return util_1.pointToBuffer(point);
    },
};
exports.INFINITE_POINT = new (class {
    get x() {
        throw new Error("infinite point doesn't have an x");
    }
    get y() {
        throw new Error("infinite point doesn't have a y");
    }
})();
// SCALAR MATH
function scalarAdd(a, b) {
    return (a + b) % util_1.curve.n;
}
exports.scalarAdd = scalarAdd;
function scalarMultiply(a, b) {
    return (a * b) % util_1.curve.n;
}
exports.scalarMultiply = scalarMultiply;
function scalarNegate(a) {
    return (util_1.curve.n - a) % util_1.curve.n;
}
exports.scalarNegate = scalarNegate;
// scalar^-1 mod N
function scalarInverse(a) {
    return util_1.modInverse(a, util_1.curve.n);
}
exports.scalarInverse = scalarInverse;
// POINT MATH
//
// TODO: Should point functions propagate INFINITY_POINT
// instead of failing on x/y access so that callsite can perceive INFINITY_POINT?
function pointEq(a, b) {
    return a.x === b.x && a.y === b.y;
}
exports.pointEq = pointEq;
function pointAdd(...points) {
    check.check(points.length > 1, 'can only add 1 or more points');
    let point = points[0];
    for (let i = 1; i < points.length; i++) {
        point = fastAdd(point, points[i]);
    }
    return point;
}
exports.pointAdd = pointAdd;
function pointSubtract(a, b) {
    b = { x: b.x, y: (util_1.curve.p - b.y) % util_1.curve.p };
    return pointAdd(a, b);
}
exports.pointSubtract = pointSubtract;
function pointMultiply(point, scalar) {
    scalar = scalar % util_1.curve.n;
    return fastMultiply(point, scalar);
}
exports.pointMultiply = pointMultiply;
// NAIVE IMPL
function naiveAdd(a, b) {
    if (a === exports.INFINITE_POINT) {
        return b;
    }
    if (b === exports.INFINITE_POINT) {
        return a;
    }
    if (a.x === b.x && a.y !== b.y) {
        return exports.INFINITE_POINT;
    }
    const lam = a.x === b.x && a.y === b.y
        ? ((BigInt(3) * a.x * a.x + util_1.curve.a) * util_1.powmod(BigInt(2) * a.y, util_1.curve.p - BigInt(2), util_1.curve.p)) % util_1.curve.p
        : ((b.y - a.y) * util_1.powmod(b.x - a.x, util_1.curve.p - BigInt(2), util_1.curve.p)) % util_1.curve.p;
    const x3 = (lam * lam - a.x - b.x) % util_1.curve.p;
    const y = util_1.mod(lam * (a.x - x3) - a.y, util_1.curve.p);
    return { x: x3, y };
}
function naiveMultiply(point, scalar) {
    scalar = scalar % util_1.curve.n;
    let r = exports.INFINITE_POINT;
    for (let i = BigInt(0); i < BigInt(256); i++) {
        if ((scalar >> i) & BigInt(1)) {
            r = naiveAdd(r, point);
        }
        point = naiveAdd(point, point);
    }
    return r;
}
exports.naiveMultiply = naiveMultiply;
// https://en.wikipedia.org/wiki/Extended_Euclidean_algorithm
function inv(a, n) {
    if (a === BigInt(0)) {
        return BigInt(0);
    }
    let [lm, hm, low, high] = [BigInt(1), BigInt(0), util_1.mod(a, n), n];
    while (low > 1) {
        const r = high / low;
        const [nm, _new] = [hm - lm * r, high - low * r];
        [lm, low, hm, high] = [nm, _new, lm, low];
    }
    return lm % n;
}
function fromJacobian(j) {
    if (j[0] === BigInt(0) && j[1] === BigInt(0)) {
        return exports.INFINITE_POINT;
    }
    const z = inv(j[2], util_1.curve.p);
    const x = (j[0] * z ** BigInt(2)) % util_1.curve.p;
    const y = util_1.mod(j[1] * z ** BigInt(3), util_1.curve.p);
    return { x, y };
}
function toJacobian(point) {
    return [point.x, point.y, BigInt(1)];
}
function jacobianDouble(p) {
    if (p[1] === BigInt(0)) {
        return [BigInt(0), BigInt(0), BigInt(0)];
    }
    const ysq = p[1] ** BigInt(2) % util_1.curve.p;
    const S = (BigInt(4) * p[0] * ysq) % util_1.curve.p;
    const M = (BigInt(3) * p[0] ** BigInt(2) + util_1.curve.a * p[2] ** BigInt(4)) % util_1.curve.p;
    const nx = (M ** BigInt(2) - BigInt(2) * S) % util_1.curve.p;
    const ny = (M * (S - nx) - BigInt(8) * ysq ** BigInt(2)) % util_1.curve.p;
    const nz = (BigInt(2) * p[1] * p[2]) % util_1.curve.p;
    return [nx, ny, nz];
}
function jacobianAdd(p, q) {
    const P = util_1.curve.p;
    if (p[1] === BigInt(0)) {
        return q;
    }
    if (q[1] === BigInt(0)) {
        return p;
    }
    const U1 = (p[0] * q[2] ** BigInt(2)) % P;
    const U2 = (q[0] * p[2] ** BigInt(2)) % P;
    const S1 = (p[1] * q[2] ** BigInt(3)) % P;
    const S2 = (q[1] * p[2] ** BigInt(3)) % P;
    if (U1 === U2) {
        return S1 === S2 ? jacobianDouble(p) : [BigInt(0), BigInt(0), BigInt(1)];
    }
    const H = U2 - U1;
    const R = S2 - S1;
    const H2 = (H * H) % P;
    const H3 = (H * H2) % P;
    const U1H2 = (U1 * H2) % P;
    const nx = (R ** BigInt(2) - H3 - BigInt(2) * U1H2) % P;
    const ny = (R * (U1H2 - nx) - S1 * H3) % P;
    const nz = (H * p[2] * q[2]) % P;
    return [nx, ny, nz];
}
function jacobianMultiply(a, n) {
    if (a[1] === BigInt(0) || n === BigInt(0)) {
        return [BigInt(0), BigInt(0), BigInt(1)];
    }
    if (n === BigInt(1)) {
        return a;
    }
    if (n < BigInt(0) || n >= util_1.curve.n) {
        return jacobianMultiply(a, n % util_1.curve.n);
    }
    if (n % BigInt(2) === BigInt(0)) {
        return jacobianDouble(jacobianMultiply(a, n / BigInt(2)));
    }
    else {
        // n % BigInt(2)  === BigInt(1)
        return jacobianAdd(jacobianDouble(jacobianMultiply(a, n / BigInt(2))), a);
    }
}
function fastMultiply(point, scalar) {
    return fromJacobian(jacobianMultiply(toJacobian(point), scalar));
}
function fastAdd(a, b) {
    return fromJacobian(jacobianAdd(toJacobian(a), toJacobian(b)));
}
//# sourceMappingURL=elliptic.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/ecc/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/ecc/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// CORE DATA
Object.defineProperty(exports, "__esModule", { value: true });
var elliptic_1 = __webpack_require__(/*! ./elliptic */ "./node_modules/moneypot-lib/dist/util/ecc/elliptic.js");
exports.Scalar = elliptic_1.Scalar;
exports.Point = elliptic_1.Point;
exports.INFINITE_POINT = elliptic_1.INFINITE_POINT;
// CURVE MATH
var elliptic_2 = __webpack_require__(/*! ./elliptic */ "./node_modules/moneypot-lib/dist/util/ecc/elliptic.js");
exports.scalarAdd = elliptic_2.scalarAdd;
exports.scalarMultiply = elliptic_2.scalarMultiply;
exports.pointMultiply = elliptic_2.pointMultiply;
exports.pointAdd = elliptic_2.pointAdd;
var signature_1 = __webpack_require__(/*! ./signature */ "./node_modules/moneypot-lib/dist/util/ecc/signature.js");
exports.Signature = signature_1.Signature;
exports.sign = signature_1.sign;
exports.verify = signature_1.verify;
exports.verifyECDSA = signature_1.verifyECDSA;
var blind_1 = __webpack_require__(/*! ./blind */ "./node_modules/moneypot-lib/dist/util/ecc/blind.js");
exports.blindMessage = blind_1.blindMessage;
exports.blindSign = blind_1.blindSign;
exports.unblind = blind_1.unblind;
// MULTI SIGNATURES
const muSig = __webpack_require__(/*! ./mu-sig */ "./node_modules/moneypot-lib/dist/util/ecc/mu-sig.js");
exports.muSig = muSig;
// CONVENIENCE
const util = __webpack_require__(/*! ./util */ "./node_modules/moneypot-lib/dist/util/ecc/util.js");
exports.util = util;
//# sourceMappingURL=index.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/ecc/mu-sig.js":
/*!***********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/ecc/mu-sig.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert = __webpack_require__(/*! ../assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const _1 = __webpack_require__(/*! . */ "./node_modules/moneypot-lib/dist/util/ecc/index.js");
const check = __webpack_require__(/*! ./check */ "./node_modules/moneypot-lib/dist/util/ecc/check.js");
const sha256_1 = __webpack_require__(/*! ../bcrypto/sha256 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/moneypot-lib/dist/util/ecc/util.js");
const elliptic_1 = __webpack_require__(/*! ./elliptic */ "./node_modules/moneypot-lib/dist/util/ecc/elliptic.js");
// https://blockstream.com/2018/01/23/musig-key-aggregation-schnorr-signatures/
function calculateL(pubkeys) {
    return sha256_1.default.digest(util_1.concatBuffers(...pubkeys.map(util_1.pointToBuffer)));
}
function pubkeyCombine(pubkeys) {
    assert.equal(pubkeys.length > 0, true);
    const L = calculateL(pubkeys);
    let X = _1.INFINITE_POINT;
    for (let i = 0; i < pubkeys.length; i++) {
        const Xi = pubkeys[i];
        const coefficient = calculateCoefficient(L, i);
        const summand = _1.pointMultiply(Xi, coefficient);
        if (X === _1.INFINITE_POINT) {
            X = summand;
        }
        else {
            X = _1.pointAdd(X, summand);
        }
    }
    return X;
}
exports.pubkeyCombine = pubkeyCombine;
function privkeyCombine(privkeys) {
    assert.equal(privkeys.length > 0, true);
    check.privkeysAreUnique(privkeys);
    const Xs = [];
    let R = _1.INFINITE_POINT;
    for (const privateKey of privkeys) {
        const Xi = _1.Point.fromPrivKey(privateKey);
        Xs.push(Xi);
        if (R === _1.INFINITE_POINT) {
            R = Xi;
        }
        else {
            R = _1.pointAdd(R, Xi);
        }
    }
    const L = sha256_1.default.digest(util_1.concatBuffers(...Xs.map(util_1.pointToBuffer)));
    let X = BigInt(0);
    for (let i = 0; i < privkeys.length; i++) {
        const Xi = privkeys[i];
        const coefficient = calculateCoefficient(L, i);
        const summand = elliptic_1.scalarMultiply(Xi, coefficient);
        if (X === BigInt(0)) {
            X = summand;
        }
        else {
            X = elliptic_1.scalarAdd(X, summand);
        }
    }
    return X;
}
exports.privkeyCombine = privkeyCombine;
const MUSIG_TAG = sha256_1.default.digest(util_1.utf8ToBuffer('MuSig coefficient'));
function calculateCoefficient(L, idx) {
    const ab = new ArrayBuffer(4);
    const view = new DataView(ab);
    view.setUint32(0, idx, true); // true for LE
    const idxBuf = new Uint8Array(ab);
    const data = sha256_1.default.digest(util_1.concatBuffers(MUSIG_TAG, MUSIG_TAG, L, idxBuf));
    return util_1.bufferToBigInt(data) % util_1.curve.n;
}
//# sourceMappingURL=mu-sig.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/ecc/signature.js":
/*!**************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/ecc/signature.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const check = __webpack_require__(/*! ./check */ "./node_modules/moneypot-lib/dist/util/ecc/check.js");
const elliptic_1 = __webpack_require__(/*! ./elliptic */ "./node_modules/moneypot-lib/dist/util/ecc/elliptic.js");
const util_1 = __webpack_require__(/*! ./util */ "./node_modules/moneypot-lib/dist/util/ecc/util.js");
exports.Signature = {
    fromBytes(buf) {
        if (buf.length !== 64) {
            return new Error('signature buf expected 64 bytes');
        }
        const r = util_1.bufferToBigInt(buf.slice(0, 32));
        const s = util_1.bufferToBigInt(buf.slice(32, 64));
        // TODO: checkSignature here or just let bad sigs fail in verify()?
        return { r, s };
    },
    fromHex(hex) {
        const buff = util_1.bufferFromHex(hex);
        if (buff instanceof Error) {
            return buff;
        }
        return exports.Signature.fromBytes(buff);
    },
    toBytes({ r, s }) {
        return util_1.concatBuffers(util_1.buffer32FromBigInt(r), util_1.buffer32FromBigInt(s));
    },
    toHex(sig) {
        return util_1.bufferToHex(exports.Signature.toBytes(sig));
    },
};
function sign(message, privkey) {
    if (!check.isValidPrivkey(privkey)) {
        throw new Error('tried to sign with invalid privkey');
    }
    const m = message;
    const d = privkey;
    const k0 = util_1.getK0(d, m);
    const R = elliptic_1.pointMultiply(util_1.curve.g, k0);
    const k = util_1.getK(R, k0); // nonce
    const e = util_1.getE(R.x, elliptic_1.Point.fromPrivKey(d), m); // challenge
    const s = (k + e * d) % util_1.curve.n;
    const sig = { r: R.x, s };
    if (!check.isValidSignature(sig)) {
        throw new Error('signing produced invalid sig?!');
    }
    return sig;
}
exports.sign = sign;
function verify(pubkey, message, sig) {
    if (!check.isValidPubkey(pubkey)) {
        throw new Error('invalid pubkey provided');
    }
    if (!check.isValidSignature(sig)) {
        throw new Error('invalid sig');
    }
    const m = message;
    const P = pubkey;
    const e = util_1.getE(sig.r, P, m);
    const R = elliptic_1.pointSubtract(elliptic_1.pointMultiply(util_1.curve.g, sig.s), elliptic_1.pointMultiply(P, e));
    if (R === elliptic_1.INFINITE_POINT) {
        return false;
    }
    else if (util_1.jacobi(R.y) !== BigInt(1)) {
        return false;
    }
    else if (R.x !== sig.r) {
        return false;
    }
    else {
        return true;
    }
}
exports.verify = verify;
function verifyECDSA(pubkey, message, sig) {
    if (!check.isValidPubkey(pubkey)) {
        throw new Error('invalid pubkey provided');
    }
    if (!check.isValidSignature(sig)) {
        throw new Error('invalid sig');
    }
    const m = message;
    const P = pubkey;
    let e = elliptic_1.Scalar.fromBytes(m);
    if (e instanceof Error) {
        throw new Error('invalid e scalar');
    }
    let sInv = util_1.modInverse(sig.s, util_1.curve.n);
    let u1 = util_1.mod(e * sInv, util_1.curve.n);
    let u2 = util_1.mod(sig.r * sInv, util_1.curve.n);
    let S = elliptic_1.pointAdd(elliptic_1.pointMultiply(util_1.curve.g, u1), elliptic_1.pointMultiply(P, u2));
    if (S === elliptic_1.INFINITE_POINT) {
        return false;
    }
    if (S.x === sig.r) {
        return true;
    }
    else {
        return false;
    }
}
exports.verifyECDSA = verifyECDSA;
// this is for ecdsa?! not schnorr ?!
function ecdsaRecover(message, sig, j) {
    // var sigObj = { r: signature.slice(0, 32), s: signature.slice(32, 64) }
    // var sigr = new BN(sigObj.r)
    // var sigs = new BN(sigObj.s)
    // if (sigr.cmp(ecparams.n) >= 0 || sigs.cmp(ecparams.n) >= 0) throw new Error(messages.ECDSA_SIGNATURE_PARSE_FAIL)
    if (!check.isValidSignature(sig)) {
        throw new Error('invalid sig');
    }
    if ((3 & j) !== j) {
        throw new Error('The recovery param is more than two bits');
    }
    let e = elliptic_1.Scalar.fromBytes(message);
    if (e instanceof Error) {
        throw e;
    }
    let r = sig.r;
    // A set LSB signifies that the y-coordinate is odd
    var isYOdd = (j & 1) == 1;
    var isSecondKey = j >> 1;
    // if (r.cmp(this.curve.p.umod(this.curve.n)) >= 0 && isSecondKey)
    //   throw new Error('Unable to find sencond key candinate');
    if (r >= util_1.curve.p % util_1.curve.n && isSecondKey) {
        throw new Error('Unable to find second key coordinate');
    }
    // 1.1. Let x = r + jn.
    const r2 = elliptic_1.Point.fromX(r + (isSecondKey ? util_1.curve.n : BigInt(0)), isYOdd);
    if (r2 instanceof Error) {
        throw r2;
    }
    let rInv = util_1.modInverse(sig.r, util_1.curve.n);
    //var s1 = n.sub(e).mul(rInv).umod(n);
    let s1 = util_1.mod((util_1.curve.n - e) * rInv, util_1.curve.n);
    // var s2 = s.mul(rInv).umod(n);
    let s2 = util_1.mod(sig.s * rInv, util_1.curve.n);
    // 1.6.1 Compute Q = r^-1 (sR -  eG)
    //               Q = r^-1 (sR + -eG)
    // return this.g.mulAdd(s1, r, s2);
    return elliptic_1.pointAdd(elliptic_1.pointMultiply(util_1.curve.g, s1), elliptic_1.pointMultiply(r2, s2));
}
exports.ecdsaRecover = ecdsaRecover;
//# sourceMappingURL=signature.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/ecc/util.js":
/*!*********************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/ecc/util.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const assert_1 = __webpack_require__(/*! ../assert */ "./node_modules/moneypot-lib/dist/util/assert.js");
const sha256_1 = __webpack_require__(/*! ../bcrypto/sha256 */ "./node_modules/moneypot-lib/dist/util/bcrypto/sha256.js");
const check_1 = __webpack_require__(/*! ./check */ "./node_modules/moneypot-lib/dist/util/ecc/check.js");
// secp256k1 parameters
exports.curve = {
    a: BigInt(0),
    b: BigInt(7),
    p: BigInt('115792089237316195423570985008687907853269984665640564039457584007908834671663'),
    g: {
        x: BigInt('55066263022277343669578718895168534326250603453777594175500187360389116729240'),
        y: BigInt('32670510020758816978083085130507043184471273380659243275938904335757337482424'),
    },
    // order
    n: BigInt('115792089237316195423570985008687907852837564279074904382605163141518161494337'),
};
// Handles negative quotients.
//
//      -34 % 23 === -11
//      mod(-34, 23) === 12
function mod(a, b) {
    return ((a % b) + b) % b;
}
exports.mod = mod;
// pows then mods, but uses intermediate mods to keep intermediate number within bigint range
function powmod(base, exp, m) {
    if (exp === BigInt(0)) {
        return BigInt(1);
    }
    if (exp % BigInt(2) === BigInt(0)) {
        return mod(powmod(base, exp / BigInt(2), m) ** BigInt(2), m);
    }
    else {
        return mod(base * powmod(base, exp - BigInt(1), m), m);
    }
}
exports.powmod = powmod;
// a^-1 mod m
function modInverse(a, m) {
    if (a < 0 || m <= a) {
        a = mod(a, m);
    }
    let [c, d] = [a, m];
    let q = d / c;
    let [uc, vc, ud, vd] = [BigInt(1), BigInt(0), BigInt(0), BigInt(1)];
    while (c !== BigInt(0)) {
        [q, c, d] = [d / c, mod(d, c), c];
        [uc, vc, ud, vd] = [ud - q * uc, vd - q * vc, uc, vc];
    }
    // At this point, d is the GCD, and ud*a+vd*m = d.
    // If d == 1, this means that ud is a inverse.
    assert_1.default(d === BigInt(1));
    if (ud > 0) {
        return ud;
    }
    else {
        return ud + m;
    }
}
exports.modInverse = modInverse;
function bigIntSqrt(n) {
    if (n < BigInt(0)) {
        throw new Error('cannot sqrt negative number');
    }
    if (n < BigInt(2)) {
        return n;
    }
    // tslint:disable-next-line: no-shadowed-variable
    function newtonIteration(n, x0) {
        const x1 = (n / x0 + x0) >> BigInt(1);
        if (x0 === x1 || x0 === x1 - BigInt(1)) {
            return x0;
        }
        return newtonIteration(n, x1);
    }
    return newtonIteration(n, BigInt(1));
}
function bufferToHex(buf) {
    let result = '';
    for (const b of buf) {
        const value = b.toString(16);
        result += value.length === 1 ? '0' + value : value;
    }
    return result;
}
exports.bufferToHex = bufferToHex;
function bufferFromHex(hex) {
    if (hex.length % 2 === 1 || !/^[0-9a-fA-F]+$/.test(hex)) {
        return new Error('invalid hex string');
    }
    return new Uint8Array(hex.match(/.{1,2}/g).map(byte => Number.parseInt(byte, 16)));
}
exports.bufferFromHex = bufferFromHex;
// export function bufferToBigInt(buf: Uint8Array): bigint {
//     return BigInt('0x' + bufferToHex(buf))
// }
function bufferToBigInt(bytes) {
    let result = BigInt(0);
    const n = bytes.length;
    // Read input in 8 byte slices
    if (n >= 8) {
        const view = new DataView(bytes.buffer, bytes.byteOffset);
        for (let i = 0, k = n & ~7; i < k; i += 8) {
            const x = view.getBigUint64(i, false);
            result = (result << BigInt(64)) + x;
        }
    }
    // Mop up any remaining bytes
    for (let i = n & ~7; i < n; i++) {
        result = result * BigInt(256) + BigInt(bytes[i]);
    }
    return result;
}
exports.bufferToBigInt = bufferToBigInt;
// Buffer is fixed-length 32bytes
function buffer32FromBigInt(n) {
    const out = [];
    const base = BigInt(256);
    while (n >= base) {
        out.push(Number(n % base));
        n = n / base;
    }
    out.push(Number(n));
    if (out.length > 32) {
        throw new Error('bigint overflows 32 byte buffer');
    }
    const buf = new Uint8Array(32);
    buf.set(out.reverse(), 32 - out.length);
    return buf;
}
exports.buffer32FromBigInt = buffer32FromBigInt;
function concatBuffers(...bufs) {
    let totalSize = 0;
    for (const buf of bufs) {
        assert_1.default(buf instanceof Uint8Array);
        totalSize += buf.length;
    }
    const res = new Uint8Array(totalSize);
    let writeAt = 0;
    for (const buf of bufs) {
        res.set(buf, writeAt);
        writeAt += buf.length;
    }
    return res;
}
exports.concatBuffers = concatBuffers;
// 33 bytes: // first byte represents y, next 32 bytes are x coord
function pointFromBuffer(buf) {
    if (buf.length !== 33) {
        return new Error('invalid point buffer');
    }
    if (![0x02, 0x03].includes(buf[0])) {
        return new Error('not compressed');
    }
    // odd is BigInt(1)  or BigInt(0)
    const odd = BigInt(buf[0] - 0x02);
    const x = bufferToBigInt(buf.slice(1, 33));
    return pointFromX(x, odd);
}
exports.pointFromBuffer = pointFromBuffer;
function pointFromX(x, isOdd) {
    if (isOdd !== BigInt(0) && isOdd !== BigInt(1)) {
        throw new Error('isOdd must be 0n or 1n');
    }
    const { p } = exports.curve;
    const ysq = (powmod(x, BigInt(3), p) + BigInt(7)) % p;
    const y0 = powmod(ysq, (p + BigInt(1)) / BigInt(4), p);
    if (powmod(y0, BigInt(2), p) !== ysq) {
        return new Error('point not on curve');
    }
    const y = (y0 & BigInt(1)) !== isOdd ? p - y0 : y0;
    const point = { x, y };
    assert_1.default(check_1.isValidPubkey(point));
    return point;
}
exports.pointFromX = pointFromX;
function pointToBuffer(point) {
    // 0x02: y is even
    // 0x03: y is odd
    const b0 = point.y % BigInt(2) === BigInt(0) ? 0x02 : 0x03;
    const xbuf = buffer32FromBigInt(point.x);
    assert_1.default(xbuf.length === 32);
    const result = new Uint8Array(33);
    result.set([b0], 0);
    result.set(xbuf, 1);
    return result;
}
exports.pointToBuffer = pointToBuffer;
function constantTimeBufferEquals(a, b) {
    const aLen = a.length;
    const bLen = b.length;
    const len = Math.max(aLen, bLen);
    let result = 0;
    for (let i = 0; i < len; i++) {
        result |= a[i % aLen] ^ b[i % bLen];
    }
    result |= aLen ^ bLen;
    return result === 0;
}
exports.constantTimeBufferEquals = constantTimeBufferEquals;
function utf8ToBuffer(text) {
    return new TextEncoder().encode(text);
}
exports.utf8ToBuffer = utf8ToBuffer;
function isPointOnCurve({ x, y }) {
    const { p, a, b } = exports.curve;
    return (y * y - (x * x * x + a * x + b)) % p === BigInt(0);
}
exports.isPointOnCurve = isPointOnCurve;
function jacobi(y) {
    return powmod(y, (exports.curve.p - BigInt(1)) / BigInt(2), exports.curve.p);
}
exports.jacobi = jacobi;
function getK(R, k0) {
    return jacobi(R.y) === BigInt(1) ? k0 : exports.curve.n - k0;
}
exports.getK = getK;
function getK0(privkey, message) {
    const k0 = bufferToBigInt(sha256_1.default.digest(concatBuffers(buffer32FromBigInt(privkey), message))) % exports.curve.n;
    if (k0 === BigInt(0)) {
        // We got incredibly unlucky
        throw new Error('k0 is zero');
    }
    return k0;
}
exports.getK0 = getK0;
function getE(Rx, P, m) {
    return bufferToBigInt(sha256_1.default.digest(concatBuffers(buffer32FromBigInt(Rx), pointToBuffer(P), m))) % exports.curve.n;
}
exports.getE = getE;
//# sourceMappingURL=util.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/random-browser.js":
/*!***************************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/random-browser.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function randomBrowser(size) {
    const buff = new Uint8Array(size);
    window.crypto.getRandomValues(buff);
    return buff;
}
exports.default = randomBrowser;
//# sourceMappingURL=random-browser.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/types.js":
/*!******************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/types.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function is(t) {
    return (x) => x instanceof t;
}
exports.is = is;
function isBuffer32(x) {
    return x instanceof Uint8Array && x.length === 32;
}
exports.isBuffer32 = isBuffer32;
function isBuffer33(x) {
    return x instanceof Uint8Array && x.length === 33;
}
exports.isBuffer33 = isBuffer33;
function isUint8(x) {
    return Number.isInteger(x) && x >= 0 && x < 2 ** 8;
}
exports.isUint8 = isUint8;
function isUint32(x) {
    return Number.isInteger(x) && x >= 0 && x < 2 ** 32;
}
exports.isUint32 = isUint32;
function isUint64(x) {
    return Number.isInteger(x) && x >= 0 && x <= Number.MAX_SAFE_INTEGER;
}
exports.isUint64 = isUint64;
function isString(x) {
    return typeof x === 'string';
}
exports.isString = isString;
function isArrayOf(f) {
    return (x) => Array.isArray(x) && x.every(f);
}
exports.isArrayOf = isArrayOf;
function isOneOf(arr) {
    return (x) => arr.includes(x);
}
exports.isOneOf = isOneOf;
//# sourceMappingURL=types.js.map

/***/ }),

/***/ "./node_modules/moneypot-lib/dist/util/wif.js":
/*!****************************************************!*\
  !*** ./node_modules/moneypot-lib/dist/util/wif.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const bs58check = __webpack_require__(/*! ./bs58check */ "./node_modules/moneypot-lib/dist/util/bs58check.js");
function decodeRaw(buffer, version) {
    // check version only if defined
    if (version !== undefined && buffer[0] !== version) {
        throw new Error('Invalid network version');
    }
    // uncompressed
    if (buffer.length === 33) {
        return {
            version: buffer[0],
            privateKey: buffer.slice(1, 33),
            compressed: false,
        };
    }
    // invalid length
    if (buffer.length !== 34) {
        throw new Error('Invalid WIF length');
    }
    // invalid compression flag
    if (buffer[33] !== 0x01) {
        throw new Error('Invalid compression flag');
    }
    return {
        version: buffer[0],
        privateKey: buffer.slice(1, 33),
        compressed: true,
    };
}
exports.decodeRaw = decodeRaw;
function encodeRaw(version, privateKey, compressed = true) {
    const result = new Uint8Array(compressed ? 34 : 33);
    result[0] = version;
    result.set(privateKey, 1);
    if (compressed) {
        result[33] = 0x01;
    }
    return result;
}
exports.encodeRaw = encodeRaw;
function decode(str, version) {
    return decodeRaw(bs58check.decode(str), version);
}
exports.decode = decode;
function encode(version, privateKey, compressed = true) {
    return bs58check.encode(encodeRaw(version, privateKey, compressed));
}
exports.encode = encode;
//# sourceMappingURL=wif.js.map

/***/ }),

/***/ "./node_modules/ts-loader/index.js!./src/wallet/workers/WorkerClaimable.ts":
/*!************************************************************************!*\
  !*** ./node_modules/ts-loader!./src/wallet/workers/WorkerClaimable.ts ***!
  \************************************************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _requests_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../requests/index */ "./src/wallet/requests/index.ts");

// unoptimized
const ctx = self;
// Respond to message from parent thread
ctx.addEventListener('message', (message) => syncWorkersClaimable(message.data[0], message.data[1]));
async function syncWorkersClaimable(claimables, config) {
    for (const claimable of claimables) {
        const statuses = await Object(_requests_index__WEBPACK_IMPORTED_MODULE_0__["getStatusesByClaimable"])(config, claimable.hash);
        const z = statuses.map(s => s.toPOD());
        ctx.postMessage(z);
    }
    ctx.postMessage('d');
}


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/util.ts":
/*!*********************!*\
  !*** ./src/util.ts ***!
  \*********************/
/*! exports provided: mustExist, notError, mustEqual, isTrue */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mustExist", function() { return mustExist; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notError", function() { return notError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mustEqual", function() { return mustEqual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isTrue", function() { return isTrue; });
function mustExist(v) {
    if (v === undefined || v === null) {
        console.trace('assertion: does not exist');
        throw new Error('assertion: must exist');
    }
    return v;
}
function notError(v) {
    if (v instanceof Error) {
        console.trace('assertion: there is an error:', v);
        throw v;
    }
    return v;
}
function mustEqual(a, b) {
    if (a !== b) {
        console.error('assertion failure: ', a, ' does not equal ', b);
        throw new Error('assertion failure');
    }
}
function isTrue(a) {
    if (a !== true) {
        console.error('assertion failure, got non-true');
        throw new Error('assertion failure');
    }
    return true;
}


/***/ }),

/***/ "./src/wallet/requests/index.ts":
/*!**************************************!*\
  !*** ./src/wallet/requests/index.ts ***!
  \**************************************/
/*! exports provided: getStatusesByClaimable, addClaimable, getLightningCapacities, getLightingNodeData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStatusesByClaimable", function() { return getStatusesByClaimable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addClaimable", function() { return addClaimable; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLightningCapacities", function() { return getLightningCapacities; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getLightingNodeData", function() { return getLightingNodeData; });
/* harmony import */ var moneypot_lib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! moneypot-lib */ "./node_modules/moneypot-lib/dist/index.js");
/* harmony import */ var moneypot_lib__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(moneypot_lib__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _make_request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./make-request */ "./src/wallet/requests/make-request.ts");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../util */ "./src/util.ts");



async function getStatusesByClaimable(config, claimableHash) {
    const url = `${config.custodianUrl}/statuses-by-claimable/${claimableHash}`;
    const statusPOD = await Object(_make_request__WEBPACK_IMPORTED_MODULE_1__["default"])(url);
    if (statusPOD instanceof _make_request__WEBPACK_IMPORTED_MODULE_1__["RequestError"]) {
        throw statusPOD;
    }
    if (!Array.isArray(statusPOD)) {
        throw new Error('statuses-by-claimable should have returned an array...');
    }
    return statusPOD.map(s => Object(_util__WEBPACK_IMPORTED_MODULE_2__["notError"])(moneypot_lib__WEBPACK_IMPORTED_MODULE_0__["Acknowledged"].statusFromPOD(s)));
}
async function addClaimable(config, claimable) {
    const resp = await Object(_make_request__WEBPACK_IMPORTED_MODULE_1__["default"])(config.custodianUrl + '/add-claimable', moneypot_lib__WEBPACK_IMPORTED_MODULE_0__["claimableToPOD"](claimable));
    if (resp instanceof _make_request__WEBPACK_IMPORTED_MODULE_1__["RequestError"]) {
        console.error('got request error: ', resp);
        return new Error('could not make request against server: ' + resp.message + ' : ' + resp.statusCode);
    }
    return moneypot_lib__WEBPACK_IMPORTED_MODULE_0__["Acknowledged"].claimableFromPOD(resp);
}
async function getLightningCapacities(config) {
    const url = `${config.custodianUrl}/inbound-outbound-capacity-lightning/`;
    const resp = await Object(_make_request__WEBPACK_IMPORTED_MODULE_1__["default"])(url);
    if (resp instanceof _make_request__WEBPACK_IMPORTED_MODULE_1__["RequestError"]) {
        console.error('got request error: ', resp);
        return new Error('could not make request against server: ' + resp.message + ' : ' + resp.statusCode);
    }
    return resp;
}
async function getLightingNodeData(config) {
    const url = `${config.custodianUrl}/lightning-node-information/`;
    const resp = await Object(_make_request__WEBPACK_IMPORTED_MODULE_1__["default"])(url);
    if (resp instanceof _make_request__WEBPACK_IMPORTED_MODULE_1__["RequestError"]) {
        console.error('got request error: ', resp);
        return new Error('could not make request against server: ' + resp.message + ' : ' + resp.statusCode);
    }
    return resp;
}


/***/ }),

/***/ "./src/wallet/requests/make-request.ts":
/*!*********************************************!*\
  !*** ./src/wallet/requests/make-request.ts ***!
  \*********************************************/
/*! exports provided: RequestError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RequestError", function() { return RequestError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return makeRequest; });
class RequestError {
    constructor(message, statusCode) {
        this.message = message;
        this.statusCode = statusCode;
    }
}
// if body does a post..
async function makeRequest(url, body) {
    let fetchResult;
    try {
        fetchResult = await fetch(url, {
            method: body === undefined ? 'GET' : 'POST',
            body: body === undefined ? undefined : JSON.stringify(body),
        });
    }
    catch (err) {
        return new RequestError(err, 0);
    }
    let json = await fetchResult.json();
    if (fetchResult.status !== 200) {
        console.log('giving a fetch error');
        return new RequestError(json, fetchResult.status);
    }
    return json;
}


/***/ })

/******/ });
//# sourceMappingURL=cbb96e66818bd5035641.worker.js.map