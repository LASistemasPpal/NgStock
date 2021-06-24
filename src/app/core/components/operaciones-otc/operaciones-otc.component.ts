import { TranslateLAVIService } from '@laranda/lib-visual';
import { Component, Input, OnInit } from '@angular/core';
import { display_x, scrollFin } from '@laranda/lib-sysutil';
import { DameCalendario, DameTitulosAll } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-operaciones-otc',
  templateUrl: './operaciones-otc.component.html'
})
export class OperacionesOtcComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  visibleColumnas = true;
  tIdioma = '';
  private scrollFinLA = scrollFin;

  @Input() datos: [] = [];
  @Input() codISIN = '';
  @Input() codMoneda = '';
  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }

  constructor(
    private dameTitulosAll: DameTitulosAll,
    private translateLAVIService: TranslateLAVIService,
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

    this.scrollFinLA();
  }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title: 'ISIN', data: 'CodigoISIN' },
      {
        title: 'Titulo', data: null, render: (data: any, type: any, row: any, meta) => {
          return this.dameTitulosAll.getCodTituloLA(data.CodigoISIN);
        }
      },
      { title: 'Mon', data: 'MonedaTransada' },
      {
        title: 'Precio', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
          return display_x(data.PrecioLimpio, 14, 8);
        }
      },
      {
        title: 'Cupon', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
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
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
