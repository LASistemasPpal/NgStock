import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AutenticaCli } from '@laranda/lib-ultra-net';

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
    private fb: FormBuilder
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
  }

  get usuarioNoValido() {
    return (this.formLogin.get('user').invalid && this.formLogin.get('user').touched);
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

      this.autenticaCli.logIn();
    }
  }

  claveVisible() {
    this.verPass = 'text';
  }
  claveOculta() {
    this.verPass = 'password';
  }

}
