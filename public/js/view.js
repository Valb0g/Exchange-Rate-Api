class View {
  constructor(inputRub, inputCur) {
    this.rubInp = inputRub.querySelector('input');
    this.curInp = inputCur.querySelector('input');
    this.curSym = inputCur.querySelector('span');
  }

  render(sumRub, sumCur, currency) {
    this.rubInp.value = sumRub;
    this.curInp.value = sumCur;
    this.curSym.innerText = currency;
  }
}
