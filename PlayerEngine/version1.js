// ==UserScript==
// @name         Player Engine
// @version      1.2.1
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
    constructor() {
      this.sid1 = null;
      this.uid = '65b16150-dcf3-11ec-9fd3-c3a00b129da4';
      this.wt = '1653569875639';
      this.botname = 'Prototype | ᴮᴼᵀ';
      this.room = undefined;
      this.socket = undefined;
      this.config = undefined;
      this.players = [];
      this.messageblacklist = [
        'bcmc_playervote',
        'bc_uc_freedrawsession_changedroom',
        'mc_moveavatar',
        'mc_drawcommand',
        'mc_turn_tip',
        'mc_turn_guessdraw',
        'mc_turn_waitselectword',
        'mc_turn_wordguessed',
        'bc_clientnotify',
        'bc_turn_fastout',
        'bc_turn_results',
        'bc_round_results',
        'bc_setstatusflag',
        'bc_spawnavatar',
        'bc_gesture',
        'bc_token',
      ];
      this.newlobby = true;
      this.Action = new Action(this);
    }

    start(roomlink, botname = 'Prototype | ᴮᴼᵀ', mode = false) {
      this.newlobby = mode;
      this.botname = botname;
      this.room = roomlink.startsWith('http') ? roomlink.slice(29) : roomlink;
      this.socket = new WebSocket(
        `wss://${this.room.endsWith('.3') ? 'sv3.' : this.room.endsWith('.2') ? 'sv2.' : ''}drawaria.online/socket.io/?sid1=undefined&hostname=drawaria.online&EIO=3&transport=websocket`
      );
      this.socket.onopen = this.onOpen.bind(this);
      this.socket.onmessage = this.onMessage.bind(this);
      this.socket.onerror = this.onError.bind(this);
      this.socket.onclose = this.onClose.bind(this);
    }

    stop() {
      this.socket.close();
    }

    onOpen() {}

    onMessage(message) {
      message = String(message.data);
      if (message == 3) {
        return;
      }
      if (message == 41) {
        this.send(
          `420["startplay","${this.botname}",1,"en",${nullify(this.room)},null,[null,"https://drawaria.online/",1000,1000,[${nullify(this.sid1)},${nullify(this.uid)},${nullify(
            this.wt
          )}],null]]`
        );
      }
      if (message.startsWith('42')) {
        this.onInteraction(message.slice(2));
      } else if (message.startsWith('0')) {
        try {
          this.config = JSON.parse(message.slice(1));
        } catch (error) {
          console.error(error);
        }
      } else if (message.startsWith('40')) {
        if (!this.newlobby) {
          this.send(
            `420["startplay","${this.botname}",1,"en",${nullify(this.room)},null,[null,"https://drawaria.online/",1000,1000,[${nullify(this.sid1)},${nullify(this.uid)},${nullify(
              this.wt
            )}],null]]`
          );
        } else {
          this.send(
            `420["startplay","\\n${this.botname}\\n",2,"en",null,{"privateroom":false,"maxplayers":200,"drawstatelen":90000,"cyclesnum":0,"withbuiltinwords":false,"pgresettime":-1,"pgbrushsize":-1,"cursorsenabled":true,"pgdrawallowmode":false,"roomdescr":"┌─┬┐\\n│ ┼┤\\n├  │\\n└─┴┘\\n","pgmodeflags":[null,true]},[null,"https://drawaria.online/",1000,1000,[null,null,null],null]]`
          );
        }
        this.HeartBeat(this.config.pingInterval);
      } else if (message.startsWith('430')) {
        try {
          this.players = JSON.parse(message.slice(3))[0].players;
          this.room = JSON.parse(message.slice(3))[0].roomid;
        } catch (error) {
          console.error(error);
        }
      }
    }

    onError(error) {}

    onClose(reason) {}

    onInteraction(message) {}

    send(message) {
      this.socket.send(message);
    }

    HeartBeat(interval) {
      let timeout = setTimeout(() => {
        if (this.socket.readyState == 1) {
          this.socket.send(2);
          this.HeartBeat(interval);
        }
      }, interval);
    }
  }

  class Action {
    constructor(owner) {
      this.owner = owner;
    }

    DrawLine(bx = 50, by = 50, ex = 50, ey = 50, thickness = 50, color = '#FFFFFF') {
      bx = bx / 100;
      by = by / 100;
      ex = ex / 100;
      ey = ey / 100;
      this.owner.socket.send(`42["drawcmd",0,[${bx},${by},${ex},${ey},true,${0 - thickness},"${color}",0,0,{}]]`);
      this.owner.socket.send(`42["drawcmd",0,[${bx},${by},${ex},${ey},false,${0 - thickness},"${color}",0,0,{}]]`);
    }

    DrawAlgo(bx = 50, by = 50, ex = 50, ey = 50, thickness = 50, color = '#FFFFFF', algo = 102) {
      bx = bx / 100;
      by = by / 100;
      ex = ex / 100;
      ey = ey / 100;
      /* algo = 101/201 */
      this.owner.socket.send(
        `42["drawcmd",0,[${bx},${by},${ex},${ey},true,${0 - thickness},"${color}",0,0,{"2":${algo},"3":0.5,"4":0.5}]]`
      );
      this.owner.socket.send(
        `42["drawcmd",0,[${bx},${by},${ex},${ey},false,${0 - thickness},"${color}",0,0,{"2":${algo},"3":0.5,"4":0.5}]]`
      );
    }

    SendMessage(message) {
      this.owner.socket.send(`42["chatmsg","${message}"]`);
    }

    SendGesture(gestureid) {
      this.owner.socket.send(`42["sendgesture",${gestureid}]`);
    }

    SendToken(playerid, tokenid) {
      this.owner.socket.send(`42["clientcmd",2,[${playerid},${tokenid}]]`);
    }

    SendToggleAllow(playerid) {
      this.owner.socket.send(`42["pgdrawvote",${playerid},0]`);
    }

    SendVote() {
      this.owner.socket.send('42["sendvote"]');
    }

    SetStatus(statusid, value) {
      this.owner.socket.send(`42["clientcmd",3,[${statusid},${value}]]`);
    }

    AvatarSpawn() {
      this.owner.socket.send('42["clientcmd",101]');
    }

    AvatarMove(x, y) {
      this.owner.socket.send(`42["clientcmd",103,[${String(x * 100) + String(y * 100).padStart(4, '0')},false]]`);
    }

    AvatarChange() {
      this.owner.socket.send('42["clientcmd",115]');
    }

    SwitchRoom() {
      this.owner.socket.send('42["pgswtichroom"]');
    }
  }

  var nullify = (value = null) => {
    return value == null ? null : String().concat('"', value, '"');
  };

  window.PlayerEngine = new Player();
})();
