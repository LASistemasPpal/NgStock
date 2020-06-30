import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  xcolor = { color: '#8B363E' };
  xbgColor = {
    'background-color': '#8B363E',
    color: 'white',
    'border-color': '#8B363E',
  };

  constructor() { }

  ngOnInit() {
  }

}
