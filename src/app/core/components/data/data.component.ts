import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
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
  };

  xEjemplo = [
    { Monto: 'DOP 475,000,000', Titulo: 'MH0323'},
    { Monto: 'DOP 123,645,000', Titulo: 'AFI024'},
    { Monto: 'Usd 123,000', Titulo: 'PAR027'},
    { Monto: 'Usd 28,100', Titulo: 'BC0224'}
  ];


  Grafico1 = 'GraficoPrecio';
  Grafico2 = 'GraficoPrecio2';

  graficoPrecio = {
    type: 'line',
    data: {
      labels: ['9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm'],
      datasets: [
        {
          label: 'Titulo 1',
          data: [110.000, 94.000, 36.000, 100.000, 80.000, 80.000],
          backgroundBorder: '#00ff00',
          backgroundColor: 'rgba(250, 2, 2, 0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  graficoMonTran = {
    type: 'line',
    data: {
      labels: ['9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm'],
      datasets: [
        {
          label: 'Titulo 1',
          data: [110.000, 94.000, 36.000, 100.000, 80.000, 80.000],
          backgroundBorder: '#00ff00',
          backgroundColor: 'rgba(250, 2, 2, 0.5)',
          borderWidth: 1
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  };

  graficoVolumen = {
    type: 'line',
    data: {
      labels: ['9:00am', '10:00am', '11:00am', '12:00am', '1:00pm', '2:00pm'],
      datasets: [
        {
          label: 'MH0323',
          backgroundColor: 'Blue',
          borderColor: 'Blue',
          fill: false,
          data: [110.000, 94.000, 36.000, 100.000, 80.000, 80.000],
          borderWidth: 2
        },
        {
          label: 'AF1032',
          backgroundColor: 'Red',
          borderColor: 'Red',
          fill: false,
          data: [10.000, 99.000, 60.000, 70.000, 95.000, 97.000],
          borderWidth: 2
        },
        {
          label: 'BC0630',
          backgroundColor: 'Orange',
          borderColor: 'Orange',
          fill: false,
          data: [50.000, 80.000, 10.000, 100.000, 150.000, 97.000],
          borderWidth: 2
        }
      ]
    },
    options: {
      responsive: true
    }
  };

  dtColumnasCorden: DataTables.ColumnSettings[] = [];
  dtColumnasEjemplo: DataTables.ColumnSettings[] = [];
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

    this.dtColumnasEjemplo = [
      { title: 'Monto', data: 'Monto' },
      { title: 'Titulos', data: 'Titulo' }
    ];
  }

  ngOnInit(): void {
    // this.dameCalendario.consultar();

    this.dameCorden.CadOut = [];
    this.dameCorden.visible = true;

    this.dameDatosM.CadOut = [];
    this.dameDatosM.visible = true;

    // this.damePosicionMAnt.visible = true;

    const myChart = new Chart('graficoPrecio', this.graficoPrecio);
    const myChart2 = new Chart('graficoMonTran', this.graficoMonTran);
    const myChart3 = new Chart('graficoVolumen', this.graficoVolumen);
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
