import { display_x } from '@laranda/lib-sysutil';
import { Component, OnInit } from '@angular/core';
import { DameRiesgoLiquidezServer } from './../../../shared/services/data-bvrd.service';
import { AutenticaCli, DameTitulosAll } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-riesgo-liquidez',
  templateUrl: './riesgo-liquidez.component.html',
  styleUrls: ['./riesgo-liquidez.component.scss']
})
export class RiesgoLiquidezComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];

  constructor(
    private autenticaCli: AutenticaCli,
    private dameTitulosAll: DameTitulosAll,
    public dameRiesgoLiquidezServer: DameRiesgoLiquidezServer
  ) {
    this.dtColumnas = [
      { title: 'isin', data: 'codigoisin' },
      { title: 'codigo titulo LA', data: null, render: (data: any, type: any, row: any, meta) => {
        return this.dameTitulosAll.getCodTituloLA(data.codigoisin);
      }},

      { title: 'precio comp', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precioppcompra, 10, 4);
      }, className: 'dt-body-right' },

      { title: 'precio venta', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precioppventa, 10, 4);
      }, className: 'dt-body-right' },

      { title: 'margen ', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.margen, 10, 4);
      }, className: 'dt-body-right' },

      { title: 'recorte', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.recorteregulatorio, 10, 4);
      }, className: 'dt-body-right' }
    ];
  }

  ngOnInit(): void {
    this.dameRiesgoLiquidezServer.consultar(this.autenticaCli.CadOut.Usuariobv);
  }
}
