import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  xcolor = { color: '#8B363E' };

  xborde = {
    border: '.25em solid #8B363E'
  };

  xborde2 = {
    border: '.02em solid #8B363E',
    'border-radius': '.55em',
    'background-color': '#8B363E',
    color: 'white'
  };

  xbgColor = {
    'background-color': '#8B363E',
    color: 'white',
    'border-color': '#8B363E',
  };

  constructor() { }

  ngOnInit() { }
}
