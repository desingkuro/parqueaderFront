export interface UserRegister {
    codRol: number;
    documentoUsuario: string;
    nombresUsuario: string;
    apellidosUsuario: string;
    generoUsuario: string;
    fechaNacimientoUsuario: string;
    telefonoUsuario: string;
}

export interface Acceso {
    correo: string;
    clave: string;
    codUsuario: number;
    uuid: string;
}

export interface Register {
    codRol: number;
    documentoUsuario: string;
    nombresUsuario: string;
    apellidosUsuario: string;
    generoUsuario: string;
    fechaNacimientoUsuario: string;
    telefonoUsuario: string;
    correo: string;
    clave: string;
    uuid: string;
}
