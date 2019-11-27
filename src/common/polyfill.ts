
export function installPolyfills() {

    // Element.matches (IE 9.0+)

    if (!Element.prototype.matches) {
        Element.prototype.matches = Element.prototype["msMatchesSelector"] ||
            Element.prototype.webkitMatchesSelector;
    }

    // Element.closest (depends on Element.matches)

    if (!Element.prototype.closest) {
        Element.prototype.closest = function(s: string) {
            let el: any = this;

            do {
                if (el.matches(s)) return el;
                el = el.parentElement || el.parentNode;
            } while (el !== null && el.nodeType === 1);
            return null;
        };
    }

}
