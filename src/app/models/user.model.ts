export interface User {
  name: string;
  email: string;
  password: string;
  roles: string[];
  isActive: boolean;
  lastLogin: number;
  registrationDate: number;
  // lastPasswordChange: Date;
  // failedLoginAttempts: number;
  // lastFailedLoginAttempt: Date;
  // lastLockedOutDate: Date;
  // twoFactorEnabled: boolean;
  // twoFactorSecret: string;
  phoneNumber: string;
  address?: Address;
  avatar: string;
  notifications?: Notification[];
  settings?: Settings;
  isEmailVerified: boolean;
  isPhoneNumberVerified: boolean;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isPrivate: boolean;
}
export interface Settings{
  theme : string;
  language : string;
  timezone : string;
  currency : string;
  preferredMode : string;
  notifications : boolean;
  emailNotifications : boolean;
  pushNotifications : boolean;
  // soundNotifications : boolean;
  // enableTwoFactorAuth : boolean;
  // enableBiometricAuth : boolean;
  // enableTwoFactorEmailVerification : boolean;
  // enableTwoFactorPhoneVerification : boolean;
  // enableTwoFactorSMSVerification : boolean;
  // enableTwoFactorWhatsappVerification : boolean;
  // enableTwoFactorU2FVerification : boolean;
  // enableTwoFactorYubiKeyVerification : boolean;
  // enableTwoFactorGoogleVerification : boolean;
  // enableTwoFactorMicrosoftVerification : boolean;


}
