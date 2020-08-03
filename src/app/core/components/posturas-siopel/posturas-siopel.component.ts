import { CadJsons } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { HTfech_a_fech, display_x } from '@laranda/lib-sysutil';

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

  constructor() {
    this.dtColumnas = [
      { title: 'Rueda', data: 'CODRUEDA' },
      { title: 'Duracion', data: 'Duracion' },
      { title: 'Estatus', data: 'Estatus' },
      { title: 'Postura', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaPostura).substr(0, 10);
      }, className: 'dt-body-center' },
    //  { title: 'Postura', data: 'FechaPostura' },
     { title: 'Fecha Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center' },
       { title: 'Hora', data: 'HoraPostura' },
      // { title: 'HoraUltimaModificacion', data: 'HoraUltimaModificacion' },
      { title: 'ISIN', data: 'ISIN' },
      { title: 'Mon', data: 'MonedaLiquidacion' },
      // { title: 'Nemotecnico', data: 'Nemotecnico' },
      // { title: 'NominalUnitario', data: 'NominalUnitario' },
      // { title: 'NroOperacionVinculada', data: 'NroOperacionVinculada' },
      { title: 'Nro Orden', data: 'OrdenesEnFirmeID' },
      { title: 'Plz Liq', data: 'PlazoLiquidacion', className: 'dt-body-right' },
      { title: 'Comp /Vta', data: 'PosicionCompraVenta' },
      { title: 'Precio', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Precio, 10, 4);
      } },
      { title: 'Rend', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Rendimiento, 10, 4);
      } },
      { title: 'Sec', data: 'Secuencia', className: 'dt-body-right' },
      // { title: 'TasaCupon', data: 'TasaCupon' },
      // { title: 'ValorNominalDolares', data: 'ValorNominalDolares' },
      // { title: 'ValorNominalPesos', data: 'ValorNominalPesos' },
      { title: 'Valor Nominal', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorNominalPesos : data.ValorNominalDolares, 14, 2);
      }, className: 'dt-body-right'},
      // { title: 'ValorTransadoDolares', data: 'ValorTransadoDolares' },
      // { title: 'ValorTransadoPesos', data: 'ValorTransadoPesos' }
      { title: 'Valor Transado', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorTransadoPesos : data.ValorTransadoDolares, 14, 2);
      }, className: 'dt-body-right' }
    ];
  }

  ngOnInit(): void {

    if (this.codISIN !== undefined) {
      this.datosFiltrados = this.datos.filter((valor) => valor.ISIN === this.codISIN);
    }
  }

}
