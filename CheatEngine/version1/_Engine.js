// ==UserScript==
// @name         CheatEngine
// @namespace    CheatEngine
// @version      1.0.0
// @description  A base Class for making Cheat for Drawaria.Online
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// @run-at       document-end
// ==/UserScript==

(function (scope) {
  class Cheat {
    static bind = function (child, parent) {
      if (!Engine.Mapper.get(parent)) Engine.Mapper.set(parent, []);
      Engine.Mapper.get(parent).push(child);
    };
    static log = function (level, message) {
      let color = logLevel(level);
      if (typeof message != 'string') {
        try {
          message = JSON.stringify(message);
        } catch (error) {
          throw error;
        }
      }

      Engine.chatbox.append(
        CodeMaid.createDOM.Tree(
          'div',
          {
            class: `chatmessage systemchatmessage7`,
            'data-ts': Date.now(),
            style: `color: ${color}`,
          },
          [message]
        )
      );
      console.log(`%c${message}`, `color: ${color}`);
    };

    summary;
    details;
    constructor(parentClassReference, position, callback) {
      this.name = this.constructor.name;
      this.icon = CodeMaid.createDOM.FA('<i class="fa-duotone fa-face-awesome"></i>');
      this.uid = CodeMaid.generate.uuidv4();

      this.initialize(parentClassReference, position);
      this.childReferences = [];

      let list = Engine.Mapper.get(this.name);
      if (list) {
        let self = this;
        list.forEach(function (child, index) {
          if (child.name != self.name) {
            let reference = new child(self);
            Engine.Active.push(reference);
            self.childReferences.push(reference);
          }
        });
      }
      // this.log('info', `${this.name} loaded`);
      if (callback) callback(this);
    }

    initialize(parentClassReference, position = 'last_after') {
      if (!parentClassReference || !parentClassReference.body) parentClassReference = Engine;
      this.parent = parentClassReference;

      if (!this.parent.head) {
        this.parent.head = CodeMaid.createDOM.Tree('header', { class: 'icon-list' });
        this.parent.body.before(this.parent.head);
      }

      this.body = CodeMaid.createDOM.Tree('section', {});
      this.label = CodeMaid.createDOM.Tree('label', { for: this.uid, class: 'icon', title: this.name }, [this.icon]);
      this.input = CodeMaid.createDOM.Tree('input', {
        id: this.uid,
        type: 'radio',
        name: this.parent.name,
        hidden: true,
      });
      this.summary = CodeMaid.createDOM.Tree('summary', {}, [this.name]);
      this.details = CodeMaid.createDOM.Tree('details', { open: true }, [this.summary, this.body]);

      if (this.parent.head.firstChild) {
        switch (position) {
          case 'first_before':
            this.parent.head.firstChild.before(this.label);
            break;
          case 'first_after':
            this.parent.head.firstChild.after(this.label);
            break;
          case 'last_before':
            this.parent.head.lastChild.before(this.label);
            break;
          case 'last_after':
            this.parent.head.lastChild.after(this.label);
            break;

          default:
            break;
        }
      } else {
        this.parent.head.append(this.label);
      }
      this.parent.body.append(this.input);
      this.parent.body.append(this.details);
    }

    destroy() {
      this.label.remove();
      this.input.remove();
      this.body.remove();
      this.summary.remove();
      this.details.remove();
      delete this;
    }

    setIcon(icon) {
      this.icon = icon;
      this.label.childNodes.forEach((n) => n.remove());
      if (typeof icon == 'string') this.label.innerHTML = icon;
      else this.label.append(icon);
    }

    log(level, message) {
      Cheat.log(level, message);
    }
  }

  let Engine = {
    icon: '🎮',
    name: 'Engine',
    head: CodeMaid.createDOM.Tree('header', { class: 'icon-list' }),
    body: CodeMaid.createDOM.Tree('section', {}),
    chatbox: document.getElementById('chatbox_messages'),
    Mapper: new Map(),
    Active: [],
    initialize: function () {
      let active = false;
      let summary = CodeMaid.createDOM.Tree('summary', { class: 'btn btn-block btn-outline-primary' }, [Engine.name]);
      let target = document.getElementById('accountbox');
      target.after(CodeMaid.createDOM.Tree('details', { id: Engine.icon }, [summary, Engine.head, Engine.body]));
      target.after(CodeMaid.createDOM.Tree('hr'));
      loadExternals();

      Cheat.Engine = Engine;

      summary.addEventListener('click', function () {
        if (active) return;
        active = true;
        console.clear();
        if (Engine.Mapper.get('main')) {
          Engine.Mapper.get('main').forEach(function (child, index) {
            Engine.Active.push(new child(Engine));
          });
        }
      });
    },
  };

  function logLevel(level) {
    let error = [5, 'err', 'error', 'danger', 'red'];
    let warning = [4, 'warn', 'warning', 'yellow'];
    let info = [3, 'help', 'info', 'blue'];
    let success = [2, 'ok', 'success', 'green'];
    let log = [0, 'log', 'normal', 'mute'];
    let debug = [1, 'debug', 'trace', 'purple'];

    if (error.includes(level)) {
      return '#dc3545';
    }
    if (warning.includes(level)) {
      return '#ffc107';
    }
    if (info.includes(level)) {
      return '#17a2b8';
    }
    if (success.includes(level)) {
      return '#28a745';
    }
    if (log.includes(level)) {
      return '#6c757d';
    }
    if (debug.includes(level)) {
    }

    return;
  }

  function loadExternals() {
    let ChromaJS = CodeMaid.createDOM.Tree('script', {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js',
    });
    let myStyleSheet = CodeMaid.createDOM.Tree('style', {}, [
      `body * {margin: 0; padding: 0; box-sizing: border-box; line-height: inherit;}`,
      `#${Engine.icon} {--CE-bg_color: var(--light); --CE-color: var(--dark);}`,
      `#${Engine.icon} {z-index: 999; background-color: var(--CE-bg_color); border: var(--CE-color) 1px solid; border-radius: .25rem;}`,
      `#${Engine.icon} .icon-list {display: flex; flex-flow: wrap;}`,
      `#${Engine.icon} .nowrap {overflow-x: scroll; padding-bottom: 12px; flex-flow: nowrap;}`,
      `#${Engine.icon} .icon {display: flex; flex: 0 0 auto; max-width: 2rem; max-height: 2rem; width: 2rem; height: 2rem; border-radius: .25rem; border: 1px solid var(--gray);}`,
      `#${Engine.icon} .icon > * {margin: auto; text-align: center; max-height: 100%; max-width: 100%;}`,
      `#${Engine.icon} .ce_row {display: flex; width: 100%;}`,
      `#${Engine.icon} .ce_row > * {width: 100%;}`,
      `#${Engine.icon} .btn {padding: 0;}`,
      `#${Engine.icon} .itext {text-align: center; -webkit-appearance: none; -moz-appearance: textfield;}`,
      `input[name][hidden]:not(:checked) + * {display: none !important;}`,
      `hr {margin: 5px 0;}`,
      `.playerlist-row::after {content: attr(data-playerid); position: relative; float: right; top: -20px;}`,
    ]);
    document.head.append(myStyleSheet);
    document.head.append(ChromaJS);
  }

  scope[Engine.icon] = Engine;
  scope['📦'] = Cheat;

  Engine.initialize();
})(globalThis);
