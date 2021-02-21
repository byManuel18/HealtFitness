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

/**
 *  Método que comprueba que un usuario exista y coincidad sus credenciales. Si coinciden entra en la aplicación 
 */
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
          this.utils.presentAlert('my-custom-class',this.utils.TranslateFrase('info_alert'),'',this.utils.TranslateFrase('no_credenciales_acept'),[this.utils.TranslateFrase('boton_aceptar_alert')]);
      }
      
    }else{
      this.utils.presentAlert('my-custom-class',this.utils.TranslateFrase('info_alert'),'',this.utils.TranslateFrase('no_usuario_existente'),[this.utils.TranslateFrase('boton_aceptar_alert')]);
    }
  }
  /**
   * Método que nos lleva a la página de registro
   */
  Registro(){
    this.router.navigate(['registro']);
  }

}
