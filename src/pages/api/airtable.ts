import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { withSentry } from 'helpers/monitoring/sentry';
import createMinisymposium from 'services/miniSymposium/createAirtable';
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
  console.log('🚀 ~ file: a.ts ~ line 23 ~ handler ~ method', method);

  if (method === 'GET') {
    res.json({
      success: true,
      message: 'Method GET not allowed - api/minisymposium',
    });
  }

  console.log('🚀 ~ file: a.ts ~ line 32 ~ handler ~ method', method);
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
