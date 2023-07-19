import React, { useState, useEffect } from "react";
import RequestForm from "./RequestForm.jsx";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import ClipboardJS from "clipboard";

function BlanksPage(props) {
  const [openNoticeName, setOpenNoticeName] = useState();
  const [bgLinkDisabled, setBgLinkDisabled] = useState(false);
  const [currentPathname, setCurrentPathname] = useState(
    decodeURI(window.location.pathname)
  );
  const [orderPopupOpen, setOrderPopupOpen] = useState(false);
  const [clipboardOrder, setClipboardOrder] = useState("");

  useEffect(() => {
    window.scrollTo({
      top: 0
    });

    setTimeout(function() {
      new ClipboardJS(".copy-btn");
    }, 10);
  }, []);

  useEffect(() => {
    document.body.classList.remove("no-scroll");
    window.addEventListener("popstate", function() {
      document.body.classList.remove("no-scroll");
    });

    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  }, []);

  useEffect(() => {
    let content = [];
    if (props.selectedBlanks.length > 0) {
      content.push("Привет! Я хочу сделать заказ на бланки. \n\n");
      content.push("Бланки: \n");
      props.selectedBlanks.forEach((blank, i) => {
        content.push(`${blank.name}, `);
        if (blank.thickness) {
          content.push(`${blank.thickness}, `);
        }
        content.push(blank.colors.join(", "));
        content.push("\n");
      });
      content.push("\n");
      if (props.selectedPrints.length > 0) {
        content.push("Нанесение: \n");
        content.push(props.selectedPrints.join(", "));
      }
    } else {
      content.push("Привет! Я хочу сделать заказ");
    }
    setClipboardOrder(content.join(""));
  }, [
    JSON.stringify(props.selectedBlanks),
    JSON.stringify(props.selectedPrints)
  ]);

  function removeBlank(name) {
    props.removeBlank(name);
    setBgLinkDisabled(!bgLinkDisabled);
  }

  function toggleLinkDisable() {
    setBgLinkDisabled(!bgLinkDisabled);
  }

  function toggleCardHover() {
    let cards = document.querySelectorAll(".blank-card");
    cards.forEach((card, i) => {
      card.classList.toggle("hovered");
    });
  }

  function copyAndWrite() {
    let text = "Заказ скопирован в буфер обмена";
    props.showNotice(text);
    window.open("https://teleg.run/delai_tg", "_blank");
    // setTimeout(function() {
    //   window.open("https://teleg.run/delai_tg", "_blank");
    // }, 2000);
  }

  return (
    <div className="blanks-page">
      <h2>1. Выбери бланки</h2>
      <div className="blanks-grid">
        {props.blanks.map((blank, i) => {
          let imgStyle = {
            backgroundImage: `url(${blank.image[0].url})`
          };
          return (
            <div key={i} className="blank-card-wrapper">
              <div key={i} className="blank-card">
                {blank.soldout ? (
                  <p className="souldoutBadge">нет в наличии</p>
                ) : (
                  ""
                )}
                <div className="colors">
                  {blank.colors.map((color, i) => {
                    return <div className={`color ${color}`} />;
                  })}
                </div>
                <div className="img" style={imgStyle} />
                <p>
                  {blank.name}
                  <br />
                  <span className="price">от {blank.price} ₽</span>
                </p>

                {props.selectedBlanksNames.includes(blank.name) ? (
                  <div className="red-dot" />
                ) : (
                  ""
                )}

                <div className="overlay">
                  <Link
                    to={`/бланки/${blank.name
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className={bgLinkDisabled ? "bgLink disabled" : "bgLink"}
                    onClick={() => {
                      document.body.classList.add("no-scroll");
                    }}
                  ></Link>
                  {props.selectedBlanksNames.includes(blank.name) ? (
                    <a
                      className="text-button"
                      onClick={() => removeBlank(blank.name)}
                      onMouseEnter={toggleLinkDisable}
                      onMouseLeave={toggleLinkDisable}
                    >
                      Убрать
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <h2 id="printingSection">2. Выбери нанесение</h2>
      <div className="printings">
        {props.printings.map((printing, i) => {
          return (
            <div className="printingButtonWrapper">
              <div
                className={
                  props.selectedPrints.includes(printing.name)
                    ? "printingButton selected"
                    : "printingButton"
                }
                onClick={() => props.togglePrinting(printing.name)}
                key={i}
              >
                {props.selectedPrints.includes(printing.name) ? (
                  <div className="red-dot" />
                ) : (
                  ""
                )}
                {printing.name}
                {openNoticeName == printing.name && window.innerWidth >= 768 ? (
                  <div className="notice-wrapper">
                    <div
                      className="notice-btn"
                      onMouseEnter={() => setOpenNoticeName(printing.name)}
                      onMouseLeave={() => setOpenNoticeName()}
                    />
                    <div
                      className="notice"
                      onMouseEnter={() => setOpenNoticeName(printing.name)}
                      onMouseLeave={() => setOpenNoticeName()}
                    >
                      {printing.description}
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {openNoticeName != printing.name &&
                window.innerWidth &&
                printing.description != "" >= 768 ? (
                  <div className="notice-wrapper">
                    <div
                      className="notice-btn"
                      onMouseEnter={() => setOpenNoticeName(printing.name)}
                      onMouseLeave={() => setOpenNoticeName()}
                    />
                  </div>
                ) : (
                  ""
                )}

                {openNoticeName == printing.name && window.innerWidth < 768 ? (
                  <div className="notice-wrapper mobile">
                    <div
                      className="notice-btn"
                      onClick={() => setOpenNoticeName(printing.name)}
                    />
                    <div
                      className="notice"
                      onClick={e => {
                        e.stopPropagation();
                        setOpenNoticeName("");
                        document.body.classList.remove("no-scroll");
                      }}
                    >
                      <p>
                        {printing.description}
                        <div
                          className="close"
                          onClick={e => {
                            e.stopPropagation();
                            setOpenNoticeName("");
                            document.body.classList.remove("no-scroll");
                          }}
                        />
                      </p>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {openNoticeName != printing.name &&
                printing.description != "" &&
                window.innerWidth < 768 ? (
                  <div className="notice-wrapper mobile">
                    <div
                      className="notice-btn"
                      onClick={e => {
                        e.stopPropagation();
                        setOpenNoticeName(printing.name);
                        let vh = window.innerHeight * 0.01;
                        document.documentElement.style.setProperty(
                          "--vh",
                          `${vh}px`
                        );
                        document.body.classList.add("no-scroll");
                      }}
                    />
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          );
        })}
      </div>

      {props.selectedBlanks.length == 0 ? (
        <div className="orderSection">
          <h2 id="#third">3. Сделай заказ: напиши нам в телеграм</h2>

          <a
            className="button empty"
            href="https://teleg.run/delai_tg"
            target="_blank"
          >
            Написать в телеграм
          </a>
        </div>
      ) : (
        <div className="orderSection">
          <h2 id="#third">
            3. Сделай заказ: напиши нам в телеграм с текстом заказа
          </h2>
          <div className="orderCardButtonWrapper">
            <div
              className="button copy-btn"
              data-clipboard-text={clipboardOrder}
              onClick={copyAndWrite}
            >
              Скопировать и написать
            </div>
            <div className="orderCard">
              <h3>Бланки</h3>
              {props.selectedBlanks.map((blank, i) => {
                return (
                  <p key={i}>
                    {blank.name}, {blank.thickness}, {blank.colors.join(", ")}
                  </p>
                );
              })}

              <h3>Нанесение</h3>
              <p>{props.selectedPrints.join(", ")}</p>
            </div>
          </div>
        </div>
      )}

      <h2 id="fourth">Или оставь свою почту и мы напишем тебе сами:</h2>
      <RequestForm
        selectedBlanks={props.selectedBlanks}
        selectedPrints={props.selectedPrints}
      />

      <figure className="no-blanks" />
      <h2>
        Не нашел нужную модель? <br />
        Тогда тебе точно в{" "}
        <Link to="/пошив" onClick={props.handlePathnameChange}>
          индивидуальный пошив
        </Link>
      </h2>
    </div>
  );
}

export default BlanksPage;
