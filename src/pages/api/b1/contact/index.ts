import { methodNotAllowedError } from '@/utils/api';
import { NextApiRequest, NextApiResponse } from 'next';
import sendContactRequest from '@/services/contact';

export default async function contact(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const body = JSON.parse(req.body);
  if (!req.headers.referer?.endsWith('contact')) {
    res.status(201).json({});
    return;
  }
  if (req.method === 'POST') {
    await sendContactRequest(
      body.name,
      body.phone,
      body.email,
      body.assocName,
      body.assocAddr,
      body.details,
    );
    res.status(201).json({});
    return;
  }
  return methodNotAllowedError(req, res);
}
