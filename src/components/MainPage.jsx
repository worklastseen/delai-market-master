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
          href="http://delai.shop/blanki"
          target="_blank"
          className="card"
          onClick={props.handlePathnameChange}
        >
          <div className="image blanks" />
          <h2>Бланки</h2>
          <p className="caption">
            Уже ждут твое нанесение:
            <br />
            бери и печатай
          </p>
        </a>
        <Link to="/пошив" className="card" onClick={props.handlePathnameChange}>
          <div className="image custom" />
          <h2>Пошив</h2>
          <p className="caption">
            Уникальное решение для
            <br />
            уникальной идеи
          </p>
        </Link>
      </div>
    </div>
  );
}

export default MainPage;
