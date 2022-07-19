import { NextApiRequest, NextApiResponse } from 'next';
import { createRouter } from 'next-connect';

import { withSentry } from 'helpers/monitoring/sentry';
import isExistEmail from 'services/helpers/isExistEmail';
// import createUser from 'services/user/createUser';

const router = createRouter<NextApiRequest, NextApiResponse>();

router
  .get(async (_req, res) => {
    res.status(200).json({
      success: true,
      message: 'Method GET not allowed - api/user/register',
    });
  })
  .post(async (req, res) => {
    const { email } = req.body;
    const result = await isExistEmail('users', email);
    res.status(201).json({ status: `${email} is`, result });
  });

// create a handler from router with custom
// onError and onNoMatch
export default withSentry(
  router.handler({
    onError: (err: any, _req: NextApiRequest, res: NextApiResponse<any>) => {
      console.error(err.stack);
      res.status(500).end(`Something broke - ${err.message}`);
    },
    onNoMatch: (_req, res) => {
      res.status(404).end('Page is not found');
    },
  })
);
