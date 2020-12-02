interface data {
    id;
    email;
    fechaCreacion?;
    activo;
    tipo?;
    sesionActiva;
    idCliente?;
    fechaUltimaConeccion?;
}


export interface User {
   userData : data;
   accessToken: string;

}
