// ==UserScript==
// @name         CodeMaid
// @version      1.3
// @description  Enhance your Experience
// @namespace    drawaria.modded.partial
// @homepage     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://drawaria.online/
// @match        https://drawaria.online/room/*
// @icon         https://drawaria.online/avatar/cache/e53693c0-18b1-11ec-b633-b7649fa52d3f.jpg
// @grant        none
// @license      GNU GPLv3
// @run-at       document-end
// ==/UserScript==

(function (callback) {
  class TypeChecker {
    constructor() {}
    isArray(value) {
      return this.isA('Array', value);
    }
    isObject(value) {
      return !this.isUndefined(value) && value !== null && this.isA('Object', value);
    }
    isString(value) {
      return this.isA('String', value);
    }
    isNumber(value) {
      return this.isA('Number', value);
    }
    isFunction(value) {
      return this.isA('Function', value);
    }
    isAsyncFunction(value) {
      return this.isA('AsyncFunction', value);
    }
    isGeneratorFunction(value) {
      return this.isA('GeneratorFunction', value);
    }
    isTypedArray(value) {
      return (
        this.isA('Float32Array', value) ||
        this.isA('Float64Array', value) ||
        this.isA('Int16Array', value) ||
        this.isA('Int32Array', value) ||
        this.isA('Int8Array', value) ||
        this.isA('Uint16Array', value) ||
        this.isA('Uint32Array', value) ||
        this.isA('Uint8Array', value) ||
        this.isA('Uint8ClampedArray', value)
      );
    }
    isA(typeName, value) {
      return this.getType(value) === '[object ' + typeName + ']';
    }
    isError(value) {
      if (!value) {
        return false;
      }

      if (value instanceof Error) {
        return true;
      }

      return typeof value.stack === 'string' && typeof value.message === 'string';
    }
    isUndefined(obj) {
      return obj === void 0;
    }
    getType(value) {
      return Object.prototype.toString.apply(value);
    }
  }

  class DOMCreate {
    #validate;
    constructor() {
      this.#validate = new TypeChecker();
    }
    exportNodeTree(node) {
      let referenceTolocalThis = this;

      let json = {
        nodeName: node.nodeName,
        attributes: {},
        children: [],
      };

      Array.from(node.attributes).forEach(function (attribute) {
        json.attributes[attribute.name] = attribute.value;
      });

      if (node.children.length <= 0) {
        json.children.push(node.textContent.replaceAll('\t', ''));
        return json;
      }

      Array.from(node.children).forEach(function (childNode) {
        json.children.push(referenceTolocalThis.exportNodeTree(childNode));
      });

      return json;
    }

    importNodeTree(json) {
      let referenceTolocalThis = this;

      if (referenceTolocalThis.#validate.isString(json)) {
        return this.TextNode(json);
      }

      let node = this.Tree(json.nodeName, json.attributes);

      json.children.forEach(function (child) {
        node.appendChild(referenceTolocalThis.importNodeTree(child));
      });

      return node;
    }

    Element() {
      return document.createElement.apply(document, arguments);
    }
    TextNode() {
      return document.createTextNode.apply(document, arguments);
    }
    Tree(type, attrs, childrenArrayOrVarArgs) {
      const el = this.Element(type);
      let children;
      if (this.#validate.isArray(childrenArrayOrVarArgs)) {
        children = childrenArrayOrVarArgs;
      } else {
        children = [];

        for (let i = 2; i < arguments.length; i++) {
          children.push(arguments[i]);
        }
      }

      for (let i = 0; i < children.length; i++) {
        const child = children[i];

        if (typeof child === 'string') {
          el.appendChild(this.TextNode(child));
        } else {
          if (child) {
            el.appendChild(child);
          }
        }
      }
      for (const attr in attrs) {
        if (attr == 'className') {
          el[attr] = attrs[attr];
        } else {
          el.setAttribute(attr, attrs[attr]);
        }
      }

      el.appendAll = function (...nodes) {
        nodes.forEach((node) => {
          el.appendChild(node);
        });
      };

      return el;
    }
  }

  class CookieManager {
    constructor() {}
    set(name, value = '') {
      document.cookie =
        name + '=' + value + '; expires=' + new Date('01/01/2024').toUTCString().replace('GMT', 'UTC') + '; path=/';
    }
    get(name) {
      var nameEQ = name + '=';
      var ca = document.cookie.split(';');
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
      }
      return null;
    }
    clear(name) {
      document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
  }

  class DocumentCleaner {
    document;
    constructor() {
      this.document = new DOMCreate();
    }
    scripts(remove = true) {
      try {
        let array = document.querySelectorAll('script[src]:not([data-codemaid="ignore"])');
        array.forEach((script) => {
          if (script.src != '') document.head.appendChild(script);
        });
      } catch (error) {
        console.error(error);
      }

      try {
        let unifiedScript = this.document.Tree('script');

        let scripts = document.querySelectorAll('script:not([src]):not([data-codemaid="ignore"])');
        let unifiedScriptContent = '';
        scripts.forEach((script) => {
          let content = script.textContent; //.replaceAll(/\s/g, '');

          unifiedScriptContent += `try{${content}}catch(e){console.warn(e);}`;
          script.remove();
        });

        unifiedScript.textContent = unifiedScriptContent;

        if (!remove) document.head.appendChild(unifiedScript);
      } catch (error) {
        console.error(error);
      }
    }
    styles(remove = false) {
      try {
        let unifiedStyles = this.document.Tree('style');
        unifiedStyles.textContet = '';

        let styles = document.querySelectorAll('style:not([data-codemaid="ignore"])');
        styles.forEach((style) => {
          unifiedStyles.textContent += style.textContent;
          style.remove();
        });
        if (!remove) document.head.appendChild(unifiedStyles);
      } catch (error) {
        console.error(error);
      }
    }
    embeds() {
      try {
        let array = document.querySelectorAll('iframe');
        array.forEach((iframe) => {
          iframe.remove();
        });
      } catch (error) {
        console.error(error);
      }
    }
  }

  class CustomGenerator {
    constructor() {}
    uuidv4() {
      return crypto.randomUUID();
    }
  }

  globalThis.typecheck = new TypeChecker();
  globalThis.cookies = new CookieManager();
  globalThis.domMake = new DOMCreate();
  globalThis.domClear = new DocumentCleaner();
  globalThis.generate = new CustomGenerator();

  if (window.location.pathname === '/') window.location.assign('/test');
})();
