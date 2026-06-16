// ==UserScript==
// @name         Player Engine
// @version      4.7.1
// @description  Botable Player for autodrawing with User Interface
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

(() => {
  'use strict';
  const EL = (sel) => document.querySelector(sel);
  const ELL = (sel) => document.querySelectorAll(sel);

  // Minor Drawing Tools Tweak

  EL('#drawwidthrange').min = '-2000';
  EL('#drawwidthrange').max = '48';

  // Adding Drawing Tools

  let drawing_active = false;
  let previewCanvas = document.createElement('canvas');
  let originalCanvas = document.getElementById('canvas');
  var data;

  let cw = previewCanvas.width;
  let ch = previewCanvas.height;

  let executionLine = [];

  // Room & Socket Controll

  window.myRoom = {};
  window.sockets = [];

  const originalSend = WebSocket.prototype.send;
  WebSocket.prototype.send = function (...args) {
    if (window.sockets.indexOf(this) === -1) {
      window.sockets.push(this);
      if (window.sockets.indexOf(this) === 0) {
        this.addEventListener('message', (event) => {
          // console.debug(event)
          let message = String(event.data);
          if (message.startsWith('42')) {
            let payload = JSON.parse(message.slice(2));
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
    }
    return originalSend.call(this, ...args);
  };

  // Add Boxicons Stylesheet

  function addBoxIcons() {
    let boxicons = document.createElement('link');
    boxicons.href = 'https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css';
    boxicons.rel = 'stylesheet';
    document.head.appendChild(boxicons);
  }
  addBoxIcons();

  // Add Stylesheet

  function CreateStylesheet() {
    let container = document.createElement('style');
    container.innerHTML =
      '.hidden { display: none; } ' +
      '.playerlist-row::after { content: attr(data-playerid); } ' +
      '.cheat-row { display:flex; width:100%; } ' +
      '.cheat-border { width: 100%; text-align: center; line-height: inherit; margin: 1px; border: 1px solid coral; } ';
    document.head.appendChild(container);
  }
  CreateStylesheet();

  // Add CheatActivator & CheatContainer

  function ModEngine() {
    let CheatContainer = document.createElement('div');
    CheatContainer.id = 'Engine-Cheatcontainer';
    CheatContainer.classList.toggle('hidden');
    document.getElementById('chatbox_messages').after(CheatContainer);

    function CreateToggleButton(Cheatcontainer) {
      let target = document.getElementById('chatbox_textinput');
      let btncontainer = document.createElement('div');
      btncontainer.id = 'togglecheats';
      btncontainer.className = 'input-group-append';

      let togglebtn;
      togglebtn = document.createElement('button');
      togglebtn.className = 'btn btn-outline-secondary';
      togglebtn.innerHTML = '<i class="bx bx-code-alt"></i>';
      togglebtn.addEventListener('click', (e) => {
        e.preventDefault();
        togglebtn.classList.toggle('active');
        togglebtn.classList.contains('active')
          ? Cheatcontainer.classList.remove('hidden')
          : Cheatcontainer.classList.add('hidden');
      });
      btncontainer.appendChild(togglebtn);
      target.after(btncontainer);
    }
    CreateToggleButton(CheatContainer);

    function ChatInjector(CheatContainer) {
      let ciContainer = document.createElement('div');

      ciContainer.innerHTML =
        "<div class='cheat-row'><i class='bx bx-refresh cheat-border' id='playerrefresh'></i><select class='cheat-border' id='playerselector'></select></div>" +
        "<div class='cheat-row'><input type='text' class='cheat-border' id='ci-messagebox'></input></div>";

      CheatContainer.appendChild(ciContainer);

      let msgbox = document.getElementById('ci-messagebox');
      let playerselect = document.getElementById('playerselector');

      document.getElementById('playerrefresh').addEventListener('click', (e) => {
        let playerlist = [`<option>-1</option>`];
        try {
          window.myRoom.players.forEach((player) => {
            playerlist.push(`<option>${player.id}</option>`);
          });
        } catch (error) {}
        playerselect.innerHTML = playerlist.join('');
      });

      msgbox.addEventListener('keyup', (e) => {
        if (e.key == 'Enter') {
          window.sockets[0].send(
            `42["clientnotify",${playerselect.value},1,[true,"<style>.systemchatmessage {display: none !important;}</style>"]]`
          );
          window.sockets[0].send(
            `42["clientnotify",${playerselect.value},1,[true,"${msgbox.value.replaceAll('"', '\\"')}"]]`
          );
          msgbox.value = '';
        }
      });
    }
    ChatInjector(CheatContainer);

    function ImageLoader(CheatContainer) {
      let container = document.createElement('div');

      let row = document.createElement('div');
      row.className = 'cheat-row';

      let IPutImage = document.createElement('input');
      IPutImage.type = 'file';
      IPutImage.id = 'IPutImage';
      IPutImage.className = 'cheat-border';

      function readImage() {
        if (!this.files || !this.files[0]) return;

        const FR = new FileReader();
        FR.addEventListener('load', (evt) => {
          // get base64 string of image and apply to image src
          let base64 = evt.target.result;
          // load the image
          loadImage(base64);
        });
        // read Image
        FR.readAsDataURL(this.files[0]);
      }

      IPutImage.addEventListener('change', readImage);
      row.appendChild(IPutImage);
      container.appendChild(row);
      CheatContainer.appendChild(container);
    }
    ImageLoader(CheatContainer);

    function BotControl(CheatContainer) {
      let container = document.createElement('div');
      container.innerHTML =
        "<div class='cheat-row'><i class='bx bx-user-plus cheat-border' id='botJoin'><span>Join</span></i><i class='bx bx-fast-forward cheat-border' id='botNext'><span>Next</span></i><i class='bx bx-user-minus cheat-border' id='botLeave'><span>Leave</span></i><i class='bx bxs-eraser cheat-border' id='canvasClear'><span>Clear</span></i></div>";

      CheatContainer.appendChild(container);
      document.getElementById('botJoin').addEventListener('mousedown', (e) => {
        bot.room.join(EL('#invurl').value);
      });
      document.getElementById('botNext').addEventListener('mousedown', (e) => {
        bot.room.next();
      });
      document.getElementById('botLeave').addEventListener('mousedown', (e) => {
        bot.socket.close();
      });
      document.getElementById('canvasClear').addEventListener('mousedown', (e) => {
        bot.actions.DrawLine(50, 50, 50, 50, 2000);
      });
    }
    BotControl(CheatContainer);

    function DrawingControls(CheatContainer) {
      let container = document.createElement('div');
      container.innerHTML =
        '<div class="cheat-row"><i class="bx bx-play-circle cheat-border" id="botStartDrawing"><span>Start Drawing</span></i><i class="bx bx-stop-circle cheat-border" id="botStopDrawing"><span>Stop Drawing</span></i></div>';
      CheatContainer.appendChild(container);
      document.getElementById('botStopDrawing').addEventListener('mousedown', (e) => {
        drawing_active = false;
      });
      document.getElementById('botStartDrawing').addEventListener('mousedown', (e) => {
        execute(bot.socket);
      });
    }
    DrawingControls(CheatContainer);
  }
  ModEngine();

  function loadImage(url) {
    // load the image
    var img = new Image();
    img.addEventListener('load', () => {
      previewCanvas.width = originalCanvas.width;
      previewCanvas.height = originalCanvas.height;

      cw = previewCanvas.width;
      ch = previewCanvas.height;

      var ctx = previewCanvas.getContext('2d');

      // center and resize image

      let modifier = 1;
      if (img.width > previewCanvas.width) {
        modifier = previewCanvas.width / img.width;
      } else {
        modifier = previewCanvas.height / img.height;
      }

      // draw the image
      // (this time to grab the image's pixel data
      ctx.drawImage(img, 0, 0, img.width * modifier, img.height * modifier);

      // grab the image's pixel data
      var imgData = ctx.getImageData(0, 0, previewCanvas.width, previewCanvas.height);
      data = imgData.data;

      // clear the canvas to draw the glow
      ctx.clearRect(0, 0, previewCanvas.width, previewCanvas.height);
      console.debug('ready');
    });
    img.crossOrigin = 'anonymous';
    img.src = url;
  }

  function drawImage(size, modifier = 1, thickness = 5, offset = { x: 0, y: 0 }, ignorcolors = []) {
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

          if (!ignorcolors.includes(color)) {
            if (x < cw - 1) {
              let n_r = data[index + size * modifier * 4 + 4],
                n_g = data[index + size * modifier * 4 + 5],
                n_b = data[index + size * modifier * 4 + 6];

              let samecolor = true;
              // check if the next pixel is same color as the last
              if ((r != n_r && g != n_g && b != n_b) || data[index + 7] < 20) {
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

  function drawPixelart(size, space, thickness, offset = { x: 0, y: 0 }, ignorcolors = []) {
    executionLine = [];
    for (let x = 0; x < cw; x += space) {
      for (let y = 0; y < ch; y += space) {
        let index = (y * cw + x) * 4;

        let r = data[index + 0];
        let g = data[index + 1];
        let b = data[index + 2];
        let color = `rgb(${r},${g},${b})`;

        if (!ignorcolors.includes(color))
          if (data[index + 3] > 20) {
            let p = recalc([x, y], size, offset);
            if (p[0] > 1 || p[1] > 1) {
            } else {
              executionLine.push({
                pos1: p,
                pos2: p,
                color: color,
                thickness: thickness,
              });
            }
          }
      }
    }
    console.debug('done Loading');
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
      drawcmd(socket, p1, p2, color, thickness);
      await delay(10);
    }
    function drawcmd(s, start, end, color, thickness) {
      s.send(`42["drawcmd",0,[${start[0]},${start[1]},${end[0]},${end[1]},false,${0 - thickness},"${color}",0,0,{}]]`);
    }
  }

  function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  function defineNonTransparent(x, y) {
    var a = data[(y * previewCanvas.width + x) * 4 + 3];
    return a > 20;
  }

  function recalc(value, size, offset) {
    return [(value[0] / (cw * size) + offset.x / 100).toFixed(4), (value[1] / (ch * size) + offset.y / 100).toFixed(4)];
  }

  window.loadImage = loadImage;
  window.drawImage = drawImage;
  window.drawOutline = drawOutline;
  window.drawPixelart = drawPixelart;

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
