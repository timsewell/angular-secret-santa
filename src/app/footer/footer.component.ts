import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import {UserService} from '../core/user.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent {

    constructor(public authService: AuthService,
                private router: Router,
                public userService: UserService) {}

    errorMessage;

    tryLogout() {
        this.authService.doLogout()
            .then(() => {
                this.router.navigate(['/']);
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
            });
    }
}
