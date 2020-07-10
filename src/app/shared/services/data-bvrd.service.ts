import { IbvrdPostura, IbvrdOper } from './../classes/bvrdClass';
import { jsbvrdPosturasP, jsbvrdPosturasSiopel, jsbvrdOperacionesP } from './../data/bvrdData';
import { Injectable } from '@angular/core';
import { BvrdPosturaP, BvrdPosturaM, BvrdOpers } from '../classes/bvrdClass';

@Injectable()
export class DamePosturasP{
  posturasPropias: BvrdPosturaP[] = [];
  constructor() { }
  consultar() {
    for (const bvrdP of jsbvrdPosturasP as IbvrdPostura[]) {
      this.posturasPropias.push(new BvrdPosturaP(bvrdP));
    }
  }
}

@Injectable()
export class DamePosturasM{
  posturasSiopel: BvrdPosturaM[] = [];
  constructor() { }
  consultar(){
    for (const bvrdM of jsbvrdPosturasSiopel as IbvrdPostura[]) {
      this.posturasSiopel.push(new BvrdPosturaM(bvrdM));
    }
  }
}

@Injectable()
export class DameOperaciones{
  operacionBvrd: BvrdOpers[] = [];
  constructor() { }
  consultar() {
    for (const OperP of jsbvrdOperacionesP as IbvrdOper[]) {
      this.operacionBvrd.push(new BvrdOpers(OperP));
    }
  }
}
