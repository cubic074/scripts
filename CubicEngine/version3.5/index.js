// ==UserScript==
// @name          Drawaria.Modded
// @namespace     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version       ≺ᴄᴜʙᴇ³≻
// @description   A Modmenu for Drawaria.Online
// @author        ≺ᴄᴜʙᴇ³≻
// @match         https://*.drawaria.online/
// @match         https://*.drawaria.online/room/*
// @icon64        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant         none
// @license       GNU GPLv3
// @run-at        document-idle
// @require       https://greasyfork.org/scripts/473965-cubic-helpers/code/Cubic%20Helpers.js?version=1241393
// ==/UserScript==

(function initialize(identifier) {
  var helper = globalThis['#tools'];

  globalThis['#tools'].interface.buildButton = function (content) {
    let btn = helper.interface.buildTree('button', { class: 'btn btn-outline-secondary' });
    btn.innerHTML = content;
    return btn;
  };
  globalThis['#tools'].interface.buildRow = function () {
    return helper.interface.buildTree('div', { class: '_row' });
  };
  globalThis['#tools'].interface.buildIconList = function () {
    return helper.interface.buildTree('div', { class: 'icon-list' });
  };

  class Stylizer {
    constructor() {
      this.element = helper.interface.buildTree('style', { 'data-codemaid': 'ignore' }, []);
      document.head.appendChild(this.element);
      this.initialize();
    }

    initialize() {
      this.addRules([
        `body * {margin: 0; padding: 0; box-sizing: border-box; line-height: normal;}`,
        `#${identifier} {--CE-bg_color: var(--light); --CE-color: var(--dark); line-height: 2rem; font-size: 1rem;}`,
        `#${identifier} {position:relative; overflow:visible; z-index: 999; background-color: var(--CE-bg_color); border: var(--CE-color) 1px solid; border-radius: .25rem;}`,
        `#${identifier} details>summary::marker {content:"📘";}`,
        `#${identifier} details[open]>summary::marker {content:"📖";}`,
        `#${identifier}>summary::marker {content:"📘";}`,
        `#${identifier}[open]>summary::marker {content:"📖";}`,
        `#${identifier} details {margin: 1px 0; border-top: var(--CE-color) 1px solid;}`,
        `#${identifier} input[name][hidden]:not(:checked) + * {display: none !important;}`,
        `#${identifier} header>label.icon {margin: 1px;}`,
        `#${identifier} header>label.icon.active {color: var(--success);}`,
        `#${identifier} header>label.icon:not(.active) {color:var(--danger); opacity:.6;}`,
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
      let TextNode = helper.interface.buildTextNode(rule);
      this.element.appendChild(TextNode);
    }
  }

  function log(level, message, application = 'global') {
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

    console.log(`%c${application}: ${message}`, `color: ${color}`);
    let chatmessage = helper.interface.buildTree(
      'div',
      { class: `chatmessage systemchatmessage5`, 'data-ts': Date.now(), style: `color: ${color}` },
      [`${application}: ${message}`]
    );

    document.getElementById('chatbox_messages').append(chatmessage);
  }

  function createUserInterface(labelImage, title) {
    let id = helper.generate.uuidv4();
    let label = helper.interface.buildTree('label', { for: id, class: 'icon', title: title }, [labelImage]);
    let input = helper.interface.buildTree('input', { hidden: true, name: identifier, type: 'checkbox', id: id });

    let details = helper.interface.buildTree('details', { open: true, class: 'noselect' });
    let summary = helper.interface.buildTree('summary', { class: 'noselect' }, [title]);
    let header = helper.interface.buildTree('header', { class: 'icon-list' });
    let section = helper.interface.buildTree('section');

    details.append(summary);
    details.append(header);
    details.append(section);

    input.addEventListener('change', function (event) {
      label.classList[input.checked ? 'add' : 'remove']('active');
    });

    label.classList[input.checked ? 'add' : 'remove']('active');

    return {
      label: label,
      input: input,
      header: header,
      section: section,
      details: details,
      summary: summary,
    };
  }

  class Addon {
    static collection = new Map();
    static register = function (addonName, addonClass) {
      Addon.collection.set(addonName, addonClass);
      return null;
    };
    static unregister = function (addonName, addonClass) {
      Addon.collection.delete(addonName);
      return null;
    };
    static bind = function (addonName, addonClass) {
      let reference = Addon.collection.get(addonName);
      if (!reference.autoloader) reference.autoloader = [];
      reference.autoloader.push(addonClass);
      return null;
    };
    static locate = function (addonName, addonClass) {
      return Addon.collection.get(addonName);
    };

    #AddonIdentifier;
    elements;
    activeAddons;
    preventAutoload;

    constructor(labelImage) {
      this.#AddonIdentifier = this.constructor.name;
      this.elements = createUserInterface(labelImage, this.#AddonIdentifier);
      this.activeAddons = [];
      if (!this.preventAutoload) this._loadMyAddons();
    }

    _loadThisAddon(addon) {
      let loadedAddon = new addon();
      addon.loadedBy = this;
      loadedAddon.loadedBy = this;

      let elements = loadedAddon.whereAmI(true);
      this.elements.header.append(elements.label);
      this.elements.details.append(elements.input);
      this.elements.details.append(elements.details);
      this.activeAddons.push(loadedAddon);
      if (!addon.activeCopies) addon.activeCopies = [];
      addon.activeCopies.push(loadedAddon);
    }
    _loadMyAddons() {
      if (helper.validate.isArray(this.constructor.autoloader))
        this.constructor.autoloader.forEach((addon) => {
          this._loadThisAddon(addon);
        });
    }

    whoAmI() {
      return this.#AddonIdentifier;
    }

    whereAmI(exposeAll = false) {
      if (exposeAll) return this.elements;
      return this.elements.details;
    }

    overwriteTitle(newTitle) {
      this.elements.label.title = newTitle;
      this.elements.summary.childNodes[0].remove();
      this.elements.summary.appendChild(helper.interface.buildTextNode(newTitle));
    }
    overwriteLabelImage(newImageElement) {
      this.elements.label.childNodes[0].remove();
      this.elements.label.appendChild(newImageElement);
    }

    locateAddon(addonName, addonClass) {
      return Addon.collection.get(addonName);
    }

    log(level, message) {
      log(level, message, this.whoAmI());
    }
  }

  class Engine extends Addon {
    static dummy = Addon.register('Engine', this);

    Addon;
    Engine;
    elements;
    activeAddons;

    constructor() {
      super();
      this.Addon = Addon;
      this.Engine = Engine;
      this.stylize = new Stylizer();
      this.elements = createUserInterface('', 'CubeEngine');
      this.elements.details.id = identifier;
      document.body
        .querySelector('#accountbox')
        .after(
          helper.interface.buildTree('div', { style: 'height: 1.6rem; flex: 0 0 auto;' }, [this.elements.details])
        );
      this.activeAddons = [];
    }
  }

  globalThis[identifier] = new Engine();

  document.head.append(
    helper.interface.buildTree('script', {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js',
    })
  );

  return function (when) {
    window.addEventListener(when, function (event) {
      Addon.Engine = Engine;
      globalThis[identifier].constructor.activeCopies = [globalThis[identifier]];
      globalThis[identifier]._loadMyAddons();
      globalThis[identifier]._loadAddons = null;

      let target = document.getElementById('accountbox');
      target.after(helper.interface.buildTree('hr'));
    });
  };
})('CubeEngine')('load');

class Await {
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
