import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
    selector: 'app-user-dropdown-menu',
    imports: [RouterLink],
    templateUrl: './user-dropdown-menu.component.html',
    styleUrl: './user-dropdown-menu.component.scss'
})
export class UserDropdownMenuComponent {

    authService = inject(AuthService);
    isOnAuthPage = this.authService.authPageStatus;
    // user = this.authService.user;
    signOut(){
      this.authService.signOut();
    }
    
}
