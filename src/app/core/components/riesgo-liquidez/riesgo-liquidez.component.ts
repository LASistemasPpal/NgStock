import swal from 'sweetalert2';
import { display_x, ColorGrid, ConectorService } from '@laranda/lib-sysutil';
import { Component, OnInit } from '@angular/core';
import { DameRiesgoLiquidezServer } from './../../../shared/services/data-bvrd.service';
import { AutenticaCli, DameTitulosAll, CierreRiesgo } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-riesgo-liquidez',
  templateUrl: './riesgo-liquidez.component.html'
})
export class RiesgoLiquidezComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];

  constructor(
    private autenticaCli: AutenticaCli,
    private dameTitulosAll: DameTitulosAll,
    public dameRiesgoLiquidezServer: DameRiesgoLiquidezServer,
    private colorGrid: ColorGrid,
    private cierreRiesgo: CierreRiesgo,
    private conectorService: ConectorService
  ) {
    this.dtColumnas = [
      { title: this.colorGrid.tablaH('Isin'), data: 'codigoisin' },
      { title: this.colorGrid.tablaH('Codigo LA'), data: null, render: (data: any, type: any, row: any, meta) => {
        return this.dameTitulosAll.getCodTituloLA(data.codigoisin);
      }},

      { title: this.colorGrid.tablaH('Precio Compra'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precioppcompra, 14, 8);
      }, className: 'dt-body-right' },

      { title: this.colorGrid.tablaH('Precio Venta'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precioppventa, 14, 8);
      }, className: 'dt-body-right' },

      { title: this.colorGrid.tablaH('Margen '), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.margen, 12, 8);
      }, className: 'dt-body-right' },

      { title: this.colorGrid.tablaH('Recorte'), data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.recorteregulatorio, 12, 8);
      }, className: 'dt-body-right' }
    ];
  }


  ngOnInit(): void {
    this.dameRiesgoLiquidezServer.consultar(this.autenticaCli.CadOut.Usuariobv);
    this.cierreRiesgo.ParamIn.Cadena = '1';
    this.cierreRiesgo.consultar(this.conectorService.info.URL_REST);
    // const cadena = 'cierreRiesgo';
    // if (this.cierreRiesgo.CadOut.Status !== 0) {
    //   swal.fire('Control de Acceso', 'Cierre Problem....'+this.cierreRiesgo.CadOut.Status+'  '+
    //  this.cierreRiesgo.CadOut.Mensaje+' '+cadena, 'info')
    // }
  }
}
