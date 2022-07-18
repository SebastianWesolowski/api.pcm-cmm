import { NextApiRequest, NextApiResponse } from 'next';

import createUser from 'services/user/create';

export default async (req: NextApiRequest, res: NextApiResponse) => {
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
