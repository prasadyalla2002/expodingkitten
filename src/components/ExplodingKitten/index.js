import { Component } from "react";
import { v4 as uuidV4 } from "uuid";
import SingleCard from "../SingleCard";

import "./index.css";

const gameCards = [
  {
    imageUrl:
      "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710427678/exploding-kitten/jblzrjyctl0ls8bd5ouy.jpg",
    name: "Cat",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710427857/exploding-kitten/ikik1s8ovwevmkafjncq.jpg",
    name: "Diffuser",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710427784/exploding-kitten/jrlxq0kbapkk7mugljco.jpg",
    name: "Shuffle",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710428011/exploding-kitten/l8kcsq8h2nzgt7gjm9xp.jpg",
    name: "Bomb",
  },
];

const gameStatusConstants = {
  initial: "INITIAL",
  inProgress: "INPROGRESS",
  won: "WON",
  lost: "LOST",
};

class ExplodingKitten extends Component {
  state = {
    gameStatus: gameStatusConstants.initial,
    diffusers: 0,
    cards: [],
    previousCard: "",
  };

  componentDidMount() {
    const shuffledCards = this.shuffleCards(gameCards);
    this.setState({ cards: shuffledCards });
  }

  shuffleCards = (array) => {
    const cardsDeck = array.slice();
    for (let i = cardsDeck.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsDeck[i], cardsDeck[j]] = [cardsDeck[j], cardsDeck[i]];
    }
    const randomNumber = Math.floor(Math.random() * (4 - 0));
    const randomCard = gameCards[randomNumber];
    const shuffledDeckOfFive = [...cardsDeck, randomCard];

    return shuffledDeckOfFive;
  };

  onClickStartGame = () => {
    this.setState({ gameStatus: gameStatusConstants.inProgress });
  };

  renderStartButton = () => {
    return (
      <div className="start-button-container">
        <button
          type="button"
          className="start-game-button"
          onClick={this.onClickStartGame}
        >
          Start Game
        </button>
      </div>
    );
  };

  cardDrawn = (name) => {
    const { cards } = this.state;

    if (name === "Cat") {
      const removeFirstOccurrence = (value) => {
        const drawnCardDetails = cards.map((each) => each.name);
        const index = drawnCardDetails.indexOf(value);
        console.log(index);
        if (index !== -1) {
          const newArray = [...cards];
          newArray.splice(index, 1);
          return newArray;
        }
      };
      this.setState({ cards: removeFirstOccurrence(name), previousCard: name });
    } else if (name === "Diffuser") {
      const removeFirstOccurrence = (value) => {
        const drawnCardDetails = cards.map((each) => each.name);
        const index = drawnCardDetails.indexOf(value);
        if (index !== -1) {
          const newArray = [...cards];
          newArray.splice(index, 1);
          return newArray;
        }
      };
      this.setState((prev) => ({
        cards: removeFirstOccurrence(name),
        diffusers: prev.diffusers + 1,
        previousCard: name,
      }));
    } else if (name === "Bomb") {
      const { diffusers } = this.state;
      if (diffusers >= 1) {
        const removeFirstOccurrence = (value) => {
          const drawnCardDetails = cards.map((each) => each.name);
          const index = drawnCardDetails.indexOf(value);
          console.log(index);
          if (index !== -1) {
            const newArray = [...cards];
            newArray.splice(index, 1);
            return newArray;
          }
        };
        this.setState((prev) => ({
          cards: removeFirstOccurrence(name),
          diffusers: prev.diffusers - 1,
          previousCard: name,
        }));
      } else {
        this.setState({
          gameStatus: gameStatusConstants.lost,
          previousCard: name,
        });
      }
    } else if (name === "Shuffle") {
      this.setState({
        cards: this.shuffleCards(gameCards),
        previousCard: name,
        diffusers: 0,
      });
    }
  };

  renderCards = () => {
    const { cards } = this.state;
    return (
      <>
        {cards.length <= 1 ? (
          this.renderSuccessView()
        ) : (
          <ul className="cards-list">
            {cards.map((eachCard) => (
              <SingleCard
                cardDetails={eachCard}
                key={uuidV4()}
                cardDrawn={this.cardDrawn}
              />
            ))}
          </ul>
        )}
      </>
    );
  };

  onClickRetry = () => {
    this.setState({
      diffusers: 0,
      gameStatus: gameStatusConstants.inProgress,
      previousCard: "",
      cards: this.shuffleCards(gameCards),
    });
  };

  renderFailureView = () => {
    return (
      <div className="result-container">
        <img
          src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1710520688/exploding-kitten/mm1xq74fhdvpkuyujzbc.jpg"
          alt="result"
          className="result-img"
        />
        <h1 className="result-text">Game Over!</h1>
        <button className="retry-game-button" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    );
  };

  renderSuccessView = () => {
    return (
      <div className="result-container">
        <img
          src="https://res.cloudinary.com/dbwmdblhs/image/upload/v1710519265/exploding-kitten/hojuh91sictdn56mrblq.jpg"
          alt="you-won"
          className="result-img"
        />
        <h1 className="result-text">You Won!</h1>
        <button className="retry-game-button" onClick={this.onClickRetry}>
          Retry
        </button>
      </div>
    );
  };

  renderGame = () => {
    const { gameStatus } = this.state;

    switch (gameStatus) {
      case gameStatusConstants.initial:
        return this.renderStartButton();
      case gameStatusConstants.inProgress:
        return this.renderCards();
      case gameStatusConstants.won:
        return this.renderStartButton();
      case gameStatusConstants.lost:
        return this.renderFailureView();
      default:
        return null;
    }
  };

  render() {
    const { previousCard } = this.state;
    let img;
    switch (previousCard) {
      case "Cat":
        img =
          "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710427678/exploding-kitten/jblzrjyctl0ls8bd5ouy.jpg";
        break;
      case "Bomb":
        img =
          "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710428011/exploding-kitten/l8kcsq8h2nzgt7gjm9xp.jpg";
        break;
      case "Shuffle":
        img =
          "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710427784/exploding-kitten/jrlxq0kbapkk7mugljco.jpg";
        break;
      case "Diffuser":
        img =
          "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710427857/exploding-kitten/ikik1s8ovwevmkafjncq.jpg";
        break;
      default:
        img =
          "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710518729/exploding-kitten/yy6ospadekqjgkena56y.jpg";
        break;
    }

    return (
      <div className="game-background">
        <h1 className="game-heading">Exploding Kitten</h1>
        {this.renderGame()}
        <p className="previous-card-details">
          Previous Card:{" "}
          <img src={img} alt="previous-card" className="previous-card-img" />
        </p>
      </div>
    );
  }
}

export default ExplodingKitten;
