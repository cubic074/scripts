// ==UserScript==
// @name         ---
// @version      1.1
// @description  Enhance your Experience
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

(function () {
	const QBit = globalThis[arguments[0]];

	class Extension1 extends QBit {
		static dummy1 = QBit.register(this);
		static dummy2 = QBit.bind(this, 'CubeEngine');

		constructor() {
			super('Extension1', '<i class="fas fa-brush"></i>');
			this.#onStartup();
		}

		#onStartup() {
			this.#loadInterface();
		}

		#loadInterface() {
			this.#row1();
			this.#row2();
			this.#row3();
			this.#row4();
		}

		#row1() {}
		#row2() {}
		#row3() {}
		#row4() {}
	}
})('QBit');
