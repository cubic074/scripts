// ==UserScript==
// @name         Player Engine
// @version      2.5.1
// @description  Botable Player
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
  class Player {
    constructor(name = '') {
      this.name = name;
      this.sid1 = null;
      this.uid = '9abda970-dd17-11ec-9fd3-c3a00b129da4';
      this.wt = '1654193907094';

      this.conn = new Connection(this);
      this.room = new Room(this.conn);
      this.action = new Actions(this.conn);
    }

    annonymize(name) {
      this.name = name;
      this.uid = '';
      this.wt = '';
    }
  }

  class Connection {
    constructor(player) {
      this.player = player;
    }

    onopen(event) {
      // console.debug(event)
      this.Heartbeat(25000);
    }

    onclose(event) {
      // console.debug(event)
    }

    onerror(event) {
      // console.debug(event)
    }

    onmessage(event) {
      // console.debug(event)
      let message = String(event.data);
      if (message.startsWith('42')) {
        this.onbroadcast(message.slice(2));
      } else if (message.startsWith('40')) {
        this.onrequest();
      } else if (message.startsWith('41')) {
        this.player.room.join(this.player.room.id);
      } else if (message.startsWith('430')) {
        let configs = JSON.parse(message.slice(3))[0];
        this.player.room.players = configs.players;
        this.player.room.id = configs.roomid;
      }
    }

    onbroadcast(payload) {
      payload = JSON.parse(payload);
      if (payload[0] == 'bc_uc_freedrawsession_changedroom') {
        this.player.room.players = payload[3];
        this.player.room.id = payload[4];
      }
      if (payload[0] == 'mc_roomplayerschange') {
        this.player.room.players = payload[3];
      }
    }

    onrequest() {}

    open(url) {
      this.socket = new WebSocket(url);
      this.socket.onopen = this.onopen.bind(this);
      this.socket.onclose = this.onclose.bind(this);
      this.socket.onerror = this.onerror.bind(this);
      this.socket.onmessage = this.onmessage.bind(this);
    }

    close(code, reason) {
      this.socket.close(code, reason);
    }

    Heartbeat(interval) {
      let timeout = setTimeout(() => {
        if (this.socket.readyState == this.socket.OPEN) {
          this.socket.send(2);
          this.Heartbeat(interval);
        }
      }, interval);
    }

    serverconnect(server, room) {
      if (this.socket == undefined || this.socket.readyState != this.socket.OPEN) {
        this.open(server);
      } else {
        this.socket.send(41);
        this.socket.send(40);
      }
      this.onrequest = () => {
        this.socket.send(room);
      };
    }
  }

  class Room {
    constructor(conn) {
      this.conn = conn;
      this.id = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
      this.players = [];
    }

    create(servertype = 2, options = {}) {
      // extract config
      let config = {
        privateroom: options.privateroom || false,
        maxplayers: options.maxplayers || 200,
        drawstatelen: options.drawstatelen || 90000,
        cyclesnum: options.cyclesnum || 0,
        withbuiltinwords: options.withbuiltinwords || false,
        pgresettime: options.pgresettime || -1,
        pgbrushsize: options.pgbrushsize || -1,
        cursorsenabled: options.cursorsenabled || true,
        pgdrawallowmode: options.pgdrawallowmode || false,
        roomdescr: options.roomdescr || ' Prototype | ˡᵒᵇᵇʸ',
        pgmodeflags: options.pgmodeflags || [null, true],
      };

      // craft serverurl
      let serverurl = `wss://${servertype == 2 ? 'sv3.' : servertype == 1 ? 'sv2.' : ''}drawaria.online/socket.io/?sid1=undefined&hostname=drawaria.online&EIO=3&transport=websocket`;

      let temp = this.conn.player;
      // craft response for joining of desired room
      let connectstring = `420["startplay","${temp.name}",${servertype},"en",null,${JSON.stringify(
        config
      )},[null,"https://drawaria.online/",1000,1000,[${nullify(temp.sid1)},${nullify(temp.uid)},${nullify(temp.wt)}],null]]`;

      this.conn.serverconnect(serverurl, connectstring);
    }

    join(invitelink) {
      let gamemode = 2;
      let server = '';
      if (invitelink == null) {
        this.id = null;
        server = 'sv3.';
      } else {
        // extract roomid
        this.id = invitelink.startsWith('http') ? invitelink.split('/').pop() : invitelink;
        // craft serverurl
        if (invitelink.endsWith('.3')) {
          server = 'sv3.';
          gamemode = 2;
        } else if (invitelink.endsWith('.2')) {
          server = 'sv2.';
          gamemode = 2;
        } else {
          server = '';
          gamemode = 1;
        }
      }

      let serverurl = `wss://${server}drawaria.online/socket.io/?sid1=undefined&hostname=drawaria.online&EIO=3&transport=websocket`;

      let player = this.conn.player;
      // craft response for joining of desired room
      let connectstring = `420["startplay","${player.name}",${gamemode},"en",${nullify(
        this.id
      )},null,[null,"https://drawaria.online/",1000,1000,[${nullify(player.sid1)},${nullify(player.uid)},${nullify(player.wt)}],null]]`;

      this.conn.serverconnect(serverurl, connectstring);
    }

    next() {
      if (this.conn.socket.readyState != this.conn.socket.OPEN) {
        this.join(null);
      } else {
        this.conn.socket.send('42["pgswtichroom"]');
      }
    }
  }

  class Actions {
    constructor(conn) {
      this.conn = conn;
    }

    SendMessage(message) {
      this.conn.socket.send(`42["chatmsg","${message}"]`);
    }

    SendGesture(gestureid) {
      this.conn.socket.send(`42["sendgesture",${gestureid}]`);
    }

    SendToken(playerid, tokenid) {
      this.conn.socket.send(`42["clientcmd",2,[${playerid},${tokenid}]]`);
    }

    SendToggleAllow(playerid) {
      this.conn.socket.send(`42["pgdrawvote",${playerid},0]`);
    }

    SendVote() {
      this.conn.socket.send('42["sendvote"]');
    }

    SetStatus(statusid, value) {
      this.conn.socket.send(`42["clientcmd",3,[${statusid},${value}]]`);
    }

    AvatarSpawn() {
      this.conn.socket.send('42["clientcmd",101]');
    }

    AvatarMove(x, y) {
      this.conn.socket.send(`42["clientcmd",103,[${String(x * 100) + String(y * 100).padStart(4, '0')},false]]`);
    }

    AvatarChange() {
      this.conn.socket.send('42["clientcmd",115]');
    }

    DrawLine(bx = 50, by = 50, ex = 50, ey = 50, thickness = 50, color = '#FFFFFF', algo = 0) {
      bx = bx / 100;
      by = by / 100;
      ex = ex / 100;
      ey = ey / 100;
      /* algo = 101/201 */
      this.conn.socket.send(
        `42["drawcmd",0,[${bx},${by},${ex},${ey},true,${0 - thickness},"${color}",0,0,{"2":${algo},"3":0.5,"4":0.5}]]`
      );
      this.conn.socket.send(
        `42["drawcmd",0,[${bx},${by},${ex},${ey},false,${0 - thickness},"${color}",0,0,{"2":${algo},"3":0.5,"4":0.5}]]`
      );
    }
  }

  var nullify = (value = null) => {
    return value == null ? null : String().concat('"', value, '"');
  };

  window.PlayerEngine = new Player();
})();
