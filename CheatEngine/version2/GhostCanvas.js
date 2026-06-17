// ==UserScript==
// @name         Cheat - GhostCanvas
// @namespace    https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version      1.0.0
// @description  Select Image and let the Bot work it's magic!
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

  var util = {
    intToHex: function (number) {
      return number.toString(16).padStart(2, '0');
    },
    rgbaArrayToHex: function (rgbaArray) {
      const r = this.intToHex(rgbaArray[0]);
      const g = this.intToHex(rgbaArray[1]);
      const b = this.intToHex(rgbaArray[2]);
      return '#' + r + g + b;
    },
    isSameColor: function (left, right, range = 0) {
      const r = left[0] - right[0] + range >= 0 && right[0] - left[0] + range >= 0;
      const g = left[1] - right[1] + range >= 0 && right[1] - left[1] + range >= 0;
      const b = left[2] - right[2] + range >= 0 && right[2] - left[2] + range >= 0;
      return r && g && b;
    },
    canvasPosition: function (max, pos) {
      return pos / max;
    },
    globalPosition: function (max, pos) {
      return pos * max;
    },
  };

  class GhostCanvas extends Cheat {
    static dummy = Cheat.set('Engine', this);

    constructor() {
      super();
      let self = this;
      this.elements.label.innerHTML = '<i class="fa-duotone fa-image-polaroid"></i>';

      this.mainCanvas = document.querySelector('canvas#canvas');
      this.ghostContainer = CodeMaid.createDOM.Tree('div', { style: 'position: absolute; opacity: .4;' });
      this.ghostCanvas = CodeMaid.createDOM.Tree('canvas', { style: 'border: 2px solid red;' });
      this.ctx = this.ghostCanvas.getContext('2d');
      this.mainCanvasRect = this.mainCanvas.getBoundingClientRect();
      this.ghostCanvasRect = this.ghostCanvas.getBoundingClientRect();
      this.ghostContainer.append(this.ghostCanvas);
      this.mainCanvas.after(this.ghostContainer);

      this.todoCounterElement = CodeMaid.createDOM.Tree('input', {
        type: 'number',
        readonly: true,
        autocomplete: false,
        class: 'itext',
        value: 0,
        title: 'Tasks to do',
      });
      this.socketSelectorElement = CodeMaid.createDOM.Tree('input', {
        type: 'number',
        class: 'itext',
        min: 0,
        value: 0,
        title: 'Index of Socket to use',
      });
      this.brushsizeElement = CodeMaid.createDOM.Tree('input', {
        type: 'number',
        class: 'itext icon',
        min: 2,
        value: 4,
        title: 'Brush Size',
      });
      this.enableGlitchElement = CodeMaid.createDOM.Tree('input', {
        type: 'checkbox',
        class: 'icon',
        title: 'Enable Glitch Effect?',
      });
      this.colorToleranceElement = CodeMaid.createDOM.Tree('input', {
        type: 'number',
        class: 'itext icon',
        min: 0,
        value: 20,
        title: 'Pixel Tolerance',
      });
      this.enableOptimizationElement = CodeMaid.createDOM.Tree('input', {
        type: 'checkbox',
        class: 'icon',
        title: 'Optimize Drawing?',
      });
      this.selectAlgorithmElement = CodeMaid.createDOM.Tree('select', {
        title: 'Select Algorithmus to calculate',
      });

      this.imageData = { raw: [] };
      this.pixelData = { all: [], colored: [] };
      this.uniqueColors = new Map();
      this.todo = [];
      this.done = [];
      this.drawingEnabled = false;
      this.socket = null;

      this.#row1();
      this.#row2();
      this.#row3();
      this.#row4();

      this.align();
      this.hide();
      this.getAlgorithm();
      globalThis['test'] = this;

      window.addEventListener('resize', function () {
        self.align();
      });
    }

    align() {
      this.mainCanvasRect = this.mainCanvas.getBoundingClientRect();

      this.ghostContainer.style.top = `${Math.floor(this.mainCanvasRect.top) - 2}px`;
      this.ghostContainer.style.left = `${Math.floor(this.mainCanvasRect.left) - 2}px`;
      this.ghostCanvas.width = Math.floor(this.mainCanvasRect.width);
      this.ghostCanvas.height = Math.floor(this.mainCanvasRect.height);

      this.ghostCanvasRect = this.ghostCanvas.getBoundingClientRect();
    }
    show() {
      this.ghostContainer.hidden = false;
    }
    hide() {
      this.ghostContainer.hidden = true;
    }
    drawImageToCanvas(image, offsetLeft, offsetTop, rotation, scalingfactor) {
      var imgHalfWidth = image.width / 2;
      var imgHalfHeight = image.height / 2;
      this.ctx.save();
      this.ctx.translate(offsetLeft, offsetTop);
      this.ctx.translate(imgHalfWidth, imgHalfHeight);
      this.ctx.rotate(rotation);
      this.ctx.translate(-imgHalfWidth * scalingfactor, -imgHalfHeight * scalingfactor);
      this.ctx.drawImage(image, 0, 0, image.width * scalingfactor, image.height * scalingfactor);
      this.ctx.restore();
    }
    #createImage(source) {
      let self = this;
      let ghostImage = CodeMaid.createDOM.Tree('img', {
        src: source,
        style: 'display: grid; position: absolute; border: 2px dashed var(--primary); top: 0; left: 0;',
      });
      let followGhostContainer = CodeMaid.createDOM.Tree('div', {
        class: 'icon-list',
        style: 'position: absolute; top:0; left:0;',
      });

      let rotate = CodeMaid.createDOM.Tree('input', {
        type: 'number',
        class: 'itext',
        style: 'width: 3rem',
        title: 'Rotation',
        value: 0,
      });
      let scale = CodeMaid.createDOM.Tree('input', {
        type: 'number',
        class: 'itext',
        style: 'width: 3rem',
        title: 'Scale',
        min: 0,
        value: 100,
      });
      let position_x = CodeMaid.createDOM.Tree('input', {
        type: 'number',
        class: 'itext',
        style: 'width: 3rem',
        title: 'X',
        value: 0,
      });
      let position_y = CodeMaid.createDOM.Tree('input', {
        type: 'number',
        class: 'itext',
        style: 'width: 3rem',
        title: 'Y',
        value: 0,
      });
      let remove = CodeMaid.createDOM.Tree('button', { class: 'icon itext', title: 'Delete' }, [
        CodeMaid.createDOM.FA('<i class="fa-duotone fa-trash"></i>'),
      ]);
      let stamp = CodeMaid.createDOM.Tree('button', { class: 'icon itext', title: 'Draw' }, [
        CodeMaid.createDOM.FA('<i class="fa-duotone fa-paint-roller"></i>'),
      ]);

      rotate.addEventListener('change', function () {
        ghostImage.style.transform = ` rotate(${rotate.value}deg) scale(${scale.value / 100}) `;
      });
      scale.addEventListener('change', function () {
        ghostImage.style.transform = ` rotate(${rotate.value}deg) scale(${scale.value / 100}) `;
      });
      position_x.addEventListener('change', function () {
        ghostImage.style.left = `${position_x.value}px`;
      });
      position_y.addEventListener('change', function () {
        ghostImage.style.top = `${position_y.value}px`;
      });
      remove.addEventListener('click', function () {
        ghostImage.remove();
        followGhostContainer.remove();
      });
      stamp.addEventListener('click', function () {
        var _pos_x = Number(ghostImage.style.left.slice(0, -2));
        var _pos_y = Number(ghostImage.style.top.slice(0, -2));
        var _scale = scale.value / 100;
        var _rotat = (Math.PI / 180) * rotate.value;
        self.drawImageToCanvas(ghostImage, _pos_x, _pos_y, _rotat, _scale);
      });

      followGhostContainer.appendAll(rotate, scale, position_x, position_y, stamp, remove);

      followGhostContainer.elem_x = position_x;
      followGhostContainer.elem_y = position_y;
      followGhostContainer.scale = scale;

      this.ghostContainer.append(ghostImage);
      this.ghostContainer.append(followGhostContainer);

      let drag = dragElement(ghostImage);
      drag.setFollower(followGhostContainer);
    }
    #row1() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        let toggle = CodeMaid.createDOM.Tree('input', {
          type: 'checkbox',
          class: 'icon',
          title: 'Toggle Ghostcanvas',
        });

        toggle.addEventListener('change', function () {
          toggle.checked ? self.show() : self.hide();
        });

        row.append(toggle);
      }
      {
        let id = CodeMaid.generate.uuidv4();
        let uploadImageInput = CodeMaid.createDOM.Tree('input', { type: 'file', id, hidden: true });
        let uploadImageLabel = CodeMaid.createDOM.Tree(
          'label',
          { for: id, class: 'btn btn-outline-secondary', title: 'Upload Image' },
          ['Upload Image']
        );

        function onChange() {
          if (!this.files || !this.files[0]) return;
          let myFileReader = new FileReader();
          myFileReader.addEventListener('load', (event) => {
            self.#createImage(event.target.result);
            self.log('info', `Image Loaded`);
          });
          myFileReader.readAsDataURL(this.files[0]);
        }
        uploadImageInput.addEventListener('change', onChange);

        row.appendAll(uploadImageInput, uploadImageLabel);
      }
      {
        let reset = CodeMaid.createDOM.Button('<i class="fa-duotone fa-broom-wide"></i>');
        reset.classList.add('icon');
        reset.title = 'Reset all Data';
        reset.addEventListener('click', function () {
          self.align();
          self.imageData = {};
          self.pixelData = {};
          self.todo = [];
          self.done = [];
          self.todoCounterElement.value = self.todo.length;
        });
        row.append(reset);
      }
      self.elements.body.append(row);
    }
    #row2() {
      let row = CodeMaid.createDOM.Row();

      row.append(this.enableGlitchElement);
      row.append(this.selectAlgorithmElement);
      row.append(this.brushsizeElement);
      row.append(this.enableOptimizationElement);
      row.append(this.colorToleranceElement);

      this.elements.body.append(row);
    }
    #row3() {
      let self = this;
      let row = CodeMaid.createDOM.Row();

      row.append(this.todoCounterElement);
      {
        let applyMethode = CodeMaid.createDOM.Button('<i class="fa-duotone fa-check"></i>');
        applyMethode.classList.add('icon');
        applyMethode.title = 'Load Todo with selected Algorithmus';

        applyMethode.addEventListener('click', function () {
          self.saveState();
          self.getColoredpixelData();
          self.applyAlgorithm();
        });

        row.append(applyMethode);
      }
      this.elements.body.append(row);
    }
    #row4() {
      let self = this;
      let row = CodeMaid.createDOM.Row();
      {
        this.socketSelectorElement.addEventListener('change', function () {
          self.socket = scope['sockets'][self.socketSelectorElement.value];
        });
        row.append(this.socketSelectorElement);
      }
      {
        let start = CodeMaid.createDOM.Button('Start');
        start.title = 'Start the Auto Drawing';

        start.addEventListener('click', function () {
          self.socket = scope['sockets'][self.socketSelectorElement.value];
          if (!self.socket) return self.log('error', 'No Socket selected');
          self.drawingEnabled = true;
          self.doTasks();
        });

        row.append(start);
      }
      {
        let stop = CodeMaid.createDOM.Button('Stop');
        stop.title = 'Stop the Auto Drawing';

        stop.addEventListener('click', function () {
          self.drawingEnabled = false;
        });

        row.append(stop);
      }
      {
        let clear = CodeMaid.createDOM.Button('Clear');
        clear.title = 'Clear the Game Canvas';

        clear.addEventListener('click', function () {
          if (!self.socket) return self.log('error', 'No Socket selected');
          self.draw({ sx: 0.5, sy: 0.5, ex: 0.5, ey: 0.5, size: 2000, color: 'white' });
        });

        row.append(clear);
      }
      this.elements.body.append(row);
    }

    saveState() {
      const data = this.getImageData();
      const imageDataArray = [];
      for (let i = 0; i < data.length; i += 4) {
        const x = (i * 0.25) % this.ghostCanvasRect.width;
        const y = Math.floor((i * 0.25) / this.ghostCanvasRect.width);

        const r = data[i + 0];
        const g = data[i + 1];
        const b = data[i + 2];
        const color = data[i + 3] > 20 ? [r, g, b] : [0, 0, 0];

        imageDataArray[i * 4] = {
          sx: util.canvasPosition(this.ghostCanvasRect.width, x),
          sy: util.canvasPosition(this.ghostCanvasRect.height, y),
          ex: util.canvasPosition(this.ghostCanvasRect.width, x),
          ey: util.canvasPosition(this.ghostCanvasRect.height, y),
          size: 3,
          color,
        };
      }
      return (this.pixelData.all = imageDataArray);
    }
    getImageData() {
      return (this.imageData.raw = this.ctx.getImageData(
        0,
        0,
        this.ghostCanvasRect.width,
        this.ghostCanvasRect.height
      ).data);
    }
    getColoredpixelData() {
      if (!this.pixelData.all) this.saveState();
      return (this.pixelData.colored = this.pixelData.all.filter((pxl) => {
        return !util.isSameColor(pxl.color, [0, 0, 0], 0);
      }));
    }
    getUniqueColors(tolerance = 20) {
      let uniqueColors = new Map();
      let localPixels = this.pixelData.colored.slice();

      while (localPixels.length > 0) {
        let pixel = localPixels[0];

        let group = localPixels.filter(function (_pixel) {
          return util.isSameColor(_pixel.color, pixel.color, tolerance);
        });

        localPixels = localPixels.filter((pixel) => !group.includes(pixel));

        uniqueColors.set(pixel.color, group);
      }

      return (this.uniqueColors = uniqueColors);
    }

    getAlgorithm() {
      let option1 = CodeMaid.createDOM.Tree('option', { value: '1' }, ['By Row']);
      let option2 = CodeMaid.createDOM.Tree('option', { value: '2' }, ['by Column']);
      let option3 = CodeMaid.createDOM.Tree('option', { value: '3' }, ['by Color']);
      this.selectAlgorithmElement.appendAll(option1, option2, option3);
    }
    applyAlgorithm() {
      let algorithm = Number(this.selectAlgorithmElement.value);
      let tolerance = Number(this.colorToleranceElement.value);
      let optimize = Boolean(this.enableOptimizationElement.checked);
      let glitcheffect = Boolean(this.enableGlitchElement.checked);
      let brushsize = Number(this.brushsizeElement.value);

      let data = this.pixelData.colored;
      if (data.length <= 0) return this.log('warn', 'No Data to draw');

      let arg1 = 'sx';
      let arg2 = 'sy';

      if (Number(algorithm) == 1) {
        arg1 = 'sy';
        arg2 = 'sx';
        data.sort(compareNumber);
      } else {
        arg1 = 'sx';
        arg2 = 'sy';
        data.sort(compareNumber);
      }
      if (Number(algorithm) == 3) {
        let mydata = [];
        this.getUniqueColors(tolerance);
        let keys = [...this.uniqueColors.keys()];
        keys.forEach((key) => {
          mydata.push(...this.uniqueColors.get(key));
        });
        data = mydata;
      }

      function compareNumber(a, b) {
        return a[arg1] - b[arg1];
      }

      if (optimize) {
        let mydata = [];
        if (data.length <= 0) return;
        let pixel = data[0];
        for (let i = 0; i < data.length - 1; i++) {
          let pixelThis = data[i];
          let pixelNext = data[i + 1];

          if (
            pixelThis[arg1] != pixelNext[arg1] ||
            Math.floor(((pixelNext[arg2] - pixelThis[arg2]) * 1000).toFixed(3)) > 2 ||
            !util.isSameColor(glitcheffect ? pixelThis.color : pixel.color, pixelNext.color, tolerance)
          ) {
            pixel.ex = pixelThis.ex;
            pixel.ey = pixelThis.ey;
            pixel.size = brushsize;
            mydata.push(pixel);
            pixel = pixelNext;
          }
        }
        mydata.push(data[data.length - 1]);
        data = mydata;
      }

      this.todo = data;
      this.todoCounterElement.value = this.todo.length;
    }

    doTask() {
      this.doTasks(1);
    }
    doTasks(limit = this.todo.length) {
      this.todoCounterElement.value = this.todo.length;
      if (!this.drawingEnabled || limit <= 0) return this.log('info', 'Tasks Completed');
      limit--;
      setTimeout(() => {
        var task = this.todo.shift();
        if (!task) return this.log('info', 'Tasks Completed');
        this.draw(task);
        this.done.push(task);
        this.doTasks(limit);
      }, 1);
    }
    draw(pixel) {
      let { sx, sy, ex, ey, size, color } = pixel;
      if (CodeMaid.validate.isArray(color)) {
        color = util.rgbaArrayToHex(color);
      }
      this.socket.send(`42["drawcmd",0,[${sx},${sy},${ex},${ey},false,-${size},"${color}",0]]`);
    }
  }

  function dragElement(mainElement) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0,
      followerElement = null;
    mainElement.onmousedown = dragMouseDown;

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
      mainElement.style.top = mainElement.offsetTop - pos2 + 'px';
      mainElement.style.left = mainElement.offsetLeft - pos1 + 'px';

      if (followerElement) {
        followerElement.style.top = mainElement.offsetTop + mainElement.offsetHeight * 0.5 + 'px';
        followerElement.style.left = mainElement.offsetLeft + mainElement.offsetWidth * 0.5 + 'px';
        followerElement.elem_y.value = mainElement.offsetTop - pos2;
        followerElement.elem_x.value = mainElement.offsetLeft - pos1;
      }
    }

    function closeDragElement() {
      /* stop moving when mouse button is released:*/
      document.onmouseup = null;
      document.onmousemove = null;
    }

    function setFollower(element) {
      followerElement = element;
    }
    return { setFollower };
  }
})(globalThis);
