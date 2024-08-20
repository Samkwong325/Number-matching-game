// number-matching-game.js
window.initGame = (React, assetsUrl) => {
  const { useState, useEffect } = React;

  const NumberMatchingGame = ({ assetsUrl }) => {
    const [score, setScore] = useState(0);
    const [cards, setCards] = useState([]);
    const [flippedCards, setFlippedCards] = useState([]);
    const [matchedCards, setMatchedCards] = useState([]);

    useEffect(() => {
      const numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
      const initCards = shuffle(numbers).map((number, index) => ({
        number,
        index,
        isFlipped: false,
        isMatched: false,
      }));
      setCards(initCards);
    }, []);

    const shuffle = (array) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const flipCard = (index) => {
      if (flippedCards.length < 2 && !cards[index].isMatched) {
        const newCards = [...cards];
        newCards[index].isFlipped = true;
        setCards(newCards);
        setFlippedCards([...flippedCards, index]);
      }
    };

    useEffect(() => {
      if (flippedCards.length === 2) {
        const [card1Index, card2Index] = flippedCards;
        const card1 = cards[card1Index];
        const card2 = cards[card2Index];

        if (card1.number === card2.number) {
          // Match!
          const newCards = [...cards];
          newCards[card1Index].isMatched = true;
          newCards[card2Index].isMatched = true;
          setCards(newCards);
          setMatchedCards([...matchedCards, card1Index, card2Index]);
          setFlippedCards([]);
          setScore(score + 1);

          if (matchedCards.length === cards.length) {
            setTimeout(() => {
              alert(`You won! Your score is ${score}`);
            }, 500);
          }
        } else {
          // No match, flip back after a delay
          setTimeout(() => {
            const newCards = [...cards];
            newCards[card1Index].isFlipped = false;
            newCards[card2Index].isFlipped = false;
            setCards(newCards);
            setFlippedCards([]);
          }, 1000);
        }
      }
    }, [flippedCards, cards]);

    return React.createElement(
      'div',
      { className: 'number-matching-game' },
      React.createElement('h2', null, 'Number Matching Game'),
      React.createElement('p', null, `Score: ${score}`),
      React.createElement(
        'div',
        { className: 'game-board' },
        cards.map((card, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: `card ${card.isFlipped ? 'flipped' : ''} ${
                card.isMatched ? 'matched' : ''
              }`,
              onClick: () => flipCard(index),
            },
            card.isFlipped || card.isMatched ? (
              React.createElement('span', null, card.number)
            ) : (
              '?'
            )
          )
        )
      )
    );
  };

  return () => React.createElement(NumberMatchingGame, { assetsUrl: assetsUrl });
};

console.log('Number Matching Game script loaded');