import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbTokenLocalStorage, NbAuthJWTToken } from '@nebular/auth';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  tokenPayload: any = {};
  username: string;
  userMenu = [{title: 'Log out'}];
  loggedIn: boolean = false;
  isAdmin: boolean = false;
  roles: string[];

  constructor(private authService: NbAuthService, private menuService: NbMenuService, private router: Router, 
    private localStorageService: NbTokenLocalStorage) {
      

      this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContextItemSelection(event.item.title);
      });
     }

     userLoggedIn(): boolean{
      this.authService.isAuthenticated().subscribe(res => this.loggedIn = res);

      this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
        if (token.isValid() && this.loggedIn) {
          this.tokenPayload = token.getPayload();
          this.username = this.tokenPayload.sub;
          this.isAdmin = this.checkIfAdmin();
        }
        else{
          this.loggedIn = false;
          this.isAdmin = false;
        }
      });
      return this.loggedIn;
     }

     onContextItemSelection(title) {
      if (title === 'Log out') {
        this.localStorageService.clear();
        this.router.navigate(['/redirect-to-login']);
        this.loggedIn = false;
        this.isAdmin = false;
      }
    }

    checkIfAdmin(): boolean{
      if(isNullOrUndefined(this.tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'])){
        return false;
      }
      if(this.tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] instanceof Array){
        <[]>this.tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'].forEach(role => {
          if (role === "Admin"){
            return true;
          }
          return false;
        });
      }
      else if(this.tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] === "Admin"){
        return true;
      }
      return false;
    }

}
