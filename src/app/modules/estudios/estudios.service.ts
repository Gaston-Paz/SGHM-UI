import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Paciente } from 'src/app/core/interfaces/datos-personales.interface';
import { Estudios } from 'src/app/core/interfaces/estudio.interface';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class EstudiosService {

  paciente: Paciente = {
    apellido: "",
    fechaNacimiento: new Date(),
    nacio: "",
    nombre:''
  };

  constructor(private _httpClient: HttpClient) { }

  ObtenerEstudios() {
    return this._httpClient.get<Estudios[]>(environment.url+"/api/estudios");
  }

  GuardarEstudio(estudio: FormData, idPaciente: number, nombre:string, tipo:string) {       
    return this._httpClient.post<Estudios>(
      environment.url + "/api/estudios/" + idPaciente + "/" + nombre + "/" + tipo,
      estudio
    );
  }

  ObtenerPorPaciente(paciente:Paciente) {
    return this._httpClient.patch<Estudios[]>(
      environment.url + "/api/estudios/obtenerPorPaciente",paciente
    );
  }
}
