// ==UserScript==
// @name         Player Engine
// @version      3.1.1
// @description  Botable Player for autodrawing
// @namespace    drawaria.modded.fullspec
// @homepage     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://drawaria.online/
// @match        https://drawaria.online/room/*
// @icon         https://drawaria.online/avatar/cache/e53693c0-18b1-11ec-b633-b7649fa52d3f.jpg
// @grant        none
// @license      GNU GPLv3
// @run-at       document-end
// ==/UserScript==

(function () {
  'use strict';
  const EL = (sel) => document.querySelector(sel);
  const ELL = (sel) => document.querySelectorAll(sel);

  let drawing_active = false;
  let myCanvas = document.createElement('canvas');
  let gameCanvas = document.getElementById('canvas');
  var data;

  let cw = myCanvas.width;
  let ch = myCanvas.height;

  let executionLine = [];
  window.ignoreColors = [];
  window.onMessageTest = function (msg) {};

  window.myRoom = {};
  window.sockets = [];

  const originalSend = WebSocket.prototype.send;
  WebSocket.prototype.send = function (...args) {
    if (window.sockets.indexOf(this) === -1) {
      window.sockets.push(this);
      this.addEventListener('message', (event) => {
        // console.debug(event)
        let message = String(event.data);
        if (message.startsWith('42')) {
          let payload = JSON.parse(message.slice(2));
          window.onMessageTest(payload);
          if (payload[0] == 'bc_uc_freedrawsession_changedroom') {
            window.myRoom.players = payload[3];
          }
          if (payload[0] == 'mc_roomplayerschange') {
            window.myRoom.players = payload[3];
          }
        } else if (message.startsWith('41')) {
          // this.send(40)
        } else if (message.startsWith('430')) {
          let configs = JSON.parse(message.slice(3))[0];
          window.myRoom.players = configs.players;
          window.myRoom.id = configs.roomid;
        }
      });
    }
    return originalSend.call(this, ...args);
  };

  // include Stylesheet for Boxicons
  function addBoxIcons() {
    let boxicons = document.createElement('link');
    boxicons.href = 'https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css';
    boxicons.rel = 'stylesheet';
    document.head.appendChild(boxicons);
  }
  addBoxIcons();

  // Header

  let CheatStyles; // Custom Stylesheet
  let CheatEngine; // Main Body with Cheat Elements
  let CheatActivator; // Secondary Body for activation of Main Body
  let CheatEngine_ModuleContainer; // Container for modules

  function createCheatEngine() {
    CheatEngine = document.createElement('div');
    CheatEngine.id = 'CheatEngine';
    CheatEngine.className = 'Cheat-hidden';
    CheatEngine_ModuleContainer = document.createElement('section');
    CheatEngine_ModuleContainer.className = 'Cheat-modulecontainer';

    CheatEngine.appendChild(CheatEngine_ModuleContainer);
    document.querySelector('#invurl').parentElement.after(CheatEngine);

    EL('#drawwidthrange').min = '-2000';
    EL('#drawwidthrange').max = '48';
  }
  createCheatEngine();

  function createCheatActivator() {
    CheatActivator = document.createElement('div');
    CheatActivator.id = 'CheatActivator';
    CheatActivator.className = 'Cheat input-group-append';

    let CheatActivator_togglebtn;
    CheatActivator_togglebtn = document.createElement('button');
    CheatActivator_togglebtn.className = 'Cheat-tglbtn btn btn-outline-secondary';
    CheatActivator_togglebtn.innerHTML = '<i class="bx bx-code-alt"></i>';
    CheatActivator_togglebtn.addEventListener('click', (e) => {
      e.preventDefault();
      CheatActivator_togglebtn.classList.toggle('active');
      CheatActivator_togglebtn.classList.contains('active')
        ? CheatEngine.classList.remove('Cheat-hidden')
        : CheatEngine.classList.add('Cheat-hidden');
    });
    CheatActivator.appendChild(CheatActivator_togglebtn);
    document.querySelector('#chatbox_textinput').parentElement.lastChild.after(CheatActivator);
  }
  createCheatActivator();

  function createCheatStyles() {
    CheatStyles = document.createElement('style');
    CheatStyles.innerHTML =
      '.playerlist-row::after{ content: attr(data-playerid); }' +
      '#CheatEngine { width:100%; max-height: 200px; }' +
      '.Cheat-hidden { display: none }' +
      '.Cheat-modulecontainer { overflow-x: hidden; }' +
      '.Cheat-module { border: 1px solid cornflowerblue; display: flex; }' +
      '#CheatEngine span { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; }' +
      '#CheatActivator { color: #400080 }' +
      '.Cheat-tglbtn:focus { outline: none; box-shadow: none }';
    document.head.appendChild(CheatStyles);
  }
  createCheatStyles();

  // Add your cheats below

  function enemyController() {
    CheatStyles.innerHTML +=
      '.tamper-container { display: grid; grid-template-columns: 25% 75%; }' + '.tamper-item { text-align: left; }';

    const cheat1 = document.createElement('div');
    cheat1.className = 'tamper-container Cheat-module';
    const roomplayerid = document.createElement('input');
    roomplayerid.className = 'tamper-item';
    roomplayerid.type = 'number';
    roomplayerid.min = '-1';
    roomplayerid.value = '-1';
    const datacontainer = document.createElement('input');
    datacontainer.className = 'tamper-item';
    datacontainer.type = 'text';
    datacontainer.value = '';
    cheat1.appendChild(roomplayerid);
    cheat1.appendChild(datacontainer);

    datacontainer.addEventListener('keyup', (e) => {
      if (e.key == 'Enter') {
        window.sockets[0].send(
          `42["clientnotify",${roomplayerid.value},1,[true,"<style>.systemchatmessage{display: none !important;}</style>"]]`
        );
        window.sockets[0].send(`42["clientnotify",${roomplayerid.value},1,[true,"${datacontainer.value}"]]`);
        datacontainer.value = '';
      }
    });
    CheatEngine_ModuleContainer.appendChild(cheat1);
  }
  enemyController();

  // ImageUploader

  function createImageLoader() {
    let container = document.createElement('div');
    container.className = 'Cheat-module';
    let IPutImage = document.createElement('input');
    IPutImage.type = 'file';
    IPutImage.id = 'IPutImage';

    function readImage() {
      if (!this.files || !this.files[0]) return;

      const FR = new FileReader();
      FR.addEventListener('load', (evt) => {
        // get base64 string of image and apply to image src
        let base64 = evt.target.result;
        // load the image
        var img = new Image();
        img.addEventListener('load', () => {
          myCanvas.width = gameCanvas.width;
          myCanvas.height = gameCanvas.height;

          cw = myCanvas.width;
          ch = myCanvas.height;

          var ctx = myCanvas.getContext('2d');

          // center and resize image

          let modifier = 1;
          if (img.width > myCanvas.width) {
            modifier = myCanvas.width / img.width;
          } else {
            modifier = myCanvas.height / img.height;
          }

          console.log(modifier);

          // draw the image
          // (this time to grab the image's pixel data
          ctx.drawImage(img, 0, 0, img.width * modifier, img.height * modifier);

          // grab the image's pixel data
          var imgData = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
          data = imgData.data;

          // clear the canvas to draw the glow
          ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
          console.debug('ready');
        });
        img.crossOrigin = 'anonymous';
        img.src = base64;
      });
      // read Image
      FR.readAsDataURL(this.files[0]);
    }

    IPutImage.addEventListener('change', readImage);
    container.appendChild(IPutImage);
    CheatEngine_ModuleContainer.appendChild(container);
  }
  createImageLoader();

  function createBotControl() {
    let container = document.createElement('div');
    container.className = 'Cheat-module';
    let joinme = document.createElement('div');
    let leave = document.createElement('div');
    let clean = document.createElement('div');

    joinme.innerHTML = "<i class='bx bx-user-plus'><span>Join</span></i>";
    leave.innerHTML = "<i class='bx bx-user-minus'><span>Leave</span></i>";
    clean.innerHTML = "<i class='bx bxs-eraser'><span>Clear</span></i>";

    function botjoin() {
      bot.room.join(EL('#invurl').value);
    }
    function botleave() {
      bot.conn.close();
    }
    function cleanCanvas() {
      bot.action.DrawLine(50, 50, 50, 50, 2000);
    }

    joinme.addEventListener('mousedown', botjoin);
    leave.addEventListener('mousedown', botleave);
    clean.addEventListener('mousedown', cleanCanvas);

    container.appendChild(joinme);
    container.appendChild(leave);
    container.appendChild(clean);
    CheatEngine_ModuleContainer.appendChild(container);
  }
  createBotControl();

  function createDrawControlls() {
    let container = document.createElement('div');
    container.className = 'Cheat-module';
    let stopDrawing = document.createElement('div');
    let startDrawing = document.createElement('div');

    stopDrawing.style.width = '50%';
    startDrawing.style.width = '50%';

    stopDrawing.innerHTML = '<i class="bx bx-stop-circle"><span>Stop Drawing</span></i>';
    startDrawing.innerHTML = '<i class="bx bx-play-circle"><span>Start Drawing</span></i>';

    function stopCode() {
      drawing_active = false;
    }

    function startCode() {
      execute(bot.conn.socket);
    }

    stopDrawing.addEventListener('mousedown', stopCode);
    startDrawing.addEventListener('mousedown', startCode);
    container.appendChild(startDrawing);
    container.appendChild(stopDrawing);
    CheatEngine_ModuleContainer.appendChild(container);
  }
  createDrawControlls();

  // Get Transparent pixels in image data
  function defineNonTransparent(x, y) {
    var a = data[(y * myCanvas.width + x) * 4 + 3];
    return a > 20;
  }

  // recalculate cordinates to fit on game canvas in %
  function recalc(value, size, offset) {
    return [(value[0] / (cw * size) + offset.x / 100).toFixed(4), (value[1] / (ch * size) + offset.y / 100).toFixed(4)];
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async function execute(socket) {
    drawing_active = true;
    for (let i = 0; i < executionLine.length; i++) {
      if (!drawing_active) return;
      let currentLine = executionLine[i];
      let p1 = currentLine.pos1,
        p2 = currentLine.pos2,
        color = currentLine.color,
        thickness = currentLine.thickness;
      if (window.ignoreColors.includes(color)) {
      } else {
        drawcmd(socket, p1, p2, color, thickness);
        await delay(10);
      }
    }
  }

  // draw Line
  function drawcmd(s, start, end, color, thickness) {
    s.send(`42["drawcmd",0,[${start[0]},${start[1]},${end[0]},${end[1]},false,${0 - thickness},"${color}",0,0,{}]]`);
  }

  function loadImage(url) {
    // load the image
    var img = new Image();
    img.addEventListener('load', () => {
      myCanvas.width = gameCanvas.width;
      myCanvas.height = gameCanvas.height;

      cw = myCanvas.width;
      ch = myCanvas.height;

      var ctx = myCanvas.getContext('2d');

      // center and resize image

      let modifier = 1;
      if (img.width > myCanvas.width) {
        modifier = myCanvas.width / img.width;
      } else {
        modifier = myCanvas.height / img.height;
      }

      // draw the image
      // (this time to grab the image's pixel data
      ctx.drawImage(img, 0, 0, img.width * modifier, img.height * modifier);

      // grab the image's pixel data
      var imgData = ctx.getImageData(0, 0, myCanvas.width, myCanvas.height);
      data = imgData.data;

      // clear the canvas to draw the glow
      ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
      console.debug('ready');
    });
    img.crossOrigin = 'anonymous';
    img.src = url;
  }

  function drawImage(size, modifier = 1, thickness = 5, offset = { x: 0, y: 0 }) {
    executionLine = [];
    for (let y = 0; y < ch; y += size * modifier) {
      let start = [0, y];

      for (let x = 0; x < ch; x += size * modifier) {
        let end = [x, y];
        let index = (y * cw + x) * 4;

        let a = data[index + 3];

        if (a > 20) {
          end = [x, y];
          // Is not Transparent
          let r = data[index + 0],
            g = data[index + 1],
            b = data[index + 2];

          let color = `rgb(${r},${g},${b})`;

          if (x < cw - 1) {
            let n_r = data[index + size * modifier * 4 + 4],
              n_g = data[index + size * modifier * 4 + 5],
              n_b = data[index + size * modifier * 4 + 6];

            let samecolor = true;
            // check if the next pixel is same color as the last
            if (r != n_r) {
              samecolor = false;
            }
            if (g != n_g) {
              samecolor = false;
            }
            if (b != n_b) {
              samecolor = false;
            }
            if (data[index + 7] < 20) {
              samecolor = false;
            }
            if (!samecolor) {
              executionLine.push({
                pos1: recalc(start, size, offset),
                pos2: recalc(end, size, offset),
                color: color,
                thickness: thickness,
              });
              start = [x, y];
            }
          } else {
            executionLine.push({
              pos1: recalc(start, size, offset),
              pos2: recalc(end, size, offset),
              color: color,
              thickness: thickness,
            });
          }
        } else {
          // Is Transparent
          start = [x, y];
        }
      }
    }
    console.debug('done Loading');
  }

  function drawOutline(size, color = 'rgb(0,0,0)', thickness = 5, offset = { x: 0, y: 0 }) {
    executionLine = [];
    // call the marching ants algorithm
    // to get the outline path of the image
    // (outline=outside path of transparent pixels
    var points = geom.contour(defineNonTransparent);

    points.push(points[0]);
    for (let i = 0; i < points.length - 1; i++) {
      let p1 = recalc(points[i], size, offset);
      let p2 = recalc(points[i + 1], size, offset);

      if (p1[0] > 1 || p1[1] > 1) {
      } else {
        executionLine.push({
          pos1: p1,
          pos2: p2,
          color: color,
          thickness: thickness,
        });
      }
    }
    console.debug('done Loading');
  }

  function drawPixelart(size, space, thickness, offset = { x: 0, y: 0 }) {
    executionLine = [];
    for (let x = 0; x < cw; x += space) {
      for (let y = 0; y < ch; y += space) {
        let index = (y * cw + x) * 4;

        let r = data[index + 0];
        let g = data[index + 1];
        let b = data[index + 2];
        if (data[index + 3] > 20) {
          let p = recalc([x, y], size, offset);
          if (p[0] > 1 || p[1] > 1) {
          } else {
            executionLine.push({
              pos1: p,
              pos2: p,
              color: `rgb(${r},${g},${b})`,
              thickness: thickness,
            });
          }
        }
      }
    }
    console.debug('done Loading');
  }

  window.loadImage = loadImage;
  window.drawImage = drawImage;
  window.drawOutline = drawOutline;
  window.drawPixelart = drawPixelart;
  window.executeAll = execute;

  // Marching Ants Algorythmus
  var geom = {};
  geom.contour = function (grid, start) {
    var s = start || d3_geom_contourStart(grid), // starting point
      c = [], // contour polygon
      x = s[0], // current x position
      y = s[1], // current y position
      dx = 0, // next x direction
      dy = 0, // next y direction
      pdx = NaN, // previous x direction
      pdy = NaN, // previous y direction
      i = 0;

    do {
      // determine marching squares index
      i = 0;
      if (grid(x - 1, y - 1)) i += 1;
      if (grid(x, y - 1)) i += 2;
      if (grid(x - 1, y)) i += 4;
      if (grid(x, y)) i += 8;

      // determine next direction
      if (i === 6) {
        dx = pdy === -1 ? -1 : 1;
        dy = 0;
      } else if (i === 9) {
        dx = 0;
        dy = pdx === 1 ? -1 : 1;
      } else {
        dx = d3_geom_contourDx[i];
        dy = d3_geom_contourDy[i];
      }

      // update contour polygon
      if (dx != pdx && dy != pdy) {
        c.push([x, y]);
        pdx = dx;
        pdy = dy;
      }

      x += dx;
      y += dy;
    } while (s[0] != x || s[1] != y);

    return c;
  };

  // lookup tables for marching directions
  var d3_geom_contourDx = [1, 0, 1, 1, -1, 0, -1, 1, 0, 0, 0, 0, -1, 0, -1, NaN];
  var d3_geom_contourDy = [0, -1, 0, 0, 0, -1, 0, 0, 1, -1, 1, 1, 0, -1, 0, NaN];

  function d3_geom_contourStart(grid) {
    var x = 0,
      y = 0;

    // search for a starting point; begin at origin
    // and proceed along outward-expanding diagonals
    while (true) {
      if (grid(x, y)) {
        return [x, y];
      }
      if (x === 0) {
        x = y + 1;
        y = 0;
      } else {
        x = x - 1;
        y = y + 1;
      }
    }
  }
})();
