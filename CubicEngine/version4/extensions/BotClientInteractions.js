// ==UserScript==
// @name         BotClient Interactions (Enhanced)
// @version      6.3
// @description  A collection of Interactions the BotClient can perform
// @namespace    drawaria.modded.partial
// @homepage     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://drawaria.online/
// @match        https://drawaria.online/room/*
// @icon         https://drawaria.online/avatar/cache/e53693c0-18b1-11ec-b633-b7649fa52d3f.jpg
// @grant        none
// @license      GNU GPLv3
// @run-at       document-end
// ==/UserScript==

(function BotClientInteractions() {
  const QBit = globalThis[arguments[0]];

  class BotPersonality extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'BotClientInterface');

    constructor() {
      super('Personality', '<i class="fas fa-user-cog"></i>');
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();
    }

    #loadInterface() {
      this.#row1();
      this.#row2();
    }

    #row1() {
      const row = domMake.Row();
      {
        let botName = domMake.Tree('input', { type: 'text', placeholder: 'Your Bots name' });
        let botNameAccept = domMake.Tree('button', { class: 'icon' }, [domMake.Tree('i', { class: 'fas fa-check' })]);

        botNameAccept.addEventListener('click', (event) => {
          this.parent.setClientName(botName.value);
        });

        row.appendAll(botName, botNameAccept);
      }
      this.htmlElements.section.appendChild(row);
    }

    #row2() {
      let id = generate.uuidv4();
      const row = domMake.Row();
      {
        let botAvatarUpload = domMake.Tree('input', { type: 'file', id: id, hidden: true });
        let botAvatarAccept = domMake.Tree('label', { for: id, class: 'btn btn-outline-secondary' }, [
          'Upload BotAvatar',
        ]);

        const localThis = this;
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
                localThis.parent.setClientIcon(body.split('.'));
              })
            );
          });
          myFileReader.readAsDataURL(this.files[0]);
        }
        botAvatarUpload.addEventListener('change', onChange);

        row.appendAll(botAvatarUpload, botAvatarAccept);
      }
      this.htmlElements.section.appendChild(row);
    }
  }

  class BotSozials extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'BotClientInterface');

    constructor() {
      super('Socialize', '<i class="fas fa-comment-dots"></i>');
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();
    }

    #loadInterface() {
      this.#row1();
      this.#row2();
    }

    #row1() {
      const row = domMake.Row();
      {
        let messageClear_button = domMake.Button('<i class="fas fa-strikethrough"></i>');
        let messageSend_button = domMake.Button('<i class="fas fa-paper-plane"></i>');
        let message_input = domMake.Tree('input', { type: 'text', placeholder: 'message...' });

        messageClear_button.classList.add('icon');
        messageSend_button.classList.add('icon');

        messageClear_button.addEventListener('click', (event) => {
          message_input.value = '';
        });

        messageSend_button.addEventListener('click', (event) => {
          this.parent.bot.emit('chatmsg', message_input.value);
        });

        message_input.addEventListener('keypress', (event) => {
          if (event.keyCode != 13) return;
          this.parent.bot.emit('chatmsg', message_input.value);
        });

        row.appendAll(messageClear_button, message_input, messageSend_button);
      }
      this.htmlElements.section.appendChild(row);
    }

    #row2() {
      const row = domMake.IconList();
      // row.classList.add('nowrap');
      {
        document
          .querySelectorAll('#gesturespickerselector .gesturespicker-container .gesturespicker-item')
          .forEach((node, index) => {
            let clone = node.cloneNode(true);
            clone.classList.add('icon');
            clone.addEventListener('click', (event) => {
              this.parent.bot.emit('sendgesture', index);
            });
            row.appendChild(clone);
          });
      }
      this.htmlElements.section.appendChild(row);
    }
  }

  class BotTokenGiver extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'BotClientInterface');

    constructor() {
      super('Tokken', '<i class="fas fa-thumbs-up"></i>');
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();
    }

    #loadInterface() {
      this.#row1();
      this.#row2();
    }

    #row1() {
      const row = domMake.IconList();
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
        listOfTokens.forEach((token, index) => {
          let tokenSend_button = domMake.Button(token);
          tokenSend_button.classList.add('icon');
          tokenSend_button.addEventListener('click', () => {
            this.parent.bot.room.players.forEach((player) => {
              this.parent.bot.emit('settoken', player.id, index);
            });
          });
          row.appendChild(tokenSend_button);
        });
      }
      this.htmlElements.section.appendChild(row);
    }

    #row2() {
      const row = domMake.Row();
      {
        let toggleStatus_button = domMake.Button('Toggle Status');
        toggleStatus_button.addEventListener('click', () => {
          this.parent.bot.attributes.status = !this.parent.bot.attributes.status;
          let status = this.parent.bot.attributes.status;
          toggleStatus_button.classList[status ? 'add' : 'remove']('active');
          this.parent.bot.emit('setstatusflag', 0, status);
          this.parent.bot.emit('setstatusflag', 1, status);
          this.parent.bot.emit('setstatusflag', 2, status);
          this.parent.bot.emit('setstatusflag', 3, status);
          this.parent.bot.emit('setstatusflag', 4, status);
        });
        row.appendChild(toggleStatus_button);
      }
      this.htmlElements.section.appendChild(row);
    }
  }

  class BotCanvasAvatar extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'BotClientInterface');

    constructor() {
      super('SpawnAvatar', '<i class="fas fa-user-circle"></i>');
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();
    }

    #loadInterface() {
      this.#row1();
    }

    #row1() {
      const row = domMake.Row();
      {
        // Spawn && Move Avatar
        let avatarPosition = { x: 0, y: 0 };

        let avatarSpawn_button = domMake.Button('<i class="fas fa-exchange-alt"></i>');
        let avatarChange_button = domMake.Button('<i class="fas fa-retweet"></i>');
        let avatarPositionX_button = domMake.Tree('input', {
          type: 'number',
          value: 2,
          min: 2,
          max: 98,
          title: 'Left',
        });
        let avatarPositionY_button = domMake.Tree('input', {
          type: 'number',
          value: 2,
          min: 2,
          max: 98,
          title: 'Top',
        });

        avatarSpawn_button.addEventListener('click', (event) => {
          this.parent.bot.emit('spawnavatar');
          this.parent.bot.attributes.spawned = !this.parent.bot.attributes.spawned;
        });

        avatarChange_button.addEventListener('click', (event) => {
          this.parent.bot.emit('setavatarprop');
          this.parent.bot.attributes.rounded = !this.parent.bot.attributes.rounded;
        });

        avatarPositionX_button.addEventListener('change', (event) => {
          avatarPosition.x = avatarPositionX_button.value;
          this.parent.bot.emit('moveavatar', avatarPosition.x, avatarPosition.y);
        });

        avatarPositionY_button.addEventListener('change', (event) => {
          avatarPosition.y = avatarPositionY_button.value;
          this.parent.bot.emit('moveavatar', avatarPosition.x, avatarPosition.y);
        });

        avatarSpawn_button.title = 'Spawn Avatar';
        avatarChange_button.title = 'Toggle Round Avatar';

        row.appendAll(avatarSpawn_button, avatarPositionX_button, avatarPositionY_button, avatarChange_button);
      }
      this.htmlElements.section.appendChild(row);
    }
  }

  function getMyId() {
    return document.querySelector('.playerlist-name-this')?.parentElement.dataset.playerid || 0;
  }

  function parseAvatarURL(arr = []) {
    return `https://drawaria.online/avatar/cache/${arr.length > 0 ? arr.join('.') : 'default'}.jpg`;
  }
})('QBit');
