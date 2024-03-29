import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Antecedente } from 'src/app/core/interfaces/antecedentes.interface';
import { NuevoPacienteService } from '../nuevo-paciente.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css'],
  encapsulation : ViewEncapsulation.None
})
export class AntecedentesComponent implements OnInit {

  form!: FormGroup;
  antecedentes: Antecedente = {
    embarazos:false,
    menstruacion:false,
    ortodoncia:false,
    placaDescanso:false,
    contencion:false

  }
  fumador: string[]=['Tabaco','Marihuana','Ambos'];
  tiroides: string[]=['Hipotiroidismo','Hipertiroidismo'];
  @Input("antecedente") antecedente: Antecedente = {
    contencion: false,
    embarazos: false,
    menstruacion: false,
    ortodoncia: false,
    placaDescanso: false
  };
  @Input("hayAntecedente") hayAntecedente: boolean = false;
  @Input("edicion") edicion: boolean = false;

  verCirugias = true;
  iconoCirugias = 'arrow_drop_up';
  verOdontologia = true;
  iconoOdontologia = 'arrow_drop_up';
  verFemenina = true;
  iconoFemenina = 'arrow_drop_up';
  verSistemas = true;
  iconoSistemas = 'arrow_drop_up';
  verOtros = true;
  iconoOtros = 'arrow_drop_up';

  constructor(private _formBuilder: FormBuilder,
    private _servicePacienteNuevo: NuevoPacienteService) { }

  ngOnInit(): void {      
    this._servicePacienteNuevo.InicializarObjetos();
    this.form = this._formBuilder.group({
      cirugias: [this.antecedente.cirugias === undefined ? '' : this.antecedente.cirugias],
      implanteInferior: [this.antecedente.implanteInferior === undefined ? '' : this.antecedente.implanteInferior],
      implanteSuperior: [this.antecedente.implanteSuperior === undefined ? '' : this.antecedente.implanteSuperior],
      ortodoncia: [this.antecedente.ortodoncia],
      EdadOrtodoncia: [this.antecedente.edadOrtodoncia === undefined ? '' : this.antecedente.edadOrtodoncia],
      piezasfaltantesSup: [this.antecedente.piezasFaltantesSup === undefined ? '' : this.antecedente.piezasFaltantesSup],
      piezasfaltantesInf: [this.antecedente.piezasFaltantesInf === undefined ? '' : this.antecedente.piezasFaltantesInf],
      placaDescanso: [this.antecedente.placaDescanso],
      menstruacion: [this.antecedente.menstruacion],
      perdidas: [this.antecedente.perdidas === undefined ? '' : this.antecedente.perdidas],
      frecuencia: [this.antecedente.frecuencia === undefined ? '' : this.antecedente.frecuencia],
      partos: [this.antecedente.partos === undefined ? '' : this.antecedente.partos],
      abortoInducido: [this.antecedente.abortosInducido === undefined ? '' : this.antecedente.abortosInducido],
      abortoEspontaneo: [this.antecedente.abortosEspontaneo === undefined ? '' : this.antecedente.abortosEspontaneo],
      duracion: [this.antecedente.duracion === undefined ? '' : this.antecedente.duracion],
      volumen: [this.antecedente.volumen === undefined ? '' : this.antecedente.volumen],
      intestinal: [this.antecedente.intestinal === undefined ? '' : this.antecedente.intestinal],
      digestivo: [this.antecedente.digestivo === undefined ? '' : this.antecedente.digestivo],
      cardiaco: [this.antecedente.cardiaco === undefined ? '' : this.antecedente.cardiaco],
      urogenital: [this.antecedente.urogenital === undefined ? '' : this.antecedente.urogenital],
      respiratorio: [this.antecedente.respiratorio === undefined ? '' : this.antecedente.respiratorio],
      accidentes: [this.antecedente.accidentes === undefined ? '' : this.antecedente.accidentes],
      medicacion: [this.antecedente.medicacion === undefined ? '' : this.antecedente.medicacion],
      fracturas: [this.antecedente.fracturas === undefined ? '' : this.antecedente.fracturas],
      dolorCabeza: [this.antecedente.dolorCabeza === undefined ? '' : this.antecedente.dolorCabeza],
      tiroides: [this.antecedente.tiroides === undefined ? '' : this.antecedente.tiroides],
      otros: [this.antecedente.otros === undefined ? '' : this.antecedente.otros],
      alimentacion: [this.antecedente.alimentacion === undefined ? '' : this.antecedente.alimentacion],
      protesis: [this.antecedente.protesis === undefined ? '' : this.antecedente.protesis],
      oseo: [this.antecedente.oseo === undefined ? '' : this.antecedente.oseo],
      fuma: [this.antecedente.fuma === undefined ? '' : this.antecedente.fuma],
      otrasDrogas: [this.antecedente.otrasDrogas === undefined ? '' : this.antecedente.otrasDrogas],
      contencion: [this.antecedente.contencion],
      embarazos: [this.antecedente.embarazos],
      diabetes: [this.antecedente.diabetes === undefined ? '' : this.antecedente.diabetes],
      alteracionesVision: [this.antecedente.alteracionesVision === undefined ? '' : this.antecedente.alteracionesVision],
      covid: [this.antecedente.covid === undefined ? '' : this.antecedente.covid],
      menopausia: [this.antecedente.menopausia === undefined ? '' : this.antecedente.menopausia],
      observacionesOdontologicas: [this.antecedente.observacionesOdontologicas === undefined ? '' : this.antecedente.observacionesOdontologicas],
    });
    if(this.hayAntecedente)this.antecedentes = this.antecedente;    
  }

  CargarAntecedentes(){ 
    if(!this.antecedente.ortodoncia)this.antecedente.edadOrtodoncia = undefined; 
    if(!this.antecedente.embarazos){
      this.antecedente.abortosEspontaneo = undefined; 
      this.antecedente.abortosInducido = undefined; 
      this.antecedente.partos = undefined; 
    }
    this._servicePacienteNuevo.CargarAntecedentes(this.antecedentes);
  }
  
  asignarValor(){    
    this._servicePacienteNuevo.CargarAntecedentes(this.antecedentes);
  }

  MapAntecedente(valor:any,campo:number){
    switch (campo) {
      case 1:this.antecedentes.cirugias = valor;break;
      case 2:this.antecedentes.implanteSuperior = valor;break;
      case 3:this.antecedentes.implanteInferior = valor;break;
      case 4:this.antecedentes.piezasFaltantesSup = valor;break;
      case 5:this.antecedentes.piezasFaltantesInf = valor;break;
      case 6:this.antecedentes.protesis = valor;break;
      case 7:this.antecedentes.contencion = valor;break;
      case 8:this.antecedentes.placaDescanso = valor;break;
      case 9:this.antecedentes.ortodoncia = valor;break;
      case 10:this.antecedentes.edadOrtodoncia = valor;break;
      case 11:this.antecedentes.menstruacion = valor;break;
      case 12:this.antecedentes.frecuencia = valor;break;
      case 13:this.antecedentes.duracion = valor;break;
      case 14:this.antecedentes.volumen = valor;break;
      case 15:this.antecedentes.embarazos = valor;break;
      case 16:this.antecedentes.abortosInducido = valor;break;
      case 17:this.antecedentes.abortosEspontaneo = valor;break;
      case 18:this.antecedentes.partos = valor;break;
      case 19:this.antecedentes.intestinal = valor;break;
      case 20:this.antecedentes.digestivo = valor;break;
      case 21:this.antecedentes.cardiaco = valor;break;
      case 22:this.antecedentes.urogenital = valor;break;
      case 23:this.antecedentes.respiratorio = valor;break;
      case 24:this.antecedentes.oseo = valor;break;
      case 25:this.antecedentes.fuma = valor;break;
      case 26:this.antecedentes.otrasDrogas = valor;break;
      case 27:this.antecedentes.accidentes = valor;break;
      case 28:this.antecedentes.diabetes = valor;break;
      case 29:this.antecedentes.medicacion = valor;break;
      case 30:this.antecedentes.fracturas = valor;break;
      case 31:this.antecedentes.dolorCabeza = valor;break;
      case 32:this.antecedentes.tiroides = valor;break;
      case 33:this.antecedentes.otros = valor;break;
      case 34:this.antecedentes.alimentacion = valor;break;
      case 35:this.antecedentes.perdidas = valor;break;
    }
  }

  ocultarCirugias(){
    this.verCirugias = !this.verCirugias;
    if(this.verCirugias)this.iconoCirugias = 'arrow_drop_up';
    else this.iconoCirugias = 'arrow_drop_down';
  }

  ocultarOdontologia(){
    this.verOdontologia = !this.verOdontologia;
    if(this.verOdontologia)this.iconoOdontologia = 'arrow_drop_up';
    else this.iconoOdontologia = 'arrow_drop_down';
  }

  ocultarFemenina(){
    this.verFemenina = !this.verFemenina;
    if(this.verFemenina)this.iconoFemenina = 'arrow_drop_up';
    else this.iconoFemenina = 'arrow_drop_down';
  }

  ocultarSistemas(){
    this.verSistemas = !this.verSistemas;
    if(this.verSistemas)this.iconoSistemas = 'arrow_drop_up';
    else this.iconoSistemas = 'arrow_drop_down';
  }

  ocultarOtros(){
    this.verOtros = !this.verOtros;
    if(this.verOtros)this.iconoOtros = 'arrow_drop_up';
    else this.iconoOtros = 'arrow_drop_down';
  }

}
