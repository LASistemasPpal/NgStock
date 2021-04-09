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
      }, 500);
    }


  constructor(private dameTitulosAll: DameTitulosAll,
              private colorGrid: ColorGrid) {
    this.dtColumnas = [
      // { title: 'CantidadTitulos', data: 'CantidadTitulos', className: 'dt-body-right' },
      { title:  this.colorGrid.tablaH('ISIN'), data: 'CodigoISIN' },
      { title:  this.colorGrid.tablaH('Titulo'), data: null, render: (data: any, type: any, row: any, meta) => {
        return  this.dameTitulosAll.getCodTituloLA(data.CodigoISIN);
      }},
      { title:  this.colorGrid.tablaH('Estatus'), data: 'Estatus' },
      { title:  this.colorGrid.tablaH('Fecha Liq'), data: null, render: (data: any, type: any, row: any, meta) => {
        return HTfech_a_fech(data.FechaLiquidacion).substr(0, 10);
      }, className: 'dt-body-center'},
      { title:  this.colorGrid.tablaH('Hora'), data: null, render: (data: any, type: any, row: any, meta) => {
        const fechaX = new Date(data.HoraOperacion);
        return fechaX.getHours() + ':' + fechaX.getMinutes();
      } },
      { title:  this.colorGrid.tablaH('Mon'), data: 'MonedaTransada' },
      { title:  this.colorGrid.tablaH('Mercado'), data: 'NombreMercado' },
      { title:  this.colorGrid.tablaH('Nro Operacion'), data: 'NumeroOperacion' },
      { title: this.colorGrid.tablaH('Precio'), data: null, className: 'dt-body-right',  render: (data: any, type: any, row: any, meta) => {
        return display_x(data.PrecioLimpio, 14, 8);
      } },
       { title:  this.colorGrid.tablaH('Cupon'), data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
        return display_x(data.TasaCupon, 8, 2);
      } },
      { title:  this.colorGrid.tablaH('Nominal'), data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ValorNominalTotal, 22, 2);
      } },
      { title:  this.colorGrid.tablaH('Monto Efectivo'), data: null, className: 'dt-body-right',
         render: (data: any, type: any, row: any, meta) => {
        return display_x(data.ValorTransado, 22, 2);
      } }
    ];
   }

  ngOnInit(): void { }

}
