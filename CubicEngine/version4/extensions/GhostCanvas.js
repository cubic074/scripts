// ==UserScript==
// @name         GhostCanvas
// @version      2.1
// @description  A Canvas to load Images and convert to drawinstructions for BotClients
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

(function GhostCanvas() {
  const QBit = globalThis[arguments[0]];
  const Await = QBit.findGlobal('Await');

  QBit.Styles.addRule(
    '.ghostimage { position:fixed; top:50%; left:50%; opacity:.6; box-shadow: 0 0 1px 1px cornflowerblue inset; }'
  );

  function getBoundingClientRect(htmlElement) {
    let { top, right, bottom, left, width, height, x, y } = htmlElement.getBoundingClientRect();

    top = Number(top).toFixed();
    right = Number(right).toFixed();
    bottom = Number(bottom).toFixed();
    left = Number(left).toFixed();
    width = Number(width).toFixed();
    height = Number(height).toFixed();
    x = Number(x).toFixed();
    y = Number(y).toFixed();

    return { top, right, bottom, left, width, height, x, y };
  }

  function makeDragable(draggableElement, update) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    draggableElement.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      draggableElement.style.top = Number(draggableElement.offsetTop - pos2).toFixed() + 'px';
      draggableElement.style.left = Number(draggableElement.offsetLeft - pos1).toFixed() + 'px';
      update();
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }

  const radios = [];

  class GhostCanvas extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'CubeEngine');
    static isFavorite = true;

    GameCanvas;
    DrawCanvas;
    DrawCanvasContext;
    DrawCanvasRect;
    loadedImages;
    drawingManager;

    constructor() {
      super('GhostCanvas', '<i class="fas fa-images"></i>');
      this.GameCanvas = document.body.querySelector('canvas#canvas');
      this.DrawCanvas = document.createElement('canvas');
      this.DrawCanvasRect = {};
      this.loadedImages = [];
      this.DrawCanvasContext = this.DrawCanvas.getContext('2d');
      this.drawingManager = new TaskManager(this);

      this.#onStartup();
      this.resetAllSettings();
    }

    #onStartup() {
      this.#loadInterface();
      this.DrawCanvas.width = this.GameCanvas.width;
      this.DrawCanvas.height = this.GameCanvas.height;
      this.DrawCanvas.style =
        'position:fixed; opacity:.6; box-shadow: 0 0 1px 1px firebrick inset; pointer-events: none;';

      const onResize = new Await(this.alignDrawCanvas.bind(this), 500);
      window.addEventListener('resize', (event) => {
        onResize.call();
      });

      this.htmlElements.input.addEventListener('change', (event) => {
        if (this.htmlElements.input.checked) this.alignDrawCanvas();
      });
    }

    #loadInterface() {
      this.#row1();
      this.#row2();
      this.#row3();
      this.#row4();
      this.#row5();
    }

    #row1() {
      const row = domMake.Row();
      {
        const resetSettingsButton = domMake.Button('Reset');
        const showCanvasInput = domMake.Tree('input', {
          type: 'checkbox',
          title: 'Toggle Canvas',
          class: 'icon',
        });
        const clearCanvasButton = domMake.Button('Clear');

        resetSettingsButton.title = 'Reset Settings';
        clearCanvasButton.title = 'Clear GameCanvas';

        resetSettingsButton.addEventListener('click', (event) => {
          this.resetAllSettings();
        });

        showCanvasInput.addEventListener('change', () => {
          this.DrawCanvas.style.display = showCanvasInput.checked ? 'block' : 'none';
        });

        clearCanvasButton.addEventListener('click', (event) => {
          let data = ['drawcmd', 0, [0.5, 0.5, 0.5, 0.5, !0, -2000, '#FFFFFF', -1, !1]];
          this.findGlobal('BotClientInterface').siblings[0].bot.send(`${42}${JSON.stringify(data)}`);
        });

        document.body.appendChild(this.DrawCanvas);
        row.appendAll(resetSettingsButton, showCanvasInput, clearCanvasButton);
      }
      this.htmlElements.section.appendChild(row);
    }

    #row2() {
      const row = domMake.Row();
      {
        const loadPixelDataButton = domMake.Button('Load');
        const pixelsLeftToDraw = domMake.Tree('input', {
          type: 'text',
          readonly: true,
          style: 'text-align: center;',
          value: '0',
        });
        const clearPixelListButton = domMake.Button('Clear');

        this.htmlElements.pixelsLeftToDraw = pixelsLeftToDraw;
        loadPixelDataButton.title = 'Load Pixels to draw';
        clearPixelListButton.title = 'Clear Pixels to draw';

        loadPixelDataButton.addEventListener('click', (event) => {
          this.saveCanvas();
        });

        clearPixelListButton.addEventListener('click', (event) => {
          this.setPixelList([]);
        });

        row.appendAll(loadPixelDataButton, pixelsLeftToDraw, clearPixelListButton);
      }
      this.htmlElements.section.appendChild(row);
    }

    #row3() {
      const row = domMake.Row();
      {
        const startDrawingButton = domMake.Button('Start');
        const stopDrawingButton = domMake.Button('Stop');

        startDrawingButton.addEventListener('click', (event) => {
          this.drawingManager.startDrawing();
        });
        stopDrawingButton.addEventListener('click', (event) => {
          this.drawingManager.stopDrawing();
        });

        row.appendAll(startDrawingButton, stopDrawingButton);
      }
      this.htmlElements.section.appendChild(row);
    }

    #row4() {
      const row = domMake.Row();
      {
        const brushSizeInput = domMake.Tree('input', { type: 'number', min: 2, value: 2, max: 200, step: 1 });
        const singleColorModeInput = domMake.Tree('input', { type: 'checkbox', class: 'icon' });
        const brushColorInput = domMake.Tree('input', { type: 'text', value: 'blue' });

        brushSizeInput.addEventListener('change', (event) => {
          this.drawingManager.brushSize = Number(brushSizeInput.value);
        });
        singleColorModeInput.addEventListener('change', (event) => {
          this.drawingManager.singleColor = Boolean(singleColorModeInput.checked);
        });
        brushColorInput.addEventListener('change', (event) => {
          this.drawingManager.brushColor = brushColorInput;
        });

        row.appendAll(brushSizeInput, singleColorModeInput, brushColorInput);
      }
      this.htmlElements.section.appendChild(row);
    }

    #row5() {
      const row = domMake.IconList();
      {
        const id = generate.uuidv4();
        const chooseGhostlyImageInput = domMake.Tree('input', { type: 'file', id: id, hidden: true });
        const chooseGhostlyImageLabel = domMake.Tree('label', { for: id, class: 'icon', title: 'Add Image' }, [
          domMake.Tree('i', { class: 'fas fa-plus' }),
        ]);

        const localThis = this;
        function onChange() {
          if (!this.files || !this.files[0]) return;
          const myFileReader = new FileReader();
          myFileReader.addEventListener('load', (event) => {
            const base64 = event.target.result.replace('image/gif', 'image/png');
            localThis.createGhostImage(base64, row);
          });
          myFileReader.readAsDataURL(this.files[0]);
        }
        chooseGhostlyImageInput.addEventListener('change', onChange);

        row.appendAll(chooseGhostlyImageLabel, chooseGhostlyImageInput);
      }
      {
        const resetImageSelectionLabel = domMake.Tree('div', { class: 'icon', title: 'Unselect' }, [
          domMake.Tree('i', { class: 'fas fa-chevron-left' }),
        ]);
        resetImageSelectionLabel.addEventListener('click', () => {
          document.body.querySelectorAll('input[name="ghostimage"]').forEach((node) => {
            node.checked = false;
          });
        });
        row.appendChild(resetImageSelectionLabel);
      }
      this.htmlElements.section.appendChild(row);
    }

    createGhostImage(imageSource, row) {
      this.alignDrawCanvas();
      const image = this.loadExtension(GhostImage, (reference) => {
        this.loadedImages.push(reference);
      });
      row.appendChild(image.htmlElements.label);
      image.setImageSource(imageSource);
    }

    clearCanvas() {
      this.DrawCanvasContext.clearRect(0, 0, this.DrawCanvas.width, this.DrawCanvas.height);
    }

    saveCanvas() {
      this.getAllPixels();
    }

    resetAllSettings() {
      this.clearCanvas();
      this.loadedImages.forEach((image, index) => {
        setTimeout(() => {
          image.reduceToAtoms();
        }, 10 * index);
      });
      this.drawingManager.stopDrawing();
      this.setPixelList([]);
      this.alignDrawCanvas(true);
    }

    alignDrawCanvas() {
      if (arguments[0]) {
        this.DrawCanvas.width = this.GameCanvas.width;
        this.DrawCanvas.height = this.GameCanvas.height;
      }

      const GameCanvasRect = getBoundingClientRect(this.GameCanvas);

      this.DrawCanvas.style.top = `${GameCanvasRect.top}px`;
      this.DrawCanvas.style.left = `${GameCanvasRect.left}px`;
      this.DrawCanvas.style.width = `${GameCanvasRect.width}px`;
      this.DrawCanvas.style.height = `${GameCanvasRect.height}px`;

      const DrawCanvasRect = getBoundingClientRect(this.DrawCanvas);

      if (DrawCanvasRect.width <= 0 || DrawCanvasRect.height <= 0)
        return Object.assign(this.DrawCanvasRect, DrawCanvasRect);
      // DrawCanvasRect.alignModifierX = Number(this.DrawCanvas.width / DrawCanvasRect.width).toFixed(2);
      // DrawCanvasRect.alignModifierY = Number(this.DrawCanvas.height / DrawCanvasRect.height).toFixed(2);

      DrawCanvasRect.drawModifierX = 100 / DrawCanvasRect.width;
      DrawCanvasRect.drawModifierY = 100 / DrawCanvasRect.height;
      Object.assign(this.DrawCanvasRect, DrawCanvasRect);
    }

    getAllPixels() {
      const image = this.DrawCanvasContext.getImageData(
        0,
        0,
        this.DrawCanvasContext.canvas.width,
        this.DrawCanvasContext.canvas.height
      );
      const pixels = [];

      for (let index = 0; index < image.data.length; index += 4) {
        // const x = (index * 0.25) % image.width;
        // const y = Math.floor((index * 0.25) / image.width);
        const x = (index * 0.25) % image.width;
        const y = Math.floor((index * 0.25) / image.width);

        const r = image.data[index + 0];
        const g = image.data[index + 1];
        const b = image.data[index + 2];
        const a = image.data[index + 3];
        // const color = rgbaArrayToHex([r, g, b, a]);
        const color = [r, g, b, a];
        pixels.push({ x1: x, y1: y, x2: x, y2: y, color });
      }

      this.setPixelList(pixels);
    }

    getNoneTransparentPixels() {
      this.getAllPixels();

      const newPixelArray = this.drawingManager.pixelList.filter((pixel) => {
        return pixel.color !== '#000000';
        // return /^#0[0-8]0[0-8]0[0-8]$/g.test(pixel.color);
      });

      this.setPixelList(newPixelArray);
    }

    setPixelList(pixelArray) {
      this.drawingManager.pixelList = pixelArray;
      this.htmlElements.pixelsLeftToDraw.value = pixelArray.length;
    }
  }

  class GhostImage extends QBit {
    image;
    rect;

    constructor() {
      super('GhostImage', '<i class="fas fa-image-polaroid"></i>');
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();

      this.image = domMake.Tree('img', { class: 'ghostimage' });
      this.image.addEventListener('mousedown', (event) => {
        this.htmlElements.label.click();
      });

      this.htmlElements.input.type = 'radio';
      this.htmlElements.input.name = 'ghostimage';

      radios.push(this.htmlElements.input);
      this.htmlElements.input.addEventListener('change', (event) => {
        radios.forEach(function (radio) {
          document.body.querySelector(`label[for="${radio.id}"]`).classList.remove('active');
        });
        this.htmlElements.label.classList.add('active');
      });

      document.body.appendChild(this.image);
      makeDragable(this.image, this.updatePosition.bind(this));
      this.updatePosition();
    }

    #loadInterface() {
      this.#row1();
      this.#row2();
    }

    #row1() {
      const row = domMake.Row();
      {
        const paintCanvasButton = domMake.Button('Place');

        paintCanvasButton.addEventListener('click', (event) => {
          this.drawImage();
        });

        row.appendAll(paintCanvasButton);
      }
      {
        const enableButton = domMake.Button('Delete');

        enableButton.addEventListener('click', (event) => {
          this.reduceToAtoms();
        });
        row.appendChild(enableButton);
        this.htmlElements.toggleStatusButton = enableButton;
      }
      this.htmlElements.section.appendChild(row);
    }

    #row2() {
      const row = domMake.Row();
      {
        const scaleInput = domMake.Tree('input', {
          type: 'number',
          title: 'rotation',
          min: 0.1,
          max: 10,
          value: 1,
          step: 0.02,
        });

        scaleInput.addEventListener('change', () => {
          this.image.style.scale = scaleInput.value;
        });

        this.htmlElements.scaleInput = scaleInput;

        row.appendAll(scaleInput);
      }
      {
        const rotationInput = domMake.Tree('input', { type: 'number', title: 'rotation', value: 0, step: 1 });

        rotationInput.addEventListener('change', () => {
          this.image.style.rotate = `${rotationInput.value}deg`;
        });

        this.htmlElements.rotationInput = rotationInput;

        row.appendChild(rotationInput);
      }
      this.htmlElements.section.appendChild(row);
    }

    drawImage() {
      this.updatePosition();
      const ctx = this.parent.DrawCanvasContext;

      const offsetTop = Number(this.rect.top) - Number(this.parent.DrawCanvasRect.top);
      const offsetLeft = Number(this.rect.left) - Number(this.parent.DrawCanvasRect.left);

      // const multiX = Number(this.parent.DrawCanvasRect.alignModifierX);
      // const multiY = Number(this.parent.DrawCanvasRect.alignModifierY);

      const angle = (Math.PI / 180) * Number(this.htmlElements.rotationInput.value);
      const scale = Number(this.htmlElements.scaleInput.value);

      const imageWidth = this.image.width * scale;
      const imageHeight = this.image.height * scale;
      const imgHalfWidth = imageWidth * 0.5;
      const imgHalfHeight = imageHeight * 0.5;

      ctx.save();
      ctx.translate(offsetLeft + imgHalfWidth, offsetTop + imgHalfHeight);
      ctx.rotate(angle);
      ctx.translate(-imgHalfWidth, -imgHalfHeight);
      ctx.drawImage(this.image, 0, 0, imageWidth, imageHeight);
      ctx.restore();
    }

    setImageSource(imageSource) {
      this.image.src = imageSource;
      this.setIcon(`<img src="${this.image.src}">`);
    }

    updatePosition() {
      this.rect = getBoundingClientRect(this.image);
    }

    reduceToAtoms() {
      this.image.remove();
      const pos = radios.indexOf(this.htmlElements.input);
      if (~pos) radios.splice(pos, 1);

      let pos2 = this.parent.loadedImages.indexOf(this);
      if (~pos2) {
        this.parent.loadedImages.splice(pos2, 1);
      }
      this._EXP_destroy(!0);
    }
  }

  class TaskManager {
    isRunning;
    pixelList;
    parent;
    BotClientManager;
    singleColor;
    brushColor;
    brushSize;

    constructor(parent) {
      this.pixelList = [];
      this.singleColor = !1;
      this.brushColor = 'blue';
      this.brushSize = 2;
      this.parent = parent;
    }

    startDrawing() {
      this.BotClientManager = this.parent.findGlobal('BotClientManager')?.siblings[0];
      this.isRunning = true;
      this.doTasks();
      this.parent.notify('info', 'Started');
    }

    stopDrawing() {
      this.isRunning = false;
    }

    doTasks() {
      if (!this.BotClientManager || this.BotClientManager.children.length <= 0) this.stopDrawing();
      if (!this.isRunning) return this.parent.notify('info', 'Stopped');

      this.BotClientManager.children.forEach((botClientInterface, index) => {
        this.parseAndSendPixel(botClientInterface, index);
      });

      setTimeout(() => {
        this.doTasks();
      }, 1);
    }

    parseAndSendPixel(botClientInterface, index) {
      if (this.pixelList.length <= 0) return this.stopDrawing();
      if (!botClientInterface.bot || !botClientInterface.bot.getReadyState()) return;

      const task = index % 2 == 0 ? this.pixelList.shift() : this.pixelList.pop();
      botClientInterface.bot.send(this.convertTasks(task));
      this.parent.htmlElements.pixelsLeftToDraw.value = this.pixelList.length;
    }

    convertTasks(pixel) {
      const playerid = -1;
      const lastx = pixel.x1 * this.parent.DrawCanvasRect.drawModifierX;
      const lasty = pixel.y1 * this.parent.DrawCanvasRect.drawModifierY;
      const x = pixel.x2 * this.parent.DrawCanvasRect.drawModifierX;
      const y = pixel.y2 * this.parent.DrawCanvasRect.drawModifierY;
      const isactive = !0;
      const size = pixel.size ?? this.brushSize;
      const pxColor = pixel.color;
      const color = this.singleColor
        ? this.brushColor
        : `rgba(${pxColor[0]},${pxColor[1]},${pxColor[2]},${parseFloat(pxColor[3] * 0.390625).toFixed(2)})`;
      const ispixel = !1;

      let data = [
        'drawcmd',
        0,
        [lastx * 0.01, lasty * 0.01, x * 0.01, y * 0.01, isactive, -size, color, playerid, ispixel],
      ];

      return `${42}${JSON.stringify(data)}`;
    }
  }
})('QBit');
