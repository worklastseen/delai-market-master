import React, { useState, useEffect } from "react";
import RequestForm from "./RequestForm.jsx";

export default function CustomPage(props) {
  useEffect(() => {
    window.scrollTo({
      top: 0
    });
  }, []);

  return (
    <div className="сustomPage">
      <h2>
        Здесь все про нестандартные решения: форма, материал и детали — этим займемся мы.
      </h2>
      <h2>
        Ты только придумываешь и утверждаешь.
        <br />
        Напиши нам в{" "}
        <a target="_blank" href="https://teleg.run/delai_tg">
          telegram
        </a>{" "}
        или на{" "}
        <a target="_blank" href="mailto: hello@delai.market">
          почту
        </a>
        , чтобы начать делать вещи прямо сейчас!
      </h2>

      <div
        className="banner"
      >
        {window.screen.width < 768 ? <div className="illustration" /> : ""}

        {window.screen.width >= 768 ? (
          <>
            <div className="colWrapper">
              <div className="column">
                <h2>в одиночку</h2>
                <ul>
                  {/* <li>изменено</li> */}
                  <li>придумать идею</li>
                  {/* <li>сделать макет</li> */}
                  {/* <li>изменено</li> */}
                  {/* <li>определиться с будущим фасоном вещи</li> */}
                  <li>найти конструктора </li>
                  <li>нормального конструктора</li>
                  {/* <li>сформировать т/з</li> */}
                  <li>подобрать ткань</li>
                  <li>в смысле только оптом?</li>
                  <li>найти фурнитуру</li>
                  <li>найти цех или ателье</li>
                  <li>пошить образец</li>
                  <li>но мы ведь не это шили</li>
                  <li>внести корректировки</li>
                  <li>еще раз заказать ткань и фурнитуру</li>
                  {/* <li>обанкротиться</li> */}
                  <li>…</li>
                  <li>отшить нормальный образец</li>
                  <li>сделать градацию</li>
                  <li>начать гуглить виды нанесения</li>
                  <li>не понять разницу</li>
                  <li>ну вроде понятно</li>
                  <li>образец готов</li>
                  <li>правда не так как представляли</li>
                  <li>теперь партия</li>
                  <li>…</li>
                </ul>
              </div>
            </div>
            <div className="colWrapper">
              <div className="column">
                <div className="logo" />
                <ul>
                  <li>придумать идею</li>
                  {/* <li>изменено</li> */}
                  <li>написать в «делай вещи»</li>
                </ul>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="colWrapper">
              <div className="column">
                <div className="logo" />
                <ul>
                  <li>придумать идею</li>
                  <li>написать в «делай вещи»</li>
                </ul>
              </div>
            </div>
            <div className="colWrapper">
              <div className="column">
                <h2>в одиночку</h2>
                <ul>
                  <li>придумать идею</li>
                  {/* <li>сделать макет</li> */}
                  {/* <li>определиться с будущим фасоном вещи</li> */}
                  <li>найти конструктора </li>
                  <li>нормального конструктора</li>
                  {/* <li>сформировать т/з</li> */}
                  <li>подобрать ткань</li>
                  <li>в смысле только оптом?</li>
                  <li>найти фурнитуру</li>
                  <li>найти цех или ателье</li>
                  <li>пошить образец</li>
                  <li>но мы ведь не это шили</li>
                  <li>внести корректировки</li>
                  <li>еще раз заказать ткань и фурнитуру</li>
                  {/* <li>обанкротиться</li> */}
                  <li>…</li>
                  <li>отшить нормальный образец</li>
                  <li>сделать градацию</li>
                  <li>начать гуглить виды нанесения</li>
                  <li>не понять разницу</li>
                  <li>ну вроде понятно</li>
                  <li>образец готов</li>
                  <li>правда не так как представляли</li>
                  <li>теперь партия</li>
                  <li>…</li>
                </ul>
              </div>
            </div>
          </>
        )}

        {window.screen.width >= 768 ? <div className="illustration" /> : ""}
      </div>
    </div>
  );
}
