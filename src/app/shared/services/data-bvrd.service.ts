import { Injectable } from '@angular/core';
import { ConectorService, APIRest } from '@laranda/lib-sysutil';
import { BvrdPosturaP, BvrdPosturaM, BvrdOpers, RiesgoLiquidez } from '../classes/bvrdClass';
import { IbvrdPostura, IbvrdOper } from './../classes/bvrdClass';

@Injectable()
export class DamePosturasP{
  posturasPropias: BvrdPosturaP[] = [];

  constructor(
    private conectorService: ConectorService,
    private serverAPI: APIRest
  ) { }

  consultar(numUser: string) {

    return new Promise((resolve, rejects) => {
      this.serverAPI.post_REST(this.conectorService.info.URL_REST, 'WdamePosturasPropias', '',
        false, { User: 'USUARIO' + numUser }, false).subscribe(
          datosX => {
            if (datosX.Status === 0) {
              for (const bvrdP of [datosX] as IbvrdPostura[]) {
                this.posturasPropias.push(new BvrdPosturaP(bvrdP));
              }
              resolve( this.posturasPropias );
            } else if (datosX.Status === 1) {
              resolve( this.posturasPropias );
            } else {
              this.posturasPropias = [];
              rejects( datosX );
            }
          }
      );
    });

    // for (const bvrdP of jsbvrdPosturasP as IbvrdPostura[]) {
    //   this.posturasPropias.push(new BvrdPosturaP(bvrdP));
    // }
  }
}

@Injectable()
export class DamePosturasM{
  posturasSiopel: BvrdPosturaM[] = [];

  constructor(
    private conectorService: ConectorService,
    private serverAPI: APIRest
  ) { }

  consultar(numUser: string){

    return new Promise((resolve, rejects) => {
      this.serverAPI.post_REST(this.conectorService.info.URL_REST, 'WdamePosturasSiopel', '',
        false, { User: 'USUARIO' + numUser }, false).subscribe(
          datosX => {

            if (datosX.Status === 0) {
              for (const bvrdM of [datosX] as IbvrdPostura[]) {
                this.posturasSiopel.push(new BvrdPosturaM(bvrdM));
              }
              resolve( this.posturasSiopel );
            } else if (datosX.Status === 1) {
              resolve( this.posturasSiopel );
            } else {
              rejects( datosX );
            }
          }
      );
    });

    // for (const bvrdM of jsbvrdPosturasSiopel as IbvrdPostura[]) {
    //   this.posturasSiopel.push(new BvrdPosturaM(bvrdM));
    // }
  }
}

@Injectable()
export class DameOperaciones{
  operacionBvrd: BvrdOpers[] = [];

  constructor(
    private conectorService: ConectorService,
    private serverAPI: APIRest
  ) { }

  consultar(numUser: string){

    return new Promise((resolve, rejects) => {
      this.serverAPI.post_REST(this.conectorService.info.URL_REST, 'WdameOperacionesPropias', '',
        false, { User: 'USUARIO' + numUser }, false).subscribe(
          datosX => {
            if (datosX.Status === 0) {
              for (const OperP of [datosX] as IbvrdOper[]) {
                this.operacionBvrd.push(new BvrdOpers(OperP));
              }
              resolve( this.operacionBvrd );
            } else if (datosX.Status === 1) {
              resolve( this.operacionBvrd );
            } else {
              rejects( datosX );
            }
          }
      );
    });

    // for (const OperP of jsbvrdOperacionesP as IbvrdOper[]) {
    //   this.operacionBvrd.push(new BvrdOpers(OperP));
    // }
  }
}


@Injectable()
export class DameRiesgoLiquidezServer{
  riesgoLiquidez: RiesgoLiquidez[] = [];
  visible: boolean;

  constructor(
    private conectorService: ConectorService,
    private serverAPI: APIRest
  ) { }

  consultar(numUser: string){
    this.visible = false;

    return new Promise((resolve, rejects) => {
      this.serverAPI.post_REST(this.conectorService.info.URL_REST, 'WdameRiesgoLiquidez', '',
        false, { User: 'USUARIO' + numUser }, false).subscribe(
          datosX => {

            if (datosX.Status === 0) {
              this.riesgoLiquidez = datosX.CadJson;
              resolve( this.riesgoLiquidez );
            } else if (datosX.Status === 1) {
              resolve( this.riesgoLiquidez );
            } else {
              rejects( datosX );
            }

            this.visible = true;
          }
      );
    });
  }
}
