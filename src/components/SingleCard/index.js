import { Component } from "react";
import "./index.css";

const cardBack =
  "https://res.cloudinary.com/dbwmdblhs/image/upload/v1710432224/exploding-kitten/u2gszsf8t7kcejzzsvmz.jpg";

class SingleCard extends Component {
  state = { showCard: false };

  render() {
    return (
      <li className="list-item">
        <button>
          <img src={cardBack} alt="cardBack" className="card-back-img" />
        </button>
      </li>
    );
  }
}

export default SingleCard;
