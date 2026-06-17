// ==UserScript==
// @name         Cubic Engine
// @version      4.3
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

(function CubicEngine() {
  domMake.Button = function (content) {
    let btn = domMake.Tree('button', { class: 'btn btn-outline-secondary' });
    btn.innerHTML = content;
    return btn;
  };
  domMake.Row = function () {
    return domMake.Tree('div', { class: '_row' });
  };
  domMake.IconList = function () {
    return domMake.Tree('div', { class: 'icon-list' });
  };

  const sockets = [];
  const originalSend = WebSocket.prototype.send;
  WebSocket.prototype.send = function (...args) {
    let socket = this;
    if (sockets.indexOf(socket) === -1) {
      sockets.push(socket);
    }
    socket.addEventListener('close', function () {
      const pos = sockets.indexOf(socket);
      if (~pos) sockets.splice(pos, 1);
    });
    return originalSend.call(socket, ...args);
  };

  const identifier = '🧊';

  class Stylizer {
    constructor() {
      this.element = domMake.Tree('style', { 'data-codemaid': 'ignore' }, []);
      document.head.appendChild(this.element);
      this.initialize();
    }

    initialize() {
      this.addRules([
        `body * {margin: 0; padding: 0; box-sizing: border-box; line-height: normal;}`,
        `#${identifier} {--CE-bg_color: var(--light); --CE-color: var(--dark); line-height: 2rem; font-size: 1rem;}`,
        `#${identifier}>details {position:relative; overflow:visible; z-index: 999; background-color: var(--CE-bg_color); border: var(--CE-color) 1px solid; border-radius: .25rem;}`,
        `#${identifier} details>summary::marker {content:"📘";}`,
        `#${identifier} details[open]>summary::marker {content:"📖";}`,
        `#${identifier} details details {margin: 1px 0; border-top: var(--CE-color) 1px solid;}`,
        `#${identifier} input.toggle[name][hidden]:not(:checked) + * {display: none !important;}`,
        `#${identifier} header>.icon {margin: 1px;}`,
        `#${identifier} header>.icon.active {color: var(--success);}`,
        `#${identifier} header>.icon:not(.active) {color:var(--danger); opacity:.6;}`,
        `#${identifier} header:not(:has([title='Unselect'] + *)) > [title='Unselect'] {display:none;}`,
        `#${identifier} .btn {padding: 0;}`,
        `#${identifier} .icon-list {display: flex; flex-flow: wrap;}`,
        `#${identifier} .nowrap {overflow-x: scroll; padding-bottom: 12px; flex-flow: nowrap;}`,
        `#${identifier} .icon {display: flex; flex: 0 0 auto; max-width: 1.6rem; min-width: 1.6rem; height: 1.6rem; border-radius: .25rem; border: 1px solid var(--CE-color); aspect-ratio: 1/1;}`,
        `#${identifier} .icon > * {margin: auto; text-align: center; max-height: 100%; max-width: 100%;}`,
        `#${identifier} .itext {text-align: center; -webkit-appearance: none; -moz-appearance: textfield;}`,
        `#${identifier} ._row {display: flex; width: 100%;}`,
        `#${identifier} ._row > * {width: 100%;}`,
        `hr {margin: 5px 0;}`,
        `.playerlist-row::after {content: attr(data-playerid); position: relative; float: right; top: -20px;}`,
        `[hidden] {display: none !important;}`,
        `.noselect {-webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; user-select: none;}`,
      ]);
    }

    addRules(rules = []) {
      let reference = this;
      rules.forEach(function (rule) {
        reference.addRule(rule);
      });
    }
    addRule(rule) {
      let TextNode = domMake.TextNode(rule);
      this.element.appendChild(TextNode);
    }
  }

  class ModBase {
    static globalListOfExtensions = [];
    static localListOfExtensions = [];
    static Styles = new Stylizer();

    static register = function (extension) {
      extension.localListOfExtensions = [];
      ModBase.globalListOfExtensions.push(extension);
      return ModBase;
    };
    static bind = function (extension, target) {
      let parent;
      if (typecheck.isFunction(target)) parent = target;
      else if (typecheck.isString(target))
        parent = ModBase.globalListOfExtensions.find((entry) => entry.name === target);
      else if (typecheck.isObject(target)) parent = target.constructor;
      else {
        console.log(typecheck.getType(target));
      }
      if (!parent) return new Error(`${parent}`);

      parent.localListOfExtensions.push(extension);
      parent.autostart = true;

      return parent;
    };
    static findGlobal = function (extensionName) {
      return ModBase.globalListOfExtensions.find((entry) => entry.name === extensionName);
    };

    #id;
    #name;
    #icon;

    htmlElements;
    children;
    parent;

    constructor(name, icon) {
      this.#id = generate.uuidv4();
      this.#name = this.constructor.name;
      this.#icon = '📦';
      this.children = [];
      this.htmlElements = {};

      this.#onStartup();

      this.setName(name || this.#name);
      this.setIcon(icon || this.#icon);
    }

    #onStartup() {
      this.#loadInterface();

      if (this.constructor.autostart)
        this.constructor.localListOfExtensions.forEach((extension) => {
          this.loadExtension(extension);
        });
    }

    #loadInterface() {
      this.htmlElements.details = domMake.Tree('details', {
        class: 'noselect',
        open: true,
        'data-reference': this.constructor.name,
      });
      this.htmlElements.summary = domMake.Tree('summary');
      this.htmlElements.header = domMake.Tree('header', { class: 'icon-list' });
      this.htmlElements.section = domMake.Tree('section');
      this.htmlElements.children = domMake.Tree('section');

      this.htmlElements.details.appendChild(this.htmlElements.summary);
      this.htmlElements.details.appendChild(this.htmlElements.header);
      this.htmlElements.details.appendChild(this.htmlElements.section);
      this.htmlElements.details.appendChild(this.htmlElements.children);

      this.htmlElements.input = domMake.Tree(
        'input',
        { type: 'radio', id: this.#id, name: 'QBit', class: 'toggle', hidden: true, title: this.#name },
        [this.#name]
      );
      this.htmlElements.label = domMake.Tree('label', { for: this.#id, class: 'icon' });

      {
        const input = this.htmlElements.input;
        const label = this.htmlElements.label;

        input.addEventListener('change', (event) => {
          this.parent?.children.forEach((child) => {
            child.htmlElements.label.classList.remove('active');
          });

          label.classList[input.checked ? 'add' : 'remove']('active');
        });

        label.classList[input.checked ? 'add' : 'remove']('active');
      }
      {
        const resetImageSelectionLabel = domMake.Tree('div', { class: 'icon', title: 'Unselect' }, [
          domMake.Tree('i', { class: 'fas fa-chevron-left' }),
        ]);
        resetImageSelectionLabel.addEventListener('click', () => {
          this.children.forEach((child) => {
            child.htmlElements.label.classList.remove('active');
            child.htmlElements.input.checked = !1;
          });
        });
        this.htmlElements.header.appendChild(resetImageSelectionLabel);
      }
    }

    loadExtension(extension, referenceHandler) {
      let activeExtension = new extension();
      activeExtension.parent = this;

      activeExtension.htmlElements.input.name = this.getName();

      if (referenceHandler) referenceHandler(activeExtension);
      else this.children.push(activeExtension);

      if (!extension.siblings) extension.siblings = [];
      extension.siblings.push(activeExtension);

      if (extension.isFavorite) {
        activeExtension.htmlElements.input.click();
        if (activeExtension.enable) activeExtension.enable();
      }

      this.htmlElements.header.appendChild(activeExtension.htmlElements.label);
      this.htmlElements.children.appendChild(activeExtension.htmlElements.input);
      this.htmlElements.children.appendChild(activeExtension.htmlElements.details);

      return activeExtension;
    }

    notify(level, message) {
      if (typeof message != 'string') {
        try {
          message = JSON.stringify(message);
        } catch (error) {
          throw error;
        }
      }

      let color = '';
      if ([5, 'error'].includes(level)) {
        color = '#dc3545';
      } else if ([4, 'warning'].includes(level)) {
        color = '#ffc107';
      } else if ([3, 'info'].includes(level)) {
        color = '#17a2b8';
      } else if ([2, 'success'].includes(level)) {
        color = '#28a745';
      } else if ([1, 'log'].includes(level)) {
        color = '#6c757d';
      } else if ([0, 'debug'].includes(level)) {
        color = 'purple';
      }

      console.log(`%c${this.#name}: ${message}`, `color: ${color}`);
      let chatmessage = domMake.Tree(
        'div',
        { class: `chatmessage systemchatmessage5`, 'data-ts': Date.now(), style: `color: ${color}` },
        [`${this.#name}: ${message}`]
      );

      let loggingContainer = document.getElementById('chatbox_messages');
      if (!loggingContainer) loggingContainer = document.body;
      loggingContainer.appendChild(chatmessage);
    }

    findGlobal(extensionName) {
      return this.referenceToBase.findGlobal(extensionName);
    }

    findLocal(extensionName) {
      return this.children.filter((child) => child.constructor.name === extensionName);
    }

    setName(name) {
      if (!name) return;

      this.#name = name;
      this.htmlElements.label.title = name;

      this.htmlElements.summary.childNodes.forEach((child) => child.remove());

      if (typecheck.isString(name)) {
        if (name.startsWith('<')) return (this.htmlElements.summary.innerHTML = name);
        name = domMake.TextNode(name);
      }

      this.htmlElements.summary.appendChild(name);
    }

    getName() {
      return this.#name;
    }

    setIcon(icon) {
      if (!icon) return;

      this.#icon = icon;

      this.htmlElements.label.childNodes.forEach((child) => child.remove());

      if (typecheck.isString(icon)) {
        if (icon.startsWith('<')) return (this.htmlElements.label.innerHTML = icon);
        icon = domMake.TextNode(icon);
      }

      this.htmlElements.label.appendChild(icon);
    }

    getIcon() {
      return this.#icon;
    }

    get referenceToBase() {
      return this.constructor.dummy1;
    }
    get referenceToMaster() {
      return this.constructor.dummy2;
    }

    _EXP_destroy(youSure = false) {
      if (!youSure) return;

      this.children.forEach((child) => {
        child._EXP_destroy(youSure);
        delete [child];
      });
      this.children = null;

      let pos = this.parent.children.indexOf(this);
      if (~pos) {
        this.parent.children.splice(pos, 1);
      }

      this.htmlElements.children.remove();
      this.htmlElements.section.remove();
      this.htmlElements.header.remove();
      this.htmlElements.summary.remove();
      this.htmlElements.details.remove();
      this.htmlElements.input.remove();
      this.htmlElements.label.remove();

      this.htmlElements = null;

      let pos2 = this.constructor.siblings.indexOf(this);
      if (~pos2) {
        this.constructor.siblings.splice(pos2, 1);
      }
    }
  }

  class CubeEngine extends ModBase {
    static dummy1 = ModBase.register(this);

    constructor() {
      super('CubeEngine');
    }
  }

  class Await {
    static dummy1 = ModBase.register(this);

    #interval;
    #handler;
    #callback;
    constructor(callback, interval) {
      this.#interval = interval;
      this.#callback = callback;
    }

    call() {
      const localThis = this;
      clearTimeout(this.#handler);

      this.#handler = setTimeout(function () {
        localThis.#callback();
      }, this.#interval);
    }
  }

  globalThis[arguments[0]] = ModBase;

  return function (when = 'load') {
    setTimeout(() => {
      const ModMenu = new CubeEngine();
      // ModMenu.htmlElements.details.open = false;

      const target = document.getElementById('accountbox');
      const container = domMake.Tree('div', { id: identifier, style: 'height: 1.6rem; flex: 0 0 auto;' });
      container.appendChild(ModMenu.htmlElements.details);
      target.after(container);
      target.after(domMake.Tree('hr'));

      globalThis['CubeEngine'] = ModMenu;
      globalThis['sockets'] = sockets;

      domClear.embeds();
      domClear.scripts();
      domClear.styles();
      console.clear();
    }, 200);
  };
})('QBit')();
