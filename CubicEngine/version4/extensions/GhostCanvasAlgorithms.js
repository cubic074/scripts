// ==UserScript==
// @name         GhostCanvas Algorithms
// @version      1.2
// @description  Additional options for GhostCanvas
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

(function GhostCanvasAlgorithms() {
  const QBit = globalThis[arguments[0]];

  function sortByColor(pixel1, pixel2) {
    const color1 = rgbaArrayToHex(pixel1.color);
    const color2 = rgbaArrayToHex(pixel2.color);
    if (color1 < color2) {
      return -1;
    }
    if (color1 > color2) {
      return 1;
    }
    return 0;
  }

  function intToHex(number) {
    return number.toString(16).padStart(2, '0');
  }

  function rgbaArrayToHex(rgbaArray) {
    const r = intToHex(rgbaArray[0]);
    const g = intToHex(rgbaArray[1]);
    const b = intToHex(rgbaArray[2]);
    const a = intToHex(rgbaArray[3]);
    return '#' + r + g + b + a;
  }

  function areSameColor(colorArray1, colorArray2, allowedDifference = 8) {
    var red = colorArray1[0] - colorArray2[0];
    var green = colorArray1[1] - colorArray2[1];
    var blue = colorArray1[2] - colorArray2[2];

    if (red < 0) red = red * -1;
    if (green < 0) green = green * -1;
    if (blue < 0) blue = blue * -1;

    if (red > allowedDifference || green > allowedDifference || blue > allowedDifference) return false;
    return true;
  }

  class GhostCanvasMinify extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'GhostCanvas');

    constructor() {
      super('Minify', '<i class="fas fa-compress-arrows-alt"></i>');
      this.minOpacity = 20;
      this.maxFuzzyness = 32;
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

    #row1() {
      const row = domMake.Row();
      {
        const fuzzynessInput = domMake.Tree('input', {
          type: 'number',
          title: 'Fuzzyness',
          step: 1,
          min: 0,
          max: 255,
          value: 10,
        });
        const opacityInput = domMake.Tree('input', {
          type: 'number',
          title: 'Opacity',
          step: 1,
          min: 0,
          max: 255,
          value: 30,
        });

        fuzzynessInput.addEventListener('change', () => {
          this.maxFuzzyness = Number(fuzzynessInput.value);
        });

        opacityInput.addEventListener('change', () => {
          this.minOpacity = Number(opacityInput.value);
        });

        row.appendAll(fuzzynessInput, opacityInput);
      }
      this.htmlElements.section.appendChild(row);
    }
    #row2() {
      const row = domMake.Row();
      {
        const minifyPixelsArrayButton = domMake.Button('Minify');

        minifyPixelsArrayButton.addEventListener('click', (event) => {
          this.minifyPixelsArray();
        });

        row.appendAll(minifyPixelsArrayButton);
      }
      this.htmlElements.section.appendChild(row);
    }
    #row3() {}
    #row4() {}

    minifyPixelsArray() {
      const pixelArray = this.parent.drawingManager.pixelList;
      const newPixelArray = [];

      let currentPixel = pixelArray[0];
      let lastPixel = currentPixel;
      let currentLine = currentPixel;

      for (let index = 0; index < pixelArray.length; index++) {
        currentPixel = pixelArray[index];

        if (lastPixel.color[3] < 10 && currentPixel.color[3] >= 10) {
          // From Transparent To Solid

          currentLine = currentPixel;
        } else if (lastPixel.color[3] >= 10 && currentPixel.color[3] < 10) {
          // From Solid To Transparent

          currentLine.x2 = lastPixel.x2;
          newPixelArray.push(currentLine);
          currentLine = currentPixel;
        } else if (currentPixel.color[3] >= 10 && lastPixel.color[3] >= 10) {
          // From Solid To Solid

          if (
            currentLine.y1 !== currentPixel.y1 ||
            lastPixel.x2 !== currentPixel.x1 - 1 ||
            !areSameColor(lastPixel.color, currentPixel.color, this.maxFuzzyness)
          ) {
            currentLine.x2 = lastPixel.x2;
            newPixelArray.push(currentLine);
            currentLine = currentPixel;
          }
        } else {
          // From Transparent To Transparent
        }

        lastPixel = currentPixel;
      }
      // if (currentLine.color[3] >= 10) newPixelArray.push(currentLine);

      this.parent.setPixelList(newPixelArray);
    }

    minifyPixelsArray_alt() {
      const pixelArray = this.parent.drawingManager.pixelList;
      const newPixelArray = [];
      var lastPixel = pixelArray[0];
      var currentLine = lastPixel;
      const stepsize = this.parent.stepsize ?? 1;

      for (let i = 0; i < pixelArray.length; i += stepsize) {
        const currentPixel = pixelArray[i];

        if (currentPixel.y1 !== currentLine.y1 || currentPixel.color !== lastPixel.color) {
          currentLine.x2 = lastPixel.x2;
          if (!/^#[0-9a-fA-F]{6}[0-4]{2}$/.test(lastPixel.color)) newPixelArray.push(currentLine);
          currentLine = currentPixel;
        }

        lastPixel = currentPixel;
      }
      newPixelArray.push(currentLine);

      this.parent.setPixelList(newPixelArray);
    }
  }

  class GhostCanvasSort extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'GhostCanvas');

    constructor() {
      super('Sort', '<i class="fas fa-sort-numeric-down"></i>');
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

    #row1() {
      const row = domMake.Row();
      {
        const sortPixelsArrayButton = domMake.Button('Sort');

        sortPixelsArrayButton.addEventListener('click', (event) => {
          this.sortPixelsArray();
        });

        row.appendAll(sortPixelsArrayButton);
      }
      this.htmlElements.section.appendChild(row);
    }
    #row2() {}
    #row3() {}
    #row4() {}

    sortPixelsArray() {
      const pixelArray = this.parent.drawingManager.pixelList;

      const newPixelArray = [...pixelArray].sort(sortByColor);

      this.parent.setPixelList(newPixelArray);
    }
  }
})('QBit');
