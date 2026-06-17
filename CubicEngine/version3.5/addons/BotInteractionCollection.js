// ==UserScript==
// @name          Drawaria.Modded - BotInteractionCollection
// @namespace     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version       1.0.0
// @description   Interactions for all the bots you have!
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
  var helper = globalThis['#tools'];

  class BotPersonality extends Addon {
    static dummy = Addon.register('BotPersonality', this);
    static dummy = Addon.bind('BotClientInterface', this);

    constructor() {
      let icon = helper.interface.buildTree('i', { class: 'fas fa-user' });
      super(icon);
      this.#init();
    }

    #init() {
      this.overwriteTitle('Personality');
      this.#row1();
      this.#row2();
    }

    #row1() {
      const localThis = this;
      let row = helper.interface.buildRow();
      {
        let botName = helper.interface.buildTree('input', { type: 'text', placeholder: 'Your Bots name' });
        let botNameAccept = helper.interface.buildTree('button', { class: 'icon' }, [
          helper.interface.buildTree('i', { class: 'fas fa-check' }),
        ]);

        botNameAccept.onclick = function (event) {
          localThis.loadedBy.setName(botName.value);
        };

        row.appendAll(botName, botNameAccept);
      }
      this.elements.section.append(row);
    }

    #row2() {
      const localThis = this;
      let id = helper.generate.uuidv4();
      let row = helper.interface.buildRow();
      {
        let botAvatarUpload = helper.interface.buildTree('input', { type: 'file', id: id, hidden: true });
        let botAvatarAccept = helper.interface.buildTree('label', { for: id, class: 'btn btn-outline-secondary' }, [
          'Upload BotAvatar',
        ]);

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
                localThis.loadedBy.setAvatar(body.split('.'));
              })
            );
          });
          myFileReader.readAsDataURL(this.files[0]);
        }
        botAvatarUpload.addEventListener('change', onChange);

        row.appendAll(botAvatarUpload, botAvatarAccept);
      }
      this.elements.section.append(row);
    }
  }

  class BotSozials extends Addon {
    static dummy = Addon.register('BotSozials', this);
    static dummy = Addon.bind('BotClientInterface', this);

    constructor() {
      let icon = helper.interface.buildTree('i', { class: 'fas fa-hand-peace' });
      super(icon);
      this.#init();
    }

    #init() {
      this.overwriteTitle('Sozials');
      this.#row1();
      this.#row2();
    }

    #row1() {
      let localThis = this;
      let row = helper.interface.buildRow();
      {
        let messageClear_button = helper.interface.buildButton('<i class="fas fa-strikethrough"></i>');
        let messageSend_button = helper.interface.buildButton('<i class="fas fa-paper-plane"></i>');
        let message_input = helper.interface.buildTree('input', { type: 'text', placeholder: 'message...' });

        messageClear_button.classList.add('icon');
        messageSend_button.classList.add('icon');

        messageClear_button.onclick = function (e) {
          message_input.value = '';
        };

        messageSend_button.onclick = function (e) {
          localThis.loadedBy.botClient.emit('chatmsg', message_input.value);
        };

        message_input.addEventListener('keypress', function (event) {
          if (event.keyCode != 13) return;
          localThis.loadedBy.botClient.emit('chatmsg', message_input.value);
        });

        row.appendAll(messageClear_button, message_input, messageSend_button);
      }
      this.elements.section.append(row);
    }

    #row2() {
      let localThis = this;
      let row = helper.interface.buildIconList();
      // row.classList.add('nowrap');
      {
        document
          .querySelectorAll('#gesturespickerselector .gesturespicker-container .gesturespicker-item')
          .forEach(function (node, index) {
            let clone = node.cloneNode(true);
            clone.classList.add('icon');
            clone.addEventListener('click', function (event) {
              localThis.loadedBy.botClient.emit('sendgesture', index);
            });
            row.append(clone);
          });
      }
      this.elements.section.append(row);
    }
  }

  class BotTokenGiver extends Addon {
    static dummy = Addon.register('BotTokenGiver', this);
    static dummy = Addon.bind('BotClientInterface', this);

    constructor() {
      let icon = helper.interface.buildTree('i', { class: 'fas fa-mug-hot' });
      super(icon);
      this.#init();
    }

    #init() {
      this.overwriteTitle('Tokken');
      this.#row1();
      this.#row2();
    }

    #row1() {
      let localThis = this;
      let row = helper.interface.buildIconList();
      // row.classList.add('nowrap');
      {
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
          let tokenSend_button = helper.interface.buildButton(token);
          tokenSend_button.classList.add('icon');
          tokenSend_button.addEventListener('click', function () {
            localThis.loadedBy.botClient.room.players.forEach(function (player) {
              localThis.loadedBy.botClient.emit('settoken', player.id, index);
            });
          });
          row.append(tokenSend_button);
        });
      }
      this.elements.section.append(row);
    }

    #row2() {
      let localThis = this;
      let row = helper.interface.buildRow();
      {
        let toggleStatus_button = helper.interface.buildButton('Toggle Status');
        toggleStatus_button.addEventListener('click', function () {
          localThis.loadedBy.botClient.attributes.status = !localThis.loadedBy.botClient.attributes.status;
          let status = localThis.loadedBy.botClient.attributes.status;
          toggleStatus_button.classList[status ? 'add' : 'remove']('active');
          localThis.loadedBy.botClient.emit('setstatusflag', 0, status);
          localThis.loadedBy.botClient.emit('setstatusflag', 1, status);
          localThis.loadedBy.botClient.emit('setstatusflag', 2, status);
          localThis.loadedBy.botClient.emit('setstatusflag', 3, status);
          localThis.loadedBy.botClient.emit('setstatusflag', 4, status);
        });
        row.append(toggleStatus_button);
      }
      this.elements.section.append(row);
    }
  }

  class BotCanvasAvatar extends Addon {
    static dummy = Addon.register('BotCanvasAvatar', this);
    static dummy = Addon.bind('BotClientInterface', this);

    constructor() {
      let icon = helper.interface.buildTree('i', { class: 'fas fa-arrows-alt' });
      super(icon);
      this.init();
    }

    init() {
      this.overwriteTitle('CanvasAvatar');
      this.#row1();
    }
    #row1() {
      let localThis = this;
      let row = helper.interface.buildRow();
      {
        // Spawn && Move Avatar
        let avatarPosition = { x: 50, y: 50 };

        let avatarSpawn_button = helper.interface.buildButton('<i class="fas fa-exchange-alt"></i>');
        let avatarChange_button = helper.interface.buildButton('<i class="fas fa-retweet"></i>');
        let avatarPositionX_button = helper.interface.buildTree('input', {
          type: 'number',
          value: 50,
          min: 2,
          max: 98,
          title: 'Left',
        });
        let avatarPositionY_button = helper.interface.buildTree('input', {
          type: 'number',
          value: 50,
          min: 2,
          max: 98,
          title: 'Top',
        });

        avatarSpawn_button.addEventListener('click', function (event) {
          localThis.loadedBy.botClient.emit('spawnavatar');
          localThis.loadedBy.botClient.attributes.spawned = !localThis.loadedBy.botClient.attributes.spawned;
        });

        avatarChange_button.addEventListener('click', function (event) {
          localThis.loadedBy.botClient.emit('setavatarprop');
          localThis.loadedBy.botClient.attributes.rounded = !localThis.loadedBy.botClient.attributes.rounded;
        });

        avatarPositionX_button.addEventListener('change', function (event) {
          avatarPosition.x = avatarPositionX_button.value;
          localThis.loadedBy.botClient.emit('moveavatar', avatarPosition.x, avatarPosition.y);
        });

        avatarPositionY_button.addEventListener('change', function (event) {
          avatarPosition.y = avatarPositionY_button.value;
          localThis.loadedBy.botClient.emit('moveavatar', avatarPosition.x, avatarPosition.y);
        });

        avatarSpawn_button.title = 'Spawn Avatar';
        avatarChange_button.title = 'Toggle Round Avatar';

        row.appendAll(avatarSpawn_button, avatarPositionX_button, avatarPositionY_button, avatarChange_button);
      }
      this.elements.section.append(row);
    }
  }

  function getMyId() {
    return document.querySelector('.playerlist-name-localThis')?.parentElement.dataset.playerid || 0;
  }

  function parseAvatarURL(arr = []) {
    return `https://drawaria.online/avatar/cache/${arr.length > 0 ? arr.join('.') : 'default'}.jpg`;
  }
})('CubeEngine');
