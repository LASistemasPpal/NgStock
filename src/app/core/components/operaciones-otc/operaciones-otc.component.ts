import { Component, Input, OnInit } from '@angular/core';
import { ColorGrid, display_x } from '@laranda/lib-sysutil';
import { DameTitulosAll } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-operaciones-otc',
  templateUrl: './operaciones-otc.component.html'
})
export class OperacionesOtcComponent implements OnInit {
  dtColumnas: DataTables.ColumnSettings[] = [];

  @Input() datos: [] = [];
  @Input() codISIN = '';
  @Input() codMoneda = '';

  constructor(private dameTitulosAll: DameTitulosAll,
              private colorGrid: ColorGrid) {
      this.dtColumnas = [
        // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
        { title:  this.colorGrid.tablaH('ISIN'), data: 'CodigoISIN' },
        { title:  this.colorGrid.tablaH('Titulo'), data: null, render: (data: any, type: any, row: any, meta) => {
          return  this.dameTitulosAll.getCodTituloLA(data.CodigoISIN);
        }},
        { title:  this.colorGrid.tablaH('Mon'), data: 'MonedaTransada' },
      { title: this.colorGrid.tablaH('Precio'), data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PrecioLimpio, 14, 8);
      } },
       { title:  this.colorGrid.tablaH('Cupon'), data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.TasaCupon, 8, 2);
      } },
      { title:  this.colorGrid.tablaH('Nominal'), data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ValorNominalTotal, 22, 2);
      } },
      ];

     }

  ngOnInit(): void {
    if ((this.codISIN !== '') ||  (this.codMoneda !== '')) {
      // this.datosFiltrados = this.datos.filter((valor) => {

      //   if (this.codISIN !== '') {
      //     return valor.CodigoISIN === this.codISIN;
      //   } else {
      //     return valor.MonedaTransada === this.codMoneda;
      //   }
      // });
    }
  }

}
