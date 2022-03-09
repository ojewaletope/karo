export interface AuthDetails {
  name?: any;
  password?: string;
  timestamp?: any;
  email: string;
}

export interface ProviderUserInfo {
  providerId: string;
  displayName: string;
  federatedId: string;
  email: string;
  rawId: string;
}

export interface LoggedInUser {
  localId: string;
  email: string;
  displayName: string;
  passwordHash: string;
  emailVerified: boolean;
  passwordUpdatedAt: number;
  providerUserInfo: ProviderUserInfo[];
  validSince: string;
  lastLoginAt: string;
  createdAt: string;
  lastRefreshAt: Date;
}

export interface LoggedInUserObject {
  kind: string;
  users: LoggedInUser[];
}
