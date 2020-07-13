interface ICadJson{
    CODRUEDA: string;
    Duracion: string;
    Estatus: string;
    FechaLiquidacion: string;
    FechaPostura: string;
    HoraPostura: string;
    HoraUltimaModificacion: string;
    ISIN: string;
    MonedaLiquidacion: string;
    Nemotecnico: string;
    NominalUnitario: number;
    NroOperacionVinculada: string;
    OrdenesEnFirmeID: string;
    PlazoLiquidacion: number;
    PosicionCompraVenta: string;
    Precio: number;
    Rendimiento: number;
    Secuencia: number;
    TasaCupon: number;
    ValorNominalDolares: number;
    ValorNominalPesos: number;
    ValorTransadoDolares: number;
    ValorTransadoPesos: number;
}

export class CadJsons implements ICadJson{
    CODRUEDA: string;
    Duracion: string;
    Estatus: string;
    FechaLiquidacion: string;
    FechaPostura: string;
    HoraPostura: string;
    HoraUltimaModificacion: string;
    ISIN: string;
    MonedaLiquidacion: string;
    Nemotecnico: string;
    NominalUnitario: number;
    NroOperacionVinculada: string;
    OrdenesEnFirmeID: string;
    PlazoLiquidacion: number;
    PosicionCompraVenta: string;
    Precio: number;
    Rendimiento: number;
    Secuencia: number;
    TasaCupon: number;
    ValorNominalDolares: number;
    ValorNominalPesos: number;
    ValorTransadoDolares: number;
    ValorTransadoPesos: number;
    constructor(CadJ: ICadJson){
        this.CODRUEDA = CadJ.CODRUEDA;
        this.Duracion = CadJ.Duracion;
        this.Estatus = CadJ.Estatus;
        this.FechaLiquidacion = CadJ.FechaLiquidacion;
        this.FechaPostura = CadJ.FechaPostura;
        this.HoraPostura = CadJ.HoraPostura;
        this.HoraUltimaModificacion =  CadJ.HoraUltimaModificacion;
        this.ISIN = CadJ.ISIN;
        this.MonedaLiquidacion = CadJ.MonedaLiquidacion;
        this.Nemotecnico =  CadJ.Nemotecnico;
        this.NominalUnitario =  CadJ.NominalUnitario;
        this.NroOperacionVinculada =  CadJ.NroOperacionVinculada;
        this.OrdenesEnFirmeID =  CadJ.OrdenesEnFirmeID;
        this.PlazoLiquidacion =  CadJ.PlazoLiquidacion;
        this.PosicionCompraVenta =  CadJ.PosicionCompraVenta;
        this.Precio =  CadJ.Precio;
        this.Rendimiento =  CadJ.Rendimiento;
        this.Secuencia =  CadJ.Secuencia;
        this.TasaCupon =  CadJ.TasaCupon;
        this.ValorNominalDolares =  CadJ.ValorNominalDolares;
        this.ValorNominalPesos =  CadJ.ValorNominalPesos;
        this.ValorTransadoDolares =  CadJ.ValorTransadoDolares;
        this.ValorTransadoPesos =  CadJ.ValorTransadoPesos;
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

interface ICadJsonOper{
    CantidadTitulos: number;
    CodEmisorBVRD: string;
    CodigoISIN: string;
    ComisionComprador: number;
    ComisionVendedor: number;
    DiasVencimiento: number;
    Estatus: string;
    FechaEmision: Date;
    FechaLiquidacion: Date;
    FechaOperacion: string;
    FechaVencimiento: Date;
    HoraOperacion: Date;
    MonedaTransada: string;
    NemoTecnico: string;
    NombreMercado: string;
    NumeroOfertaCompra: number;
    NumeroOfertaVenta: number;
    NumeroOperacion: number;
    PrecioLimpio: number;
    PuestoComprador: string;
    PuestoVendedor: string;
    TasaCompra: number;
    TasaCupon: number;
    TasaVenta: number;
    TipoMercado: string;
    Tipodeinstrumento: string;
    ValorNominalDolares: number;
    ValorNominalEquivalenteDolares: number;
    ValorNominalEquivalentePesos: number;
    ValorNominalPesos: number;
    ValorNominalTotal: number;
    ValorTransado: number;
    ValorTransadoDolares: number;
    ValorTransadoEquivalenteDolares: number;
    ValorTransadoEquivalentePesos: number;
    ValorTransadoPesos: number;
    Yield: number;
}

export class CadJsonOpers implements ICadJsonOper{
    CantidadTitulos: number;
    CodEmisorBVRD: string;
    CodigoISIN: string;
    ComisionComprador: number;
    ComisionVendedor: number;
    DiasVencimiento: number;
    Estatus: string;
    FechaEmision: Date;
    FechaLiquidacion: Date;
    FechaOperacion: string;
    FechaVencimiento: Date;
    HoraOperacion: Date;
    MonedaTransada: string;
    NemoTecnico: string;
    NombreMercado: string;
    NumeroOfertaCompra: number;
    NumeroOfertaVenta: number;
    NumeroOperacion: number;
    PrecioLimpio: number;
    PuestoComprador: string;
    PuestoVendedor: string;
    TasaCompra: number;
    TasaCupon: number;
    TasaVenta: number;
    TipoMercado: string;
    Tipodeinstrumento: string;
    ValorNominalDolares: number;
    ValorNominalEquivalenteDolares: number;
    ValorNominalEquivalentePesos: number;
    ValorNominalPesos: number;
    ValorNominalTotal: number;
    ValorTransado: number;
    ValorTransadoDolares: number;
    ValorTransadoEquivalenteDolares: number;
    ValorTransadoEquivalentePesos: number;
    ValorTransadoPesos: number;
    Yield: number;
    constructor(CadJOper: CadJsonOpers){
        this.CantidadTitulos = CadJOper.CantidadTitulos;
        this.CodEmisorBVRD = CadJOper.CodEmisorBVRD;
        this.CodigoISIN = CadJOper.CodigoISIN;
        this.ComisionComprador = CadJOper.ComisionComprador;
        this.ComisionVendedor = CadJOper.ComisionVendedor;
        this.DiasVencimiento = CadJOper.DiasVencimiento;
        this.Estatus = CadJOper.Estatus;
        this.FechaEmision = CadJOper.FechaEmision;
        this.FechaLiquidacion = CadJOper.FechaLiquidacion;
        this.FechaOperacion = CadJOper.FechaOperacion;
        this.FechaVencimiento = CadJOper.FechaVencimiento;
        this.HoraOperacion = CadJOper.HoraOperacion;
        this.MonedaTransada = CadJOper.MonedaTransada;
        this.NemoTecnico = CadJOper.NemoTecnico;
        this.NombreMercado = CadJOper.NombreMercado;
        this.NumeroOfertaCompra = CadJOper.NumeroOfertaCompra;
        this.NumeroOfertaVenta = CadJOper.NumeroOfertaVenta;
        this.NumeroOperacion = CadJOper.NumeroOperacion;
        this.PrecioLimpio = CadJOper.PrecioLimpio;
        this.PuestoComprador = CadJOper.PuestoComprador;
        this.PuestoVendedor = CadJOper.PuestoVendedor;
        this.TasaCompra = CadJOper.TasaCompra;
        this.TasaCupon = CadJOper.TasaCupon;
        this.TasaVenta = CadJOper.TasaVenta;
        this.TipoMercado = CadJOper.TipoMercado;
        this.Tipodeinstrumento = CadJOper.Tipodeinstrumento;
        this.ValorNominalDolares = CadJOper.ValorNominalDolares;
        this.ValorNominalEquivalenteDolares = CadJOper.ValorNominalEquivalenteDolares;
        this.ValorNominalEquivalentePesos = CadJOper.ValorNominalEquivalentePesos;
        this.ValorNominalPesos = CadJOper.ValorNominalPesos;
        this.ValorNominalTotal = CadJOper.ValorNominalTotal;
        this.ValorTransado = CadJOper.ValorTransado;
        this.ValorTransadoDolares = CadJOper.ValorTransadoDolares;
        this.ValorTransadoEquivalenteDolares = CadJOper.ValorTransadoEquivalenteDolares;
        this.ValorTransadoEquivalentePesos = CadJOper.ValorTransadoEquivalentePesos;
        this.ValorTransadoPesos = CadJOper.ValorTransadoPesos;
        this.Yield = CadJOper.Yield;
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
    Monto: number;
    Cotitulo: string;
    Isin: string;
    Cant: number;
    // tslint:disable-next-line: variable-name
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
    GrafPrecioP: Graficos[] = [];
    GrafPrecioM: Graficos[] = [];
    GrafPrecioOper: Graficos[] = [];
    GrafVolumenP: Graficos[] = [];
    GrafVolumenM: Graficos[] = [];
    GrafVolumenOper: Graficos[] = [];
    MinGrafPrecio: number;
    MaxGrafPrecio: number;
    MinGrafVolumen: number;
    MaxGrafVolumen: number;
    Movi: Movimientos[] = [];
    emisiones: string[] = [];
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
