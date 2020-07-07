export class Aspectos {
    seccion: string;
    radiogroup: string;
    grupo: string;
    radios: string;
    boton: string;
    grupoHor: string;
    grupoRes: string;

    constructor(){
        this.seccion = 'd-sm-flex flex-sm-column d-lg-inline-flex flex-lg-row justify-content-around rounded col-12 flex-wrap';
        this.radiogroup = 'border border-dark rounded d-sm-flex flex-sm-row d-lg-inline-flex flex-lg-column  align-content-center m-2 p-2';
        this.grupo = 'd-inline-flex flex-row align-items-center m-2';
        this.radios = 'form-check form-check-inline';
        this.boton = 'd-lg-inline-flex d-sm-flex align-content-center';
        this.grupoHor = 'd-inline-flex flex-column align-items-center m-2 col-md-2';
        this.grupoRes = 'flex d-inline-flex col-12 m-2 m-2';
    }
}

