// ==UserScript==
// @name         Bot
// @namespace    CheatEngine
// @version      2.0.0
// @description  Class for making bots
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// @run-at       document-idle
// ==/UserScript==

(function (scope) {
  // let helper = scope['CodeMaid'];
  let Engine = scope['🎮'];
  let Cheat = scope['📦'];

  function parseServerUrl(any) {
    var prefix = String(any).length == 1 ? `sv${any}.` : '';
    return `wss://${prefix}drawaria.online/socket.io/?sid1=undefined&hostname=drawaria.online&EIO=3&transport=websocket`;
  }
  function parseRoomId(any) {
    return String(any).match(/([a-f0-9.-]+?)$/gi)[0];
  }
  function parseSocketIOEvent(prefix_length, event_data) {
    try {
      return JSON.parse(event_data.slice(prefix_length));
    } catch (error) {}
  }

  class Bot {
    static dummy = Cheat.bind(this, this.name);

    constructor(name, avatar) {
      this.name = name ?? 'JavaScript';
      this.avatar = avatar ?? ['cf19b8f0-cf31-11ed-9ece-d584b24f60dc', '1680377222354'];
      this.customObservers = {
        mc_roomplayerschange: (data) => {
          this.room.players = data[2];
        },
      };
      this.attributes = { spawned: false, rounded: false, status: false };

      this.url = '';
      this.socket = null;
      this.interval_id = 0;
      this.interval_ms = 25000;

      this.room = {
        id: null,
        config: null,
        type: 2,
        players: [],
      };
    }
    getReadyState() {
      let self = this;
      if (!self.socket) return false;
      return self.socket.readyState == self.socket.OPEN;
    }
    connect(url) {
      let self = this;
      // if (self.getReadyState()) self.disconnect();
      if (self.getReadyState()) return;

      if (url == null || url == undefined) return self.enterRoom(document.querySelector('#invurl').value);
      self.socket = new WebSocket(parseServerUrl(url));

      self.socket.addEventListener('open', function (event) {
        self.interval_id = setInterval(function () {
          if (!self.getReadyState()) return clearInterval(self.interval_id);
          self.send(2);
        }, self.interval_ms);
      });

      self.socket.addEventListener('message', function (message_event) {
        var prefix = String(message_event.data).match(/(^\d+)/gi)[0] || '';
        if (prefix == '40') {
          self.send(emits.startplay(self.room, self.name, self.avatar));
        }

        var data = parseSocketIOEvent(prefix.length, message_event.data) || [];
        if (data && data.length == 1) {
          if (data[0].players) self.room.players = data[0].players;
        }
        if (data && data.length > 1) {
          var event = data.shift();
          var observer = self.customObservers[event];
          if (observer) observer(data);
        }
      });
    }
    disconnect() {
      if (!this.getReadyState()) return;
      this.socket.close();
    }
    reconnect() {
      this.send(41);
      this.send(40);
    }
    enterRoom(roomid) {
      this.room.id = parseRoomId(roomid);
      if (!this.getReadyState()) this.connect(this.room.id.includes('.') ? this.room.id.slice(-1) : '');
      this.reconnect();
    }
    leaveRoom() {
      this.send(41);
    }
    switchRoom() {
      this.emit('pgswtichroom');
      // this.send(emits['pgswtichroom']());
    }
    send(data) {
      if (!this.getReadyState()) return /*console.warn(data)*/;
      this.socket.send(data);
    }
    emit(event, ...data) {
      // data = data.length > 0 ? data : null;
      var emitter = emits[event];
      if (emitter) this.send(emitter(...data));
    }
  }

  const emits = {
    chatmsg: function (message) {
      // 42["chatmsg","a"]
      let data = ['chatmsg', message];
      return `${42}${JSON.stringify(data)}`;
    },
    passturn: function () {
      // 42["passturn"]
      let data = ['passturn'];
      return `${42}${JSON.stringify(data)}`;
    },
    pgdrawvote: function (playerid) {
      // 42["pgdrawvote",2,0]
      let data = ['pgdrawvote', playerid, 0];
      return `${42}${JSON.stringify(data)}`;
    },
    pgswtichroom: function () {
      // 42["pgswtichroom"]
      let data = ['pgswtichroom'];
      return `${42}${JSON.stringify(data)}`;
    },
    playerafk: function () {
      // 42["playerafk"]
      let data = ['playerafk'];
      return `${42}${JSON.stringify(data)}`;
    },
    playerrated: function () {
      // 42["playerrated"]
      let data = ['playerrated'];
      return `${42}${JSON.stringify(data)}`;
    },
    sendgesture: function (gestureid) {
      // 42["sendgesture",16]
      let data = ['sendgesture', gestureid];
      return `${42}${JSON.stringify(data)}`;
    },
    sendvote: function () {
      // 42["sendvote"]
      let data = ['sendvote'];
      return `${42}${JSON.stringify(data)}`;
    },
    sendvotekick: function (playerid) {
      // 42["sendvotekick",93]
      let data = ['sendvotekick', playerid];
      return `${42}${JSON.stringify(data)}`;
    },
    wordselected: function (wordid) {
      // 42["wordselected",0]
      let data = ['sendvotekick', wordid];
      return `${42}${JSON.stringify(data)}`;
    },
    activateitem: function (itemid, isactive) {
      let data = ['clientcmd', 12, [itemid, isactive]];
      return `${42}${JSON.stringify(data)}`;
    },
    buyitem: function (itemid) {
      let data = ['clientcmd', 11, [itemid]];
      return `${42}${JSON.stringify(data)}`;
    },
    canvasobj_changeattr: function (itemid, target, value) {
      // target = zindex || shared
      let data = ['clientcmd', 234, [itemid, target, value]];
      return `${42}${JSON.stringify(data)}`;
    },
    canvasobj_getobjects: function () {
      let data = ['clientcmd', 233];
      return `${42}${JSON.stringify(data)}`;
    },
    canvasobj_remove: function (itemid) {
      let data = ['clientcmd', 232, [itemid]];
      return `${42}${JSON.stringify(data)}`;
    },
    canvasobj_setposition: function (itemid, positionX, positionY, speed) {
      let data = ['clientcmd', 230, [itemid, 100 / positionX, 100 / positionY, { movespeed: speed }]];
      return `${42}${JSON.stringify(data)}`;
    },
    canvasobj_setrotation: function (itemid, rotation) {
      let data = ['clientcmd', 231, [itemid, rotation]];
      return `${42}${JSON.stringify(data)}`;
    },
    customvoting_setvote: function (value) {
      let data = ['clientcmd', 301, [value]];
      return `${42}${JSON.stringify(data)}`;
    },
    getfpid: function (value) {
      let data = ['clientcmd', 901, [value]];
      return `${42}${JSON.stringify(data)}`;
    },
    getinventory: function () {
      let data = ['clientcmd', 10, [true]];
      return `${42}${JSON.stringify(data)}`;
    },
    getspawnsstate: function () {
      let data = ['clientcmd', 102];
      return `${42}${JSON.stringify(data)}`;
    },
    moveavatar: function (positionX, positionY) {
      let data = [
        'clientcmd',
        103,
        [1e4 * Math.floor((positionX / 100) * 1e4) + Math.floor((positionY / 100) * 1e4), false],
      ];
      return `${42}${JSON.stringify(data)}`;
    },
    setavatarprop: function () {
      let data = ['clientcmd', 115];
      return `${42}${JSON.stringify(data)}`;
    },
    setstatusflag: function (flagid, isactive) {
      let data = ['clientcmd', 3, [flagid, isactive]];
      return `${42}${JSON.stringify(data)}`;
    },
    settoken: function (playerid, tokenid) {
      let data = ['clientcmd', 2, [playerid, tokenid]];
      return `${42}${JSON.stringify(data)}`;
    },
    snapchatmessage: function (playerid, value) {
      let data = ['clientcmd', 330, [playerid, value]];
      return `${42}${JSON.stringify(data)}`;
    },
    spawnavatar: function () {
      let data = ['clientcmd', 101];
      return `${42}${JSON.stringify(data)}`;
    },
    startrollbackvoting: function () {
      let data = ['clientcmd', 320];
      return `${42}${JSON.stringify(data)}`;
    },
    trackforwardvoting: function () {
      let data = ['clientcmd', 321];
      return `${42}${JSON.stringify(data)}`;
    },
    startplay: function (room, name, avatar) {
      let data = `${420}${JSON.stringify(['startplay', name, room.type, 'en', room.id, null, [null, 'https://drawaria.online/', 1000, 1000, [null, avatar[0], avatar[1]], null]])}`;
      return data;
    },
    votetrack: function (trackid) {
      let data = ['clientcmd', 1, [trackid]];
      return `${42}${JSON.stringify(data)}`;
    },
    requestcanvas: function (playerid) {
      let data = ['clientnotify', playerid, 10001];
      return `${42}${JSON.stringify(data)}`;
    },
    respondcanvas: function (playerid, base64) {
      let data = ['clientnotify', playerid, 10002, [base64]];
      return `${42}${JSON.stringify(data)}`;
    },
    galleryupload: function (playerid, imageid) {
      let data = ['clientnotify', playerid, 11, [imageid]];
      return `${42}${JSON.stringify(data)}`;
    },
    warning: function (playerid, type) {
      let data = ['clientnotify', playerid, 100, [type]];
      return `${42}${JSON.stringify(data)}`;
    },
    mute: function (playerid, targetname, mute = 0) {
      let data = ['clientnotify', playerid, 1, [mute, targetname]];
      return `${42}${JSON.stringify(data)}`;
    },
    hide: function (playerid, targetname, hide = 0) {
      let data = ['clientnotify', playerid, 3, [hide, targetname]];
      return `${42}${JSON.stringify(data)}`;
    },
    report: function (playerid, reason, targetname) {
      let data = ['clientnotify', playerid, 2, [targetname, reason]];
      return `${42}${JSON.stringify(data)}`;
    },
    line: function (playerid, lastx, lasty, x, y, isactive, size, color, ispixel) {
      let data = [
        'drawcmd',
        0,
        [lastx / 100, lasty / 100, x / 100, y / 100, isactive, -size, color, playerid, ispixel],
      ];
      return `${42}${JSON.stringify(data)}`;
    },
    erase: function (playerid, lastx, lasty, x, y, isactive, size, color) {
      let data = ['drawcmd', 1, [lastx / 100, lasty / 100, x / 100, y / 100, isactive, -size, color, playerid]];
      return `${42}${JSON.stringify(data)}`;
    },
    flood: function (x, y, color, size, r, g, b, a) {
      // 42["drawcmd",2,[x, y,color,{"0":r,"1":g,"2":b,"3":a},size]]
      let data = ['drawcmd', 2, [x / 100, y / 100, color, { 0: r, 1: g, 2: b, 3: a }, size]];
      return `${42}${JSON.stringify(data)}`;
    },
    undo: function (playerid) {
      // 42["drawcmd",3,[playerid]]
      let data = ['drawcmd', 3, [playerid]];
      return `${42}${JSON.stringify(data)}`;
    },
    clear: function () {
      // 42["drawcmd",4,[]]
      let data = ['drawcmd', 4, []];
      return `${42}${JSON.stringify(data)}`;
    },
    noop: function () {
      // 42["drawcmd",5,[0.44882022129015975,0.3157894736842105,0.44882022129015975,0.3157894736842105,true,-12,"#000000",playerid]]
    },
  };
  const events = {
    bc_announcement: function (data) {
      //
    },
    bc_chatmessage: function (data) {
      // 42["bc_chatmessage",3,"playername","a"]
    },
    bc_clearcanvasobj: function (data) {
      //
    },
    bc_clientnotify: function (data) {
      // 42["bc_clientnotify",playerid,"playername",code,null]
    },
    bc_createcanvasobj: function (data) {
      // 42["bc_createcanvasobj","1",[3,63001,0.5,0.5,0,1,null,"1",true]]
    },
    bc_customvoting_abort: function (data) {
      //
    },
    bc_customvoting_error: function (data) {
      // 42["bc_customvoting_error","rollbackcanvas"]
    },
    bc_customvoting_results: function (data) {
      // 42["bc_customvoting_results",[2],true,0]
    },
    bc_customvoting_start: function (data) {
      // 42["bc_customvoting_start",{"type":321,"secs":20,"acceptratios":[0.51],"pgdrawallow":true,"voteoptions":["YES","NO"]},1]
    },
    bc_customvoting_vote: function (data) {
      // 42["bc_customvoting_vote",1,0,[2,1,[1]]]
    },
    bc_exp: function (data) {
      // 42["bc_exp",29,4357]
    },
    bc_extannouncement: function (data) {
      //
    },
    bc_freedrawsession_reset: function (data) {
      // 42["bc_freedrawsession_reset",-1,{"votingtype":2,"currentvotes":0,"neededvotes":2,"votingtimeout":null}null]
    },
    bc_gesture: function (data) {
      // 42["bc_gesture",3,31]
    },
    bc_musicbox_play: function (data) {
      // 42["bc_musicbox_play",[30394,1,"37678185",252386,1661295694733,"Sony Masterworks - Smooth Criminal","2cellos/smooth-criminal"]]
    },
    bc_musicbox_vote: function (data) {
      // 42["bc_musicbox_vote",[[30394,1]],3,30394]
    },
    bc_pgdrawallow_results: function (data) {
      // 42["bc_pgdrawallow_results",2,true,true]
    },
    bc_pgdrawallow_startvoting: function (data) {
      // 42["bc_pgdrawallow_startvoting",2,1,false]
    },
    bc_pgdrawallow_vote: function (data) {
      // 42["bc_pgdrawallow_vote",2,1,0,false,[1,0]]
    },
    bc_playerafk: function (data) {
      // 42["bc_playerafk",28,"Jinx"]
    },
    bc_playerrated: function (data) {
      // 42["bc_playerrated",1,29,"lil cute girl",28,"Jinx",[1]]
    },
    bc_removecanvasobj: function (data) {
      // 42["bc_removecanvasobj",3,"1",null]
    },
    bc_resetplayername: function (data) {
      //
    },
    bc_round_results: function (data) {
      // 42["bc_round_results",[[5,"Jinx",15,61937,3,"63196790-c7da-11ec-8266-c399f90709b7",0],[4,"ãâ¡thick mojo â¡ã",15,65464,3,"018cdc20-47a4-11ec-b5b5-6bdacecdd51e",1]]]
    },
    bc_setavatarprop: function (data) {
      // 42["bc_setavatarprop",3]
    },
    bc_setobjattr: function (data) {
      // 42["bc_setobjattr","1","shared",false]
    },
    bc_setstatusflag: function (data) {
      // 42["bc_setstatusflag",3,3,true]
    },
    bc_spawnavatar: function (data) {
      // 42["bc_spawnavatar",3,true]
    },
    bc_startinground: function (data) {
      // 42["bc_startinground",200000,[],{"votingtype":0,"currentvotes":0,"neededvotes":2,"votingtimeout":null}]
    },
    bc_token: function (data) {
      // 42["bc_token",1,3,0]
    },
    bc_turn_abort: function (data) {
      // 42["bc_turn_abort","pass","lil cute girl","2c276aa0-dc5e-11ec-9fd3-c3a00b129da4","hammer",null]
    },
    bc_turn_fastout: function (data) {
      // 42["bc_turn_fastout",15000]
    },
    bc_turn_results: function (data) {
      // 42["bc_turn_results",[[1,"Jinx",2,2,"63196790-c7da-11ec-8266-c399f90709b7",0,0],[2,"vale",3,3,"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx.xxxxxxxxxxxxx",9248]],"cavern"]
    },
    bc_turn_waitplayers: function (data) {
      // 42["bc_turn_waitplayers",true,-1,6]
    },
    bc_uc_freedrawsession_changedroom: function (data) {
      // console.log(data[2], data[3])
      // 42["bc_uc_freedrawsession_changedroom",[list of drawlines not !important]]
    },
    bc_uc_freedrawsession_start: function (data) {
      //
    },
    bc_votekick: function (data) {
      // 42["bc_votekick","Jinx",22,true]
    },
    bc_votingtimeout: function (data) {
      // 42["bc_votingtimeout",{"votingtype":2,"currentvotes":0,"neededvotes":2,"votingtimeout":null}]
    },
    bcmc_playervote: function (data) {
      // 42["bcmc_playervote","playername",{"votingtype":3,"currentvotes":1,"neededvotes":2,"votingtimeout":1661296731309}]
    },
    bcuc_getfpid: function (data) {
      // 42["bcuc_getfpid"]
      // 42["clientcmd",901,[{"visitorId":"a8923f0870050d4a4e771cd26679ab6e"}]]
    },
    bcuc_itemactivated: function (data) {
      // 42["bcuc_itemactivated",3,63001,[2,[0.5,0.5],0,1,null],1]
    },
    bcuc_itemactivationabort: function (data) {
      //
    },
    bcuc_moderatormsg: function (data) {
      // 42["bcuc_moderatormsg","Kick Player",true]
    },
    bcuc_snapchatmessage: function (data) {
      // 42["uc_snapshot","1671740010120.1.28028"]
      // https://drawaria.online/snapshot/save
    },
    mc_drawcommand: function (data) {
      // 42["mc_drawcommand",0,[0.2958167330677291,0.24970131421744324,0.2958167330677291,0.24970131421744324,true,-12,"#000000",3]]
    },
    mc_moveavatar: function (data) {
      // 42["mc_moveavatar",3,36081456,true]
    },
    mc_moveobj: function (data) {
      // 42["mc_moveobj","1",0.8266237186146181,0.24248391556470414,3,{"movespeed":500}]
    },
    mc_roomplayerschange: function (data) {
      // console.log(data[2])
      // 42["mc_roomplayerschange","join","playername",[{"id":1,"name":"á´®á´±á´ºá´µá´¹á´¬á´¿áµ","turnscore":0,"roundscore":0,"roundguesstime":0,"avatarid":"81253f20-ff93-11ec-9fd3-c3a00b129da4.1661276848726","account_stats":null,"from":"TR","medals":0,"turnstarcount":0,"statusflags":[]}{"id":3,"name":"playername","turnscore":0,"roundscore":0,"roundguesstime":0,"avatarid":"81253f20-ff93-11ec-9fd3-c3a00b129da4.1661276848726","account_stats":null,"from":"GB","medals":0,"turnstarcount":0,"statusflags":[]}],{"votingtype":2,"currentvotes":0,"neededvotes":0,"votingtimeout":null}false,3]
    },
    mc_rotateobj: function (data) {
      // 42["mc_rotateobj","1",0.2617993877991494,3]
    },
    mc_turn_guessdraw: function (data) {
      // 42["mc_turn_guessdraw",90000,[],"ÆÌµÍÍÍÍÍÍEÌµÌÍÍÍÌ Ì¼",{"votingtype":1,"currentvotes":0,"neededvotes":2,"votingtimeout":null}false]
    },
    mc_turn_tip: function (data) {
      // 42["mc_turn_tip","_a_m__"]
    },
    mc_turn_waitselectword: function (data) {
      // 42["mc_turn_waitselectword",11000,"ÆÌµÍÍÍÍÍÍEÌµÌÍÍÍÌ Ì¼",6,"c46de8f0-f493-11ec-9fd3-c3a00b129da4",2,5,false]
    },
    mc_turn_wordguessed: function (data) {
      // 42["mc_turn_wordguessed","vale",[[2,3,3,9248],[1,2,2,0]]]
    },
    uc_avatarspawninfo: function (data) {
      // 42["uc_avatarspawninfo","9a2ab5b2-b81e-4690-9af7-475d870d6e20",[[38,75059625,0]]]
    },
    uc_buyitemerror: function (data) {
      //
    },
    uc_canvasobjs: function (data) {
      // 42["uc_canvasobjs","9a2ab5b2-b81e-4690-9af7-475d870d6e20",{}]
    },
    uc_chatmuted: function (data) {
      // 42["uc_chatmuted"]
    },
    uc_coins: function (data) {
      // 42["uc_coins",-50,43]
    },
    uc_inventoryitems: function (data) {
      // 42["uc_inventoryitems",[[100,99,null],[63000,null,null],[86000,null,null]],false,false] list
    },
    uc_resetavatar: function (data) {
      //
    },
    uc_serverserstart: function (data) {
      //
    },
    uc_snapshot: function (data) {
      //
    },
    uc_tokenerror: function (data) {
      // 42["uc_tokenerror",2]
    },
    uc_turn_begindraw: function (data) {
      // 42["uc_turn_begindraw",90000,"arrow"]
    },
    uc_turn_selectword: function (data) {
      // 42["uc_turn_selectword",11000,["vase","cellar","rain"],1,7,false]
    },
    uc_turn_selectword_refreshlist: function (data) {
      // 42["uc_turn_selectword_refreshlist",["crayons","trade","team"]]
    },
    uc_turn_wordguessedself: function (data) {
      // 42["uc_turn_wordguessedself","stage",3,[[2,3,3,53938],[1,2,2,0]]]
    },
  };
  Engine['IO'] = { events, emits };
})(globalThis);
