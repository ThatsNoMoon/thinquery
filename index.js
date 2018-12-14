window.thinQuery = function thinQuery(doc) {
    if (!Array.from) {
        Array.from = (function() {
            var toStr = Object.prototype.toString
            var isCallable = function(fn) {
                return (
                    typeof fn === "function" ||
                    toStr.call(fn) === "[object Function]"
                )
            }
            var toInteger = function(value) {
                var number = Number(value)
                if (isNaN(number)) {
                    return 0
                }
                if (number === 0 || !isFinite(number)) {
                    return number
                }
                return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number))
            }
            var maxSafeInteger = Math.pow(2, 53) - 1
            var toLength = function(value) {
                var len = toInteger(value)
                return Math.min(Math.max(len, 0), maxSafeInteger)
            }

            return function from(arrayLike /*, mapFn, thisArg */) {
                var C = this

                var items = Object(arrayLike)

                if (arrayLike == null) {
                    throw new TypeError(
                        "Array.from requires an array-like object - not null or undefined"
                    )
                }

                var mapFn = arguments.length > 1 ? arguments[1] : void undefined
                var T
                if (typeof mapFn !== "undefined") {
                    if (!isCallable(mapFn)) {
                        throw new TypeError(
                            "Array.from: when provided, the second argument must be a function"
                        )
                    }

                    if (arguments.length > 2) {
                        T = arguments[2]
                    }
                }
                var len = toLength(items.length)
                var A = isCallable(C) ? Object(new C(len)) : new Array(len)
                var k = 0
                var kValue
                while (k < len) {
                    kValue = items[k]
                    if (mapFn) {
                        A[k] =
                            typeof T === "undefined"
                                ? mapFn(kValue, k)
                                : mapFn.call(T, kValue, k)
                    } else {
                        A[k] = kValue
                    }
                    k += 1
                }
                A.length = len
                return A
            }
        })()
    }

    if (!Array.prototype.map) {
        Array.prototype.map = function(callback /*, thisArg*/) {
            var T, A, k

            if (this == null) {
                throw new TypeError("this is null or not defined")
            }
            var O = Object(this)
            var len = O.length >>> 0
            if (typeof callback !== "function") {
                throw new TypeError(callback + " is not a function")
            }
            if (arguments.length > 1) {
                T = arguments[1]
            }
            A = new Array(len)
            k = 0
            while (k < len) {
                var kValue, mappedValue
                if (k in O) {
                    kValue = O[k]
                    mappedValue = callback.call(T, kValue, k, O)
                    A[k] = mappedValue
                }
                k++
            }
            return A
        }
    }

    function checkType(type, x, name) {
        if (typeof x !== type)
            throw new TypeError((name || "input") + " must be a " + type)
    }

    function checkString(str, name) {
        checkType("string", str, name)
    }

    function checkObject(obj, name) {
        checkType("object", obj, name)
    }

    function checkInstance(type, x, name) {
        if (!(x instanceof type))
            throw new TypeError((name || "input") + " must be a " + type)
    }

    const $ = {}

    $.doc = doc

    $.id = function(id) {
        checkString(id, "id")
        return $.doc.getElementById(id)
    }

    $.class = function(className) {
        checkString(className, "class name")
        return Array.from($.doc.getElementsByClassName(className))
    }

    $.select = function(selector) {
        checkString(selector, "selector")
        return $.doc.querySelector(selector)
    }

    $.selectAll = function(selector) {
        checkString(selector, "selector")
        return Array.from($.doc.querySelectorAll(selector))
    }

    $.addClass = function(className) {
        checkString(className, "class name")
        return function(element) {
            checkInstance(HTMLElement, element, "element")
            element.classList.add(className)
        }
    }

    $.addCss = function(css) {
        checkObject(css, "css")
        return function(element) {
            checkInstance(HTMLElement, element, "element")
            for (let k in css) {
                element.style[k] = css[k]
            }
        }
    }

    $.setAttribute = function(name, value) {
        checkString(name, "attribute name")
        checkString(value, "attribute value")
        return function(element) {
            checkInstance(HTMLElement, element, "element")
            element.setAttribute(name, value)
        }
    }

    $.remove = function(element) {
        checkInstance(Node, element, "element")
        if (element.parentNode) element.parentNode.removeChild(element)
    }

    return $
}
