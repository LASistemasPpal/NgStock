import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DameCalendario } from '@laranda/lib-ultra-net';
import { CalculosRD } from './../../../shared/services/estadisticas.service';
import { DamePosturasM, DamePosturasP, DameOperaciones } from './../../../shared/services/data-bvrd.service';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

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
  public codigoTitulo = '';
  public consultaTipo = '';

  constructor(
    public dameCalendario: DameCalendario,
    private damePosturasM: DamePosturasM,
    private damePosturasP: DamePosturasP,
    private dameOperaciones: DameOperaciones,
    public calculosRD: CalculosRD
  ) {
    this.dameCalendario.consultar();

    this.dtColumnasEjemplo = [
      { title: 'Moneda', data: 'Moneda' },
      { title: 'Monto', data: 'Monto', className: 'dt-body-right' },
      { title: 'Titulos', data: 'Cotitulo' },
      { title: 'Isin', data: 'Isin' },
      { title: 'Cantidad', data: 'Cant', className: 'dt-body-right' },
      { title: 'C/V', data: 'c_v' }
    ];
  }


  ngOnInit(): void {

    const myChart = new Chart('graficoPrecio', this.graficoPrecio);
    const myChart2 = new Chart('graficoVolumen', this.graficoVolumen);
    const myChart3 = new Chart('graficoMonTran', this.graficoMonTran);
    const myChart4 = new Chart('graficoMonTran2', this.graficoMonTran2);
    const myChart5 = new Chart('graficoMonTran3', this.graficoMonTran3);

    this.dameOperaciones.consultar();
    this.damePosturasM.consultar();
    this.damePosturasP.consultar();
    // dame_COrdenX
    this.calculosRD.calcular();

    console.log('Emisiones: ' + this.calculosRD.estadisticas.emisiones);
    // console.log(canti);

    // console.table(bvrdPsot[0].CadJson);;
    console.log('Grafico Precios ' + this.calculosRD.estadisticas.isin);

    console.log('GrafPrecioP');
    console.table(this.calculosRD.estadisticas.GrafPrecioP);

    console.log('GrafPrecioM');
    console.table(this.calculosRD.estadisticas.GrafPrecioM);

    console.log('GrafPrecioOper');
    console.table(this.calculosRD.estadisticas.GrafPrecioOper);

    console.log('GrafVolumenP');
    console.table(this.calculosRD.estadisticas.GrafVolumenP);

    console.log('GrafVolumenM');
    console.table(this.calculosRD.estadisticas.GrafVolumenM);

    console.log('GrafVolumenOper');
    console.table(this.calculosRD.estadisticas.GrafVolumenOper);

    console.log('Min/Max Vol ' + this.calculosRD.estadisticas.MinGrafVolumen + ' ' + this.calculosRD.estadisticas.MaxGrafVolumen);
    console.log('Min/Max Pre  ' + this.calculosRD.estadisticas.MinGrafPrecio + ' ' + this.calculosRD.estadisticas.MaxGrafPrecio);

    console.table(this.calculosRD.estadisticas.Movi);
    console.log('USD ' + this.calculosRD.estadisticas.MastransadaUSD + '  ' + this.calculosRD.estadisticas.MastranMtoUSD);
    console.log('DOP ' + this.calculosRD.estadisticas.MastransadaDOP + '  ' + this.calculosRD.estadisticas.MastranMtoDOP);
    console.table(this.calculosRD.estadisticas.canti);

  }

  consultarCliente(codigo: string[]) {
    // console.log(environm ent.cliente_prod);
    this.consultaTipo = '0';

    this.codigoCliente = codigo[0];
    this.consultaTipo = codigo[1];
    this.codigoTitulo = codigo[2];
    // if (codigo.length > 0 && codigo[0].trim().length > 0) {
    //   this.codigoCliente = codigo[0];
    //   this.consultaTipo = codigo[1];
    //   this.codigoTitulo = codigo[2];
    // }
  }

}
