import { Component, OnInit } from '@angular/core';
import {
  DameCalendario,
  AutenticaCli,
  DameTitulosAll,
  DameTitulos, DameCOrdenX, InsertaPolicia
} from '@laranda/lib-ultra-net';
import { ConectorService, fechaHoy, display_x } from '@laranda/lib-sysutil';
import { Chart } from 'chart.js';
import { CalculosRD } from './../../../shared/services/estadisticas.service';
import { TranslateLAService } from './../../../shared/services/translateLA.service';
import { Movimientos, RiesgoLiquidez } from './../../../shared/classes/bvrdClass';
import {
  DamePosturasM,
  DamePosturasP,
  DameOperaciones,
  DameOperacionesMrkt,
  DameRiesgoLiquidezServer,
} from './../../../shared/services/data-bvrd.service';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

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
  mecaOTC = false;
  fechaActual = fechaHoy();
  movimientos: Movimientos[];
  tipoIdioma = 'es';
  quePaso = '';

  constructor(
    private conectorService: ConectorService,
    private dameTitulosAll: DameTitulosAll,
    private autenticaCli: AutenticaCli,
    private insertaPolicia: InsertaPolicia,
    private translate: TranslateService,
    private translateLAService: TranslateLAService,
    public dameTitulos: DameTitulos,
    public damePosturasP: DamePosturasP,
    public damePosturasM: DamePosturasM,
    public dameOperaciones: DameOperaciones,
    public dameOperacionesMrkt: DameOperacionesMrkt,
    public dameCalendario: DameCalendario,
    public dameRiesgoLiquidezServer: DameRiesgoLiquidezServer,
    public calculosRD: CalculosRD,
    public dameCOrdenX: DameCOrdenX
  ) {

    if (this.conectorService.info !== undefined) {
      this.insertaPolicia.consultar(this.conectorService.info.URL_REST, this.conectorService.info.NUCLI,
        'Ingresando al sistema', 'NgStock', 'C', 99);
    }

    this.tipoIdioma = this.translate.getBrowserLang();
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

    Promise.allSettled([
      this.damePosturasM.consultar(this.autenticaCli.CadOut.Usuariobv),
      this.damePosturasP.consultar(this.autenticaCli.CadOut.Usuariobv),
      this.dameOperaciones.consultar(this.autenticaCli.CadOut.Usuariobv),
      this.dameOperacionesMrkt.consultar(this.autenticaCli.CadOut.Usuariobv),
      this.dameRiesgoLiquidezServer.consultar(this.autenticaCli.CadOut.Usuariobv)
    ])
      .then(() => this.calculosRD.calcular(codTitulo, codMoneda))
      .then(() => this.defineColumnas(this.tipoIdioma))
      .then(() => {

        this.calculosRD.estadisticas.Movi.map((valor) => {
          let riesgoL: RiesgoLiquidez[];
          riesgoL = this.dameRiesgoLiquidezServer.riesgoLiquidez.filter((x) => x.codigoisin === valor.Isin);
          if (riesgoL[0] !== undefined) {
            if (valor.c_v === 'C') {
              valor.PrecioC = riesgoL[0].precioppcompra;
            } else {
              valor.PrecioV = riesgoL[0].precioppventa;
            }
          }
        });

        this.calculosRD.visibleMovi = true;
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
      .catch((e) => this.mensajeError('Error', e.Status, e.Mensaje));
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

  consultarOrdenes(codigo: string[]) {
    this.dameCOrdenX.visible = false;
    this.dameCOrdenX.CadOut = [];
    if (this.mecaOTC) {
      this.dameCOrdenX.ParamIn.Nuorigen = 0;
    } else {
     this.dameCOrdenX.ParamIn.Nuorigen = 1; }
//     this.dameCOrdenX.ParamIn.Desde    = this.fecha.replace(/\//g, '-');
    this.dameCOrdenX.ParamIn.Desde    = this.dameCalendario.CadOut.Fecha.replace(/\//g, '-');

    this.dameCOrdenX.ParamIn.Hasta    = this.dameCOrdenX.ParamIn.Desde;
    this.dameCOrdenX.ParamIn.Rif      = codigo[0];
    this.dameCOrdenX.ParamIn.Titulo   = codigo[2];
    // this.dameCOrdenX.ParamIn.Rif      = this.codRif.toUpperCase();
    // this.dameCOrdenX.ParamIn.Titulo   = this.titulo;
    this.dameCOrdenX.consultar(this.conectorService.info.URL_REST);
  }

  consultarGeneral(codigo: string[]) {
      this.codigoCliente = codigo[0];
      this.consultaTipo = codigo[1];

      if (codigo[1] === '')  {
        this.consultaTipo = '0';
      }

      this.codigoTitulo = codigo[2];
      this.codigoMoneda = codigo[3];
      this.mecaOTC = codigo[4] === 'OTC';
      if (this.consultaTipo === '2') {
        this.consultarOrdenes(codigo);
      }
      if (this.consultaTipo === '3') {
          this.calculosRD.visibleMovi = false;
          this.procesarCalculos(this.codigoTitulo, this.codigoMoneda);
      }
  }

  mensajeError(metodo: string, status: number, mensaje: string) {
    swal.close();

    swal.fire({
      icon: 'error',
      text: `Status: ${status} Mensaje: ${mensaje}`,
      title: metodo
    });

  }

  defineColumnas(tipo: string) {
    this.tipoIdioma = tipo;
    this.calculosRD.visibleMovi = false;

    this.quePaso = this.dameCalendario.CadOut.Comentarios;

    if (tipo !== 'es') {
      setTimeout(() => {
        this.translateLAService.traducirTexto(this.dameCalendario.CadOut.Comentarios, tipo)
          .subscribe(x => {
            this.quePaso = x[0].translations[0].text;
          });
      });
    }

    this.dtColumnasEjemplo = [
      {
        title: 'TITULO',
        data : null,
        render: (data: any, type: any, row: any, meta) => {
          return data.Cotitulo.substr(0, 7); }
      },
      {
        title: 'MON',
        data: null,
        render: (data: any, type: any, row: any, meta) => {
          return data.Moneda + ' ' + data.c_v + '-' + display_x(data.Cant, 2, 0) ;
        }
      },
      {
        title: 'Nom_Posturas_Transado',
        data: null,
        className: 'dt-body-right',
        render: (data: any, type: any, row: any, meta) => {
          return (data.NominalP > data.NominalReal) ?
            display_x(data.NominalP, 10, 2) + '<span style="color:red"> -></span>' + display_x(data.NominalReal, 10, 2) :
            display_x(data.NominalP, 10, 2);
//         return display_x(data.NominalP > data.NominalReal ? data.NominalReal : data.NominalP, 10, 2);
        },
      },
      {
        title: 'EFECT_REAL',
        data: null,
        className: 'dt-body-right',
        render: (data: any, type: any, row: any, meta) => {
          return display_x(data.MontoReal, 10, 2);
        },
      },
      { title: 'Isin', data: 'Isin' },
      {
        title: 'ULT_PREC',
        data: null,
        className: 'dt-body-right',
        render: (data: any, type: any, row: any, meta) => {
//        return display_x(data.PrecioProm, 10, 4); /// uno inventado de las posturas
          return display_x(data.UltPrecio, 5, 2);   //  viene de oper mercado
        },
      },
    ];

    setTimeout(() => {
      this.translateLAService.traducirColumnas(this.dtColumnasEjemplo)
        .then(x => this.calculosRD.visibleMovi = x);
    });
  }
}
