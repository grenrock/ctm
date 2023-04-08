import { SessionDtoRes, SessionErrorCodes } from '@/dto/session';
import { SignInErrorCodes, SignInDtoRes } from '@/dto/sign-in';
import { SignUpDtoRes, SignUpErrorCodes } from '@/dto/sign-up';
import { getCognitoService } from '@/utils/aws';
import { createUser, getUser } from '@/utils/mysql';
import { redisDel, redisGet, redisSet } from '@/utils/redis';
import { decodeAccessToken } from '@/utils/token';
import { ok } from '@/utils/api';
import short from 'short-uuid';
import type { AuthObject } from '@/utils/auth';
import { createAuthObject, createCookieArray } from '@/utils/auth';
import { isUsername } from '@/utils/regex';
import { ErrorCodes } from '@/dto';

export async function signInService(
  username: string,
  password: string,
): Promise<SignInDtoRes> {
  const user = await getUser(username, 'username');
  if (!user) {
    return {
      status: 401,
      code: SignInErrorCodes.INCORRECT_USERPASS,
      id: 'WPBrF0',
    };
  }
  const signInParams = {
    ClientId: process.env.CTM_CLIENT_ID || '',
    AuthFlow: 'USER_PASSWORD_AUTH',
    AuthParameters: {
      USERNAME: user.id,
      PASSWORD: password,
    },
  };
  const cognito = getCognitoService();
  return new Promise<SignInDtoRes>((resolve) => {
    cognito.initiateAuth(signInParams, (err, data) => {
      if (err) {
        resolve({
          status: 401,
          id: '9e0jd5',
          code: SignInErrorCodes.INCORRECT_USERPASS,
          message: err.code,
        });
      } else {
        redisGet(user.id).then((sid) => {
          if (sid) {
            resolve({
              status: 201,
              sid: sid,
              uid: user.id,
              token: data.AuthenticationResult?.RefreshToken,
              id: '8yIso0',
            });
          } else {
            const sessionId = short.generate();
            redisSet(
              user.id,
              `${sessionId}-${user.access}-${data.AuthenticationResult?.AccessToken}`,
              3600,
            ).then(() => {
              resolve({
                status: 201,
                sid: sessionId,
                uid: user.id,
                token: data.AuthenticationResult?.RefreshToken,
                id: '0FKWex',
              });
            });
          }
        });
      }
    });
  });
}

export async function refreshTokenService(
  refreshToken: string,
): Promise<SessionDtoRes> {
  const params = {
    ClientId: process.env.CTM_CLIENT_ID || '',
    AuthFlow: 'REFRESH_TOKEN',
    AuthParameters: {
      REFRESH_TOKEN: refreshToken,
    },
  };
  const cognito = getCognitoService();
  const refreshRes = await new Promise<SessionDtoRes>((resolve) => {
    cognito.initiateAuth(params, (err, data) => {
      if (data.AuthenticationResult) {
        resolve({
          status: 201,
          token: data.AuthenticationResult.AccessToken,
          id: 'hTWVoC',
        });
      } else {
        resolve({
          status: 401,
          id: 'vFVuNA',
          code: SessionErrorCodes.REFRESH_FAILED,
          message: err.code,
        });
      }
    });
  });
  if (!refreshRes.token) {
    return refreshRes;
  }
  const uid = (await decodeAccessToken(refreshRes.token || '')).username || '';
  const user = await getUser(uid, 'id');
  if (!user) {
    return {
      status: 401,
      code: SessionErrorCodes.REFRESH_FAILED,
      id: 'y97CjQ',
    };
  }
  const sessionId = short.generate();
  await redisSet(uid, `${uid}-${user.access}-${refreshRes.token}`, 3600);
  return {
    status: 201,
    sid: sessionId,
    uid: uid,
    token: refreshToken,
    id: 'NkLQ4K',
  };
}

export async function sessionService(
  uid: string | undefined,
  sid: string | undefined,
  refreshToken: string | undefined,
  host: string | undefined,
): Promise<SessionDtoRes> {
  if (!uid || !sid || !refreshToken) {
    return {
      status: 400,
      message: 'Unauthorized',
      id: 'lx7ARE',
    };
  }
  const storedSid = await redisGet('uid');
  if (storedSid?.split('-')[0] === sid) {
    return {
      status: 200,
      id: 'AjzP1y',
    };
  } else if (refreshToken) {
    const refreshTokenRes = await refreshTokenService(refreshToken);
    if (ok(refreshTokenRes)) {
      const authObject: AuthObject = await createAuthObject({
        sid: refreshTokenRes.sid || '',
        uid: refreshTokenRes.uid || '',
        refresh: refreshTokenRes.token || '',
      });
      const cookieArray = createCookieArray(authObject, host);
      return {
        status: refreshTokenRes.status,
        sid: refreshTokenRes.sid,
        uid: refreshTokenRes.uid,
        token: refreshTokenRes.token,
        cookies: cookieArray,
        id: 'RUAmMe',
      };
    } else {
      return {
        status: 500,
        message: 'Server error',
        id: 'nNmPpk',
      };
    }
  } else {
    return {
      status: 400,
      message: 'Unauthorized',
      id: 'ewT7G2',
    };
  }
}

export async function signOutService(uid: string) {
  const accessToken = (await redisGet(uid))?.split('-')[2] || '';
  await redisDel(uid);
  return new Promise<void>((resolve) => {
    const cognito = getCognitoService();
    cognito.globalSignOut({ AccessToken: accessToken }, () => {
      resolve();
    });
  });
}

export async function signUpService(username: string): Promise<SignUpDtoRes> {
  if (!isUsername(username)) {
    return {
      status: 400,
      id: 'slPDt2',
      code: ErrorCodes.INVALID_DATA,
    };
  }
  const existingUser = await getUser(username, 'username');
  if (existingUser) {
    return {
      status: 400,
      id: 'XuZwt1',
      code: SignUpErrorCodes.USERNAME_EXISTS,
    };
  }
  // TODO: VERIFY ON IB
  await createUser(username);
  const user = await getUser(username, 'username');
  const tempPassword = short.generate();
  const params = {
    UserPoolId: process.env.CTM_USER_POOL_ID || '',
    Username: user.id.toString(),
    TemporaryPassword: tempPassword,
  };
  const cognito = getCognitoService();
  return new Promise<SignUpDtoRes>((resolve) => {
    cognito.adminCreateUser(params, (err) => {
      if (err) {
        resolve({
          status: 500,
          id: 'zr6c8c',
          code: ErrorCodes.BACKEND_ERROR,
          message: err.message,
        });
      } else {
        resolve({
          status: 201,
          id: 'Uh1njy',
          password: tempPassword,
        });
      }
    });
  });
}
