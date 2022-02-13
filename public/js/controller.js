/* eslint-disable max-len */
class Controller {
  constructor(inputRub, inputCur, buttons, view) {
    this.currency = 'USD';
    this.rubInp = inputRub.querySelector('input');
    this.curInp = inputCur.querySelector('input');
    this.buttons = [...buttons.querySelectorAll('input')];
    this.rubInpValue = 1;
    this.curInpValue = 0.01;
    this.view = view;
  }

  async setButtonsListen() {
    this.buttons.forEach((el) => {
      el.addEventListener('click', async (e) => {
        this.currency = e.target.name;
        this.curInpValue = await this.getCoff() * this.rubInpValue;
        this.render();
      });
    });
  }

  setInputsListen() { 
    this.rubInp.addEventListener('keyup', async (e) => {
      this.rubInpValue = Number.isNaN(e.target.value * 1) ? this.rubInpValue : e.target.value;
      this.curInpValue = this.rubInpValue * await this.getCoff();
      this.render();
    });
    this.curInp.addEventListener('keyup', async (e) => {
      this.curInpValue = Number.isNaN(e.target.value * 1) ? this.curInpValue : e.target.value;
      this.rubInpValue = this.curInpValue / await this.getCoff();
      this.render();
    });
    this.rubInp.addEventListener('click', async (e) => {
      e.target.value = '';
    });
    this.curInp.addEventListener('click', async (e) => {
      e.target.value = '';
    });
  }

  async getCoff() {
    let coff = await fetch(`https://api.exchangerate.host/latest?base=RUB&symbols=${this.currency}`);
    coff = (await coff.json()).rates[this.currency];
    return coff;
  }

  render() {
    this.view.render(Math.round(1000 * this.rubInpValue) / 1000, Math.round(1000 * this.curInpValue) / 1000, this.currency);
  }

  async init() {
    this.curInpValue = await this.getCoff();
    this.setButtonsListen();
    this.setInputsListen();
    this.render();
  }
}
