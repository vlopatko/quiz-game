import React from 'react';

import PropTypes from './propTypes';
import styles from '../style/app.module.css';

const DifficultyComponent = ({
  game,
  levels,
  chooseDifficulty,
}) => (
  levels && levels.map((difficulty) => {
    const isActive = game.difficulty.id === difficulty.id;
    const style = {
      backgroundColor: isActive ? difficulty.secondColor : difficulty.mainColor,
      color: isActive ? '#FFF' : difficulty.secondColor,
    };

    return (
      <button
        type="button"
        key={difficulty.name}
        className={styles.StartScreen_button}
        style={style}
        onClick={() => chooseDifficulty(difficulty)}
      >
        {difficulty.name}
      </button>
    );
  })
);

DifficultyComponent.propTypes = PropTypes.propTypes;

export default DifficultyComponent;
