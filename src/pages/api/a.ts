import { withSentry } from '@sentry/nextjs';
import type { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import createUser from 'services/user/create';

const create = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['GET', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200,
  });

  switch (req.method) {
    case 'POST': {
      try {
        const payload = req.body;
        const user = await createUser(payload);

        res.status(200).json({ status: 'created', user });
      } catch (error: any) {
        res.status(422).json({ status: 'not_created', error: error.message });
      }
      break;
    }
    default:
      res.status(400);
  }
};

export default withSentry(create);
