import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import createMinisymposium from 'services/miniSymposium/createAirtable';

const minisymposium = async (req: NextApiRequest, res: NextApiResponse): Promise<any> => {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  });

  const { method } = req;
  if (method === 'GET') {
    return res.status(200).json({ message: 'Method not allowed. - GET ' });
  }

  if (method === 'POST') {
    try {
      const payload = req.body;
      const minisymposiumLead = await createMinisymposium(payload);
      return res.status(200).json({ status: 'created', minisymposiumLead });
    } catch (error) {
      return res.status(422).json({ status: 'not_created', error });
    }
  }
  return res.status(200).json({ message: 'ERR' });
};
export default minisymposium;
