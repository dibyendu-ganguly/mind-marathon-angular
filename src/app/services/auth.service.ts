import { Settings, User } from './../models/user.model';
import { Injectable, signal, WritableSignal } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  private user: WritableSignal<User|null> = signal(null);

  getUser() {
    return MOCK_USER;
    return this.user;
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
      this.user.update((user) => {
        if(user != null)
         return ({...user, [property]: value });
        return user;
      });
  }

  // updateUserSettings<T extends keyof User, K extends keyof T>(key:T, subkey:K, value:T[K]) {
  //   if(this.user() == null) return;
  //   const currentkeyval = this.user()[key] ?? null;

  //   if(currentkeyval == null) return;

  //   const newsetting = {...currentkeyval, [subkey]: value};
  //   this.user.update((user) => {
  //     if(user != null)
  //       return ({...user, settings:newsetting})
  //     return user;
  //   });
  // }

}

const MOCK_USER  : User = {
  name: localStorage.getItem('userId') || '1234',
  email: '',
  password: '',
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
