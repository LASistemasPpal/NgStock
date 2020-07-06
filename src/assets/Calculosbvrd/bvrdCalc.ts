import { jsbvrdPosturasP, jsbvrdPosturasSiopel, jsbvrdOperacionesP } from './bvrdData';
import { BvrdPosturaP, IbvrdPostura, BvrdPosturaM, BvrdOpers, IbvrdOper, CadJsons } from './bvrdClass';

let bvrdPsot: BvrdPosturaP[] = [];
let bvrdPMkrt: BvrdPosturaM[] = [];
let bvrdOper: BvrdOpers[] = [];

// leo los json

// for (const bvrdP of jsbvrdPosturasP as IbvrdPostura[]) {
//   bvrdPsot.push(new BvrdPosturaP(bvrdP));
// }
// for (const bvrdM of jsbvrdPosturasSiopel as IbvrdPostura[]) {
//   bvrdPMkrt.push(new BvrdPosturaM(bvrdM));
// }
// for (const OperP of jsbvrdOperacionesP as IbvrdOper[]) {
//   bvrdOper.push(new BvrdOpers(OperP));
// }

bvrdPsot = jsbvrdPosturasP.CadJsons;
bvrdPMkrt = jsbvrdPosturasSiopel.CadJsons;
bvrdOper = jsbvrdOperacionesP.CadJson;

class Cantidades {
  PosturasP: number;
  PosturasM: number;
  PrimarioP: number;
  PrimarioM: number;
  MarketMP: number;
  MarketMM: number;
  OperacionesP: number;
  OperacionesM: number;
  MtodopM: number;
  MtousdM: number;
  MtototM: number;

  constructor(Cant: Cantidades) {
    this.PosturasP = Cant.PosturasP;
    this.PosturasM = Cant.PosturasM;
    this.PrimarioP = Cant.PrimarioP;
    this.PrimarioM = Cant.PrimarioM;
    this.MarketMP = Cant.MarketMP;
    this.MarketMM = Cant.MarketMM;
    this.OperacionesP = Cant.OperacionesP;
    this.OperacionesM = Cant.OperacionesM;
    this.MtodopM = Cant.MtodopM;
    this.MtousdM = Cant.MtousdM;
    this.MtototM = Cant.MtototM;
  }
}

class Movimientos {
  Moneda: string;
  Monto: number;
  Cotitulo: string;
  Isin: string;
  Cant: number;
  c_v: string;

  constructor(Mov: Movimientos) {
    this.Moneda = Mov.Moneda;
    this.Monto = Mov.Monto;
    this.Cotitulo = Mov.Cotitulo;
    this.Isin = Mov.Isin;
    this.Cant = Mov.Cant;
    this.c_v = Mov.c_v;
  }
}

function limpiarMovimientos(Mov: Movimientos[], hasta: number) {
  for (let tam = Mov.length; tam > hasta; ) {
    Mov.pop();
    tam = Mov.length;
  }
}
function indexMovimientos(Mov: Movimientos[], isinn: string, C_V: string) {
  let j = -1;
  for (let i = 0; i < Mov.length; i++) {
    if (Mov[i].Isin === isinn && Mov[i].c_v === C_V) {
      j = i;
    }
  }
  return j;
}

class Graficos {
  x: Date;
  y: number;
  constructor(Graf: Graficos) {
    this.x = Graf.x;
    this.y = Graf.y;
  }
}

const GrafPrecioP: Graficos[] = [];
const GrafPrecioM: Graficos[] = [];
const GrafPrecioOper: Graficos[] = [];
const GrafVolumenP: Graficos[] = [];
const GrafVolumenM: Graficos[] = [];
const GrafVolumenOper: Graficos[] = [];
const Movi: Movimientos[] = [];
const emisiones: string[] = [];

let MinGrafPrecio: number;
let MaxGrafPrecio: number;
let MinGrafVolumen: number;
let MaxGrafVolumen: number;
let MastransadaDOP = '';
let MastransadaUSD = '';
let MastranMtoDOP: number;
let MastranMtoUSD: number;

const canti: Cantidades = new Cantidades({
  PosturasM: 132,
  PosturasP: 44,
  PrimarioM: 77,
  PrimarioP: 0,
  MarketMM: 16,
  MarketMP: 4,
  OperacionesM: 98,
  OperacionesP: 24,
  MtodopM: 46.53,
  MtousdM: 35.2,
  MtototM: 62.4
});

// emisiones.push("PAR027");
// emisiones.push("AFI034");

const isin = 'DO1002220627';
let posi: number;

canti.MarketMM = 0;
canti.MarketMP = 0;
canti.PosturasM = 0;
canti.PosturasP = 0;
canti.PrimarioM = 0;
canti.PrimarioP = 0;
canti.OperacionesM = 0;
canti.OperacionesP = 0;
canti.MtodopM = 0;
canti.MtousdM = 0;
canti.MtototM = 0;

// recorrido  propio
for (const bvrdPJson of bvrdPsot[0].CadJson) {
  if (bvrdPJson.Estatus !== 'Cancelada') {
    canti.PosturasP = canti .PosturasP + 1;
    if (bvrdPJson.ISIN === isin) {
      GrafPrecioP.push({ x: new Date(bvrdPJson.HoraPostura), y: bvrdPJson.Precio });
      GrafVolumenP.push({ x: new Date(bvrdPJson.HoraPostura), y: bvrdPJson.ValorNominalPesos + bvrdPJson.ValorNominalDolares });
    }
    if (bvrdPJson.Estatus === 'Calzada') {
      canti.OperacionesP = canti .OperacionesP + 1;
    }
  }
}

for (const bvrdOp of bvrdOper[0].CadJson) {
  if (bvrdOp.NombreMercado.substr(0, 4) === 'Prim') {
    canti.PrimarioP = canti.PrimarioP + 1;
  }
  if (bvrdOp.NombreMercado.substr(0, 4) === 'Crea') {
    canti.MarketMP = canti.MarketMP + 1;
  }
}

limpiarMovimientos(Movi, 0);
// recorrido  mercado
for (const bvrdMJson of bvrdPMkrt[0].CadJson) {
  if (bvrdMJson.Estatus !== 'Cancelada') {

    canti.PosturasM = canti .PosturasM + 1;
    //  primario y market makers
    canti.MtodopM = canti.MtodopM + bvrdMJson.ValorTransadoPesos;
    canti.MtousdM = canti.MtousdM + bvrdMJson.ValorTransadoDolares;
    canti.MtototM = canti.MtototM + bvrdMJson.ValorTransadoDolares * 60 + bvrdMJson.ValorTransadoPesos;

    if (bvrdMJson.ISIN === isin) {
        GrafPrecioM.push({ x: new Date(bvrdMJson.HoraPostura), y: bvrdMJson.Precio });
        GrafVolumenM.push({ x: new Date(bvrdMJson.HoraPostura), y: bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares });
    } // seleccion por isin para graficos

    if (bvrdMJson.Estatus === 'Calzada') {
      canti.OperacionesM = canti .OperacionesM + 1;
      GrafPrecioOper.push({ x: new Date(bvrdMJson.HoraPostura), y: bvrdMJson.Precio });
      GrafVolumenOper.push({ x: new Date(bvrdMJson.HoraPostura), y: bvrdMJson.ValorNominalPesos + bvrdMJson.ValorNominalDolares });
    }
    if ( bvrdMJson.Estatus !== 'Vigente' ) {      //  vigente cancelada y calzada
     posi = indexMovimientos(Movi, bvrdMJson.ISIN, bvrdMJson.PosicionCompraVenta);
     if (posi < 0) {
       if (bvrdMJson.ValorTransadoDolares > 0) {
         Movi.push({
           Moneda: 'USD',
           Monto: bvrdMJson.ValorTransadoDolares,
           Cotitulo: bvrdMJson.ISIN,
           Isin: bvrdMJson.ISIN,
           Cant: 1,
           c_v: bvrdMJson.PosicionCompraVenta
         });

       } else {
         Movi.push({
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
       Movi[posi].Cant += 1;
       if (bvrdMJson.ValorTransadoDolares > 0) {
         Movi[posi].Monto += bvrdMJson.ValorTransadoDolares;
       } else {
         Movi[posi].Monto += bvrdMJson.ValorTransadoPesos;
       }
     }
     if (emisiones.indexOf(bvrdMJson.ISIN) < 0) {
       emisiones.push(bvrdMJson.ISIN);
     }  // meto las emisiones
   } // si no esta vencida
 } //  no ERROR
}  // lectura de posturas

MastranMtoDOP = 0;
MastranMtoUSD = 0;

for (let i = 0; i < Movi.length; i++ ) {
  if (Movi[i].Moneda === 'USD' && Movi[i].Monto > MastranMtoUSD ) {
    MastranMtoUSD = Movi[i].Monto;
    MastransadaUSD = Movi[i].Cotitulo;
  }
  if (Movi[i].Moneda === 'DOP' && Movi[i].Monto > MastranMtoDOP ) {
    MastranMtoDOP = Movi[i].Monto;
    MastransadaDOP = Movi[i].Cotitulo;
  }
}

MinGrafPrecio = 20000;
MaxGrafPrecio = 1;
MinGrafVolumen = 1000000000000;
MaxGrafVolumen = 0;
// GrafPrecioP.push({ Hora: 10.15, EjeY: 102.5975 });
// GrafPrecioP.push({ Hora: 11.3, EjeY: 102.58 });
for (let i = 0; i < GrafPrecioP.length; i++) {
  if (GrafPrecioP[i].y < MinGrafPrecio) {
    MinGrafPrecio = GrafPrecioP[i].y;
  }
  if (GrafPrecioP[i].y > MaxGrafPrecio) {
    MaxGrafPrecio = GrafPrecioP[i].y;
  }
}

// GrafVolumenP.push({ Hora: 12.15, EjeY: 1030000.5 });
// GrafVolumenP.push({ Hora: 12.3, EjeY: 3000.5 });
for (let i = 0; i < GrafVolumenP.length; i++) {
  if (GrafVolumenP[i].y < MinGrafVolumen) {
    MinGrafVolumen = GrafVolumenP[i].y;
  }
  if (GrafVolumenP[i].y > MaxGrafVolumen) {
    MaxGrafVolumen = GrafVolumenP[i].y;
  }
}

console.log('Emisiones ' + emisiones);
// console.log(canti);

// console.table(bvrdPsot[0].CadJson);;
console.log('Grafico Precios ' + isin);
console.table(GrafPrecioP);
console.log('Min/Max Vol ' + MinGrafVolumen + ' ' + MaxGrafVolumen);
console.log('Min/Max Pre  ' + MinGrafPrecio + ' ' + MaxGrafPrecio);

console.table(Movi);
console.log('USD ' + MastransadaUSD + '  ' + MastranMtoUSD);
console.log('DOP ' + MastransadaDOP + '  ' + MastranMtoDOP);
console.table(canti);


// console.table(bvrdOper[0].CadJson);
