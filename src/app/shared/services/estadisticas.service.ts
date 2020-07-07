import { Estadisticas, Movimientos } from '../classes/bvrdClass';
import { DamePosturasP, DamePosturasM, DameOperaciones } from './data-bvrd.service';
import { Injectable } from '@angular/core';

@Injectable()
export class CalculosRD{
    estadisticas: Estadisticas = new Estadisticas();

    constructor(
        private bvrdPsot: DamePosturasP,
        private bvrdPMkrt: DamePosturasM,
        private bvrdOper: DameOperaciones ){ }

    limpiarMovimientos(Mov: Movimientos[], hasta: number) {
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

    calcular() {
        this.estadisticas.isin = 'DO1002220627';
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
        // recorrido  propio
        for (const bvrdPJson of this.bvrdPsot.posturasPropias[0].CadJson) {
        if (bvrdPJson.Estatus !== 'Cancelada') {
            this.estadisticas.canti.PosturasP = this.estadisticas.canti.PosturasP + 1;
            if (bvrdPJson.ISIN === this.estadisticas.isin) {
            this.estadisticas.GrafPrecioP.push({ Hora: new Date(bvrdPJson.HoraPostura), EjeY: bvrdPJson.Precio });
            // tslint:disable-next-line: max-line-length
            this.estadisticas.GrafVolumenP.push({ Hora: new Date(bvrdPJson.HoraPostura), EjeY: bvrdPJson.ValorNominalPesos + bvrdPJson.ValorNominalDolares });
            }
            if (bvrdPJson.Estatus === 'Calzada') {
                this.estadisticas.canti.OperacionesP = this.estadisticas.canti .OperacionesP + 1;
            }
        }
        }

        for (const bvrdOp of this.bvrdOper.operacionBvrd[0].CadJson) {
        if (bvrdOp.NombreMercado.substr(0, 4) === 'Prim') {
            this.estadisticas.canti.PrimarioP = this.estadisticas.canti.PrimarioP + 1;
        }
        if (bvrdOp.NombreMercado.substr(0, 4) === 'Crea') {
            this.estadisticas.canti.MarketMP = this.estadisticas.canti.MarketMP + 1;
        }
        }

        this.limpiarMovimientos(this.estadisticas.Movi, 0);
        // recorrido  mercado
        for (const bvrdMJson of this.bvrdPMkrt.posturasSiopel[0].CadJson) {
        if (bvrdMJson.Estatus !== 'Cancelada') {

            this.estadisticas.canti.PosturasM = this.estadisticas.canti.PosturasM + 1;
            //  primario y market makers
            this.estadisticas.canti.MtodopM = this.estadisticas.canti.MtodopM + bvrdMJson.ValorTransadoPesos;
            this.estadisticas.canti.MtousdM = this.estadisticas.canti.MtousdM + bvrdMJson.ValorTransadoDolares;
            this.estadisticas.canti.MtototM = this.estadisticas.canti.MtototM + bvrdMJson.ValorTransadoDolares *
                                                                                60 + bvrdMJson.ValorTransadoPesos;

            if (bvrdMJson.ISIN === this.estadisticas.isin) {
                this.estadisticas.GrafPrecioM.push({ Hora: new Date(bvrdMJson.HoraPostura), EjeY: bvrdMJson.Precio });
                // tslint:disable-next-line: max-line-length
                this.estadisticas.GrafVolumenM.push({ Hora: new Date(bvrdMJson.HoraPostura), EjeY: bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares });
            } // seleccion por isin para graficos

            if (bvrdMJson.Estatus === 'Calzada') {
            this.estadisticas.canti.OperacionesM = this.estadisticas.canti .OperacionesM + 1;
            this.estadisticas.GrafPrecioOper.push({ Hora: new Date(bvrdMJson.HoraPostura), EjeY: bvrdMJson.Precio });
            // tslint:disable-next-line: max-line-length
            this.estadisticas.GrafVolumenOper.push({ Hora: new Date(bvrdMJson.HoraPostura), EjeY: bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares });
            }
            if ( bvrdMJson.Estatus !== 'Vigente' ) {      //  vigente cancelada y calzada
            this.estadisticas.posi = this.indexMovimientos(this.estadisticas.Movi, bvrdMJson.ISIN, bvrdMJson.PosicionCompraVenta);
            if (this.estadisticas.posi < 0) {
            if (bvrdMJson.ValorTransadoDolares > 0) {
                this.estadisticas.Movi.push({
                Moneda: 'USD',
                Monto: bvrdMJson.ValorTransadoDolares,
                Cotitulo: bvrdMJson.ISIN,
                Isin: bvrdMJson.ISIN,
                Cant: 1,
                c_v: bvrdMJson.PosicionCompraVenta
                });
            } else {
                this.estadisticas.Movi.push({
                Moneda: 'DOP',
                Monto: bvrdMJson.ValorTransadoPesos,
                Cotitulo: bvrdMJson.ISIN,
                Isin: bvrdMJson.ISIN,
                Cant: 1,
                c_v: bvrdMJson.PosicionCompraVenta
                });
            }
            } //  si esta en Movi
            else {
            this.estadisticas.Movi[this.estadisticas.posi].Cant += 1;
            if (bvrdMJson.ValorTransadoDolares > 0) {
                this.estadisticas.Movi[this.estadisticas.posi].Monto += bvrdMJson.ValorTransadoDolares;
            } else {
                this.estadisticas.Movi[this.estadisticas.posi].Monto += bvrdMJson.ValorTransadoPesos;
            }
            }
            if (this.estadisticas.emisiones.indexOf(bvrdMJson.ISIN) < 0) {
                this.estadisticas.emisiones.push(bvrdMJson.ISIN);
            }  // meto las emisiones
        } // si no esta vencida
        } //  no ERROR
        }  // lectura de posturas

        this.estadisticas.MastranMtoDOP = 0;
        this.estadisticas.MastranMtoUSD = 0;
        for (const mov of this.estadisticas.Movi) {
        if (mov.Moneda === 'USD' && mov.Monto > this.estadisticas.MastranMtoUSD ) {
            this.estadisticas.MastranMtoUSD = mov.Monto;
            this.estadisticas.MastransadaUSD = mov.Cotitulo;
        }
        if (mov.Moneda === 'DOP' && mov.Monto > this.estadisticas.MastranMtoDOP ) {
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
        if (graf.EjeY < this.estadisticas.MinGrafPrecio) {
            this.estadisticas.MinGrafPrecio = graf.EjeY;
        }
        if (graf.EjeY > this.estadisticas.MaxGrafPrecio) {
            this.estadisticas.MaxGrafPrecio = graf.EjeY;
        }
        }

        // GrafVolumenP.push({ Hora: 12.15, EjeY: 1030000.5 });
        // GrafVolumenP.push({ Hora: 12.3, EjeY: 3000.5 });
        for (const graf of this.estadisticas.GrafVolumenP) {
        if (graf.EjeY < this.estadisticas.MinGrafVolumen) {
            this.estadisticas.MinGrafVolumen = graf.EjeY;
        }
        if (graf.EjeY > this.estadisticas.MaxGrafVolumen) {
            this.estadisticas.MaxGrafVolumen = graf.EjeY;
        }
        }
    }

}
