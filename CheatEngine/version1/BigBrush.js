// ==UserScript==
// @name         BigBrush
// @namespace    CheatEngine
// @version      1.0.0
// @description  Go Big or go Home
// @author       ≺ᴄᴜʙᴇ³≻
// @match        https://*.drawaria.online/*
// @icon64       data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant        none
// @license      GNU GPLv3
// @run-at       document-idle
// ==/UserScript==

(function (scope) {
  let helper = scope['CodeMaid'];
  // let Engine = scope['🎮'];
  let Cheat = scope['📦'];

  class BigBrush extends Cheat {
    static dummy = Cheat.bind(this, 'main');

    constructor(parentClassReference) {
      super(parentClassReference);

      this.setIcon(helper.createDOM.FA('<i class="fas fa-brush"></i>'));

      this.init();
    }

    init() {
      this.drawwidthrangeSlider = document.querySelector('#drawwidthrange');
      this.#row1();
      this.enable();
    }
    enable() {
      this.active = true;
      this.drawwidthrangeSlider.parentElement.style.display = 'flex';
      this.drawwidthrangeSlider.max = 48;
      this.drawwidthrangeSlider.min = -2000;

      this.enableButton.classList.add('active');
      this.enableButton.textContent = 'Active';

      this.log('ok', `${this.name} enabled`);
    }
    disable() {
      this.active = false;
      this.drawwidthrangeSlider.max = 45;
      this.drawwidthrangeSlider.min = -100;

      this.enableButton.classList.remove('active');
      this.enableButton.textContent = 'Inactive';

      this.log('warn', `${this.name} disabled`);
    }
    #row1() {
      let self = this;
      let row = helper.createDOM.Row();
      {
        this.enableButton = helper.createDOM.Button('Enable');

        this.enableButton.addEventListener('click', function (event) {
          self.active ? self.disable() : self.enable();
        });
        row.append(this.enableButton);
      }
      this.body.append(row);
    }
  }
})(globalThis);
