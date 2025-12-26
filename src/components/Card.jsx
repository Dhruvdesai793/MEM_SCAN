import React from 'react';

const Card = ({ card, onClick }) => {
  return (
    <div
      className={`brutal-card 
        ${card.isFlipped ? 'flipped' : ''} 
        ${card.isMatched ? 'matched' : ''} 
        ${card.isError ? 'error' : ''}`}
      onClick={() => onClick(card)}
    >
      <div className="card-inner">
        {/* Front = unknown unit */}
        <div className="card-face front">
          <span className="unit-id">
            #{card.id.toString().slice(2, 5)}
          </span>
        </div>

        {/* Back = revealed memory */}
        <div className="card-face back">
          {card.value}
        </div>
      </div>
    </div>
  );
};

export default Card;
