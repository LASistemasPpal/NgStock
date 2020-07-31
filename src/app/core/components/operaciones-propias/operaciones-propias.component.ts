import { display_x, HTfech_a_fech } from '@laranda/lib-sysutil';
import { CadJsonOpers } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-operaciones-propias',
  templateUrl: './operaciones-propias.component.html',
  styleUrls: ['./operaciones-propias.component.scss']
})
export class OperacionesPropiasComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  datosFiltrados: CadJsonOpers[];

  @Input() datos: CadJsonOpers[];
  @Input() codISIN = '';

  constructor() {

    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title: 'CodEmisorBVRD', data: 'CodEmisorBVRD' },
      { title: 'CodigoISIN', data: 'CodigoISIN' },
      { title: 'ComisionComprador', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ComisionComprador, 10, 4);
      } },
      { title: 'ComisionVendedor', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ComisionVendedor, 10, 4);
      }},
      // { title: 'DiasVencimiento', data: 'DiasVencimiento', className: 'dt-body-right' },
      { title: 'Estatus', data: 'Estatus' },
      // { title: 'FechaEmision', data: 'FechaEmision' },
      { title: 'Liquidacion', data: null, render: (data: any, type: any, row: any, meta) => {
        // + '/' + data.FechaLiquidacion.getMonth()
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 5);
      }, className: 'dt-body-center'},
      // { title: 'FechaOperacion', data: 'FechaOperacion' },
      // { title: 'FechaVencimiento', data: 'FechaVencimiento' },
      { title: 'Hora', data: null, render: (data: any, type: any, row: any, meta) => {
        const fechaX = new Date(data.HoraOperacion);

        return fechaX.getHours() + ':' + fechaX.getMinutes();
      } },
      { title: 'Mon', data: 'MonedaTransada' },
      // { title: 'NemoTecnico', data: 'NemoTecnico' },
      { title: 'NombreMercado', data: 'NombreMercado' },
      { title: 'NroOferta C', data: 'NumeroOfertaCompra', className: 'dt-body-right' },
      { title: 'NroOferta V', data: 'NumeroOfertaVenta', className: 'dt-body-right' },
      { title: 'Nro Operacion', data: 'NumeroOperacion' },
      { title: 'PrecioLimpio', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PrecioLimpio, 10, 4);
      } },
      { title: 'Comprador', data: 'PuestoComprador' },
      { title: 'Vendedor', data: 'PuestoVendedor' },
      { title: 'TasaCompra', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.TasaCompra, 10, 4);
      } },
      // { title: 'TasaCupon', data: 'TasaCupon' },
      { title: 'TasaVenta', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.TasaVenta, 10, 4);
      } },
      { title: 'TipoMercado', data: 'TipoMercado' },
      // { title: 'Tipodeinstrumento', data: 'Tipodeinstrumento' },
      { title: 'ValorNominal', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        if (data.MonedaTransada === 'DOP') {
          return display_x(data.ValorNominalPesos, 10, 2);
        } else {
          return display_x(data.ValorNominalDolares, 10, 2);
        }
      } },
      // { title: 'ValorNominalPesos', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.ValorNominalPesos, 10, 2);
      // } },
      // { title: 'ValorNominalEquivalenteDolares', data: null, className: 'dt-body-right',
      //   render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.ValorNominalEquivalenteDolares, 10, 2);
      // } },
      // { title: 'ValorNominalEquivalentePesos', data: null, className: 'dt-body-right',
      //   render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.ValorNominalEquivalentePesos, 10, 2);
      // } },
      // { title: 'ValorNominalTotal', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.ValorNominalTotal, 10, 2);
      // } },
      // { title: 'ValorTransado', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.ValorTransado, 10, 2);
      // } },
      { title: 'ValorTransado', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        if (data.MonedaTransada === 'DOP') {
          return display_x(data.ValorTransadoPesos, 10, 2);
        } else {
          return display_x(data.ValorTransadoDolares, 10, 2);
        }

      } },
      // { title: 'ValorTransadoPesos', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.ValorTransadoPesos, 10, 2);
      // } },
      // { title: 'ValorTransadoEquivalenteDolares', data: null, className: 'dt-body-right',
      //   render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.ValorTransadoEquivalenteDolares, 10, 2);
      // } },
      // { title: 'ValorTransadoEquivalentePesos', data: null, className: 'dt-body-right',
      //  render: (data: any, type: any, row: any, meta) => {
      //   return display_x(data.ValorTransadoEquivalentePesos, 10, 2);
      // } },
      // { title: 'Yield', data: 'Yield' }
    ];
  }

  ngOnInit(): void {
    if (this.codISIN !== undefined) {
      this.datosFiltrados = this.datos.filter((valor) => valor.CodigoISIN === this.codISIN);
    }
  }

}
