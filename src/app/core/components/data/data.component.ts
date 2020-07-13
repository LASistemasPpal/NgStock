import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DameCalendario, DameTitulos } from '@laranda/lib-ultra-net';
import { CalculosRD } from './../../../shared/services/estadisticas.service';
import { DamePosturasM, DamePosturasP, DameOperaciones } from './../../../shared/services/data-bvrd.service';
import { display_d } from '@laranda/lib-sysutil';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  dtColumnasEjemplo: DataTables.ColumnSettings[] = [];

  public codigoCliente = '';
  public codigoTitulo = '';
  public consultaTipo = '';

  constructor(
    public dameCalendario: DameCalendario,
    private dameTitulos: DameTitulos,
    private dameTitulos2: DameTitulos,
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

    this.dameOperaciones.consultar();
    this.damePosturasM.consultar();
    this.damePosturasP.consultar();
    this.calculosRD.calcular();

    this.dameTitulos.ParamIn.Cotitulo = this.calculosRD.estadisticas.emisiones[0];
    this.dameTitulos.ParamIn.Mrkt = 'P';
    this.dameTitulos.ParamIn.Vigencia = 0;
    this.dameTitulos.ParamIn.Moneda = 99;
    this.dameTitulos.consultar().then(() => this.calculosRD.estadisticas.emisiones[0] = this.dameTitulos.CadOut.Coregistro);


    const myChart = new Chart('graficoPrecio', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'PrecioM',
            fill: false,
            backgroundColor: 'Blue',
            borderColor: 'Blue',
            data: this.calculosRD.estadisticas.GrafPrecioM
          },
          {
            label: 'recioOper',
            fill: true,
            backgroundColor: 'rgba(255, 79, 9, 0.411)',
            borderColor: 'rgba(255, 79, 9)',
            data: this.calculosRD.estadisticas.GrafPrecioOper
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [{
            ticks: {
              min: new Date(`${this.calculosRD.estadisticas.hoy}09:00:00`),
              max: new Date(`${this.calculosRD.estadisticas.hoy}13:00:00`)
            },
            type: 'time',
            time: {
              format: 'HH:mm:ss',
              unit: 'hour',
              unitStepSize: 1,
              displayFormats: {
                // minute: 'mm',
                hour: 'hh:mm:ss a'
              },
              tooltipFormat: 'hh:mm:ss a'
            },
            gridLines: {
              display: true
            }
          }],
        }
      }
    });

    const myChart2 = new Chart('graficoVolumen', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'VolumenM',
            fill: false,
            backgroundColor: 'Blue',
            borderColor: 'Blue',
            data: this.calculosRD.estadisticas.GrafVolumenM
          },
          {
            label: 'VolumenOper',
            fill: false,
            backgroundColor: 'red',
            borderColor: 'red',
            data: this.calculosRD.estadisticas.GrafVolumenOper
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              callback: (value) => {
                return display_d(value, 10, 2);
              }
            }
          }],
          xAxes: [{
            ticks: {
              min: new Date(`${this.calculosRD.estadisticas.hoy}09:00:00`),
              max: new Date(`${this.calculosRD.estadisticas.hoy}13:00:00`)
            },
            type: 'time',
            time: {
              format: 'HH:mm:ss',
              unit: 'hour',
              unitStepSize: 1,
              displayFormats: {
                // minute: 'mm',
                hour: 'hh:mm:ss a'
              },
              tooltipFormat: 'hh:mm:ss a'
            },
            gridLines: {
              display: true
            }
          }],
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, chart) => {
              return `${chart.datasets[tooltipItem.datasetIndex].label}: ${display_d(tooltipItem.yLabel, 10, 2)}`;
            }
          }
        }
      }
    });


    const myChart3 = new Chart('graficoMonTran', {
      type: 'doughnut',
      data: {
        labels: ['DOP. mm'],
        datasets: [
          {
            label: 'Titulo 1',
            data: [this.calculosRD.estadisticas.canti.PorcdopM, 100 - this.calculosRD.estadisticas.canti.PorcdopM],
            // backgroundBorder: '#00ff00',
            backgroundColor: ['rgba(250, 2, 2, 0.5)', 'transtarent'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true
      }
    });

    const myChart4 = new Chart('graficoMonTran2', {
      type: 'doughnut',
      data: {
        labels: ['USD. mm'],
        datasets: [
          {
            label: 'Titulo 1',
            data: [this.calculosRD.estadisticas.canti.PorcusdM, 100 - this.calculosRD.estadisticas.canti.PorcusdM],
            backgroundColor: ['rgba(250, 2, 2, 0.5)', 'transtarent'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true
      }
    });

    const myChart5 = new Chart('graficoMonTran3', {
      type: 'doughnut',
      data: {
        labels: ['Total mm'],
        datasets: [
          {
            label: 'Titulo 1',
            data: [this.calculosRD.estadisticas.canti.PorctotM, 100 - this.calculosRD.estadisticas.canti.PorctotM],
            backgroundColor: ['rgba(250, 2, 2, 0.5)', 'transtarent'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true
      }
    });


    console.log('Emisiones: ' + this.calculosRD.estadisticas.emisiones);
    // console.log(canti);

    // console.table(bvrdPsot[0].CadJson);;

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
