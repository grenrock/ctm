import { SignUpDtoRes } from '@/dto/sign-up';
import { methodNotAllowedError } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import { signUpService } from '@/services/auth';

export default async function signUp(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === 'POST') {
    const signUpRes: SignUpDtoRes = await signUpService(req.body.username);
    res.status(signUpRes.status).json(signUpRes);
    return;
  }
  return methodNotAllowedError(req, res);
}
