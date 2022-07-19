import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { endPointAirTable } from 'services/apiEndpoint';
import { axiosInstanceAirTable } from 'services/instances/airtableClient';

export interface IFormSignInValues {
  gender: string;
  title: string;
  firstName: string;
  lastName: string;
  email: string;
  affiliation: string;
  topic: string;
  description: string;
  keyword_1: string;
  keyword_2: string;
  keyword_3: string;
  keyword_4: string;
  privacyPolicy: boolean;
}

const airTable = async (req: NextApiRequest, res: NextApiResponse): Promise<unknown> => {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { method } = req;
  return new Promise(() => {
    if (method === 'POST') {
      axiosInstanceAirTable
        .post(endPointAirTable.baseUrl.users + '?', {
          fields: { ...req.body },
        })
        .then((response: any) => {
          res.status(201).json(response.data);
        })
        .catch((error: any) => {
          res.status(422).json(error);
        });
    }
  });
};
export default airTable;
