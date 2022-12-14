import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AltaPaciente } from "src/app/core/interfaces/alta-paciente.interface";
import { Antecedente } from "src/app/core/interfaces/antecedentes.interface";
import { ConsultaInicial } from "src/app/core/interfaces/consulta-inicial.interface";
import { Paciente } from "src/app/core/interfaces/datos-personales.interface";
import { Tratamiento } from "src/app/core/interfaces/tratamiento.interface";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: "root",
})
export class NuevoPacienteService {
  datosPersonales: Paciente = {
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
  datosPersonlesCompletos: boolean = false;

  consultaInicial: ConsultaInicial = {
    antiguedad: "",
    motivo: "",
    covid: false,
    fecha: new Date(),
    localizacion: ""
  };
  consultaInicialCompleta: boolean = false;

  antecedente: Antecedente = {
    diabetes: false,
    embarazos: false,
    menstruacion: false,
    ortodoncia: false,
    placaDescanso: false,
    contencion: false
  };

  consulta: Tratamiento = {
    especifico:'',
    fecha: new Date(),
    idPaciente: 0,
    motivo: '',
    proximoTurnoIndicado: new Date(),
    sedestacion: '',
    sugerencias: ''
  }
  tratamientoCompleto:boolean = false;

  imagen: Blob = new Blob();

  alta: AltaPaciente = {
    paciente: {
      apellido: "",
      celular: "",
      fechaNacimiento: new Date(),
      email: "",
      nacio: "",
      nombre: "",
      ocupacion: "",
      localidad: "",
      fotoPerfil: "",
      otros:"",
      deParte: ""
    },
    consultaInicial: {
      antiguedad: "",
      motivo: "",
      covid: false,
      fecha: new Date(),
      localizacion: ""
    },
    antecedente: {
      diabetes: false,
      embarazos: false,
      menstruacion: false,
      ortodoncia: false,
      placaDescanso: false,
      contencion: false
    },
    tratamiento: {
      especifico:'',
      fecha: new Date(),
      idPaciente: 0,
      motivo: '',
      proximoTurnoIndicado: new Date(),
      sedestacion: '',
      sugerencias: ''
    }
  };

  estudios: Blob[] = [];
  extensiones:string[]=[];

  constructor(private _httpClient: HttpClient) {}

  CargarDatosPersonales(dato: any, campo: number, valido: boolean) {
    switch (campo) {
      case 1:
        this.datosPersonales.nombre = dato;
        break;
      case 2:
        this.datosPersonales.apellido = dato;
        break;
      case 3:
        let fechaaux = new Date(dato);
        let fecha = new Date(
          fechaaux.getFullYear() +
            "/" +
            (fechaaux.getMonth() + 1) +
            "/" +
            (fechaaux.getDate())
        );
        
        this.datosPersonales.fechaNacimiento = fecha;
        break;
      case 4:
        this.datosPersonales.celular = dato;
        break;
      case 5:
        this.datosPersonales.email = dato;
        break;
      case 6:
        this.datosPersonales.ocupacion = dato;
        break;
      case 7:
        this.datosPersonales.nacio = dato;
        break;
      case 8:
        this.datosPersonales.localidad = dato;
        break;
        case 9:
        this.datosPersonales.otros = dato;
        break;
        case 10:
        this.datosPersonales.deParte = dato;
        break;
    }
    this.datosPersonlesCompletos = valido;
    
  }

  CargarConsultaInicial(dato: any, campo: number, valido: boolean) {
    switch (campo) {
      case 1:
        this.consultaInicial.actividadFisica = dato;
        break;
      case 2:
        this.consultaInicial.antiguedad = dato;
        break;
      case 3:
        let fechaaux = new Date(dato);
        let fecha = new Date(
          fechaaux.getFullYear() +
            "/" +
            (fechaaux.getMonth() + 1) +
            "/" +
            (fechaaux.getDate())
        );
        this.consultaInicial.fecha = fecha;
        break;
      case 4:
        this.consultaInicial.atenua = dato;
        break;
      case 5:
        this.consultaInicial.caracteristica = dato;
        break;
      case 6:
        this.consultaInicial.intensidad = dato;
        break;
      case 7:
        this.consultaInicial.irradiacion = dato;
        break;
      case 8:
        this.consultaInicial.localizacion = dato;
        break;
      case 9:
        this.consultaInicial.motivo = dato;
        break;
      case 10:
        this.consultaInicial.covid = !this.consultaInicial.covid;
        break;
        case 11:
          let fechaAux = new Date(dato);
        let fechas = new Date(
          fechaAux.getFullYear() +
            "/" +
            (fechaAux.getMonth() + 1) +
            "/" +
            (fechaAux.getDate())
        );
          this.consultaInicial.fechaCovid = fechas;
        break;
          case 12:
            this.consultaInicial.otros = dato;
            break;
    }
    this.consultaInicialCompleta = valido;
    
  }

  CargarAntecedentes(antecedentes: Antecedente) {
    this.antecedente = antecedentes;    
  }

  FormValid() {
    if (this.datosPersonlesCompletos && this.consultaInicialCompleta && this.tratamientoCompleto) {
      this.alta.paciente = this.datosPersonales;
      this.alta.consultaInicial = this.consultaInicial;
      return true;
    }
    return false;
  }

  InicializarObjetos(){
    this.datosPersonales = {
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
    this.consultaInicial = {
      antiguedad: "",
      motivo: "",
      covid: false,
      fecha: new Date(),
      localizacion: ""
    };
    this.antecedente = {
      diabetes: false,
      embarazos: false,
      menstruacion: false,
      ortodoncia: false,
      placaDescanso: false,
      contencion: false
    };
    this.estudios = [];
    this.consulta = {
      especifico:'',
      fecha: new Date(),
      idPaciente: 0,
      motivo: '',
      proximoTurnoIndicado: new Date(),
      sedestacion: '',
      sugerencias: ''
    }
  }

  //M??todos HTTP
  GuardarFoto(formData: FormData, idPaciente: number, esEstudio: boolean, nombreArchivo:string, extension:string) {    
    return this._httpClient.post<Paciente>(
      environment.url + "/paciente/" + idPaciente + "/" + esEstudio + "/" + nombreArchivo + "/" + extension,
      formData
    );
  }

  ObtenerPacientes() {
    return this._httpClient.get<Paciente[]>("http://localhost:8080/paciente");
  }

  GuardarPaciente() {
    this.alta.paciente = this.datosPersonales;
    this.alta.antecedente = this.antecedente;
    this.alta.consultaInicial = this.consultaInicial;
    this.consulta.motivo = this.consultaInicial.motivo + " - " + this.consultaInicial.localizacion;
    this.consulta.fecha = this.consultaInicial.fecha;
    this.alta.tratamiento = this.consulta;
    console.log(this.alta);
    
    return this._httpClient.post<Paciente>(
      environment.url + "/paciente/",
      this.alta
    );
  }

  ActualizarDatosPersonales(datos:Paciente) {
    return this._httpClient.post<Paciente>(
      environment.url + "/paciente/actualizar",
      datos
    );
  }

}
