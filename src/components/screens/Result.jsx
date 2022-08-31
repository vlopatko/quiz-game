import React, { useEffect } from 'react';

import confetti from 'canvas-confetti';
import PropTypes from '../propTypes';

import styles from '../../style/app.module.css';

function ResultScreen({
  game,
  shareButton,
}) {
  useEffect(() => {
    if (game.finishedAt > 0 && game.lives > 0) confetti();
  }, [game.finishedAt]);

  if (game.finishedAt === 0) return null;

  const playTimeAll = Math.round((game.finishedAt - game.startedAt) / 1000);
  const playTimeMin = Math.floor(playTimeAll / 60) > 9 ? Math.floor(playTimeAll / 60) : `0${Math.floor(playTimeAll / 60)}`;
  const playTimeSec = (playTimeAll - 60 * Math.floor(playTimeAll / 60)) > 9 ? playTimeAll - 60 * Math.floor(playTimeAll / 60) : `0${playTimeAll - 60 * Math.floor(playTimeAll / 60)}`;

  const timeOfPlay = () => `${playTimeMin}:${playTimeSec}`;

  return (
    <div className={styles.window}>
      <div
        className={styles.ResultScreen_gameOverText}
      >
        {game.lives > 0 ? 'You won' : 'You defeat'}
      </div>
      <div className={styles.ResultScreen_panel}>
        <div className={styles.ResultScreen_panelBoxLeft}>
          <div
            className={styles.ResultScreen_gameStatLeft}
          >
            {timeOfPlay()}
          </div>
          <div className={styles.ResultScreen_gameStatText}>Time</div>
        </div>
        <div className={styles.ResultScreen_panelBoxRight}>
          <div className={styles.ResultScreen_gameStatRight}>{game.lives}</div>
          <div className={styles.ResultScreen_gameStatText}>Lives</div>
        </div>
        <div className={game.lives > 0
          ? styles.ResultScreen_gameWin
          : styles.ResultScreen_gameLose}
        />
      </div>
      <div className={styles.ResultScreen_gameInfo}>
        Category:&nbsp;
        {game.categoryName}
      </div>
      <div className={styles.ResultScreen_gameInfo}>
        Difficulty:&nbsp;
        {game.level.name}
      </div>
      <div className={styles.ResultScreen_shareResults}>Share result</div>
      <div className={styles.ResultScreen_sharePanel}>
        <button
          type="button"
          id="twitter"
          className={styles.ResultScreen_twitter}
          alt="Twitter Share Link"
          onClick={(event) => { shareButton(event); }}
        />
        <button
          type="button"
          id="facebook"
          className={styles.ResultScreen_facebook}
          alt="Facebook Share Link"
          onClick={(event) => { shareButton(event); }}
        />
        <button
          type="button"
          id="telegram"
          className={styles.ResultScreen_telegram}
          alt="Telegram Share Link"
          onClick={(event) => { shareButton(event); }}
        />
      </div>
    </div>
  );
}

ResultScreen.propTypes = PropTypes.propTypes;

export default ResultScreen;
