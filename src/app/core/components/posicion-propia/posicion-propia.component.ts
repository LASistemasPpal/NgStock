import { PospropiaService } from './../../../shared/services/pospropia.service';
import { Component, OnInit, Input } from '@angular/core';
import { ConectorService, ColorGrid, display_d, lintstr, ceros } from '@laranda/lib-sysutil';
import { Movimientos } from 'src/app/shared/classes/bvrdClass';

@Component({
  selector: 'app-posicion-propia',
  templateUrl: './posicion-propia.component.html',
  styleUrls: ['./posicion-propia.component.scss']
})
export class PosicionPropiaComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  displayd = display_d;
  
  @Input() codISIN: string;
  @Input() mov: Movimientos[] = [];
  
  constructor(private conectorService: ConectorService,
              private colorGrid: ColorGrid,
              public pospropiaService: PospropiaService) {

                this.dtColumnas = [
                  { title: this.colorGrid.tablaH('Nro Ts'), data: 'Numero' },
                  { title: this.colorGrid.tablaH('Moneda'), data: null, render: (data: any, type: any, row: any, meta) => {
                     return ceros(lintstr(data.Moneda, 3)); }, className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Veh-Cart'),  data: null, render: (data: any, type: any, row: any, meta) => {
                     return ceros(lintstr(data.Vehiculo, 2)) + '-' + ceros(lintstr(data.Cartera, 2)); }, className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Fec Compra'),  data: 'Apertura', className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Ult Operac'),  data: 'Ultimo', className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Vencimiento'),  data: 'Vencimiento', className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Titulo'), data: 'Titulo' },
                  { title: this.colorGrid.tablaH('Saldo'), data: 'Saldo' , className: 'dt-body-right'},
                  { title: this.colorGrid.tablaH('Precio Mrkt / Prom'), data: null, render: (data: any, type: any, row: any, meta) => {
                    let precioX = data.Tasa;  //  precio de mercado
                    let pHoy = 100.0;
                    pHoy = data.Precio;  //  precio de hoy
                    for (const M of this.mov) {
                          if (M.Cotitulo === data.Titulo) {
                            pHoy = M.UltPrecio;
                           }
                      }  
                    if (pHoy > 0.1) {
                        if (pHoy < data.Precio) {
                          precioX = '<span style="color: orange">' + pHoy + ' / ' + data.Precio + '</span>'; }
                          else {
                             precioX = '<span style="color: green">' +  pHoy + ' / ' + data.Precio + '</span>'; }
                      } else
                      { if (precioX < data.Precio) {
                       precioX = '<span style="color: red">' +  precioX + ' / ' + data.Precio + '</span>'; }
                       else {
                          precioX = '<span style="color: blue">' +  precioX + ' / ' + data.Precio + '</span>'; }
                       }

                    return precioX;
                  }, className: 'dt-body-right'},
                ];
               }

  ngOnInit(): void {
    this.pospropiaService.Ts = [];
    this.pospropiaService.visible = false;
    this.pospropiaService.consultar(this.codISIN);
 }

}
