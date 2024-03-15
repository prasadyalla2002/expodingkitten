import { Component } from "react";
import "./index.css";

const cardBack =
  "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710432224/exploding-kitten/u2gszsf8t7kcejzzsvmz.jpg";

class SingleCard extends Component {
  state = { showCard: false };

  onClickShowCard = () => {
    const { showCard } = this.state;
    const { cardDrawn, cardDetails } = this.props;
    const { name } = cardDetails;
    this.setState(
      (prev) => ({
        showCard: !prev.showCard,
      }),
      cardDrawn(name)
    );
  };

  renderCardBack = () => (
    <button>
      <img
        src={cardBack}
        alt="cardBack"
        className="card-back-img"
        onClick={this.onClickShowCard}
      />
    </button>
  );

  renderCardFront = () => {
    const { cardDetails } = this.props;
    const { imageUrl, name } = cardDetails;

    return (
      <div className="card-front-background">
        <img src={imageUrl} alt={name} className="card-image" />
        <p>{name}</p>
      </div>
    );
  };

  render() {
    const { showCard } = this.state;

    return (
      <li className="list-item">
        {showCard ? this.renderCardFront() : this.renderCardBack()}
      </li>
    );
  }
}

export default SingleCard;
