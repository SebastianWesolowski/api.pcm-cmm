import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { endPointGetResponse } from 'services/apiEndpoint';
import { getResponseAxiosInstance } from 'services/mail/axiosInstance';

const getResponse = async (req: NextApiRequest, res: NextApiResponse): Promise<unknown> => {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 202, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { method } = req;
  return new Promise((resolve) => {
    if (method === 'POST') {
      getResponseAxiosInstance
        .post(endPointGetResponse.baseUrl.contacts, {
          name: `${req.body.firstName} ${req.body.lastName}`,
          campaign: {
            campaignId: 'iFwsA',
          },
          email: req.body.email,
        })
        .then((response) => {
          res.statusCode = response.status;
          res.end();
          return resolve(response.status);
        })
        .catch((error) => {
          console.log('🚀 ~ file: getresponse.ts ~ line 31 ~ returnnewPromise ~ error', error);
          res.statusCode = 400;
          res.end();
          return resolve(400);
        });
    }
  });
};
export default getResponse;
