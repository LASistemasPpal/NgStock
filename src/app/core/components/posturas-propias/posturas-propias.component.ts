import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-posturas-propias',
  templateUrl: './posturas-propias.component.html',
  styleUrls: ['./posturas-propias.component.scss']
})
export class PosturasPropiasComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];

  @Input() datos: any[];

  constructor() {

    this.dtColumnas = [
      { title: 'CODRUEDA', data: 'CODRUEDA' },
      { title: 'Duracion', data: 'Duracion' },
      { title: 'Estatus', data: 'Estatus' },
      { title: 'FechaLiquidacion', data: 'FechaLiquidacion' },
      { title: 'FechaPostura', data: 'FechaPostura' },
      { title: 'HoraPostura', data: 'HoraPostura' },
      { title: 'HoraUltimaModificacion', data: 'HoraUltimaModificacion' },
      { title: 'ISIN', data: 'ISIN' },
      { title: 'MonedaLiquidacion', data: 'MonedaLiquidacion' },
      { title: 'Nemotecnico', data: 'Nemotecnico' },
      { title: 'NominalUnitario', data: 'NominalUnitario' },
      { title: 'NroOperacionVinculada', data: 'NroOperacionVinculada' },
      { title: 'OrdenesEnFirmeID', data: 'OrdenesEnFirmeID' },
      { title: 'PlazoLiquidacion', data: 'PlazoLiquidacion' },
      { title: 'PosicionCompraVenta', data: 'PosicionCompraVenta' },
      { title: 'Precio', data: 'Precio' },
      { title: 'Rendimiento', data: 'Rendimiento' },
      { title: 'Secuencia', data: 'Secuencia' },
      { title: 'TasaCupon', data: 'TasaCupon' },
      { title: 'ValorNominalDolares', data: 'ValorNominalDolares' },
      { title: 'ValorNominalPesos', data: 'ValorNominalPesos' },
      { title: 'ValorTransadoDolares', data: 'ValorTransadoDolares' },
      { title: 'ValorTransadoPesos', data: 'ValorTransadoPesos' }
    ];
  }

  ngOnInit(): void {
  }

}
