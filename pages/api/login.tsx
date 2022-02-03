import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string } | unknown>
) {
  const { serverRuntimeConfig } = getConfig();
  try {
    const { email, password } = req.body;
    const login = await fetch(serverRuntimeConfig.apiUrl + '/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }),
      parsedToken = await login.json();
    if (parsedToken.error) {
      throw parsedToken.error;
    }
    res.status(200).json(parsedToken);
  } catch (error) {
    res.status(500).json({ error: error });
  }
}
