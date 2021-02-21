import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http/ngx';
import { environment } from 'src/environments/environment';
import { Ejercicio } from '../models/Ejercicio';
import { Producto } from '../models/Producto';
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

  public createUsuario(usuario:Usuario):Promise<number>{
    const endpoint=environment.endpoint+environment.createUser;

    return new Promise((resolve,reject)=>{
        if(usuario){
          this.http.setDataSerializer('json');
          this.http.post(endpoint,usuario,this.header).then(d=>{
            let id:number=d.data;
            console.log(id);
            resolve(id);
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe usuario");
        }
    });

  }

  public updateUsuario(usuario:Usuario):Promise<number>{
    const endpoint=environment.endpoint+environment.updateusuario+usuario.id;
    return new Promise((resolve,reject)=>{
        if(usuario){
          this.http.setDataSerializer('json');
          this.http.put(endpoint,usuario,this.header).then(d=>{
            let id:number=d.data;
            console.log(id);
            resolve(id);
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe producto");
        }
    });

  }


  public getProductosbyUser(id_user:number):Promise<Producto[]|null>{

    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.getProductobyUser+id_user;

      this.http.get(endpoint,{},this.header).then((d)=>{
        if(d){
          let us:Producto[]=JSON.parse(d.data);
          if(us!=null&&us.length>0){
            resolve(us);
          }else{
            resolve(null);
          }
          
        }else{
          resolve(null);
        }
    }).catch(e=>reyect(e));
  
    });
  }

  public getProductosbyUserbyName(id_user:number,nombre:string):Promise<Producto[]|null>{

    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.getProductobyUser+id_user+"/"+nombre;

      this.http.get(endpoint,{},this.header).then((d)=>{
        if(d){
          let us:Producto[]=JSON.parse(d.data);
          if(us!=null&&us.length>0){
            resolve(us);
          }else{
            resolve(null);
          }
          
        }else{
          resolve(null);
        }
    }).catch(e=>reyect(e));
  
    });
  }

  public DeleteProducto(id:number):Promise<number>{
    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.deleteproduct+id;

      this.http.delete(endpoint,{},this.header).then((d)=>{
        if(d){
          let rows:number=d.data;
          if(rows!=null){
            resolve(rows);
          }else{
            resolve(0);
          }
          
        }else{
          resolve(0);
        }
    }).catch(e=>reyect(e));
  
    });

  }
  
  public createProducto(producto:Producto):Promise<number>{
    const endpoint=environment.endpoint+environment.createProducto;

    return new Promise((resolve,reject)=>{
        if(producto){
          this.http.setDataSerializer('json');
          this.http.post(endpoint,producto,this.header).then(d=>{
            let id:number=d.data;
            console.log(id);
            resolve(id);
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe producto");
        }
    });

  }
  public createRutina(rutina:any):Promise<number>{
    const endpoint=environment.endpoint+environment.addrutina;

    return new Promise((resolve,reject)=>{
        if(rutina){
          this.http.setDataSerializer('json');
          this.http.post(endpoint,rutina,this.header).then(d=>{
            let id:number=d.data;
            console.log(id);
            resolve(id);
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe producto");
        }
    });

  }
  public updateProducto(producto:Producto):Promise<number>{
    const endpoint=environment.endpoint+environment.updateProducto+producto.id;
    console.log(producto);
    
    return new Promise((resolve,reject)=>{
        if(producto){
          this.http.setDataSerializer('json');
          this.http.put(endpoint,producto,this.header).then(d=>{
            let id:number=d.data;
            console.log(id);
            resolve(id);
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe producto");
        }
    });

  }

  public getProductosConCantiadMasRutina(id_user:number,fecha:string,id_tramo:number):Promise<Producto[]|null>{

    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.productocantidadrutina+id_user+"/"+fecha+"/"+id_tramo;

      this.http.get(endpoint,{},this.header).then((d)=>{
        if(d){
          let us:Producto[]=JSON.parse(d.data);
          console.log(us);
          if(us!=null&&us.length>0){
            resolve(us);
          }else{
            resolve(null);
          }
          
        }else{
          resolve(null);
        }
    }).catch(e=>reyect(e));
  
    });
  }

  public getAllProductsUserAdmin(id_user:number):Promise<Producto[]|null>{

    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.getProductosUserAdmin+id_user;

      this.http.get(endpoint,{},this.header).then((d)=>{
        if(d){
          let us:Producto[]=JSON.parse(d.data);
         
          if(us!=null&&us.length>0){
            resolve(us);
          }else{
            resolve(null);
          }
          
        }else{
          resolve(null);
        }
    }).catch(e=>reyect(e));
  
    });
  }
  public getAllProductsUserAdminConSearch(id_user:number,nombre:string):Promise<Producto[]|null>{

    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.getProductosUserAdmin+id_user+"/"+nombre;

      this.http.get(endpoint,{},this.header).then((d)=>{
        if(d){
          let us:Producto[]=JSON.parse(d.data);
         
          if(us!=null&&us.length>0){
            resolve(us);
          }else{
            resolve(null);
          }
          
        }else{
          resolve(null);
        }
    }).catch(e=>reyect(e));
  
    });
  }

  public DeleteRutina(id:number):Promise<number>{
    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.deleteRutina+id;

      this.http.delete(endpoint,{},this.header).then((d)=>{
        if(d){
          let rows:number=d.data;
          if(rows!=null){
            resolve(rows);
          }else{
            resolve(0);
          }
          
        }else{
          resolve(0);
        }
    }).catch(e=>reyect(e));
  
    });

  }

  public updateRutina(rutina:any):Promise<number>{
    const endpoint=environment.endpoint+environment.updaterutina+rutina.id_rutina;
    return new Promise((resolve,reject)=>{
        if(rutina){
          this.http.setDataSerializer('json');
          this.http.put(endpoint,rutina,this.header).then(d=>{
            let id:number=d.data;
            resolve(id);
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe producto");
        }
    });

  }

  public createEjercicio(ejercicio:Ejercicio):Promise<number>{
    const endpoint=environment.endpoint+environment.addejercicio;

    return new Promise((resolve,reject)=>{
        if(ejercicio){
          this.http.setDataSerializer('json');
          this.http.post(endpoint,ejercicio,this.header).then(d=>{
            let id:number=d.data;
            console.log(id);
            resolve(id);
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe producto");
        }
    });

  }

  public updateEjercicio(ejercicio:Ejercicio):Promise<number>{
    const endpoint=environment.endpoint+environment.updateejercicio+ejercicio.id;
    return new Promise((resolve,reject)=>{
        if(ejercicio){
          this.http.setDataSerializer('json');
          this.http.put(endpoint,ejercicio,this.header).then(d=>{
            let id:number=d.data;
            resolve(id);
          }).catch(error=>{
            reject(error);
          });
        }else{
          reject("No existe producto");
        }
    });

  }


  public DeleteEjercicio(id:number):Promise<number>{
    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.deleteejercicio+id;

      this.http.delete(endpoint,{},this.header).then((d)=>{
        if(d){
          let rows:number=d.data;
          if(rows!=null){
            resolve(rows);
          }else{
            resolve(0);
          }
          
        }else{
          resolve(0);
        }
    }).catch(e=>reyect(e));
  
    });

  }

  public getAllEjerciciosbyUser(id_user:number):Promise<Ejercicio[]|null>{

    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.getejerciciosbyUser+id_user;

      this.http.get(endpoint,{},this.header).then((d)=>{
     
        if(d){
          let us:Ejercicio[]=JSON.parse(d.data);
         
          if(us!=null&&us.length>0){
            resolve(us);
          }else{
            resolve(null);
          }
          
        }else{
          resolve(null);
        }
    }).catch(e=>reyect(e));
  
    });
  }


  public getAllEjerciciosbyUserbyName(id_user:number,nombre:string):Promise<Ejercicio[]|null>{

    return new Promise((resolve,reyect)=>{
      const endpoint=environment.endpoint+environment.getejerciciosbyUser+id_user+"/"+nombre;

      this.http.get(endpoint,{},this.header).then((d)=>{
        if(d){
          let us:Ejercicio[]=JSON.parse(d.data);
         
          if(us!=null&&us.length>0){
            resolve(us);
          }else{
            resolve(null);
          }
          
        }else{
          resolve(null);
        }
    }).catch(e=>reyect(e));
  
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
