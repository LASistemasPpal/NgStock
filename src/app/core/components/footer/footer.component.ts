import { Component, OnInit, Input } from '@angular/core';
import { DameDatosM } from '@laranda/lib-ultra-net';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  xcolor = { color: '#8B363E' };
  xbgColor = {
    'background-color': '#8B363E',
    color: 'white',
    'border-color': '#8B363E',
  };

  dtColumnasDatosM: any[];

  @Input() codRif = '';

  constructor(
    public dameDatosM: DameDatosM
  ) { }

  ngOnInit() {
    this.dameDatosM.visible = false;
    this.dameDatosM.ParamIn.Status = 0;
    this.dameDatosM.ParamIn.Mensaje = ' ';

    this.dameDatosM.ParamIn.Rif = this.codRif;

    this.dameDatosM.consultar();

  }

}
