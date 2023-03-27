import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App.jsx";
import { ApolloProvider, Query } from "react-apollo";
import ApolloClient from "apollo-boost";
import * as serviceWorker from "./serviceWorker";
import QUERY from "./fetchData.js";

const client = new ApolloClient({
  uri:
    "https://api-eu-central-1.graphcms.com/v2/ckcdp21fb1tul01xpdo20d5lq/master"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Query query={QUERY}>
      {({ loading, error, data }) => {
        if (loading)
          return (
            <div className="loading">
              <div className="logo" />
              <div className="loader" />
            </div>
          );
        if (error)
          return (
            <div className="loading">
              <h2>Что-то пошло не так ;(</h2>
              <br />
              <h2>
                Напишите нам на hello@delai.market, и мы во всём разберёмся!
              </h2>
            </div>
          );

        return (
          <div>
            <App {...data} />
          </div>
        );
      }}
    </Query>
  </ApolloProvider>,
  document.getElementById("main_page")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
