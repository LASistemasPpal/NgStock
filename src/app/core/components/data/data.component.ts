import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DameCalendario, DameTitulos } from '@laranda/lib-ultra-net';
import { CalculosRD } from './../../../shared/services/estadisticas.service';
import { DamePosturasM, DamePosturasP, DameOperaciones } from './../../../shared/services/data-bvrd.service';
import { display_d, ConectorService } from '@laranda/lib-sysutil';


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
    private conectorService: ConectorService,
    private dameTitulos: DameTitulos,
    private damePosturasM: DamePosturasM,
    private damePosturasP: DamePosturasP,
    private dameOperaciones: DameOperaciones,
    public dameCalendario: DameCalendario,
    public calculosRD: CalculosRD
  ) {

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

    if (this.conectorService.info === undefined) {
      this.conectorService.getParametros().then(() => {
        this.procesarCalculos('');
      });
    } else {
      this.procesarCalculos('');
    }
  }

  procesarCalculos(codTitulo: string): void {
    this.dameCalendario.consultar(this.conectorService.info.URL_REST).then(() => {

      this.dameOperaciones.consultar();
      this.damePosturasM.consultar();
      this.damePosturasP.consultar();
      this.calculosRD.calcular(codTitulo);

      this.dameTitulos.ParamIn.Cotitulo = this.calculosRD.estadisticas.emisiones[0];
      this.dameTitulos.ParamIn.Mrkt = 'P';
      this.dameTitulos.ParamIn.Vigencia = 0;
      this.dameTitulos.ParamIn.Moneda = 99;
      this.dameTitulos.consultar(this.conectorService.info.URL_REST)
        .then(() => this.calculosRD.estadisticas.emisiones[0] = this.dameTitulos.CadOut.Coregistro);


      const myChart = this.generaGraficoLinia1();
      const myChart2 = this.generaGraficoLinia2();
      const myChart3 = this.graficoDona('graficoMonTran', 'DOP. mm', this.calculosRD.estadisticas.canti.PorcdopM);
      const myChart4 = this.graficoDona('graficoMonTran2', 'USD. mm', this.calculosRD.estadisticas.canti.PorcusdM);
      const myChart5 = this.graficoDona('graficoMonTran3', 'Total mm', this.calculosRD.estadisticas.canti.PorctotM);
    });
  }

  generaGraficoLinia1() {
    return new Chart('graficoPrecio', {
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
            label: 'PrecioOper',
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
  }

  generaGraficoLinia2() {
    return new Chart('graficoVolumen', {
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
  }

  graficoDona(nombreID: string, nombreEtiqueta: string, datos: number) {
    return new Chart(nombreID, {
      type: 'doughnut',
      data: {
        labels: [nombreEtiqueta],
        datasets: [
          {
            label: 'Titulo 1',
            data: [datos, 100 - datos],
            backgroundColor: [this.dameCalendario.CadOut.Color, 'transtarent'],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true
      }
    });
  }

  consultarCliente(codigo: string[]) {
    this.codigoCliente = codigo[0];
    this.consultaTipo = codigo[1];
    this.codigoTitulo = codigo[2];

    if (this.consultaTipo === '3') {
      this.procesarCalculos(this.codigoTitulo);
    }
  }

}
