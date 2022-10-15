export type User = {
  id: number;
  username: string;
  displayName: string;
  bio: string;
  pfp: string;
  signUpDate: string;
  lastSignInDate: string;
  banned: boolean;
  accessLevel: number;
};

export type UserDtoReq = {
  username: string;
  password: string;
};

export enum UserErrorCodes {
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
}

export type UserDtoRes = {
  status: number;
  id: string;
  code?: UserErrorCodes;
  message?: string;
  user?: User;
};
