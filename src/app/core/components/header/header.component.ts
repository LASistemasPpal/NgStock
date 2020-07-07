import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DameCalendario } from '@laranda/lib-ultra-net';

declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  codgoCliente: string;
  codgoTitulo: string;
  codgoMoneda: string;

  @Output() codCliente = new EventEmitter<string[]>();

  constructor(
    public dameCalendario: DameCalendario
  ) {

    if (this.dameCalendario.visible) {
      Object.assign(this.dameCalendario, {
          xcolor : { color: this.dameCalendario.CadOut.Color },
          xborde : { border: '.25em solid ' + this.dameCalendario.CadOut.Color },
          xborde2 : {
            border: '.02em solid ' + this.dameCalendario.CadOut.Color,
            'border-radius': '.55em',
            'background-color': this.dameCalendario.CadOut.Color,
            color: 'white'
          },
          xbgColor : {
            'background-color': this.dameCalendario.CadOut.Color,
            color: 'white',
            'border-color': this.dameCalendario.CadOut.Color,
          }
      });
    }

  }

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
