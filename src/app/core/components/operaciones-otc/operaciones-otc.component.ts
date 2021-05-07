import { Component, Input, OnInit } from '@angular/core';
import { display_x, TranslateLAService } from '@laranda/lib-sysutil';
import { DameCalendario, DameTitulosAll } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-operaciones-otc',
  templateUrl: './operaciones-otc.component.html'
})
export class OperacionesOtcComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  visibleColumnas = true;
  tIdioma = '';

  @Input() datos: [] = [];
  @Input() codISIN = '';
  @Input() codMoneda = '';
  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }

  constructor(
    private dameTitulosAll: DameTitulosAll,
    private translateLAService: TranslateLAService,
    public dameCalendario: DameCalendario
  ) { }

  ngOnInit(): void {
    if ((this.codISIN !== '') || (this.codMoneda !== '')) {
      // this.datosFiltrados = this.datos.filter((valor) => {

      //   if (this.codISIN !== '') {
      //     return valor.CodigoISIN === this.codISIN;
      //   } else {
      //     return valor.MonedaTransada === this.codMoneda;
      //   }
      // });
    }

    this.translateLAService.scrollFin();
  }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title: 'ISIN', data: 'CodigoISIN' },
      {
        title: 'TITULO', data: null, render: (data: any, type: any, row: any, meta) => {
          return this.dameTitulosAll.getCodTituloLA(data.CodigoISIN);
        }
      },
      { title: 'MON', data: 'MonedaTransada' },
      {
        title: 'PRECIO', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
          return display_x(data.PrecioLimpio, 14, 8);
        }
      },
      {
        title: 'CUPON', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
          return display_x(data.TasaCupon, 8, 2);
        }
      },
      {
        title: 'Nominal', data: null, className: 'dt-body-right',
        render: (data: any, type: any, row: any, meta) => {
          return display_x(data.ValorNominalTotal, 22, 2);
        }
      },
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x)
        .then(() => console.log(this.dtColumnas));
    });
  }

}
