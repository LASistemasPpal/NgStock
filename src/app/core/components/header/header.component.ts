import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DameCalendario, DameIDMRif, DameTitulos, AutenticaCli, InsertaPolicia } from '@laranda/lib-ultra-net';
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
  OTC = '';
  mecaOTC = false;

  @Output() codConsulta = new EventEmitter<string[]>();

  constructor(
    public dameCalendario: DameCalendario,
    private autenticaCli: AutenticaCli,
    private dameIDMRif: DameIDMRif,
    private dameTitulos: DameTitulos,
    private conectorService: ConectorService,
    private colorGrid: ColorGrid,
    private insertaPolicia: InsertaPolicia
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
    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
  }

  getConsultar(tipo: string) {

    if (tipo !== '0') {
      this.guardaPolicia(tipo);
    }

    this.dameTitulos.ParamIn.Cotitulo = '';
    this.OTC = '';
    if (this.mecaOTC) {this.OTC = 'OTC'; }

    if ((tipo === '1') && (this.codgoCliente.length === 6)) {
      this.dameIDMRif.ParamIn.Id = this.codgoCliente.toUpperCase();
      this.dameIDMRif.ParamIn.Cual = 'I';
      this.dameIDMRif.consultar(this.conectorService.info.URL_REST).then(() => {
        this.codConsulta.emit([this.dameIDMRif.CadOut.Rif, tipo, '', '', '']);
      }).catch(e => e);

    } else if (tipo === '9')  {
      if (this.codgoTitulo.length === 6) {
        this.dameTitulos.ParamIn.Cotitulo = this.codgoTitulo.toUpperCase();
        this.dameTitulos.ParamIn.Mrkt = '';
        this.dameTitulos.ParamIn.Vigencia = 0;
        this.dameTitulos.ParamIn.Moneda = 99;
        this.dameTitulos.consultar(this.conectorService.info.URL_REST).then(() => {
          this.codConsulta.emit(['', tipo, this.codgoTitulo.toUpperCase(), '', '']);
        });
      }
       else {
      this.codConsulta.emit(['', tipo, this.codgoTitulo.toUpperCase(), '', '']); }

    }
    else if ((tipo === '2') && (((this.codgoTitulo.length === 6) || (this.codgoTitulo.length === 0)) &&
      ((this.codgoMoneda.length === 3) || (this.codgoMoneda.length === 0)))) {
      this.codConsulta.emit(['', tipo, this.codgoTitulo.toUpperCase(), this.codgoMoneda.toUpperCase(), this.OTC]);

    }
    else
     if (tipo === 'A') {  // OTC
      if (this.codgoTitulo.length === 6) {
        this.dameTitulos.ParamIn.Cotitulo = this.codgoTitulo.toUpperCase();
        this.dameTitulos.ParamIn.Mrkt = '';
        this.dameTitulos.ParamIn.Vigencia = 0;
        this.dameTitulos.ParamIn.Moneda = 99;

        this.dameTitulos.consultar(this.conectorService.info.URL_REST).then(() => {
          this.codConsulta.emit(['', tipo, this.dameTitulos.CadOut.Isin, this.codgoMoneda.toUpperCase(), '']);
        });
      } else {
        this.codConsulta.emit(['', tipo, this.codgoTitulo.toUpperCase(), this.codgoMoneda.toUpperCase(), '']);
      }

     } else { //   bolsa de valores
      if (((tipo === '3') || (tipo === '4') || (tipo === '5') || (tipo === '6') || (tipo === '8')) &&
          (((this.codgoTitulo.length === 6) || (this.codgoTitulo.length === 0)) &&
          ((this.codgoMoneda.length === 3) || (this.codgoMoneda.length === 0)))) {

        if (this.codgoTitulo.length === 6) {
          this.dameTitulos.ParamIn.Cotitulo = this.codgoTitulo.toUpperCase();
          this.dameTitulos.ParamIn.Mrkt = '';
          this.dameTitulos.ParamIn.Vigencia = 0;
          this.dameTitulos.ParamIn.Moneda = 99;

          this.dameTitulos.consultar(this.conectorService.info.URL_REST).then(() => {
            this.codConsulta.emit(['', tipo, this.dameTitulos.CadOut.Isin, this.codgoMoneda.toUpperCase(), '']);
          });
        } else {
          this.codConsulta.emit(['', tipo, this.codgoTitulo.toUpperCase(), this.codgoMoneda.toUpperCase(), '']);
        }
      } else
      if ((tipo === '0') || (tipo === '7')){
        this.codConsulta.emit(['', tipo, '', '', '']);
      }
    }
  }

  logOut() {
    this.insertaPolicia.consultar(this.conectorService.info.URL_REST, this.conectorService.info.NUCLI,
      'Saliendo del sistema', 'NgStock', 'C', 1);

    this.autenticaCli.logOut();
  }

  guardaPolicia(tipo) {
    let texto = '';

    switch (tipo) {
      case '1':
        texto = 'Buscar Cliente';
        break;

      case '2':
        if (!this.mecaOTC) {
          texto = 'Ordenes Bolsa';
        } else {
          texto = 'Ordenes OTC';
        }
        break;

      case '3':
        texto = 'Refrescar Datos';
        break;

      case '4':
        texto = 'Posturas Propias';
        break;

      case '5':
        texto = 'Posturas Mercado';
        break;

      case '6':
        texto = 'Operaciones Propias';
        break;

      case '7':
        texto = 'Riesgo Liquidez';
        break;

      case '8':
        texto = 'Operaciones Mercado';
        break;

      case '9':
        texto = 'Posicion Propia';
        break;

      case 'A':
        texto = 'Operaciones OTC';
        break;
    }

    this.insertaPolicia.consultar(this.conectorService.info.URL_REST, this.conectorService.info.NUCLI,
      texto, 'NgStock', 'C', 1);
  }
}
