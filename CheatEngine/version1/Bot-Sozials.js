// ==UserScript==
// @name         BotSozials
// @namespace    CheatEngine
// @version      1.0.0
// @description  Sozial interaction extension for Bots
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// @run-at       document-idle
// ==/UserScript==

(function (scope) {
  let helper = scope['CodeMaid'];
  // let Engine = scope['🎮'];
  let Cheat = scope['📦'];

  class BotSozials extends Cheat {
    static dummy = Cheat.bind(this, 'BotControls');

    constructor(parentClassReference) {
      super(parentClassReference);

      this.setIcon(helper.createDOM.FA('<i class="fas fa-hand-peace"></i>'));

      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
      this.#row3();
      this.#row4();
      this.#row5();
    }

    #row1() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // Send Message
        let messageClear_button = helper.createDOM.Button('<i class="fas fa-strikethrough"></i>');
        let messageSend_button = helper.createDOM.Button('<i class="fas fa-paper-plane"></i>');
        let message_input = helper.createDOM.Tree('input', { type: 'text', placeholder: 'message...' });

        messageClear_button.classList.add('icon');
        messageSend_button.classList.add('icon');

        messageClear_button.onclick = function (e) {
          message_input.value = '';
        };

        messageSend_button.onclick = function (e) {
          self.parent.bot.emit('chatmsg', message_input.value);
        };

        message_input.addEventListener('keypress', function (event) {
          if (event.keyCode != 13) return;
          self.parent.bot.emit('chatmsg', message_input.value);
        });

        row.appendAll(messageClear_button, message_input, messageSend_button);
      }
      this.body.append(row);
    }

    #row2() {
      let self = this;
      let row = helper.createDOM.RowList();
      row.classList.add('nowrap');
      {
        // Send Gesture
        document
          .querySelectorAll('#gesturespickerselector .gesturespicker-container .gesturespicker-item')
          .forEach(function (node, index) {
            let clone = node.cloneNode(true);
            clone.classList.add('icon');
            clone.addEventListener('click', function (event) {
              self.parent.bot.emit('sendgesture', index);
            });
            row.append(clone);
          });
      }
      this.body.append(row);
    }

    #row3() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // Set Status
        let toggleStatus_button = helper.createDOM.Button('Toggle');
        toggleStatus_button.addEventListener('click', function () {
          self.parent.bot.attributes.status = !self.parent.bot.attributes.status;
          toggleStatus_button.classList[self.parent.bot.attributes.status ? 'add' : 'remove']('active');
          self.parent.bot.emit('setstatusflag', 0, self.parent.bot.attributes.status);
          self.parent.bot.emit('setstatusflag', 1, self.parent.bot.attributes.status);
          self.parent.bot.emit('setstatusflag', 2, self.parent.bot.attributes.status);
          self.parent.bot.emit('setstatusflag', 3, self.parent.bot.attributes.status);
          self.parent.bot.emit('setstatusflag', 4, self.parent.bot.attributes.status);
        });
        row.append(toggleStatus_button);
      }
      this.body.append(row);
    }

    #row4() {
      let self = this;
      let row = helper.createDOM.RowList();
      row.classList.add('nowrap');
      {
        // Send Token
        let listOfTokens = [
          '<i class="fas fa-thumbs-up"></i>',
          '<i class="fas fa-heart"></i>',
          '<i class="fas fa-paint-brush"></i>',
          '<i class="fas fa-cocktail"></i>',
          '<i class="fas fa-hand-peace"></i>',
          '<i class="fas fa-feather-alt"></i>',
          '<i class="fas fa-trophy"></i>',
          '<i class="fas fa-mug-hot"></i>',
          '<i class="fas fa-gift"></i>',
        ];
        listOfTokens.forEach(function (token, index) {
          let tokenSend_button = helper.createDOM.Button(token);
          tokenSend_button.classList.add('icon');
          tokenSend_button.addEventListener('click', function () {
            self.parent.bot.room.players.forEach(function (player) {
              self.parent.bot.emit('settoken', player.id, index);
            });
          });
          row.append(tokenSend_button);
        });
      }
      this.body.append(row);
    }

    #row5() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // Spawn && Move Avatar
        let avatarPosition = { x: 0, y: 0 };

        let avatarSpawn_button = helper.createDOM.Button('<i class="fas fa-chalkboard-teacher"></i>');
        let avatarChange_button = helper.createDOM.Button('<i class="fas fa-retweet"></i>');
        let avatarPositionX_button = helper.createDOM.Tree('input', {
          type: 'number',
          value: 0,
          min: 1,
          max: 99,
        });
        let avatarPositionY_button = helper.createDOM.Tree('input', {
          type: 'number',
          value: 0,
          min: 1,
          max: 99,
        });

        avatarSpawn_button.addEventListener('click', function (event) {
          self.parent.bot.emit('spawnavatar');
          self.parent.bot.attributes.spawned = !self.parent.bot.attributes.spawned;
        });

        avatarChange_button.addEventListener('click', function (event) {
          self.parent.bot.emit('setavatarprop');
          self.parent.bot.attributes.rounded = !self.parent.bot.attributes.rounded;
        });

        avatarPositionX_button.addEventListener('change', function (event) {
          avatarPosition.x = avatarPositionX_button.value;
          self.parent.bot.emit('moveavatar', avatarPosition.x, avatarPosition.y);
        });

        avatarPositionY_button.addEventListener('change', function (event) {
          avatarPosition.y = avatarPositionY_button.value;
          self.parent.bot.emit('moveavatar', avatarPosition.x, avatarPosition.y);
        });

        row.appendAll(avatarSpawn_button, avatarPositionX_button, avatarPositionY_button, avatarChange_button);
      }
      this.body.append(row);
    }
  }
})(globalThis);
