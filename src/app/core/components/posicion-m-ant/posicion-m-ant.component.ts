import { Component, OnInit, Input } from '@angular/core';
import { DamePosicionMAnt } from '@laranda/lib-ultra-net';
import { ConectorService, ColorGrid } from '@laranda/lib-sysutil';
import { TranslateLAService } from './../../../shared/services/translateLA.service';
import { Movimientos } from './../../../shared/classes/bvrdClass';


@Component({
  selector: 'app-posicion-m-ant',
  templateUrl: './posicion-m-ant.component.html'
})
export class PosicionMAntComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  visibleColumnas = true;

  @Input() codRif: string;
  @Input() fecha: string;
  @Input() mov: Movimientos[] = [];
  @Input() set tipIdioma(tipo: string) {
    this.defineColumnas();
  }

  constructor(
    public damePosicionMAnt: DamePosicionMAnt,
    private conectorService: ConectorService,
    private translateLAService: TranslateLAService
  ) {}

  ngOnInit(): void {
    this.translateLAService.scrollFin();

    this.damePosicionMAnt.CadOut = [];
    this.damePosicionMAnt.visible = false;
    this.damePosicionMAnt.ParamIn.Rif = this.codRif;
    this.damePosicionMAnt.ParamIn.Fechin = this.fecha;
    this.damePosicionMAnt.consultar(this.conectorService.info.URL_REST);
  }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      { title: 'CLAVE', data: 'Clave' },
      { title:  'PRODUCTO',
        data: null, render: (data: any, type: any, row: any, meta) => {
          let chara = data.Producto.substr(3, 100).trim();
          if (data.Producto.substr(0, 2) === 'MM') {
            chara = data.Titulo + ' ' + data.Producto.substr(3, 100).trim(); }

          if (data.Producto.substr(0, 2) === 'RV') {
            chara = data.Producto.substr(3, 100).trim(); }
          if (data.Producto.substr(0, 2) === 'RF') {
            chara = data.Producto.substr(3, 100).trim() + ' ' + data.Titulo; }

          if ((data.Producto.substr(0, 2) === 'CV') || (data.Producto.substr(0, 2) === 'SB')) {
            chara = `${data.Tipocv} ${data.Titulo} ${data.Rend} ${data.Producto.substr(3, 100).trim()}`; }

          if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo !== 'SIMPLE')) {
            chara = `MT ${data.Titulo} ${data.Rend} ${data.Producto.substr(3, 100).trim()}`;
          }

          if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo === 'SIMPLE')) {
            chara = `MS ${data.Titulo} ${data.Pcontraprest} ${data.Producto.substr(3, 100).trim()}`;
          }
          return chara;
        }
      },
      { title:  'MON', data: 'Moneda_abrevia' },
      { title:  'SALDO_INI', data: null, render: (data: any, type: any, row: any, meta) => {
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
      { title: 'FECHA_INI', data: 'Ini' },
      { title: 'FECHA_FIN', data: null, render: (data: any, type: any, row: any, meta) => {
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
      { title:  'PREC_MRKT_PROM' , data: null, render: (data: any, type: any, row: any, meta) => {
        let precioX = data.Mrkt;

        if ((data.Producto.substr(0, 2) === 'MM') && (data.Rend === '0.00')) {
          precioX = '';
        }

        if (data.Clave.substr(0, 3) === 'FTE')  {
          let pHoy = 0;
          for (const M of this.mov) {
              if (M.Cotitulo === data.Titulo) {
                pHoy = M.UltPrecio;
              }
          }
          if (pHoy > 0.1) {
            if (pHoy < data.Preciopromedio) {
              precioX = '<span style="color: orange">' + pHoy + ' / ' + data.Preciopromedio + '</span>'; }
              else {
                precioX = '<span style="color: green">' + pHoy + ' / ' + data.Preciopromedio + '</span>'; }
          } else
          { if (precioX < data.Preciopromedio) {
          precioX = '<span style="color: red">' + precioX + ' / ' + data.Preciopromedio + '</span>'; }
          else {
              precioX = '<span style="color: blue">' + precioX + ' / ' + data.Preciopromedio + '</span>'; }
          }
        }

        if ((data.Producto.substr(0, 2) === 'MM') && (data.Rend !== '0.00')) {
          precioX = data.Rend;
        }
        return precioX;

      }, className: 'dt-body-right' },
      { title:  'SALDO_FINAL', data: null, render: (data: any, type: any, row: any, meta) => {

        if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo === 'SIMPLE')) {
          return data.Intvcto;
        } else if ((data.Producto.substr(0, 2) === 'MT') && (data.Tipo !== 'SIMPLE'))  {
          return data.Costofinh;
        } else {
          return data.Efecfin;
        }
      }, className: 'dt-body-right' }
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }
}
