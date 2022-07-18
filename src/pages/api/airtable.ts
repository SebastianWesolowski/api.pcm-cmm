import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';
// import NextCors from 'nextjs-cors';

const cors = Cors({
  methods: ['GET', 'POST'],
});

function runMiddleware(req: any, res: any, fn: any) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

import { withSentry } from 'helpers/monitoring/sentry';
import createMinisymposium from 'services/miniSymposium/createAirtable';
const handler = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  await runMiddleware(req, res, cors);
  // await NextCors(req, res, {
  //   methods: ['GET', 'POST'],
  //   origin: '*',
  //   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  // });

  if (req.query.error) {
    throw new Error('Sentry API error test');
  }

  const { method } = req;

  if (method === 'GET') {
    res.status(200).json({ status: 'Method GET not allowed - api/minisymposium' });
  }

  if (method === 'POST') {
    try {
      const payload = req.body;
      const minisymposiumLead = await createMinisymposium(payload);

      res.status(200).json({ message: 'created', minisymposiumLead });
    } catch (error) {
      res.status(422).json({ status: 'not_created', error });
    }
  }
};

export default withSentry(handler);
// return new Response();
