import React, { useState, useEffect } from 'react';

import CategoriesComponent from '../Categories';
import LevelsComponent from '../Levels';
import PropTypes from '../propTypes';

import styles from '../../style/app.module.css';

function StartScreen({
  game,
  levels,
  categoryStyles,
  chooseCategory,
  chooseLevel,
  startGame,
  loading,
  questionsLoading,
  setLoading,
}) {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const request = await fetch('https://the-trivia-api.com/api/categories');

      if (!request.ok) return;

      const response = await request.json();
      const keys = Object.keys(response);
      const categoriesArray = [];

      keys.forEach((name) => {
        const obj = {
          name,
          value: response[name].sort((a, b) => b.length - a.length)[0],
        };
        categoriesArray.push(obj);
      });

      setTimeout(() => {
        setLoading(false);
        setCategories(categoriesArray);
      }, 1000);
    };

    fetchCategories();
  }, []);

  if (game.questions.length) return null;
  if (loading) return <div>Loading...</div>;

  return (
    <>
      <div>
        <div className={styles.StartScreen_windowHeaderName}>Let&apos;s try to play game</div>
        <div className={styles.StartScreen_gameInstruction}>
          Choose the category that suits you and the difficulty of the questions
        </div>
      </div>
      <div className={styles.StartScreen_option}>
        <div className={styles.StartScreen_gameProperty}>
          <div className={styles.StartScreen_gamePropertyName}>category</div>
          <CategoriesComponent
            game={game}
            categories={categories}
            categoryStyles={categoryStyles}
            chooseCategory={chooseCategory}
          />
        </div>
      </div>
      <div className={styles.StartScreen_option}>
        <div className={styles.StartScreen_gameProperty}>
          <div className={styles.StartScreen_gamePropertyName}>difficulty</div>
          <LevelsComponent
            game={game}
            levels={levels}
            chooseLevel={chooseLevel}
          />
        </div>
      </div>
      <div className={styles.StartScreen_triviaInfo}>
        All questions are taken from an excellent user-contributed database
        {' '}
        <a
          className={styles.StartScreen_triviaInfoLink}
          target="_blank"
          href="https://the-trivia-api.com"
          rel="noreferrer"
        >
          The Trivia API
        </a>
      </div>
      <button
        type="button"
        className={styles.StartScreen_buttonGo}
        disabled={!(game.category.length && Object.keys(game.level).length)}
        onClick={startGame}
      >
        {questionsLoading ? 'Loading...' : 'Play quiz!'}
      </button>
    </>

  );
}

StartScreen.propTypes = PropTypes.propTypes;

export default StartScreen;
