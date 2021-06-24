import { display_x, HTfech_a_fech, scrollFin } from '@laranda/lib-sysutil';
import { CadJsonOpers } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { DameCalendario } from '@laranda/lib-ultra-net';
import { TranslateLAVIService } from '@laranda/lib-visual';

@Component({
  selector: 'app-operaciones-propias',
  templateUrl: './operaciones-propias.component.html'
})
export class OperacionesPropiasComponent implements OnInit {

  private priFiltro: string[] = [];
  private scrollFinLA = scrollFin;
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
        this.scrollFinLA();
      }, 500);
    }
  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }


  constructor(
    private translateLAVIService: TranslateLAVIService,
    public dameCalendario: DameCalendario
  ) { }

  ngOnInit(): void { }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title: 'ISIN', data: 'CodigoISIN' },
  //    { title:  this.colorGrid.tablaH('Emisor'), data: 'CodEmisorBVRD' },

      { title:  'Estatus', data: 'Estatus' },
      { title:  'Fech Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center'},
      { title:  'Hora', data: 'HoraOperacion'},
      // { title:  this.colorGrid.tablaH('Hora'), data: null, render: (data: any, type: any, row: any, meta) => {
      //   const fechaX = new Date(data.HoraOperacion);
      //   return fechaX.getHours() + ':' + fechaX.getMinutes();
      // } },
      { title: 'Mon', data: 'MonedaTransada' },
      { title: 'Mercado', data: 'NombreMercado' },
      { title: 'Ofert Comp', data: 'NumeroOfertaCompra', className: 'dt-body-right' },
      { title: 'Ofert Vend', data: 'NumeroOfertaVenta', className: 'dt-body-right' },
      { title: 'Nro Operac', data: 'NumeroOperacion' },
      { title: 'Precio', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PrecioLimpio, 10, 4);
      } },
      { title: 'Comprador', data: 'PuestoComprador' },
      { title: 'Vendedor', data: 'PuestoVendedor' },
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
      { title:  'Efectivo', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        if (data.MonedaTransada === 'DOP') {
          return display_x(data.ValorTransadoPesos, 14, 2);
        } else {
          return display_x(data.ValorTransadoDolares, 14, 2);
        }

      } },
      { title:  'Cmi Comp', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ComisionComprador, 8, 2);
      } },
      { title: 'Cmi Vend', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ComisionVendedor, 8, 2);
      }}
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
