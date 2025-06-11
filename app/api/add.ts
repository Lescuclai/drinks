import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/supabase';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const { content } = req.body;
        const { data, error } = await supabase
            .from('drinks')
            .insert([{ content }])
            .select()
        if (error) {
            return res.status(401).json({ error: error.message });
        }
        return res.status(200).json(data);
    }
}

