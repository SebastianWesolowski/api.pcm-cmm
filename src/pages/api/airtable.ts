import type { NextApiRequest, NextApiResponse } from 'next';

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
  const { method } = req;
  return new Promise((resolve) => {
    if (method === 'POST') {
      airTableAxiosInstance
        .post(endPointAirTable.baseUrl.minisymposium + '?', {
          fields: { ...req.body },
        })
        .then(() => {
          res.statusCode = 200;
          res.end();
          return resolve(200);
        })
        .catch(() => {
          res.statusCode = 500;
          res.end();
          return resolve(500);
        });
    }
    res.statusCode = 500;
    res.end();
    return resolve(500);
  });
};
export default airTable;
