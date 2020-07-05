import { Component, OnInit, Host } from '@angular/core';
import { Chart } from 'chart.js';
import { DameCalendario } from '@laranda/lib-ultra-net';

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
    { Monto: 'DOP 475,000,000', Titulo: 'MH0323', Isin: 'COD001',  MtPromedio: '101.450', Liquides: 'A'},
    { Monto: 'DOP 123,645,000', Titulo: 'AFI024', Isin: 'COD002',  MtPromedio: '99.054', Liquides: 'B' },
    { Monto: 'Usd 123,000', Titulo: 'PAR027', Isin: 'COD003',  MtPromedio: '98.765', Liquides: 'C' },
    { Monto: 'Usd 28,100', Titulo: 'BC0224', Isin: 'COD004',  MtPromedio: '92.789', Liquides: 'D' }
  ];


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
      responsive: true
    }
  };

  graficoMonTran = {
    type: 'doughnut',
    data: {
      labels: ['DOP. mm'],
      datasets: [
        {
          label: 'Titulo 1',
          data: [46, 54],
          // backgroundBorder: '#00ff00',
          backgroundColor: ['rgba(250, 2, 2, 0.5)', 'transtarent'],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  };

  graficoMonTran2 = {
    type: 'doughnut',
    data: {
      labels: ['USD. mm'],
      datasets: [
        {
          label: 'Titulo 1',
          data: [35, 65],
          backgroundColor: ['rgba(250, 2, 2, 0.5)', 'transtarent'],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  };

  graficoMonTran3 = {
    type: 'doughnut',
    data: {
      labels: ['Total mm'],
      datasets: [
        {
          label: 'Titulo 1',
          data: [62, 38],
          backgroundColor: ['rgba(250, 2, 2, 0.5)', 'transtarent'],
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true
    }
  };

  graficoVolumen = {
    type: 'line',
    data: {
      datasets: [
        {
          label: 'MH0323',
          fill: false,
          backgroundColor: 'Blue',
          borderColor: 'Blue',
          data: [
            {
              x: new Date('2020-06-30T09:00:00'),
              y: 110.000
            },
            {
              x: new Date('2020-06-30T09:30:00'),
              y: 98.300
            },
            {
              x: new Date('2020-06-30T10:40:00'),
              y: 94.000
            },
            {
              x: new Date('2020-06-30T11:15:00'),
              y: 98.000
            },
            {
              x: new Date('2020-06-30T13:40:00'),
              y: 130.000
            }
          ]
        },
        {
          label: 'AF1032',
          fill: false,
          backgroundColor: 'red',
          borderColor: 'red',
          data: [
            {
              x: new Date('2020-06-30T09:00:00'),
              y: 100.000
            },
            {
              x: new Date('2020-06-30T09:10:00'),
              y: 99.300
            },
            {
              x: new Date('2020-06-30T10:15:00'),
              y: 60.000
            },
            {
              x: new Date('2020-06-30T11:30:00'),
              y: 70.000
            },
            {
              x: new Date('2020-06-30T13:05:00'),
              y: 97.130
            }
          ]
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        yAxes: [{
          ticks: {
            // suggestedMin: 0,
            suggestedMax: 131,
            stepSize: 10
          }
        }],
        xAxes: [{
          ticks: {
            min: new Date('2020-06-30T09:00:00'),
            max: new Date('2020-06-30T14:00:00')
          },
          type: 'time',
          time: {
            format: 'HH:mm',
            unit: 'hour',
            unitStepSize: 1,
            displayFormats: {
              // minute: 'mm',
              hour: 'h:mm a'
            },
            tooltipFormat: 'h:mm a'
          },
          gridLines: {
            display: true
          }
        }],
      }
    }
  };

  dtColumnasEjemplo: DataTables.ColumnSettings[] = [];

  public codigoCliente = '';
  public consultaTipo = '';

  constructor(
    public dameCalendario: DameCalendario
  ) {
    this.dameCalendario.consultar();

    this.dtColumnasEjemplo = [
      { title: 'Monto', data: 'Monto' },
      { title: 'Titulos', data: 'Titulo' },
      { title: 'Isin', data: 'Isin' },
      { title: 'Prec. Promedio', data: 'MtPromedio' },
      { title: 'Liquides', data: 'Liquides' }
    ];
  }


  ngOnInit(): void {

    const myChart = new Chart('graficoPrecio', this.graficoPrecio);
    const myChart2 = new Chart('graficoVolumen', this.graficoVolumen);
    const myChart3 = new Chart('graficoMonTran', this.graficoMonTran);
    const myChart4 = new Chart('graficoMonTran2', this.graficoMonTran2);
    const myChart5 = new Chart('graficoMonTran3', this.graficoMonTran3);
  }

  consultarCliente(codigo: string[]) {

    if (codigo.length > 0 && codigo[0].trim().length > 0) {
      this.codigoCliente = codigo[0];
      this.consultaTipo = codigo[1];
    }
  }

}
