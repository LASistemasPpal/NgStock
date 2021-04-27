import { TranslateLAService } from './../../../shared/services/translateLA.service';
import { display_x, ConectorService } from '@laranda/lib-sysutil';
import { Component, Input, OnInit } from '@angular/core';
import { DameRiesgoLiquidezServer } from './../../../shared/services/data-bvrd.service';
import { AutenticaCli, DameTitulosAll, CierreRiesgo } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-riesgo-liquidez',
  templateUrl: './riesgo-liquidez.component.html'
})
export class RiesgoLiquidezComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  visibleColumnas = true;
  tIdioma = '';

  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }


  constructor(
    private autenticaCli: AutenticaCli,
    private dameTitulosAll: DameTitulosAll,
    public dameRiesgoLiquidezServer: DameRiesgoLiquidezServer,
    private cierreRiesgo: CierreRiesgo,
    private conectorService: ConectorService,
    private translateLAService: TranslateLAService
  ) { }


  ngOnInit(): void {
    this.dameRiesgoLiquidezServer.consultar(this.autenticaCli.CadOut.Usuariobv);
    this.cierreRiesgo.ParamIn.Cadena = '1';
    this.cierreRiesgo.consultar(this.conectorService.info.URL_REST);
    // const cadena = 'cierreRiesgo';
    // if (this.cierreRiesgo.CadOut.Status !== 0) {
    //   swal.fire('Control de Acceso', 'Cierre Problem....'+this.cierreRiesgo.CadOut.Status+'  '+
    //  this.cierreRiesgo.CadOut.Mensaje+' '+cadena, 'info')
    // }

    this.translateLAService.scrollFin();
  }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      { title: 'Isin', data: 'codigoisin' },
      { title: 'CODIGO_LA', data: null, render: (data: any, type: any, row: any, meta) => {
        return this.dameTitulosAll.getCodTituloLA(data.codigoisin);
      }},

      { title: 'PRECIO_COMPRA', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precioppcompra, 14, 8);
      }, className: 'dt-body-right' },

      { title: 'PRECIO_VENTA', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precioppventa, 14, 8);
      }, className: 'dt-body-right' },

      { title: 'MARGEN', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.margen, 12, 8);
      }, className: 'dt-body-right' },

      { title: 'RECORTE', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.recorteregulatorio, 12, 8);
      }, className: 'dt-body-right' }
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }
}
