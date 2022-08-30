import React from 'react';

import PropTypes from './propTypes';
import styles from '../style/app.module.css';

const LevelsComponent = ({
  game,
  levels,
  chooseLevel,
}) => (
  levels && levels.map((level) => {
    const isActive = game.level === level;
    const style = {
      backgroundColor: isActive ? level.secondColor : level.mainColor,
      color: isActive ? '#FFF' : level.secondColor,
    };

    return (
      <button
        key={level.name}
        className={styles.StartScreen_button}
        style={style}
        onClick={() => chooseLevel(level)}
        type="button"
      >
        {level.name}
      </button>
    );
  })
);

LevelsComponent.propTypes = PropTypes.propTypes;

export default LevelsComponent;
