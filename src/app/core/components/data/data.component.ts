import { Component, OnInit } from '@angular/core';
import { DameCalendario, AutenticaCli, DameTitulosAll } from '@laranda/lib-ultra-net';
import { display_d, ConectorService, fechaHoy } from '@laranda/lib-sysutil';
import { Chart } from 'chart.js';
import { CalculosRD } from './../../../shared/services/estadisticas.service';
import { DamePosturasM, DamePosturasP, DameOperaciones } from './../../../shared/services/data-bvrd.service';
import swal from 'sweetalert2';

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
  public fechaActual = fechaHoy();
  private codigoMoneda = '';

  constructor(
    private conectorService: ConectorService,
    private dameTitulosAll: DameTitulosAll,
    private autenticaCli: AutenticaCli,
    public damePosturasP: DamePosturasP,
    public damePosturasM: DamePosturasM,
    public dameOperaciones: DameOperaciones,
    public dameCalendario: DameCalendario,
    public calculosRD: CalculosRD
  ) {

    this.dtColumnasEjemplo = [
      { title: 'Moneda', data: 'Moneda' },
      {
        title: 'Monto', data: null, className: 'dt-body-right', render: (data: any, type: any, row: any, meta) => {
          return display_d(data.Monto, 10, 2);
        }
      },
      { title: 'Titulos', data: 'Cotitulo' },
      { title: 'Isin', data: 'Isin' },
      { title: 'Cantidad', data: 'Cant', className: 'dt-body-right' },
      { title: 'C/V', data: 'c_v' }
    ];
  }


  ngOnInit(): void {

    swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando los Datos....',
      title: 'Loading'
    });
    swal.showLoading();

    if (this.conectorService.info === undefined) {

      this.conectorService.getParametros().then(() => {
        this.dameTitulosAll.consultar(this.conectorService.info.URL_REST).then(() => {
          this.dameCalendario.consultar(this.conectorService.info.URL_REST).then(() => {

            this.procesarCalculos('', '', true);
          });
        });
      });
    } else {
      this.dameTitulosAll.consultar(this.conectorService.info.URL_REST).then(() => {
        this.dameCalendario.consultar(this.conectorService.info.URL_REST).then(() => {

          this.procesarCalculos('', '', true);
        });
      });
    }
  }

  procesarCalculos(codTitulo: string, codMoneda: string, loading?: boolean): void {

    if (loading === undefined) {
      swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Procesando los Datos....',
        title: 'Loading'
      });
      swal.showLoading();
    }

    this.dameOperaciones.consultar(this.autenticaCli.CadOut.Usuariobv).then(() => {
      this.damePosturasM.consultar(this.autenticaCli.CadOut.Usuariobv).then(() => {
        this.damePosturasP.consultar(this.autenticaCli.CadOut.Usuariobv).then(() => {

          this.calculosRD.calcular(codTitulo, codMoneda);

          swal.close();

          const myChart = this.generaGraficoLinia1();
          const myChart2 = this.generaGraficoLinia2();
          const myChart3 = this.graficoDona('graficoMonTran', 'DOP. mm', this.calculosRD.estadisticas.canti.PorcdopM);
          const myChart4 = this.graficoDona('graficoMonTran2', 'USD. m', this.calculosRD.estadisticas.canti.PorcusdM);
          const myChart5 = this.graficoDona('graficoMonTran3', 'Tot DOP. mm', this.calculosRD.estadisticas.canti.PorctotM);

        }).catch(() => swal.close());
      }).catch(() => swal.close());
    }).catch(() => swal.close());
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
      this.codigoMoneda = codigo[3];

      if (this.consultaTipo === '3') {
      this.procesarCalculos(this.codigoTitulo, this.codigoMoneda);
    }
  }

}
