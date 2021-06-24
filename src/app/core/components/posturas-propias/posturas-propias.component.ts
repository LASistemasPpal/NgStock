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
              return valor.ISIN === this.priFiltro[1];
            } else {
              return valor.MonedaLiquidacion === this.priFiltro[0];
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
      { title:  'Rueda', data: 'CODRUEDA' },
      { title:  'Estatus', data: 'Estatus' },
      { title:  'Posturas', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaPostura).substr(0, 10);
      }, className: 'dt-body-center' },

      { title:  'Fech Liq', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center' },
      { title:  'Hora', data: 'HoraPostura' },
      { title:  'ISIN', data: 'ISIN' },
      { title:  'Mon', data: 'MonedaLiquidacion' },
      { title:  'Oper Vinc', data: 'NroOperacionVinculada', className: 'dt-body-right' },
      { title:  'Nº Orden', data: 'OrdenesEnFirmeID', className: 'dt-body-right' },
      { title:  'Plz Liq', data: 'PlazoLiquidacion', className: 'dt-body-right' },
      { title:  'Comp /Vta', data: 'PosicionCompraVenta' },
      { title:  'Precio', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Precio, 10, 8);
      } },
      { title: 'Rend', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Rendimiento, 10, 2);
      }, className: 'dt-body-right' },
      // { title: 'Secuencia', data: 'Secuencia' },
      // { title: 'TasaCupon', data: 'TasaCupon' },
      { title:  'Valor Nominal', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorNominalPesos : data.ValorNominalDolares, 14, 2);
      }, className: 'dt-body-right'},
      { title:  'Valor Transado', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorTransadoPesos : data.ValorTransadoDolares, 14, 2);
      }, className: 'dt-body-right' }
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
