// ==UserScript==
// @name         Cheat - Engine
// @namespace    https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version      1.0.0
// @description  Start the Engine. Load last
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

  class Engine extends Cheat {
    static dummy = Cheat.set('Engine', this);

    constructor() {
      super();
      this._initialize();
      activateStyles();
      loadExternals();
    }
  }

  function activateStyles() {
    let myStyleSheet = CodeMaid.createDOM.Tree('style', {}, [
      `body * {margin: 0; padding: 0; box-sizing: border-box; line-height: normal;}`,
      `#🧊 {--CE-bg_color: var(--light); --CE-color: var(--dark); line-height: 2rem; font-size: 1rem;}`,
      `#🧊 {position:relative; overflow:visible; z-index: 999; background-color: var(--CE-bg_color); border: var(--CE-color) 1px solid; border-radius: .25rem;}`,
      `#🧊 .btn {padding: 0;}`,
      `#🧊 details {margin: 1px 0; border-top: var(--CE-color) 1px solid;}`,
      `.icon-list {display: flex; flex-flow: wrap;}`,
      `.nowrap {overflow-x: scroll; padding-bottom: 12px; flex-flow: nowrap;}`,
      `.icon {display: flex; flex: 0 0 auto; max-width: 1.6rem; min-width: 1.6rem; height: 1.6rem; border-radius: .25rem; border: 1px solid var(--gray); aspect-ratio: 1/1;}`,
      `.icon > * {margin: auto; text-align: center; max-height: 100%; max-width: 100%;}`,
      `.itext {text-align: center; -webkit-appearance: none; -moz-appearance: textfield;}`,
      `.ce_row {display: flex; width: 100%;}`,
      `.ce_row > * {width: 100%;}`,
      `input[name][hidden]:not(:checked) + * {display: none !important;}`,
      `hr {margin: 5px 0;}`,
      `.playerlist-row::after {content: attr(data-playerid); position: relative; float: right; top: -20px;}`,
      `[hidden] {display: none !important;}`,
      `.noselect {-webkit-touch-callout: none; -webkit-user-select: none; -moz-user-select: none; user-select: none;}`,
      `.floatingImage {position: absolute;}`,
    ]);
    document.head.append(myStyleSheet);
  }

  function loadExternals() {
    let FontAwesome = CodeMaid.createDOM.Tree('link', {
      rel: 'stylesheet',
      href: 'https://site-assets.fontawesome.com/releases/v6.4.0/css/all.css',
    });
    let ChromaJS = CodeMaid.createDOM.Tree('script', {
      src: 'https://cdnjs.cloudflare.com/ajax/libs/chroma-js/2.4.2/chroma.min.js',
    });
    document.head.append(FontAwesome);
    document.head.append(ChromaJS);
  }

  function uploadToAvatar(img) {
    fetch(window.LOGGEDIN ? 'https://drawaria.online/saveavatar' : 'https://drawaria.online/uploadavatarimage', {
      method: 'POST',
      body: 'imagedata=' + encodeURIComponent(img) + '&fromeditor=true',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Accept: 'text/plain, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
      },
    }).then((e) => alert(e.statusText));
  }

  function uploadToGallery(img = [], guestplayernames = [], playeruids = [], roomid = '', targetword = '') {
    fetch(`https://galleryhost.drawaria.online/gallery/uploadimage/?sessionid=${Cookies.get('sid1')}`, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' },
      body: `imagedata=${encodeURIComponent(img[0])}&imagedata1=${encodeURIComponent(img[img.length - 1])}&targetword=${targetword}&guestplayernames=${JSON.stringify(guestplayernames)}&room=${roomid}&playeruids=${JSON.stringify(guestplayernames)}`,
      method: 'POST',
      mode: 'cors',
    });
  }

  return {
    autostart: function (delay) {
      CodeMaid.cleanup.all();
      setTimeout(() => {
        console.clear();
        let instance = new Engine();
        instance.elements.details.open = false;
        instance.elements.details.id = '🧊';

        let target = document.getElementById('accountbox');
        let con = CodeMaid.createDOM.Tree('div', { style: 'height: 1.5rem; flex: 0 0 auto;' });
        con.append(instance.elements.details);
        target.after(con);
        target.after(CodeMaid.createDOM.Tree('hr'));

        CodeMaid.cleanup.all();
        globalThis['#CheatEngine'] = instance;
        globalThis['uploadToAvatar'] = uploadToAvatar;
        globalThis['uploadToGallery'] = uploadToGallery;
      }, delay);
    },
  };
})(globalThis).autostart(200);
