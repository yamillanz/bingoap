export interface Transacciones {
    id?: number;
    
    idUsuarioRecibe?: number;
    idUsuarioEnvia?: number;
    monto?: number;
    idTipoTransaccion?: number;

    acumulado?: number;
    fechaCreacion?: Date;
    tipo_moneda?: number;
    fechaActualizacionEstatus?: Date;
}
