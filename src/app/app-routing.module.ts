import { LoginComponent } from './core/components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './core/components/data/data.component';
import { Error404Component } from './core/components/error404/error404.component';
import { UsuarioGuard } from './guards/usuario.guard';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', component: DataComponent, canActivate: [ UsuarioGuard ] },
  { path: '**', component: Error404Component }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
