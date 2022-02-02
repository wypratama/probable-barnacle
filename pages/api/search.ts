import type { NextApiRequest, NextApiResponse } from 'next';
import type { Items } from '../../utils/types';
import getConfig from 'next/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Items | unknown>
) {
  const { serverRuntimeConfig } = getConfig();
  try {
    const { sku } = req.body;
    const response = await fetch(serverRuntimeConfig.apiUrl + '/item/search', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req.body),
      }),
      parsedResponse = await response.json();
    if (!response.ok) throw { error: response };
    res.status(200).json(parsedResponse);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
