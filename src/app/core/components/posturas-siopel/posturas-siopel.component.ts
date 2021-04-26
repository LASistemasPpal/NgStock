import { TranslateLAService } from './../../../shared/services/translateLA.service';
import { CadJsons } from './../../../shared/classes/bvrdClass';
import { Component, OnInit, Input } from '@angular/core';
import { HTfech_a_fech, display_x } from '@laranda/lib-sysutil';
import { DameTitulosAll } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-posturas-siopel',
  templateUrl: './posturas-siopel.component.html'
})
export class PosturasSiopelComponent implements OnInit {

  private priFiltro: string[] = [];
  visible = true;

  dtColumnas: DataTables.ColumnSettings[] = [];
  datosFiltrados: CadJsons[];
  visibleColumnas = true;

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
    this.defineColumnas();
  }

  constructor(
    private dameTitulosAll: DameTitulosAll,
    private translateLAService: TranslateLAService
  )
     { }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnas = [
      { title:  'RUEDA', data: 'CODRUEDA' },
      { title:  'DURACION', data: 'Duracion' },
      { title:  'ESTATUS', data: 'Estatus' },
      { title:  'POSTURAS', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaPostura).substr(0, 10);
      }, className: 'dt-body-center' },
    //  { title: 'Postura', data: 'FechaPostura' },
     { title: 'FECH_LIQ', data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center' },
       { title:  'HORA', data: 'HoraPostura' },
      { title:  'ISIN', data: 'ISIN' },
      { title:  'MON', data: 'MonedaLiquidacion' },
      // { title: 'NroOperacionVinculada', data: 'NroOperacionVinculada' },
      { title: 'N_ORDEN', data: 'OrdenesEnFirmeID' },
      // { title: 'Plz Liq', data: 'PlazoLiquidacion', className: 'dt-body-right' },
      { title:  'PLZ_LIQ', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PlazoLiquidacion, 4, 0);
      }},
      { title: 'COMP_VTA', data: null, render: (data: any, type: any, row: any, meta) => {
        return data.PosicionCompraVenta + ' / ' + this.dameTitulosAll.getCodTituloLA(data.ISIN);
      }},

      { title: 'PRECIO', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Precio, 10, 4);
      } },
      { title: 'REND', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.Rendimiento, 10, 4);
      } },
      { title: 'SEC', data: 'Secuencia', className: 'dt-body-right' },
      // { title: 'TasaCupon', data: 'TasaCupon' },
      { title: 'VALOR_NOMINAL', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorNominalPesos : data.ValorNominalDolares, 14, 2);
      }, className: 'dt-body-right'},
      { title: 'VALOR_TRANSADO', data: null, render: (data: any, type: any, row: any, meta) => {
        return display_x(data.MonedaLiquidacion === 'DOP' ? data.ValorTransadoPesos : data.ValorTransadoDolares, 14, 2);
      }, className: 'dt-body-right' }
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnas)
        .then(x => this.visibleColumnas = x);
    });
  }

  ngOnInit(): void { }

}
