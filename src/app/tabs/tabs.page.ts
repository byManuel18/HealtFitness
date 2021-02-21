import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit {

  constructor(public auth:AuthServiceService,private traslator:TranslateService) {}
 
  ngOnInit(): void {
    if(this.auth.acout.lenguaje===1){
      this.traslator.use('es');
    }else if(this.auth.acout.lenguaje===0){
      this.traslator.use('en');
    }
  }
   

}
