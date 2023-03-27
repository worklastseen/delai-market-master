import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function ConfPage(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  return (
    <div className="confPage">
      <div dangerouslySetInnerHTML={{ __html: props.text.html }}></div>
    </div>
  );
}
