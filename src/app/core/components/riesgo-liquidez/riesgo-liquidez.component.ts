import { display_x, ConectorService, scrollFin } from '@laranda/lib-sysutil';
import { Component, Input, OnInit } from '@angular/core';
import { DameRiesgoLiquidezServer } from './../../../shared/services/data-bvrd.service';
import { AutenticaCli, DameTitulosAll, CierreRiesgo, DameCalendario } from '@laranda/lib-ultra-net';
import { TranslateLAVIService } from '@laranda/lib-visual';

@Component({
  selector: 'app-riesgo-liquidez',
  templateUrl: './riesgo-liquidez.component.html'
})
export class RiesgoLiquidezComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  visibleColumnas = true;
  tIdioma = '';
  private scrollFinLA = scrollFin;

  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }


  constructor(
    public dameRiesgoLiquidezServer: DameRiesgoLiquidezServer,
    public dameCalendario: DameCalendario,
    private autenticaCli: AutenticaCli,
    private dameTitulosAll: DameTitulosAll,
    private cierreRiesgo: CierreRiesgo,
    private conectorService: ConectorService,
    private translateLAVIService: TranslateLAVIService
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

    this.scrollFinLA();
  }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      { title: 'Isin', data: 'codigoisin' },
      { title: 'Codigo LA', data: null, render: (data: any, type: any, row: any, meta) => {
        return this.dameTitulosAll.getCodTituloLA(data.codigoisin);
      }},

      { title: 'Precio Compra', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precioppcompra, 14, 8);
      }, className: 'dt-body-right' },

      { title: 'Precio Venta', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precioppventa, 14, 8);
      }, className: 'dt-body-right' },

      { title: 'Margen', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.margen, 12, 8);
      }, className: 'dt-body-right' },

      { title: 'Recorte', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.recorteregulatorio, 12, 8);
      }, className: 'dt-body-right' }
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }
}
