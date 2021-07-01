import { CadJsons } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { HTfech_a_fech, display_x, scrollFin } from '@laranda/lib-sysutil';
import { DameCalendario, DameTitulosAll } from '@laranda/lib-ultra-net';
import { TranslateLAVIService } from '@laranda/lib-visual';

@Component({
  selector: 'app-posturas-siopel',
  templateUrl: './posturas-siopel.component.html'
})
export class PosturasSiopelComponent implements OnInit {

  private priFiltro: string[] = [];
  private scrollFinLA = scrollFin;
  visible = true;

  dtColumnas: DataTables.ColumnSettings[] = [];
  datosFiltrados: CadJsons[];
  visibleColumnas = true;
  tIdioma = '';

  @Input() datos: CadJsons[];
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
              return valor.codisin === this.priFiltro[1];
            } else {
              return valor.moneda === this.priFiltro[0];
            }
          });
        }

        this.visible = true;
        this.scrollFinLA();
      }, 500);
    }
  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }

  constructor(
    private dameTitulosAll: DameTitulosAll,
    private translateLAVIService: TranslateLAVIService,
    public dameCalendario: DameCalendario
  )
     { }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      { title:  'Rueda', data: 'codigo_rueda' },
      { title:  'Duración', data: 'duracion_rueda' },
      { title:  'Estatus', data: 'estatus_orden' },
      { title:  'Posturas', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.fecha_postura).substr(0, 10);
      }, className: 'dt-body-center' },
    //  { title: 'Postura', data: 'FechaPostura' },
     { title: 'Fech Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.fecha_liquidacion).substr(0, 10);
      }, className: 'dt-body-center' },
       { title:  'Hora', data: 'hora_postura' },
      { title:  'ISIN', data: 'codisin' },
      { title:  'Mon', data: 'moneda' },
      // { title: 'NroOperacionVinculada', data: 'NroOperacionVinculada' },
      { title: 'Nº Orden', data: 'numero_operacion_id' },
      // { title: 'Plz Liq', data: 'plazo_liquidacion', className: 'dt-body-right' },
      { title:  'Plz Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.plazo_liquidacion, 4, 0);
      }},
      { title: 'Comp /Vta', data: null, render: (data: any, type: any, row: any, meta) => {
        return data.compra_venta + ' / ' + this.dameTitulosAll.getCodTituloLA(data.codisin);
      }},

      { title: 'Precio', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precio_limpio, 10, 4);
      } },
      { title: 'Rend', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.rendimiento, 10, 4);
      } },
      //{ title: 'Sec', data: 'Secuencia', className: 'dt-body-right' },
      { title: 'Valor Nominal', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.moneda === 'DOP' ? data.monto_nominal_pesos : data.monto_nominal_dolares, 14, 2);
      }, className: 'dt-body-right'},
      { title: 'Valor Transado', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.moneda === 'DOP' ? data.monto_transado_pesos : data.monto_transado_dolares, 14, 2);
      }, className: 'dt-body-right' }
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

  ngOnInit(): void { }

}
