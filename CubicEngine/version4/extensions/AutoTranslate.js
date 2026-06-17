// ==UserScript==
// @name         Auto Translate
// @version      1.2
// @description  Automatically translate chatmessages (if enabled)
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

(function AutoTranslate() {
  const QBit = globalThis[arguments[0]];

  const unicodeLanguagePatterns = new Map();
  unicodeLanguagePatterns.set('Common', /\p{Script=Common}+/u); // CommonPattern
  unicodeLanguagePatterns.set('Arabic', /\p{Script=Arabic}+/u); // ArabicPattern
  unicodeLanguagePatterns.set('Armenian', /\p{Script=Armenian}+/u); // ArmenianPattern
  unicodeLanguagePatterns.set('Bengali', /\p{Script=Bengali}+/u); // BengaliPattern
  unicodeLanguagePatterns.set('Bopomofo', /\p{Script=Bopomofo}+/u); // BopomofoPattern
  unicodeLanguagePatterns.set('Braille', /\p{Script=Braille}+/u); // BraillePattern
  unicodeLanguagePatterns.set('Buhid', /\p{Script=Buhid}+/u); // BuhidPattern
  unicodeLanguagePatterns.set('Canadian_Aboriginal', /\p{Script=Canadian_Aboriginal}+/u); // Canadian_AboriginalPattern
  unicodeLanguagePatterns.set('Cherokee', /\p{Script=Cherokee}+/u); // CherokeePattern
  unicodeLanguagePatterns.set('Cyrillic', /\p{Script=Cyrillic}+/u); // CyrillicPattern
  unicodeLanguagePatterns.set('Devanagari', /\p{Script=Devanagari}+/u); // DevanagariPattern
  unicodeLanguagePatterns.set('Ethiopic', /\p{Script=Ethiopic}+/u); // EthiopicPattern
  unicodeLanguagePatterns.set('Georgian', /\p{Script=Georgian}+/u); // GeorgianPattern
  unicodeLanguagePatterns.set('Greek', /\p{Script=Greek}+/u); // GreekPattern
  unicodeLanguagePatterns.set('Gujarati', /\p{Script=Gujarati}+/u); // GujaratiPattern
  unicodeLanguagePatterns.set('Gurmukhi', /\p{Script=Gurmukhi}+/u); // GurmukhiPattern
  unicodeLanguagePatterns.set('Han', /\p{Script=Han}+/u); // HanPattern
  unicodeLanguagePatterns.set('Hangul', /\p{Script=Hangul}+/u); // HangulPattern
  unicodeLanguagePatterns.set('Hanunoo', /\p{Script=Hanunoo}+/u); // HanunooPattern
  unicodeLanguagePatterns.set('Hebrew', /\p{Script=Hebrew}+/u); // HebrewPattern
  unicodeLanguagePatterns.set('Hiragana', /\p{Script=Hiragana}+/u); // HiraganaPattern
  unicodeLanguagePatterns.set('Inherited', /\p{Script=Inherited}+/u); // InheritedPattern
  unicodeLanguagePatterns.set('Kannada', /\p{Script=Kannada}+/u); // KannadaPattern
  unicodeLanguagePatterns.set('Katakana', /\p{Script=Katakana}+/u); // KatakanaPattern
  unicodeLanguagePatterns.set('Khmer', /\p{Script=Khmer}+/u); // KhmerPattern
  unicodeLanguagePatterns.set('Lao', /\p{Script=Lao}+/u); // LaoPattern
  unicodeLanguagePatterns.set('Latin', /\p{Script=Latin}+/u); // LatinPattern
  unicodeLanguagePatterns.set('Limbu', /\p{Script=Limbu}+/u); // LimbuPattern
  unicodeLanguagePatterns.set('Malayalam', /\p{Script=Malayalam}+/u); // MalayalamPattern
  unicodeLanguagePatterns.set('Mongolian', /\p{Script=Mongolian}+/u); // MongolianPattern
  unicodeLanguagePatterns.set('Myanmar', /\p{Script=Myanmar}+/u); // MyanmarPattern
  unicodeLanguagePatterns.set('Ogham', /\p{Script=Ogham}+/u); // OghamPattern
  unicodeLanguagePatterns.set('Oriya', /\p{Script=Oriya}+/u); // OriyaPattern
  unicodeLanguagePatterns.set('Runic', /\p{Script=Runic}+/u); // RunicPattern
  unicodeLanguagePatterns.set('Sinhala', /\p{Script=Sinhala}+/u); // SinhalaPattern
  unicodeLanguagePatterns.set('Syriac', /\p{Script=Syriac}+/u); // SyriacPattern
  unicodeLanguagePatterns.set('Tagalog', /\p{Script=Tagalog}+/u); // TagalogPattern
  unicodeLanguagePatterns.set('Tagbanwa', /\p{Script=Tagbanwa}+/u); // TagbanwaPattern
  unicodeLanguagePatterns.set('Tamil', /\p{Script=Tamil}+/u); // TamilPattern
  unicodeLanguagePatterns.set('Telugu', /\p{Script=Telugu}+/u); // TeluguPattern
  unicodeLanguagePatterns.set('Thaana', /\p{Script=Thaana}+/u); // ThaanaPattern
  unicodeLanguagePatterns.set('Thai', /\p{Script=Thai}+/u); // ThaiPattern
  unicodeLanguagePatterns.set('Tibetan', /\p{Script=Tibetan}+/u); // TibetanPattern
  unicodeLanguagePatterns.set('Yi', /\p{Script=Yi}+/u); // YiPattern

  const observeDOM = (function () {
    const MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
    /**
     * @param {HTMLElement} nodeToObserve
     * @param {Function} callback
     */
    return function (nodeToObserve, callback) {
      if (!nodeToObserve || nodeToObserve.nodeType !== 1) return;

      if (MutationObserver) {
        // define a new observer
        var mutationObserver = new MutationObserver(callback);

        // have the observer observe for changes in children
        mutationObserver.observe(nodeToObserve, { childList: true, subtree: !1 });
        return mutationObserver;
      }

      // browser support fallback
      else if (window.addEventListener) {
        nodeToObserve.addEventListener('DOMNodeInserted', callback, false);
        nodeToObserve.addEventListener('DOMNodeRemoved', callback, false);
      }
    };
  })();

  class AutoTranslate extends QBit {
    static dummy1 = QBit.register(this);
    static dummy2 = QBit.bind(this, 'CubeEngine');

    active;

    constructor() {
      super('AutoTranslate', '<i class="fas fa-language"></i>');
      this.#onStartup();
    }

    #onStartup() {
      this.#loadInterface();

      this.active = false;

      const observable = document.querySelector('#chatbox_messages');

      observeDOM(observable, (mutation) => {
        if (!this.active) return;

        const addedNodes = [];
        const removedNodes = [];

        mutation.forEach((record) => record.addedNodes.length & addedNodes.push(...record.addedNodes));
        mutation.forEach((record) => record.removedNodes.length & removedNodes.push(...record.removedNodes));

        // console.log('Added:', addedNodes, 'Removed:', removedNodes);

        addedNodes.forEach((node) => {
          if (node.classList.contains('systemchatmessage5')) return;
          if (node.querySelector('.playerchatmessage-selfname')) return;
          if (!node.querySelector('.playerchatmessage-text')) return;

          // console.log(node);
          const message = node.querySelector('.playerchatmessage-text');
          const text = message.textContent;
          const language = this.detectLanguage(text);

          if (language)
            this.translate(text, language, 'en', (translation) => {
              applyTitleToChatMessage(translation, message);
            });
        });

        function applyTitleToChatMessage(text, node) {
          node.title = text;
        }
      });
    }

    #loadInterface() {
      this.#row1();
      this.#row2();
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

    #row2() {}

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

    detectLanguage(text) {
      if (unicodeLanguagePatterns.get('Cyrillic').test(text)) return 'ru';
      if (unicodeLanguagePatterns.get('Arabic').test(text)) return 'ar';
      if (unicodeLanguagePatterns.get('Greek').test(text)) return 'el';
    }

    translate(textToTranslate, from = 'ru', to = 'en', callback) {
      const sourceText = textToTranslate;
      const sourceLang = from;
      const targetLang = to;

      const url =
        'https://translate.googleapis.com/translate_a/single?client=gtx&sl=' +
        sourceLang +
        '&tl=' +
        targetLang +
        '&dt=t&q=' +
        encodeURI(sourceText);

      xhrGetJson(url, log);

      function log(data) {
        callback(data[0][0][0]);
      }
    }
  }

  function xhrGetJson(url, callback) {
    const req = new XMLHttpRequest();

    req.onload = (e) => {
      const response = req.response; // not responseText
      if (!callback) return;
      try {
        callback(JSON.parse(response));
      } catch (error) {
        console.log(error);
      }
    };
    req.open('GET', url);
    req.send();
  }
})('QBit');
