import swal from 'sweetalert2';
import { DameTitulos, DamePermisoUsuario } from '@laranda/lib-ultra-net';
import { PospropiaService } from './../../../shared/services/pospropia.service';
import { Component, OnInit, Input } from '@angular/core';
import { ConectorService, ColorGrid, display_x, lintstr, ceros } from '@laranda/lib-sysutil';
import { Movimientos } from 'src/app/shared/classes/bvrdClass';

@Component({
  selector: 'app-posicion-propia',
  templateUrl: './posicion-propia.component.html',
  styleUrls: ['./posicion-propia.component.scss']
})
export class PosicionPropiaComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];
  user: '';
  nmcliente: '';

  @Input() codISIN: string;
  @Input() mov: Movimientos[] = [];

  constructor(private conectorService: ConectorService,
              private colorGrid: ColorGrid,
              public pospropiaService: PospropiaService,
              private dameTitulos: DameTitulos,
              private damePermisoUsuario: DamePermisoUsuario) {

                this.dtColumnas = [
                  { title: this.colorGrid.tablaH('Nro Ts'), data: 'Ts' },
                  { title: this.colorGrid.tablaH('Moneda'), data: null, render: (data: any, type: any, row: any, meta) => {
                    let tp = 'RFij ';
                    if (data.Tpoperac === '2') { tp = 'RVar '; }
                    return  tp + ceros(lintstr(data.Moneda, 3)); }, className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Veh-Cart'),  data: null, render: (data: any, type: any, row: any, meta) => {
                     return ceros(lintstr(data.Vehiculo, 2)) + '-' + ceros(lintstr(data.Cartera, 2)); }, className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Fec Compra'),  data: 'Apertura', className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Ult Operac'),  data: 'Ultimo', className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Vencimiento'),  data: 'Vencimiento', className: 'dt-body-center'},
                  { title: this.colorGrid.tablaH('Titulo'), data: 'Titulo' },
                  { title: this.colorGrid.tablaH('Saldo'), data: 'Saldo' , className: 'dt-body-right'},
                  { title: this.colorGrid.tablaH('Precio Mrkt / Prom'), data: null, render: (data: any, type: any, row: any, meta) => {
                    let precioX = data.Precio;
                    let pHoy = 0.0;
                    let cadena = '??';
                    for (const M of this.mov) {  //  ultimo precio del dia
                          if (M.Cotitulo === data.Titulo) {
                            pHoy = M.UltPrecio;
                           }
                      }
                    if ((this.codISIN !== '') && (this.dameTitulos.CadOut.Preciotitven !== undefined)) {
                       precioX = this.dameTitulos.CadOut.Preciotitven; // titulo.mt_Offer o tabla de precio //
                    }
                    if (pHoy > 0.1) {
                        if (pHoy < data.Precio) {
                          cadena = '<span style="color: orange">' + pHoy + ' / ' + data.Precio + '</span>'; }
                          else {
                            cadena = '<span style="color: green">' +  pHoy + ' / ' + data.Precio + '</span>'; }
                      } else
                      { if (precioX < data.Precio) {
                        cadena = '<span style="color: red">' +  precioX + ' / ' + data.Precio + '</span>'; }
                       else {
                        cadena = '<span style="color: blue">' +  precioX + ' / ' + data.Precio + '</span>'; }
                       }

                    return cadena;
                  }, className: 'dt-body-right'},
                ];
               }

  ngOnInit(): void {
    this.pospropiaService.Ts = [];
    this.pospropiaService.visible = false;
    this.user = JSON.parse(sessionStorage.getItem('user'));
    this.nmcliente = JSON.parse(sessionStorage.getItem('nmcliente'));

    this.damePermisoUsuario.CadOut = [];
    this.damePermisoUsuario.visible = false;
    this.damePermisoUsuario.ParamIn.Codigo = 'BA011';
    const responLA = 'Respon';
    this.damePermisoUsuario.ParamIn.User = this.user[responLA];
    this.damePermisoUsuario.consultar(this.conectorService.info.URL_REST).then(() => {
      if (this.damePermisoUsuario.CadOut.length > 0) {
        this.pospropiaService.visible = true;
        swal.fire('Control de Acceso', 'Usuario Tiene BA011....', 'info');
      } else {
      this.pospropiaService.consultar(this.codISIN);
    }
    });
 }

}
