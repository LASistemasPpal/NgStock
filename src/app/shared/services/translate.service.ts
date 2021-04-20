import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TranslateService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Ocp-Apim-Subscription-Key': '284333ad2cd3435890c5718df56a6977',
      'Ocp-Apim-Subscription-Region': 'eastus',
      'Content-Type': 'application/json'
    })
  };

  constructor(
    private http: HttpClient
  ) { }

  traducirTexto(texto: string, idioma: string) {

    const body = [
      { Text: texto }
    ];

    const url = 'https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&to=' + idioma;

    return this.http.post(url, body, this.httpOptions).pipe( map(datos => datos[0].translations.text)[0]);
  }
}
