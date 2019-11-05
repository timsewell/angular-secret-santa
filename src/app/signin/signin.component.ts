import { Component } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-signin',
    templateUrl: 'signin.component.html'
})
export class SigninComponent {

    loginForm: FormGroup;
    errorMessage = '';

    constructor(
        public authService: AuthService,
        private router: Router,
        private fb: FormBuilder
    ) {
        this.createForm();
    }

    createForm() {
        this.loginForm = this.fb.group({
            email: ['', Validators.required ],
            password: ['', Validators.required]
        });
    }

    tryLogin(value) {
        this.authService.doLogin(value)
            .then(() => {
                this.router.navigate(['/elves']);
            }, err => {
                console.log(err);
                this.errorMessage = err.message;
            });
    }
}
