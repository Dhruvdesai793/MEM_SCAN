import React from 'react';

const GameHeader = ({ score, moves }) => {
  return (
    <div className="header-v2">
      {/* I treat the title as a system label, not a logo */}
      <h1 className="logo-text">MEM_SCAN</h1>

      {/* Data readout feels like a terminal HUD */}
      <div className="data-readout">
        <div className="data-row">
          <span className="label">SYNC</span>
          <span className="bold">{score}/8</span>
        </div>
        <div className="data-row">
          <span className="label">CYC</span>
          <span className="bold">{moves}</span>
        </div>
      </div>

      <style jsx>{`
        .header-v2 {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        /* Strong brutalist title: tight, bold, confident */
        .logo-text {
          font-size: 1.6rem;
          letter-spacing: -1.2px;
          line-height: 1;
          margin: 0;
        }

        .data-readout {
          display: flex;
          gap: 1rem;
        }

        /* Feels like machine telemetry */
        .data-row {
          border-left: 3px solid black;
          padding-left: 6px;
        }

        .label {
          font-size: 0.55rem;
          opacity: 0.6;
        }

        .bold {
          font-weight: 900;
          font-size: 0.9rem;
        }

        @media (max-width: 900px) {
          .logo-text {
            font-size: 1.2rem;
          }
        }
      `}</style>
    </div>
  );
};

export default GameHeader;
