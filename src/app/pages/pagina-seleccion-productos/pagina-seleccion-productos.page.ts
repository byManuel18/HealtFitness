import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Producto } from 'src/app/models/Producto';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BBDDServiceService } from 'src/app/services/bbddservice.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';
import { environment } from 'src/environments/environment';
import { EditAddProductoPage } from '../edit-add-producto/edit-add-producto.page';
import { EditRutinaPage } from '../edit-rutina/edit-rutina.page';

@Component({
  selector: 'app-pagina-seleccion-productos',
  templateUrl: './pagina-seleccion-productos.page.html',
  styleUrls: ['./pagina-seleccion-productos.page.scss'],
})
export class PaginaSeleccionProductosPage implements OnInit {

  items:Producto[]=[];
  fecha_rutina:string;
  tramo:number;
  constructor(private utils:UtilsServiceService,private bbdd:BBDDServiceService,private modalController:ModalController,
    private auth:AuthServiceService,private navParams:NavParams) {
      this.fecha_rutina=this.navParams.get('date');
      this.tramo=this.navParams.get('tramo');
      console.log(this.fecha_rutina);
      console.log(this.tramo);
    }

  ngOnInit() {
  }

  async ionViewDidEnter(){
    this.CargarDatos();
  }
  
  async CargarDatos($event=null){
    if($event==null){
      await this.utils.present();
    }
    
    try {
      this.items=await this.bbdd.getAllProductsUserAdmin(this.auth.acout.user.id);
      if($event==null){
        await this.utils.dismiss();
      }
      if ($event) {
        $event.target.complete();
      }
      
    } catch (error) {
      if($event==null){
        await this.utils.dismiss();
      }
      if ($event) {
        $event.target.complete();
      }
    }
  }

  async search($event){
    let cadena:string=$event.srcElement.value;
    if(cadena!=null){
      this.items=[];
      try {
        this.items= await this.bbdd.getAllProductsUserAdminConSearch(this.auth.acout.user.id,cadena.toUpperCase());
      } catch (error) {
        this.CargarDatos();
      }

    }else{
      this.CargarDatos();
    }
  }

  public async AddARutina(producto:Producto){
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
        sal:0,
        cantidad:0,
        id_rutina:-1
      }
    }
    
    const modal = await this.modalController.create({
      component: EditRutinaPage,
      cssClass: 'my-custom-class',
      componentProps:{
        date:this.fecha_rutina,
        tramo:this.tramo,
        produ:pro
      }
    });
    return await modal.present();
  }
  public Salir(){
    this.modalController.dismiss();
  }

}
