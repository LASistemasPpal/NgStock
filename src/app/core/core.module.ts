import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


// Librerías LA
import { SysutilModule } from '@laranda/lib-sysutil';
import { UltranetTablasModule } from '@laranda/lib-ultra-net';

// Parametros
import { environment } from './../../environments/environment';

// Componentes
import { HeaderComponent } from './components/header/header.component';
import { Error404Component } from './components/error404/error404.component';
import { DataComponent } from './components/data/data.component';
import { PosicionMAntComponent } from './components/posicion-m-ant/posicion-m-ant.component';
import { DatosMComponent } from './components/datos-m/datos-m.component';

// Servicios LA
import { DameOperaciones, DamePosturasM, DamePosturasP } from '../shared/services/data-bvrd.service';
import { CalculosRD } from '../shared/services/estadisticas.service';
import { CordenxComponent } from './components/cordenx/cordenx.component';



@NgModule({
  declarations: [
    DataComponent,
    Error404Component,
    HeaderComponent,
    PosicionMAntComponent,
    DatosMComponent,
    CordenxComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SysutilModule,
    UltranetTablasModule.forRoot(environment.URL_REST),
    NgxMaskModule.forRoot()
  ],
  providers: [ DameOperaciones, DamePosturasM, DamePosturasP, CalculosRD ]
})
export class CoreModule { }
