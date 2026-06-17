// ==UserScript==
// @name          Drawaria.Modded - BotClientInterface
// @namespace     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version       1.0.0
// @description   Manage your bots with an UserInterface
// @author        ≺ᴄᴜʙᴇ³≻
// @match         https://*.drawaria.online/
// @match         https://*.drawaria.online/room/*
// @icon64        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant         none
// @license       GNU GPLv3
// @run-at        document-idle
// ==/UserScript==

(function (identifier) {
  const Addon = globalThis[identifier].Addon;
  const BotClient = Addon.locate('BotClient');
  var helper = globalThis['#tools'];

  let clones = 1;

  class BotClientInterface extends Addon {
    static dummy = Addon.register('BotClientInterface', this);
    static dummy = Addon.bind('Engine', this);
    static dummy = Addon.bind('Engine', this);

    constructor() {
      let icon = helper.interface.buildTree('img', { url: '' });
      super(icon);
      this.avatar = icon;
      this.botClient = new BotClient('', ['', '']);
      this.init();
    }

    init() {
      this.#row1();
      this.setName('Bot' + clones++);
      this.setAvatar(['../../favicon.ico?', '']);
    }

    #row1() {
      const localThis = this;
      let row = helper.interface.buildRow();
      {
        let join_button = helper.interface.buildButton('Enter');
        let leave_button = helper.interface.buildButton('Leave');

        join_button.onclick = function (event) {
          localThis.botClient.enterRoom(document.querySelector('#invurl').value);
        };

        leave_button.onclick = function (event) {
          localThis.botClient.disconnect();
        };

        row.appendAll(join_button, leave_button);
      }
      this.elements.section.append(row);
    }
    setName(botName = '') {
      this.botClient.name = botName;
      this.overwriteTitle(botName);
    }
    setAvatar(botAvatar = []) {
      this.botClient.avatar = botAvatar;
      let img = helper.interface.buildTree('img', { src: parseAvatarURL(botAvatar) });
      this.overwriteLabelImage(img);
    }
  }

  function getMyId() {
    return document.querySelector('.playerlist-name-self')?.parentElement.dataset.playerid || 0;
  }

  function parseAvatarURL(arr = []) {
    return `https://drawaria.online/avatar/cache/${arr.length > 0 ? arr.join('.') : 'default'}.jpg`;
  }
})('CubeEngine');
