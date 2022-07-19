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

  const { method } = req;

  if (req.method === 'GET') {
    res.status(200).json({
      success: true,
      message: 'Method GET not allowed - api/user/register',
    });
    res.end();
  } else if (method === 'POST') {
    try {
      const payload = req.body;
      const newUser = await createUser(payload);
      res.status(201).json({ status: 'created', newUser, payload });
      res.end();
    } catch ({ message }) {
      if (message === 'email_taken') {
        const payload = req.body;
        res.status(207).json({ status: 'Conflict on AirTable', email: payload.email });
        res.end();
      } else {
        res.status(422).json({ status: 'not_created', message });
        res.end();
      }
    }
  } else if (req.query.error) {
    throw new Error('Sentry API error test');
  } else {
    res.status(405).json({ status: 'Method not allowed' });
    res.end();
  }
};

export default withSentry(handler);
