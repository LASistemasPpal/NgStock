import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticaCli } from '@laranda/lib-ultra-net';

@Injectable({
  providedIn: 'root'
})
export class UsuarioGuard implements CanActivate {

  constructor(
    private autenticaCli: AutenticaCli,
    private router: Router

  ) {
    this.autenticaCli.getUsuarioActivo();
  }

  canActivate(): boolean {

    if (this.autenticaCli.estaAutenticado()) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
