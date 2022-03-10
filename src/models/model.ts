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

export interface Geolocation {
  longitude: number;
  latitude: number;
}

export interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export interface Listing {
  discountedPrice: number;
  bathroom: number;
  parking: boolean;
  regularPrice: number;
  type: string;
  offer: boolean;
  geolocation: Geolocation;
  userRef: string;
  furnished: boolean;
  imageUrls: string[];
  timestamp: Timestamp;
  bedroom: number;
  name: string;
  location: string;
}

export interface NewListing {
  discountedPrice: number;
  bathroom: number;
  parking: boolean;
  regularPrice: number;
  type: string;
  offer: boolean;
  longitude: number;
  latitude: number;
  userRef: string;
  furnished: boolean;
  imageUrls: string[];
  timestamp: Timestamp;
  bedroom: number;
  name: string;
  location: string;
  images: FileList;
}

export interface ListingData {
  id: string;
  data: Listing;
}
