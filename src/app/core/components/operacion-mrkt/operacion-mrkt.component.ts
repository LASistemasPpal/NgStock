import { TranslateLAService } from './../../../shared/services/translateLA.service';
import { Component, OnInit, Input } from '@angular/core';
import { CadJsonOperMrkts } from 'src/app/shared/classes/bvrdClass';
import { ColorGrid, display_x, HTfech_a_fech } from '@laranda/lib-sysutil';
import { DameTitulosAll } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-operacion-mrkt',
  templateUrl: './operacion-mrkt.component.html'
})
export class OperacionMrktComponent implements OnInit {

  private priFiltro: string[] = [];
  visible = true;
  visibleColumnas = true;
  tIdioma = '';

  dtColumnas: DataTables.ColumnSettings[] = [];
  datosFiltrados: CadJsonOperMrkts[];

  @Input() datos: CadJsonOperMrkts[];
  @Input()
    get filtros(): string {
      return this.priFiltro.toString();
    }
    set filtros(texto: string) {
      this.priFiltro = texto.split(';');
      this.visible = false;

      // this.priFiltro[0] ===> codMoneda
      // this.priFiltro[1] ===> codISIN
      setTimeout(() => {
        if ((this.priFiltro[1] !== '') ||  (this.priFiltro[0] !== '')) {
          this.datosFiltrados = this.datos.filter((valor) => {

            if (this.priFiltro[1] !== '') {
              return valor.CodigoISIN === this.priFiltro[1];
            } else {
              return valor.MonedaTransada === this.priFiltro[0];
            }
          });
        }

        this.visible = true;
        this.translateLAService.scrollFin();
      }, 500);
    }
  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }


  constructor(
    private dameTitulosAll: DameTitulosAll,
    private translateLAService: TranslateLAService
  ) {  }

  ngOnInit(): void { }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title: 'ISIN', data: 'CodigoISIN' },
      { title: 'TITULO', data: null, render: (data: any, type: any, row: any, meta) => {
        return  this.dameTitulosAll.getCodTituloLA(data.CodigoISIN);
      }},
      { title: 'ESTATUS', data: 'Estatus' },
      { title: 'FECH_LIQ', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center'},
      { title: 'HORA', data: null, render: (data: any, type: any, row: any, meta) => {
        const fechaX = new Date(data.HoraOperacion);
        return fechaX.getHours() + ':' + fechaX.getMinutes();
      } },
      { title: 'MON', data: 'MonedaTransada' },
      { title: 'MERCADO', data: 'NombreMercado' },
      { title: 'N_OPERAC', data: 'NumeroOperacion' },
      { title: 'PRECIO', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PrecioLimpio, 14, 8);
      } },
       { title: 'CUPON', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.TasaCupon, 8, 2);
      } },
      { title: 'Nominal', data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ValorNominalTotal, 22, 2);
      } },
      { title: 'MONTO_EFECTIVO', data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ValorTransado, 22, 2);
      } }
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
