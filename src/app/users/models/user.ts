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
}


export interface User {
   userData : data;
   accessToken? : string;
}
