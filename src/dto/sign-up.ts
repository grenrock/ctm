import { ErrorCodes } from '.';

export type SignUpDtoReq = {
  username: string;
};

export enum SignUpErrorCodes {
  USERNAME_EXISTS = 'USERNAME_EXISTS',
  AWAITING_ACTIVATION = 'AWAITING_ACTIVATION',
}

export type SignUpDtoRes = {
  status: number;
  id: string;
  code?: ErrorCodes | SignUpErrorCodes;
  password?: string;
  message?: string;
};
