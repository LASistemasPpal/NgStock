import  swal  from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticaCli } from '@laranda/lib-ultra-net';
import { ConectorService } from '@laranda/lib-sysutil';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup;
  verPass: string;
  ConfigCadout: any;
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'text/plain'
    })
    };
    paramConfig = {
      Json: true,
      Param: {
        Nucli: 1
      }
  };


  constructor(
    public autenticaCli: AutenticaCli,
    private fb: FormBuilder,
    private conectorService: ConectorService,
    private http: HttpClient,
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
      this.paramConfig.Param.Nucli = this.conectorService.info.NUCLI;
      const obs = this.http.post(
        this.conectorService.info.URL_RESTLA + 'WDame_cliente',
        this.paramConfig, this.httpOptions);
      obs.subscribe(res => {
        this.ConfigCadout = res;
     });
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
      sessionStorage.setItem('nmcliente',JSON.stringify(this.ConfigCadout.CadJson.Nombre)); 
      // sessionStorage.setItem('nmcliente',this.ConfigCadout.CadJson.Nombre);
      this.conectorService.getParametros().then(() => {
        if (this.ConfigCadout.CadJson !== undefined && this.ConfigCadout.CadJson.Nombre.indexOf('SUSP') >= 0) {
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
