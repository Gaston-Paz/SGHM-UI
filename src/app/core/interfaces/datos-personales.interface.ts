export interface Paciente{
    idPaciente?:number;
    nombre?: string,
    apellido?: string,
    nombreYapellido?:string,
    fechaNacimiento?: Date,
    nacio?: string,
    otros?: string,
    ocupacion?: string,
    localidad?: string,
    email?: string,
    celular?: string,
    deParte?: string,
    fotoPerfil?: FormData,
    edad?:number;
}