import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { Usuario } from '../models/Usuario';

@Injectable({
  providedIn: 'root'
})
export class BBDDServiceService {

  constructor(private  http:HTTP) { }


  public getUsuariobyEmail(email:string):Promise<Usuario|null>{

    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.getUserbyEmail+email;

      this.http.get(endpoint,{},this.header).then((d)=>{
        if(d){
          let us:Usuario[]=JSON.parse(d.data);
          if(us!=null&&us.length>0){
            resolve(us[0]);
          }else{
            resolve(null);
          }
          
        }else{
          resolve(null);
        }
    }).catch(e=>reyect(e));
  
    });
  }

  public createUsuario(usuario:Usuario):Promise<void>{
    const endpoint=environment.endpoint+environment.createUser;

    return new Promise((resolve,reject)=>{
        if(usuario){
          this.http.setDataSerializer('json');
          this.http.post(endpoint,usuario,this.header).then(d=>{
            resolve();
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe usuario");
        }
    });

  }

  private get header(){

    return{
      'Access-Control-Allow-Origin':'*',
      'Content-Type':'application/json',
      'apikey':environment.apikey
    }
  }
}
