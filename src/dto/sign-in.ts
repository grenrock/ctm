export type SignInDtoReq = {
  username: string;
  password: string;
};

export enum SignInErrorCodes {
  ACCOUNT_DISABLED = 'ACCOUNT_DISABLED',
  INCORRECT_USERPASS = 'INCORRECT_USERPASS',
}

export type SignInDtoRes = {
  status: number;
  id: string;
  code?: SignInErrorCodes;
  message?: string;
  sid?: string;
  uid?: string;
  token?: string;
};
