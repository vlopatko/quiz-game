import React from 'react';

import HistoryComponent from '../History';
import PropTypes from '../propTypes';

import styles from '../../style/app.module.css';

function GameScreen({
  game,
  chooseAnswer,
}) {
  if (!game.questions.length || game.finishedAt > 0 || game.lives === 0) return null;

  const {
    questions,
    currentQuestionIndex,
    lives,
    currentAnswerIndex,
    currentAnswerState,
  } = game;

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div>
      <div className={styles.header}>
        <div className={styles.GameScreen_livesInfo}>
          <img
            src="/Heartheart.svg"
            className={styles.GameScreen_liveIcon}
            alt="heart icon"
          />
          {lives}
        </div>
        <HistoryComponent game={game} />
      </div>
      <div className={styles.GameScreen_headerText}>
        {`Question ${currentQuestionIndex + 1} of ${questions.length}`}
      </div>
      <div className={styles.GameScreen_currentQuestion}>
        {currentQuestion.question}
      </div>
      {currentQuestion.answers && currentQuestion.answers.map((answer, i) => (
        <button
          type="button"
          className={currentAnswerIndex === i ? currentAnswerState : styles.GameScreen_variant}
          key={new Date() + answer}
          onClick={() => (chooseAnswer(i))}
          disabled={currentAnswerIndex}
        >
          {answer}
        </button>
      ))}
    </div>
  );
}

GameScreen.propTypes = PropTypes.propTypes;

export default GameScreen;
