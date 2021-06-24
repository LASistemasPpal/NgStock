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
              return valor.CodigoISIN === this.priFiltro[1];
            } else {
              return valor.MonedaTransada === this.priFiltro[0];
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
      { title: 'ISIN', data: 'CodigoISIN' },
      { title: 'Titulo', data: null, render: (data: any, type: any, row: any, meta) => {
        return  this.dameTitulosAll.getCodTituloLA(data.CodigoISIN);
      }},
      { title: 'Estatus', data: 'Estatus' },
      { title: 'Fech Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center'},
      { title: 'Hora', data: null, render: (data: any, type: any, row: any, meta) => {
        const fechaX = new Date(data.HoraOperacion);
        return fechaX.getHours() + ':' + fechaX.getMinutes();
      } },
      { title: 'Mon', data: 'MonedaTransada' },
      { title: 'Mercado', data: 'NombreMercado' },
      { title: 'Nro Operac', data: 'NumeroOperacion' },
      { title: 'Precio', data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PrecioLimpio, 14, 8);
      } },
       { title: 'Cupon', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.TasaCupon, 8, 2);
      } },
      { title: 'Nominal', data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ValorNominalTotal, 22, 2);
      } },
      { title: 'Monto Efectivo', data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ValorTransado, 22, 2);
      } }
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
