import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';
import { AuthServiceService } from '../services/auth-service.service';
import { BBDDServiceService } from '../services/bbddservice.service';
import { UtilsServiceService } from '../services/utils-service.service';
import { finalize } from 'rxjs/operators';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  imagen:string;
  uploadURL: Observable<string>;
  public tasks: FormGroup;
  public darkmode=false;
  public ingles=false;
  constructor(private utils:UtilsServiceService,private auth:AuthServiceService,private routes:Router,
    private formBuilder:FormBuilder,private bbdd:BBDDServiceService,
    public actionSheetController: ActionSheetController,private translateService: TranslateService,
    private theme:ThemeService) { 
      this.tasks=this.formBuilder.group({
        nombre: ['', [Validators.required]],
        altura: ['',[Validators.required,Validators.min(0)]],
        peso: ['',[Validators.required,Validators.min(0)]],
        peso_deseado: ['',[Validators.required,Validators.min(0)]],
      });
  }

  ngOnInit() {
  }

  ionViewDidEnter(){
    this.imagen=this.auth.acout.user.foto;
    this.tasks.get('nombre').setValue(this.auth.acout.user.nombre);
    this.tasks.get('altura').setValue(this.auth.acout.user.altura);
    this.tasks.get('peso').setValue(this.auth.acout.user.peso);
    this.tasks.get('peso_deseado').setValue(this.auth.acout.user.pesodeseado);
    if(this.translateService.currentLang=='es'){
      this.ingles=false;
    }else{
      this.ingles=true;
    }
   
  }

  public Desconectarse(){
    this.auth.logout();
    this.translateService.use(this.translateService.getBrowserLang());
    this.routes.navigate(['login']);
  }

  public async sendForm(){
    await this.utils.present();
    let name:string=this.tasks.get('nombre').value;
    let usertoupdate:Usuario={
      id:this.auth.acout.user.id,
      altura:this.tasks.get('altura').value,
      contraseña:'',
      correo:this.auth.acout.user.correo,
      foto:this.imagen,
      peso:this.tasks.get('peso').value,
      peso_deseado:this.tasks.get('peso_deseado').value,
      nombre:name.toUpperCase()

    }
    if(this.auth.acout.user.foto!=environment.default_image&&this.imagen!=this.auth.acout.user.foto){
      //BORRAR FOTO
      this.utils.deletestorage(environment.filepathimageUser+this.auth.acout.user.correo);
    }
    if(this.imagen===environment.default_image||this.imagen===this.auth.acout.user.foto){
     
      try {
        let rows= await this.bbdd.updateUsuario(usertoupdate);
        this.auth.login(usertoupdate);
        await this.utils.dismiss();
      } catch (error) {
        console.log(error);
        await this.utils.dismiss();
      }
      //Compruebaque se ha updateado bien 
    }else{
     this.utils.saveImageFirebaseStorage(environment.filepathimageUser,this.auth.acout.user.correo,this.imagen).pipe(

      finalize(async() => {
        this.uploadURL = this.utils.fileRef.getDownloadURL();
        let url=await this.uploadURL.toPromise();
        usertoupdate.foto=url;

        try {
          let rows= await this.bbdd.updateUsuario(usertoupdate);
          this.auth.login(usertoupdate);
          await this.utils.dismiss();
        } catch (error) {
          console.log(error);
          await this.utils.dismiss();
        }
        //Compruebaque se ha updateado bien 
        
       })

    ).subscribe();
    }
  }

  public async takePhoto(option:number){
    this.imagen='data:image/png;base64,'+await this.utils.takePhoto(option);
  }

  QuitarFoto(){
    this.imagen=environment.default_image;
  }

  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escoger imagen',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Galeria',
        icon: 'image-outline',
        handler: () => {
         this.takePhoto(0);
        }
      }, {
        text: 'Cámara',
        icon: 'camera-outline',
        handler: () => {
          this.takePhoto(1);
        }
      }, {
        text: 'Quitar foto',
        icon: 'close-circle-outline',
        handler: () => {
         this.QuitarFoto();
        }
      }]
    });
    await actionSheet.present();
  }


  async changeLenguaje($event){
    let idioma:string='';
    if($event.detail.checked){
      this.translateService.use('en');
      idioma='en';
    }else{
      this.translateService.use('es');
      idioma='es';
    }
    await this.auth.cambiarIdioma(idioma);
  }

  private enableDark(){
    this.theme.enableDark();
    this.auth.changeTheme(1);
  }
  private enableLight(){
    this.theme.enableLight();
    this.auth.changeTheme(0);
  }

  changeTheme($event){
    console.log($event)
    if($event.detail.checked){
      this.darkmode=true;
      this.enableDark();
    }else{
      this.darkmode=false;
      this.enableLight();
    }
  }     
}
