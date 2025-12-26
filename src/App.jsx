import React, { useState, useEffect } from 'react';
import GameHeader from './components/GameHeader';
import Card from './components/Card';

const cardValues = ["01","02","03","04","05","06","07","08"];

const App = () => {
  const [cards, setCards] = useState([]);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [score, setScore] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  /* I fully reset the system state here */
  const initializeGame = () => {
    const shuffled = [...cardValues, ...cardValues]
      .sort(() => Math.random() - 0.5)
      .map(value => ({
        id: Math.random(),
        value,
        isFlipped: false,
        isMatched: false,
        isError: false
      }));

    setCards(shuffled);
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves(0);
    setScore(0);
  };

  useEffect(() => initializeGame(), []);

  /* Core matching logic */
  useEffect(() => {
    if (!choiceOne || !choiceTwo) return;

    setDisabled(true);

    if (choiceOne.value === choiceTwo.value) {
      setCards(prev =>
        prev.map(card =>
          card.value === choiceOne.value
            ? { ...card, isMatched: true }
            : card
        )
      );
      setScore(s => s + 1);
      resetTurn();
    } else {
      setIsGlitching(true);

      setCards(prev =>
        prev.map(card =>
          card.id === choiceOne.id || card.id === choiceTwo.id
            ? { ...card, isError: true }
            : card
        )
      );

      setTimeout(() => {
        setCards(prev =>
          prev.map(card =>
            card.id === choiceOne.id || card.id === choiceTwo.id
              ? { ...card, isFlipped: false, isError: false }
              : card
          )
        );
        setIsGlitching(false);
        resetTurn();
      }, 700);
    }
  }, [choiceOne, choiceTwo]);

  const handleCardClick = (card) => {
    if (disabled || card.isFlipped || card.isMatched) return;
    setCards(prev =>
      prev.map(c =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      )
    );
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setMoves(m => m + 1);
    setDisabled(false);
  };

  return (
    <div className={`main-interface ${isGlitching ? 'glitch-active' : ''}`}>
      <aside className="control-deck">
        <GameHeader score={score} moves={moves} />

        <button
          className="brutal-btn primary restart-trigger"
          onClick={initializeGame}
        >
          HARD_RESET
        </button>
      </aside>

      <section className="grid-viewport">
        <div className="grid-container">
          {cards.map(card => (
            <Card key={card.id} card={card} onClick={handleCardClick} />
          ))}
        </div>
      </section>

      {score === 8 && (
        <div className="victory-overlay">
          <div className="victory-modal">
            <h1>SYNC_COMPLETE</h1>
            <button className="brutal-btn primary" onClick={initializeGame}>
              NEW_SESSION
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
