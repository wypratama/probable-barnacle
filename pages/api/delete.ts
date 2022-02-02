import type { NextApiRequest, NextApiResponse } from 'next';
import type { Items } from '../../utils/types';
import getConfig from 'next/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Items | unknown>
) {
  const { serverRuntimeConfig } = getConfig();
  try {
    const response = await fetch(serverRuntimeConfig.apiUrl + '/item/delete', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: req.headers.authorization as string,
        },
        body: JSON.stringify(req.body),
      }),
      parsedResponse = await response.json();
    if (!response.ok) throw parsedResponse;
    res.status(200).json(parsedResponse);
  } catch (error) {
    res.status(500).json(error);
  }
}
