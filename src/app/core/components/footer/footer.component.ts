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

  constructor(
    public dameDatosM: DameDatosM
  ) {

    this.dtColumnasDatosM = [
      { title: 'Apellido', data: 'Apellido' },
      { title: 'Nombre', data: 'Nombre' }
      // { title: 'Tlf1', data: 'Tlf1' },
      // { title: 'Tlf2', data: 'Tlf2' },
      // { title: 'Email', data: 'Email' }
      // ,
      // {
      //   title: 'Direccion', data: null, render: (data: any, type: any, row: any, meta: any) => {
      //     return `${data.Dirhabitacion1} ${data.Dirhabitacion2} ${data.Dirhabitacion3}`;
      //   }
      // },
      // { title: 'Ejecutivo', data: 'Ejecutivo' },
    ];

  }

  ngOnInit() {
    console.log(this.dameDatosM.CadOut);

    // this.dameDatosM.CadOut = [];
    // this.dameDatosM.visible = false;
    // this.dameDatosM.ParamIn.Status = 0;
    // this.dameDatosM.ParamIn.Mensaje = ' ';

    // this.dameDatosM.ParamIn.Rif = this.codCliente;
    // console.log('footer: ' + this.codCliente);


    // this.dameDatosM.consultar();

  }

}
