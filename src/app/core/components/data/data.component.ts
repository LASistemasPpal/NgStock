import { Component, OnInit } from '@angular/core';
import {
  DameCalendario,
  AutenticaCli,
  DameTitulosAll,
  DameTitulos,
} from '@laranda/lib-ultra-net';
import { ConectorService, fechaHoy, display_x, ColorGrid } from '@laranda/lib-sysutil';
import { Chart } from 'chart.js';
import { CalculosRD } from './../../../shared/services/estadisticas.service';
import { Movimientos } from './../../../shared/classes/bvrdClass';
import {
  DamePosturasM,
  DamePosturasP,
  DameOperaciones,
  DameRiesgoLiquidezServer,
} from './../../../shared/services/data-bvrd.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss'],
})
export class DataComponent implements OnInit {
  dtColumnasEjemplo: DataTables.ColumnSettings[] = [];

  codigoCliente = '';
  codigoTitulo = '';
  codigoMoneda = '';
  consultaTipo = '';
  fechaActual = fechaHoy();
  movimientos: Movimientos[];

  constructor(
    private conectorService: ConectorService,
    private dameTitulosAll: DameTitulosAll,
    private autenticaCli: AutenticaCli,
    public dameTitulos: DameTitulos,
    public damePosturasP: DamePosturasP,
    public damePosturasM: DamePosturasM,
    public dameOperaciones: DameOperaciones,
    public dameCalendario: DameCalendario,
    public dameRiesgoLiquidezServer: DameRiesgoLiquidezServer,
    public calculosRD: CalculosRD,
    private colorGrid: ColorGrid
  ) {
    this.dtColumnasEjemplo = [    
      {
        title: this.colorGrid.tablaH('Mon.'),
        data: null,
        render: (data: any, type: any, row: any, meta) => {
          return data.Moneda + ' ' + data.c_v + '-' + data.Cant; // display_x(data.Cant,5,0) ;
        },
      },
      {
        title:  this.colorGrid.tablaH('Nominal'),
        data: null,
        className: 'dt-body-right',
        render: (data: any, type: any, row: any, meta) => {
          return display_x(data.Nominal, 10, 2);
        },
      },
      {
        title:  this.colorGrid.tablaH('Transado'),
        data: null,
        className: 'dt-body-right',
        render: (data: any, type: any, row: any, meta) => {
          return display_x(data.Monto, 10, 2);
        },
      },
      { title:  this.colorGrid.tablaH('Titulos'), data: 'Cotitulo' },
      { title:  this.colorGrid.tablaH('Isin'), data: 'Isin' },
     // { title: 'Cant', data: 'Cant' },
      //  { title: 'C / V', data: 'c_v' }
      {
        title:  this.colorGrid.tablaH('Precio'),
        data: null,
        className: 'dt-body-right',
        render: (data: any, type: any, row: any, meta) => {
          return display_x(data.c_v = 'C' ? data.PrecioC : data.PrecioV, 5, 2);
        },
      },
    ];
  }

  ngOnInit(): void {
    swal.fire({
      allowOutsideClick: false,
      icon: 'info',
      text: 'Procesando los Datos....',
      title: 'Loading',
    });
    swal.showLoading();

    if (this.conectorService.info === undefined) {
      this.conectorService.getParametros().then(() => {
        this.dameTitulosAll
          .consultar(this.conectorService.info.URL_REST)
          .then(() => {
            this.dameCalendario
              .consultar(this.conectorService.info.URL_REST)
              .then(() => {
                this.procesarCalculos('', '', true);
              });
          });
      });
    } else {
      this.dameTitulosAll
        .consultar(this.conectorService.info.URL_REST)
        .then(() => {
          this.dameCalendario
            .consultar(this.conectorService.info.URL_REST)
            .then(() => {
              this.procesarCalculos('', '', true);
            });
        });
    }
  }

  procesarCalculos(
    codTitulo: string,
    codMoneda: string,
    loading?: boolean
  ): void {
    if (loading === undefined) {
      swal.fire({
        allowOutsideClick: false,
        icon: 'info',
        text: 'Procesando los Datos....',
        title: 'Loading',
      });
      swal.showLoading();
    }

    this.dameOperaciones
      .consultar(this.autenticaCli.CadOut.Usuariobv)
      .then(() => {
        this.damePosturasM
          .consultar(this.autenticaCli.CadOut.Usuariobv)
          .then(() => {
            this.damePosturasP
              .consultar(this.autenticaCli.CadOut.Usuariobv)
              .then(() => {
                console.log(
                  'dameOperaciones ',
                  this.dameOperaciones.operacionBvrd
                );
                console.log(
                  'damePosturasM ',
                  this.damePosturasM.posturasSiopel
                );
                console.log(
                  'damePosturasP ',
                  this.damePosturasP.posturasPropias
                );

                this.calculosRD.calcular(codTitulo, codMoneda);

                // willmer Git   
                //  esto debe hacerse despues de calcular pero tambien debe llamarse al dameriesgoliquidez
                //  como llena el grid enseguida entonces nunca muestra los precios (a menos que lo corra con debugger )
                this.dameRiesgoLiquidezServer.consultar(this.autenticaCli.CadOut.Usuariobv).then((
                ) => {
                   for (const mov of this.calculosRD.estadisticas.Movi) {
                     for (const pre of this.dameRiesgoLiquidezServer.riesgoLiquidez) {
                       if (mov.Isin === pre.codigoisin) {
                        if (mov.c_v === 'C')  {
                          mov.PrecioC = pre.precioppcompra;
                        } else {
                          mov.PrecioV = pre.precioppventa;
                        }
                       }
                     }
                   }
                });

                swal.close();

                const myChart = this.generaGraficoLinia1();
                const myChart2 = this.generaGraficoLinia2();
                const myChart3 = this.graficoDona(
                  'graficoMonTran',
                  'DOP. mm',
                  this.calculosRD.estadisticas.canti.PorcdopM
                );
                const myChart4 = this.graficoDona(
                  'graficoMonTran2',
                  'USD. m',
                  this.calculosRD.estadisticas.canti.PorcusdM
                );
                const myChart5 = this.graficoDona(
                  'graficoMonTran3',
                  'Tot DOP. mm',
                  this.calculosRD.estadisticas.canti.PorctotM
                );
              })
              .catch(() => swal.close());
          })
          .catch(() => swal.close());
      })
      .catch(() => swal.close());
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
            data: this.calculosRD.estadisticas.GrafPrecioM,
          },
          {
            label: 'PrecioOper',
            fill: true,
            backgroundColor: 'red',
            borderColor: 'red',
            data: this.calculosRD.estadisticas.GrafPrecioOper,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          xAxes: [
            {
              ticks: {
                min: new Date(`${this.calculosRD.estadisticas.hoy}09:00:00`),
                max: new Date(`${this.calculosRD.estadisticas.hoy}13:00:00`),
              },
              type: 'time',
              time: {
                format: 'HH:mm',
                unit: 'hour',
                unitStepSize: 1,
                displayFormats: {
                  // minute: 'mm',
                  hour: 'hh:mm a',
                },
                tooltipFormat: 'hh:mm a',
              },
              gridLines: {
                display: true,
              },
            },
          ],
          yAxes: [
            {
              ticks: {
                // Luis aqui va el cambio
                // stepSize: 0,
                suggestedMax: this.calculosRD.estadisticas.MaxGrafPrecio +
                             (this.calculosRD.estadisticas.MaxGrafPrecio - this.calculosRD.estadisticas.MinGrafPrecio) / 10,
                suggestedMin: this.calculosRD.estadisticas.MinGrafPrecio -
                             (this.calculosRD.estadisticas.MaxGrafPrecio - this.calculosRD.estadisticas.MinGrafPrecio) / 10,
              },
            },
          ],
        },
      },
    });
  }

  generaGraficoLinia2() {

    // willmer Git   
     //  me esta graficando como que hubiera volumenes en cero
     // ni el grafvolM ni P tienen ceros y tampoco los minimos  
    return new Chart('graficoVolumen', {
      type: 'line',
      data: {
        datasets: [
          {
            label: 'VolumenM',
            fill: false,
            backgroundColor: 'Blue',
            borderColor: 'Blue',
            data: this.calculosRD.estadisticas.GrafVolumenM,
          },
          {
            label: 'VolumenOper',
            fill: false,
            backgroundColor: 'red',
            borderColor: 'red',
            data: this.calculosRD.estadisticas.GrafVolumenOper,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          yAxes: [
            {
              ticks: {
                // Luis aqui va el cambio
                // stepSize: 0,
                suggestedMax: this.calculosRD.estadisticas.MaxGrafVolumen + 
                        (this.calculosRD.estadisticas.MaxGrafVolumen - this.calculosRD.estadisticas.MinGrafVolumen) / 10,
                suggestedMin: this.calculosRD.estadisticas.MinGrafVolumen - 
                        (this.calculosRD.estadisticas.MaxGrafVolumen - this.calculosRD.estadisticas.MinGrafVolumen) / 10,
                beginAtZero: true,
                callback: (value) => {
                  return display_x(value, 10, 2);
                },
              },
            },
          ],
          xAxes: [
            {
              ticks: {
                min: new Date(`${this.calculosRD.estadisticas.hoy}09:00:00`),
                max: new Date(`${this.calculosRD.estadisticas.hoy}13:00:00`),
              },
              type: 'time',
              time: {
                format: 'HH:mm',
                unit: 'hour',
                unitStepSize: 1,
                displayFormats: {
                  // minute: 'mm',
                  hour: 'hh:mm a',
                },
                tooltipFormat: 'hh:mm a',
              },
              gridLines: {
                display: true,
              },
            },
          ],
        },
        tooltips: {
          callbacks: {
            label: (tooltipItem, chart) => {
              return `${
                chart.datasets[tooltipItem.datasetIndex].label
              }: ${display_x(tooltipItem.yLabel, 10, 2)}`;
            },
          },
        },
      },
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
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
      },
    });
  }

  consultarCliente(codigo: string[]) {
    console.log('codigo ', codigo);

    this.codigoCliente = codigo[0];
    this.consultaTipo = codigo[1];
    this.codigoTitulo = codigo[2];
    this.codigoMoneda = codigo[3];

    if (this.consultaTipo === '3') {
      this.calculosRD.visibleMovi = false;
      this.procesarCalculos(this.codigoTitulo, this.codigoMoneda);
    }
  }
}
