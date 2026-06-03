import { AfterViewInit, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';
import { TextButtonClassList } from '../../constants/layout.constants';
import { AuthService } from '../../services/auth.service';
import { AUTH_CONSTANTS } from '../../constants/auth.constants';


@Component({
  selector: 'app-auth',
  imports: [
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInput,
    MatCheckbox
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit, AfterViewInit, OnDestroy{
 
  authService = inject(AuthService);
  btnClass = TextButtonClassList('primary') + ' w-full';
  formBuilder = inject(FormBuilder);
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    rememberMe: [ false ]
  });
  googleBtnId = AUTH_CONSTANTS.googleBtnId;

  ngOnInit(): void {
    this.authService.setAuthPageStatus(true);
  }

  ngAfterViewInit(): void {
    this.authService.setUpGoogleSignIn();
  }

  login(){
    console.log(this.loginForm.value);
  }

  ngOnDestroy(): void {
    this.authService.setAuthPageStatus(false);
  }
}
