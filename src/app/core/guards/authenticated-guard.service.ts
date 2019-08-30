import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { isNullOrUndefined } from 'util';

@Injectable()
export class AuthenticatedGuardService implements CanActivate{

    constructor(private router: Router, private authService: NbAuthService){
        
    }

    canActivate(){
        this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) =>  {
            if(isNullOrUndefined(token) || !token.isValid()){
                this.router.navigate(['redirect-to-login']);
                return false;
            } else {
                return true;
            }
        });
        return true;
    }
}