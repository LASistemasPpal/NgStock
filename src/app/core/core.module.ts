import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskModule } from 'ngx-mask';


// Librerías LA
import { SysutilModule } from '@laranda/lib-sysutil';
import { UltranetTablasModule } from '@laranda/lib-ultra-net';

// Componentes
import { HeaderComponent } from './components/header/header.component';
import { Error404Component } from './components/error404/error404.component';
import { DataComponent } from './components/data/data.component';
import { PosicionMAntComponent } from './components/posicion-m-ant/posicion-m-ant.component';
import { DatosMComponent } from './components/datos-m/datos-m.component';
import { PosturasPropiasComponent } from './components/posturas-propias/posturas-propias.component';
import { OperacionesPropiasComponent } from './components/operaciones-propias/operaciones-propias.component';
import { PosturasSiopelComponent } from './components/posturas-siopel/posturas-siopel.component';
import { RiesgoLiquidezComponent } from './components/riesgo-liquidez/riesgo-liquidez.component';
import { OperacionMrktComponent } from './components/operacion-mrkt/operacion-mrkt.component';
import { PosicionPropiaComponent } from './components/posicion-propia/posicion-propia.component';
import { OperacionesOtcComponent } from './components/operaciones-otc/operaciones-otc.component';
import { FooterComponent } from './components/footer/footer.component';


// Servicios LA
import { DameOperaciones, DamePosturasM, DamePosturasP, DameRiesgoLiquidezServer, DameOperacionesMrkt } from '../shared/services/data-bvrd.service';
import { CalculosRD } from '../shared/services/estadisticas.service';
import { CordenxComponent } from './components/cordenx/cordenx.component';
import { LoginComponent } from './components/login/login.component';

// Rutas
import { AppRoutingModule } from './../app-routing.module';


@NgModule({
  declarations: [
    DataComponent,
    Error404Component,
    HeaderComponent,
    PosicionMAntComponent,
    DatosMComponent,
    CordenxComponent,
    LoginComponent,
    PosturasPropiasComponent,
    OperacionesPropiasComponent,
    PosturasSiopelComponent,
    RiesgoLiquidezComponent,
    OperacionMrktComponent,
    PosicionPropiaComponent,
    OperacionesOtcComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SysutilModule,
    AppRoutingModule,
    UltranetTablasModule,
    NgxMaskModule.forRoot()
  ],
  providers: [ DameOperaciones, DameOperacionesMrkt, DamePosturasM, DamePosturasP, CalculosRD, DameRiesgoLiquidezServer ]
})
export class CoreModule { }
