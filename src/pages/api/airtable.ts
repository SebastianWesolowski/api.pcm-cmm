import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { endPointAirTable } from 'services/apiEndpoint';
import { airTableAxiosInstance } from 'services/mail/axiosInstance';

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
  return new Promise((resolve) => {
    if (method === 'POST') {
      airTableAxiosInstance
        .post(endPointAirTable.baseUrl.minisymposium + '?', {
          fields: { ...req.body },
        })
        .then((response) => {
          res.statusCode = response.status;
          res.end();
          return resolve(response.status);
        })
        .catch((error) => {
          res.statusCode = error.response;
          res.end();
          return resolve(error.status);
        });
    }
  });
};
export default airTable;
