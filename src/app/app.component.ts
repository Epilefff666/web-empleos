import { Component } from '@angular/core';
import { ReCaptchaV3Service } from 'ng-recaptcha';
/* import { environment } from 'src/environments/environment'; */


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web-empleos';
  robot: boolean;
  constructor(
    /* private recaptchaV3Service: ReCaptchaV3Service, */
  )
    {
      /* this.robot = true;
      this.recaptchaV3Service.execute('WebEmpleos')
      .subscribe(token =>{
        console.log(token)
        if(token === environment.recaptcha.key){
          this.robot = false 
          console.log(this.robot)
        }
        console.log(this.robot)
      }) */
      
    }
}
