import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.component.html',
  styleUrls: ['./error404.component.scss']
})
export class Error404Component implements OnInit {

  constructor() { }

  randomNum(): number {
    return Math.floor(Math.random() * 9) + 1;
  }

  ngOnInit(): void {
    // let loop1: number;
    // let loop2: number;
    // let loop3: number;
    const tiempo = 30;
    let i = 0;

    const selector3 = document.querySelector('.thirdDigit');
    const selector2 = document.querySelector('.secondDigit');
    const selector1 = document.querySelector('.firstDigit');

    const loop3 = setInterval(() => {
      // "use strict";
      if (i > 40) {
        clearInterval(loop3);
        selector3.textContent = '4';
      } else {
        selector3.textContent = this.randomNum().toString();
        i++;
      }
    }, tiempo);

    const loop2 = setInterval(() => {
      // "use strict";
      if (i > 80) {
        clearInterval(loop2);
        selector2.textContent = '0';
      } else {
        selector2.textContent = this.randomNum().toString();
        i++;
      }
    }, tiempo);

    const loop1 = setInterval(() => {
      // "use strict";
      if (i > 100) {
        clearInterval(loop1);
        selector1.textContent = '4';
      } else {
        selector1.textContent = this.randomNum().toString();
        i++;
      }
    }, tiempo);
  }

}
