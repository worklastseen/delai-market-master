import React, { useState } from "react";

export default function FaqPage(props) {
  return (
    <div className="faqPage">
      {props.questions.map((question, i) => {
        return <Question key={i} question={question} open={false} />;
      })}
    </div>
  );
}

function Question(props) {
  const [open, setOpen] = useState(props.open);

  return (
    <div className={open ? "question open" : "question"}>
      <h2 id="question" onClick={() => setOpen(!open)}>
        {props.question.question}
      </h2>
      <h2 className={open ? "visible" : ""} id="answer">
        {props.question.answer}
      </h2>
    </div>
  );
}
