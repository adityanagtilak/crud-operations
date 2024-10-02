import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;

    if (req.method === 'DELETE') {
        try {
            res.status(200).json({ message: `User with ID ${id} deleted.` });
        } catch (error) {
          console.error('Error deleting user:', error);  
          res.status(500).json({ message: 'Internal Server Error', error: error });  
        }
    } else {
        res.setHeader('Allow', ['DELETE']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

// import { NextApiRequest, NextApiResponse } from 'next';

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//     const { id } = req.query;

//     if (req.method === 'GET') {
//         try {
//             // Add your logic to retrieve user data (e.g., from a database)
//             res.status(200).json({ message: `User with ID ${id} retrieved.` });
//         } catch (error) {
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     } else if (req.method === 'DELETE') {
//         try {
//             // Add your delete logic here
//             res.status(200).json({ message: `User with ID ${id} deleted.` });
//         } catch (error) {
//             res.status(500).json({ message: 'Internal Server Error' });
//         }
//     } else {
//         res.setHeader('Allow', ['GET', 'DELETE']);
//         res.status(405).end(`Method ${req.method} Not Allowed`);
//     }
// }
