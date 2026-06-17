// ==UserScript==
// @name         Bot - Interactions
// @namespace    CheatEngine
// @version      2.0.0
// @description  All known Interactions!
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

      this.setIcon(helper.createDOM.FA('<i class="fa-duotone fa-icons"></i>'));
    }
  }

  class Chat extends Cheat {
    static dummy = Cheat.bind(this, 'BotSozials');

    constructor(parentClassReference) {
      super(parentClassReference);

      this.setIcon(helper.createDOM.FA('<i class="fa-duotone fa-message"></i>'));

      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
    }
    emit(event) {
      let data = Array.from(arguments);
      this.parent.parent.bot.send(`${42}${JSON.stringify(data)}`);
    }
    #row1() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        let messageClear_button = helper.createDOM.Button('<i class="fa-duotone fa-text-slash"></i>');
        let messageSend_button = helper.createDOM.Button('<i class="fa-duotone fa-paper-plane"></i>');
        let message_input = helper.createDOM.Tree('input', { type: 'text', placeholder: 'message...' });

        messageClear_button.classList.add('icon');
        messageSend_button.classList.add('icon');

        messageClear_button.onclick = function (e) {
          message_input.value = '';
        };

        messageSend_button.onclick = function (e) {
          self.emit('chatmsg', message_input.value);
        };

        message_input.addEventListener('keypress', function (event) {
          if (event.keyCode != 13) return;
          self.emit('chatmsg', message_input.value);
        });

        row.appendAll(messageClear_button, message_input, messageSend_button);
      }
      this.body.append(row);
    }
    #row2() {
      let self = this;
      let row = helper.createDOM.RowList();
      // row.classList.add('nowrap');
      {
        document
          .querySelectorAll('#gesturespickerselector .gesturespicker-container .gesturespicker-item')
          .forEach(function (node, index) {
            let clone = node.cloneNode(true);
            clone.classList.add('icon');
            clone.addEventListener('click', function (event) {
              self.emit('sendgesture', index);
            });
            row.append(clone);
          });
      }
      this.body.append(row);
    }
  }

  class Tokken extends Cheat {
    static dummy = Cheat.bind(this, 'BotSozials');

    constructor(parentClassReference) {
      super(parentClassReference);

      this.setIcon(helper.createDOM.FA('<i class="fa-duotone fa-mug-hot"></i>'));

      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
    }
    emit(event) {
      let data = Array.from(arguments);
      this.parent.parent.bot.send(`${42}${JSON.stringify(data)}`);
    }
    #row1() {
      let self = this;
      let row = helper.createDOM.RowList();
      // row.classList.add('nowrap');
      {
        let listOfTokens = [
          '<i class="fa-duotone fa-thumbs-up"></i>',
          '<i class="fa-duotone fa-heart"></i>',
          '<i class="fa-duotone fa-paintbrush-fine"></i>',
          '<i class="fa-duotone fa-martini-glass-citrus"></i>',
          '<i class="fa-duotone fa-hand-peace"></i>',
          '<i class="fa-duotone fa-leaf"></i>',
          '<i class="fa-duotone fa-trophy"></i>',
          '<i class="fa-duotone fa-mug-hot"></i>',
          '<i class="fa-duotone fa-gift"></i>',
        ];
        listOfTokens.forEach(function (token, index) {
          let tokenSend_button = helper.createDOM.Button(token);
          tokenSend_button.classList.add('icon');
          tokenSend_button.addEventListener('click', function () {
            self.parent.parent.bot.room.players.forEach(function (player) {
              self.emit('clientcmd', 2, [player.id, index]);
            });
          });
          row.append(tokenSend_button);
        });
      }
      this.body.append(row);
    }
    #row2() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        let toggleStatus_button = helper.createDOM.Button('Toggle');
        toggleStatus_button.addEventListener('click', function () {
          self.parent.parent.bot.attributes.status = !self.parent.parent.bot.attributes.status;
          let status = self.parent.parent.bot.attributes.status;
          toggleStatus_button.classList[status ? 'add' : 'remove']('active');
          self.emit('clientcmd', 3, [0, status]);
          self.emit('clientcmd', 3, [1, status]);
          self.emit('clientcmd', 3, [2, status]);
          self.emit('clientcmd', 3, [3, status]);
          self.emit('clientcmd', 3, [4, status]);
        });
        row.append(toggleStatus_button);
      }
      this.body.append(row);
    }
  }

  class Avatar extends Cheat {
    static dummy = Cheat.bind(this, 'BotSozials');

    constructor(parentClassReference) {
      super(parentClassReference);

      this.setIcon(helper.createDOM.FA('<i class="fa-duotone fa-face-dotted"></i>'));

      this.init();
    }

    init() {
      this.#row1();
    }
    emit(event) {
      let data = Array.from(arguments);
      this.parent.parent.bot.send(`${42}${JSON.stringify(data)}`);
    }
    #row1() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // Spawn && Move Avatar
        let avatarPosition = { x: 0, y: 0 };

        let avatarSpawn_button = helper.createDOM.Button('<i class="fa-duotone fa-arrow-up-from-square"></i>');
        let avatarChange_button = helper.createDOM.Button('<i class="fa-duotone fa-arrows-retweet"></i>');
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
          self.emit('clientcmd', 101);
          self.parent.parent.bot.attributes.spawned = !self.parent.parent.bot.attributes.spawned;
        });

        avatarChange_button.addEventListener('click', function (event) {
          self.emit('clientcmd', 115);
          self.parent.parent.bot.attributes.rounded = !self.parent.parent.bot.attributes.rounded;
        });

        avatarPositionX_button.addEventListener('change', function (event) {
          avatarPosition.x = avatarPositionX_button.value;
          self.emit('clientcmd', 103, [
            1e4 * Math.floor((avatarPosition.x / 100) * 1e4) + Math.floor((avatarPosition.y / 100) * 1e4),
            false,
          ]);
        });

        avatarPositionY_button.addEventListener('change', function (event) {
          avatarPosition.y = avatarPositionY_button.value;
          self.emit('clientcmd', 103, [
            1e4 * Math.floor((avatarPosition.x / 100) * 1e4) + Math.floor((avatarPosition.y / 100) * 1e4),
            false,
          ]);
        });

        row.appendAll(avatarSpawn_button, avatarPositionX_button, avatarPositionY_button, avatarChange_button);
      }
      this.body.append(row);
    }
  }

  class Voter extends Cheat {
    static dummy = Cheat.bind(this, 'BotSozials');

    constructor(parentClassReference) {
      super(parentClassReference);

      this.setIcon(helper.createDOM.FA('<i class="fa-duotone fa-square-quote"></i>'));

      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
      this.#row3();
      this.#row4();
      this.#row5();
      this.#row6();
      this.#row7();
    }
    emit(event) {
      let data = Array.from(arguments);
      this.parent.parent.bot.send(`${42}${JSON.stringify(data)}`);
    }
    #row1() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // vote reset canvas
        let resetCanvas_button = helper.createDOM.Button('Reset Canvas');
        resetCanvas_button.addEventListener('click', function () {
          self.emit('sendvote');
        });
        row.append(resetCanvas_button);
      }
      this.body.append(row);
    }
    #row2() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // vote rollback canvas
        let rollbackCanvas_button = helper.createDOM.Button('Rollback Canvas');
        rollbackCanvas_button.addEventListener('click', function () {
          self.emit('clientcmd', 320);
        });
        row.append(rollbackCanvas_button);
      }
      this.body.append(row);
    }
    #row3() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // vote forward track
        let forwardTrack_button = helper.createDOM.Button('Forward Song');
        forwardTrack_button.addEventListener('click', function () {
          self.emit('clientcmd', 321);
        });
        row.append(forwardTrack_button);
      }
      this.body.append(row);
    }
    #row4() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // vote allow draw
        let playerId_input = helper.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: getMyId(),
        });
        let voteAllowDraw_button = helper.createDOM.Button('Vote allow Draw');
        voteAllowDraw_button.addEventListener('click', function () {
          self.emit('pgdrawvote', playerId_input.value, 0);
        });
        row.appendAll(playerId_input, voteAllowDraw_button);
      }
      this.body.append(row);
    }
    #row5() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // vote kick
        let playerId_input = helper.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: getMyId(),
        });
        let voteKick_button = helper.createDOM.Button('Vote Kick');
        voteKick_button.addEventListener('click', function () {
          self.emit('sendvotekick', playerId_input.value);
        });
        row.appendAll(playerId_input, voteKick_button);
      }
      this.body.append(row);
    }
    #row6() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // vote track
        let trackId_input = helper.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: getMyId(),
        });
        let voteTrack_button = helper.createDOM.Button('Vote Song');
        voteTrack_button.addEventListener('click', function () {
          self.emit('clientcmd', trackId_input.value);
        });
        row.appendAll(trackId_input, voteTrack_button);
      }
      this.body.append(row);
    }
    #row7() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // vote custom?
        let anyId_input = helper.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          value: getMyId(),
        });
        let customVote_button = helper.createDOM.Button('No clue man');
        customVote_button.addEventListener('click', function () {
          self.emit('clientcmd', 301, [anyId_input.value]);
        });
        row.append(anyId_input, customVote_button);
      }
      this.body.append(row);
    }
  }

  class GuessWord extends Cheat {
    static dummy = Cheat.bind(this, 'BotSozials');

    constructor(parentClassReference) {
      super(parentClassReference);

      this.setIcon(helper.createDOM.FA('<i class="fa-duotone fa-file-word"></i>'));

      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
    }
    emit(event) {
      let data = Array.from(arguments);
      this.parent.parent.bot.send(`${42}${JSON.stringify(data)}`);
    }
    #row1() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        let afk_button = helper.createDOM.Button('AFK');
        afk_button.addEventListener('click', function () {
          self.emit('playerafk');
        });
        let passTurn_button = helper.createDOM.Button('Pass');
        passTurn_button.addEventListener('click', function () {
          self.emit('passturn');
        });
        let rateImage_button = helper.createDOM.Button('Rate');
        rateImage_button.addEventListener('click', function () {
          self.emit('playerrated');
        });
        row.appendAll(afk_button, passTurn_button, rateImage_button);
      }
      this.body.append(row);
    }
    #row2() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        let wordId_input = helper.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          max: 3,
          value: getMyId(),
        });
        let voteWord_button = helper.createDOM.Button('Select Word');
        voteWord_button.addEventListener('click', function () {
          self.emit('wordselected', wordId_input.value);
        });
        row.appendAll(wordId_input, voteWord_button);
      }
      this.body.append(row);
    }
  }

  class Stencils extends Cheat {
    static dummy = Cheat.bind(this, 'BotSozials');

    constructor(parentClassReference) {
      super(parentClassReference);

      this.setIcon(helper.createDOM.FA('<i class="fa-duotone fa-note-sticky"></i>'));

      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
      this.#row3();
      // this.#row4();
    }
    emit(event) {
      let data = Array.from(arguments);
      this.parent.parent.bot.send(`${42}${JSON.stringify(data)}`);
    }
    #row1() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // get inventory
        let getinventory_button = helper.createDOM.Button('Load Inventory');
        getinventory_button.addEventListener('click', function () {
          self.emit('clientcmd', 10, [true]);
        });
        row.append(getinventory_button);
      }
      this.body.append(row);
    }
    #row2() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // buy item
        let itemId_input = helper.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: 0,
        });
        let buyItem_button = helper.createDOM.Button('Buy Item');
        let activateItem_button = helper.createDOM.Button('Use Item');
        buyItem_button.addEventListener('click', function () {
          self.emit('clientcmd', 11, [itemId_input.value]);
        });
        activateItem_button.addEventListener('click', function () {
          self.emit('clientcmd', 12, [itemId_input.value, !0]);
        });
        row.appendAll(itemId_input, buyItem_button, activateItem_button);
      }
      this.body.append(row);
    }
    #row3() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        // change attributes
        let itemId_input = helper.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: 0,
        });
        let modifyTarget_select = helper.createDOM.Tree('select', {}, [
          helper.createDOM.Tree('option', { value: 'zindex' }, ['Layer']),
          helper.createDOM.Tree('option', { value: 'shared' }, ['Share']),
        ]);
        let modifyValue_input = helper.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: 0,
        });
        let modifyItem_button = helper.createDOM.Button('<i class="fa-duotone fa-paper-plane"></i>');

        modifyItem_button.classList.add('icon');
        modifyItem_button.addEventListener('click', function () {
          self.emit('clientcmd', 234, [itemId_input.value, modifyTarget_select.value, modifyValue_input.value]);
        });
        row.appendAll(itemId_input, modifyTarget_select, modifyValue_input, modifyItem_button);
      }
      this.body.appendAll(row);
    }
  }

  function getMyId() {
    return document.querySelector('.playerlist-name-self')?.parentElement.dataset.playerid || 0;
  }
})(globalThis);
