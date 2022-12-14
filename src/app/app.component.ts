
import {ChangeDetectorRef, Component} from '@angular/core';
import {MediaMatcher} from '@angular/cdk/layout';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'SGHC';
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  fillerNav: any = [
    {
      text:'Nuevo Médico',
      url: ''
    },
    {
      text:'Médicos',
      url: ''
    },
    {
      text:'Nuevo Paciente',
      url: '/pacientes/nuevo-paciente'
    },
    {
      text:'Foto de Perfil Paciente',
      url: '/foto/foto-perfil'
    },
    {
      text:'Pacientes',
      url: '/pacientes/listar-pacientes'
    },
    {
      text:'Nueva Consulta TTO',
      url: '/consultas/nueva-consulta'
    },
    {
      text:'Consultas TTO',
      url: '/consultas/listar-consultas'
    },
    {
      text:'Nuevos Estudios',
      url: '/estudios/estudios'
    },
    {
      text:'Estudios',
      url: '/estudios/listar-estudios'
    },
    {
      text:'Cerrar sesión',
      url: ''
    },
]

}
