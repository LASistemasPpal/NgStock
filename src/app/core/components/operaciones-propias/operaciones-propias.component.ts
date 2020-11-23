import { display_x, HTfech_a_fech, ColorGrid } from '@laranda/lib-sysutil';
import { CadJsonOpers } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-operaciones-propias',
  templateUrl: './operaciones-propias.component.html',
  styleUrls: ['./operaciones-propias.component.scss']
})
export class OperacionesPropiasComponent implements OnInit {

  private priFiltro: string[] = [];
  visible = true;

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
      }, 500);
    }

  constructor(
    private colorGrid: ColorGrid) {

    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('ISIN'), data: 'CodigoISIN' },
  //    { title:  this.colorGrid.tablaH('Emisor'), data: 'CodEmisorBVRD' },

      { title:  this.colorGrid.tablaH('Estatus'), data: 'Estatus' },
      { title:  this.colorGrid.tablaH('Fecha Liq'), data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center'},
      { title:  this.colorGrid.tablaH('Hora'), data: 'HoraOperacion'},
      // { title:  this.colorGrid.tablaH('Hora'), data: null, render: (data: any, type: any, row: any, meta) => {
      //   const fechaX = new Date(data.HoraOperacion);
      //   return fechaX.getHours() + ':' + fechaX.getMinutes();
      // } },
       { title:  this.colorGrid.tablaH('Mon'), data: 'MonedaTransada' },
      { title:  this.colorGrid.tablaH('Mercado'), data: 'NombreMercado' },
      { title:  this.colorGrid.tablaH('Ofert Comp'), data: 'NumeroOfertaCompra', className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('Ofert Vend'), data: 'NumeroOfertaVenta', className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('Nro Operac'), data: 'NumeroOperacion' },
      { title: this.colorGrid.tablaH('Precio'), data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PrecioLimpio, 10, 4);
      } },
      { title: this.colorGrid.tablaH('Comprador'), data: 'PuestoComprador' },
      { title:  this.colorGrid.tablaH('Vendedor'), data: 'PuestoVendedor' },
      // { title: 'TasaCompra', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.TasaCompra, 10, 2);
      // } }
      { title:  this.colorGrid.tablaH('Nominal'), data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        if (data.MonedaTransada === 'DOP') {
          return display_x(data.ValorNominalPesos, 14, 2);
        } else {
          return display_x(data.ValorNominalDolares, 14, 2);
        }
      } },
      { title:  this.colorGrid.tablaH('Efectivo'), data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        if (data.MonedaTransada === 'DOP') {
          return display_x(data.ValorTransadoPesos, 14, 2);
        } else {
          return display_x(data.ValorTransadoDolares, 14, 2);
        }

      } },
      { title:  this.colorGrid.tablaH('Cmi Comp'), data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ComisionComprador, 8, 2);
      } },
      { title:  this.colorGrid.tablaH('Cmi Vend'), data: null, className: 'dt-body-right',
      render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ComisionVendedor, 8, 2);
      }}
        ];
  }

  ngOnInit(): void { }

}
