interface data {
    id?;
    email?;
    fechaCreacion?;
    activo?;
    tipo?;
    sesionActiva?;
    idCliente?;
    fechaUltimaConeccion?;
    emailValido?,
    rol?,
    idRol?,
}


export interface User {
   userData : data;
   accessToken? : string;
}
