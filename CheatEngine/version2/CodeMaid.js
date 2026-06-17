// ==UserScript==
// @name         CodeMaid
// @namespace    https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version      1.0.0
// @description  Your Personal Assistant
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/
// @match        https://*.drawaria.online/test
// @match        https://*.drawaria.online/room/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

(function (scope) {
  var CodeMaid = {
    createDOM: {
      Element: function () {
        return document.createElement.apply(document, arguments);
      },
      TextNode: function () {
        return document.createTextNode.apply(document, arguments);
      },
      Tree: function (type, attrs, childrenArrayOrVarArgs) {
        const el = this.Element(type);
        let children;
        if (CodeMaid.validate.isArray(childrenArrayOrVarArgs)) {
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
      },
      fromJSON: function (JSONDOM = { element: '', attributes: {}, children: [] }) {
        if (CodeMaid.validate.isString(JSONDOM)) return CodeMaid.createDOM.TextNode(JSONDOM);
        let dom = CodeMaid.createDOM.Tree(JSONDOM.element, JSONDOM.attributes);
        JSONDOM.children.forEach((child) => {
          dom.append(this.fromJSON(child));
        });
        return dom;
      },
      Button: function (content) {
        let btn = this.Tree('button');
        btn.className = 'btn btn-outline-secondary';
        btn.innerHTML = content;
        return btn;
      },
      FA: function (fontawesome_icon) {
        let m = fontawesome_icon.match(/\".*\"/g);
        return this.Tree('i', { class: m[0].slice(1, m[0].length - 1) });
      },
      Row: function () {
        return this.Tree('div', { class: 'ce_row' });
      },
      RowList: function () {
        return this.Tree('div', { class: 'icon-list' });
      },
    },
    validate: {
      isArray: function (value) {
        return this.isA('Array', value);
      },
      isObject: function (value) {
        return !this.isUndefined(value) && value !== null && this.isA('Object', value);
      },
      isString: function (value) {
        return this.isA('String', value);
      },
      isNumber: function (value) {
        return this.isA('Number', value);
      },
      isFunction: function (value) {
        return this.isA('Function', value);
      },
      isAsyncFunction: function (value) {
        return this.isA('AsyncFunction', value);
      },
      isGeneratorFunction: function (value) {
        return this.isA('GeneratorFunction', value);
      },
      isTypedArray: function (value) {
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
      },
      isA: function (typeName, value) {
        return this.getType(value) === '[object ' + typeName + ']';
      },
      isError: function (value) {
        if (!value) {
          return false;
        }

        if (value instanceof Error) {
          return true;
        }

        return typeof value.stack === 'string' && typeof value.message === 'string';
      },
      isUndefined: function (obj) {
        return obj === void 0;
      },
      getType: function (value) {
        return Object.prototype.toString.apply(value);
      },
    },
    cookies: {
      set: function (name, value = '') {
        document.cookie = name + '=' + value + '; expires=Thu, 2 Aug 2001 20:47:11 UTC; path=/';
      },
      get: function (name) {
        var nameEQ = name + '=';
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
          var c = ca[i];
          while (c.charAt(0) == ' ') c = c.substring(1, c.length);
          if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
      },
      clear: function (name) {
        document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      },
      obfuscate: function () {
        window.Cookies = {
          get: function () {
            console.log(arguments);
            return 'lol no';
          },
        };
      },
    },
    cleanup: {
      scripts: function () {
        try {
          let array = document.querySelectorAll('script[src]');
          array.forEach((script) => {
            if (script.src != '') document.head.append(script);
          });
        } catch (error) {
          console.error(error);
        }

        try {
          let unifiedScript = CodeMaid.createDOM.Tree('script');

          let scripts = document.querySelectorAll('script:not([src])');
          let unifiedScriptContent = '';
          scripts.forEach((script) => {
            let content = script.textContent; //.replaceAll(/\s/g, '');

            unifiedScriptContent += `try{${content}}catch(e){console.warn(e);}`;
            script.remove();
          });

          unifiedScript.textContent = unifiedScriptContent;

          document.head.append(unifiedScript);
        } catch (error) {
          console.error(error);
        }
      },
      iframes: function () {
        try {
          let array = document.querySelectorAll('iframe');
          array.forEach((iframe) => {
            iframe.remove();
          });
        } catch (error) {
          console.error(error);
        }
      },
      styles: function () {
        try {
          let unifiedStyles = CodeMaid.createDOM.Tree('style');
          unifiedStyles.textContet = '';

          let styles = document.querySelectorAll('style');
          styles.forEach((style) => {
            unifiedStyles.textContent += style.textContent;
            style.remove();
          });

          document.head.append(unifiedStyles);
        } catch (error) {
          console.error(error);
        }
      },
      cursors: function () {
        try {
          let cursors = document.querySelectorAll('.brushcursor');
          cursors.forEach((cursor) => {
            cursor.remove();
          });
        } catch (error) {
          console.error(error);
        }
      },
      all: function () {
        this.iframes();
        this.styles();
        this.scripts();
        this.cursors();
      },
    },
    generate: {
      uuidv4: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
          var r = (Math.random() * 16) | 0,
            v = c == 'x' ? r : (r & 0x3) | 0x8;
          return v.toString(16);
        });
      },
    },
  };

  scope['CodeMaid'] = CodeMaid;
})(globalThis);
