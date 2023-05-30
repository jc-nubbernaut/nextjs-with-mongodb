import { useEffect } from 'react';
import clientPromise from '../lib/mongodb';

export default function GameSection() {
  const [games, setGames] = useState([]);

  //use useSWR to fetch data from the API
  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { data, error, loading } = useSWR('/api/games', fetcher);

  //useEffect to set the games state variable

  useEffect(() => {
    console.log('useEffect');
    if (data) {
      console.log('data', data);
      setGames(data.games);
    }
  }, [data]);

  if (loading) return <h1>Loading...</h1>;

  if (error) return <h1>Error loading games!</h1>;

  //add a form to add a new game
  const NewGameForm = () => {
    const [gameInfo, setGameInfo] = useState({
      title: '',
      score: '',
      date: '',
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      const game = {
        title: gameInfo.title,
        score: gameInfo.score,
        date: gameInfo.date,
      };
      console.log('submitting game', game);
      const res = await fetch('/api/games', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(game),
      });
      const data = await res.json();
      console.log('data', data);
      //setGames([...games, data]);
    };

    return (
      <form onSubmit={handleSubmit}>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          value={gameInfo.title}
          onChange={(e) => setGameInfo({ ...gameInfo, title: e.target.value })}
        />
        <label htmlFor='score'>Score</label>
        <input
          type='text'
          id='score'
          value={gameInfo.score}
          onChange={(e) => setGameInfo({ ...gameInfo, score: e.target.value })}
        />
        <label htmlFor='date'>Date</label>
        <input
          type='date'
          id='date'
          value={gameInfo.date}
          onChange={(e) => setGameInfo({ ...gameInfo, date: e.target.value })}
        />
        <button type='submit'>Add Game</button>
      </form>
    );
  };

  return (
    <div>
      <h1>Game History</h1>
      <ul>
        {games.map((game) => (
          <li>
            <h2>{game.title}</h2>
            <h3>{game.score}</h3>
            <p>{game.date}</p>
          </li>
        ))}
      </ul>
      <NewGameForm />
    </div>
  );
}
