import { CadJsons } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { HTfech_a_fech, display_x, TranslateLAService } from '@laranda/lib-sysutil';
import { DameCalendario } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-posturas-propias',
  templateUrl: './posturas-propias.component.html'
})
export class PosturasPropiasComponent implements OnInit {

  private priFiltro: string[] = [];
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
        this.translateLAService.scrollFin();
      }, 500);
    }
  @Input() set tipIdioma(tipo: string) {
    this.tIdioma = tipo;
    this.defineColumnas();
  }



  constructor(
    private translateLAService: TranslateLAService,
    public dameCalendario: DameCalendario
  ) {  }

  ngOnInit(): void { }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      { title:  'RUEDA', data: 'CODRUEDA' },
      { title:  'ESTATUS', data: 'Estatus' },
      { title:  'POSTURAS', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaPostura).substr(0, 10);
      }, className: 'dt-body-center' },

      { title:  'FECH_LIQ', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center' },
      { title:  'HORA', data: 'HoraPostura' },
      { title:  'ISIN', data: 'ISIN' },
      { title:  'MON', data: 'MonedaLiquidacion' },
      { title:  'OPER_VINC', data: 'NroOperacionVinculada', className: 'dt-body-right' },
      { title:  'N_ORDEN', data: 'OrdenesEnFirmeID', className: 'dt-body-right' },
      { title:  'PLZ_LIQ', data: 'PlazoLiquidacion', className: 'dt-body-right' },
      { title:  'COMP_VTA', data: 'PosicionCompraVenta' },
      { title:  'PRECIO', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Precio, 10, 8);
      } },
      { title: 'REND', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Rendimiento, 10, 2);
      }, className: 'dt-body-right' },
      // { title: 'Secuencia', data: 'Secuencia' },
      // { title: 'TasaCupon', data: 'TasaCupon' },
      { title:  'VALOR_NOMINAL', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorNominalPesos : data.ValorNominalDolares, 14, 2);
      }, className: 'dt-body-right'},
      { title:  'VALOR_TRANSADO', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorTransadoPesos : data.ValorTransadoDolares, 14, 2);
      }, className: 'dt-body-right' }
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

}
