import { NextApiRequest, NextApiResponse } from 'next';
import { methodNotAllowedError, unauthorizedError } from '@/utils/api';
import { sessionService } from '@/services/auth';
import { SessionDtoRes } from '@/dto/session';
import { UserDtoRes } from '@/dto/user';
import { userService } from '@/services/user';
import { ok } from '@/utils/api';

export default async function username(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'GET') {
    if (!req.query.username) {
      res.status(400).json({ message: 'Bad request' });
      return;
    }
    const sessionRes: SessionDtoRes = await sessionService(
      req.cookies.uid,
      req.cookies.sid,
      req.cookies.token,
      req.headers.host,
    );
    if (!ok(sessionRes) || !sessionRes.uid) {
      return unauthorizedError(res);
    }
    if (sessionRes.cookies) {
      res.setHeader('Set-Cookie', sessionRes.cookies);
    }
    const userRes: UserDtoRes = await userService(
      sessionRes.uid,
      req.query.username.toString(),
    );
    res.status(userRes.status).json({ userRes });
    return;
  }
  return methodNotAllowedError(req, res);
}
