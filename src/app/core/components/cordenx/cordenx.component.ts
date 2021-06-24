import { Component, OnInit, Input } from '@angular/core';
import { DameCOrdenX, CierreRiesgo, DameCalendario } from '@laranda/lib-ultra-net';
import { ConectorService, TranslateLAService, scrollFin } from '@laranda/lib-sysutil';
import swal from 'sweetalert2';
import { TranslateLAVIService } from '@laranda/lib-visual';

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
    this.tIdioma = tipo;
    this.defineColumnas();
  }

  dtColumnasCOrdenX: DataTables.ColumnSettings[] = [];
  visibleColumnas = true;
  tIdioma = 'es';

  private scrollFinLA = scrollFin;

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
    public dameCalendario: DameCalendario,
    private conectorService: ConectorService,
    private cierreRiesgo: CierreRiesgo,
    private translateLAService: TranslateLAService,
    private translateLAVIService: TranslateLAVIService
  ) { }

  ngOnInit(): void {

    $('[data-toggle="tooltip"]').tooltip({
      trigger: 'hover'
    });
    // this.consultarOrdenes();

    this.scrollFinLA();
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

      const DESEA_ENVIAR_SIOPEL_ORDEN = this.translateLAService.buscarPalabra('¿Desea Enviar a Siopel la orden?');
      const N_ORDEN = this.translateLAService.buscarPalabra('Nº Orden');
      const NOMBRE = this.translateLAService.buscarPalabra('Nombre');
      const MONTO = this.translateLAService.buscarPalabra('Monto');
      const PRECIO = this.translateLAService.buscarPalabra('Precio');
      const CANCELAR = this.translateLAService.buscarPalabra('Cancelar');
      const CONFIRMAR = this.translateLAService.buscarPalabra('Confirmar');

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
    this.translateLAService.busca_title('Enviar a la Bolsa', 'sendBolsa');

    this.dtColumnasCOrdenX = [
      { title: 'Nº Orden', data: 'Nordennew' },
      { title: 'Estado', data: 'Estado', render: this.IconCOrden },
      { title: 'Producto', data: 'Concepto' },
      { title: 'Cliente', data: 'Nombre' },
      { title: 'Hora', data: 'Hora' },
      { title: 'User', data: 'User' },
      { title: 'Titulo', data: 'Producto' },
      { title: 'Cant./Monto', data: 'Camonto', className: 'dt-body-right' },
      { title: 'Prec / Rend', data: null, render: (data: any, type: any, row: any, meta) => {
        // let prec = '.';
        // if (data.Concepto.substr(0, 1) === '0') {prec = data.Precio1;}
        //    else {prec = data.Rend.trim(); }
        // return prec; },
         return (data.Concepto.substr(0, 1) === '0') ?  data.Precio1 : data.Rend.trim() + '00'; },
         className: 'dt-body-right'},
      { title: 'Ejec', data: 'Ejecutivo' },
      { title: 'Posturas', data: 'Observacion2' },
      { title: 'Observac', data: 'Observacion' }
    ];

    setTimeout(() => {
      this.translateLAVIService.traducirColumnas(this.dtColumnasCOrdenX)
        .then(x => this.visibleColumnas = x);
    });
  }

}
