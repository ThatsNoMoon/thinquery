export class ThinQuery {
    doc: Document;

    constructor(doc: Document) {
        this.doc = doc;
    }

    id = (id: string) => this.doc.getElementById(id);

    class = (name: string) => Array.from(this.doc.getElementsByClassName(name));

    select = (selector: string) => this.doc.querySelector(selector);

    selectAll = (selector: string) => {
        return Array.from(this.doc.querySelectorAll(selector));
    };

    addClass = (name: string) => (element: Element) => {
        element.classList.add(name);
    };

    removeClass = (name: string) => (element: Element) => {
        element.classList.remove(name);
    };

    addCss = (css: Partial<CSSStyleDeclaration>) => {
        return (element: ElementCSSInlineStyle) => {
            Object.assign(element.style, css);
        };
    };

    setAttribute = (name: string, value: string) => (element: Element) => {
        element.setAttribute(name, value);
    };

    getAttribute = (name: string) => (element: Element) => {
        return element.getAttribute(name);
    };
    
    setText = (value: string) => (element: Node) => {
        element.textContent = value;
    };
    
    getText = (element: Node) => element.textContent;

    setValue = (value: string) => (element: HTMLInputElement) => {
        element.value = value;
    };

    getValue = (element: HTMLInputElement) => element.value;
}
