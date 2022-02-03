import type { NextApiRequest, NextApiResponse } from 'next';
import getConfig from 'next/config';

export default async function register(
  req: NextApiRequest,
  res: NextApiResponse<{ token: string } | unknown>
) {
  const { serverRuntimeConfig } = getConfig();
  try {
    const { email, password } = req.body,
      response = await fetch(serverRuntimeConfig.apiUrl + '/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }),
      parsedResponse = await response.json();
    if (parsedResponse.success) {
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
    } else {
      throw parsedResponse;
    }
  } catch (error) {
    res.status(500).json(error);
  }
}
