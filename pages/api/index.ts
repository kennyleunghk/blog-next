import { NextApiRequest, NextApiResponse } from 'next';

const index = (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ msg: 'Welcome to Kenny Blog Next.js API' });
};

export default index;
