import React from 'react';

import PropTypes from './propTypes';
import styles from '../style/app.module.css';

function HistoryComponent({
  game,
}) {
  const array = [];

  for (let i = 0; i < game.questions.length; i += 1) {
    if (i < game.history.length) {
      array.push(game.history[i] ? 'green' : 'red');
    } else if (i === game.history.length) {
      array.push('current');
    } else {
      array.push('grey');
    }
  }

  return (
    <div className={styles.HistoryComponent_info}>
      {array.map((el) => (
        <div key={Math.random()} className={styles[`HistoryComponent_answer-${el}`]} />
      ))}
    </div>
  );
}

HistoryComponent.propTypes = PropTypes.propTypes;

export default HistoryComponent;
