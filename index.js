window.thinQuery = function thinQuery(doc) {
    function makeArray(arrayLike) {
        if (Array.from) {
            return Array.from(arrayLike)
        } else {
            return [].slice.call(arrayLike)
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
        return makeArray($.doc.getElementsByClassName(className))
    }

    $.select = function(selector) {
        checkString(selector, "selector")
        return $.doc.querySelector(selector)
    }

    $.selectAll = function(selector) {
        checkString(selector, "selector")
        return makeArray($.doc.querySelectorAll(selector))
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
            checkInstance(Element, element, "element")
            element.setAttribute(name, value)
        }
    }

    $.getAttribute = function(name) {
        checkString(name, "attribute name")
        return function(element) {
            checkInstance(Element, element, "element")
            return element.getAttribute(name)
        }
    }

    $.setText = function(text) {
        checkString(text, "text")
        return function(element) {
            checkInstance(HTMLElement, element, "element")
            element.innerText = text
        }
    }

    $.getText = function(element) {
        checkInstance(HTMLElement, element, "element")
        return element.innerText
    }

    $.setValue = function(val) {
        checkString(val, "value")
        return function(element) {
            checkInstance(HTMLElement, element, "element")
            element.value = val
        }
    }

    $.getValue = function(element) {
        checkInstance(HTMLElement, element, "element")
        return element.value
    }

    $.remove = function(element) {
        checkInstance(Node, element, "element")
        if (element.parentNode) element.parentNode.removeChild(element)
    }

    return $
}
