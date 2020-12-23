import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'calculator';
  additionalScreenText = '';
  mainScreenText = '';
  digit1: number;
  digit2: number;
  operator = '';
  calculationString = '';
  isAnswered: boolean;
  operatorSet: boolean;

  pressKey(event: any) {
    let key = event.target.id;
    if (key === '/' || key === '*' || key === '-' || key === '+') {
      const lastKey = this.mainScreenText[this.mainScreenText.length - 1];
      if (lastKey === '/' || lastKey === '*' || lastKey === '-' || lastKey === '+') {
        this.operatorSet = true;
      }
      if ((this.operatorSet) || (this.mainScreenText === '')) {
        return;
      }
      this.digit1 = parseFloat(this.mainScreenText);
      this.operator = key;
      this.operatorSet = true;
    }
    if (this.mainScreenText.length === 10) {
      return;
    }
    this.mainScreenText += key;
  }

  clearAll() {
    this.mainScreenText = '';
    this.additionalScreenText = '';
    this.operatorSet = false;
  }

  getAnswer() {
    this.calculationString = this.mainScreenText;
    this.digit2 = parseFloat(this.mainScreenText.split(this.operator)[1]);
    if (this.operator === '/') {
      this.additionalScreenText = this.mainScreenText;
      this.mainScreenText = (this.digit1 / this.digit2).toString();
      this.additionalScreenText = this.calculationString;
      if (this.mainScreenText.length > 9) {
        this.mainScreenText = this.mainScreenText.substr(0, 9);
      }
    } else if (this.operator === '*') {
      this.additionalScreenText = this.mainScreenText;
      this.mainScreenText = (this.digit1 * this.digit2).toString();
      this.additionalScreenText = this.calculationString;
      if (this.mainScreenText.length > 9) {
        this.mainScreenText = 'ERROR';
        this.additionalScreenText = 'Range Exceeded';
      }
    } else if (this.operator === '-') {
      this.additionalScreenText = this.mainScreenText;
      this.mainScreenText = (this.digit1 - this.digit2).toString();
      this.additionalScreenText = this.calculationString;
    } else if (this.operator === '+') {
      this.additionalScreenText = this.mainScreenText;
      this.mainScreenText = (this.digit1 + this.digit2).toString();
      this.additionalScreenText = this.calculationString;
      if (this.mainScreenText.length > 9) {
        this.mainScreenText = 'ERROR';
        this.additionalScreenText = 'Range Exceeded';
      }
    } else {
      this.additionalScreenText = 'ERROR: Invalid Operation';
    }
    this.isAnswered = true;
  }

}