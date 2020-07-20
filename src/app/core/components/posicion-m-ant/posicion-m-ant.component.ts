import { Component, OnInit, Input } from '@angular/core';
import { DamePosicionMAnt } from '@laranda/lib-ultra-net';
import { ConectorService } from '@laranda/lib-sysutil';

@Component({
  selector: 'app-posicion-m-ant',
  templateUrl: './posicion-m-ant.component.html',
  styleUrls: ['./posicion-m-ant.component.scss']
})
export class PosicionMAntComponent implements OnInit {

  dtColumnas: DataTables.ColumnSettings[] = [];

  @Input() codRif: string;
  @Input() fecha: string;

  constructor(
    public damePosicionMAnt: DamePosicionMAnt,
    private conectorService: ConectorService
  ) {

    this.dtColumnas = [
      { title: 'Producto1', data: 'Producto1' },
      { title: 'Moneda', data: 'Moneda_abrevia' },
      { title: 'Saldo Fin', data: 'Saldofin', className: 'dt-body-right' },
      { title: 'Fecha Ini', data: 'Ini' },
      { title: 'Fecha Fin', data: 'Fin' },
      { title: 'Producto', data: null, render: (data: any, type: any, row: any, meta) => {
        return data.Producto.substr(0, 2) === 'MM' ? data.Rend : data.Mrkt;
      }, className: 'dt-body-right' },
      { title: 'Efecfin', data: 'Efecfin', className: 'dt-body-right' },
      { title: 'Clave', data: 'Clave' }
    ];
  }

  ngOnInit(): void {
    this.damePosicionMAnt.CadOut = [];
    this.damePosicionMAnt.visible = false;
    this.damePosicionMAnt.ParamIn.Rif = this.codRif;
    this.damePosicionMAnt.ParamIn.Fechin = this.fecha;

    this.damePosicionMAnt.consultar(this.conectorService.info.URL_REST);
  }

}
