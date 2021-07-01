interface ICadJsonPosturas{
  codigo_rueda: string;
  codisin: string;
  compra_venta: string;
  duracion_rueda: string;
  estatus_orden: string;
  fecha_hora_postura: string;
  fecha_liquidacion: string;
  fecha_postura: string;
  hora_modificacion: string;
  hora_postura: string;
  moneda: string;
  monto_nominal: number;
  monto_nominal_dolares: number;
  monto_nominal_pesos: number;
  monto_transado: number;
  monto_transado_dolares: number;
  monto_transado_pesos: number;
  nemotecnico: string;
  nominal_unitario: number;
  //NroOperacionVinculada: string;
  //OrdenesEnFirmeID: string;
  numero_operacion_id: number;
  plazo_liquidacion: number;
 // PosicionCompraVenta: string;
  precio_limpio: number;
  rendimiento: number;
  tasa_cupon: number;

}

export class CadJsons implements ICadJsonPosturas{
  codigo_rueda: string;
  codisin: string;
  compra_venta: string;
  duracion_rueda: string;
  estatus_orden: string;
  fecha_hora_postura: string;
  fecha_liquidacion: string;
  fecha_postura: string;
  hora_modificacion: string;
  hora_postura: string;
  moneda: string;
  monto_nominal: number;
  monto_nominal_dolares: number;
  monto_nominal_pesos: number;
  monto_transado: number;
  monto_transado_dolares: number;
  monto_transado_pesos: number;
  nemotecnico: string;
  nominal_unitario: number;
  //NroOperacionVinculada: string;
  //OrdenesEnFirmeID: string;
  numero_operacion_id: number;
  plazo_liquidacion: number;
 // PosicionCompraVenta: string;
  precio_limpio: number;
  rendimiento: number;
  tasa_cupon: number;
constructor(CadJ: ICadJsonPosturas){
        this.codigo_rueda = CadJ.codigo_rueda;
        this.duracion_rueda = CadJ.duracion_rueda;
        this.estatus_orden = CadJ.estatus_orden;
        this.fecha_liquidacion = CadJ.fecha_liquidacion;
        this.fecha_postura = CadJ.fecha_postura;
        this.fecha_hora_postura = CadJ.fecha_hora_postura;
        this.fecha_postura = CadJ.fecha_postura;
        this.hora_modificacion =  CadJ.hora_modificacion;
        this.codisin = CadJ.codisin;
        this.moneda = CadJ.moneda;
        this.nemotecnico =  CadJ.nemotecnico;
        this.monto_nominal =  CadJ.monto_nominal;
        this.monto_transado =  CadJ.monto_transado;
        this.nominal_unitario =  CadJ.nominal_unitario;
      //  this.NroOperacionVinculada =  CadJ.NroOperacionVinculada;
//        this.OrdenesEnFirmeID =  CadJ.OrdenesEnFirmeID;
        this.plazo_liquidacion =  CadJ.plazo_liquidacion;
        this.compra_venta =  CadJ.compra_venta;
        this.precio_limpio =  CadJ.precio_limpio;
        this.rendimiento =  CadJ.rendimiento;
        this.numero_operacion_id =  CadJ.numero_operacion_id;
        this.tasa_cupon =  CadJ.tasa_cupon;
        this.monto_nominal_dolares =  CadJ.monto_nominal_dolares;
        this.monto_nominal_pesos =  CadJ.monto_nominal_pesos;
        this.monto_transado_dolares =  CadJ.monto_transado_dolares;
        this.monto_transado_pesos =  CadJ.monto_transado_pesos;
        }
}

export interface IbvrdPostura{
    Status: number;
    Mensaje: string;
    CadJson: CadJsons[];
}

export class BvrdPosturaP implements IbvrdPostura{
    Status: number;
    Mensaje: string;
    CadJson: CadJsons[];
    constructor(bvrdPosturaP: IbvrdPostura){
        this.Status = bvrdPosturaP.Status;
        this.Mensaje = bvrdPosturaP.Mensaje;
        this.CadJson = [];
        for (const cadJ of bvrdPosturaP.CadJson){
            this.CadJson.push(new CadJsons(cadJ));
        }
    }
}

export class BvrdPosturaM implements IbvrdPostura{
    Status: number;
    Mensaje: string;
    CadJson: CadJsons[];
    constructor(bvrdPosturaM: IbvrdPostura){
        this.Status = bvrdPosturaM.Status;
        this.Mensaje = bvrdPosturaM.Mensaje;
        this.CadJson = [];
        for (const cadJ of bvrdPosturaM.CadJson){
            this.CadJson.push(new CadJsons(cadJ));
        }
    }
}

interface ICadJsonOper {
  cantidad_titulos: number;
  // CodEmisorBVRD: string;
  codisin: string;
  descripcion_instrumento: string;
  // ComisionComprador: number;
  // ComisionVendedor: number;
  dias_al_vencimiento: number;
  emisor: string;
  estatus: string;
  fecha_emision: Date;
  fecha_liquidacion: Date;
  fecha_operacion: string;
  fecha_vencimiento: Date;
  hora_operacion: string;
  mercado: number;
  moneda_transada: string;
  monto_nominal_total: number;
  monto_nominal_equivalente_dolares: number;
  monto_nominal_equivalente_pesos: number;
  monto_transado: number;
  monto_transado_equivalente_dolares: number;
  monto_transado_equivalente_pesos: number;
  nemotecnico: string;
  nombre_mercado: string;
  numero_oferta_compra: number;
  numero_oferta_venta: number;
  numero_operacion: number;
  precio_limpio: number;
  //TasaCompra: number;
  puesto_comprador: string;
  puesto_vendedor: string;
  rendimiento: number;
  tasa_cupon: number;
  tasa_venta_dolar: number;
  tipo_mercado: string;
}

export class CadJsonOpers implements ICadJsonOper {
  cantidad_titulos: number;
  codisin: string;
  descripcion_instrumento: string;
  dias_al_vencimiento: number;
  emisor: string;
  estatus: string;
  fecha_emision: Date;
  fecha_liquidacion: Date;
  fecha_operacion: string;
  fecha_vencimiento: Date;
  hora_operacion: string;

  mercado: number;
  moneda_transada: string;
  monto_nominal_total: number;
  monto_nominal_equivalente_dolares: number;
  monto_nominal_equivalente_pesos: number;
  monto_transado: number;
  monto_transado_equivalente_dolares: number;
  monto_transado_equivalente_pesos: number;
  nemotecnico: string;
  nombre_mercado: string;
  numero_oferta_compra: number;
  numero_oferta_venta: number;
  numero_operacion: number;
  precio_limpio: number;
  //TasaCompra: number;
  puesto_comprador: string;
  puesto_vendedor: string;
  rendimiento: number;
  tasa_cupon: number;
  tasa_venta_dolar: number;
  tipo_mercado: string;
  constructor(CadJOper: CadJsonOpers) {
    this.cantidad_titulos = CadJOper.cantidad_titulos;
    this.codisin = CadJOper.codisin;
    this.descripcion_instrumento = CadJOper.descripcion_instrumento;
    this.dias_al_vencimiento = CadJOper.dias_al_vencimiento;
    this.emisor = CadJOper.emisor;
    this.estatus = CadJOper.estatus;
    this.fecha_emision = CadJOper.fecha_emision;
    this.fecha_liquidacion = CadJOper.fecha_liquidacion;
    this.fecha_operacion = CadJOper.fecha_operacion;
    this.fecha_vencimiento = CadJOper.fecha_vencimiento;
    this.hora_operacion = CadJOper.hora_operacion;

    this.mercado = CadJOper.mercado;
    this.moneda_transada = CadJOper.moneda_transada;
    this.nemotecnico = CadJOper.nemotecnico;
    this.nombre_mercado = CadJOper.nombre_mercado;
    this.numero_oferta_compra = CadJOper.numero_oferta_compra;
    this.numero_oferta_venta = CadJOper.numero_oferta_venta;
    this.numero_operacion = CadJOper.numero_operacion;
    this.precio_limpio = CadJOper.precio_limpio;
    this.puesto_comprador = CadJOper.puesto_comprador;
    this.puesto_vendedor = CadJOper.puesto_vendedor;
    // this.TasaCompra = CadJOper.TasaCompra;
    this.tasa_cupon = CadJOper.tasa_cupon;
    this.tasa_venta_dolar = CadJOper.tasa_venta_dolar;
    this.tipo_mercado = CadJOper.tipo_mercado;
    this.rendimiento = CadJOper.rendimiento;
    //   this.ValorNominalDolares = CadJOper.ValorNominalDolares;
    this.monto_nominal_equivalente_dolares =
      CadJOper.monto_nominal_equivalente_dolares;
    this.monto_nominal_equivalente_pesos =
      CadJOper.monto_nominal_equivalente_pesos;
    //   this.ValorNominalPesos = CadJOper.ValorNominalPesos;
    this.monto_nominal_total = CadJOper.monto_nominal_total;
    this.monto_transado = CadJOper.monto_transado;
    //    this.ValorTransadoDolares = CadJOper.ValorTransadoDolares;
    this.monto_transado_equivalente_dolares =
      CadJOper.monto_transado_equivalente_dolares;
    this.monto_transado_equivalente_pesos =
      CadJOper.monto_transado_equivalente_pesos;
    //     this.ValorTransadoPesos = CadJOper.ValorTransadoPesos;
    //        this.Yield = CadJOper.Yield;
  }

  get aux_hora_operacion(): string {
    if (this.hora_operacion.length > 10) {
      return this.hora_operacion.substr(11, 5);
    } else {
      return this.hora_operacion.substr(0, 5);
    }
  }
}

export interface IbvrdOper{
    Status: number;
    Mensaje: string;
    CadJson: CadJsonOpers[];
}

export class BvrdOpers implements IbvrdOper{
    Status: number;
    Mensaje: string;
    CadJson: CadJsonOpers[];
    constructor(bvrdOper: IbvrdOper){
        this.Status = bvrdOper.Status;
        this.Mensaje = bvrdOper.Mensaje;
        this.CadJson = [];
        for (const cadJ of bvrdOper.CadJson){
            this.CadJson.push(new CadJsonOpers(cadJ));
        }
    }
}


interface ICadJsonOperMrkt{
  cantidad_titulos: number;
 // CodEmisorBVRD: string;
  codisin: string;
  descripcion_instrumento: string;
  // ComisionComprador: number;
  // ComisionVendedor: number;
   dias_al_vencimiento: number;
   emisor: string;
   estatus: string;
   fecha_emision: Date;
   fecha_liquidacion: Date;
   fecha_operacion: string;
   fecha_vencimiento: Date;
   hora_operacion: string;

  mercado: number;
  moneda_transada: string;
  nemotecnico: string;
  nombre_mercado: string;
  numero_oferta_compra: number;
  numero_oferta_venta: number;
  numero_operacion: number;
  precio_limpio: number;
  //TasaCompra: number;
  puesto_comprador: string;
  puesto_vendedor: string;
  rendimiento: number;
  tasa_cupon: number;
  tasa_venta_dolar: number;
  tipo_mercado: string;

  monto_nominal_total: number;
  monto_nominal_equivalente_dolares: number;
  monto_nominal_equivalente_pesos: number;
//    ValorNominalPesos: number;
  //ValorNominalTotal: number;
  monto_transado: number;
//    ValorTransadoDolares: number;
  monto_transado_equivalente_dolares: number;
  monto_transado_equivalente_pesos: number;
//  ValorTransadoPesos: number;
//Yield: number;
}

export class CadJsonOperMrkts implements ICadJsonOperMrkt{
  cantidad_titulos: number;
  // CodEmisorBVRD: string;
  codisin: string;
  descripcion_instrumento: string;
  //ComisionComprador: number;
  //ComisionVendedor: number;
  dias_al_vencimiento: number;
  emisor: string;
  estatus: string;
  fecha_emision: Date;
  fecha_liquidacion: Date;
  fecha_operacion: string;
  fecha_vencimiento: Date;
  hora_operacion: string;
  mercado: number;
  moneda_transada: string;
  nemotecnico: string;
  nombre_mercado: string;
  numero_oferta_compra: number;
  numero_oferta_venta: number;
  numero_operacion: number;
  precio_limpio: number;
  //TasaCompra: number;
  puesto_comprador: string;
  puesto_vendedor: string;
  rendimiento: number;
  tasa_cupon: number;
  tasa_venta_dolar: number;
  tipo_mercado: string;

  monto_nominal_total: number;
    monto_nominal_equivalente_dolares: number;
    monto_nominal_equivalente_pesos: number;
//    ValorNominalPesos: number;
    //ValorNominalTotal: number;
    monto_transado: number;
//    ValorTransadoDolares: number;
    monto_transado_equivalente_dolares: number;
    monto_transado_equivalente_pesos: number;
  //  ValorTransadoPesos: number;
   // Yield: number;
  constructor(CadJOperMrkt: CadJsonOperMrkts){
      this.cantidad_titulos = CadJOperMrkt.cantidad_titulos;
    //  this.CodEmisorBVRD = CadJOperMrkt.CodEmisorBVRD;
      this.codisin = CadJOperMrkt.codisin;
      this.descripcion_instrumento = CadJOperMrkt.descripcion_instrumento;
      this.dias_al_vencimiento = CadJOperMrkt.dias_al_vencimiento;
      this.emisor = CadJOperMrkt.emisor;
         this.estatus = CadJOperMrkt.estatus;
         this.fecha_emision = CadJOperMrkt.fecha_emision;
         this.fecha_liquidacion = CadJOperMrkt.fecha_liquidacion;
         this.fecha_operacion = CadJOperMrkt.fecha_operacion;
         this.fecha_vencimiento = CadJOperMrkt.fecha_vencimiento;
         this.hora_operacion = CadJOperMrkt.hora_operacion;
         this.mercado = CadJOperMrkt.mercado;
         this.moneda_transada = CadJOperMrkt.moneda_transada;
         this.nemotecnico = CadJOperMrkt.nemotecnico;
         this.nombre_mercado = CadJOperMrkt.nombre_mercado;
         this.numero_oferta_compra = CadJOperMrkt.numero_oferta_compra;
         this.numero_oferta_venta = CadJOperMrkt.numero_oferta_venta;
         this.numero_operacion = CadJOperMrkt.numero_operacion;
         this.precio_limpio = CadJOperMrkt.precio_limpio;
         this.puesto_comprador = CadJOperMrkt.puesto_comprador;
         this.puesto_vendedor = CadJOperMrkt.puesto_vendedor;
         // this.TasaCompra = CadJOper.TasaCompra;
         this.tasa_cupon = CadJOperMrkt.tasa_cupon;
         this.tasa_venta_dolar = CadJOperMrkt.tasa_venta_dolar;
         this.tipo_mercado = CadJOperMrkt.tipo_mercado;
         this.rendimiento = CadJOperMrkt.rendimiento;
     //   this.ValorNominalDolares = CadJOper.ValorNominalDolares;
     this.monto_nominal_equivalente_dolares = CadJOperMrkt.monto_nominal_equivalente_dolares;
     this.monto_nominal_equivalente_pesos = CadJOperMrkt.monto_nominal_equivalente_pesos;
  //   this.ValorNominalPesos = CadJOper.ValorNominalPesos;
     this.monto_nominal_total = CadJOperMrkt.monto_nominal_total;
     this.monto_transado = CadJOperMrkt.monto_transado;
 //    this.ValorTransadoDolares = CadJOper.ValorTransadoDolares;
     this.monto_transado_equivalente_dolares = CadJOperMrkt.monto_transado_equivalente_dolares;
     this.monto_transado_equivalente_pesos = CadJOperMrkt.monto_transado_equivalente_pesos;
//     this.ValorTransadoPesos = CadJOper.ValorTransadoPesos;
  //    this.Yield = CadJOperMrkt.Yield;
      }

  get aux_hora_operacion(): string {
    if (this.hora_operacion.length > 10) {
      return this.hora_operacion.substr(11, 5);
    } else {
      return this.hora_operacion.substr(0, 5);
    }
  }
}

export interface IbvrdOperMrkt{
  Status: number;
  Mensaje: string;
  CadJson: CadJsonOperMrkts[];
}

export class BvrdOperMrkts implements IbvrdOperMrkt{
  Status: number;
  Mensaje: string;
  CadJson: CadJsonOperMrkts[];
  constructor(bvrdOperMrkt: IbvrdOperMrkt){
      this.Status = bvrdOperMrkt.Status;
      this.Mensaje = bvrdOperMrkt.Mensaje;
      this.CadJson = [];
      for (const cadJ of bvrdOperMrkt.CadJson){
          this.CadJson.push(new CadJsonOperMrkts(cadJ));
      }
  }
}


export class Cantidades {
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
    PorcdopM: number;
    PorcusdM: number;
    PorctotM: number;

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
      this.PorcdopM = Cant.PorcdopM;
      this.PorcusdM = Cant.PorcusdM;
      this.PorctotM = Cant.PorctotM;
    }
  }

export class Movimientos {
    Moneda: string;
    Cotitulo: string;
    Isin: string;
    Cant: number;
    MontoP: number;
    NominalP: number;
    MontoReal: number;
    NominalReal: number;
    PrecioC: number;
    PrecioV: number;
    UltPrecio: number;
    PrecioProm: number;
    UltNom: number;
    NomOper: number;
    // tslint:disable-next-line: variable-name
    c_v: string;
    constructor(Mov: Movimientos) {
      this.Moneda = Mov.Moneda;
      this.MontoP = Mov.MontoP;
      this.NominalP = Mov.NominalP;
      this.MontoReal = Mov.MontoReal;
      this.NominalReal = Mov.NominalReal;
      this.Cotitulo = Mov.Cotitulo;
      this.Isin = Mov.Isin;
      this.Cant = Mov.Cant;
      this.PrecioC = Mov.PrecioC;
      this.PrecioV = Mov.PrecioV;
      this.c_v = Mov.c_v;
      this.UltPrecio = Mov.UltPrecio;
      this.PrecioProm = Mov.PrecioProm;
      this.UltNom = Mov.UltNom;
      this.NomOper = Mov.NomOper;
    }
  }

export class Graficos {
    x: Date;
    y: number;
    constructor() {
      this.x = new Date();
      this.y = 0;
    }
    // constructor(Graf: Graficos) {
    //   this.x = Graf.x;
    //   this.y = Graf.y;
    // }
  }

export class Estadisticas{
    GrafPrecioM: Graficos[] = [];
    GrafPrecioOper: Graficos[] = [];
    GrafVolumenM: Graficos[] = [];
    GrafVolumenOper: Graficos[] = [];
    MinGrafPrecio: number;
    MaxGrafPrecio: number;
    MinGrafVolumen: number;
    MaxGrafVolumen: number;
    Movi: Movimientos[] = [];
    Emisiones: string[] = [];
    MastransadaDOP = '';
    MastransadaUSD = '';
    MastranMtoDOP: number;
    MastranMtoUSD: number;
    isinsel: string;
    monsel: string;
    posi: number;
    tpcambio: number;
    hoy: string;
    canti: Cantidades = new Cantidades({
      PosturasM: 0,
      PosturasP: 0,
      PrimarioM: 0,
      PrimarioP: 0,
      MarketMM: 0,
      MarketMP: 0,
      OperacionesM: 0,
      OperacionesP: 0,
      MtodopM: 0,
      MtousdM: 0,
      MtototM: 0,
      PorcdopM: 0,
      PorcusdM: 0,
      PorctotM: 0
    });

    constructor() {}
}

export class RiesgoLiquidez {
  codigoisin: string;
  margen: number;
  nemotecnico: string;
  precioppcompra: number;
  precioppventa: number;
  recorteregulatorio: number;

  constructor() {
    this.codigoisin         = '';
    this.margen             = 0;
    this.nemotecnico        = '';
    this.precioppcompra     = 0;
    this.precioppventa      = 0;
    this.recorteregulatorio = 0;
  }
}
