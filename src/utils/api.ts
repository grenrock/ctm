import { NextApiRequest, NextApiResponse } from 'next';

type okAble = {
  status: number;
  [propName: string]: unknown;
};

export function ok(res: okAble | Response) {
  return res.status >= 200 && res.status <= 299;
}

export function methodNotAllowedError(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  res.status(405).json({ 'Method not allowed': req.method });
}

export function unauthorizedError(res: NextApiResponse) {
  res.status(401).json({ message: 'Unauthorized' });
}

export function getBaseUrl(host: string) {
  if (host.includes('localhost')) {
    return `http://localhost:3000`;
  } else {
    return `https://communityteammanagement.com`;
  }
}

export function getBaseApiUrl(host: string) {
  if (host.includes('localhost')) {
    return `http://localhost:3000/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  } else {
    return `https://communityteammanagement.com/api/${process.env.NEXT_PUBLIC_API_VERSION}`;
  }
}
