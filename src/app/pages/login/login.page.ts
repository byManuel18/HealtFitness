import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Usuario } from 'src/app/models/Usuario';
import { BBDDServiceService } from 'src/app/services/bbddservice.service';
import { UtilsServiceService } from 'src/app/services/utils-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public tasks: FormGroup;
  public usuario:Usuario=null;
  constructor(private formBuilder:FormBuilder,private bbdds:BBDDServiceService,private utils:UtilsServiceService) {
    this.tasks=this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      contraseña: ['',[Validators.required,Validators.minLength(8)]]
    });
   }

  ngOnInit() {
  }

  async sendForm(){
    await this.utils.present();
    try{
    this.usuario= await this.bbdds.getUsuariobyEmail(this.tasks.get('email').value);
    }catch(error){
      console.log(error);
      this.usuario=null;
    }
    await this.utils.dismiss();
    if(this.usuario!=null){
      console.log("Usuario existen, porcedea a etrar en la apk");
    }else{
      console.log("No existe usuario con ese correo, registrese"); 
    }
  }

}
