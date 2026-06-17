// ==UserScript==
// @name         BotConnect
// @namespace    CheatEngine
// @version      1.0.0
// @description  Controls for the connections
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// @run-at       document-idle
// ==/UserScript==

(function (scope) {
  let helper = scope['CodeMaid'];
  let Engine = scope['🎮'];
  let Cheat = scope['📦'];

  let Bot = Engine.Mapper.get('Bot')[0];
  if (!Bot) Cheat.log('err', 'Bot not Found');

  class BotControls extends Cheat {
    static dummy = Cheat.bind(this, 'main');

    constructor(parentClassReference, position) {
      super(parentClassReference, position);
      this.bot = new Bot(Date.now().toString(16).slice(-6), ['', '']);
      this.avatar_img = helper.createDOM.Tree('img', {
        src: '/avatar/cache/default.jpg',
        style: 'height: 100%; width: 100%;',
      });
      this.setIcon(this.avatar_img);
    }
  }

  class BotConnect extends Cheat {
    static dummy = Cheat.bind(this, 'BotControls');

    constructor(parentClassReference, position) {
      super(parentClassReference, position);

      this.setIcon(helper.createDOM.FA('<i class="fas fa-network-wired"></i>'));

      this.init();
    }
    init() {
      this.#row1();
      this.#row2();
      this.#row3();
    }
    #row1() {
      let self = this;
      let row = helper.createDOM.Row();
      // Connect
      {
        let connect_button = helper.createDOM.Button('<i class="fas fa-user-plus"></i>');
        connect_button.addEventListener('click', function (event) {
          self.parent.bot.connect();
        });
        row.append(connect_button);
      }
      // Disconnect
      {
        let disconnect_button = helper.createDOM.Button('<i class="fas fa-user-minus"></i>');
        disconnect_button.addEventListener('click', function (event) {
          self.parent.bot.disconnect();
        });
        row.append(disconnect_button);
      }
      self.body.append(row);
    }
    #row2() {
      let self = this;
      let row = helper.createDOM.Row();
      // Create
      {
      }
      // Enter
      {
        let enterRoom_button = helper.createDOM.Button('Join');
        enterRoom_button.addEventListener('click', function (event) {
          self.parent.bot.enterRoom(document.querySelector('#invurl').value);
        });
        row.append(enterRoom_button);
      }
      // Switch
      {
        let switchRoom_button = helper.createDOM.Button('Next');
        switchRoom_button.addEventListener('click', function (event) {
          self.parent.bot.switchRoom();
        });
        row.append(switchRoom_button);
      }
      // Leave
      {
        let leaveRoom_button = helper.createDOM.Button('Exit');
        leaveRoom_button.addEventListener('click', function (event) {
          self.parent.bot.leaveRoom();
        });
        row.append(leaveRoom_button);
      }
      self.body.append(row);
    }
    #row3() {
      let self = this;
      let row = helper.createDOM.Row();
      // Update Name and Avatar
      {
        const id = helper.generate.uuidv4();
        let change_avatar_label = helper.createDOM.Tree('label', { for: id, class: 'icon' }, [
          helper.createDOM.FA('<i class="fas fa-upload"></i>'),
        ]);
        let changeAvatar_input = helper.createDOM.Tree('input', { type: 'file', id: id, hidden: true });

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
                self.parent.avatar_img.src = getAvatarCacheURL(self.parent.bot.avatar);
              })
            );
          });
          myFileReader.readAsDataURL(this.files[0]);
        }
        changeAvatar_input.addEventListener('change', onChange);

        let changeName_input = helper.createDOM.Tree('input', {
          type: 'text',
          value: self.parent.bot?.name || '',
          placeholder: 'Bot Name',
        });
        changeName_input.addEventListener('keypress', function (event) {
          if (event.keyCode != 13) return;
          self.parent.bot.name = changeName_input.value;
          self.parent.label.title = changeName_input.value;
        });

        row.appendAll(change_avatar_label, changeAvatar_input, changeName_input);
      }
      self.body.append(row);
    }
  }

  function getAvatarCacheURL(avatar = ['', '']) {
    if (avatar[0] == '' && avatar[1] == '') return `https://drawaria.online/avatar/cache/default.jpg`;
    return `https://drawaria.online/avatar/cache/${avatar.join('.')}.jpg`;
  }
})(globalThis);
