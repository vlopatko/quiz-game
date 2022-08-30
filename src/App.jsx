import React, { useState } from 'react';

import GameHeaderComponent from './components/GameHeader';

import StartScreen from './components/screens/Start';
import GameScreen from './components/screens/Game';
import ResultScreen from './components/screens/Result';

import styles from './style/app.module.css';

const shuffle = (answers, answer) => {
  const index = Math.floor(0 + Math.random() * (3 + 1));

  return {
    answers: [
      ...answers.slice(0, index),
      answer,
      ...answers.slice(index),
    ],
    correctAnswerIndex: index,
  };
};

const defaultGame = {
  questions: [],
  currentQuestionIndex: 0,
  currentAnswerIndex: null,
  currentAnswerState: null,
  lives: null,
  history: [],
  category: '',
  level: {},
  startedAt: 0,
  finishedAt: 0,
};

const levels = [
  {
    id: 'easy',
    name: 'Easy',
    limit: 8,
    lives: 3,
    mainColor: '#A7E0C1',
    secondColor: '#30B267',
  },
  {
    id: 'medium',
    name: 'Medium',
    limit: 10,
    lives: 2,
    mainColor: '#F9E5C0',
    secondColor: '#D4751E',
  },
  {
    id: 'hard',
    name: 'Hard',
    limit: 12,
    lives: 1,
    mainColor: '#FDDADA',
    secondColor: '#C74141',
  },
];

const categoryStyles = [
  {
    mainColor: '#F9E7E0',
    secondColor: '#F05050',
  },
  {
    mainColor: '#F5E5CC',
    secondColor: '#F3821A',
  },
  {
    mainColor: '#f8e6ac',
    secondColor: '#daa909',
  },
  {
    mainColor: '#D1EAD6',
    secondColor: '#30B267',
  },
  {
    mainColor: '#C5DFFF',
    secondColor: '#3973B7',
  },
  {
    mainColor: '#C9FFFF',
    secondColor: '#2EACBD',
  },
  {
    mainColor: '#F4DCFF',
    secondColor: '#A365BF',
  },
];

function App() {
  const savedGame = localStorage.getItem('game');

  const [loading, setLoading] = useState(true);
  const [questionsLoading, setQuestionsLoading] = useState(false);
  const [game, setGame] = useState(savedGame ? JSON.parse(savedGame) : defaultGame);

  const chooseCategory = (categ) => {
    const category = categ.value;
    const categoryName = categ.name;

    setGame({
      ...game,
      category,
      categoryName,
    });
  };

  const chooseLevel = (level) => {
    setGame({
      ...game,
      level,
    });
  };

  const startGame = async () => {
    const { category, level } = game;
    const url = `https://the-trivia-api.com/api/questions?categories=${category}&limit=${level.limit}&difficulty=easy`;
    const request = await fetch(url);

    setQuestionsLoading(true);

    if (!request.ok) return;

    const questions = await request.json();

    setTimeout(() => {
      const changedGame = {
        ...game,
        questions: questions.map(({
          question,
          correctAnswer,
          incorrectAnswers,
        }) => ({
          question,
          ...shuffle(incorrectAnswers, correctAnswer),
        })),
        lives: level.lives,
        startedAt: new Date().getTime(),
      };
      localStorage.setItem('game', JSON.stringify(changedGame));
      setGame(changedGame);
      setQuestionsLoading(false);
    }, 1000);
  };

  const restartGame = () => {
    localStorage.setItem('game', JSON.stringify(defaultGame));
    setGame(defaultGame);
  };

  const chooseAnswer = (answerIndex) => {
    setQuestionsLoading(true);

    const {
      questions,
      currentQuestionIndex,
      lives,
      history,
    } = game;

    const { correctAnswerIndex } = questions[currentQuestionIndex];
    const gameChanges = {
      currentQuestionIndex: currentQuestionIndex + 1,
    };

    if (answerIndex === correctAnswerIndex) {
      gameChanges.history = [...history, true];
    } else {
      gameChanges.history = [...history, false];
      gameChanges.lives = lives - 1;
    }

    if (gameChanges.lives < 1 || gameChanges.currentQuestionIndex >= questions.length) {
      gameChanges.finishedAt = new Date().getTime();
    }

    const changedGame = {
      ...game,
      ...gameChanges,
    };

    setGame({
      ...game,
      currentAnswerIndex: answerIndex,
      currentAnswerState: answerIndex === correctAnswerIndex
        ? styles.GameScreen_correct
        : styles.GameScreen_incorrect,
    });

    setTimeout(() => {
      setQuestionsLoading(false);
      setGame(changedGame);
    }, 1000);

    localStorage.setItem('game', JSON.stringify(changedGame));
  };

  const shareButton = (event) => {
    const social = event.target.id;
    const obj = {
      facebook: `https://www.facebook.com/sharer/sharer.php?t=Try my game '${event.target.baseURI}`,
      twitter: `https://twitter.com/intent/tweet?text=${game.lives > 0 ? 'I am won' : 'I am defeat'}, you can try to play in this game from this link: '${event.target.baseURI}'`,
      telegram: `https://t.me/share/url?url=${game.lives > 0 ? 'I am won' : 'I am defeat'}, you can try to play in this game from this link: '${event.target.baseURI}'`,
    };

    window.open(obj[social]);
  };

  return (
    <div className={styles.main}>
      <GameHeaderComponent
        game={game}
        restartGame={restartGame}
        loading={loading}
        questionsLoading={questionsLoading}
      />
      <div className={styles.window}>
        <StartScreen
          game={game}
          levels={levels}
          categoryStyles={categoryStyles}
          chooseCategory={chooseCategory}
          chooseLevel={chooseLevel}
          startGame={startGame}
          loading={loading}
          questionsLoading={questionsLoading}
          setLoading={setLoading}
        />
        <GameScreen
          game={game}
          chooseAnswer={chooseAnswer}
        />
        <ResultScreen
          game={game}
          shareButton={shareButton}
        />
      </div>
    </div>
  );
}

export default App;
