// ==UserScript==
// @name         BotClient User Interface
// @version      1.5
// @description  Provides a User Interface to access the BotClient
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

(function BotClientInterface() {
  const QBit = globalThis[arguments[0]];
  const BotClient = QBit.findGlobal('BotClient');

  let botcount = 0;
  const radios = [];

  function getMasterId() {
    return document.querySelector('.playerlist-name-self')?.parentElement.dataset.playerid || 0;
  }

  function parseAvatarURL(arr = []) {
    return `https://drawaria.online/avatar/cache/${arr.length > 0 ? arr.join('.') : 'default'}.jpg`;
  }

  class BotClientManager extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'CubeEngine');

    constructor() {
      super(`BotClientManager`, '<i class="fas fa-robot"></i>');
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();
    }

    #loadInterface() {
      this.#row1();
    }

    #row1() {
      const row = domMake.IconList();
      {
        const id = generate.uuidv4();
        const createBotClientInterfaceInput = domMake.Tree('input', { type: 'button', id: id, hidden: true });
        const createBotClientInterfaceLabel = domMake.Tree('label', { for: id, class: 'icon', title: 'Add Image' }, [
          domMake.Tree('i', { class: 'fas fa-plus' }),
        ]);

        createBotClientInterfaceInput.addEventListener('click', () => {
          this.createBotClientInterface();
        });

        row.appendAll(createBotClientInterfaceLabel);
        row.appendAll(createBotClientInterfaceInput);
      }
      {
        const id = generate.uuidv4();
        const removeBotClientInterfaceInput = domMake.Tree('input', { type: 'button', id: id, hidden: true });
        const removeBotClientInterfaceLabel = domMake.Tree('label', { for: id, class: 'icon', title: 'Add Image' }, [
          domMake.Tree('i', { class: 'fas fa-minus' }),
        ]);

        removeBotClientInterfaceInput.addEventListener('click', () => {
          this.deleteBotClientInterface();
        });

        row.appendAll(removeBotClientInterfaceLabel);
        row.appendAll(removeBotClientInterfaceInput);
      }
      this.htmlElements.header.before(row);
    }

    createBotClientInterface() {
      const instance = this.loadExtension(BotClientInterface);
      instance.htmlElements.input.type = 'radio';
      instance.htmlElements.input.name = 'botClient';

      radios.push(instance.htmlElements.input);
      instance.htmlElements.input.addEventListener('change', (event) => {
        radios.forEach(function (radio) {
          document.body.querySelector(`label[for="${radio.id}"]`).classList.remove('active');
        });
        instance.htmlElements.label.classList.add('active');
      });

      return instance;
    }

    deleteBotClientInterface() {
      const input = document.body.querySelector(`input[name="botClient"]:checked`);

      const matches = this.children.filter((child) => {
        return child.htmlElements.input === input;
      });
      if (matches.length <= 0) return;

      const instance = matches[0];

      instance.bot.disconnect();

      const labelPos = radios.indexOf(instance.htmlElements.input);
      if (~labelPos) radios.splice(labelPos, 1);

      instance._EXP_destroy(!0);
    }
  }

  class BotClientInterface extends QBit {
    static dummy1 = QBit.register(this);
    // static dummy2 = QBit.bind(this, 'CubeEngine');
    // static dummy3 = QBit.bind(this, 'CubeEngine');

    constructor() {
      super(`Bot${botcount}`, '<i class="fas fa-robot"></i>');
      this.bot = new BotClient();
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();
      this.setClientName(this.bot.name);
      this.setClientIcon(this.bot.avatar);
    }

    #loadInterface() {
      this.#row1();
    }

    #row1() {
      const row = domMake.Row();
      {
        let join_button = domMake.Button('Enter');
        let leave_button = domMake.Button('Leave');

        join_button.addEventListener('click', (event) => {
          this.bot.enterRoom(document.querySelector('#invurl').value);
        });

        leave_button.addEventListener('click', (event) => {
          this.bot.disconnect();
        });

        row.appendAll(join_button, leave_button);
      }
      this.htmlElements.section.appendChild(row);
    }

    setClientName(name) {
      this.setName(name);
      this.bot.name = name;
    }

    setClientIcon(icon) {
      this.setIcon(`<img src="${parseAvatarURL(this.bot.avatar)}">`);
      this.bot.avatar = icon;
    }
  }
})('QBit');
