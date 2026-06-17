// ==UserScript==
// @name         AutoDraw
// @version      1.0.1
// @description  Autodrawing for your BotClients
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

(function AutoDraw() {
  const QBit = globalThis[arguments[0]];

  class AutoDraw extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'CubeEngine');

    constructor() {
      super('AutoDraw', '<i class="fas fa-brush"></i>');
      this.executionList = [];
      this.isRunning = false;
      this.botManager = this.findGlobal('BotClientManager')?.siblings?.at(0);
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();
    }

    #loadInterface() {
      this.#row1();
      this.#row2();
      this.#row3();
      this.#row4();
    }

    #row1() {}
    #row2() {}
    #row3() {}
    #row4() {}

    startDrawing() {
      this.botManager = this.findGlobal('BotClientManager')?.siblings?.at(0);
      this.isRunning = true;
      this.doTasks();
      this.notify('info', 'Started');
    }

    stopDrawing() {
      this.isRunning = false;
    }

    doTasks() {
      if (!this.botManager || this.botManager.children.length <= 0) this.stopDrawing();
      if (!this.isRunning) return this.parent.notify('info', 'Stopped');

      this.botManager.children.forEach((bot) => {
        const pixelInstance = this.executionList.shift();
        const data = [
          'drawcmd',
          0,
          [
            pixelInstance.x1 * 0.01,
            pixelInstance.y1 * 0.01,
            pixelInstance.x2 * 0.01,
            pixelInstance.y2 * 0.01,
            !0,
            -pixelInstance.thickness,
            pixelInstance.colorAsHexFull,
            -1,
            !1,
          ],
        ];
        bot.send(`${42}${JSON.stringify(data)}`);
      });

      setTimeout(() => {
        this.doTasks();
      }, 1);
    }
  }

  class Pixel {
    static dummy1 = QBit.register(this);

    constructor(x = 0, y = 0, color = [0, 0, 0, 0]) {
      this.x1 = x;
      this.x2 = y;
      this.y1 = x;
      this.y2 = y;
      this.thickness = 2;
      this.color = color;
    }

    get colorAsHexFull() {
      return rgbaArrayToHex(this.color);
    }

    get colorAsHexShort() {
      const hexString = rgbaArrayToHex(this.color);
      const matches = hexString.match(/^(#)(.).(.).(.).(.).$/);
      return matches[1] + matches[2] + matches[3] + matches[4] + matches[5];
    }

    get colorAsHexShortWild() {
      const hexString = rgbaArrayToHex(this.color);
      const matches = hexString.match(/^(#).(.).(.).(.)(.).$/);
      return matches[1] + matches[2] + matches[3] + matches[4] + matches[5];
    }
  }

  /**
   *
   * @param {0} number - A number from 0-255 to assign to hex values
   * @returns The passed number as hex string
   */
  function intToHex(number) {
    return number.toString(16).padStart(2, '0');
  }
  /**
   *
   * @param {[0,0,0]|[0,0,0,0]} rgbaArray - A color defined in an rgb(+a) array
   * @returns The color as Hex string
   */
  function rgbaArrayToHex(rgbaArray) {
    const r = intToHex(rgbaArray[0]);
    const g = intToHex(rgbaArray[1]);
    const b = intToHex(rgbaArray[2]);
    const a = intToHex(rgbaArray[3] ?? 255);
    return '#' + r + g + b + a;
  }
})('QBit');

sockets[0].send(`42["drawcmd",2,[0.5,0.5,"#000000",{"0":-1,"1":255,"2":255,"3":255},45]]`);
