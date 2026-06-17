// ==UserScript==
// @name         Cubic Helpers
// @namespace    https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version      2.0.0
// @description  Helper Functions to make my life easier... hopefully
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/
// @match        https://*.drawaria.online/room/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// @run-at       document-idle
// ==/UserScript==

(function (identifier) {
  /**
   * ValidationManager
   * Helps with type validation
   * Extracted from `jasmine-standalone-4.5.0` Unit Testing Library
   */
  class ValidationManager {
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

  /**
   * UserInterfaceManager
   * Helps with converting HTML to JSON objects and vise versa
   * Partially extracted from `jasmine-standalone-4.5.0` Unit Testing Library
   */
  class UserInterfaceManager {
    #validate;
    constructor() {
      this.#validate = new ValidationManager();
    }
    export(node = document.createElement('div')) {
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
        json.children.push(referenceTolocalThis.export(childNode));
      });

      return json;
    }

    import(json = { nodeName: '', attributes: {}, children: [] }) {
      let referenceTolocalThis = this;

      if (referenceTolocalThis.#validate.isString(json)) {
        return this.buildTextNode(json);
      }

      let node = this.buildTree(json.nodeName, json.attributes);

      json.children.forEach(function (child) {
        node.appendChild(referenceTolocalThis.import(child));
      });

      return node;
    }

    buildElement() {
      return document.createElement.apply(document, arguments);
    }
    buildTextNode() {
      return document.createTextNode.apply(document, arguments);
    }
    buildTree(type, attrs, childrenArrayOrVarArgs) {
      const el = this.buildElement(type);
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
          el.appendChild(this.buildTextNode(child));
        } else {
          if (child) {
            el.append(child);
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
          el.append(node);
        });
      };

      return el;
    }
  }

  /**
   * CookieManager
   * Helps with the management of cookies - duuh
   */
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

  /**
   * Generator
   * Helps with generating various things
   * uuid - v4
   * etc...
   */
  class Generator {
    constructor() {}
    uuidv4() {
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (Math.random() * 16) | 0,
          v = c == 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      });
    }
  }
  /**
   * DocumentCleaner
   * Helps with clearing some junk in your page
   * Removes iframes (most of the time ads)
   * Removes or unifies styles
   * Removes or unifies scripts (may be a little buggy)
   */
  class DocumentCleaner {
    document;
    constructor() {
      this.document = new UserInterfaceManager();
    }
    clearScripts(remove = true) {
      try {
        let array = document.querySelectorAll('script[src]:not([data-codemaid="__ignore"])');
        array.forEach((script) => {
          if (script.src != '') document.head.append(script);
        });
      } catch (error) {
        console.error(error);
      }

      try {
        let unifiedScript = this.document.buildTree('script');

        let scripts = document.querySelectorAll('script:not([src]):not([data-codemaid="__ignore"])');
        let unifiedScriptContent = '';
        scripts.forEach((script) => {
          let content = script.textContent; //.replaceAll(/\s/g, '');

          unifiedScriptContent += `try{${content}}catch(e){console.warn(e);}`;
          script.remove();
        });

        unifiedScript.textContent = unifiedScriptContent;

        if (!remove) document.head.append(unifiedScript);
      } catch (error) {
        console.error(error);
      }
    }
    clearIframes() {
      try {
        let array = document.querySelectorAll('iframe');
        array.forEach((iframe) => {
          iframe.remove();
        });
      } catch (error) {
        console.error(error);
      }
    }
    clearStyles(remove = false) {
      try {
        let unifiedStyles = this.document.buildTree('style');
        unifiedStyles.textContet = '';

        let styles = document.querySelectorAll('style:not([data-codemaid="__ignore"])');
        styles.forEach((style) => {
          unifiedStyles.textContent += style.textContent;
          style.remove();
        });
        if (!remove) document.head.append(unifiedStyles);
      } catch (error) {
        console.error(error);
      }
    }
    clearAll() {
      this.iframes();
      this.styles();
      this.scripts();
    }
  }

  globalThis[identifier] = {
    validate: new ValidationManager(),
    cookie: new CookieManager(),
    generate: new Generator(),
    interface: new UserInterfaceManager(),
    cleanup: new DocumentCleaner(),
  };
})('#tools');
