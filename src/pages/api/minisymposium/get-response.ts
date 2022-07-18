import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import createGetResponse from 'services/miniSymposium/createGetResponse';

const getResponse = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  switch (req.method) {
    case 'GET': {
      return res.status(200).json({ message: 'Method not allowed.' });
    }
    case 'POST': {
      try {
        const payload = req.body;
        const getResponseLead = await createGetResponse(payload);
        res.status(202).json({ status: 'created', getResponseLead });
      } catch (error) {
        res.status(422).json({ status: 'not_created', error });
      }
      break;
    }

    default:
      res.status(400);
      return res.status(400).json({ message: 'bad_request' });
  }
};

export default getResponse;
