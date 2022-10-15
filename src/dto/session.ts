export type SessionDtoReq = {
  username: string;
  password: string;
};

export enum SessionErrorCodes {
  REFRESH_FAILED = 'REFRESH_FAILED',
}

export type SessionDtoRes = {
  status: number;
  id: string;
  code?: SessionErrorCodes;
  message?: string;
  sid?: string;
  uid?: string;
  token?: string;
  cookies?: string[];
};
