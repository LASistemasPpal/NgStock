import { DameCalendario, DameTitulosAll } from '@laranda/lib-ultra-net';
import { Injectable } from '@angular/core';
import { Estadisticas, Movimientos, Graficos } from '../classes/bvrdClass';
import {
  DamePosturasP,
  DamePosturasM,
  DameOperacionesMrkt,
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
    private bvrdOperMrkt: DameOperacionesMrkt,
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

  async calcular(codISIN: string, codMoneda: string) {
    let CodLA = '';
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
    if (this.bvrdPMkrt.posturasSiopel[0] !== undefined) {
      for (const bvrdMJson of this.bvrdPMkrt.posturasSiopel[0].CadJson) {
        if (this.estadisticas.hoy === '') {
          this.estadisticas.hoy = bvrdMJson.fecha_postura + 'T'; // busco la fecha del dia en la primera postura
        }

        if (bvrdMJson.moneda === 'USD') {
          if (bvrdMJson.tasa_cupon > 0.01) {
            bvrdMJson.monto_transado_dolares =
              (bvrdMJson.monto_nominal_dolares * bvrdMJson.precio_limpio) / 100.0;
          } else {
            bvrdMJson.monto_transado_dolares =
              bvrdMJson.monto_nominal_dolares * bvrdMJson.precio_limpio;
          }
        }

        if (  bvrdMJson.moneda === 'DOP') {
          if (bvrdMJson.tasa_cupon > 0.01) {
            bvrdMJson.monto_transado_pesos =
              (bvrdMJson.monto_nominal_pesos * bvrdMJson.precio_limpio) / 100.0;
          } else {
            bvrdMJson.monto_transado_pesos =
              bvrdMJson.monto_nominal_pesos * bvrdMJson.precio_limpio;
          }
        }

        if (bvrdMJson.estatus_orden !== 'Cancelada') {
          if (bvrdMJson.moneda === this.estadisticas.monsel ||
            this.estadisticas.monsel === '') {
            if (
              bvrdMJson.codisin === this.estadisticas.isinsel ||
              this.estadisticas.isinsel === ''
            ) {
              this.estadisticas.canti.PosturasM =
                this.estadisticas.canti.PosturasM + 1;
            }
          }

          if (bvrdMJson.estatus_orden === 'Calzada') {
            if (bvrdMJson.moneda === this.estadisticas.monsel ||
              this.estadisticas.monsel === '') {
              if (bvrdMJson.codisin === this.estadisticas.isinsel ||
                this.estadisticas.isinsel === '') {
                if (bvrdMJson.codigo_rueda === 'LICI') {
                  this.estadisticas.canti.PrimarioM =
                    this.estadisticas.canti.PrimarioM + 1;
                }
              }
            }
          }
          if (bvrdMJson.codisin === this.estadisticas.isinsel) {
            // posturas de mercado
            this.estadisticas.GrafPrecioM.push({
              x: new Date(bvrdMJson.hora_postura),
              y: bvrdMJson.precio_limpio,
            });

            // tslint:disable-next-line: max-line-length
            this.estadisticas.posi = this.indexGraf(
              this.estadisticas.GrafVolumenM,
              new Date(bvrdMJson.hora_postura)
            );
            if (bvrdMJson.monto_nominal  > 0.01) {
              if (this.estadisticas.posi < 0) {
                this.estadisticas.GrafVolumenM.push({
                  x: new Date(bvrdMJson.hora_postura),
                  y: bvrdMJson.monto_nominal 
                });
              } else {
                this.estadisticas.GrafVolumenM[this.estadisticas.posi].y =
                  this.estadisticas.GrafVolumenM[this.estadisticas.posi].y +
                  bvrdMJson.monto_nominal;
              }
            }

            //  operaciones de mercado
            if (bvrdMJson.estatus_orden === 'Calzada') {
              this.estadisticas.GrafPrecioOper.push({
                x: new Date(bvrdMJson.hora_postura),
                y: bvrdMJson.precio_limpio,
              });
              // tslint:disable-next-line: max-line-length
              this.estadisticas.posi = this.indexGraf(
                this.estadisticas.GrafVolumenOper,
                new Date(bvrdMJson.hora_postura)
              );
              if (bvrdMJson.monto_nominal  > 0.01) {
                if (this.estadisticas.posi < 0) {
                  this.estadisticas.GrafVolumenOper.push({
                    x: new Date(bvrdMJson.hora_postura),
                    y: bvrdMJson.monto_nominal 
                  });
                } else {
                  this.estadisticas.GrafVolumenOper[this.estadisticas.posi].y =
                    this.estadisticas.GrafVolumenOper[this.estadisticas.posi].y +
                    bvrdMJson.monto_nominal;
                }
              }
            }
          } // seleccion por isin para graficos o por moneda
        }
      } // lectura de posturas mercado
    }

   // recorrido  operaciones propias
    if (this.bvrdOper.operacionBvrd[0] !== undefined) {
    for (const bvrdJson of this.bvrdOper.operacionBvrd[0].CadJson) {
      if (bvrdJson.codisin === this.estadisticas.isinsel ||
        this.estadisticas.isinsel === '') {
      if (bvrdJson.nombre_mercado.substr(0, 4) === 'Prog') {
                 this.estadisticas.canti.MarketMP =
                   this.estadisticas.canti.MarketMP + 1;
               } else  {
               this.estadisticas.canti.OperacionesP =
                  this.estadisticas.canti.OperacionesP + 1; }
      }
     }
    }

 //  para llenar Movi recorrido operaciones mercado
    if (this.bvrdOperMrkt.operacionBvrdMrkt[0] !== undefined) {
      for (const bvrdOperM of this.bvrdOperMrkt.operacionBvrdMrkt[0].CadJson) {
        if (
          bvrdOperM.moneda_transada === this.estadisticas.monsel ||
          this.estadisticas.monsel === ''
        ) {
          if (
            bvrdOperM.codisin === this.estadisticas.isinsel ||
            this.estadisticas.isinsel === ''
          ) {
            if (bvrdOperM.moneda_transada = 'DOP') {
              this.estadisticas.canti.MtodopM =
              this.estadisticas.canti.MtodopM +
              bvrdOperM.monto_transado / 1000000;
              this.estadisticas.canti.MtototM =
              this.estadisticas.canti.MtototM +
              (bvrdOperM.monto_transado ) / 1000000;              
            }
            if (bvrdOperM.moneda_transada = 'USD') {
            this.estadisticas.canti.MtousdM =
              this.estadisticas.canti.MtousdM +
              bvrdOperM.monto_transado / 1000;
            this.estadisticas.canti.MtototM =
              this.estadisticas.canti.MtototM +
              (bvrdOperM.monto_transado * this.estadisticas.tpcambio) / 1000000;              
            }
          }
        }
        if (
        bvrdOperM.moneda_transada === this.estadisticas.monsel ||
        this.estadisticas.monsel === ''
      ) {
        //  vigente cancelada y calzada  vencida
        this.estadisticas.posi = this.indexMovimientos(
          this.estadisticas.Movi,
          bvrdOperM.codisin,
          'C' // bvrdOperM.PosicionCompraVenta
        );
        if (this.estadisticas.posi < 0) {
          CodLA = this.dameTitulosAll.getCodTituloLA(bvrdOperM.codisin);

          if (bvrdOperM.moneda_transada = 'USD') {
            this.estadisticas.Movi.push({
              Moneda: 'USD',
              MontoP: bvrdOperM.monto_transado,
              NominalP: bvrdOperM.monto_nominal_total,
              MontoReal: 0,
              NominalReal: 0,
              Cotitulo: CodLA,
              Isin: bvrdOperM.codisin,
              Cant: 1,
              c_v: 'C', // bvrdOperM.PosicionCompraVenta,
              PrecioC: 0,
              PrecioV: 0,
              UltPrecio: 0,
              PrecioProm: bvrdOperM.precio_limpio,
              UltNom: 0,
              NomOper: 0,
            });
          } else {
            this.estadisticas.Movi.push({
              Moneda: 'DOP',
              MontoP: bvrdOperM.monto_transado,
              NominalP: bvrdOperM.monto_nominal_total,
              MontoReal: 0,
              NominalReal: 0,
              Cotitulo: CodLA,
              Isin: bvrdOperM.codisin,
              Cant: 1,
              c_v: 'C', // bvrdOperM.PosicionCompraVenta,
              PrecioC: 0,
              PrecioV: 0,
              UltPrecio: 0,
              PrecioProm: bvrdOperM.precio_limpio,
              UltNom: 0,
              NomOper: 0,
            });
          }
        } //  si esta en Movi
        else {
          this.estadisticas.Movi[this.estadisticas.posi].Cant += 1;
          this.estadisticas.Movi[this.estadisticas.posi].PrecioProm =
          bvrdOperM.precio_limpio;
          if (bvrdOperM.moneda_transada = 'USD') {
            this.estadisticas.Movi[this.estadisticas.posi].MontoP +=
            bvrdOperM.monto_transado;
            this.estadisticas.Movi[this.estadisticas.posi].NominalP +=
            bvrdOperM.monto_nominal_total;
          } else {
            this.estadisticas.Movi[this.estadisticas.posi].MontoP +=
            bvrdOperM.monto_transado;
            this.estadisticas.Movi[this.estadisticas.posi].NominalP +=
            bvrdOperM.monto_nominal_total;
          }
        }
        if (bvrdOperM.tipo_mercado === 'LICI') {
          if (this.estadisticas.Emisiones.indexOf(bvrdOperM.codisin) < 0) {
            this.estadisticas.Emisiones.push(bvrdOperM.codisin);
          } // meto las emisiones
        }
      } // seleccion de moneda
    } //  calzada
  }
// calculo porcentajes transados por moneda
    this.estadisticas.canti.PorcdopM = 0;
    this.estadisticas.canti.PorcusdM = 0;
    this.estadisticas.canti.PorctotM = 100;
    if (this.estadisticas.canti.MtototM > 0.01) {
  this.estadisticas.canti.PorcdopM =
    (this.estadisticas.canti.MtodopM / this.estadisticas.canti.MtototM) *
    100;
  this.estadisticas.canti.PorcusdM = 100 - this.estadisticas.canti.PorcdopM;
} //  para sumar recorrido operaciones mercado
    if (this.bvrdOperMrkt.operacionBvrdMrkt[0] !== undefined) {
      for (const bvrdOperM of this.bvrdOperMrkt.operacionBvrdMrkt[0].CadJson) {
        if (bvrdOperM.codisin === this.estadisticas.isinsel ||
          this.estadisticas.isinsel === '') {
          if (bvrdOperM.nombre_mercado.substr(0, 4) === 'Prog') {
            this.estadisticas.canti.MarketMM += 1;
          } else {
          this.estadisticas.canti.OperacionesM += 1;
        }

          this.estadisticas.posi = this.indexMovimientos(
            this.estadisticas.Movi, bvrdOperM.codisin, 'C');
          if (this.estadisticas.posi >= 0) {
            this.estadisticas.Movi[this.estadisticas.posi].UltPrecio =
              bvrdOperM.precio_limpio;
            this.estadisticas.Movi[this.estadisticas.posi].UltNom =
              bvrdOperM.monto_nominal_total;
            this.estadisticas.Movi[this.estadisticas.posi].NomOper +=
              bvrdOperM.monto_nominal_total;
            this.estadisticas.Movi[this.estadisticas.posi].PrecioProm +=
              bvrdOperM.precio_limpio * bvrdOperM.monto_nominal_total;
            this.estadisticas.posi = this.indexMovimientos(
              this.estadisticas.Movi,
              bvrdOperM.codisin,
              'V'
            );
            if (this.estadisticas.posi >= 0) {
              this.estadisticas.Movi[this.estadisticas.posi].UltPrecio =
                bvrdOperM.precio_limpio;
              this.estadisticas.Movi[this.estadisticas.posi].UltNom =
                bvrdOperM.monto_nominal_total;
              this.estadisticas.Movi[this.estadisticas.posi].NomOper +=
                bvrdOperM.monto_nominal_total;
              this.estadisticas.Movi[this.estadisticas.posi].PrecioProm +=
                bvrdOperM.precio_limpio * bvrdOperM.monto_nominal_total;
            }
          }
        }
      }
    }

    // recorrido  posturas propias
    if (this.bvrdPsot.posturasPropias[0] !== undefined) {
      for (const bvrdPJson of this.bvrdPsot.posturasPropias[0].CadJson) {
        if (bvrdPJson.estatus_orden !== 'Cancelada') {
          if (
            bvrdPJson.moneda === this.estadisticas.monsel ||
            this.estadisticas.monsel === ''
          ) {
            if (
              bvrdPJson.codisin === this.estadisticas.isinsel ||
              this.estadisticas.isinsel === ''
            ) {
              this.estadisticas.canti.PosturasP =
                this.estadisticas.canti.PosturasP + 1;
            }
          }
          if (bvrdPJson.estatus_orden === 'Calzada') {
            if (
              bvrdPJson.moneda === this.estadisticas.monsel ||
              this.estadisticas.monsel === ''
            ) {
              if (
                bvrdPJson.codisin === this.estadisticas.isinsel ||
                this.estadisticas.isinsel === ''
              ) {
                if (bvrdPJson.codigo_rueda === 'LICI') {
                  this.estadisticas.canti.PrimarioP =
                    this.estadisticas.canti.PrimarioP + 1;
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
      if (mov.c_v === 'C') {
        this.estadisticas.posi = this.indexMovimientos(
          this.estadisticas.Movi,
          mov.Isin,
          'C'
        );
        if (this.estadisticas.posi >= 0) {
          if (
            mov.MontoP > this.estadisticas.Movi[this.estadisticas.posi].MontoP
          ) {
            mov.MontoReal = this.estadisticas.Movi[this.estadisticas.posi].MontoP;
            mov.NominalReal = this.estadisticas.Movi[this.estadisticas.posi].NominalP;
            this.estadisticas.Movi[this.estadisticas.posi].MontoReal = this.estadisticas.Movi[this.estadisticas.posi].MontoP;
            this.estadisticas.Movi[this.estadisticas.posi].NominalReal = this.estadisticas.Movi[this.estadisticas.posi].NominalP;
            mov.PrecioProm = this.estadisticas.Movi[this.estadisticas.posi].PrecioProm;
          } else {
            mov.MontoReal = mov.MontoP;
            mov.NominalReal = mov.NominalP;
            this.estadisticas.Movi[this.estadisticas.posi].MontoReal = mov.MontoP;
            this.estadisticas.Movi[this.estadisticas.posi].NominalReal = mov.NominalP;
            this.estadisticas.Movi[this.estadisticas.posi].PrecioProm = mov.PrecioProm;
          }
        }
      }
    }

    for (const mov of this.estadisticas.Movi) {
      if (
        mov.Moneda === 'USD' &&
        mov.MontoReal > this.estadisticas.MastranMtoUSD &&
        mov.c_v === 'C'
      ) {
        this.estadisticas.MastranMtoUSD = mov.MontoReal;
        this.estadisticas.MastransadaUSD = mov.Cotitulo;
      }
      if (
        mov.Moneda === 'DOP' &&
        mov.MontoReal > this.estadisticas.MastranMtoDOP &&
        mov.c_v === 'C'
      ) {
        this.estadisticas.MastranMtoDOP = mov.MontoReal;
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

    // this.visibleMovi = true;
  }
}
