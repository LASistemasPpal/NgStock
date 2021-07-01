import { CadJsons } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { HTfech_a_fech, display_x, scrollFin } from '@laranda/lib-sysutil';
import { DameCalendario } from '@laranda/lib-ultra-net';
import { TranslateLAVIService } from '@laranda/lib-visual';

@Component({
  selector: 'app-posturas-propias',
  templateUrl: './posturas-propias.component.html'
})
export class PosturasPropiasComponent implements OnInit {

  private priFiltro: string[] = [];
  private scrollFinLA = scrollFin;
  visible = true;
  visibleColumnas = true;
  tIdioma = '';

  dtColumnas: DataTables.ColumnSettings[] = [];
  datosFiltrados: CadJsons[];

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
    private translateLAVIService: TranslateLAVIService,
    public dameCalendario: DameCalendario
  ) {  }

  ngOnInit(): void { }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      { title:  'Rueda', data: 'codigo_rueda' },
      { title:  'Estatus', data: 'estatus_orden' },
      { title:  'Posturas', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.fecha_postura).substr(0, 10);
      }, className: 'dt-body-center' },

      { title:  'Fech Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.fecha_liquidacion).substr(0, 10);
      }, className: 'dt-body-center' },
      { title:  'Hora', data: 'hora_postura' },
      { title:  'ISIN', data: 'codisin' },
      { title:  'Mon', data: 'moneda' },
      { title:  'Nº Orden', data: 'numero_operacion_id', className: 'dt-body-right' },
      { title:  'Plz Liq', data: 'plazo_liquidacion', className: 'dt-body-right' },
      { title:  'Comp /Vta', data: 'compra_venta' },
      { title:  'Precio', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precio_limpio, 10, 8);
      } },
      { title: 'Rend', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.rendimiento, 10, 2);
      }, className: 'dt-body-right' },
      { title:  'Valor Nominal', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.moneda === 'DOP' ? data.monto_nominal_pesos : data.monto_nominal_dolares, 14, 2);
      }, className: 'dt-body-right'},
      { title:  'Valor Transado', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.moneda === 'DOP' ? data.monto_transado_pesos : data.monto_transado_dolares, 14, 2);
      }, className: 'dt-body-right' }
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
