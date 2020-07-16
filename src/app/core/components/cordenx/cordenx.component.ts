import { Component, OnInit, Input } from '@angular/core';
import { DameCOrdenX, ConectorService } from '@laranda/lib-ultra-net';

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
    private conectorService: ConectorService
  ) {

    this.dtColumnasCOrdenX = [
      { title: 'Estado', data: 'Estado', render: this.IconCOrden },
      { title: 'Nº Orden', data: 'Nordennew' },
      { title: 'Producto', data: 'Concepto' },
      { title: 'Cliente', data: 'Nombre' },
      { title: 'Titulo', data: 'Producto' },
      { title: 'Cant./Monto', data: 'Camonto', className: 'dt-body-right' },
      { title: 'Prec/Rend/Venc', data: 'Precio1', className: 'dt-body-right' },
      { title: 'Ejecutivo', data: 'Ejecutivo' },
      { title: 'Observacion', data: 'Observacion' }
    ];
  }

  ngOnInit(): void {
    this.dameCOrdenX.ParamIn.Desde    = this.fecha.replace(/\//g, '-');
    this.dameCOrdenX.ParamIn.Hasta    = this.dameCOrdenX.ParamIn.Desde;
    this.dameCOrdenX.ParamIn.Nuorigen = 1;
    this.dameCOrdenX.ParamIn.Rif      = this.codRif.toUpperCase();
    this.dameCOrdenX.ParamIn.Titulo   = this.titulo;

    this.dameCOrdenX.consultar(this.conectorService.info.URL_REST);
  }

}
