import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function Footer(props) {
  return (
    <div className="footer">
      <div>
        <p>Делай Вещи © 2023</p>
        <a href="mailto: hello@delai.market" target="_blank">
          hello@delai.market
        </a>
      </div>
      <p className="agreement">
        <Link
          to="/пользовательское_соглашение"
          onClick={props.handlePathnameChange}
        >
          Пользовательское соглашение
        </Link>
      </p>
    </div>
  );
}
