export interface Partidas {
    id?;
    fechaCreacion?;
    valor?;
    activa?;
    fechaPrograma?;
    fechaProgramNoHour?;
    monto?;
    limiteCartones?;
    idSala?;
    idEstatus?: number;
    observaciones?;
    nombre?;
    idDealerPartida?;
    cantidadPartidas?;
    idUserPartida?: number;
   
    cartones_sol?: number;
    disEntrar?: boolean;
}
