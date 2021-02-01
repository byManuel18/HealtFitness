import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router} from '@angular/router';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { Usuario } from '../models/Usuario';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService implements CanActivate{

  acout:any={
    user:{
      id:-1,
      altura:0,
      foto:'',
      nombre:'',
      peso:0,
      pesodeseado:0
    },
    theme: -1,
    lenguaje:-1
  }

  constructor(private router:Router,private storage:NativeStorage) { }
  canActivate(route: ActivatedRouteSnapshot):boolean{
    if(!this.isLogged()){
      this.router.navigate(["login"]);
      return false;
    }
    return true;
  }

  public async init(){
    let ac=null;
    try{
      ac = await this.storage.getItem("acount");
     
    }catch (err){
      ac=null;
    }
    if(ac!=null){
      this.acout=ac;
    }

  }

  public isLogged():boolean{
    if(this.acout.user.id==-1){
      return false;
    }else{
      return true;
    }
  }

  public async login(user:Usuario){
    this.acout.user.id=user.id;
    this.acout.user.peso=user.peso;
    this.acout.user.pesodeseado=user.pesodeseado;  
    this.acout.user.altura=user.altura;
    this.acout.user.foto=user.foto;
    this.acout.user.nombre=user.nombre;
    await this.storage.setItem("acount",this.acout);

    
  }
  public async logout(){
    this.acout.user.id=-1;
    this.acout.user.peso=0;
    this.acout.user.pesodeseado=0;  
    this.acout.user.altura=0;
    this.acout.user.foto='';
    this.acout.user.nombre='';
    this.acout.theme=-1;
    this.acout.lenguaje=-1;
    await this.storage.setItem("acount",this.acout);
  }
}
