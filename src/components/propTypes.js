import PropTypes from 'prop-types';

const propTypes = {
  savedGame: PropTypes.string,
  startGame: PropTypes.func,
  restartGame: PropTypes.func,
  chooseAnswer: PropTypes.func,
  chooseLevel: PropTypes.func,
  chooseCategory: PropTypes.func,
  shareButton: PropTypes.func,
  shuffle: PropTypes.func,
  game: PropTypes.shape({
    category: PropTypes.string,
    categoryName: PropTypes.string,
    currentAnswerIndex: PropTypes.number,
    currentAnswerState: PropTypes.string,
    currentQuestionIndex: PropTypes.number,
    finishedAt: PropTypes.number,
    history: PropTypes.arrayOf(PropTypes.bool),
    level: PropTypes.shape({
      id: PropTypes.string,
      limit: PropTypes.number,
      lives: PropTypes.number,
      mainColor: PropTypes.string,
      name: PropTypes.string,
      secondColor: PropTypes.string,
    }),
    lives: PropTypes.number,
    questions: PropTypes.arrayOf(PropTypes.shape({
      question: PropTypes.string,
      answers: PropTypes.arrayOf(PropTypes.string),
      correctAnswerIndex: PropTypes.number,
    })),
    startedAt: PropTypes.number,
  }).isRequired,
};

export default { propTypes };
