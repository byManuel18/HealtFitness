import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Producto } from 'src/app/models/Producto';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { BBDDServiceService } from 'src/app/services/bbddservice.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-edit-rutina',
  templateUrl: './edit-rutina.page.html',
  styleUrls: ['./edit-rutina.page.scss'],
})
export class EditRutinaPage implements OnInit {
  producto:Producto;
  fecha:string;
  tramo:number;
  calorias:number=0;
  carbho:number=0;
  azucar:number=0;
  gs:number=0;
  gi:number=0;
  fibra:number=0;
  sal:number=0;
  proteinas:number=0;
  public tasks: FormGroup;
  constructor(private navParams:NavParams,private modalController:ModalController,private formBuilder:FormBuilder,
    private auth: AuthServiceService,private utils:UtilsServiceService,private bbdd:BBDDServiceService) {
    this.producto=this.navParams.get('produ');
    this.fecha=this.navParams.get('date');
    this.tramo=this.navParams.get('tramo');
    this.tasks=this.formBuilder.group({
      cantidad:['', [Validators.required,Validators.min(0.01)]],
    });
   }

  ngOnInit() {
  }

  ionViewDidEnter(){

    if(this.producto.id_rutina>0){
      this.tasks.get('cantidad').setValue(this.producto.cantidad);
      this.cambiarCantidad();
    }

  }

  async sendForm(){
    await this.utils.present();
    let rutina:any={
      id_rutina:this.producto.id_rutina,
      id_usuario: this.auth.acout.user.id,
      id_producto:this.producto.id,
      fecha:this.fecha,
      cantidad:this.tasks.get('cantidad').value,
      id_tramo:this.tramo
    }
    if(this.producto.id_rutina>0){
      try {
        let n=await this.bbdd.updateRutina(rutina);
        await this.utils.dismiss();
        this.modalController.dismiss();
      } catch (error) {
        await this.utils.dismiss();
      }
    }else{
      try {
        let n=await this.bbdd.createRutina(rutina);
        await this.utils.dismiss();
        this.modalController.dismiss();
      } catch (error) {
        await this.utils.dismiss();
      }
    }
    


  }
  public Salir(){
    this.modalController.dismiss();
  }

  cambiarCantidad($event=null){
    let n:number;
    if($event==null){
      n=this.producto.cantidad;
    }else{
      n=$event.detail.value;
    }
    this.gi=parseFloat(((this.producto.grasas_insaturadas*n)/this.producto.porcion).toFixed(2));
    this.gs=parseFloat(((this.producto.grasas_saturadas*n)/this.producto.porcion).toFixed(2));
    this.proteinas=parseFloat(((this.producto.proteinas*n)/this.producto.porcion).toFixed(2));
    this.azucar=parseFloat(((this.producto.azucar*n)/this.producto.porcion).toFixed(2));
    this.carbho=parseFloat(((this.producto.carbohidratos*n)/this.producto.porcion).toFixed(2));
    this.sal=parseFloat(((this.producto.sal*n)/this.producto.porcion).toFixed(2));
    this.calorias=parseFloat(((this.producto.energia*n)/this.producto.porcion).toFixed(2));
    this.fibra=parseFloat(((this.producto.fibra*n)/this.producto.porcion).toFixed(2));
  }

}
