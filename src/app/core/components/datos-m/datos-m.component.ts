import { Component, OnInit, Input } from '@angular/core';
import { DameDatosM } from '@laranda/lib-ultra-net';
import { ConectorService } from '@laranda/lib-sysutil';

@Component({
  selector: 'app-datos-m',
  templateUrl: './datos-m.component.html',
  styleUrls: ['./datos-m.component.scss']
})
export class DatosMComponent implements OnInit {

  dtColumnasDatosM: any[];

  @Input() codRif = '';

  constructor(
    public dameDatosM: DameDatosM,
    private conectorService: ConectorService
  ) { }

  ngOnInit() {
    this.dameDatosM.visible = false;
    this.dameDatosM.ParamIn.Status = 0;
    this.dameDatosM.ParamIn.Mensaje = ' ';
    this.dameDatosM.ParamIn.Rif = this.codRif;
    this.dameDatosM.consultar(this.conectorService.info.URL_REST);
  }

}
