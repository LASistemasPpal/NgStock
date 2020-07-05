import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DameCalendario } from '@laranda/lib-ultra-net';

declare let $: any;
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


  codgoCliente: string;
  codgoTitulo: string;
  codgoMoneda: string;

  @Output() codCliente = new EventEmitter<string[]>();

  constructor(
    public dameCalendario: DameCalendario
  ) { }

  ngOnInit() {
    $('[data-toggle="tooltip"]').tooltip();
  }

  getDatosM() {
    this.codCliente.emit([this.codgoCliente, '1']);
  }

  getCOrden() {
    this.codCliente.emit([this.codgoCliente, '2']);
  }

  getDatosM_Ant() {
    this.codCliente.emit([this.codgoCliente, '3']);
  }
}
