import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function MainPage(props) {
  return (
    <div className="main-page">
      <h1>
        Помогаем делать вещи: <br />
        от идеи до цельной коллекции
      </h1>
      <div className="cards">
        <a
          href="https://shop.delai.market"
          target="_blank"
          className="card"
          onClick={props.handlePathnameChange}
        >
          <div className="image blanks" />
          <h2>Бланки</h2>
          <p className="caption">
            Уже готовая одежда:
            <br />
            бери и печатай
          </p>
        </a>
        <Link to="/пошив" className="card" onClick={props.handlePathnameChange}>
          <div className="image custom" />
          <h2>Пошив</h2>
          <p className="caption">
            Когда нужно сделать
            <br />
            с нуля
          </p>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
