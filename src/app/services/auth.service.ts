import { STORAGE_TYPE, StorageService } from './storage.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Settings, User } from './../models/user.model';
import { computed, inject, Injectable, NgZone, signal, WritableSignal } from '@angular/core';
import { environment } from '../../environments/environment';
import { AUTH_CONSTANTS } from '../constants/auth.constants';

export declare var google: any;
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private router: Router,
    private storageService: StorageService
  ) { }

  private _user: WritableSignal<User|null> = signal(null);

  setUser(user:User) {
    this._user.set({...user});
    this.storageService.setItem(AUTH_CONSTANTS.userStorageKey, JSON.stringify(user));
    console.log("User set in AuthService:", user, this.storageService.getItem(AUTH_CONSTANTS.userStorageKey));
  }

  clearUser() {
    this._user.set(null);
    this.storageService.removeItem(AUTH_CONSTANTS.userStorageKey);
  }

  get user() {
    // return MOCK_USER;
    return this._user || JSON.parse(this.storageService.getItem(AUTH_CONSTANTS.userStorageKey) ?? 'null');
  }

  isAuthenticated = computed(() => this.user() !== null);

  private _isOnAuthPage = signal(false);
  setAuthPageStatus(status:boolean) {
    this._isOnAuthPage.set(status);
  }
  get authPageStatus() {
    return this._isOnAuthPage;
  }
  loginMode = signal<'google' | 'email' | null>(null);

  loginSuccessRedirectUri = '';
  redirectAfterLoginSuccess() { 
    this.router.navigate([this.loginSuccessRedirectUri]);
  }

  logoutSuccessRedirectUri = '';
  redirectAfterLogoutSuccess() { 
    this.router.navigate([this.logoutSuccessRedirectUri]);
  }


  private ngZone = inject(NgZone);

  setUpGoogleSignIn() {

    if(environment.config?.googleClientId) {
      google.accounts.id.initialize({
        client_id: environment.config?.googleClientId ,
        callback: this.handleGoogleSignInCredentialResponse.bind(this),
      });

      this.renderGoogleSignInResponsiveButton();
      let resizeTimeout : ReturnType<typeof setTimeout>  = setTimeout(() => '', 1000);
      window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(this.renderGoogleSignInResponsiveButton, 150);
      });
    }
  }

  renderGoogleSignInResponsiveButton() {
    const container = document.getElementById(AUTH_CONSTANTS.googleBtnId);

    // Capture current container width (clamped within Google's 400px maximum constraint)
    const currentWidth = container?.getBoundingClientRect().width || 400;

    // Re-initialize and render the official button
    google.accounts.id.renderButton(
      container,
      { 
        theme: "filled_blue", 
        size: "large", 
        width: currentWidth // Passes absolute pixel number, not percentage
      }
    );
  }

  /** This function is called when the user successfully signs in with Google */
  handleGoogleSignInCredentialResponse(response: any) {
    const decodeJWT = (token:string) => {

      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map(function (c) {
            return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join("")
      );
      return JSON.parse(jsonPayload);
    }
    // Wrap the response processing inside NgZone to update Angular's execution context
    this.ngZone.run(() => {
      // Send response.credential token to your backend API for verification
      console.log(response,"Encoded JWT ID token: " +  response.credential);

      const responsePayload = decodeJWT(response.credential);

      console.log("Decoded JWT ID token fields:",responsePayload);
      console.log("  Full Name: " + responsePayload.name);
      console.log("  Given Name: " + responsePayload.given_name);
      console.log("  Family Name: " + responsePayload.family_name);
      console.log("  Unique ID: " + responsePayload.sub);
      console.log("  Profile image URL: " + responsePayload.picture);
      console.log("  Email: " + responsePayload.email);
      this.setUser({
        name: responsePayload.name,
        email: responsePayload.email,
        authMode: 'google',
        authVerifier: '',
        roles: [],
        isActive: false,
        lastLogin: 0,
        registrationDate: 0,
        phoneNumber: '',
        avatar: responsePayload.picture,
        notifications: [],
        settings: undefined,
        isEmailVerified: responsePayload.email_verified,
        isPhoneNumberVerified: false
      });
      this.loginMode.set('google');
      this.redirectAfterLoginSuccess();
    });

  }

  signOut(){
    if(this.loginMode() === 'google'){
      google.accounts.id.disableAutoSelect();
    }
    
    this.clearUser();
    this.redirectAfterLogoutSuccess();
  }
  

  /**
   * Update any properties of the User object
   * Complete typesafe method
   * @param property - name of the property/key of User interface to update =>
   * type K refers to union type of all keys present in User interface
   * @param value - new value of the property =>
   * User[K] refers to type of K present in User interface
   * @example
   * this.updateUserProperty('name','Ratan'); //this is correct
   * this.updateUserProperty('name', 1); //this is incorrect
   *
   */
  updateUserProperty<K extends keyof User>(property:K, value:User[K]) {
      this._user.update((user) => {
        if(user != null)
         return ({...user, [property]: value });
        return user;
      });
  }

  // updateUserSettings<T extends keyof User, K extends keyof T>(key:T, subkey:K, value:T[K]) {
  //   if(this._user() == null) return;
  //   const currentkeyval = this._user()[key] ?? null;

  //   if(currentkeyval == null) return;

  //   const newsetting = {...currentkeyval, [subkey]: value};
  //   this._user.update((user) => {
  //     if(user != null)
  //       return ({...user, settings:newsetting})
  //     return user;
  //   });
  // }

}

const MOCK_USER  : User = {
  name: window[STORAGE_TYPE].getItem(AUTH_CONSTANTS.userStorageKey) || '1234',
  email: '',
  authMode: 'email',
  authVerifier: '',
  roles: [],
  isActive: false,
  lastLogin: Date.now(),
  registrationDate: Date.now(),
  phoneNumber: '',
  address: {
    id: 0,
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    isPrivate: false
  },
  avatar: '',
  notifications: [],
  settings: {
    theme: '',
    language: '',
    timezone: '',
    currency: '',
    preferredMode: '',
    notifications: false,
    emailNotifications: false,
    pushNotifications: false
  },
  isEmailVerified: false,
  isPhoneNumberVerified: false
}
