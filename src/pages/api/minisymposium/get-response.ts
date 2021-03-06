import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { withSentry } from 'helpers/monitoring/sentry';
import createGetResponse from 'services/miniSymposium/createGetResponse';
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
      message: 'Method GET not allowed - api/minisymposium/get-response',
    });
  }

  if (method === 'POST') {
    try {
      const payload = req.body;
      const getResponseLead = await createGetResponse(payload);
      res.status(202).json({ status: 'created', getResponseLead });
    } catch (error) {
      res.status(422).json({ status: 'not_created', error });
    }
  }
};

export default withSentry(handler);
