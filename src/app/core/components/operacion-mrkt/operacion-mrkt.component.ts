import { Component, OnInit, Input } from '@angular/core';
import { CadJsonOperMrkts } from 'src/app/shared/classes/bvrdClass';
import { display_x, HTfech_a_fech, scrollFin } from '@laranda/lib-sysutil';
import { DameCalendario, DameTitulosAll } from '@laranda/lib-ultra-net';
import { TranslateLAVIService } from '@laranda/lib-visual';

@Component({
  selector: 'app-operacion-mrkt',
  templateUrl: './operacion-mrkt.component.html'
})
export class OperacionMrktComponent implements OnInit {

  private priFiltro: string[] = [];
  private scrollFinLA = scrollFin;
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
              return valor.codisin === this.priFiltro[1];
            } else {
              return valor.moneda_transada === this.priFiltro[0];
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
  ) {  }

  ngOnInit(): void { }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title: 'ISIN', data: 'codisin' },
      { title: 'Titulo', data: null, render: (data: any, type: any, row: any, meta) => {
        return  this.dameTitulosAll.getCodTituloLA(data.codisin);
      }},
      { title: 'Estatus', data: 'estatus' },
      { title: 'Fech Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.fecha_liquidacion).substr(0, 10);
      }, className: 'dt-body-center'},
      { title: 'Hora', data: 'aux_hora_operacion' },
      { title: 'Mon', data: 'moneda_transada' },
      { title: 'Mercado', data: 'nombre_mercado' },
      { title: 'Nro Operac', data: 'numero_operacion' },
      { title: 'Precio', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.precio_limpio, 14, 8);
      } },
       { title: 'Cupon', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.tasa_cupon, 8, 2);
      } },
      { title: 'Nominal', data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.monto_nominal_total, 22, 2);
      } },
      { title: 'Monto Efectivo', data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.monto_transado, 22, 2);
      } }
   //   { title: 'Comp/Vend', data: null, render: (data: any, type: any, row: any, meta) => {
   //     return data.puesto_comprador+'/'+data.puesto_vendedor;
   //   }, className: 'dt-body-center'},
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
