import clientPromise from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = await client.db();

    const movies = await db
      .collection('movies')
      .find({})
      .sort({ metacritic: -1 })
      .limit(20)
      .toArray();

    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: err.message });
    console.error(err);
  }
}
