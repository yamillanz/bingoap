export interface MenuModel {
	idMenu?,
	nombre?,
	descripcion?,
	isActive?,
	idRol?,
	icono?,
	idCliente?,
	email?,
	nombreCompleto?,
	nickname?,
	numeroTelefono?,
	rol?,
	idPais?,
	iso?,
	direccion?,
	fechaNacimiento?,
	id?,
}

export class ApiResponse{
    status:number;
    message:number;
    result: any;
}

