import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class UtilsServiceService {
  isLoading = true;

  constructor(private translateService:TranslateService,public loadingController: LoadingController ) { }


  iniciarLenguaje(){
    this.translateService.setDefaultLang('en');
    this.translateService.use('en');
    console.log(this.translateService.currentLang);
    try {
      this.translateService.use(this.translateService.getBrowserLang());
    } catch (error) {
      
    }
  }

  async present() {
    this.isLoading = true;
    return await this.loadingController.create().then(a => {
      a.present().then(() => {
        if (!this.isLoading) {
          a.dismiss();
        }
      });
    });
  }

  async dismiss() {
    if (this.isLoading) {
      this.isLoading = false;
      return await this.loadingController.dismiss();
    }
    return null;
  }
}
