// ==UserScript==
// @name         Bigger Brush
// @version      1.2
// @description  Bypass the Brush Size Limit (if enabled)
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

(function BetterBrush() {
  const QBit = globalThis[arguments[0]];

  class BetterBrush extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'CubeEngine');

    constructor() {
      super('BetterBrush', '<i class="fas fa-magic"></i>');
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();

      {
        const target = document.querySelector('.drawcontrols-popuplist');

        const visibilityOvserver = new MutationObserver((mutations) => {
          if (this.active)
            if (mutations[0].target.style != 'display:none') {
              mutations[0].target.querySelectorAll('div').forEach((n) => {
                n.removeAttribute('style');
              });
            }
        });

        visibilityOvserver.observe(target, {
          attributes: true,
        });
      }
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
      this.active = true;

      this.htmlElements.toggleStatusButton.classList.add('active');
      this.htmlElements.toggleStatusButton.textContent = 'Active';

      this.notify('success', `enabled`);
    }

    disable() {
      this.active = false;

      this.htmlElements.toggleStatusButton.classList.remove('active');
      this.htmlElements.toggleStatusButton.textContent = 'Inactive';

      this.notify('warning', `disabled`);
    }
  }
})('QBit');
