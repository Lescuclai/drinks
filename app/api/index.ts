import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabase';

export async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { data, error } = await supabase
            .from('drinks')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) {
            return res.status(401).json({ error: error.message });
        }
        return res.status(200).json(data);
    }
}

export default handler;