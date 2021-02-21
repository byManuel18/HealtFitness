import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { ModalController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/Producto';
import { EditRutinaPage } from '../pages/edit-rutina/edit-rutina.page';
import { PaginaSeleccionProductosPage } from '../pages/pagina-seleccion-productos/pagina-seleccion-productos.page';
import { AuthServiceService } from '../services/auth-service.service';
import { BBDDServiceService } from '../services/bbddservice.service';
import { UtilsServiceService } from '../services/utils-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  button_showmore_desayuno:string="caret-down-outline";
  button_showmore_almuerzo:string="caret-down-outline";
  button_showmore_cena:string="caret-down-outline";
  button_showmore_aperitivo:string="caret-down-outline";
  mostrar_desayuno:boolean=false;
  mostrar_almuerzo:boolean=false;
  mostrar_cena:boolean=false;
  mostrar_aperitivo:boolean=false;
  myDate:any;
  n_g_desayuno:number=0;
  n_g_almuerzo:number=0;
  n_g_cena:number=0;
  n_g_aperitivo:number=0;
  n_c_desayuno:number=0;
  n_c_almuerzo:number=0;
  n_c_cena:number=0;
  n_c_aperitivo:number=0;
  n_p_desayuno:number=0;
  n_p_almuerzo:number=0;
  n_p_cena:number=0;
  n_p_aperitivo:number=0;
  n_cal_desayuno:number=0;
  n_cal_almuerzo:number=0;
  n_cal_cena:number=0;
  n_cal_aperitivo:number=0;
  productos_desayuno:Producto[]=[];
  productos_almuerzo:Producto[]=[];
  productos_cena:Producto[]=[];
  productos_aperitivo:Producto[]=[];

  total_p=0;
  total_c=0;
  total_cal=0;
  total_g=0;
  


  


  constructor(private routes:Router,private nativeStorage:NativeStorage,private auth:AuthServiceService,private bbdd:BBDDServiceService,
    private utils:UtilsServiceService,private modalController:ModalController) {
    let datenow=new Date();
    this.myDate=datenow.getFullYear()+"-"+(datenow.getMonth()+1)+"-"+datenow.getDate();
    console.log(this.myDate);
    
  }
  ngOnInit(){
    this.nativeStorage.setItem('myitem', {property: 'value', anotherProperty: 'anotherValue'})
  .then(
    () => console.log('Stored item!'),
    error => console.error('Error storing item', error)
  );
  }

  async ionViewDidEnter(){
    await this.cargarDatos();
  }

  public async cargarDatos($event=null){
    if($event==null){
      await this.utils.present();
    }
    try {
      this.productos_desayuno=await this.bbdd.getProductosConCantiadMasRutina(this.auth.acout.user.id,this.myDate,environment.desayuno);
      this.productos_almuerzo=await this.bbdd.getProductosConCantiadMasRutina(this.auth.acout.user.id,this.myDate,environment.almuerzo);
      this.productos_cena=await this.bbdd.getProductosConCantiadMasRutina(this.auth.acout.user.id,this.myDate,environment.cena);
      this.productos_aperitivo=await this.bbdd.getProductosConCantiadMasRutina(this.auth.acout.user.id,this.myDate,environment.aperitivo);
      this.cargarMacros();
      if ($event) {
        $event.target.complete();
      }else{
        await this.utils.dismiss();
      }
    } catch (error) {
      console.log("fwfef");
      if ($event) {
        $event.target.complete();
      }else{
        await this.utils.dismiss();
      }
     
    }
  }

  private cargarMacros(){
    this.n_g_desayuno=0;
    this.n_g_almuerzo=0;
    this.n_g_cena=0;
    this.n_g_aperitivo=0;
    this.n_c_desayuno=0;
    this.n_c_almuerzo=0;
    this.n_c_cena=0;
    this.n_c_aperitivo=0;
    this.n_p_desayuno=0;
    this.n_p_almuerzo=0;
    this.n_p_cena=0;
    this.n_p_aperitivo=0;
    this.n_cal_desayuno=0;
    this.n_cal_almuerzo=0;
    this.n_cal_cena=0;
    this.n_cal_aperitivo=0;
    this.total_p=0;
    this.total_c=0;
    this.total_cal=0;
    this.total_g=0;
  
    if(this.productos_desayuno!=null){
      this.productos_desayuno.forEach(p=>{
        this.n_c_desayuno+=parseFloat(((p.carbohidratos*p.cantidad)/p.porcion).toFixed(2));
        this.n_p_desayuno+=parseFloat(((p.proteinas*p.cantidad)/p.porcion).toFixed(2));
        this.n_g_desayuno+=parseFloat(((p.grasas_insaturadas*p.cantidad)/p.porcion).toFixed(2));
        this.n_g_desayuno+=parseFloat(((p.grasas_saturadas*p.cantidad)/p.porcion).toFixed(2));
        this.n_cal_desayuno+=parseFloat(((p.energia*p.cantidad)/p.porcion).toFixed(2));
      });
    }
    if(this.productos_almuerzo!=null){
      this.productos_almuerzo.forEach(p=>{
        this.n_c_almuerzo+=parseFloat(((p.carbohidratos*p.cantidad)/p.porcion).toFixed(2));
        this.n_p_almuerzo+=parseFloat(((p.proteinas*p.cantidad)/p.porcion).toFixed(2));
        this.n_g_almuerzo+=parseFloat(((p.grasas_insaturadas*p.cantidad)/p.porcion).toFixed(2));
        this.n_g_almuerzo+=parseFloat(((p.grasas_saturadas*p.cantidad)/p.porcion).toFixed(2));
        this.n_cal_almuerzo+=parseFloat(((p.energia*p.cantidad)/p.porcion).toFixed(2));
      });
    }
    if(this.productos_cena!=null){
      this.productos_cena.forEach(p=>{
        this.n_c_cena+=parseFloat(((p.carbohidratos*p.cantidad)/p.porcion).toFixed(2));
        this.n_p_cena+=parseFloat(((p.proteinas*p.cantidad)/p.porcion).toFixed(2));
        this.n_g_cena+=parseFloat(((p.grasas_insaturadas*p.cantidad)/p.porcion).toFixed(2));
        this.n_g_cena+=parseFloat(((p.grasas_saturadas*p.cantidad)/p.porcion).toFixed(2));
        this.n_cal_cena+=parseFloat(((p.energia*p.cantidad)/p.porcion).toFixed(2));
      });
    }
    if(this.productos_aperitivo!=null){
      this.productos_aperitivo.forEach(p=>{
        this.n_c_aperitivo+=parseFloat(((p.carbohidratos*p.cantidad)/p.porcion).toFixed(2));
        this.n_p_aperitivo+=parseFloat(((p.proteinas*p.cantidad)/p.porcion).toFixed(2));
        this.n_g_aperitivo+=parseFloat(((p.grasas_insaturadas*p.cantidad)/p.porcion).toFixed(2));
        this.n_g_aperitivo+=parseFloat(((p.grasas_saturadas*p.cantidad)/p.porcion).toFixed(2));
        this.n_cal_aperitivo+=parseFloat(((p.energia*p.cantidad)/p.porcion).toFixed(2));
      });
    }
    
    this.total_p+=this.n_p_almuerzo+this.n_p_aperitivo+this.n_p_cena+this.n_p_desayuno;
    this.total_c+=this.n_c_almuerzo+this.n_c_aperitivo+this.n_c_cena+this.n_c_desayuno;;
    this.total_cal+=this.n_cal_almuerzo+this.n_cal_aperitivo+this.n_cal_cena+this.n_cal_desayuno;;
    this.total_g+=this.n_g_almuerzo+this.n_g_aperitivo+this.n_g_cena+this.n_g_desayuno;;


   
  }
  
  
  public async addRutina(id_tramo:number){
    const modal = await this.modalController.create({
      component: PaginaSeleccionProductosPage,
      cssClass: 'my-custom-class',
      componentProps:{
        date:this.myDate,
        tramo:id_tramo,
      }
    });
    return await modal.present();
  }


  public ClickButtoShowDesayuno(){
    if(this.button_showmore_desayuno==="caret-down-outline"){
      this.button_showmore_desayuno="caret-up-outline";
      this.mostrar_desayuno=true;
    }else{
      this.button_showmore_desayuno="caret-down-outline";
      this.mostrar_desayuno=false;
    }

  }

  public ClickButtoShowCena(){
    if(this.button_showmore_cena==="caret-down-outline"){
      this.button_showmore_cena="caret-up-outline";
      this.mostrar_cena=true;
    }else{
      this.button_showmore_cena="caret-down-outline";
      this.mostrar_cena=false;
    }

  }

  public ClickButtoShowAlmuerzo(){
    if(this.button_showmore_almuerzo==="caret-down-outline"){
      this.button_showmore_almuerzo="caret-up-outline";
      this.mostrar_almuerzo=true;
    }else{
      this.button_showmore_almuerzo="caret-down-outline";
      this.mostrar_almuerzo=false;
    }

  }
  public ClickButtoShowAperitivo(){
    if(this.button_showmore_aperitivo==="caret-down-outline"){
      this.button_showmore_aperitivo="caret-up-outline";
      this.mostrar_aperitivo=true;
    }else{
      this.button_showmore_aperitivo="caret-down-outline";
      this.mostrar_aperitivo=false;
    }

  }

  async deleteProducto(pro:Producto,tramo:number){
    let acep= await this.utils.presentAlertConfirm('my-custom-class',this.utils.TranslateFrase('info_alert'), this.utils.TranslateFrase('borrar_product_rutina'));
    if(acep){
      await this.utils.present();

      try {
        let n=await this.bbdd.DeleteRutina(pro.id_rutina);
        if(n>0){
          console.log(n);
          if(tramo==1){
            let newarray:Producto[]=[];
            this.productos_desayuno.forEach(p=>{
              if(p.id!=pro.id){
                newarray.push(p);
              }
            });
            this.productos_desayuno=newarray;
          }else if(tramo==2){
            let newarray:Producto[]=[];
            this.productos_almuerzo.forEach(p=>{
              if(p.id!=pro.id){
                newarray.push(p);
              }
            });
            this.productos_almuerzo=newarray;
          }else if(tramo==3){
            let newarray:Producto[]=[];
            this.productos_cena.forEach(p=>{
              if(p.id!=pro.id){
                newarray.push(p);
              }
            });
            this.productos_cena=newarray;
          }else if(tramo==4){
            let newarray:Producto[]=[];
            this.productos_aperitivo.forEach(p=>{
              if(p.id!=pro.id){
                newarray.push(p);
              }
            });
            this.productos_aperitivo=newarray;
          }
          this.cargarMacros();
        }
  
        await this.utils.dismiss();
      } catch (error) {
        await this.utils.dismiss();
      }
    }

  }
  public async AddARutina(producto:Producto,tramo:number){
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
        date:this.myDate,
        tramo:tramo,
        produ:pro
      }
    });
    return await modal.present();
  }

   Changedate($event){
     this.cargarDatos();
  }

}
