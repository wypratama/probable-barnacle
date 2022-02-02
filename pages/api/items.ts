// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import type { Items, ItemsWithKey } from '../../utils/types';
import getConfig from 'next/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Array<ItemsWithKey> | unknown>
) {
  const { serverRuntimeConfig } = getConfig();
  try {
    const response = await fetch(serverRuntimeConfig.apiUrl + '/items'),
      parsedResponse = await response.json(),
      withMappedKey = await Promise.all(
        parsedResponse.map((item: Items, i: number) => ({
          ...item,
          key: item.id,
        }))
      );
    res.status(200).json(withMappedKey);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
