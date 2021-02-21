import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/Producto';
import { EditAddProductoPage } from '../pages/edit-add-producto/edit-add-producto.page';
import { AuthServiceService } from '../services/auth-service.service';
import { BBDDServiceService } from '../services/bbddservice.service';
import { UtilsServiceService } from '../services/utils-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  items: Producto[];
  constructor(private bbddd: BBDDServiceService, private auth: AuthServiceService, private utils: UtilsServiceService,
    private modalController:ModalController) {

  }
  ngOnInit(): void {
    this.cargaDatos();
  }

  async cargaDatos($event = null) {
    this.items=[];
    if ($event == null) {
      await this.utils.present();
    }
    try {
      let arrayitems: Producto[] = await this.bbddd.getProductosbyUser(this.auth.acout.user.id);
      this.items = arrayitems;
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

  async deleteProducto(proeli:Producto) {
    let choice=await this.utils.presentAlertConfirm('my-custom-class', 'INFORMACIÓN', '¿Borrar Producto?');
    if(choice){
      await this.utils.present();
      try{
        let rowsafectadas=await this.bbddd.DeleteProducto(proeli.id);
        if(rowsafectadas>0){
          if(proeli.foto!=environment.default_image){
          let code=proeli.carbohidratos+proeli.energia+proeli.fibra+proeli.grasas_insaturadas+proeli.grasas_saturadas+proeli.porcion+proeli.proteinas+proeli.sal
          let code2:string=code+proeli.nombre;
          this.utils.deletestorage(environment.filepathimageProducto+this.auth.acout.user.id+code2);
          }
          let aux:Producto[]=[];
          this.items.forEach((i=>{
            if(i.id!=proeli.id){
              aux.push(i);
            }
          }));
          this.items=aux;
        }else{
     
        }
      }catch(error){
        console.log(error);
      }
      await this.utils.dismiss();
    }
  }


  public async editAddProducto(producto:Producto){
    let pro:Producto;
    if(producto!=null){
      pro=producto;
    }else{
      pro={
        id:-1,
        azucar:0,
        carbohidratos:0,
        energia:0,
        fibra:0,
        foto:environment.default_image,
        grasas_insaturadas:0,
        grasas_saturadas:0,
        id_usuario:this.auth.acout.user.id,
        nombre:'',
        porcion:0,
        proteinas:0,
        sal:0
      }
    }
    
    const modal = await this.modalController.create({
      component: EditAddProductoPage,
      cssClass: 'my-custom-class',
      componentProps:{
        produ:pro
      }
    });
    return await modal.present();
  }

  public async search($event){
    //await this.utils.present();
    let cadena:string=$event.srcElement.value;
    if(cadena!=null){
      this.items=[];
      try {
        this.items= await this.bbddd.getProductosbyUserbyName(this.auth.acout.user.id,cadena.toUpperCase());
      } catch (error) {
        this.cargaDatos();
      }

    }else{
      this.cargaDatos();
    }
    //await this.utils.dismiss();
  }


}
