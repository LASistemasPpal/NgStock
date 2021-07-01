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
              return valor.codisin === this.priFiltro[1];
            } else {
              return valor.moneda_transada === this.priFiltro[0];
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
      { title: 'ISIN', data: 'codisin' },
  //    { title:  this.colorGrid.tablaH('Emisor'), data: 'CodEmisorBVRD' },

      { title:  'Estatus', data: 'estatus' },
      { title:  'Fech Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.fecha_liquidacion).substr(0, 10);
      }, className: 'dt-body-center'},
      { title:  'Hora', data: 'aux_hora_operacion' },
      // { title:  this.colorGrid.tablaH('Hora'), data: null, render: (data: any, type: any, row: any, meta) => {
      //   const fechaX = new Date(data.HoraOperacion);
      //   return fechaX.getHours() + ':' + fechaX.getMinutes();
      // } },
      { title: 'Mon', data: 'moneda_transada' },
      { title: 'Mercado', data: 'nombre_mercado' },
      { title: 'Ofert Comp', data: 'numero_oferta_compra', className: 'dt-body-right' },
      { title: 'Ofert Vend', data: 'numero_oferta_venta', className: 'dt-body-right' },
      { title: 'Nro Operac', data: 'numero_operacion' },
      { title: 'Precio', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precio_limpio, 10, 4);
      } },
      { title: 'Comprador', data: 'puesto_comprador' },
      { title: 'Vendedor', data: 'puesto_vendedor' },
      // { title: 'TasaCompra', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.TasaCompra, 10, 2);
      // } }
      { title:  'Nominal', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        if (data.moneda_transada === 'DOP') {
          return display_x(data.monto_nominal_equivalente_pesos, 14, 2);
        } else {
          return display_x(data.monto_nominal_equivalente_dolares, 14, 2);
        }
      } },
      { title:  'Efectivo', data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        if (data.moneda_transada === 'DOP') {
          return display_x(data.monto_transado_equivalente_pesos, 14, 2);
        } else {
          return display_x(data.monto_transado_equivalente_dolares, 14, 2);
        }
      } },
     { title: 'Comp/Vend', data: null, render: (data: any, type: any, row: any, meta) => {
        return data.puesto_comprador+'/'+data.puesto_vendedor;
      }, className: 'dt-body-center'}
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
