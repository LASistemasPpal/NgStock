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
  ) { }

  limpiarGraf(Gr: Graficos[], hasta: number) {
    for (let tam = Gr.length; tam > hasta;) {
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
    for (let tam = Mov.length; tam > hasta;) {
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



  calcular( codISIN: string, codMoneda: string) {
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
    this.limpiarGraf(this.estadisticas.GrafPrecioP, 0);
    this.limpiarGraf(this.estadisticas.GrafPrecioM, 0);
    this.limpiarGraf(this.estadisticas.GrafPrecioOper, 0);
    this.limpiarGraf(this.estadisticas.GrafVolumenP, 0);
    this.limpiarGraf(this.estadisticas.GrafVolumenM, 0);
    this.limpiarGraf(this.estadisticas.GrafVolumenOper, 0);

    this.limpiarMovimientos(this.estadisticas.Movi, 0);
    // recorrido  mercado
    for (const bvrdMJson of this.bvrdPMkrt.posturasSiopel[0].CadJson) {
      if (this.estadisticas.hoy === '') {
        this.estadisticas.hoy = bvrdMJson.FechaPostura + 'T'; // busco la fecha del dia en la primera postura

      }
      if (bvrdMJson.Estatus !== 'Cancelada') {
        this.estadisticas.canti.PosturasM =
          this.estadisticas.canti.PosturasM + 1;
        //  primario y market makers
        this.estadisticas.canti.MtodopM =
          this.estadisticas.canti.MtodopM + bvrdMJson.ValorTransadoPesos / 1000000;
        this.estadisticas.canti.MtousdM =
          this.estadisticas.canti.MtousdM + bvrdMJson.ValorTransadoDolares / 1000;
        this.estadisticas.canti.MtototM =
          this.estadisticas.canti.MtototM +
          bvrdMJson.ValorTransadoDolares * this.estadisticas.tpcambio / 1000000 +
          bvrdMJson.ValorTransadoPesos / 1000000;

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

          //  operaciones de mercado
          if (bvrdMJson.Estatus === 'Calzada') {
            this.estadisticas.canti.OperacionesM =
              this.estadisticas.canti.OperacionesM + 1;
            this.estadisticas.GrafPrecioOper.push({
              x: new Date(this.estadisticas.hoy + `${bvrdMJson.HoraPostura}`),
              y: bvrdMJson.Precio,
            });
            // tslint:disable-next-line: max-line-length
            this.estadisticas.posi = this.indexGraf(
              this.estadisticas.GrafVolumenOper,
              new Date(this.estadisticas.hoy + `${bvrdMJson.HoraPostura}`)
            );
            if (this.estadisticas.posi < 0) {
              this.estadisticas.GrafVolumenOper.push({
                x: new Date(this.estadisticas.hoy + `${bvrdMJson.HoraPostura}`),
                y: bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares,
              });
            } else {
              this.estadisticas.GrafVolumenOper[this.estadisticas.posi].y =
                this.estadisticas.GrafVolumenOper[this.estadisticas.posi].y +
                bvrdMJson.ValorNominalPesos +
                bvrdMJson.ValorNominalDolares;
            }
          }
        } // seleccion por isin para graficos

        if (bvrdMJson.Estatus !== 'Vigente') {
          //  vigente cancelada y calzada
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
                Cotitulo: this.getCodTituloLA(bvrdMJson.ISIN),
                Isin: bvrdMJson.ISIN,
                Cant: 1,
                c_v: bvrdMJson.PosicionCompraVenta,
              });
            } else {
              this.estadisticas.Movi.push({
                Moneda: 'DOP',
                Monto: bvrdMJson.ValorTransadoPesos,
                Cotitulo: this.getCodTituloLA(bvrdMJson.ISIN),
                Isin: bvrdMJson.ISIN,
                Cant: 1,
                c_v: bvrdMJson.PosicionCompraVenta,
              });
            }
          } //  si esta en Movi
          else {
            this.estadisticas.Movi[this.estadisticas.posi].Cant += 1;
            if (bvrdMJson.ValorTransadoDolares > 0) {
              this.estadisticas.Movi[this.estadisticas.posi].Monto +=
                bvrdMJson.ValorTransadoDolares;
            } else {
              this.estadisticas.Movi[this.estadisticas.posi].Monto +=
                bvrdMJson.ValorTransadoPesos;
            }
          }
          if (this.estadisticas.emisiones.indexOf(bvrdMJson.ISIN) < 0) {
            this.estadisticas.emisiones.push(bvrdMJson.ISIN);
          } // meto las emisiones
        } // si no esta vencida
      } //  no ERROR
    } // lectura de posturas

    // calculo porcentajes transados por moneda
    this.estadisticas.canti.PorcdopM = 0;
    this.estadisticas.canti.PorcusdM = 0;
    this.estadisticas.canti.PorctotM = 100;
    if (this.estadisticas.canti.MtototM > 0.01) {
      this.estadisticas.canti.PorcdopM =
        this.estadisticas.canti.MtodopM / this.estadisticas.canti.MtototM * 100;
      this.estadisticas.canti.PorcusdM = 100 - this.estadisticas.canti.PorcdopM;
    }

    // recorrido  posturas propias
    for (const bvrdPJson of this.bvrdPsot.posturasPropias[0].CadJson) {
      if (bvrdPJson.Estatus !== 'Cancelada') {
        this.estadisticas.canti.PosturasP =
          this.estadisticas.canti.PosturasP + 1;
        if (bvrdPJson.ISIN === this.estadisticas.isinsel) {
          this.estadisticas.GrafPrecioP.push({
            x: new Date(this.estadisticas.hoy + `${bvrdPJson.HoraPostura}`),
            y: bvrdPJson.Precio,
          });
          // tslint:disable-next-line: max-line-length
          this.estadisticas.GrafVolumenP.push({
            x: new Date(this.estadisticas.hoy + `${bvrdPJson.HoraPostura}`),
            y: bvrdPJson.ValorNominalPesos + bvrdPJson.ValorNominalDolares,
          });
        }
        if (bvrdPJson.Estatus === 'Calzada') {
          this.estadisticas.canti.OperacionesP =
            this.estadisticas.canti.OperacionesP + 1;
        }
      }
    }

    //  busco las operaciones de bolsa.. deberia estar en las posturas
    for (const bvrdOp of this.bvrdOper.operacionBvrd[0].CadJson) {
      if (bvrdOp.NombreMercado.substr(0, 4) === 'Prim') {
        this.estadisticas.canti.PrimarioP =
          this.estadisticas.canti.PrimarioP + 1;
      }
      if (bvrdOp.NombreMercado.substr(0, 4) === 'Crea') {
        this.estadisticas.canti.MarketMP = this.estadisticas.canti.MarketMP + 1;
      }
    }

    this.estadisticas.MastranMtoDOP = 0;
    this.estadisticas.MastranMtoUSD = 0;
    for (const mov of this.estadisticas.Movi) {
      if (mov.Moneda === 'USD' && mov.Monto > this.estadisticas.MastranMtoUSD && mov.c_v === 'C') {
        this.estadisticas.MastranMtoUSD = mov.Monto;
        this.estadisticas.MastransadaUSD = mov.Cotitulo;
      }
      if (mov.Moneda === 'DOP' && mov.Monto > this.estadisticas.MastranMtoDOP && mov.c_v === 'C') {
        this.estadisticas.MastranMtoDOP = mov.Monto;
        this.estadisticas.MastransadaDOP = mov.Cotitulo;
      }
    }

    this.estadisticas.MinGrafPrecio = 20000;
    this.estadisticas.MaxGrafPrecio = 1;
    this.estadisticas.MinGrafVolumen = 1000000000000;
    this.estadisticas.MaxGrafVolumen = 0;
    // GrafPrecioP.push({ Hora: 10.15, EjeY: 102.5975 });
    // GrafPrecioP.push({ Hora: 11.3, EjeY: 102.58 });
    for (const graf of this.estadisticas.GrafPrecioP) {
      if (graf.y < this.estadisticas.MinGrafPrecio) {
        this.estadisticas.MinGrafPrecio = graf.y;
      }
      if (graf.y > this.estadisticas.MaxGrafPrecio) {
        this.estadisticas.MaxGrafPrecio = graf.y;
      }
    }

    // GrafVolumenP.push({ Hora: 12.15, EjeY: 1030000.5 });
    // GrafVolumenP.push({ Hora: 12.3, EjeY: 3000.5 });
    for (const graf of this.estadisticas.GrafVolumenP) {
      if (graf.y < this.estadisticas.MinGrafVolumen) {
        this.estadisticas.MinGrafVolumen = graf.y;
      }
      if (graf.y > this.estadisticas.MaxGrafVolumen) {
        this.estadisticas.MaxGrafVolumen = graf.y;
      }
    }

    // Willmer nuevo filtro por titulos
    console.log('calculo ', this.estadisticas.Movi);

    if (codISIN !== '') {
      this.estadisticas.Movi = this.estadisticas.Movi.filter((valor) => valor.Isin === codISIN);
    }

    this.visibleMovi = true;
  }

  getCodTituloLA(codISIN: string) {
    const resultado = this.dameTitulosAll.CadOut.find((valor) => valor.Isin === codISIN);
    return resultado !== undefined ? resultado.Coregistro : 'No Encontrado';
  }
}
