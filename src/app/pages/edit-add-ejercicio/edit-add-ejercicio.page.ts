import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { env } from 'process';
import { Observable } from 'rxjs';
import { Ejercicio } from 'src/app/models/Ejercicio';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BBDDServiceService } from 'src/app/services/bbddservice.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-add-ejercicio',
  templateUrl: './edit-add-ejercicio.page.html',
  styleUrls: ['./edit-add-ejercicio.page.scss'],
})
export class EditAddEjercicioPage implements OnInit {
  ejercicio:Ejercicio;
  public tasks: FormGroup;
  video:string='';
  uploadURL: Observable<string>;
  imagen:string;
  
  
  constructor(private formBuilder:FormBuilder,private modalController: ModalController,private utils:UtilsServiceService,private navParams:NavParams,
    private auth:AuthServiceService,private bbdd:BBDDServiceService) {
      this.ejercicio=this.navParams.get('ejercicioto');
      
      this.tasks=this.formBuilder.group({
        nombre:['', [Validators.required]],
        series:['', [Validators.required,Validators.min(1),Validators.pattern("^\\d+$")]],
        repeticiones:['', [Validators.required,Validators.min(1),Validators.pattern("^\\d+$")]],
      });
     }

  ngOnInit() {
    if(this.ejercicio!=null){
      this.video=this.ejercicio.url;
      if(this.video!=''){
        this.imagen=environment.videoddisponible;
      }else{
        this.imagen=environment.videoddisNOponible;
      }
      if(this.ejercicio.id>0){
        this.tasks.get('nombre').setValue(this.ejercicio.nombre);
        this.tasks.get('series').setValue(this.ejercicio.series);
        this.tasks.get('repeticiones').setValue(this.ejercicio.repeticiones);
      }
    }
  }

  public async sendForm(){

    await this.utils.present();
    let nombre:string=this.tasks.get('nombre').value;
    let code:string=Math.random().toString(36).substring(2);
    let ejercicionew:Ejercicio={
      id:this.ejercicio.id,
      denominacion:this.ejercicio.denominacion,
      id_usuario:this.auth.acout.user.id,
      nombre:nombre.toUpperCase(),
      url:this.video,
      repeticiones:this.tasks.get('repeticiones').value,
      series:this.tasks.get('series').value
    }

    if(this.ejercicio.id>0&&this.ejercicio.url!=''&&this.video!=this.ejercicio.url){
      this.utils.deletestorageVideo(environment.filepathvideosEjerciciosUsuario+this.ejercicio.denominacion);
    }

    if(this.video===''||this.video===this.ejercicio.url){
    
      if(this.ejercicio.id<0){
        try {
          let num=await this.bbdd.createEjercicio(ejercicionew);
          //--->>>>>>> Añadido, vigilar coorrecto
          await this.utils.dismiss();
          await this.utils.presentToast(this.utils.TranslateFrase('ejercicio_añadido'),"success");
          this.tasks.setValue({
            nombre:'',
            series:'',
            repeticiones:''
          });
          this.video='';
        } catch (error) {
          await this.utils.dismiss();
          await this.utils.presentToast(this.utils.TranslateFrase('error_al_guardar_ejercicio'),"danger");
        }
      }else{
        try {
          let num=await this.bbdd.updateEjercicio(ejercicionew);
         //--->>>>>>> Update, vigilar coorrecto
         await this.utils.dismiss();
         await this.utils.presentToast(this.utils.TranslateFrase('ejercicio_editado'),"success");
         this.modalController.dismiss();
        } catch (error) {
          await this.utils.dismiss();
          await this.utils.presentToast(this.utils.TranslateFrase('error_aleditar_ejer'),"success");
        }
        

      }
    
    }else{
      ejercicionew.denominacion=code;
      this.utils.saveVideoFirebaseStorage(environment.filepathvideosEjerciciosUsuario,code,this.video).pipe(

        finalize(async() => {
          this.uploadURL = this.utils.fileRef.getDownloadURL();
          let url=await this.uploadURL.toPromise();
          ejercicionew.url=url;
          try{
            if(ejercicionew.id<0){
              let num=await this.bbdd.createEjercicio(ejercicionew);
              await this.utils.dismiss();
              this.tasks.setValue({
                nombre:'',
                series:'',
                repeticiones:'',
              });
              this.video='';
              //--->>>>>>> Añadido, vigilar coorrecto
              await this.utils.presentToast(this.utils.TranslateFrase('ejercicio_añadido'),"success");
              
            }else{
              let num=await this.bbdd.updateEjercicio(ejercicionew);
              //--->>>>>>> Update, vigilar coorrecto
              await this.utils.dismiss();
              await this.utils.presentToast(this.utils.TranslateFrase('ejercicio_editado'),"success");
              this.modalController.dismiss();
            }
          }catch(error){
            /*await this.utils.dismiss();
           */
            await this.utils.dismiss();
            await this.utils.presentToast(this.utils.TranslateFrase('error_al_guardar_ejercicio'),"dunger");
          }
         })

      ).subscribe();
    }
  }

  Salir(){
    this.modalController.dismiss();
  }

  public async takeVideo(option:number){
    this.video='data:video/mp4;base64,'+await this.utils.takeVideo(option);
    if(this.video!='data:video/mp4;base64,'&&this.video!=''){
      this.imagen=environment.videoddisponible;
    }
  }

  DeleteVideo(){
    this.video='';
    this.imagen=environment.videoddisNOponible;
    
  }

  async DevolverVideo(){
    if(this.video!=this.ejercicio.url){
      this.video=this.ejercicio.url;
      if(this.video!=''){
        this.imagen=environment.videoddisponible;
      }else{
        this.imagen=environment.videoddisNOponible;
      }
      await this.utils.presentToast("Se ha vuelvo a poner el video anterior","success");
    }

  }

}
