import { SignInDtoRes } from '@/dto/sign-in';
import { signInService } from '@/services/auth';
import { methodNotAllowedError, unauthorizedError } from '@/utils/api';
import { createAuthObject, createCookieArray } from '@/utils/auth';
import { NextApiRequest, NextApiResponse } from 'next';
import type { AuthObject } from '@/utils/auth';

export default async function signIn(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const signInRes: SignInDtoRes = await signInService(
      req.body.username,
      req.body.password,
    );
    if (!signInRes.sid || !signInRes.uid || !signInRes.token) {
      return unauthorizedError(res);
    }
    const authObject: AuthObject = await createAuthObject({
      sid: signInRes.sid,
      uid: signInRes.uid,
      refresh: signInRes.token,
    });
    const cookieArray = createCookieArray(authObject, req.headers.host);
    res.setHeader('Set-Cookie', cookieArray);
    res.status(signInRes.status).json(signInRes);
    return;
  }
  return methodNotAllowedError(req, res);
}
