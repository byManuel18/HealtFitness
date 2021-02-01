import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { AuthServiceService } from 'src/app/services/auth-service.service';
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
  constructor(private formBuilder:FormBuilder,private bbdds:BBDDServiceService,private utils:UtilsServiceService,
    private router:Router,private authS:AuthServiceService
    ) {
    this.tasks=this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      contraseña: ['',[Validators.required,Validators.minLength(8)]]
    });
   }

  ngOnInit() {
    if(this.authS.isLogged()){
      this.router.navigate(['/']);
    }
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
      if(this.usuario.contraseña===this.tasks.get('contraseña').value){
        this.authS.login(this.usuario);
        this.router.navigate(['/']);
      }else{
          this.utils.presentToast("No coinciden las credenciales","danger");
      }
      
    }else{
      console.log("No existe usuario con ese correo, registrese"); 
    }
  }

  Registro(){
    this.router.navigate(['registro']);
  }

}
