import swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticaCli, RestDameCliente } from '@laranda/lib-ultra-net';
import { ConectorService } from '@laranda/lib-sysutil';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  verPass: string;


  constructor(
    public autenticaCli: AutenticaCli,
    private fb: FormBuilder,
    private conectorService: ConectorService,
    private restDameCliente: RestDameCliente
  ) {
    this.formLogin = this.fb.group({
      user: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit(): void {
    this.autenticaCli.ParamIn.User = '';
    this.autenticaCli.ParamIn.Pass = '';
    this.verPass = 'password';
    //  para leer el nombre del cliente LA y ver si esta SUSPENDIDO
    this.conectorService.getParametros().then(() => {
      this.restDameCliente.ParamIn.Nucli = this.conectorService.info.NUCLI;
      this.restDameCliente.ParamIn.Url = this.conectorService.info.URL_REST_LA + 'WDame_cliente';
      this.restDameCliente.ParamIn.Proxy.Usarproxy = this.conectorService.info.PROXY.USARPROXY;
      this.restDameCliente.ParamIn.Proxy.Server = this.conectorService.info.PROXY.SERVER;
      this.restDameCliente.ParamIn.Proxy.Puerto = this.conectorService.info.PROXY.PUERTO;
      this.restDameCliente.consultar(this.conectorService.info.URL_REST);
    }
     );
  }

  get usuarioNoValido() {

    return (this.formLogin.get('user').invalid && this.formLogin.get('user').touched ||
    (this.formLogin.get('user').value.indexOf('0') > -1) );
  }

  get passwordNoValido() {
    return (this.formLogin.get('password').invalid && this.formLogin.get('password').touched);
  }

  onLogin( ) {

    Object.values( this.formLogin.controls ).forEach( control => {
      if ( control.invalid ) {
        control.markAllAsTouched();
      }
    });

    if (this.formLogin.valid) {
      this.autenticaCli.ParamIn.User = this.formLogin.value.user;
      this.autenticaCli.ParamIn.Pass = this.formLogin.value.password;
      sessionStorage.setItem('nmcliente', JSON.stringify(this.restDameCliente.CadOut.Nombre));
      // sessionStorage.setItem('nmcliente',JSON.stringify(this.ConfigCadout.CadJson.Nombre));
      // sessionStorage.setItem('nmcliente',this.ConfigCadout.CadJson.Nombre);
      this.conectorService.getParametros().then(() => {
        if (this.restDameCliente.CadOut !== undefined && this.restDameCliente.CadOut.Nombre.indexOf('SUSP') >= 0) {
          swal.fire({
          icon: 'info',
          text: 'Cuenta Inactiva....',
          title: 'email soporte@lasistemas.com',
            });
        }
        else {
          this.autenticaCli.logIn(this.conectorService.info.URL_REST);
        }
      });
    }
  }

  claveVisible() {
    this.verPass = 'text';
  }
  claveOculta() {
    this.verPass = 'password';
  }

}
