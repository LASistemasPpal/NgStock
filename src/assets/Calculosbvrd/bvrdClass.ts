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
    constructor( bvrdPosturaP: IbvrdPostura){
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
        this.CantidadTitulos                 = CadJOper.CantidadTitulos;
        this.CodEmisorBVRD                   = CadJOper.CodEmisorBVRD;
        this.CodigoISIN                      = CadJOper.CodigoISIN;
        this.ComisionComprador               = CadJOper.ComisionComprador;
        this.ComisionVendedor                = CadJOper.ComisionVendedor;
        this.DiasVencimiento                 = CadJOper.DiasVencimiento;
        this.Estatus                         = CadJOper.Estatus;
        this.FechaEmision                    = CadJOper.FechaEmision;
        this.FechaLiquidacion                = CadJOper.FechaLiquidacion;
        this.FechaOperacion                  = CadJOper.FechaOperacion;
        this.FechaVencimiento                = CadJOper.FechaVencimiento;
        this.HoraOperacion                   = CadJOper.HoraOperacion;
        this.MonedaTransada                  = CadJOper.MonedaTransada;
        this.NemoTecnico                     = CadJOper.NemoTecnico;
        this.NombreMercado                   = CadJOper.NombreMercado;
        this.NumeroOfertaCompra              = CadJOper.NumeroOfertaCompra;
        this.NumeroOfertaVenta               = CadJOper.NumeroOfertaVenta;
        this.NumeroOperacion                 = CadJOper.NumeroOperacion;
        this.PrecioLimpio                    = CadJOper.PrecioLimpio;
        this.PuestoComprador                 = CadJOper.PuestoComprador;
        this.PuestoVendedor                  = CadJOper.PuestoVendedor;
        this.TasaCompra                      = CadJOper.TasaCompra;
        this.TasaCupon                       = CadJOper.TasaCupon;
        this.TasaVenta                       = CadJOper.TasaVenta;
        this.TipoMercado                     = CadJOper.TipoMercado;
        this.Tipodeinstrumento               = CadJOper.Tipodeinstrumento;
        this.ValorNominalDolares             = CadJOper.ValorNominalDolares;
        this.ValorNominalEquivalenteDolares  = CadJOper.ValorNominalEquivalenteDolares;
        this.ValorNominalEquivalentePesos    = CadJOper.ValorNominalEquivalentePesos;
        this.ValorNominalPesos               = CadJOper.ValorNominalPesos;
        this.ValorNominalTotal               = CadJOper.ValorNominalTotal;
        this.ValorTransado                   = CadJOper.ValorTransado;
        this.ValorTransadoDolares            = CadJOper.ValorTransadoDolares;
        this.ValorTransadoEquivalenteDolares = CadJOper.ValorTransadoEquivalenteDolares;
        this.ValorTransadoEquivalentePesos   = CadJOper.ValorTransadoEquivalentePesos;
        this.ValorTransadoPesos              = CadJOper.ValorTransadoPesos;
        this.Yield                           = CadJOper.Yield;
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
