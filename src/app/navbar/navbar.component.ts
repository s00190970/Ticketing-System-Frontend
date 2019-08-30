import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbTokenLocalStorage, NbAuthJWTToken } from '@nebular/auth';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';

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
        if (token.isValid()) {
          this.tokenPayload = token.getPayload();
          this.username = this.tokenPayload.sub;
          this.roles = this.tokenPayload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']
          this.roles.forEach(role =>  {
            if(role === 'Admin'){
              this.isAdmin = true;
            }
          });
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

}
