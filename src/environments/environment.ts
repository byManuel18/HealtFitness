// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
 firebaseConfig:{
    apiKey: "AIzaSyBQgcoZLQExk2Na3u2dB1DuBaFX1lBLYJo",
    authDomain: "healtfitness-a2368.firebaseapp.com",
    projectId: "healtfitness-a2368",
    storageBucket: "healtfitness-a2368.appspot.com",
    messagingSenderId: "404139028543",
    appId: "1:404139028543:web:6ddb36183dca5a5175888a",
    measurementId: "G-2LKFSRY801"
  },
  default_image:'https://firebasestorage.googleapis.com/v0/b/healtfitness-a2368.appspot.com/o/no-disponible.png?alt=media&token=8f168b49-e0bd-4038-9c04-c9af6b13edba',
  apikey:'&tiBKuiQV@2Y(tZ5)p.)NXj8&/Qj7i',
  endpoint:'https://healtfitness.herokuapp.com/',
  getUserbyEmail:'usuario/search/',
  getProductobyUser:'productos/usuario/',
  getProductosUserAdmin:'productos/usuario-admin/',
  createUser:'usuario/add',
  createProducto:'producto/add',
  updateProducto:'productos/update/',
  deleteproduct:'producto/delete/',
  updateusuario:'usuario/update/',
  addrutina:'rutina/add',
  deleteRutina:'rutina/delete/',
  updaterutina:'rutina/update/',
  addejercicio:'ejercicio/add',
  updateejercicio:'ejercicio/update/',
  deleteejercicio:'ejercicio/delete/',
  getejerciciosbyUser:'ejercicio/',
  productocantidadrutina:'productos/usuario-rutina/',
  filepathimageUser:'UsersImages/imageuser_',
  filepathimageProducto:'UsersProducto/imageprod_',
  filepathvideosEjerciciosUsuario:'UsersVideos/videoEjer_',
  desayuno:1,
  almuerzo:2,
  cena:3,
  aperitivo:4,
  videoddisponible:'../../../assets/disponible video.png',
  videoddisNOponible:'../../../assets/youtube-caidoedit.png'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
