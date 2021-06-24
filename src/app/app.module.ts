import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Librerías
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ColorGrid } from '@laranda/lib-visual';
import { TranslateLAService } from '@laranda/lib-sysutil';

// AoT requiere una función exportada para fábricas
export function datosTaductorJson(translateLAService: TranslateLAService) {
  return () => translateLAService.cargar_Diccionario();
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [
    ColorGrid,
    TranslateLAService,
    {
      provide: APP_INITIALIZER,
      useFactory: datosTaductorJson,
      deps: [TranslateLAService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
