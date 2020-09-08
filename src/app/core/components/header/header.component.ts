import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DameCalendario, DameIDMRif, DameTitulos, AutenticaCli } from '@laranda/lib-ultra-net';
import { ConectorService, ColorGrid } from '@laranda/lib-sysutil';

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

  @Output() codConsulta = new EventEmitter<string[]>();

  constructor(
    public dameCalendario: DameCalendario,
    public autenticaCli: AutenticaCli,
    private dameIDMRif: DameIDMRif,
    private dameTitulos: DameTitulos,
    private conectorService: ConectorService,
    private colorGrid: ColorGrid
  ) {

    if (this.dameCalendario.visible) {
      this.dameCalendario.CadOut.Fecha = this.dameCalendario.CadOut.Fecha.replace(/\//g, '-');
      this.colorGrid.colorTablaH =  this.dameCalendario.CadOut.Color;

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
    this.dameTitulos.ParamIn.Cotitulo = '';

    if ((tipo === '1') && (this.codgoCliente.length === 6)) {
      this.dameIDMRif.ParamIn.Id = this.codgoCliente.toUpperCase();
      this.dameIDMRif.ParamIn.Cual = 'I';

      this.dameIDMRif.consultar(this.conectorService.info.URL_REST).then(() => {
        this.codConsulta.emit([this.dameIDMRif.CadOut.Rif, tipo, '', '']);
      }).catch(e => e);

    } else if ((tipo === '2') && (((this.codgoTitulo.length === 6) || (this.codgoTitulo.length === 0)) &&
      ((this.codgoMoneda.length === 3) || (this.codgoMoneda.length === 0)))) {
      this.codConsulta.emit(['', tipo, this.codgoTitulo.toUpperCase(), this.codgoMoneda.toUpperCase()]);

    } else if (((tipo === '3') || (tipo === '4') || (tipo === '5') || (tipo === '6') || (tipo === '8')) &&
        (((this.codgoTitulo.length === 6) || (this.codgoTitulo.length === 0)) &&
        ((this.codgoMoneda.length === 3) || (this.codgoMoneda.length === 0)))) {

      if (this.codgoTitulo.length === 6) {
        this.dameTitulos.ParamIn.Cotitulo = this.codgoTitulo.toUpperCase();
        this.dameTitulos.ParamIn.Mrkt = '';
        this.dameTitulos.ParamIn.Vigencia = 0;
        this.dameTitulos.ParamIn.Moneda = 99;

        this.dameTitulos.consultar(this.conectorService.info.URL_REST).then(() => {
          this.codConsulta.emit(['', tipo, this.dameTitulos.CadOut.Isin, this.codgoMoneda.toUpperCase()]);
        });
      } else {
        this.codConsulta.emit(['', tipo, this.codgoTitulo.toUpperCase(), this.codgoMoneda.toUpperCase()]);
      }
    } else if ((tipo === '0') || (tipo === '7')){
      this.codConsulta.emit(['', tipo, '', '']);
    }
  }
}
