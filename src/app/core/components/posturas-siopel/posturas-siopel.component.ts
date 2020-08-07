import { CadJsons } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { HTfech_a_fech, display_x, ColorGrid } from '@laranda/lib-sysutil';
import { DameTitulosAll } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-posturas-siopel',
  templateUrl: './posturas-siopel.component.html',
  styleUrls: ['./posturas-siopel.component.scss']
})
export class PosturasSiopelComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  datosFiltrados: CadJsons[];

  @Input() datos: CadJsons[];
  @Input() codISIN = '';
  @Input() codMoneda = '';

  constructor( private dameTitulosAll: DameTitulosAll,
    private colorGrid: ColorGrid)
     {
    this.dtColumnas = [
      { title:  this.colorGrid.tablaH('Rueda'), data: 'CODRUEDA' },
      { title:  this.colorGrid.tablaH('Duracion'), data: 'Duracion' },
      { title:  this.colorGrid.tablaH('Estatus'), data: 'Estatus' },
      { title:  this.colorGrid.tablaH('Postura'), data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaPostura).substr(0, 10);
      }, className: 'dt-body-center' },
    //  { title: 'Postura', data: 'FechaPostura' },
     { title:  this.colorGrid.tablaH('Fecha Liq'), data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center' },
       { title:  this.colorGrid.tablaH('Hora'), data: 'HoraPostura' },
      { title:  this.colorGrid.tablaH('ISIN'), data: 'ISIN' },
      { title:  this.colorGrid.tablaH('Mon'), data: 'MonedaLiquidacion' },
      // { title: 'NroOperacionVinculada', data: 'NroOperacionVinculada' },
      { title:  this.colorGrid.tablaH('Nro Orden'), data: 'OrdenesEnFirmeID' },
      // { title: 'Plz Liq', data: 'PlazoLiquidacion', className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('Plz Liq'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PlazoLiquidacion, 4, 0);
      }},
      { title:  this.colorGrid.tablaH('Comp /Vta'), data: null, render: (data: any, type: any, row: any, meta) => {
        return data.PosicionCompraVenta + ' / ' + this.dameTitulosAll.getCodTituloLA(data.ISIN);
      }},

      { title:  this.colorGrid.tablaH('Precio'), data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Precio, 10, 4);
      } },
      { title:  this.colorGrid.tablaH('Rend'), data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Rendimiento, 10, 4);
      } },
      { title:  this.colorGrid.tablaH('Sec'), data: 'Secuencia', className: 'dt-body-right' },
      // { title: 'TasaCupon', data: 'TasaCupon' },
      { title: this.colorGrid.tablaH('Valor Nominal'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorNominalPesos : data.ValorNominalDolares, 14, 2);
      }, className: 'dt-body-right'},
      { title:  this.colorGrid.tablaH('Valor Transado'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorTransadoPesos : data.ValorTransadoDolares, 14, 2);
      }, className: 'dt-body-right' }
    ];
  }

  ngOnInit(): void {

    if ((this.codISIN !== '') ||  (this.codMoneda !== '')) {
      this.datosFiltrados = this.datos.filter((valor) => {

        if (this.codISIN !== '') {
          return valor.ISIN === this.codISIN;
        } else {
          return valor.MonedaLiquidacion === this.codMoneda;
        }
      });
    }
  }

}
