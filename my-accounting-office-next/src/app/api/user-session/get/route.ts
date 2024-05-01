import { NextApiRequest, NextApiResponse } from 'next';
import { getServerSession, Session } from 'next-auth';

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const { body } = req;
        const session: Session | null = await getServerSession(body);
        if (session) {
            return Response.json({ status: 200, session: session });
        } else {
            return Response.json({ status: 401, error: 'Not authenticated' });
        }
    } catch (error) {
        return Response.json({ status: 500, error: error });
    }
}