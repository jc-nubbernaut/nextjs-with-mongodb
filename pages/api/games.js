import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = await client.db();

    switch (req.method) {
      case 'GET':
        console.log('get games', games);
        const games = await db.collection('game-history').find({}).toArray();
        res.json({ status: 200, games: games });
        break;
      case 'POST':
        console.log('post game', game);
        const game = JSON.parse(req.body);
        await db.collection('game-history').insertOne(game);
        break;
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
}
