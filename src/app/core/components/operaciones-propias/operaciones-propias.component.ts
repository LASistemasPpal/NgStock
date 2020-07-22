import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-operaciones-propias',
  templateUrl: './operaciones-propias.component.html',
  styleUrls: ['./operaciones-propias.component.scss']
})
export class OperacionesPropiasComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];

  @Input() datos: any[];

  constructor() {

    this.dtColumnas = [
      { title: 'CantidadTitulos', data: 'CantidadTitulos' },
      { title: 'CodEmisorBVRD', data: 'CodEmisorBVRD' },
      { title: 'CodigoISIN', data: 'CodigoISIN' },
      { title: 'ComisionComprador', data: 'ComisionComprador' },
      { title: 'ComisionVendedor', data: 'ComisionVendedor' },
      { title: 'DiasVencimiento', data: 'DiasVencimiento' },
      { title: 'Estatus', data: 'Estatus' },
      { title: 'FechaEmision', data: 'FechaEmision' },
      { title: 'FechaLiquidacion', data: 'FechaLiquidacion' },
      { title: 'FechaOperacion', data: 'FechaOperacion' },
      { title: 'FechaVencimiento', data: 'FechaVencimiento' },
      { title: 'HoraOperacion', data: 'HoraOperacion' },
      { title: 'MonedaTransada', data: 'MonedaTransada' },
      { title: 'NemoTecnico', data: 'NemoTecnico' },
      { title: 'NombreMercado', data: 'NombreMercado' },
      { title: 'NumeroOfertaCompra', data: 'NumeroOfertaCompra' },
      { title: 'NumeroOfertaVenta', data: 'NumeroOfertaVenta' },
      { title: 'NumeroOperacion', data: 'NumeroOperacion' },
      { title: 'PrecioLimpio', data: 'PrecioLimpio' },
      { title: 'PuestoComprador', data: 'PuestoComprador' },
      { title: 'PuestoVendedor', data: 'PuestoVendedor' },
      { title: 'TasaCompra', data: 'TasaCompra' },
      { title: 'TasaCupon', data: 'TasaCupon' },
      { title: 'TasaVenta', data: 'TasaVenta' },
      { title: 'TipoMercado', data: 'TipoMercado' },
      { title: 'Tipodeinstrumento', data: 'Tipodeinstrumento' },
      { title: 'ValorNominalDolares', data: 'ValorNominalDolares' },
      { title: 'ValorNominalEquivalenteDolares', data: 'ValorNominalEquivalenteDolares' },
      { title: 'ValorNominalEquivalentePesos', data: 'ValorNominalEquivalentePesos' },
      { title: 'ValorNominalPesos', data: 'ValorNominalPesos' },
      { title: 'ValorNominalTotal', data: 'ValorNominalTotal' },
      { title: 'ValorTransado', data: 'ValorTransado' },
      { title: 'ValorTransadoDolares', data: 'ValorTransadoDolares' },
      { title: 'ValorTransadoEquivalenteDolares', data: 'ValorTransadoEquivalenteDolares' },
      { title: 'ValorTransadoEquivalentePesos', data: 'ValorTransadoEquivalentePesos' },
      { title: 'ValorTransadoPesos', data: 'ValorTransadoPesos' },
      { title: 'Yield', data: 'Yield' }
    ];
  }

  ngOnInit(): void {
  }

}
