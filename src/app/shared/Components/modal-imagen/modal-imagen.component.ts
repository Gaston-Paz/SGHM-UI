import { Component, OnInit, Inject } from '@angular/core';
import { Estudios } from 'src/app/core/interfaces/estudio.interface';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  element:Estudios = {
    fecha: new Date(),
    idEstudio: 0,
    nombreArchivo: '',
    tipo:'',
    paciente: {}
  }
  paciente:Paciente = {};
  ruta:string='';

  constructor(@Inject(MAT_DIALOG_DATA) public data:any,
  private _dialogRef: MatDialogRef<ModalImagenComponent>) { }

  ngOnInit(): void {
    this.element = this.data.element;
    console.log(this.element);
    
    this.paciente = this.data.paciente;
  }

}
