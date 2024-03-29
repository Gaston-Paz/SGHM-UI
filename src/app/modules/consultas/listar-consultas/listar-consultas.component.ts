import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { forkJoin, Observable } from 'rxjs';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { Tratamiento } from 'src/app/core/interfaces/tratamiento.interface';
import { ErrorService } from 'src/app/shared/services/error.service';
import { NuevoPacienteService } from '../../pacientes/nuevo-paciente/nuevo-paciente.service';
import { UsuarioService } from '../../usuario/usuario.service';
import { ConsultasService } from '../nueva-consulta/consultas.service';
@Component({
  selector: 'app-listar-consultas',
  templateUrl: './listar-consultas.component.html',
  styleUrls: ['./listar-consultas.component.css']
})
export class ListarConsultasComponent implements OnInit, AfterViewInit, OnDestroy {

  dataSource = new MatTableDataSource();
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  displayedColumns: string[] = ['fecha', 'motivo', 'sedestacion','sugerencias','edit'];
  pacientes:Paciente[]=[];
  pacientesFilter: Paciente[] = [];
  tratamientos:Tratamiento[]=[];
  tratamientosFiltrados:Tratamiento[]=[];
  paciente: Paciente = {
    apellido: "",
    celular: "",
    fechaNacimiento: new Date(),
    email: "",
    nacio: "",
    nombre: "",
    ocupacion: "",
    localidad: "",
    otros:"",
    deParte: ""
  };
  form!:FormGroup;
  filtroPaciente:string = '';
  subscribes:any[]=[];
  mail:string='';

  @Output('ocultarTratamientos')ocultarTratamientos = new EventEmitter<Paciente>();

  constructor(private _servicePaciente:NuevoPacienteService,
    private _spinnerService: NgxSpinnerService,
    private _serviceTratamiento:ConsultasService,
    private _formBuilder:FormBuilder,
    private _serviceError:ErrorService,
    public _router:Router,
    private _usuarioService: UsuarioService) { }

  ngOnDestroy(): void {
    this.subscribes.forEach(s => s.unsubscribe());
  }

  ngOnInit(): void {     
    this._serviceTratamiento.editartto = {};
    
    if(this._serviceTratamiento.paciente.idPaciente === undefined || this._serviceTratamiento.paciente.idPaciente === null)this._serviceTratamiento.paciente = {};
    this._servicePaciente.InicializarObjetos();
       
    this.form = this._formBuilder.group({
      paciente: [this._serviceTratamiento.paciente.idPaciente !== undefined && this._serviceTratamiento.paciente.idPaciente !== null ? this._serviceTratamiento.paciente.idPaciente : this.paciente.idPaciente]
    });
    this.mail = localStorage.getItem("SGHC-mail")!;
    let obs: Array<Observable<any>> = [];
    obs.push(this._servicePaciente.ObtenerPacientesSelector());
    if (this.mail !== null) obs.push(this._usuarioService.GetUsuario(this.mail));
    this.subscribes.push(forkJoin(obs).subscribe(resp => {   
       
      this.pacientes = resp[0];
      this.pacientesFilter = resp[0];
      
      if((this._serviceTratamiento.paciente.idPaciente !== undefined && this._serviceTratamiento.paciente.idPaciente !== null && this._serviceTratamiento.paciente.idPaciente! !== 0)) {
        this._serviceTratamiento.paciente = this.pacientes.find(x => x.idPaciente == this._serviceTratamiento.paciente.idPaciente)!;
        this.form.controls.paciente.setValue(this._serviceTratamiento.paciente);
        this.buscarTratamientos();
        this._serviceTratamiento.editartto = {};
      }

      if (this.mail !== null){
        this._serviceError.Usuario = resp[1];
          if(this._serviceError.Usuario.rol === "Admin")this._serviceError.Nav = this._serviceError.fillerNav;
          else this._serviceError.Nav = this._serviceError.fillerNav.filter((f:any) => !f.text.toUpperCase().includes('USUARIO'));
          this._serviceError.muestroMenu = true;
      }
      
    },(error:HttpErrorResponse) => {
      this._serviceError.Error(error);
    }));
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  buscarTratamientos(){
    this.tratamientosFiltrados = [];
    this._serviceTratamiento.ObtenerPorPaciente(this.form.controls.paciente.value).subscribe({
      next: (next) => {
        this.dataSource.data = next.sort((a,b) => {
          if(a.fecha! > b.fecha!)return -1;
          else return 1;
        });        
      },
      error: (error) => {
        this._serviceError.Error(error);
      }
    })     
  }

  applyFilterPaciente(espacio:boolean){
    let filter = this.filtroPaciente + "";
    if(espacio) filter += "";
    this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes));
    if(filter != 'undefined') this.pacientesFilter = JSON.parse(JSON.stringify(this.pacientes.filter(x => x.apellido!.toUpperCase().includes(filter.toUpperCase()) || x.nombre!.toUpperCase().includes(filter.toUpperCase()))));
  }

  EditarTto(element:Tratamiento){       
    this._serviceTratamiento.paciente = {};
    this._serviceTratamiento.editartto = element;
    this._router.navigate(['home/consultas/nueva-consulta']);
  }

  NuevaConsulta(element:number){
    let paciente = this.pacientes.find(x => x.idPaciente === element);
    if(this._router.url.includes('consultas/listar-consultas')){
      this._serviceTratamiento.paciente = paciente!;
      this._router.navigate(['consultas/nueva-consulta']);
    }else{
      this.ocultarTratamientos.emit(paciente);
    }
  }

  
  volverPacientes(ev:any){
    this._servicePaciente.filtro = ev.nombre!;
    this._router.navigate(['home/pacientes/listar-pacientes']);
    
  }

}
