import { CadJsons } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { HTfech_a_fech, display_x } from '@laranda/lib-sysutil';

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


  constructor() {

    this.dtColumnas = [
      { title: 'CODRUEDA', data: 'CODRUEDA' },
      // { title: 'Duracion', data: 'Duracion' },
      { title: 'Estatus', data: 'Estatus' },
      { title: 'Liquidacion', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 5);
      }, className: 'dt-body-center' },
      { title: 'Postura', data: 'FechaPostura' },
      { title: 'Hora', data: 'HoraPostura' },
      // { title: 'HoraUltimaModificacion', data: 'HoraUltimaModificacion' },
      { title: 'ISIN', data: 'ISIN' },
      { title: 'Mon', data: 'MonedaLiquidacion' },
      // { title: 'Nemotecnico', data: 'Nemotecnico' },
      // { title: 'NominalUnitario', data: 'NominalUnitario' },
      { title: 'NroOper Vinc', data: 'NroOperacionVinculada', className: 'dt-body-right' },
      { title: 'Nro Orden', data: 'OrdenesEnFirmeID', className: 'dt-body-right' },
      { title: 'PlazoLiquidacion', data: 'PlazoLiquidacion', className: 'dt-body-right' },
      { title: 'PosicionCompraVenta', data: 'PosicionCompraVenta' },
      { title: 'Precio', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Precio, 10, 4);
      } },
      { title: 'Rendimiento', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Rendimiento, 10, 2);
      }, className: 'dt-body-right' },
      // { title: 'Secuencia', data: 'Secuencia' },
      // { title: 'TasaCupon', data: 'TasaCupon' },
      // { title: 'ValorNominalDolares', data: 'ValorNominalDolares' },
      // { title: 'ValorNominalPesos', data: 'ValorNominalPesos' },
      { title: 'ValorNominal', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorNominalPesos : data.ValorNominalDolares, 10, 2);
      }, className: 'dt-body-right'},
      // { title: 'ValorTransadoDolares', data: 'ValorTransadoDolares' },
      // { title: 'ValorTransadoPesos', data: 'ValorTransadoPesos' }
      { title: 'ValorTransado', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorTransadoPesos : data.ValorTransadoDolares, 10, 2);
      }, className: 'dt-body-right' }
    ];
  }

  ngOnInit(): void {
    if (this.codISIN !== undefined) {
      this.datosFiltrados = this.datos.filter((valor) => valor.ISIN === this.codISIN);
    }
  }

}
