import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { SnackService } from 'src/app/shared/services/snack.service';

@Component({
  selector: 'app-estudios',
  templateUrl: './estudios.component.html',
  styleUrls: ['./estudios.component.css']
})
export class EstudiosComponent implements OnInit, OnDestroy {

  pacientes:Paciente[]=[];
  form!:FormGroup;
  previsualizacionFoto: string[] = [];
  filtroPaciente:string = '';
  pacientesFilter: Paciente[] = [];
  subscribes:any[]=[];
  //Chips
  addOnBlur:boolean = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  nombresNuevos:string[] = [];
  cantiArchivos:number = 0;

  constructor(private _formBuilder:FormBuilder,
    private _servicePaciente:NuevoPacienteService,
    private _snackBar: MatSnackBar,
    private _spinnerService: NgxSpinnerService,
    private sanitizer: DomSanitizer,
    private _snack:SnackService) { }

    ngOnDestroy(): void {
      this.subscribes.forEach(s => s.unsubscribe());
    }

  ngOnInit(): void {
    this._servicePaciente.extensiones = [];
    this.form = this._formBuilder.group({
      paciente: [,[Validators.required]]
    });
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientes());
    this.subscribes.push(forkJoin(obs).subscribe(resp => {    
      this.pacientes = resp[0];      
      this.pacientesFilter = resp[0];      
    },(error:HttpErrorResponse) => {
      console.log(error);
      this._snack.Mensaje(error.error.message,'error');
    }));
  }

  GuardarEstudios(){
    if(this._servicePaciente.estudios.length !== this.nombresNuevos.length){
      this._snack.Mensaje("La cantidad de archivos debe coincidir con la cantidad de nombres ingresados",'error');
    }else{
    let obs: Array<Observable<any>> = [];
    if (this._servicePaciente.estudios.length > 0) {
      this._servicePaciente.estudios.forEach((est,index) => {
        let formDatas = new FormData();
        formDatas.append("foto", est);
        obs.push(
          this._servicePaciente.GuardarFoto(
            formDatas,
            this.form.controls.paciente.value,
            true,
            this.nombresNuevos[index],
            this._servicePaciente.extensiones[index]
          )
        );

      });
      this.subscribes.push(forkJoin(obs).subscribe(resp => {
        this._snack.Mensaje("El estudio se guardó con éxito",'success');
      },(error:HttpErrorResponse) => {
        console.log(error);
        this._snack.Mensaje(error.error.message,'error');
      }));
    }
  }
  }

  GetEstudio(){
    return this._servicePaciente.estudios.length > 0;
  }

  applyFilterPaciente(espacio:boolean){
    let filter = this.filtroPaciente + "";
    if(espacio) filter += "";
    this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes));
    if(filter != 'undefined') this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes.filter(x => x.apellido.toUpperCase().includes(filter.toUpperCase()) || x.nombre.toUpperCase().includes(filter.toUpperCase()))));
  }

  //Chips
  remove(nombre:string){
    const index = this.nombresNuevos.indexOf(nombre);
    if(index >= 0)this.nombresNuevos.splice(index,1); 
  }

  add(ev:MatChipInputEvent){
    const value = (ev.value || '').trim();
    if(value)this.nombresNuevos.push(ev.value);
    ev.chipInput!.clear();
    
  }
}
