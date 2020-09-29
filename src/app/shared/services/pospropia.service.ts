import { Injectable } from '@angular/core';
import { APIRest, ConectorService } from '@laranda/lib-sysutil';
import { Observable } from 'rxjs';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class PospropiaService {

  Ts: any[] = [];
  visible: boolean;

  constructor(private aPIRest: APIRest,
              private conectorService: ConectorService) { }

              private buscarPost_REST(codigoTitulo: string): Observable<any> {

                const param = {
                  Tabla: 'TS',
                  Bdtxt: 'B',
                  Filtro: ` nu_mesa = 1 and sw_act_pas = 0  and mt_ts > 0 and co_titulo = \'${codigoTitulo}\'`
                };
                if (codigoTitulo === '')  {
                  param.Filtro = ` nu_mesa = 1 and sw_act_pas = 0  and mt_ts > 0 and tp_operac >=  1 and tp_operac <=  2  `;
                }
            //  LE QUITA EL EL S EN TS .. PROBLEMA DE DAME GENERICO
                return this.aPIRest.post_REST(this.conectorService.info.URL_REST, 'WDame_Generico', 'T', true, param);
              }

              consultar(codigoTitulo: string) {
                return new Promise(( resolve, reject ) => {
                  this.buscarPost_REST(codigoTitulo).subscribe((datosX) => {
                    if (datosX.Status !== 0) {
                      swal.fire('Error DameTsPropio', `Status: ${datosX.Status} \n Mensaje: ${datosX.Mensaje}`  , 'error');
                      this.Ts = null;
                      reject(datosX);
                    } else {
                        this.Ts = datosX.CadJson;
                        this.visible = true;
                        resolve(this.Ts);
                    }
                  });
                });
              }
}
