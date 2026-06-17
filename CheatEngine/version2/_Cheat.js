// ==UserScript==
// @name         Cheat
// @namespace    https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version      1.0.0
// @description  A base Class for making Cheats for Drawaria.Online. Load first!
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/
// @match        https://*.drawaria.online/test
// @match        https://*.drawaria.online/room/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// ==/UserScript==

(function (scope) {
  const CodeMaid = scope['CodeMaid'];

  scope['sockets'] = [];
  const originalSend = WebSocket.prototype.send;
  WebSocket.prototype.send = function (...args) {
    let socket = this;
    if (scope['sockets'].indexOf(socket) === -1) {
      scope['sockets'].push(socket);
    }
    socket.addEventListener('close', function (...args2) {
      const pos = scope['sockets'].indexOf(socket);
      if (~pos) scope['sockets'].splice(pos, 1);
    });
    return originalSend.call(socket, ...args);
  };

  scope['giveTokken'] = function (tokkentype = 'mug-hot') {
    document.querySelectorAll('.playerlist-row').forEach((n) => {
      n.click();
    });
    document.querySelectorAll(`.fa-${tokkentype}`).forEach((n) => n.click());
  };

  let _storage = new Map();

  class Cheat {
    static set = function (parentName, child) {
      let children = Cheat.get(parentName) || [];
      children.owner = children.owner ? children.owner : { instances: [] };
      if (child) {
        if (typeof child == 'object') {
          children.owner.instances.push(child);
        } else if (child.name == parentName) {
          children.owner.class = child;
        } else children.push(child);
      }
      _storage.set(parentName, children);
      return CodeMaid.generate.uuidv4();
    };
    static get = function (parentName) {
      if (!parentName) return _storage;
      return _storage.get(parentName) || [];
    };
    static log = function (level, message, moduleName = 'Cheat') {
      if (typeof message != 'string') {
        try {
          message = JSON.stringify(message);
        } catch (error) {
          throw error;
        }
      }

      let color = '';
      if ([5, 'err', 'error', 'danger', 'red'].includes(level)) {
        color = '#dc3545';
      } else if ([4, 'warn', 'warning', 'yellow'].includes(level)) {
        color = '#ffc107';
      } else if ([3, 'help', 'info', 'blue'].includes(level)) {
        color = '#17a2b8';
      } else if ([2, 'ok', 'success', 'green'].includes(level)) {
        color = '#28a745';
      } else if ([1, 'log', 'normal', 'mute'].includes(level)) {
        color = '#6c757d';
      } else if ([0, 'debug', 'trace', 'purple'].includes(level)) {
        color = 'purple';
      }

      console.log(`%c${moduleName}: ${message}`, `color: ${color}`);
      let chatmessage = CodeMaid.createDOM.Tree(
        'div',
        { class: `chatmessage systemchatmessage7`, 'data-ts': Date.now(), style: `color: ${color}` },
        [moduleName, ': ', message]
      );
      document.getElementById('chatbox_messages').append(chatmessage);
    };

    constructor() {
      this.name = this.constructor.name;
      this.modules = [];
      this.uuid = Cheat.set(this.name, this);
      this.elements = Build(this.name);
      this.parent = { elements: Build() };
    }

    _initialize() {
      this.parent.elements.head.append(this.elements.label);
      this.parent.elements.body.append(this.elements.input);
      this.parent.elements.body.append(this.elements.details);
      this._loadModules();
    }

    _loadModules() {
      let self = this;
      let children = Cheat.get(this.name);
      children.forEach(function (child = Cheat) {
        if (child.name != self.name) {
          let instance = new child(self);
          instance.parent = self;
          instance._initialize();
          instance.elements.input.name = instance.parent.name || 'Engine';
          self.modules.push(instance);
        }
      });
    }

    log(level, message) {
      Cheat.log(level, message, this.name);
    }
  }

  let inputs = [];

  function Build(title) {
    let id = CodeMaid.generate.uuidv4();

    let label = CodeMaid.createDOM.Tree('label', { for: id, class: 'icon', title: title });
    let input = CodeMaid.createDOM.Tree('input', { type: 'checkbox', id: id, hidden: true });

    let details = CodeMaid.createDOM.Tree('details', { open: true });
    let summary = CodeMaid.createDOM.Tree('summary', { class: 'noselect' }, [title]);
    let head = CodeMaid.createDOM.Tree('header', { class: 'icon-list' });
    let body = CodeMaid.createDOM.Tree('section');

    details.append(summary);
    details.append(head);
    details.append(body);

    inputs.push(input);

    input.addEventListener('change', function (event) {
      if (input.type == 'radio')
        document.querySelectorAll(`input[name="${input.name}"]`).forEach(function (nameInput) {
          document.querySelectorAll(`label[for="${nameInput.id}"]`)[0].classList['remove']('bg-warning');
        });
      document
        .querySelectorAll(`label[for="${input.id}"]`)[0]
        .classList[input.checked ? 'add' : 'remove']('bg-warning');
    });

    return { details, summary, head, body, label, input };
  }

  scope['___cheat'] = Cheat;
})(globalThis);
