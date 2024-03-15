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
    noOfCards: 5,
    diffusers: 0,
    cards: [],
  };

  componentDidMount() {
    const { noOfCards } = this.state;
    const cardsArray = [];

    for (let i = 0; i < noOfCards; i++) {
      let randomNumber = Math.floor(Math.random() * (4 - 0));
      let randomCard = gameCards[randomNumber];
      randomCard["id"] = uuidV4();
      cardsArray.push(randomCard);
    }
    this.setState({ cards: cardsArray });
  }

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

  renderCards = () => {
    const { cards } = this.state;
    return (
      <ul className="cards-list">
        {cards.map((eachCard) => (
          <SingleCard cardDetails={eachCard} key={eachCard.id} />
        ))}
      </ul>
    );
  };

  render() {
    const { gameStatus } = this.state;
    return (
      <div className="game-background">
        <h1 className="game-heading">Exploding Kitten</h1>
        {this.renderCards()}
      </div>
    );
  }
}

export default ExplodingKitten;
