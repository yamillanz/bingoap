// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.


export const environment = {
  production: false,
  apiUrlBalance: 'http://localhost:3060/',
  apiUrlDashoard: 'http://localhost:3050/',
  apiUrlUsuarios: 'http://localhost:3010/users', 
  apiUrlClientes: 'http://localhost:3010/clientes', 
  apiUrlAuth :  "http://localhost:3010/",
  apiUrlPartidas :  "http://localhost:3000/partidas",
  apiUrlPartidasUsers :  "http://localhost:3000/partidas-users",
  apiConfig : "http://localhost:3010/configs-gene",
  apiUploadImgs: "localhost:3050/uploadfile/",
  apiPublicidad : "http://localhost:3011/publicidad",  
  apiSubirImgPublicidad : "http://localhost:3011/publicidad/upload",  
};



/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
