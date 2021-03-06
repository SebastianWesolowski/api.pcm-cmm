import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import logIn from 'services/user/logIn';

const user = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {
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
        const logInCallBack = await logIn(payload);
        res.status(201).json({ status: 'log_in', logInCallBack });
      } catch ({ message }) {
        if (message === 'email_taken') {
          const payload = req.body;
          res.status(207).json({ status: 'Conflict', email: payload.email });
          res.end();
        } else {
          res.status(422).json({ status: 'not_created', message });
        }
      }
      break;
    }

    default:
      res.status(400);
      return res.status(400).json({ message: 'bad_request' });
  }
};

export default user;
