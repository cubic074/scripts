// ==UserScript==
// @name          Drawaria.Modded - SmoothColorBrush
// @namespace     https://drawaria.online/profile/?uid=63196790-c7da-11ec-8266-c399f90709b7
// @version       1.0.0
// @description   Enables the smooth color gradient setting in drawaria.online
// @author        ≺ᴄᴜʙᴇ³≻
// @match         https://*.drawaria.online/
// @match         https://*.drawaria.online/room/*
// @icon64        data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAPWSURBVHhe7ZjPaxNBFMff5oetWOvNKqJYmyCCQjXqH6AHRS8eBc81FASpbUHwIN4KjfUiaNSr9/bg0R70JoYKFjwkTQsiojfbSqslu37f5KUkadLdabJN4s4Hlpk3P7KZN+9XQgaDIdBY0tYlHo870u1IstnstmcMSRtYjAKkDSzaMcDNp1qN7vc1LiBtYDExQNq6uPmUbp3gdwwxMUATowBpA0vDMaDdMDFAE98tQDdLVNPo+4wFuGAUIG1g8T0G7DYmBmjScgtodpYwFqCJUYC0gaXlMaDZmBigScstQDcLuL3fWIAmRgHSBpaWx4BmY2KAJr5bQLOjvBvGAjRpGwU4jjNdKBT6RNwxfOP8RKPRrnA4fFKG69I2LsCHz+fzP0XcNXxXgC75x1TxvhOjtb/j4kPqtnto2ArRLew4jVVdMlXEoT8Ym3dseh1apWf9j2hdZiroyBiQTdFRZz99wOGnICa2HJ4pjiV4Da/lPcWJStrGBUqfW88CYrHYXC6XO4eb7+IDYfSMWuARx6H50ApdqLaETrKANB6HzV738IxlwU0OYG8VHaOASCQyy63y+Uqm99rUx5ZS/jjrdAi3PiNrFJCr93aOCyQSiWgmk9nIp2DCZT5v4/Cxcdpx9vBdAbq4ZYFmK6DzsgBSm/QUoRClv0/SQRG1adgCvJp4CTcLcrOAhUkakfS3Pf9rHcCHweE+i1gfj3WAbwoo1fZ84+WPTO8YvskC0XVPSiiBtBkmesPVo4xs4psCbNtO+lXbx8foq7VCF2He9yBmlLm7ASWoGqKKhmOAGwsp+osiJCoiLdvUMzhOv0Ws4NMk7esN0aqInLc3BsZoj4hacGBcQ4BE90ZxRJFBTDkvfYXvMQDaWpKuoteiy9LdQo25ir06HEZqRIGUFLEI/2iqwncFwHxUBVcC8sRCGkVpFWrMogkRS1Ts9QPfXWAxRWdtmB7cYHMfTPsLhPvLDr1lWW5+AitOscxgjYPbSfSP0ZwMKZAmP6JJFCW1bgYRIDnwgH7IkMKrC2grQAPOuzEo7BviwAsoYKg47A0c7CX8/zbefwRiDlllBL8Gny9O0Qjm3OuAGnDQHBinJyIq/HSBbnzpFHeiFt2F7b9Xo17AWrWHu8XP4PTF/mzRL3oGBVRUg55A2lQ1RBW+xgDLsm7id/zwsVFai1h0BXX7KzZtmd4Cz/HN81rew3v5M3gO7SCsYYjrALjUNT6Q2uQFrOXaoVY16KcLlLBxqjswX6V9iQlJvPgSPvg4j6G/hP4sbiNd8nk5/FN0yy9pDc9VuNW7Zv0lZjAYggzRPwdv42CLMor1AAAAAElFTkSuQmCC
// @grant         none
// @license       GNU GPLv3
// @run-at        document-idle
// ==/UserScript==

(function (identifier) {
  const Addon = globalThis[identifier].Addon;
  var helper = globalThis['#tools'];

  class SmoothColorBrush extends Addon {
    static dummy = Addon.register('SmoothColorBrush', this);
    static dummy = Addon.bind('Engine', this);

    constructor() {
      super(helper.interface.buildTree('i', { class: 'fas fa-pen' }));
      this.active = false;
      this.init();
    }

    init() {
      const localThis = this;
      {
        let target = document.querySelector('.drawcontrols-popuplist');

        let resizeOberver = new MutationObserver(function (mutations) {
          if (localThis.active)
            if (mutations[0].target.style != 'display:none') {
              mutations[0].target.querySelectorAll('div').forEach((n) => {
                n.removeAttribute('style');
              });
            }
        });
        resizeOberver.observe(target, {
          attributes: true,
        });
      }
      this.#row1();
      this.enable();
    }
    enable() {
      this.active = true;

      this.enableButton.classList.add('active');
      this.enableButton.textContent = 'Active';

      this.log('success', `enabled`);
    }
    disable() {
      this.active = false;

      this.enableButton.classList.remove('active');
      this.enableButton.textContent = 'Inactive';

      this.log('warning', `disabled`);
    }

    #row1() {
      const localThis = this;
      let row = helper.interface.buildRow();
      {
        this.enableButton = helper.interface.buildButton('Enable');

        this.enableButton.addEventListener('click', function (event) {
          localThis.active ? localThis.disable() : localThis.enable();
        });
        row.append(this.enableButton);
      }
      this.elements.section.append(row);
    }
  }
})('CubeEngine');
