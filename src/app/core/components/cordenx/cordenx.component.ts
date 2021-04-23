import { Component, OnInit, Input } from '@angular/core';
import { DameCOrdenX, CierreRiesgo } from '@laranda/lib-ultra-net';
import { ConectorService, display_d } from '@laranda/lib-sysutil';
import swal from 'sweetalert2';
import { TranslateLAService } from './../../../shared/services/translateLA.service';
import { TranslateService } from '@ngx-translate/core';

declare let $: any;
@Component({
  selector: 'app-cordenx',
  templateUrl: './cordenx.component.html'
})
export class CordenxComponent implements OnInit {

  @Input() codRif: string;
  @Input() fecha: string;
  @Input() titulo: string;
  @Input() mecaOTC: boolean;
  @Input() set tipIdioma(tipo: string) {
    this.defineColumnas();
  }

  dtColumnasCOrdenX: DataTables.ColumnSettings[] = [];
  visibleColumnas = true;

  IconCOrden: DataTables.FunctionColumnRender = (data, type, row, meta) => {
    let clase: string;

    switch (row.Estado) {
      case '0':
        clase = 'LA-icon-video-camera';
        break;

      case '1':
        clase = 'LA-icon-circle';
        break;

      case '2':
        clase = 'LA-icon-clock-o';
        break;

      case '3':
        clase = 'LA-icon-history';
        break;

      case '4':
        clase = 'LA-icon-check-square-red';
        break;
    }

    return `<i class="fa fa-lightbulb-o LA-size ${clase}"></i> ${data}`;
  }

  constructor(
    public dameCOrdenX: DameCOrdenX,
    private conectorService: ConectorService,
    private cierreRiesgo: CierreRiesgo,
    private translateLAService: TranslateLAService,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {

    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    // this.consultarOrdenes();

    this.translateLAService.scrollFin();
  }

  consultarOrdenes() {
    this.dameCOrdenX.visible = false;
    this.dameCOrdenX.ParamIn.Desde    = this.fecha.replace(/\//g, '-');
    this.dameCOrdenX.ParamIn.Hasta    = this.dameCOrdenX.ParamIn.Desde;
    if (this.mecaOTC) {
      this.dameCOrdenX.ParamIn.Nuorigen = 0;
    } else {
     this.dameCOrdenX.ParamIn.Nuorigen = 1; }
    this.dameCOrdenX.ParamIn.Rif      = this.codRif.toUpperCase();
    this.dameCOrdenX.ParamIn.Titulo   = this.titulo;
    this.dameCOrdenX.consultar(this.conectorService.info.URL_REST);
  }

  setEnviar() {
    const registro = document.querySelectorAll('#grdOrden>div>div.dataTables_scroll>div.dataTables_scrollBody>table>tbody>tr.selected>td:first-child');

    if (registro.length > 0) {
      const resultado = this.dameCOrdenX.CadOut
      .filter((valor) => valor.Nordennew === registro[0].textContent)
        .map((val) => {
          return {
            Donde: 'E',
            Numeroordennew: val.Nordennew,
            Cliente: val.Nombre,
            Monto: val.Camonto,
            Precio: val.Precio1
          };
        });

      const swalEnviar = swal.mixin({
        customClass: {
          confirmButton: 'btn btn-sm btn-outline-success',
          cancelButton: 'btn btn-sm btn-outline-danger ml-3'
        },
        buttonsStyling: false
      });

      let DESEA_ENVIAR_SIOPEL_ORDEN = '';
      let N_ORDEN = '';
      let NOMBRE = '';
      let MONTO = '';
      let PRECIO = '';
      let CANCELAR = '';
      let CONFIRMAR = '';
      this.translate.get('DESEA_ENVIAR_SIOPEL_ORDEN').subscribe(x => DESEA_ENVIAR_SIOPEL_ORDEN = x);
      this.translate.get('N_ORDEN').subscribe(x => N_ORDEN = x);
      this.translate.get('NOMBRE').subscribe(x => NOMBRE = x);
      this.translate.get('MONTO').subscribe(x => MONTO = x);
      this.translate.get('PRECIO').subscribe(x => PRECIO = x);
      this.translate.get('CANCELAR').subscribe(x => CANCELAR = x);
      this.translate.get('CONFIRMAR').subscribe(x => CONFIRMAR = x);

      swalEnviar.fire({
        title: DESEA_ENVIAR_SIOPEL_ORDEN,
        html: `
          <div class="container">
            <div class="row rounded-LA LA-borderFooter">
                <div class="col-4 p-0 pl-2"><p class="m-0 text-left">${N_ORDEN}:</p></div>
                <div class="col-8"><p class="m-0 text-left">${resultado[0].Numeroordennew}</p></div>
            </div>
            <div class="row rounded-LA LA-borderFooter pt-2">
                <div class="col-4 p-0 pl-2"><p class="m-0 text-left">${NOMBRE}:</p></div>
                <div class="col-8"><p class="m-0 text-left">${resultado[0].Cliente}</p></div>
            </div>
            <div class="row rounded-LA LA-borderFooter pt-2">
                <div class="col-4 p-0 pl-2"><p class="m-0 text-left">${MONTO}:</p></div>
                <div class="col-8"><p class="m-0 text-left">${resultado[0].Monto}</p></div>
            </div>
            <div class="row rounded-LA LA-borderFooter pt-2">
                <div class="col-4 p-0 pl-2"><p class="m-0 text-left">${PRECIO}:</p></div>
                <div class="col-8"><p class="m-0 text-left">${resultado[0].Precio}</p></div>
            </div>
          </div>`,
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: CANCELAR,
        focusCancel: true,
        confirmButtonText: CONFIRMAR
      }).then((result) => {
        if (result.value) {
          this.cierreRiesgo.ParamIn.Cadena = '1/' + resultado[0].Numeroordennew;
          this.cierreRiesgo.consultar(this.conectorService.info.URL_REST)
              .then (() => this.consultarOrdenes)
              .catch((error) => console.log('%ccatch Error: %o', 'background-color: red; color: #fff; font-size: 16px', error));
        }
      });
    }
  }

  defineColumnas() {
    this.visibleColumnas = false;

    this.dtColumnasCOrdenX = [
      { title: 'N_ORDEN', data: 'Nordennew' },
      { title: 'ESTADO', data: 'Estado', render: this.IconCOrden },
      { title: 'PRODUCTO', data: 'Concepto' },
      { title: 'CLIENTE', data: 'Nombre' },
      { title: 'HORA', data: 'Hora' },
      { title: 'User', data: 'User' },
      { title: 'TITULO', data: 'Producto' },
      { title: 'CANT_MONTO', data: 'Camonto', className: 'dt-body-right' },
      { title: 'PREC_REND', data: null, render: (data: any, type: any, row: any, meta) => {
        // let prec = '.';
        // if (data.Concepto.substr(0, 1) === '0') {prec = data.Precio1;}
        //    else {prec = data.Rend.trim(); }
        // return prec; },
         return (data.Concepto.substr(0, 1) === '0') ?  data.Precio1 : data.Rend.trim() + '00'; },
         className: 'dt-body-right'},
      { title: 'EJECUTIVO', data: 'Ejecutivo' },
      { title: 'POSTURAS', data: 'Observacion2' },
      { title: 'OBSERVAC', data: 'Observacion' }
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnasCOrdenX)
        .then(x => this.visibleColumnas = x);
    });
  }

}
