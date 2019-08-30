import { Injectable } from "@angular/core";
import { CanActivate, Router } from '@angular/router';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AdminGuardService implements CanActivate{

    constructor(private router: Router, private authService: NbAuthService){}

    canActivate() {
        let canActivate = false;
        this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
          if (isNullOrUndefined(token) || !token.isValid()) {
            canActivate = false;
            this.router.navigate(['redirect-to-login']);
          } else {
            if (isNullOrUndefined(token.getPayload()) ||
              isNullOrUndefined(token.getPayload()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])) {
                canActivate = false;
                this.router.navigate(['redirect-to-login']);
            }
    
            if (token.getPayload()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] instanceof Array) {
              (<[]>token.getPayload()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']).forEach(role => {
                if (role === 'Admin') {
                    canActivate = true;
                }
              });
            } else if (token.getPayload()['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === 'Admin') {
                canActivate = true;
            } else{
                canActivate = false;
                this.router.navigate(['home']);
            }
          }
        });
        return canActivate;
      }
}