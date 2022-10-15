import { NextApiRequest, NextApiResponse } from 'next';
import { refreshTokenService, sessionService } from '@/services/auth';
import { SessionDtoRes } from '@/dto/session';
import { methodNotAllowedError, unauthorizedError } from '@/utils/api';

export default async function session(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    if (!req.cookies.refresh) {
      return unauthorizedError(res);
    }
    if (!req.cookies.sid || !req.cookies.uid) {
      const refreshRes: SessionDtoRes = await refreshTokenService(
        req.cookies.refresh,
      );
      res.status(refreshRes.status).json(refreshRes);
      return;
    }
    const sessionRes: SessionDtoRes = await sessionService(
      req.cookies.uid,
      req.cookies.sid,
      req.cookies.token,
      req.headers.host,
    );
    if (sessionRes.cookies) {
      res.setHeader('Set-Cookie', sessionRes.cookies);
    }
    res.status(sessionRes.status).json(sessionRes);
    return;
  }
  return methodNotAllowedError(req, res);
}
