import { Component, OnInit } from '@angular/core';
import { DameCorden, DamePosicionMAnt, DameCalendario, DameDatosM } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  xcolor = { color: '#8B363E' };
  xbgColor = {
    'background-color': '#8B363E',
    color: 'white',
    'border-color': '#8B363E',
  }

  dtColumnasCorden: DataTables.ColumnSettings[] = [];
  dtColumnasDatosM: any[] = [];
  public codigoCliente = '';

  IconCOrden: DataTables.FunctionColumnRender = ( data, type, row, meta ) => {
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

  // dtColumnas: any[] = [
    // Estado iconos

  constructor(
    public dameCorden: DameCorden,
    public dameCalendario: DameCalendario,
    public dameDatosM: DameDatosM,
    public damePosicionMAnt: DamePosicionMAnt
  ) {

    this.dtColumnasCorden = [
      { title: 'Estado', data: 'Estado', render: this.IconCOrden },
      { title: 'Nº Orden', data: 'Nordennew' },
      { title: 'Producto', data: 'Concepto' }, // seta pendiente Vanessa
      { title: 'Cliente', data: 'Nombre' },
      { title: 'Titulo', data: 'Producto' },
      { title: 'Cant./Monto', data: 'Camonto' },
      { title: 'Prec/Rend/Venc', data: 'Precio1' },
      { title: 'Ejecutivo', data: 'Ejecutivo' },
      { title: 'Observacion', data: 'Observacion' }
    ];

    this.dtColumnasDatosM = [
      { title: 'Apellido', data: 'Apellido' },
      { title: 'Nombre', data: 'Nombre' },
      { title: 'Tlf1', data: 'Tlf1' },
      { title: 'Tlf2', data: 'Tlf2' },
      { title: 'Email', data: 'Email' },
      { title: 'Direccion', data: null, render: ( data: any, type: any, row: any, meta: any ) => {
        return `${data.Dirhabitacion1} ${data.Dirhabitacion2} ${data.Dirhabitacion3}`;
      }},
      { title: 'Ejecutivo', data: 'Ejecutivo' },
    ];
  }

  ngOnInit(): void {
    // this.dameCalendario.consultar();

    this.dameCorden.CadOut = [];
    this.dameCorden.visible = true;

    this.dameDatosM.CadOut = [];
    this.dameDatosM.visible = true;

    // this.damePosicionMAnt.visible = true;
  }

  getDatos() {

    this.dameCorden.ParamIn.Status = 0;
    this.dameCorden.ParamIn.Mensaje = '<NUORIGEN>1</NUORIGEN>';
    this.dameCorden.ParamIn.Rif = this.codigoCliente;
    this.dameCorden.ParamIn.desde = this.dameCalendario.CadOut.Fecha;
    this.dameCorden.ParamIn.Hasta = this.dameCalendario.CadOut.Fecha;
    this.dameCorden.consultar();

    this.dameDatosM.ParamIn.Status = 0;
    this.dameDatosM.ParamIn.Mensaje = ' ';
    this.dameDatosM.ParamIn.Rif = this.codigoCliente;
    this.dameDatosM.consultar();
  }

}
