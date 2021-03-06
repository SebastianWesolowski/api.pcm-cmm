import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import createMinisymposium from 'services/miniSymposium/createAirtable';

const user = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
  await NextCors(req, res, {
    // Options
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    origin: '*',
  });

  switch (req.method) {
    case 'GET': {
      return res.status(200).json({ message: 'Method not allowed.' });
    }
    case 'POST': {
      try {
        const payload = req.body;
        const minisymposiumLead = await createMinisymposium(payload);
        res.status(200).json({ status: 'created', minisymposiumLead });
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

export default user;
