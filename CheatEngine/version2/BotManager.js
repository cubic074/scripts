// ==UserScript==
// @name         Bot - Manager
// @namespace    https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version      1.0.0
// @description  Manage your Bots
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/
// @match        https://*.drawaria.online/test
// @match        https://*.drawaria.online/room/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// @run-at       document-idle
// ==/UserScript==

(function (scope) {
  const CodeMaid = scope['CodeMaid'];
  const Cheat = scope['___cheat'];

  class BotManager extends Cheat {
    static dummy = Cheat.set('Engine', this);
    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-users"></i>';
      this.loadModules = this._loadModules;
      this._loadModules = function () {};
      this.init();
    }

    init() {
      let self = this;
      let enableButton = CodeMaid.createDOM.Button('<i class="fa-duotone fa-plus"></i>');
      enableButton.classList.add('icon');
      enableButton.addEventListener('click', function () {
        self.loadModules();
      });
      this.elements.head.append(enableButton);
    }
  }

  const Bot = Cheat.get('Bot').owner?.class;
  if (!Bot) throw new Error('get Class: "Bot" not found');

  class BotControls extends Cheat {
    static dummy = Cheat.set('BotManager', this);

    constructor() {
      super();
      this.bot = new Bot(getRandomString(12));
      this.avatar = CodeMaid.createDOM.Tree('img', { src: parseAvatarURL(this.bot.avatar) });
      this.elements.label.append(this.avatar);
      this.elements.label.title = this.bot.name;
      this.elements.input.type = 'radio';
    }
  }

  function getRandomChar(limit = 1000) {
    return String.fromCharCode(Math.floor(Math.random() * Math.random() * limit) * 20);
  }
  function getRandomString(length) {
    let chars = [];
    for (let index = 0; index < length; index++) {
      let char = getRandomChar(512);
      chars.push(char);
    }
    return chars.join('');
  }
  function parseAvatarURL(arr = []) {
    return `https://drawaria.online/avatar/cache/${arr.length > 0 ? arr.join('.') : 'default'}.jpg`;
  }
})(globalThis);
