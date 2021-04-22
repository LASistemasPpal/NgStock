import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ColorGrid } from '@laranda/lib-sysutil';
import { TranslateService } from '@ngx-translate/core';
import { ITranslate } from '../interface/ITranslate';

@Injectable({
  providedIn: 'root'
})
export class TranslateLAService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '284333ad2cd3435890c5718df56a6977',
      'Ocp-Apim-Subscription-Region': 'eastus',
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient,
    private translate: TranslateService,
    private colorGrid: ColorGrid
  ) { }

  traducirTexto(texto: string, idioma: string) {

    const body = [
      { Text: texto }
    ];

    const url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + idioma;

    return this.http.post<ITranslate>(url, body, this.httpOptions);
  }

  scrollFin() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  traducirColumnas(columnas: DataTables.ColumnSettings[]): boolean {
    columnas.map(x => {
      this.translate.get(x.title).subscribe(j => {
        x.title = this.colorGrid.tablaH(j);
      });
    });

    return true;
  }
}
