import { DameCorden } from '@laranda/lib-ultra-net';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-corden',
  templateUrl: './corden.component.html',
  styleUrls: ['./corden.component.scss']
})
export class CordenComponent implements OnInit {

  @Input() codRif: string;
  @Input() fecha: string;

  dtColumnasCorden: DataTables.ColumnSettings[] = [];

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
    public dameCorden: DameCorden
  ) {

    this.dtColumnasCorden = [
      { title: 'Estado', data: 'Estado', render: this.IconCOrden },
      { title: 'Nº Orden', data: 'Nordennew' },
      { title: 'Producto', data: 'Concepto' },
      { title: 'Cliente', data: 'Nombre' },
      { title: 'Titulo', data: 'Producto' },
      { title: 'Cant./Monto', data: 'Camonto' },
      { title: 'Prec/Rend/Venc', data: 'Precio1' },
      { title: 'Ejecutivo', data: 'Ejecutivo' },
      { title: 'Observacion', data: 'Observacion' }
    ];

  }

  ngOnInit(): void {
    this.dameCorden.CadOut = [];
    this.dameCorden.visible = true;

    this.dameCorden.ParamIn.Status = 0;
    this.dameCorden.ParamIn.Mensaje = '<NUORIGEN>1</NUORIGEN>';
    this.dameCorden.ParamIn.Rif = this.codRif;
    this.dameCorden.ParamIn.desde = this.fecha.replace(/\//g, '-');
    this.dameCorden.ParamIn.Hasta = this.dameCorden.ParamIn.desde;

    this.dameCorden.consultar();
  }

}
