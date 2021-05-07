import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

// Rutas
import { AppRoutingModule } from './app-routing.module';

// Librerías
import { ColorGrid } from '@laranda/lib-sysutil';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
  providers: [ColorGrid ],
  bootstrap: [AppComponent]
})
export class AppModule { }
