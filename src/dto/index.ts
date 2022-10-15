export enum ErrorCodes {
  UNKNOWN_ERROR = 'UNKNOWN_ERROR',
  BACKEND_ERROR = 'BACKEND_ERROR', // 500
  INVALID_DATA = 'INVALID_DATA', // 400
  NOT_AUTHENTICATED = 'NOT_AUTHENTICATED', // 401
  UNAUTHORIZED = 'UNAUTHORIZED', // 403
  NOT_FOUND = 'NOT_FOUND', // 404
}

export type Dto = {
  status: number;
  id: string;
  code?: ErrorCodes | string;
  message?: string;
};
