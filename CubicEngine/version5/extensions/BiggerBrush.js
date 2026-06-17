// ==UserScript==
// @name         Better Brush
// @version      1.1
// @description  Show all Brush Options in any gamemode (if enabled)
// @namespace    drawaria.modded.partial
// @homepage     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://drawaria.online/
// @match        https://drawaria.online/room/*
// @icon         https://drawaria.online/avatar/cache/e53693c0-18b1-11ec-b633-b7649fa52d3f.jpg
// @grant        none
// @license      GNU GPLv3
// @run-at       document-end
// ==/UserScript==

(function BiggerBrush() {
  const QBit = globalThis[arguments[0]];

  class BiggerBrush extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'CubeEngine');

    active;
    constructor() {
      super('BiggerBrush', '<i class="fas fa-brush"></i>');
      this.active = false;
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();
      this.drawwidthrangeSlider = document.querySelector('#drawwidthrange');
      // this.enable();
    }

    #loadInterface() {
      this.#row1();
    }

    #row1() {
      const row = domMake.Row();
      {
        const enableButton = domMake.Button('Enable');

        enableButton.addEventListener('click', (event) => {
          this.active ? this.disable() : this.enable();
        });
        row.appendChild(enableButton);
        this.htmlElements.toggleStatusButton = enableButton;
      }
      this.htmlElements.section.appendChild(row);
    }

    enable() {
      document.querySelectorAll('.drawcontrols-button').forEach((n) => {
        n.classList.remove('drawcontrols-disabled');
      });
      this.active = true;

      this.htmlElements.toggleStatusButton.classList.add('active');
      this.htmlElements.toggleStatusButton.textContent = 'Active';

      this.drawwidthrangeSlider.parentElement.previousElementSibling.lastElementChild.click();
      this.drawwidthrangeSlider.parentElement.style.display = 'flex';
      this.drawwidthrangeSlider.max = 48;
      this.drawwidthrangeSlider.min = -2000;

      this.notify('success', `enabled`);
    }

    disable() {
      this.active = false;

      this.htmlElements.toggleStatusButton.classList.remove('active');
      this.htmlElements.toggleStatusButton.textContent = 'Inactive';

      this.drawwidthrangeSlider.max = 45;
      this.drawwidthrangeSlider.min = -100;

      this.notify('warning', `disabled`);
    }
  }
})('QBit');
