import { DameCalendario, DameTitulosAll } from '@laranda/lib-ultra-net';
import { Injectable } from '@angular/core';
import { Estadisticas, Movimientos, Graficos } from '../classes/bvrdClass';
import {
  DamePosturasP,
  DamePosturasM,
  DameOperaciones,
} from './data-bvrd.service';

@Injectable()
export class CalculosRD {
  estadisticas: Estadisticas = new Estadisticas();
  visibleMovi: boolean;

  constructor(
    private bvrdPsot: DamePosturasP,
    private bvrdPMkrt: DamePosturasM,
    private bvrdOper: DameOperaciones,
    private dameCalendario: DameCalendario,
    private dameTitulosAll: DameTitulosAll
  ) {}

  limpiarGraf(Gr: Graficos[], hasta: number) {
    for (let tam = Gr.length; tam > hasta; ) {
      Gr.pop();
      tam = Gr.length;
    }
  }

  indexGraf(Gr: Graficos[], HoraX: Date) {
    let j = -1;
    for (let i = 0; i < Gr.length; i++) {
      if (Gr[i].x === HoraX) {
        j = i;
      }
    }
    return j;
  }

  limpiarMovimientos(Mov: Movimientos[], hasta: number) {
    for (let tam = Mov.length; tam > hasta; ) {
      Mov.pop();
      tam = Mov.length;
    }
  }
  limpiarEmisiones(Mov: string[], hasta: number) {
    for (let tam = Mov.length; tam > hasta; ) {
      Mov.pop();
      tam = Mov.length;
    }
  }

  indexMovimientos(Mov: Movimientos[], isinn: string, C_V: string) {
    let j = -1;
    for (let i = 0; i < Mov.length; i++) {
      if (Mov[i].Isin === isinn && Mov[i].c_v === C_V) {
        j = i;
      }
    }
    return j;
  }

  calcular(codISIN: string, codMoneda: string) {
    if (codISIN === undefined) {
      codISIN = '';
    }
    if (codMoneda === undefined) {
      codMoneda = '';
    }
    if (codMoneda === '000') {
      codMoneda = 'DOP';
    }
    if (codMoneda === '001') {
      codMoneda = 'USD';
    }
    this.visibleMovi = false;
    this.estadisticas.isinsel = codISIN; //  DO1002220627
    this.estadisticas.monsel = codMoneda;
    this.estadisticas.canti.MarketMM = 0;
    this.estadisticas.canti.MarketMP = 0;
    this.estadisticas.canti.PosturasM = 0;
    this.estadisticas.canti.PosturasP = 0;
    this.estadisticas.canti.PrimarioM = 0;
    this.estadisticas.canti.PrimarioP = 0;
    this.estadisticas.canti.OperacionesM = 0;
    this.estadisticas.canti.OperacionesP = 0;
    this.estadisticas.canti.MtodopM = 0;
    this.estadisticas.canti.MtousdM = 0;
    this.estadisticas.canti.MtototM = 0;
    this.estadisticas.canti.PorcdopM = 0;
    this.estadisticas.canti.PorcusdM = 0;
    this.estadisticas.canti.PorctotM = 0;
    this.estadisticas.tpcambio = +this.dameCalendario.CadOut.Tcdolar;
    this.estadisticas.hoy = ''; //  '2020-06-30T';
    this.limpiarGraf(this.estadisticas.GrafPrecioM, 0);
    this.limpiarGraf(this.estadisticas.GrafPrecioOper, 0);
    this.limpiarGraf(this.estadisticas.GrafVolumenM, 0);
    this.limpiarGraf(this.estadisticas.GrafVolumenOper, 0);

    this.limpiarMovimientos(this.estadisticas.Movi, 0);
    this.limpiarEmisiones(this.estadisticas.Emisiones, 0);
    // recorrido  mercado posturas
    for (const bvrdMJson of this.bvrdPMkrt.posturasSiopel[0].CadJson) {
      if (this.estadisticas.hoy === '') {
        this.estadisticas.hoy = bvrdMJson.FechaPostura + 'T'; // busco la fecha del dia en la primera postura
      }

      if (
        bvrdMJson.ValorNominalDolares > 0.1 &&
        bvrdMJson.ValorTransadoDolares < 0.1
      ) {
        if (bvrdMJson.TasaCupon > 0.01) {
          bvrdMJson.ValorTransadoDolares =
            (bvrdMJson.ValorNominalDolares * bvrdMJson.Precio) / 100.0;
        } else {
          bvrdMJson.ValorTransadoDolares =
            bvrdMJson.ValorNominalDolares * bvrdMJson.Precio;
        }
      }

      if (
        bvrdMJson.ValorNominalPesos > 0.1 &&
        bvrdMJson.ValorTransadoPesos < 0.1
      ) {
        if (bvrdMJson.TasaCupon > 0.01) {
          bvrdMJson.ValorTransadoPesos =
            (bvrdMJson.ValorNominalPesos * bvrdMJson.Precio) / 100.0;
        } else {
          bvrdMJson.ValorTransadoPesos =
            bvrdMJson.ValorNominalPesos * bvrdMJson.Precio;
        }
      }

      if (bvrdMJson.Estatus !== 'Cancelada') {
        if (
          bvrdMJson.MonedaLiquidacion === this.estadisticas.monsel ||
          this.estadisticas.monsel === ''
        ) {
          if (
            bvrdMJson.ISIN === this.estadisticas.isinsel ||
            this.estadisticas.isinsel === ''
          ) {
            this.estadisticas.canti.PosturasM =
              this.estadisticas.canti.PosturasM + 1;
          }
        }
        //  primario y market makers

        if (
          bvrdMJson.Estatus !== 'Vencida' &&
          bvrdMJson.PosicionCompraVenta === 'C'
        ) {
          if (
            bvrdMJson.MonedaLiquidacion === this.estadisticas.monsel ||
            this.estadisticas.monsel === ''
          ) {
            if (
              bvrdMJson.ISIN === this.estadisticas.isinsel ||
              this.estadisticas.isinsel === ''
            ) {
              this.estadisticas.canti.MtodopM =
                this.estadisticas.canti.MtodopM +
                bvrdMJson.ValorTransadoPesos / 1000000;
              this.estadisticas.canti.MtousdM =
                this.estadisticas.canti.MtousdM +
                bvrdMJson.ValorTransadoDolares / 1000;
              this.estadisticas.canti.MtototM =
                this.estadisticas.canti.MtototM +
                (bvrdMJson.ValorTransadoDolares * this.estadisticas.tpcambio) /
                  1000000 +
                bvrdMJson.ValorTransadoPesos / 1000000;
            }
          }
        }

        if (bvrdMJson.Estatus === 'Calzada') {
          if (
            bvrdMJson.MonedaLiquidacion === this.estadisticas.monsel ||
            this.estadisticas.monsel === ''
          ) {
            if (
              bvrdMJson.ISIN === this.estadisticas.isinsel ||
              this.estadisticas.isinsel === ''
            ) {
              this.estadisticas.canti.OperacionesM =
                this.estadisticas.canti.OperacionesM + 1;

              if (bvrdMJson.CODRUEDA === 'LICI') {
                this.estadisticas.canti.PrimarioM =
                  this.estadisticas.canti.PrimarioM + 1;
              }
              if (bvrdMJson.CODRUEDA === 'BL') {
                this.estadisticas.canti.MarketMM =
                  this.estadisticas.canti.MarketMM + 1;
              }
            }
          }
        }
        if (bvrdMJson.ISIN === this.estadisticas.isinsel) {
          // posturas de mercado
          this.estadisticas.GrafPrecioM.push({
            x: new Date(this.estadisticas.hoy + bvrdMJson.HoraPostura),
            y: bvrdMJson.Precio,
          });

          // tslint:disable-next-line: max-line-length
          this.estadisticas.posi = this.indexGraf(
            this.estadisticas.GrafVolumenM,
            new Date(this.estadisticas.hoy + `${bvrdMJson.HoraPostura}`)
          );
          if (
            bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares >
            0.01
          ) {
            if (this.estadisticas.posi < 0) {
              this.estadisticas.GrafVolumenM.push({
                x: new Date(this.estadisticas.hoy + `${bvrdMJson.HoraPostura}`),
                y: bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares,
              });
            } else {
              this.estadisticas.GrafVolumenM[this.estadisticas.posi].y =
                this.estadisticas.GrafVolumenM[this.estadisticas.posi].y +
                bvrdMJson.ValorNominalPesos +
                bvrdMJson.ValorNominalDolares;
            }
          }

          //  operaciones de mercado
          if (bvrdMJson.Estatus === 'Calzada') {
            this.estadisticas.GrafPrecioOper.push({
              x: new Date(this.estadisticas.hoy + `${bvrdMJson.HoraPostura}`),
              y: bvrdMJson.Precio,
            });
            // tslint:disable-next-line: max-line-length
            this.estadisticas.posi = this.indexGraf(
              this.estadisticas.GrafVolumenOper,
              new Date(this.estadisticas.hoy + `${bvrdMJson.HoraPostura}`)
            );
            if (
              bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares >
              0.01
            ) {
              if (this.estadisticas.posi < 0) {
                this.estadisticas.GrafVolumenOper.push({
                  x: new Date(
                    this.estadisticas.hoy + `${bvrdMJson.HoraPostura}`
                  ),
                  y:
                    bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares,
                });
              } else {
                this.estadisticas.GrafVolumenOper[this.estadisticas.posi].y =
                  this.estadisticas.GrafVolumenOper[this.estadisticas.posi].y +
                  bvrdMJson.ValorNominalPesos +
                  bvrdMJson.ValorNominalDolares;
              }
            }
          }
        } // seleccion por isin para graficos o por moneda

        if (bvrdMJson.Estatus === 'Calzada') {
          if (
            bvrdMJson.MonedaLiquidacion === this.estadisticas.monsel ||
            this.estadisticas.monsel === ''
          ) {
            //  vigente cancelada y calzada  vencida
            this.estadisticas.posi = this.indexMovimientos(
              this.estadisticas.Movi,
              bvrdMJson.ISIN,
              bvrdMJson.PosicionCompraVenta
            );
            if (this.estadisticas.posi < 0) {
              if (bvrdMJson.ValorTransadoDolares > 0) {
                this.estadisticas.Movi.push({
                  Moneda: 'USD',
                  Monto: bvrdMJson.ValorTransadoDolares,
                  Nominal: bvrdMJson.ValorNominalDolares,
                  Cotitulo: this.dameTitulosAll.getCodTituloLA(bvrdMJson.ISIN),
                  Isin: bvrdMJson.ISIN,
                  Cant: 1,
                  c_v: bvrdMJson.PosicionCompraVenta,
                  PrecioC: 0,
                  PrecioV: 0
                });
              } else {
                this.estadisticas.Movi.push({
                  Moneda: 'DOP',
                  Monto: bvrdMJson.ValorTransadoPesos,
                  Nominal: bvrdMJson.ValorNominalPesos,
                  Cotitulo: this.dameTitulosAll.getCodTituloLA(bvrdMJson.ISIN),
                  Isin: bvrdMJson.ISIN,
                  Cant: 1,
                  c_v: bvrdMJson.PosicionCompraVenta,
                  PrecioC: 0,
                  PrecioV: 0
                });
              }
            } //  si esta en Movi
            else {
              this.estadisticas.Movi[this.estadisticas.posi].Cant += 1;
              if (bvrdMJson.ValorTransadoDolares > 0) {
                this.estadisticas.Movi[this.estadisticas.posi].Monto +=
                  bvrdMJson.ValorTransadoDolares;
                this.estadisticas.Movi[this.estadisticas.posi].Nominal +=
                  bvrdMJson.ValorNominalDolares;  
              } else {
                this.estadisticas.Movi[this.estadisticas.posi].Monto +=
                  bvrdMJson.ValorTransadoPesos;
                this.estadisticas.Movi[this.estadisticas.posi].Nominal +=
                  bvrdMJson.ValorNominalPesos;
              }
            }
            if (bvrdMJson.CODRUEDA === 'LICI') {
              if (this.estadisticas.Emisiones.indexOf(bvrdMJson.ISIN) < 0) {
                this.estadisticas.Emisiones.push(bvrdMJson.ISIN);
              } // meto las emisiones
            }
          } // seleccion de moneda
        } //  calzada
      }
    } // lectura de posturas mercado

    // calculo porcentajes transados por moneda
    this.estadisticas.canti.PorcdopM = 0;
    this.estadisticas.canti.PorcusdM = 0;
    this.estadisticas.canti.PorctotM = 100;
    if (this.estadisticas.canti.MtototM > 0.01) {
      this.estadisticas.canti.PorcdopM =
        (this.estadisticas.canti.MtodopM / this.estadisticas.canti.MtototM) *
        100;
      this.estadisticas.canti.PorcusdM = 100 - this.estadisticas.canti.PorcdopM;
    }

    // recorrido  posturas propias
    if (this.bvrdPsot.posturasPropias[0] !== undefined) {
      for (const bvrdPJson of this.bvrdPsot.posturasPropias[0].CadJson) {
        if (bvrdPJson.Estatus !== 'Cancelada') {
          if (
            bvrdPJson.MonedaLiquidacion === this.estadisticas.monsel ||
            this.estadisticas.monsel === ''
          ) {
            if (
              bvrdPJson.ISIN === this.estadisticas.isinsel ||
              this.estadisticas.isinsel === ''
            ) {
              this.estadisticas.canti.PosturasP =
                this.estadisticas.canti.PosturasP + 1;
            }
          }
          if (bvrdPJson.Estatus === 'Calzada') {
            if (
              bvrdPJson.MonedaLiquidacion === this.estadisticas.monsel ||
              this.estadisticas.monsel === ''
            ) {
              if (
                bvrdPJson.ISIN === this.estadisticas.isinsel ||
                this.estadisticas.isinsel === ''
              ) {
                this.estadisticas.canti.OperacionesP =
                  this.estadisticas.canti.OperacionesP + 1;
                if (bvrdPJson.CODRUEDA === 'LICI') {
                  this.estadisticas.canti.PrimarioP =
                    this.estadisticas.canti.PrimarioP + 1;
                }
                if (bvrdPJson.CODRUEDA === 'BL') {
                  this.estadisticas.canti.MarketMP =
                    this.estadisticas.canti.MarketMP + 1;
                }
              }
            }
          }
        }
      }
    }

    this.estadisticas.MastranMtoDOP = 0;
    this.estadisticas.MastranMtoUSD = 0;
    for (const mov of this.estadisticas.Movi) {
      if (
        mov.Moneda === 'USD' &&
        mov.Monto > this.estadisticas.MastranMtoUSD &&
        mov.c_v === 'C'
      ) {
        this.estadisticas.MastranMtoUSD = mov.Monto;
        this.estadisticas.MastransadaUSD = mov.Cotitulo;
      }
      if (
        mov.Moneda === 'DOP' &&
        mov.Monto > this.estadisticas.MastranMtoDOP &&
        mov.c_v === 'C'
      ) {
        this.estadisticas.MastranMtoDOP = mov.Monto;
        this.estadisticas.MastransadaDOP = mov.Cotitulo;
      }
    }

    this.estadisticas.MinGrafPrecio = 20000;
    this.estadisticas.MaxGrafPrecio = 1;
    this.estadisticas.MinGrafVolumen = 1000000000000;
    this.estadisticas.MaxGrafVolumen = 0;
    for (const graf of this.estadisticas.GrafPrecioM) {
      if (graf.y < this.estadisticas.MinGrafPrecio) {
        this.estadisticas.MinGrafPrecio = graf.y;
      }
      if (graf.y > this.estadisticas.MaxGrafPrecio) {
        this.estadisticas.MaxGrafPrecio = graf.y;
      }
    }

    for (const graf of this.estadisticas.GrafVolumenM) {
      if (graf.y < this.estadisticas.MinGrafVolumen) {
        this.estadisticas.MinGrafVolumen = graf.y;
      }
      if (graf.y > this.estadisticas.MaxGrafVolumen) {
        this.estadisticas.MaxGrafVolumen = graf.y;
      }
    }

    // Willmer nuevo filtro por titulos
    if (codISIN !== '' && codISIN !== undefined) {
      this.estadisticas.Movi = this.estadisticas.Movi.filter(
        (valor) => valor.Isin === codISIN
      );
    }

    this.visibleMovi = true;
  }
}
