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

class Player {
  constructor(name = '', avatar = [undefined, undefined]) {
    this.name = name;
    this.avatar = avatar;
    this.attributes = { spawned: false, rounded: false, status: false };

    this.socket = null;
    this.interval_id = 0;
    this.interval_ms = 25000;

    this.room = {
      id: null,
      config: null,
      type: 2,
      players: [],
    };

    this.customObservers = [
      {
        event: 'mc_roomplayerschange',
        callback: (data) => {
          this.room.players = data[2];
        },
      },
    ];
  }

  getReadyState() {
    const localThis = this;
    if (!localThis.socket) return false;
    return localThis.socket.readyState == localThis.socket.OPEN;
  }

  connect(url) {
    // if (localThis.getReadyState()) localThis.disconnect();
    if (this.getReadyState()) return;

    if (!url) return this.enterRoom(document.querySelector('#invurl').value);
    this.socket = new WebSocket(parseServerUrl(url));

    this.socket.botclient = this;

    this.socket.addEventListener('open', (event) => {
      this.interval_id = setInterval(() => {
        if (!this.getReadyState()) return clearInterval(this.interval_id);
        this.send(2);
      }, this.interval_ms);
    });

    this.socket.addEventListener('message', (message_event) => {
      var prefix = String(message_event.data).match(/(^\d+)/gi)[0] || '';
      if (prefix == '40') {
        this.send(emitDictionary.startplay(this.room, this.name, this.avatar));
      }

      var data = parseSocketIOEvent(prefix.length, message_event.data) || [];
      if (data && data.length == 1) {
        if (data[0].players) this.room.players = data[0].players;
      }
      if (data && data.length > 1) {
        var event = data.shift();

        this.customObservers.forEach((listener) => {
          if (listener.event === event) if (listener.callback) listener.callback(data);
        });
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

  addEventListener(eventname, callback) {
    this.customObservers.push({ event: eventname, callback });
  }

  send(data) {
    if (!this.getReadyState()) return /*console.warn(data)*/;
    this.socket.send(data);
  }

  emit(event, ...data) {
    // data = data.length > 0 ? data : null;
    var emitter = emitDictionary[event];
    if (emitter) this.send(emitter(...data));
  }
}

const emitDictionary = {
  /**
   *
   * @param {string} message
   * @returns {string}
   */
  chatmsg: function (message) {
    // 42["chatmsg","a"]
    let data = ['chatmsg', message];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  passturn: function () {
    // 42["passturn"]
    let data = ['passturn'];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @returns {string}
   */
  pgdrawvote: function (playerid) {
    // 42["pgdrawvote",2,0]
    let data = ['pgdrawvote', playerid, 0];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  pgswtichroom: function () {
    // 42["pgswtichroom"]
    let data = ['pgswtichroom'];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  playerafk: function () {
    // 42["playerafk"]
    let data = ['playerafk'];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  playerrated: function () {
    // 42["playerrated"]
    let data = ['playerrated'];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} gestureid
   * @returns {string}
   */
  sendgesture: function (gestureid) {
    // 42["sendgesture",16]
    let data = ['sendgesture', gestureid];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  sendvote: function () {
    // 42["sendvote"]
    let data = ['sendvote'];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @returns {string}
   */
  sendvotekick: function (playerid) {
    // 42["sendvotekick",93]
    let data = ['sendvotekick', playerid];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} wordid
   * @returns {string}
   */
  wordselected: function (wordid) {
    // 42["wordselected",0]
    let data = ['sendvotekick', wordid];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} itemid
   * @param {boolean} isactive
   * @returns {string}
   */
  activateitem: function (itemid, isactive) {
    let data = ['clientcmd', 12, [itemid, isactive]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} itemid
   * @returns {string}
   */
  buyitem: function (itemid) {
    let data = ['clientcmd', 11, [itemid]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} itemid
   * @param {any} target
   * @param {any} value
   * @returns {string}
   */
  canvasobj_changeattr: function (itemid, target, value) {
    // target = zindex || shared
    let data = ['clientcmd', 234, [itemid, target, value]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  canvasobj_getobjects: function () {
    let data = ['clientcmd', 233];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} itemid
   * @returns {string}
   */
  canvasobj_remove: function (itemid) {
    let data = ['clientcmd', 232, [itemid]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} itemid
   * @param {number|string} positionX
   * @param {number|string} positionY
   * @param {number|string} speed
   * @returns {string}
   */
  canvasobj_setposition: function (itemid, positionX, positionY, speed) {
    let data = ['clientcmd', 230, [itemid, 100 / positionX, 100 / positionY, { movespeed: speed }]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} itemid
   * @param {number|string} rotation
   * @returns {string}
   */
  canvasobj_setrotation: function (itemid, rotation) {
    let data = ['clientcmd', 231, [itemid, rotation]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {any} value
   * @returns {string}
   */
  customvoting_setvote: function (value) {
    let data = ['clientcmd', 301, [value]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {any} value
   * @returns {string}
   */
  getfpid: function (value) {
    let data = ['clientcmd', 901, [value]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  getinventory: function () {
    let data = ['clientcmd', 10, [true]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  getspawnsstate: function () {
    let data = ['clientcmd', 102];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} positionX
   * @param {number|string} positionY
   * @returns {string}
   */
  moveavatar: function (positionX, positionY) {
    let data = [
      'clientcmd',
      103,
      [1e4 * Math.floor((positionX / 100) * 1e4) + Math.floor((positionY / 100) * 1e4), false],
    ];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  setavatarprop: function () {
    let data = ['clientcmd', 115];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} flagid
   * @param {boolean} isactive
   * @returns {string}
   */
  setstatusflag: function (flagid, isactive) {
    let data = ['clientcmd', 3, [flagid, isactive]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {number|string} tokenid
   * @returns {string}
   */
  settoken: function (playerid, tokenid) {
    let data = ['clientcmd', 2, [playerid, tokenid]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {any} value
   * @returns {string}
   */
  snapchatmessage: function (playerid, value) {
    let data = ['clientcmd', 330, [playerid, value]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  spawnavatar: function () {
    let data = ['clientcmd', 101];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  startrollbackvoting: function () {
    let data = ['clientcmd', 320];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  trackforwardvoting: function () {
    let data = ['clientcmd', 321];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   * @param {string} room
   * @param {string|undefined} name
   * @param {string|undefined} uid
   * @param {string|undefined} wt
   * @returns {string}
   */
  startplay: function (room, name, uid, wt) {
    let data = `${420}${JSON.stringify(['startplay', name, room.type, 'en', room.id, null, [null, 'https://drawaria.online/', 1000, 1000, [null, uid, wt], null]])}`;
    return data;
  },
  /**
   *
   * @param {number|string} trackid
   * @returns {string}
   */
  votetrack: function (trackid) {
    let data = ['clientcmd', 1, [trackid]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @returns {string}
   */
  requestcanvas: function (playerid) {
    let data = ['clientnotify', playerid, 10001];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {string} base64
   * @returns {string}
   */
  respondcanvas: function (playerid, base64) {
    let data = ['clientnotify', playerid, 10002, [base64]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {number|string} imageid
   * @returns {string}
   */
  galleryupload: function (playerid, imageid) {
    let data = ['clientnotify', playerid, 11, [imageid]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {any} type
   * @returns {string}
   */
  warning: function (playerid, type) {
    let data = ['clientnotify', playerid, 100, [type]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {string} targetname
   * @param {boolean} mute
   * @returns {string}
   */
  mute: function (playerid, targetname, mute = false) {
    let data = ['clientnotify', playerid, 1, [mute, targetname]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {string} targetname
   * @param {boolean} hide
   * @returns {string}
   */
  hide: function (playerid, targetname, hide = false) {
    let data = ['clientnotify', playerid, 3, [hide, targetname]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {string} reason
   * @param {string} targetname
   * @returns {string}
   */
  report: function (playerid, reason, targetname) {
    let data = ['clientnotify', playerid, 2, [targetname, reason]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {number|string} lastx
   * @param {number|string} lasty
   * @param {number|string} x
   * @param {number|string} y
   * @param {boolean} isactive
   * @param {number|string} size
   * @param {number|string} color
   * @param {boolean} ispixel
   * @returns {string}
   */
  line: function (playerid, lastx, lasty, x, y, isactive, size, color, ispixel) {
    let data = ['drawcmd', 0, [lastx / 100, lasty / 100, x / 100, y / 100, isactive, -size, color, playerid, ispixel]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @param {number|string} lastx
   * @param {number|string} lasty
   * @param {number|string} x
   * @param {number|string} y
   * @param {boolean} isactive
   * @param {number|string} size
   * @param {number|string} color
   * @returns {string}
   */
  erase: function (playerid, lastx, lasty, x, y, isactive, size, color) {
    let data = ['drawcmd', 1, [lastx / 100, lasty / 100, x / 100, y / 100, isactive, -size, color, playerid]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} x
   * @param {number|string} y
   * @param {number|string} color
   * @param {number|string} size
   * @param {number|string} r
   * @param {number|string} g
   * @param {number|string} b
   * @param {number|string} a
   * @returns {string}
   */
  flood: function (x, y, color, size, r, g, b, a) {
    // 42["drawcmd",2,[x, y,color,{"0":r,"1":g,"2":b,"3":a},size]]
    let data = ['drawcmd', 2, [x / 100, y / 100, color, { 0: r, 1: g, 2: b, 3: a }, size]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @param {number|string} playerid
   * @returns {string}
   */
  undo: function (playerid) {
    // 42["drawcmd",3,[playerid]]
    let data = ['drawcmd', 3, [playerid]];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   * @returns {string}
   */
  clear: function () {
    // 42["drawcmd",4,[]]
    let data = ['drawcmd', 4, []];
    return `${42}${JSON.stringify(data)}`;
  },
  /**
   *
   */
  noop: function () {
    // 42["drawcmd",5,[0.44882022129015975,0.3157894736842105,0.44882022129015975,0.3157894736842105,true,-12,"#000000",playerid]]
  },
};

const eventDictionary = {
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
  uc_turn_wordguessedlocalThis: function (data) {
    // 42["uc_turn_wordguessedlocalThis","stage",3,[[2,3,3,53938],[1,2,2,0]]]
  },
};
