import { Component, OnInit, Inject, ChangeDetectorRef } from "@angular/core";
import { NbAuthService, NB_AUTH_OPTIONS, NbAuthResult, getDeepFromObject } from "@nebular/auth";
import { Router } from "@angular/router";
import { IUser } from 'src/app/commons/models/user/user.model';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  redirectDelay: number = 0;
  showMessages: any = {};
  strategy: string = "email";

  errors: string[] = [];
  messages: string[] = [];
  user: IUser = {userName:"", password:""};
  submitted: boolean = false;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router
  ) {

  }

  login(): void {
    this.errors = [];
    this.messages = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user).subscribe((result: NbAuthResult) => {
      this.submitted = false;

      if (result.isSuccess()) {
        this.messages = result.getMessages();
      } else {
        this.errors = result.getErrors();
      }

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigate(['/home']);
        }, this.redirectDelay);
      }
      this.cd.detectChanges();
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

  ngOnInit() {
    this.redirectDelay = this.getConfigValue('forms.login.redirectDelay');
    this.showMessages = this.getConfigValue('forms.login.showMessages');
    this.strategy = this.getConfigValue('forms.login.strategy');
  }
}
