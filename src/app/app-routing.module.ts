import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataComponent } from './core/components/data/data.component';
import { Error404Component } from './core/components/error404/error404.component';



const routes: Routes = [
  { path: '', component: DataComponent },
  { path: '**', component: Error404Component },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
