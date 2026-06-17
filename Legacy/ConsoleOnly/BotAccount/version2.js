class EventManager {
  /** @type {Array<Function>} */
  #bc_announcement = [];
  /** @type {Array<Function>} */
  #bc_chatmessage = [];
  /** @type {Array<Function>} */
  #bc_clearcanvasobj = [];
  /** @type {Array<Function>} */
  #bc_clientnotify = [];
  /** @type {Array<Function>} */
  #bc_createcanvasobj = [];
  /** @type {Array<Function>} */
  #bc_customvoting_abort = [];
  /** @type {Array<Function>} */
  #bc_customvoting_error = [];
  /** @type {Array<Function>} */
  #bc_customvoting_results = [];
  /** @type {Array<Function>} */
  #bc_customvoting_start = [];
  /** @type {Array<Function>} */
  #bc_customvoting_vote = [];
  /** @type {Array<Function>} */
  #bc_exp = [];
  /** @type {Array<Function>} */
  #bc_extannouncement = [];
  /** @type {Array<Function>} */
  #bc_freedrawsession_reset = [];
  /** @type {Array<Function>} */
  #bc_gesture = [];
  /** @type {Array<Function>} */
  #bc_musicbox_play = [];
  /** @type {Array<Function>} */
  #bc_musicbox_vote = [];
  /** @type {Array<Function>} */
  #bc_pgdrawallow_results = [];
  /** @type {Array<Function>} */
  #bc_pgdrawallow_startvoting = [];
  /** @type {Array<Function>} */
  #bc_pgdrawallow_vote = [];
  /** @type {Array<Function>} */
  #bc_playerafk = [];
  /** @type {Array<Function>} */
  #bc_playerrated = [];
  /** @type {Array<Function>} */
  #bc_removecanvasobj = [];
  /** @type {Array<Function>} */
  #bc_resetplayername = [];
  /** @type {Array<Function>} */
  #bc_round_results = [];
  /** @type {Array<Function>} */
  #bc_setavatarprop = [];
  /** @type {Array<Function>} */
  #bc_setobjattr = [];
  /** @type {Array<Function>} */
  #bc_setstatusflag = [];
  /** @type {Array<Function>} */
  #bc_spawnavatar = [];
  /** @type {Array<Function>} */
  #bc_startinground = [];
  /** @type {Array<Function>} */
  #bc_token = [];
  /** @type {Array<Function>} */
  #bc_turn_abort = [];
  /** @type {Array<Function>} */
  #bc_turn_fastout = [];
  /** @type {Array<Function>} */
  #bc_turn_results = [];
  /** @type {Array<Function>} */
  #bc_turn_waitplayers = [];
  /** @type {Array<Function>} */
  #bc_uc_freedrawsession_changedroom = [];
  /** @type {Array<Function>} */
  #bc_uc_freedrawsession_start = [];
  /** @type {Array<Function>} */
  #bc_votekick = [];
  /** @type {Array<Function>} */
  #bc_votingtimeout = [];
  /** @type {Array<Function>} */
  #bcmc_playervote = [];
  /** @type {Array<Function>} */
  #bcuc_getfpid = [];
  /** @type {Array<Function>} */
  #bcuc_itemactivated = [];
  /** @type {Array<Function>} */
  #bcuc_itemactivationabort = [];
  /** @type {Array<Function>} */
  #bcuc_moderatormsg = [];
  /** @type {Array<Function>} */
  #bcuc_snapchatmessage = [];
  /** @type {Array<Function>} */
  #mc_drawcommand = [];
  /** @type {Array<Function>} */
  #mc_moveavatar = [];
  /** @type {Array<Function>} */
  #mc_moveobj = [];
  /** @type {Array<Function>} */
  #mc_roomplayerschange = [];
  /** @type {Array<Function>} */
  #mc_rotateobj = [];
  /** @type {Array<Function>} */
  #mc_turn_guessdraw = [];
  /** @type {Array<Function>} */
  #mc_turn_tip = [];
  /** @type {Array<Function>} */
  #mc_turn_waitselectword = [];
  /** @type {Array<Function>} */
  #mc_turn_wordguessed = [];
  /** @type {Array<Function>} */
  #uc_avatarspawninfo = [];
  /** @type {Array<Function>} */
  #uc_buyitemerror = [];
  /** @type {Array<Function>} */
  #uc_canvasobjs = [];
  /** @type {Array<Function>} */
  #uc_chatmuted = [];
  /** @type {Array<Function>} */
  #uc_coins = [];
  /** @type {Array<Function>} */
  #uc_inventoryitems = [];
  /** @type {Array<Function>} */
  #uc_resetavatar = [];
  /** @type {Array<Function>} */
  #uc_serverserstart = [];
  /** @type {Array<Function>} */
  #uc_snapshot = [];
  /** @type {Array<Function>} */
  #uc_tokenerror = [];
  /** @type {Array<Function>} */
  #uc_turn_begindraw = [];
  /** @type {Array<Function>} */
  #uc_turn_selectword = [];
  /** @type {Array<Function>} */
  #uc_turn_selectword_refreshlist = [];
  /** @type {Array<Function>} */
  #uc_turn_wordguessedlocalThis = [];

  /**
   * @param {string} message
   * @returns {string}
   */
  static parse_chatmsg(message) {
    // 42["chatmsg","a"]
    let data = ['chatmsg', message];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_passturn() {
    // 42["passturn"]
    let data = ['passturn'];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @returns {string}
   */
  static parse_pgdrawvote(playerid) {
    // 42["pgdrawvote",2,0]
    let data = ['pgdrawvote', playerid, 0];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_pgswtichroom() {
    // 42["pgswtichroom"]
    let data = ['pgswtichroom'];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_playerafk() {
    // 42["playerafk"]
    let data = ['playerafk'];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_playerrated() {
    // 42["playerrated"]
    let data = ['playerrated'];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} gestureid
   * @returns {string}
   */
  static parse_sendgesture(gestureid) {
    // 42["sendgesture",16]
    let data = ['sendgesture', gestureid];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_sendvote() {
    // 42["sendvote"]
    let data = ['sendvote'];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @returns {string}
   */
  static parse_sendvotekick(playerid) {
    // 42["sendvotekick",93]
    let data = ['sendvotekick', playerid];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} wordid
   * @returns {string}
   */
  static parse_wordselected(wordid) {
    // 42["wordselected",0]
    let data = ['sendvotekick', wordid];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} itemid
   * @param {boolean} isactive
   * @returns {string}
   */
  static parse_activateitem(itemid, isactive) {
    let data = ['clientcmd', 12, [itemid, isactive]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} itemid
   * @returns {string}
   */
  static parse_buyitem(itemid) {
    let data = ['clientcmd', 11, [itemid]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} itemid
   * @param {any} target
   * @param {any} value
   * @returns {string}
   */
  static parse_canvasobj_changeattr(itemid, target, value) {
    // target = zindex || shared
    let data = ['clientcmd', 234, [itemid, target, value]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_canvasobj_getobjects() {
    let data = ['clientcmd', 233];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} itemid
   * @returns {string}
   */
  static parse_canvasobj_remove(itemid) {
    let data = ['clientcmd', 232, [itemid]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} itemid
   * @param {number|string} positionX
   * @param {number|string} positionY
   * @param {number|string} speed
   * @returns {string}
   */
  static parse_canvasobj_setposition(itemid, positionX, positionY, speed) {
    let data = ['clientcmd', 230, [itemid, 100 / positionX, 100 / positionY, { movespeed: speed }]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} itemid
   * @param {number|string} rotation
   * @returns {string}
   */
  static parse_canvasobj_setrotation(itemid, rotation) {
    let data = ['clientcmd', 231, [itemid, rotation]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {any} value
   * @returns {string}
   */
  static parse_customvoting_setvote(value) {
    let data = ['clientcmd', 301, [value]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {any} value
   * @returns {string}
   */
  static parse_getfpid(value) {
    let data = ['clientcmd', 901, [value]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_getinventory() {
    let data = ['clientcmd', 10, [true]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_getspawnsstate() {
    let data = ['clientcmd', 102];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} positionX
   * @param {number|string} positionY
   * @returns {string}
   */
  static parse_moveavatar(positionX, positionY) {
    let data = [
      'clientcmd',
      103,
      [1e4 * Math.floor((positionX / 100) * 1e4) + Math.floor((positionY / 100) * 1e4), false],
    ];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_setavatarprop() {
    let data = ['clientcmd', 115];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} flagid
   * @param {boolean} isactive
   * @returns {string}
   */
  static parse_setstatusflag(flagid, isactive) {
    let data = ['clientcmd', 3, [flagid, isactive]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @param {number|string} tokenid
   * @returns {string}
   */
  static parse_settoken(playerid, tokenid) {
    let data = ['clientcmd', 2, [playerid, tokenid]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @param {any} value
   * @returns {string}
   */
  static parse_snapchatmessage(playerid, value) {
    let data = ['clientcmd', 330, [playerid, value]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_spawnavatar() {
    let data = ['clientcmd', 101];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_startrollbackvoting() {
    let data = ['clientcmd', 320];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_trackforwardvoting() {
    let data = ['clientcmd', 321];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {string} roomID
   * @param {string|undefined} name
   * @param {string|undefined} uid
   * @param {string|undefined} wt
   * @returns {string}
   */
  static parse_startplay(roomID, name, uid, wt) {
    let data = `${420}${JSON.stringify(['startplay', name, 2, 'en', roomID, null, [null, 'https://drawaria.online/', 1000, 1000, [null, uid, wt], null]])}`;
    return data;
  }
  /**
   * @param {number|string} trackid
   * @returns {string}
   */
  static parse_votetrack(trackid) {
    let data = ['clientcmd', 1, [trackid]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @returns {string}
   */
  static parse_requestcanvas(playerid) {
    let data = ['clientnotify', playerid, 10001];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @param {string} base64
   * @returns {string}
   */
  static parse_respondcanvas(playerid, base64) {
    let data = ['clientnotify', playerid, 10002, [base64]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @param {number|string} imageid
   * @returns {string}
   */
  static parse_galleryupload(playerid, imageid) {
    let data = ['clientnotify', playerid, 11, [imageid]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @param {any} type
   * @returns {string}
   */
  static parse_warning(playerid, type) {
    let data = ['clientnotify', playerid, 100, [type]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @param {string} targetname
   * @param {boolean} mute
   * @returns {string}
   */
  static parse_mute(playerid, targetname, mute = false) {
    let data = ['clientnotify', playerid, 1, [mute, targetname]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @param {string} targetname
   * @param {boolean} hide
   * @returns {string}
   */
  static parse_hide(playerid, targetname, hide = false) {
    let data = ['clientnotify', playerid, 3, [hide, targetname]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @param {string} reason
   * @param {string} targetname
   * @returns {string}
   */
  static parse_report(playerid, reason, targetname) {
    let data = ['clientnotify', playerid, 2, [targetname, reason]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
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
  static parse_line(playerid, lastx, lasty, x, y, isactive, size, color, ispixel) {
    let data = ['drawcmd', 0, [lastx / 100, lasty / 100, x / 100, y / 100, isactive, -size, color, playerid, ispixel]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
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
  static parse_erase(playerid, lastx, lasty, x, y, isactive, size, color) {
    let data = ['drawcmd', 1, [lastx / 100, lasty / 100, x / 100, y / 100, isactive, -size, color, playerid]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
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
  static parse_flood(x, y, color, size, r, g, b, a) {
    // 42["drawcmd",2,[x, y,color,{"0":r,"1":g,"2":b,"3":a},size]]
    let data = ['drawcmd', 2, [x / 100, y / 100, color, { 0: r, 1: g, 2: b, 3: a }, size]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @param {number|string} playerid
   * @returns {string}
   */
  static parse_undo(playerid) {
    // 42["drawcmd",3,[playerid]]
    let data = ['drawcmd', 3, [playerid]];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   * @returns {string}
   */
  static parse_clear() {
    // 42["drawcmd",4,[]]
    let data = ['drawcmd', 4, []];
    return `${42}${JSON.stringify(data)}`;
  }
  /**
   */
  static parse_noop() {
    /* 42["drawcmd",5,[0.44882022129015975,0.3157894736842105,0.44882022129015975,0.3157894736842105,true,-12,"#000000",playerid]] */
  }

  constructor() {}

  /**
   * @param {string} event
   * @param {Array<any>|any} data
   */
  call(event, data) {
    const callableEvents = this.#accessPrivateFieldByName(event) ?? [];
    if (callableEvents.length < 1) return;
    callableEvents.forEach((handler) => {
      handler(data);
    });
  }

  /**
   * @param {string} event
   * @param {Function} handler
   */
  addListener(event, handler) {
    this.#accessPrivateFieldByName(event)?.push(handler);
  }

  #accessPrivateFieldByName(name) {
    try {
      return eval('this.' + '#' + name);
    } catch (error) {
      console.error(error);
    }
    return undefined;
  }
}

/**
 * @param {string|undefined} inviteLink
 * @returns {URL}
 */
function getSocketServerURL(inviteLink) {
  if (typeof inviteLink === 'undefined')
    return `wss://sv3.drawaria.online/socket.io/?sid1=undefined&hostname=drawaria.online&EIO=3&transport=websocket`;
  const roomID = getRoomID(inviteLink);
  const [_voidable, serverPrefix] = roomID.split('.');
  return new URL(
    `wss://${typeof serverPrefix === 'undefined' ? '' : 'sv'.concat(serverPrefix, '.')}drawaria.online/socket.io/?sid1=undefined&hostname=drawaria.online&EIO=3&transport=websocket`
  );
}

/**
 * @param {string|undefined} inviteLink
 * @returns {string}
 */
function getRoomID(inviteLink) {
  const inviteURL = new URL(inviteLink);
  return inviteURL.pathname.slice(6);
}

/**
 *
 * @param {string} message
 * @returns {Array<any>|object}
 */
function tryParseJSON(message) {
  try {
    return JSON.parse(message);
  } catch (error) {
    return [];
  }
}

class Player {
  /** @type {string|undefined} */
  name;
  /** @type {string|undefined} */
  uid;
  /** @type {string|undefined} */
  wt;
  /** @type {string|undefined} */
  roomID;

  /** @type {WebSocket|undefined} */
  socket;

  /** @type {EventManager} */
  eventManager;

  /**
   * @param {string|undefined} name
   */
  constructor(name = undefined) {
    this.name = name;
    this.uid = '_';
    this.wt = undefined;
    this.roomID = undefined;
    this.eventManager = new EventManager();

    setInterval(() => {
      this.#sendHeartbeat();
    }, 25000);
  }

  /**
   * @param {string} inviteLink
   */
  connect(inviteLink) {
    if (this.isConnected) return;
    this.#createNewConnection(inviteLink);
  }

  disconnect() {
    this.send('41');
    if (this.isConnected) this.socket.close();
  }

  reconnect() {
    if (!this.isConnected) {
      this.connect(`https://drawaria.online/room/${this.roomID}`);
      return;
    }
    this.send('41');
    this.send('40');
  }

  /**
   * @param {string} inviteLink
   */
  enterRoom(inviteLink) {
    this.roomID = getRoomID(inviteLink);
    this.reconnect();
  }

  nextRoom() {
    this.send(EventManager.parse_pgswtichroom());
  }

  leaveRoom() {
    this.send('41');
  }

  /**
   * @param {string} event
   * @param {Array<any>} data
   */
  emit(event, data) {
    try {
      this.send(emitDictionary[event](...data));
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * @param {string} payload
   */
  send(payload) {
    if (this.isConnected) this.socket.send(payload);
    else console.debug(this);
  }

  /**
   * @returns {boolean}
   */
  get isConnected() {
    return (
      typeof this.socket !== 'undefined' &&
      this.socket instanceof WebSocket &&
      (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)
    );
  }

  #sendHeartbeat() {
    if (this.isConnected) this.socket.send(2);
  }

  /**
   * @param {string} inviteLink
   */
  #createNewConnection(inviteLink) {
    this.socket = new WebSocket(getSocketServerURL(inviteLink));
    this.roomID = getRoomID(inviteLink);
    this.socket.addEventListener('message', (rawMessage) => {
      const [eventType, eventName, eventData] = this.#parseMessageEvent(rawMessage);

      switch (eventType) {
        case '40':
          this.send(EventManager.parse_startplay(this.roomID, this.name, this.uid, this.wt));
          break;
        case '430':
          break;
        case '42':
          this.eventManager.call(eventName, eventData);
          break;
        default:
      }
    });
  }

  /**
   * @param {MessageEvent} messageEvent
   * @returns {[string, string, Array<any>|object]}
   */
  #parseMessageEvent(messageEvent) {
    const rawData = String(messageEvent.data);
    const messageType = (rawData.match(/^\d+/i) ?? [''])[0];
    const messageData = tryParseJSON(rawData.slice(messageType.length));
    return [messageType, Array.isArray(messageData) ? messageData.shift() : '', messageData];
  }
}
