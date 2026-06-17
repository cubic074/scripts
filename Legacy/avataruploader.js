// ==UserScript==
// @name         Avatar Uploader
// @version      1.1
// @description  Upload images and small gifs to your avatar
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
  function uploadToAvatar(img) {
    return fetch(window.LOGGEDIN ? 'https://drawaria.online/saveavatar' : 'https://drawaria.online/uploadavatarimage', {
      method: 'POST',
      body: 'imagedata=' + encodeURIComponent(img) + '&fromeditor=true',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        Accept: 'text/plain, */*; q=0.01',
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
      .then((e) => e.text())
      .then((e) => {
        const [uid, wt] = String(e).split('.', 2);
        document.cookie = 'wt=' + wt + '; Max-Age=315360000; Path=/; Secure; Partitioned; SameSite=None';
      });
  }

  function avatarUploaderVisual() {
    document.querySelectorAll('label[for="avataruploader"]').forEach((e) => e.remove());
    let input = document.createElement('input');
    input.style.display = 'none';
    input.id = 'avataruploader';
    input.type = 'file';
    input.addEventListener('change', onchange);

    let label = document.createElement('label');
    label.style = 'display:flex; text-align: left;';
    label.className = 'badge border btn-outline-primary border-primary';
    label.innerHTML =
      '<img class="playerlist-avatar" src="https://media.tenor.com/pOv7SnZx7xAAAAAC/upload-cat.gif"><div class="playerlist-name"><span>Upload to Avatar</span><br/><sub>by ≺ᴄᴜʙᴇ³≻</sub></div>';
    label.setAttribute('for', input.id);
    label.append(input);

    function onchange() {
      if (!this.files || !this.files[0]) return;
      let e = new FileReader();
      e.addEventListener('load', (e) => {
        let a = e.target.result.replace('image/gif', 'image/png');
        uploadToAvatar(a);
      });
      e.readAsDataURL(this.files[0]);
    }

    document.querySelector('#playerlist').before(label);
  }

  return avatarUploaderVisual;
})()();

/**
 *<h2>drawaria.modded</h2>
 *<div>
 *  <h3>Avatar Uploader</h3>
 *  <div>This script allows the user to upload an Image (png, jpg, gif) to their user avatar.</div>
 *  <div><a href="//drawaria.online/test">Drawaria.Online</a> may change the allowed image size in the future.</div>
 *  <br>
 *  <details open>
 *    <summary>IMPORTANT</summary>
 *    <div>The Uploader will send you a response in form of an alert notification.</div>
 *    <div>It either informs you that everything went "OK" and you should see your avatar after a short while.</div>
 *    <div>Otherwise you can receive a warning message stating, that the image was to large.</div>
 *  </details>
 *  <details open>
 *    <summary>WARNING</summary>
 *    <div>Although this script only modifies local client settings, these changes are visible to online players!</div>
 *  </details>
 *</div>
 */
