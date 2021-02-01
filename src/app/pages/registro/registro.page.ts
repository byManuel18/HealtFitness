import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Camera,CameraOptions } from '@ionic-native/camera/ngx';
import { Usuario } from 'src/app/models/Usuario';
import { BBDDServiceService } from 'src/app/services/bbddservice.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  image:string=environment.default_image;
  usertoregis:Usuario={
    id:-1,
    altura:0,
    contraseña:'',
    correo:'',
    foto:'',
    nombre:'',
    peso:0,
    pesodeseado:0
  };
  public formRegis: FormGroup;
  uploadURL: Observable<string>;
  
  
  constructor(private camera:Camera,private formBuilder:FormBuilder,private bbdds:BBDDServiceService,private utils:UtilsServiceService,
    private router:Router) {
        this.formRegis=this.formBuilder.group({
          nombre:['', [Validators.required]],
          email:['',[Validators.required,Validators.email]],
          contraseña:['',[Validators.required,Validators.minLength(8)]],
          altura:['',[Validators.required]],
          peso:['',[Validators.required]],
          peso_deseado:['',[Validators.required]],
        });
    }
  
  ngOnInit() {
  }

   async sendForm(){
    await this.utils.present();
    let proceder:boolean;
    try{
       proceder= await this.utils.CheckEmail(this.formRegis.get('email').value);
       if(proceder){
        this.usertoregis.id=-1;
        this.usertoregis.altura=this.formRegis.get('altura').value;
        this.usertoregis.nombre=this.formRegis.get('nombre').value;
        this.usertoregis.contraseña=this.formRegis.get('contraseña').value;
        this.usertoregis.peso=this.formRegis.get('peso').value;
        this.usertoregis.correo=this.formRegis.get('email').value;
        this.usertoregis.pesodeseado=this.formRegis.get('peso_deseado').value;
        if(this.image===environment.default_image){
          this.usertoregis.foto=this.image;
          try{
            await this.bbdds.createUsuario(this.usertoregis);
            await this.utils.dismiss();
            this.router.navigate(['/']);
          }catch(error){
            await this.utils.dismiss();
            this.utils.presentToast(error,"danger");
          }
        }else{
          this.utils.saveImageFirebaseStorage(environment.filepathimageUser,this.usertoregis.correo,this.image).pipe(
             finalize(async() => {
              this.uploadURL = this.utils.fileRef.getDownloadURL();
              let url=await this.uploadURL.toPromise();
              this.usertoregis.foto=url;
              try{
                await this.bbdds.createUsuario(this.usertoregis);
                await this.utils.dismiss();
                this.router.navigate(['/']);
              }catch(error){
                await this.utils.dismiss();
                this.utils.presentToast(error,"danger");
              }
             })
         ).subscribe();
          
        }
      }else{
        await this.utils.dismiss();
        this.utils.presentToast("Usuario existente","danger");
      }
    }catch(error){
      await this.utils.dismiss();
      console.log(error);
    }
    
   
  }

  

  async takePhoto(sourceType) {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType
    };

   await this.camera.getPicture(options).then((imageData) => {
      this.image ='data:image/png;base64,'+imageData;
    }, (err) => {
      // Handle error
      console.error(err);
    }); 
  }

}
