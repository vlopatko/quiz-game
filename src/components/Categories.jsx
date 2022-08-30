import React from 'react';

import PropTypes from './propTypes';
import styles from '../style/app.module.css';

const CategoriesComponent = ({
  game,
  categories,
  categoryStyles,
  chooseCategory,
}) => (
  categories && categories.map((category, i) => {
    const isActive = game.category === category.value;
    const styleIndex = i % categoryStyles.length;
    const { mainColor, secondColor } = categoryStyles[styleIndex];
    const style = {
      backgroundColor: isActive ? secondColor : mainColor,
      color: isActive ? '#FFF' : secondColor,
    };

    return (
      <button
        type="button"
        key={category.name}
        className={styles.StartScreen_button}
        style={style}
        onClick={() => chooseCategory(category)}
      >
        {category.name}
      </button>
    );
  })
);

CategoriesComponent.propTypes = PropTypes.propTypes;

export default CategoriesComponent;
