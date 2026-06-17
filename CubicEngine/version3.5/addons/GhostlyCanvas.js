// ==UserScript==
// @name          Drawaria.Modded - GhostCanvas
// @namespace     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version       1.0.0
// @description   Used for preparing autodrawings
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

  class GhostlyCanvas extends Addon {
    static dummy = Addon.register('GhostlyCanvas', this);
    static dummy = Addon.bind('Engine', this);

    GameCanvas;
    GhostCanvas;
    ctx;
    loadedImages;
    ghostlyImageHandleList;
    #windowResizeHandler;

    constructor() {
      super(helper.interface.buildTree('i', { class: 'fas fa-object-group' }));
      this.#init();
    }

    #init() {
      const localThis = this;
      localThis.GameCanvas = document.body.querySelector('canvas#canvas');
      localThis.GhostCanvas = helper.interface.buildTree('canvas', {
        id: 'ghostlycanvas',
        style: 'position:fixed; box; opacity:.6; box-shadow: 0 0 1px 1px firebrick inset;',
      });

      localThis.loadedImages = [];
      localThis.ctx = localThis.GhostCanvas.getContext('2d');
      localThis.#windowResizeHandler = new Await(this.update.bind(localThis), 500);
      localThis.ghostlyImageHandleList = helper.interface.buildTree('div', {
        class: 'icon-list activeTargetBackgroundColor',
      });

      window.addEventListener('resize', function (event) {
        localThis.#windowResizeHandler.call();
      });

      this.pixelmanager = new GhostlyPixelManager(localThis.GhostCanvas);

      localThis.#row1();
      localThis.#row2();
      localThis.#row3();
      localThis.update();
      // Addon.locate('Engine').activeCopies[0].stylize.addRule('.activeTargetBackgroundColor label:not(.active) {opacity:.6;}');
    }

    #setStyle() {
      const localThis = this;

      let rect = localThis.GameCanvas.getBoundingClientRect();
      localThis.GhostCanvas.style.top = `${Number(rect.top).toFixed()}px`;
      localThis.GhostCanvas.style.left = `${Number(rect.left).toFixed()}px`;
      localThis.GhostCanvas.style.width = `${Number(rect.width).toFixed()}px`;
      localThis.GhostCanvas.style.height = `${Number(rect.height).toFixed()}px`;
    }

    #addGhostlyImage(base64) {
      const localThis = this;
      let GhostlyImage = new GhostlyCanvasImage(base64, this.#deleteGhostlyImage.bind(localThis));
      localThis.ghostlyImageHandleList.appendChild(GhostlyImage.elements.label);
      localThis.loadedImages.push(GhostlyImage);
      localThis.elements.section.appendAll(GhostlyImage.elements.input, GhostlyImage.elements.section);
    }

    #deleteGhostlyImage(image) {
      const localThis = this;
      let index = localThis.loadedImages.indexOf(image);
      if (index > -1) {
        // only splice array when item is found
        localThis.loadedImages.splice(index, 1); // 2nd parameter means remove one item only
      }
    }

    update() {
      const localThis = this;
      localThis.GhostCanvas.width = Number(localThis.GameCanvas.width).toFixed();
      localThis.GhostCanvas.height = Number(localThis.GameCanvas.height).toFixed();

      localThis.#setStyle();
    }

    updateBounding() {
      const localThis = this;

      localThis.rect = localThis.GhostCanvas.getBoundingClientRect();
      localThis.rect.multiplierX = localThis.GhostCanvas.width / localThis.rect.width;
      localThis.rect.multiplierY = localThis.GhostCanvas.height / localThis.rect.height;
    }

    paint() {
      let localThis = this;
      this.updateBounding();
      localThis.loadedImages.forEach(function (loadedImage) {
        // CubeEngine.locateAddon('BotClientInterface').activeCopies
        const _top = localThis.rect.top;
        const _left = localThis.rect.left;

        let multiX = localThis.rect.multiplierX;
        let multiY = localThis.rect.multiplierY;
        let imgTop = (loadedImage.rect.top - _top) * multiY;
        let imgLeft = (loadedImage.rect.left - _left) * multiX;
        let imgWidth = loadedImage.rect.width * multiX;
        let imgHeight = loadedImage.rect.height * multiY;

        localThis.ctx.drawImage(loadedImage.image, imgLeft, imgTop, imgWidth, imgHeight);
      });
    }

    #row1() {
      const localThis = this;
      let row = helper.interface.buildRow();
      {
        let clearcanvas = helper.interface.buildButton('Clear');
        let savecanvas = helper.interface.buildButton('Save');

        clearcanvas.addEventListener('click', function (event) {
          localThis.pixelmanager.clear();
        });
        savecanvas.addEventListener('click', function (event) {
          localThis.pixelmanager.save();
        });

        row.appendAll(clearcanvas, savecanvas);
      }
      localThis.elements.section.append(row);
    }

    #row2() {
      const localThis = this;
      let row = helper.interface.buildRow();
      {
        let id = helper.generate.uuidv4();
        let makeGhostlyImage_input = helper.interface.buildTree('input', {
          type: 'file',
          id: id,
          hidden: true,
        });
        let makeGhostlyImage_label = helper.interface.buildTree(
          'label',
          { for: id, class: 'btn btn-outline-secondary' },
          ['Upload']
        );
        let deleteGhostlyImage_button = helper.interface.buildButton('Purge');
        deleteGhostlyImage_button.addEventListener('click', function (event) {
          localThis.loadedImages.forEach((img) => {
            localThis.#deleteGhostlyImage(img);
          });
        });

        function onChange() {
          if (!this.files || !this.files[0]) return;
          let myFileReader = new FileReader();
          myFileReader.addEventListener('load', (e) => {
            let base64 = e.target.result.replace('image/gif', 'image/png');
            localThis.#addGhostlyImage(base64);
          });
          myFileReader.readAsDataURL(this.files[0]);
        }
        makeGhostlyImage_input.addEventListener('change', onChange);

        row.appendAll(deleteGhostlyImage_button, makeGhostlyImage_input, makeGhostlyImage_label);
      }
      localThis.elements.section.append(row);
    }

    #row3() {
      const localThis = this;
      let row = helper.interface.buildRow();
      {
        row.append(localThis.GhostCanvas);
      }
      localThis.elements.section.append(localThis.ghostlyImageHandleList);
      localThis.elements.section.append(row);
    }
  }

  class GhostlyPixelManager {
    constructor(canvas = document.createElement('canvas')) {
      this.ctx = canvas.getContext('2d');
      this.imageDataRaw;
    }
    save() {
      this.imageDataRaw = this.ctx.getImageData(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
    clear() {
      this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
      this.imageDataRaw = null;
    }
  }

  let imageCounter = 0;
  let radioButtons = [];

  class GhostlyCanvasImage {
    elements;

    constructor(imagesrc = '', ondelete) {
      this.elements = {};
      this.imageid = imageCounter++;
      this.rect = {};
      this.image = helper.interface.buildTree('img', {
        src: imagesrc,
        style: 'position:fixed; top:50%; left:50%; z-index:9999; box-shadow: 0 0 1px 1px indigo inset;',
      });
      this.#init(ondelete);
    }

    #init(ondelete) {
      makeDragable(this.image, this.update.bind(this));
      document.body.append(this.image);
      this.update();
      this.#createHandle(ondelete);
    }

    update() {
      this.rect = this.image.getBoundingClientRect();
    }

    #createHandle(ondelete) {
      let id = helper.generate.uuidv4();
      let label = helper.interface.buildTree('label', { for: id, class: 'icon' }, [
        helper.interface.buildTree('img', { src: this.image.src }),
      ]);
      let input = helper.interface.buildTree('input', {
        hidden: true,
        name: 'test',
        type: 'radio',
        id: id,
      });
      let section = helper.interface.buildTree('section');

      let row = helper.interface.buildTree('div', { class: '_row' });
      {
        let localThis = this;
        let deleter = helper.interface.buildTree('button', { class: 'btn btn-outline-secondary' }, ['Delete Image']);
        deleter.onclick = function (event) {
          label.remove();
          input.remove();
          section.remove();
          localThis.image.remove();
          ondelete(localThis);
        };
        row.appendChild(deleter);
      }
      section.appendChild(row);

      radioButtons.push(input);

      this.image.addEventListener('mousedown', function (event) {
        label.click();
      });

      input.addEventListener('change', function (event) {
        radioButtons.forEach(function (radio) {
          document.body.querySelector(`label[for="${radio.id}"]`).classList.remove('active');
        });
        label.classList.add('active');
      });

      this.elements = {
        label: label,
        input: input,
        section: section,
      };
    }
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

  globalThis['test'] = GhostlyCanvasImage;
})('CubeEngine');
