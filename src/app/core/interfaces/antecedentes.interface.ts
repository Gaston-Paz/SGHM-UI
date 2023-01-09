export interface Antecedente{
    idAntecedente?:number;
    idPaciente?:number;
    cirugias?: string;
    implanteSuperior?:string;
    implanteInferior?:string;
    ortodoncia:boolean;
    edadOrtodoncia?:number;
    piezasFaltantes?:string;
    placaDescanso:boolean;
    intestinal?:string;
    digestivo?:string;
    cardiaco?:string;
    urogenital?:string;
    respiratorio?:string;
    medicacion?:string;
    otros?:string;
    fracturas?:string;
    dolorCabeza?:string;
    alimentacion?:string;
    embarazos:boolean;
    partos?:string;
    abortos?:string;
    menstruacion:boolean;
    frecuencia?:string;
    duracion?:string;
    volumen?:string;
    perdidas?:string;
    accidentes?:string;
    tiroides?:string;
    diabetes:boolean;
}