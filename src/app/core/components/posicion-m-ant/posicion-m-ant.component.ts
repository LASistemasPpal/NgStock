import { Component, OnInit, Input } from '@angular/core';
import { DamePosicionMAnt, DameCalendario } from '@laranda/lib-ultra-net';
import { ConectorService, ColorGrid } from '@laranda/lib-sysutil';

@Component({
  selector: 'app-posicion-m-ant',
  templateUrl: './posicion-m-ant.component.html',
  styleUrls: ['./posicion-m-ant.component.scss']
})
export class PosicionMAntComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];

  @Input() codRif: string;
  @Input() fecha: string;

  constructor(
    public damePosicionMAnt: DamePosicionMAnt,
    private conectorService: ConectorService,
    private dameCalendario: DameCalendario,
    private colorGrid: ColorGrid
  ) {

    this.dtColumnas = [
      { title:  this.colorGrid.tablaH('Producto'),
        data: null, render: (data: any, type: any, row: any, meta) => {
        let chara = data.Producto.substr(3, 100).trim();

        if (data.Producto.substr(0, 2) === 'MM') {
          chara = data.Titulo + ' ' + data.Producto.substr(3, 100).trim();
        }

        if (data.Producto.substr(0, 2) === 'RV') {
          chara = data.Producto.substr(3, 100).trim();
        }
        if (data.Producto.substr(0, 2) === 'RF') {
          chara = data.Producto.substr(3, 100).trim() + ' ' + data.Titulo;
        }

        if ((data.Producto.substr(0, 2) === 'CV') || (data.Producto.substr(0, 2) === 'SB')) {
          chara = `${data.Tipocv} ${data.Titulo} ${data.Rend} ${data.Producto.substr(3, 100).trim()}`;
        }

        if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo !== 'SIMPLE')) {
          chara = `MT ${data.Titulo} ${data.Rend} ${data.Producto.substr(3, 100).trim()}`;
        }

        if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo === 'SIMPLE')) {
          chara = `MS ${data.Titulo} ${data.Pcontraprest} ${data.Producto.substr(3, 100).trim()}`;
        }

        return chara;
      }},
      { title:  this.colorGrid.tablaH('Mon'), data: 'Moneda_abrevia' },
      { title:  this.colorGrid.tablaH('Saldo Ini'), data: null, render: (data: any, type: any, row: any, meta) => {
        let saldoX = data.Saldofin;

        if ((data.Producto.substr(0, 2) === 'CV') || (data.Producto.substr(0, 2) === 'SB')) {
          saldoX = data.Efecini;
        }

        if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo === 'SIMPLE')) {
          saldoX = data.Intvcto;
        }

        if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo !== 'SIMPLE')) {
          saldoX = data.Saldofin;
        }

        return saldoX;
      }, className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('Fecha Ini'), data: 'Ini' },
      { title:  this.colorGrid.tablaH('Fecha Fin'), data: null, render: (data: any, type: any, row: any, meta) => {
        let fechaX = data.Ffin;

        if ((data.Producto.substr(0, 2) === 'CV') || (data.Producto.substr(0, 2) === 'SB')) {
          fechaX = data.Ffin;
        }
        if (data.Producto.substr(0, 2) === 'RF')  {
          fechaX = data.Fvencimiento;
        }

        if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo === 'SIMPLE')) {
          fechaX = `${data.Tplazo.substr(0, 1)} ${data.Fin}`;
        }

        if ((data.Producto.substr(0, 2) === 'RV') || ((data.Producto.substr(0, 2) === 'MM') && (data.Rend === '0.00'))) {
          fechaX = '';
        }

        return fechaX;
      }},
      { title:  this.colorGrid.tablaH('PrecMrkt'), data: null, render: (data: any, type: any, row: any, meta) => {
        let precioX = data.Mrkt;

        if ((data.Producto.substr(0, 2) === 'MM') && (data.Rend === '0.00')) {
          precioX = '';
        }

        if ((data.Producto.substr(0, 2) === 'MM') && (data.Rend !== '0.00')) {
          precioX = data.Rend;
        }
        return precioX;

      }, className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('Saldo Final'), data: null, render: (data: any, type: any, row: any, meta) => {

        if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo === 'SIMPLE')) {
          return data.Intvcto;
        } else if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo !== 'SIMPLE'))  {
          return data.Costofinh;
        } else {
          return data.Efecfin;
        }

      }, className: 'dt-body-right' },
      { title: this.colorGrid.tablaH('Clave'), data: 'Clave' }
    ];
  }

  ngOnInit(): void {
    this.damePosicionMAnt.CadOut = [];
    this.damePosicionMAnt.visible = false;
    this.damePosicionMAnt.ParamIn.Rif = this.codRif;
    this.damePosicionMAnt.ParamIn.Fechin = this.fecha;

    this.damePosicionMAnt.consultar(this.conectorService.info.URL_REST);
  }

}
