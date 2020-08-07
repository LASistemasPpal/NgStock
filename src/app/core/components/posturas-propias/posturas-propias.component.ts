import { CadJsons } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { HTfech_a_fech, display_x, ColorGrid } from '@laranda/lib-sysutil';

@Component({
  selector: 'app-posturas-propias',
  templateUrl: './posturas-propias.component.html',
  styleUrls: ['./posturas-propias.component.scss']
})
export class PosturasPropiasComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  datosFiltrados: CadJsons[];

  @Input() datos: CadJsons[];
  @Input() codISIN = '';
  @Input() codMoneda = '';


  constructor(
    private colorGrid: ColorGrid) {

    this.dtColumnas = [
      { title:  this.colorGrid.tablaH('Rueda'), data: 'CODRUEDA' },
      { title:  this.colorGrid.tablaH('Estatus'), data: 'Estatus' },
      { title:  this.colorGrid.tablaH('Postura'), data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaPostura).substr(0, 10);
      }, className: 'dt-body-center' },
     
      { title:  this.colorGrid.tablaH('Fech Liq'), data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center' },
      { title:  this.colorGrid.tablaH('Hora'), data: 'HoraPostura' },
      { title:  this.colorGrid.tablaH('ISIN'), data: 'ISIN' },
      { title:  this.colorGrid.tablaH('Mon'), data: 'MonedaLiquidacion' },
      { title:  this.colorGrid.tablaH('Oper Vinc'), data: 'NroOperacionVinculada', className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('Nro Orden'), data: 'OrdenesEnFirmeID', className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('Plz Liq'), data: 'PlazoLiquidacion', className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('Comp /Vta'), data: 'PosicionCompraVenta' },
      { title:  this.colorGrid.tablaH('Precio'), data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Precio, 10, 8);
      } },
      { title:  this.colorGrid.tablaH('Rend'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Rendimiento, 10, 2);
      }, className: 'dt-body-right' },
      // { title: 'Secuencia', data: 'Secuencia' },
      // { title: 'TasaCupon', data: 'TasaCupon' },
      { title:  this.colorGrid.tablaH('Valor Nominal'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorNominalPesos : data.ValorNominalDolares, 14, 2);
      }, className: 'dt-body-right'},
      { title:  this.colorGrid.tablaH('Valor Transado'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorTransadoPesos : data.ValorTransadoDolares, 14, 2);
      }, className: 'dt-body-right' }
    ];
  }

  ngOnInit(): void {
    console.log(this.codISIN);
    console.log(this.codMoneda);

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
