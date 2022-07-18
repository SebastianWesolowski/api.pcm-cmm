import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { withSentry } from 'helpers/monitoring/sentry';
import createUser from 'services/user/createUser';
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  await NextCors(req, res, {
    methods: ['GET', 'POST'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  if (req.query.error) {
    throw new Error('Sentry API error test');
  }

  const { method } = req;

  if (method === 'GET') {
    res.json({
      success: true,
      message: 'Method GET not allowed - api/user/register',
    });
  }

  if (method === 'POST') {
    try {
      const payload = req.body;
      const newUser = await createUser(payload);
      res.status(201).json({ status: 'created', newUser });
    } catch ({ message }) {
      if (message === 'email_taken') {
        const payload = req.body;
        res.status(207).json({ status: 'Conflict on AirTable', email: payload.email });
      } else {
        res.status(422).json({ status: 'not_created', message });
      }
    }
  }
};

export default withSentry(handler);
