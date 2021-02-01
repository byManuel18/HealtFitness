import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
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
  constructor(private translateService:TranslateService,public loadingController: LoadingController,private storage:AngularFireStorage,
    public toastController: ToastController,private bbdds:BBDDServiceService) { }


  iniciarLenguaje(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    console.log(this.translateService.currentLang);
    try {
      this.translateService.use(this.translateService.getBrowserLang());
    } catch (error) {
      
    }
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

  private b64toBlob(b64Data, contentType, sliceSize) {
      contentType = contentType || '';
      sliceSize = sliceSize || 512;

      var byteCharacters = atob(b64Data);
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
}
