import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Antecedente } from 'src/app/core/interfaces/antecedentes.interface';
import { NuevoPacienteService } from '../nuevo-paciente.service';

@Component({
  selector: 'app-antecedentes',
  templateUrl: './antecedentes.component.html',
  styleUrls: ['./antecedentes.component.css']
})
export class AntecedentesComponent implements OnInit {

  form!: FormGroup;
  antecedentes: Antecedente = {
    abortos:'',
    accidentes:'',
    alimentacion:'',
    cardiaco:'',
    cirugias:'',
    diabetes:false,
    digestivo:'',
    dolorCabeza:'',
    duracion:'',
    edadOrtodoncia:0,
    embarazos:false,
    fracturas:'',
    frecuencia:'',
    implanteInferior:'',
    implanteSuperior:'',
    intestinal:'',
    medicacion:'',
    menstruacion:false,
    ortodoncia:false,
    otros:'',
    partos:'',
    perdidas:'',
    piezasFaltantes:'',
    placaDescanso:false,
    respiratorio:'',
    urogenital:'',
    volumen:'',
    tiroides:''
  }
  @Input("antecedente") antecedente!: Antecedente;
  @Input("hayAntecedente") hayAntecedente: boolean = false;

  constructor(private _formBuilder: FormBuilder,
    private _servicePacienteNuevo: NuevoPacienteService) { }

  ngOnInit(): void {
    this.form = this._formBuilder.group({
      cirugias: [""],
      implanteInferior: [""],
      implanteSuperior: [""],
      ortodoncia: [false],
      EdadOrtodoncia: [""],
      piezasfaltantes: [""],
      placaDescanso: [false],
      menstruacion: [false],
      perdidas: [""],
      frecuencia: [""],
      partos: [""],
      aborto: [""],
      duracion: [""],
      volumen: [""],
      intestinal: [""],
      digestivo: [""],
      cardiaco: [""],
      urogenital: [""],
      respiratorio: [""],
      accidentes: [""],
      medicacion: [""],
      fracturas: [""],
      dolorCabeza: [""],
      tiroides: [""],
      otros: [""],
      alimentacion: [""],
      diabetes: [false],
      embarazos: [false],
    });
    if(this.hayAntecedente)this.antecedentes = this.antecedente;

    console.log(this.antecedente);
    
  }

  CargarAntecedentes(){  
    this._servicePacienteNuevo.CargarAntecedentes(this.antecedentes);
  }

}