import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Librerías LA
import { SysutilModule } from 'lib-sysutil';
import { UltranetTablasModule } from 'lib-ultra-net';

// Parametros
import { environment } from './../../environments/environment';

// Componentes
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Error404Component } from './components/error404/error404.component';
import { DataComponent } from './components/data/data.component';



@NgModule({
  declarations: [
    DataComponent,
    Error404Component,
    FooterComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    SysutilModule,
    UltranetTablasModule.forRoot(environment.URL_REST)
  ]
})
export class CoreModule { }
