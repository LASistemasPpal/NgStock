import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DameCalendario, DameIDMRif, DameTitulos, AutenticaCli } from '@laranda/lib-ultra-net';
import { ConectorService } from '@laranda/lib-sysutil';
import { iif } from 'rxjs';

declare let $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  codgoCliente = '';
  codgoTitulo = '';
  codgoMoneda = '';

  @Output() codCliente = new EventEmitter<string[]>();

  constructor(
    public dameCalendario: DameCalendario,
    public autenticaCli: AutenticaCli,
    private dameIDMRif: DameIDMRif,
    private dameTitulos: DameTitulos,
    private conectorService: ConectorService
  ) {

    if (this.dameCalendario.visible) {
      this.dameCalendario.CadOut.Fecha = this.dameCalendario.CadOut.Fecha.replace(/\//g, '-');

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

  getConsultar(tipo: string) {

    if (tipo === '1') {
      this.dameIDMRif.ParamIn.Id = this.codgoCliente.toUpperCase();
      this.dameIDMRif.ParamIn.Cual = 'I';

      this.dameIDMRif.consultar(this.conectorService.info.URL_REST).then(() => {
        this.codCliente.emit([this.dameIDMRif.CadOut.Rif, tipo, '', '']);
      });

    } else if ((tipo === '2') || (tipo === '3')) {

      this.dameTitulos.ParamIn.Cotitulo = this.codgoTitulo.toUpperCase();
      this.dameTitulos.ParamIn.Mrkt = '';
      this.dameTitulos.ParamIn.Vigencia = 0;
      this.dameTitulos.ParamIn.Moneda = 99;

      this.dameTitulos.consultar(this.conectorService.info.URL_REST).then(() => {
        this.codCliente.emit(['', tipo, this.dameTitulos.CadOut.Isin, this.codgoMoneda.toUpperCase()]);
      });

    } else {
      this.codCliente.emit(['', tipo, '', '']);
    }
  }
}
