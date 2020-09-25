import { Component, OnInit, Input } from '@angular/core';
import { DameCOrdenX } from '@laranda/lib-ultra-net';
import { ConectorService, display_d } from '@laranda/lib-sysutil';
import swal from 'sweetalert2';

declare let $: any;
@Component({
  selector: 'app-cordenx',
  templateUrl: './cordenx.component.html',
  styleUrls: ['./cordenx.component.scss']
})
export class CordenxComponent implements OnInit {

  @Input() codRif: string;
  @Input() fecha: string;
  @Input() titulo: string;

  dtColumnasCOrdenX: DataTables.ColumnSettings[] = [];

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
  ) {

    this.dtColumnasCOrdenX = [
      { title: 'Nº Orden', data: 'Nordennew' },
      { title: 'Estado', data: 'Estado', render: this.IconCOrden },
      { title: 'Producto', data: 'Concepto' },
      { title: 'Cliente', data: 'Nombre' },
      { title: 'Hora', data: 'Hora' },
      { title: 'User', data: 'User' },
      { title: 'Titulo', data: 'Producto' },
      { title: 'Cant./Monto', data: 'Camonto', className: 'dt-body-right' },
      { title: 'Prec/Rend/Venc', data: 'Precio1', className: 'dt-body-right' },
      { title: 'Ejecutivo', data: 'Ejecutivo' },
      { title: 'Observacion', data: 'Observacion' }
    ];
  }

  ngOnInit(): void {

    $('[data-toggle="tooltip"]').tooltip();
    this.dameCOrdenX.ParamIn.Desde    = this.fecha.replace(/\//g, '-');
    this.dameCOrdenX.ParamIn.Hasta    = this.dameCOrdenX.ParamIn.Desde;
    this.dameCOrdenX.ParamIn.Nuorigen = 1;
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

      swalEnviar.fire({
        title: '¿Desea Enviar a Siopel la orden?',
        html: `
          <div class="container">
            <div class="row rounded-LA LA-borderFooter">
                <div class="col-4 p-0 pl-2"><p class="m-0 text-left">Nª Orden:</p></div>
                <div class="col-8"><p class="m-0 text-left">${resultado[0].Numeroordennew}</p></div>
            </div>
            <div class="row rounded-LA LA-borderFooter pt-2">
                <div class="col-4 p-0 pl-2"><p class="m-0 text-left">Nombre:</p></div>
                <div class="col-8"><p class="m-0 text-left">${resultado[0].Cliente}</p></div>
            </div>
            <div class="row rounded-LA LA-borderFooter pt-2">
                <div class="col-4 p-0 pl-2"><p class="m-0 text-left">Monto:</p></div>
                <div class="col-8"><p class="m-0 text-left">${resultado[0].Monto}</p></div>
            </div>
            <div class="row rounded-LA LA-borderFooter pt-2">
                <div class="col-4 p-0 pl-2"><p class="m-0 text-left">Precio:</p></div>
                <div class="col-8"><p class="m-0 text-left">${resultado[0].Precio}</p></div>
            </div>
          </div>`,
            // <div class="row rounded-LA LA-borderFooter pt-2">
            //     <div class="col-4 p-0 pl-2"><p class="m-0 text-left">Tipo de Cambio:</p></div>
            //     <div class="col-8"><p class="m-0 text-left">${display_d(resultado[0].TasaDivisa, 10, 4)}</p></div>
            // </div>
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        focusCancel: true,
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.value) {
          // this.insertaBovim.ParamIn = resultado[0];
          // this.insertaBovim.consultar(this.conectorService.info.URL_REST_LA)
          //   .then(() => this.setRecalcula.emit(null));
        }
      });
    }
  }

}
