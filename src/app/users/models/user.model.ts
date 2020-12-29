export interface user {
    id?
    pass?
    email?
    fechaCreacion?
    idRolUsuario?
    activo?
    tipo?
    sesionActiva?
    idCliente?
    emailValido?
    idRol?
    rol?
    idPais?
}

export interface Perfil {
    name: string,
    code: string
}

export interface Actividad {
    name: string,
    code: string
}

export interface SesionActiva {
    name: string,
    code: string
}
