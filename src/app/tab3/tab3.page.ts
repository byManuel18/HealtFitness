import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UtilsServiceService } from '../services/utils-service.service';
import { finalize } from 'rxjs/operators';
import { Ejercicio } from '../models/Ejercicio';
import { AuthServiceService } from '../services/auth-service.service';
import { BBDDServiceService } from '../services/bbddservice.service';
import { ModalController } from '@ionic/angular';
import { EditAddEjercicioPage } from '../pages/edit-add-ejercicio/edit-add-ejercicio.page';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit{
  
  items:Ejercicio[]=[];
  constructor(private utils:UtilsServiceService,private bbddd: BBDDServiceService, private auth: AuthServiceService,
    private modalController:ModalController) {}


  ngOnInit(): void {
    this.cargaDatos();
  }


 async cargaDatos($event=null){
    this.items=[];
    if ($event == null) {
      await this.utils.present();
    }
    try {
      let arrayitems: Ejercicio[] = await this.bbddd.getAllEjerciciosbyUser(this.auth.acout.user.id);
      this.items = arrayitems;
      console.log(this.items);
    } catch (error) {
      this.items = [];
      console.log(error);
    }
    if ($event) {
      $event.target.complete();
    }
    if ($event == null) {
      await this.utils.dismiss();
    }
  }

  async search($event){
    let cadena:string=$event.srcElement.value;
    if(cadena!=null){
      this.items=[];
      try {
        this.items= await this.bbddd.getAllEjerciciosbyUserbyName(this.auth.acout.user.id,cadena.toUpperCase());
      } catch (error) {
        this.cargaDatos();
      }

    }else{
      this.cargaDatos();
    }
  }

  async editAddEjercicio(ejercicio:Ejercicio){
    let ejer:Ejercicio;
    if(ejercicio!=null){
      ejer=ejercicio;
    }else{
      ejer={
        id:-1,
        id_usuario:this.auth.acout.user.id,
        denominacion:'',
        nombre:'',
        repeticiones:-1,
        series:-1,
        url:''
        
      }
    }
    
    const modal = await this.modalController.create({
      component: EditAddEjercicioPage,
      cssClass: 'my-custom-class',
      componentProps:{
        ejercicioto:ejer
      }
    });
    return await modal.present();
  }

  async deleteEjer(ejer:Ejercicio){
    let choice=await this.utils.presentAlertConfirm('my-custom-class', 'INFORMACIÓN', '¿Borrar Ejercicio?');
    if(choice){
      await this.utils.present();
      try{
        let rowsafectadas=await this.bbddd.DeleteEjercicio(ejer.id);
        if(rowsafectadas>0){
         if(ejer.url!=''){
          this.utils.deletestorageVideo(environment.filepathvideosEjerciciosUsuario+ejer.denominacion);
          }
          let aux:Ejercicio[]=[];
          this.items.forEach((i=>{
            if(i.id!=ejer.id){
              aux.push(i);
            }
          }));
          this.items=aux;
        }
      }catch(error){
        console.log(error);
      }
      await this.utils.dismiss();
    }
  }
  reproducir(url:string){
    this.utils.reproducirVideo(url);
  }
}
