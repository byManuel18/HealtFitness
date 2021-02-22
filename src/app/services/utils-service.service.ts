import { Injectable } from '@angular/core';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { AngularFireStorage } from 'angularfire2/storage';
import { Observable } from 'rxjs';
import { Usuario } from '../models/Usuario';
import { BBDDServiceService } from './bbddservice.service';
@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {
  isLoading = true;
  uploadProgress: Observable<number>;
  uploadURL: Observable<string>;
  fileRef:any;
  options : InAppBrowserOptions = {
    location : 'yes',//Or 'no' 
    hidden : 'no', //Or  'yes'
    clearcache : 'yes',
    clearsessioncache : 'yes',
    zoom : 'yes',//Android only ,shows browser zoom controls 
    hardwareback : 'yes',
    mediaPlaybackRequiresUserAction : 'no',
    shouldPauseOnSuspend : 'no', //Android only 
    closebuttoncaption : 'Close', //iOS only
    disallowoverscroll : 'no', //iOS only 
    toolbar : 'yes', //iOS only 
    enableViewportScale : 'no', //iOS only 
    allowInlineMediaPlayback : 'no',//iOS only 
    presentationstyle : 'pagesheet',//iOS only 
    fullscreen : 'yes',//Windows only    
};
  constructor(private translateService:TranslateService,public loadingController: LoadingController,private storage:AngularFireStorage,
    public toastController: ToastController,private bbdds:BBDDServiceService,public alertController: AlertController,
    private vibration: Vibration,private camera:Camera, private iab: InAppBrowser
    ) { }


  iniciarLenguaje(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    console.log(this.translateService.currentLang);
    try {
      this.translateService.use(this.translateService.getBrowserLang());
    } catch (error) {
      
    }
  }

  public Vibrar() {
    this.vibration.vibrate(1000);
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create().then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    return null;
  }

  async presentToast(msg: string, col: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: col,
      duration: 2000,
      position: "top",
    });
    toast.present();
  }

  async presentAlert(css:string,header:string,subheader:string,message:string,buttons:string[]) {
    const alert = await this.alertController.create({
      cssClass: css,
      header: header,
      subHeader: subheader,
      message: message,
      buttons: buttons
    });
    await alert.present();
  }

  private b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = window.atob(b64Data);
      var byteArrays = [];

      for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
          var slice = byteCharacters.slice(offset, offset + sliceSize);

          var byteNumbers = new Array(slice.length);
          for (var i = 0; i < slice.length; i++) {
              byteNumbers[i] = slice.charCodeAt(i);
          }

          var byteArray = new Uint8Array(byteNumbers);

          byteArrays.push(byteArray);
      }

    var blob = new Blob(byteArrays, {type: contentType});
    return blob;
  }

    saveImageFirebaseStorage(filepaht:string,name_image:string,imagen:string):Observable<firebase.storage.UploadTaskSnapshot>{
    const ruta_image=filepaht+name_image+'.png';
    this.fileRef= this.storage.ref(ruta_image);
    var block = imagen.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    const task=this.storage.upload(ruta_image,this.b64toBlob(realData,contentType,512));
    this.uploadProgress = task.percentageChanges();
    return task.snapshotChanges();
  }

  saveVideoFirebaseStorage(filepaht:string,name_image:string,video:string):Observable<firebase.storage.UploadTaskSnapshot>{
    const ruta_image=filepaht+name_image+'.mp4';
    this.fileRef= this.storage.ref(ruta_image);
    var block = video.split(";");
    var contentType = block[0].split(":")[1];
    var realData = block[1].split(",")[1];
    const task=this.storage.upload(ruta_image,this.b64toBlob(realData,contentType,512));
    this.uploadProgress = task.percentageChanges();
    return task.snapshotChanges();
  }

  deletestorage(ruta:string){
    var desertRef = this.storage.ref(ruta+'.png');
  
  // Delete the file
    desertRef.delete().subscribe(function() {
      // File deleted successfully
    });
  }

  deletestorageVideo(ruta:string){
    var desertRef = this.storage.ref(ruta+'.mp4');
  
  // Delete the file
    desertRef.delete().subscribe(function() {
      // File deleted successfully
    });
  }

  public async CheckEmail(email:string):Promise<boolean>{
    let user:Usuario;
    let errort:string;
    try{
      user= await this.bbdds.getUsuariobyEmail(email);
    }catch(error){
      errort=error;
    }
    return new Promise((resolve,reyect)=>{
      if(errort==null){
        if(user==null){
          resolve(true);
        }else{
          resolve(false);
        }
      }else{
        reyect(errort);
      }
      
    });

  }

async presentAlertConfirm(css:string,header:string,message:string):Promise<boolean>{
 this.Vibrar();
 return new Promise(async (resolve) => {
    const alert = await this.alertController.create({
      cssClass: css,
      header: header,
      message: message,
      buttons: [
        {
          text: 'CANCELAR',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Cancel');
            resolve(false)
          }
        }, {
          text: 'ACEPTAR',
           handler: () => {
            resolve(true);
            console.log('Accep');
          }
        }
      ]
    });
    await alert.present();
  });
   
  }

  async takePhoto(sourceType):Promise<any>{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType
    };

   return this.camera.getPicture(options);
  }

  async takeVideo(sourceType):Promise<any>{
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      mediaType: this.camera.MediaType.VIDEO,
      sourceType
    };

   return this.camera.getPicture(options);
  }
  
public TranslateFrase(totraduce:string):string{

  return this.translateService.instant(totraduce);  
  }

  
public reproducirVideo(url:string){
       let target = "_blank";
      this.iab.create(url,target,this.options);
}
}



/*
.then((imageData) => {
      let image ='data:image/png;base64,'+imageData;
    }, (err) => {
      // Handle error
      console.error(err);
    }); 
*/
