import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Producto } from 'src/app/models/Producto';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BBDDServiceService } from 'src/app/services/bbddservice.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';
import { environment } from 'src/environments/environment';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-add-producto',
  templateUrl: './edit-add-producto.page.html',
  styleUrls: ['./edit-add-producto.page.scss'],
})
export class EditAddProductoPage implements OnInit {
  producto:Producto;
   d_i:string=environment.default_image;
  public tasks: FormGroup;
  imagen:string='';
  uploadURL: Observable<string>;
  constructor(private formBuilder:FormBuilder,private modalController: ModalController,private utils:UtilsServiceService,private navParams:NavParams,
    private auth:AuthServiceService,private bbdd:BBDDServiceService) {
    this.producto=this.navParams.get('produ');
    this.tasks=this.formBuilder.group({
      nombre:['', [Validators.required]],
      porcion:['', [Validators.required,Validators.min(0)]],
      calorias:['', [Validators.required,Validators.min(0)]],
      g_s:['', [Validators.required,Validators.min(0)]],
      g_i:['', [Validators.required,Validators.min(0)]],
      carbo:['', [Validators.required,Validators.min(0)]],
      azucar:['', [Validators.required,Validators.min(0)]],
      prote:['', [Validators.required,Validators.min(0)]],
      fibra:['', [Validators.required,Validators.min(0)]],
      sal:['', [Validators.required,Validators.min(0)]],
    });
   }

  ngOnInit() {
    console.log(this.producto);
    if(this.producto!=null){
      if(this.producto.id===-1){
        this.imagen=environment.default_image;
      }else{
        this.imagen=this.producto.foto;
        this.tasks.get('nombre').setValue(this.producto.nombre);
        this.tasks.get('porcion').setValue(this.producto.porcion);
        this.tasks.get('calorias').setValue(this.producto.energia);
        this.tasks.get('g_s').setValue(this.producto.grasas_saturadas);
        this.tasks.get('g_i').setValue(this.producto.grasas_insaturadas);
        this.tasks.get('carbo').setValue(this.producto.carbohidratos);
        this.tasks.get('azucar').setValue(this.producto.azucar);
        this.tasks.get('prote').setValue(this.producto.proteinas);
        this.tasks.get('fibra').setValue(this.producto.fibra);
        this.tasks.get('sal').setValue(this.producto.sal);
      }
    }
  }

  ionViewDidEnter(){
    

  }

  public async sendForm(){
    await this.utils.present();
    let name:string;
    let code;
    let code2:string;
    name=this.tasks.get('nombre').value;
    let pronew:Producto={
      id:this.producto.id,
      azucar:this.tasks.get('azucar').value,
      carbohidratos:this.tasks.get('carbo').value,
      energia:this.tasks.get('calorias').value,
      fibra:this.tasks.get('fibra').value,
      foto:this.imagen,
      grasas_insaturadas:this.tasks.get('g_i').value,
      grasas_saturadas:this.tasks.get('g_s').value,
      id_usuario:this.auth.acout.user.id,
      nombre:name.toUpperCase(),
      porcion:this.tasks.get('porcion').value,
      proteinas:this.tasks.get('prote').value,
      sal:this.tasks.get('sal').value
    }

    if(this.producto.id>0&&this.imagen!=environment.default_image&&this.imagen!=this.producto.foto){
      code=this.producto.carbohidratos+this.producto.energia+this.producto.fibra+this.producto.grasas_insaturadas+this.producto.grasas_saturadas+this.producto.porcion+this.producto.proteinas+this.producto.sal
      code2=code+name.toUpperCase();
      this.utils.deletestorage(environment.filepathimageProducto+this.producto.id_usuario+code2)
    }
    
    if(this.imagen===environment.default_image||this.imagen===this.producto.foto){
      
      if(this.producto.id<0){
        try {
          let num=await this.bbdd.createProducto(pronew);
          //--->>>>>>> Añadido, vigilar coorrecto
          await this.utils.dismiss();
          this.tasks.setValue({
            nombre:'',
            porcion:'',
            calorias:'',
            g_s:'',
            g_i:'',
            carbo:'',
            azucar:'',
            prote:'',
            fibra:'',
            sal:'',
          });
          this.imagen=environment.default_image;
        } catch (error) {
          await this.utils.dismiss();
        }
      }else{
        let num=await this.bbdd.updateProducto(pronew);
         //--->>>>>>> Update, vigilar coorrecto
         await this.utils.dismiss();
         this.modalController.dismiss();
      }
    }else{
      code=pronew.carbohidratos+pronew.energia+pronew.fibra+pronew.grasas_insaturadas+pronew.grasas_saturadas+pronew.porcion+pronew.proteinas+pronew.sal
      code2=code+name.toUpperCase();
      this.utils.saveImageFirebaseStorage(environment.filepathimageProducto,this.auth.acout.user.id+code2,this.imagen).pipe(

        finalize(async() => {
          this.uploadURL = this.utils.fileRef.getDownloadURL();
          let url=await this.uploadURL.toPromise();
          pronew.foto=url;
          try{
            if(pronew.id<0){
              let num=await this.bbdd.createProducto(pronew);
              await this.utils.dismiss();
              this.tasks.setValue({
                nombre:'',
                porcion:'',
                calorias:'',
                g_s:'',
                g_i:'',
                carbo:'',
                azucar:'',
                prote:'',
                fibra:'',
                sal:'',
              });
              this.imagen=environment.default_image;
              //--->>>>>>> Añadido, vigilar coorrecto
             
              
            }else{
              let num=await this.bbdd.updateProducto(pronew);
              //--->>>>>>> Update, vigilar coorrecto
              await this.utils.dismiss();
              this.modalController.dismiss();
            }
          }catch(error){
            /*await this.utils.dismiss();
           */
            await this.utils.dismiss();
          }
         })

      ).subscribe();
    }    
    
  }

  public Salir(){
    this.modalController.dismiss();
  }

  public async takePhoto(option:number){
    this.imagen='data:image/png;base64,'+await this.utils.takePhoto(option);
  }

  public async QuitarFoto(){
    this.imagen=environment.default_image;
  }

  DevolverFoto(){
    this.imagen=this.producto.foto;
  }
}
