import { Component } from '@angular/core';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TicketingSystemClient';
  user: any = {}

  constructor(private authService: NbAuthService){
    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {

        if (token.isValid()) {
          this.user = token.getPayload(); // here we receive a payload from the token and assigns it to our `user` variable 
          console.log(this.user)
        }

      });
  }
}
