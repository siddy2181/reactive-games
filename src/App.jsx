import { useState } from "react";
import Board from "./components/tic-tac-toe/Board.jsx";
import Wordle from "./components/wordle/Wordle.jsx";

const GAMES = [
  {
    id: "tic-tac-toe",
    name: "Tic-Tac-Toe",
    description: "Classic two-player X vs O.",
    component: Board,
  },
  {
    id: "wordle",
    name: "Wordle",
    description: "Guess the hidden word in six tries.",
    component: Wordle,
  },
];

function ComingSoon({ name }) {
  return <p>{name} is coming soon!</p>;
}

function App() {
  const [activeId, setActiveId] = useState(null);
  const active = GAMES.find((g) => g.id === activeId);

  return (
    <div>
      <header>
        <h1>Reactive Games</h1>
        <p>Pick a game to play!</p>
      </header>
      <main>
        {active ? (
          <section>
            <button onClick={() => setActiveId(null)}>&larr; All games</button>
            <h2>{active.name}</h2>
            {active.component ? (
              <active.component />
            ) : (
              <ComingSoon name={active.name} />
            )}
          </section>
        ) : (
          <div className="game-tiles">
            {GAMES.map((game) => (
              <button
                key={game.id}
                className={`game-tile${game.component ? "" : " soon"}`}
                onClick={() => setActiveId(game.id)}
              >
                <span className="game-tile-name">{game.name}</span>
                <span className="game-tile-desc">{game.description}</span>
                {!game.component && <span className="game-tile-badge">Soon</span>}
              </button>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
