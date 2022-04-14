import type { NextApiRequest, NextApiResponse } from 'next';

import { endPointGetResponse } from 'services/apiEndpoint';
import { getResponseAxiosInstance } from 'services/mail/axiosInstance';

const getResponse = async (req: NextApiRequest, res: NextApiResponse): Promise<unknown> => {
  const { method } = req;
  const {
    body: { email, firstName, lastName },
  } = req;

  return new Promise((resolve) => {
    if (method === 'POST') {
      getResponseAxiosInstance
        .post(endPointGetResponse.baseUrl.contacts, {
          name: `${firstName} ${lastName}`,
          campaign: {
            campaignId: 'iFwsA',
          },
          email,
        })
        .then((response) => {
          res.statusCode = response.status;
          res.end();
          return resolve(response.status);
        })
        .catch((error) => {
          res.statusCode = error.response;
          res.end();
          return resolve(error.response);
        });
    }
    return resolve(500);
  });
};
export default getResponse;
