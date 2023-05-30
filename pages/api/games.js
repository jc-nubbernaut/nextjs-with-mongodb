import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    // Get a client from the MongoDB database.
    const client = await clientPromise;

    // Get the database from the client.
    const db = await client.db('games');

    // Switch on the request method.
    switch (req.method) {
      // If the request method is `GET`, fetch the list of games from the database.
      case 'GET':
        console.log('get games');
        const games = await db.collection('game-history').find({}).toArray();
        console.log('games', games);
        res.json({ status: 200, games: games });
        break;

      // If the request method is `POST`, insert a new game into the database.
      case 'POST':
        console.log('post game');
        const game = JSON.parse(req.body);
        await db.collection('game-history').insertOne(game);
        break;
    }
  } catch (err) {
    // If an error occurs, send a 500 error response.
    res.status(500).json({ error: err.message });
    console.error(err);
  }
}
