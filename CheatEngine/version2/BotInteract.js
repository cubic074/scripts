// ==UserScript==
// @name         Bot - Interact
// @namespace    https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version      1.0.0
// @description  All known Interactions!
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

  class Player extends Cheat {
    static dummy = Cheat.set('BotControls', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-user"></i>';
      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
      this.#row3();
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      // Update Name and Avatar
      {
        const id = CodeMaid.generate.uuidv4();
        let change_avatar_label = CodeMaid.createDOM.Tree('label', { for: id, class: 'icon' }, [
          CodeMaid.createDOM.FA('<i class="fa-duotone fa-upload"></i>'),
        ]);
        let changeAvatar_input = CodeMaid.createDOM.Tree('input', { type: 'file', id: id, hidden: true });

        function onChange() {
          if (!this.files || !this.files[0]) return;
          let myFileReader = new FileReader();
          myFileReader.addEventListener('load', (e) => {
            let a = e.target.result.replace('image/gif', 'image/png');
            fetch('https://drawaria.online/uploadavatarimage', {
              method: 'POST',
              body: 'imagedata=' + encodeURIComponent(a) + '&fromeditor=true',
              headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
            }).then((res) =>
              res.text().then((body) => {
                self.parent.bot.avatar = body.split('.');
                self.parent.avatar.src = parseAvatarURL(self.parent.bot.avatar);
              })
            );
          });
          myFileReader.readAsDataURL(this.files[0]);
        }
        changeAvatar_input.addEventListener('change', onChange);

        let changeName_input = CodeMaid.createDOM.Tree('input', {
          type: 'text',
          value: self.parent.bot?.name || '',
          placeholder: 'Bot Name',
        });
        changeName_input.addEventListener('keypress', function (event) {
          if (event.keyCode != 13) return;
          self.parent.bot.name = changeName_input.value;
          self.parent.elements.label.title = changeName_input.value;
        });

        row.appendAll(change_avatar_label, changeAvatar_input, changeName_input);
      }
      self.elements.body.append(row);
    }
    #row2() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      // Connect
      {
        let connect_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-plug-circle-plus"></i>');
        connect_button.addEventListener('click', function (event) {
          self.parent.bot.connect();
        });
        row.append(connect_button);
      }
      // Disconnect
      {
        let disconnect_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-plug-circle-minus"></i>');
        disconnect_button.addEventListener('click', function (event) {
          self.parent.bot.disconnect();
        });
        row.append(disconnect_button);
      }
      // Delete
      {
        let delete_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-user-minus"></i>');
        delete_button.addEventListener('click', function (event) {
          self.parent.bot.socket?.close();
          delete self.parent.bot;
          self.parent.elements.label.remove();
          self.parent.elements.input.remove();
          self.parent.elements.details.remove();
        });
        row.append(delete_button);
      }
      self.elements.body.append(row);
    }
    #row3() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      // Create
      {
      }
      // Enter
      {
        let enterRoom_button = CodeMaid.createDOM.Button('Join');
        enterRoom_button.addEventListener('click', function (event) {
          self.parent.bot.enterRoom(document.querySelector('#invurl').value);
        });
        row.append(enterRoom_button);
      }
      // Switch
      {
        let switchRoom_button = CodeMaid.createDOM.Button('Next');
        switchRoom_button.addEventListener('click', function (event) {
          self.parent.bot.switchRoom();
        });
        row.append(switchRoom_button);
      }
      // Leave
      {
        let leaveRoom_button = CodeMaid.createDOM.Button('Exit');
        leaveRoom_button.addEventListener('click', function (event) {
          self.parent.bot.leaveRoom();
        });
        row.append(leaveRoom_button);
      }
      self.elements.body.append(row);
    }
  }

  class Sozials extends Cheat {
    static dummy = Cheat.set('BotControls', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-message"></i>';
      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        let messageClear_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-text-slash"></i>');
        let messageSend_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-paper-plane"></i>');
        let message_input = CodeMaid.createDOM.Tree('input', { type: 'text', placeholder: 'message...' });

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
      this.elements.body.append(row);
    }
    #row2() {
      let self = this;
      let row = CodeMaid.createDOM.RowList();
      // row.classList.add('nowrap');
      {
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
      this.elements.body.append(row);
    }
  }

  class Tokken extends Cheat {
    static dummy = Cheat.set('BotControls', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-mug-hot"></i>';
      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.RowList();
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
          let tokenSend_button = CodeMaid.createDOM.Button(token);
          tokenSend_button.classList.add('icon');
          tokenSend_button.addEventListener('click', function () {
            self.parent.bot.room.players.forEach(function (player) {
              self.parent.bot.emit('settoken', player.id, index);
            });
          });
          row.append(tokenSend_button);
        });
      }
      this.elements.body.append(row);
    }
    #row2() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        let toggleStatus_button = CodeMaid.createDOM.Button('Toggle');
        toggleStatus_button.addEventListener('click', function () {
          self.parent.bot.attributes.status = !self.parent.bot.attributes.status;
          let status = self.parent.bot.attributes.status;
          toggleStatus_button.classList[status ? 'add' : 'remove']('active');
          self.parent.bot.emit('setstatusflag', 0, status);
          self.parent.bot.emit('setstatusflag', 1, status);
          self.parent.bot.emit('setstatusflag', 2, status);
          self.parent.bot.emit('setstatusflag', 3, status);
          self.parent.bot.emit('setstatusflag', 4, status);
        });
        row.append(toggleStatus_button);
      }
      this.elements.body.append(row);
    }
  }

  class Avatar extends Cheat {
    static dummy = Cheat.set('BotControls', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-arrows-up-down-left-right"></i>';
      this.init();
    }

    init() {
      this.#row1();
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // Spawn && Move Avatar
        let avatarPosition = { x: 50, y: 50 };

        let avatarSpawn_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-arrow-up-from-square"></i>');
        let avatarChange_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-arrows-retweet"></i>');
        let avatarPositionX_button = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          value: 50,
          min: 2,
          max: 98,
        });
        let avatarPositionY_button = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          value: 50,
          min: 2,
          max: 98,
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
      this.elements.body.append(row);
    }
  }

  class Canvas extends Cheat {
    static dummy = Cheat.set('BotControls', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-browser"></i>';
      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
      this.#row3();
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // vote reset canvas
        let resetCanvas_button = CodeMaid.createDOM.Button('Reset');
        resetCanvas_button.addEventListener('click', function () {
          self.parent.bot.emit('sendvote');
        });
        row.append(resetCanvas_button);
      }
      {
        // vote rollback canvas
        let rollbackCanvas_button = CodeMaid.createDOM.Button('Rollback');
        rollbackCanvas_button.addEventListener('click', function () {
          self.parent.bot.emit('startrollbackvoting');
        });
        row.append(rollbackCanvas_button);
      }
      this.elements.body.append(row);
    }
    #row2() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // vote allow draw
        let playerId_input = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          title: 'Player ID',
          min: 0,
          value: getMyId(),
        });
        let voteAllowDraw_button = CodeMaid.createDOM.Button('Vote Draw Allow');
        voteAllowDraw_button.addEventListener('click', function () {
          self.parent.bot.emit('pgdrawvote', playerId_input.value);
        });
        row.appendAll(playerId_input, voteAllowDraw_button);
      }
      this.elements.body.append(row);
    }
    #row3() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // vote kick
        let playerId_input = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          title: 'Player ID',
          min: 0,
          value: getMyId(),
        });
        let voteKick_button = CodeMaid.createDOM.Button('Vote Kick');
        voteKick_button.addEventListener('click', function () {
          self.parent.bot.emit('sendvotekick', playerId_input.value);
        });
        row.appendAll(playerId_input, voteKick_button);
      }
      this.elements.body.append(row);
    }
  }

  class Music extends Cheat {
    static dummy = Cheat.set('BotControls', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-play-pause"></i>';
      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
      // this.#row3(); // unknown
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // vote forward track
        let forwardTrack_button = CodeMaid.createDOM.Button('Forward Song');
        forwardTrack_button.addEventListener('click', function () {
          self.parent.bot.emit('trackforwardvoting');
        });
        row.append(forwardTrack_button);
      }
      this.elements.body.append(row);
    }
    #row2() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // vote track
        let trackId_input = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: getMyId(),
        });
        let voteTrack_button = CodeMaid.createDOM.Button('Add Song');
        voteTrack_button.addEventListener('click', function () {
          self.parent.bot.emit('votetrack', trackId_input.value);
        });
        row.appendAll(trackId_input, voteTrack_button);
      }
      this.elements.body.append(row);
    }
    #row3() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // vote custom?
        let anyId_input = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          value: getMyId(),
        });
        let customVote_button = CodeMaid.createDOM.Button('No clue man');
        customVote_button.addEventListener('click', function () {
          self.parent.bot.emit('votetrack', anyId_input.value);
        });
        row.append(anyId_input, customVote_button);
      }
      this.elements.body.append(row);
    }
  }

  class GuessWord extends Cheat {
    static dummy = Cheat.set('BotControls', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-book"></i>';
      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        let afk_button = CodeMaid.createDOM.Button('AFK');
        afk_button.addEventListener('click', function () {
          self.parent.bot.emit('playerafk');
        });
        let passTurn_button = CodeMaid.createDOM.Button('Pass');
        passTurn_button.addEventListener('click', function () {
          self.parent.bot.emit('passturn');
        });
        let rateImage_button = CodeMaid.createDOM.Button('Rate');
        rateImage_button.addEventListener('click', function () {
          self.parent.bot.emit('playerrated');
        });
        row.appendAll(afk_button, passTurn_button, rateImage_button);
      }
      this.elements.body.append(row);
    }
    #row2() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        let wordId_input = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          max: 3,
          value: getMyId(),
        });
        let voteWord_button = CodeMaid.createDOM.Button('Select Word');
        voteWord_button.addEventListener('click', function () {
          self.parent.bot.emit('wordselected', wordId_input.value);
        });
        row.appendAll(wordId_input, voteWord_button);
      }
      this.elements.body.append(row);
    }
  }

  class Stencils extends Cheat {
    // static dummy = Cheat.set('BotControls', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-stamp"></i>';
      this.init();
    }

    init() {
      this.#row1();
      this.#row2();
      this.#row3();
      // this.#row4();
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // get inventory
        let getinventory_button = CodeMaid.createDOM.Button('Load Inventory');
        getinventory_button.addEventListener('click', function () {
          self.parent.bot.emit('getinventory');
        });
        row.append(getinventory_button);
      }
      this.elements.body.append(row);
    }
    #row2() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // buy item
        let itemId_input = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: 0,
        });
        let buyItem_button = CodeMaid.createDOM.Button('Buy Item');
        let activateItem_button = CodeMaid.createDOM.Button('Use Item');
        buyItem_button.addEventListener('click', function () {
          self.parent.bot.emit('buyitem', itemId_input.value);
        });
        activateItem_button.addEventListener('click', function () {
          self.parent.bot.emit('activateitem', itemId_input.value, !0);
        });
        row.appendAll(itemId_input, buyItem_button, activateItem_button);
      }
      this.elements.body.append(row);
    }
    #row3() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        // change attributes
        let itemId_input = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: 0,
        });
        let modifyTarget_select = CodeMaid.createDOM.Tree('select', {}, [
          CodeMaid.createDOM.Tree('option', { value: 'zindex' }, ['Layer']),
          CodeMaid.createDOM.Tree('option', { value: 'shared' }, ['Share']),
        ]);
        let modifyValue_input = CodeMaid.createDOM.Tree('input', {
          type: 'number',
          class: 'itext icon',
          min: 0,
          value: 0,
        });
        let modifyItem_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-paper-plane"></i>');

        modifyItem_button.classList.add('icon');
        modifyItem_button.addEventListener('click', function () {
          self.parent.bot.emit(
            'canvasobj_changeattr',
            itemId_input.value,
            modifyTarget_select.value,
            modifyValue_input.value
          );
        });
        row.appendAll(itemId_input, modifyTarget_select, modifyValue_input, modifyItem_button);
      }
      this.elements.body.appendAll(row);
    }
  }

  function getMyId() {
    return document.querySelector('.playerlist-name-self')?.parentElement.dataset.playerid || 0;
  }

  function parseAvatarURL(arr = []) {
    return `https://drawaria.online/avatar/cache/${arr.length > 0 ? arr.join('.') : 'default'}.jpg`;
  }
})(globalThis);
