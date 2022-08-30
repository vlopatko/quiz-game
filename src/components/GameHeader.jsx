import React from 'react';

import PropTypes from './propTypes';
import styles from '../style/app.module.css';

function GameHeaderComponent({
  game,
  restartGame,
  loading,
  questionsLoading,
}) {
  return (
    <>
      <div className={styles.GameHeaderComponent_header}>
        <button
          type="button"
          className={styles.GameHeaderComponent_closeIcon}
          onClick={restartGame}
          style={{ background: game.startedAt ? '' : 'none' }}
          disabled={!game.questions.length}
        >
          {}
        </button>
        <div className={styles.GameHeaderComponent_logoBackground}>
          <div className={styles[(loading || questionsLoading) ? 'GameHeaderComponent_logoAnimation' : 'GameHeaderComponent_logo']} />
        </div>
      </div>
      <div
        className={styles.GameHeaderComponent_description}
        style={{ display: game.questions.length ? 'none' : 'block' }}
      >
        A quiz is a form of game or mind sport in which players
        attempt to answer questions correctly
      </div>
      <div
        className={styles.GameHeaderComponent_gameOver}
        style={{ display: game.finishedAt > 0 && game.lives > 0 ? 'block' : 'none' }}
      >
        <span className={styles.GameHeaderComponent_span}>Win</span>
        {' '}
        – To gain (a prize) by succeeding in competition or contest
      </div>
      <div
        className={styles.GameHeaderComponent_gameOver}
        style={{ display: game.finishedAt > 0 && game.lives === 0 ? 'block' : 'none' }}
      >
        <span className={styles.GameHeaderComponent_span}>Defeat</span>
        {' '}
        – To overcome in battle or contest
      </div>
      <div
        className={styles.GameHeaderComponent_preface}
        style={{ display: game.questions.length ? 'none' : 'block' }}
      >
        From Wikipedia, the free encyclopedia
      </div>
      <div
        className={styles.GameHeaderComponent_preface}
        style={{ display: game.finishedAt ? 'block' : 'none' }}
      >
        From Wiktionary, the free dictionary
      </div>
    </>
  );
}

GameHeaderComponent.propTypes = PropTypes.propTypes;

export default GameHeaderComponent;
