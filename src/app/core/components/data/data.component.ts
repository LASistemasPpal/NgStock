import { Component, OnInit } from '@angular/core';
import { DameCorden, DamePosicionMAnt } from 'lib-ultra-net';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [
    { title: 'Producto',    data: 'Producto' },
    { title: 'Cuenta',     data: 'Cuenta' },
    { title: 'Ejecutivo',     data: 'Ejecutivo' },
    { title: 'Solicitado',     data: 'Solicitado' },
    { title: 'Negociado',     data: 'Negociado' }
  ];

  constructor(
    public dameCorden: DameCorden,
    public damePosicionMAnt: DamePosicionMAnt
  ) { }

  ngOnInit(): void {

    this.dameCorden.visible = true;
    this.dameCorden.ParamIn.Status = 0;
    this.dameCorden.ParamIn.Mensaje = '<NUORIGEN>1</NUORIGEN>';
    this.dameCorden.ParamIn.Rif = 'D047  00000013';
    this.dameCorden.ParamIn.desde = '25-02-2020';
    this.dameCorden.ParamIn.Hasta = '25-02-2020';
    // this.dameCorden.consultar();

  }

}
