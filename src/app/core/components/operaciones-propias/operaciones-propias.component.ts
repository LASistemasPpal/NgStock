import { TranslateLAService } from './../../../shared/services/translateLA.service';
import { display_x, HTfech_a_fech } from '@laranda/lib-sysutil';
import { CadJsonOpers } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-operaciones-propias',
  templateUrl: './operaciones-propias.component.html'
})
export class OperacionesPropiasComponent implements OnInit {

  private priFiltro: string[] = [];
  visible = true;
  visibleColumnas = true;
  tIdioma = '';

  dtColumnas: DataTables.ColumnSettings[] = [];
  datosFiltrados: CadJsonOpers[];

  @Input() datos: CadJsonOpers[];
  @Input()
    get filtros(): string {
      return this.priFiltro.toString();
    }
    set filtros(texto: string) {
      this.priFiltro = texto.split(';');
      this.visible = false;

      // this.priFiltro[0] ===> codMoneda
      // this.priFiltro[1] ===> codISIN
      setTimeout(() => {
        if ((this.priFiltro[1] !== '') ||  (this.priFiltro[0] !== '')) {
          this.datosFiltrados = this.datos.filter((valor) => {

            if (this.priFiltro[1] !== '') {
              return valor.CodigoISIN === this.priFiltro[1];
            } else {
              return valor.MonedaTransada === this.priFiltro[0];
            }
          });
        }

        this.visible = true;
        this.translateLAService.scrollFin();
      }, 500);
    }
  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }


  constructor(
    private translateLAService: TranslateLAService
  ) { }

  ngOnInit(): void { }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title: 'ISIN', data: 'CodigoISIN' },
  //    { title:  this.colorGrid.tablaH('Emisor'), data: 'CodEmisorBVRD' },

      { title:  'ESTATUS', data: 'Estatus' },
      { title:  'FECH_LIQ', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center'},
      { title:  'HORA', data: 'HoraOperacion'},
      // { title:  this.colorGrid.tablaH('Hora'), data: null, render: (data: any, type: any, row: any, meta) => {
      //   const fechaX = new Date(data.HoraOperacion);
      //   return fechaX.getHours() + ':' + fechaX.getMinutes();
      // } },
       { title: 'MON', data: 'MonedaTransada' },
      { title: 'MERCADO', data: 'NombreMercado' },
      { title: 'OFERT_COMP', data: 'NumeroOfertaCompra', className: 'dt-body-right' },
      { title: 'OFERT_VEND', data: 'NumeroOfertaVenta', className: 'dt-body-right' },
      { title: 'N_OPERAC', data: 'NumeroOperacion' },
      { title: 'PRECIO', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PrecioLimpio, 10, 4);
      } },
      { title: 'COMPRADOR', data: 'PuestoComprador' },
      { title: 'VENDEDOR', data: 'PuestoVendedor' },
      // { title: 'TasaCompra', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.TasaCompra, 10, 2);
      // } }
      { title:  'Nominal', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        if (data.MonedaTransada === 'DOP') {
          return display_x(data.ValorNominalPesos, 14, 2);
        } else {
          return display_x(data.ValorNominalDolares, 14, 2);
        }
      } },
      { title:  'EFECTIVO', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        if (data.MonedaTransada === 'DOP') {
          return display_x(data.ValorTransadoPesos, 14, 2);
        } else {
          return display_x(data.ValorTransadoDolares, 14, 2);
        }

      } },
      { title:  'CMI_COMP', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ComisionComprador, 8, 2);
      } },
      { title: 'CMI_VEND', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ComisionVendedor, 8, 2);
      }}
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
