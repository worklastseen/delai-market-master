import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Link, useParams } from "react-router-dom";

export default function BlankPopup(props) {
  const [selectedThickness, setSelectedThickness] = useState(
    props.selectedBlank
      ? props.selectedBlank.thickness
      : props.blank.thickness[0]
  );
  const [selectedColors, setSelectedColors] = useState(
    props.selectedBlank ? props.selectedBlank.colors : ["black"]
  );
  const [hasChanged, setHasChanged] = useState(false);
  const [scrollPrevDisabled, setScrollPrevDisabled] = useState(true);
  const [scrollNextDisabled, setScrollNextDisabled] = useState(false);
  const [currentColor, setCurrentColor] = useState("black");
  const [mobileHeight, setMobileHeight] = useState(() => {
    let height = window.innerHeight;
    let style = {
      height: height + "px"
    };
    return style;
  });
  const [colorsHighlighted, setColorsHighlighted] = useState(false);
  const [clientTouchX, setClientTouchX] = useState(0);
  const [swipeDirection, setSwipeDirection] = useState("");

  const blankImagesRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    checkScroll();

    document.body.classList.add("no-scroll");
    document.body.addEventListener("keydown", function() {
      checkKey();
    });
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    setTimeout(function() {
      let height = window.innerHeight;
      let style = {
        height: height + "px"
      };
      setMobileHeight(style);
    }, 10);
  });

  function checkKey(e) {
    e = e || window.event;

    switch (e.keyCode) {
      case 37:
        if (blankImagesRef.current) {
          if (!scrollPrevDisabled) {
            scrollPrev();
          } else {
            blankImagesRef.current.scrollLeft =
              blankImagesRef.current.scrollWidth;
          }
        }
        break;
      case 39:
        if (blankImagesRef.current) {
          if (!scrollNextDisabled) {
            scrollNext();
          } else {
            blankImagesRef.current.scrollLeft = 0;
          }
        }
        break;
      case 27:
        if (bgRef.current) {
          bgRef.current.click();
        }
        break;
    }
  }

  function checkScroll() {
    let width = blankImagesRef.current.offsetWidth;
    let scrollWidth = blankImagesRef.current.scrollWidth;
    let maxScroll = scrollWidth - width - 10;
    let scrollLeft = blankImagesRef.current.scrollLeft;

    if (scrollLeft <= 10 && scrollLeft < maxScroll) {
      setScrollPrevDisabled(true);
      setScrollNextDisabled(false);
    }
    if (scrollLeft <= 10 && scrollLeft >= maxScroll) {
      setScrollPrevDisabled(true);
      setScrollNextDisabled(true);
    }
    if (scrollLeft >= maxScroll && scrollLeft > 0) {
      setScrollNextDisabled(true);
      setScrollPrevDisabled(false);
    }
    if (scrollLeft > 0 && scrollLeft < maxScroll) {
      setScrollPrevDisabled(false);
      setScrollNextDisabled(false);
    }
  }

  function handleButtonAddClick(name) {
    let blank = {
      name: name,
      thickness: selectedThickness,
      colors: selectedColors
    };
    props.addBlank(blank);
    let text = "Отлично! А теперь выбери нанесение!";
    let scroll = "printings";
    props.showNotice(text, scroll);
  }

  function addColor(colorToAdd) {
    let newColors = selectedColors;
    newColors.push(colorToAdd);
    setSelectedColors([]);
    setTimeout(function() {
      setSelectedColors(newColors);
    }, 10);

    if (props.selected) {
      setHasChanged(true);
    }
  }

  function removeColor(colorToRemove) {
    let newColors = [];
    selectedColors.map(color => {
      if (color != colorToRemove) {
        newColors.push(color);
      }
    });
    setSelectedColors([]);
    setTimeout(function() {
      setSelectedColors(newColors);
    }, 10);

    if (props.selected) {
      setHasChanged(true);
    }
  }

  function selectThickness(e) {
    setSelectedThickness(null);
    setSelectedThickness(e.target.value);

    if (props.selected) {
      setHasChanged(true);
    }
  }

  function toggleSaveBlank(name) {
    let blank = {
      name: name,
      thickness: selectedThickness,
      colors: selectedColors
    };
    props.saveBlank(blank);
  }

  function scrollPrev() {
    let width = blankImagesRef.current.offsetWidth;
    let scrollWidth = blankImagesRef.current.scrollWidth;
    let maxScroll = scrollWidth - width;

    blankImagesRef.current.scrollTo({
      left: blankImagesRef.current.scrollLeft - width,
      behavior: "smooth"
    });
    checkScroll();
  }

  function scrollNext() {
    let width = blankImagesRef.current.offsetWidth;
    let scrollWidth = blankImagesRef.current.scrollWidth;
    let maxScroll = scrollWidth - width;

    blankImagesRef.current.scrollTo({
      left: blankImagesRef.current.scrollLeft + width,
      behavior: "smooth"
    });
    checkScroll();
  }

  function handleTouchStart(e) {
    setClientTouchX(e.touches[0].clientX);
  }

  function handleTouchMove(e) {
    let swipeDirection = "";

    for (var i = 0; i < 1; i++) {
      if (e.touches[0].clientX < clientTouchX - 30) {
        //swipe left
        setSwipeDirection("left");
      } else if (e.touches[0].clientX > clientTouchX + 30) {
        //swipe right
        setSwipeDirection("right");
      }
    }
  }

  function handleTouchEnd() {
    switch (swipeDirection) {
      case "left":
        if (!scrollNextDisabled) {
          scrollNext();
        } else {
          blankImagesRef.current.scrollLeft = 0;
        }
        setSwipeDirection("");
        break;
      case "right":
        if (!scrollPrevDisabled) {
          scrollPrev();
        } else {
          blankImagesRef.current.scrollLeft =
            blankImagesRef.current.scrollWidth;
        }
        setSwipeDirection("");
        break;
    }
  }

  return (
    <div className="blank-popup">
      <Link
        to="/бланки"
        className="popup-bg"
        onClick={() => {
          document.body.classList.remove("no-scroll");
        }}
        ref={bgRef}
      ></Link>

      <div className="blank-info">
        <Link
          to="/бланки"
          className="close"
          onClick={() => {
            document.body.classList.remove("no-scroll");
          }}
        ></Link>
        {window.innerWidth < 768 ? (
          <h2 className="name">{props.blank.name}</h2>
        ) : (
          ""
        )}
        <div className="blank-gallery">
          {window.innerWidth >= 768 ? (
            <div className="arrowsWrapper">
              <div
                className="arrowWrapper"
                onClick={() => {
                  if (!scrollPrevDisabled) {
                    scrollPrev();
                  } else {
                    blankImagesRef.current.scrollLeft =
                      blankImagesRef.current.scrollWidth;
                  }
                }}
              >
                <div className={"arrow left"} />
              </div>
              <div
                className="arrowWrapper"
                onClick={() => {
                  if (!scrollNextDisabled) {
                    scrollNext();
                  } else {
                    blankImagesRef.current.scrollLeft = 0;
                  }
                }}
              >
                <div className={"arrow right"} />
              </div>
            </div>
          ) : (
            ""
          )}
          {window.innerWidth < 768 ? (
            <div
              className="arrowWrapper"
              onClick={() => {
                if (!scrollPrevDisabled) {
                  scrollPrev();
                } else {
                  blankImagesRef.current.scrollLeft =
                    blankImagesRef.current.scrollWidth;
                }
              }}
            >
              <div className={"arrow left"} />
            </div>
          ) : (
            ""
          )}
          <div
            className="blank-images"
            ref={blankImagesRef}
            onTouchStart={touchStartEvent => handleTouchStart(touchStartEvent)}
            onTouchMove={touchMoveEvent => handleTouchMove(touchMoveEvent)}
            onTouchEnd={() => handleTouchEnd()}
          >
            {props.blank.image.map((image, i) => {
              if (image.color == currentColor || image.color == "model") {
                return (
                  <div className="imgWrapper">
                    <div
                      className="img"
                      style={{ backgroundImage: `url(${image.url})` }}
                      key={i}
                    />
                  </div>
                );
              }
            })}
          </div>
          {window.innerWidth < 768 ? (
            <div
              className="arrowWrapper"
              onClick={() => {
                if (!scrollNextDisabled) {
                  scrollNext();
                } else {
                  blankImagesRef.current.scrollLeft = 0;
                }
              }}
            >
              <div className={"arrow right"} />
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="blank-description">
          <div>
            {window.innerWidth >= 768 ? <h2>{props.blank.name}</h2> : ""}
            <p className="price">
              <span>Цена за бланк:</span>
              от {props.blank.price} ₽
            </p>

            {props.blank.thickness.length > 0 ? (
              <div className="thickness">
                <label for="thickness">Плотность:</label>
                <select
                  name="thickness"
                  id="thickness"
                  onChange={selectThickness}
                  value={selectedThickness}
                >
                  {props.blank.thickness.map((thickness, i) => {
                    return <option value={`${thickness}`}>{thickness}</option>;
                  })}
                </select>
              </div>
            ) : (
              ""
            )}

            <div className="colors">
              <p
                className={
                  colorsHighlighted ? "caption highlighted" : "caption"
                }
              >
                Цвета:
              </p>
              <div className="circles">
                {props.blank.colors.map((color, i) => {
                  if (color == "black") {
                    if (selectedColors.includes(color)) {
                      return (
                        <div
                          key={i}
                          className={`color ${color} selected`}
                          onClick={() => {
                            setCurrentColor(color);
                            blankImagesRef.current.scrollLeft = 0;
                            checkScroll();
                            setCurrentColor(color);
                            removeColor(color);
                          }}
                        />
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className={`color ${color}`}
                          onClick={() => {
                            setCurrentColor(color);
                            blankImagesRef.current.scrollLeft = 0;
                            checkScroll();
                            addColor(color);
                            setColorsHighlighted(false);
                          }}
                        />
                      );
                    }
                  }
                })}

                {props.blank.colors.map((color, i) => {
                  if (color != "black") {
                    if (selectedColors.includes(color)) {
                      return (
                        <div
                          key={i}
                          className={`color ${color} selected`}
                          onClick={() => {
                            setCurrentColor(color);
                            blankImagesRef.current.scrollLeft = 0;
                            checkScroll();
                            setCurrentColor(color);
                            removeColor(color);
                          }}
                        />
                      );
                    } else {
                      return (
                        <div
                          key={i}
                          className={`color ${color}`}
                          onClick={() => {
                            setCurrentColor(color);
                            blankImagesRef.current.scrollTo({
                              left: 0,
                              behavior: "smooth"
                            });
                            checkScroll();
                            addColor(color);
                            setColorsHighlighted(false);
                          }}
                        />
                      );
                    }
                  }
                })}
              </div>
            </div>

            <p className="description">{props.blank.description}</p>

            <div className="sizes">
              <p className="caption">Доступные размеры:</p>
              <p>{props.blank.sizes}</p>
            </div>

            <div className="amount">
              {props.blank.min_amount && props.blank.min_amount != 1 ? (
                <p className="minAmount">
                  Заказ от {props.blank.min_amount} шт.
                </p>
              ) : (
                <p className="minAmount">Заказ от 1 шт.</p>
              )}
              <p className="notice">
                Мы поможем тебе выбрать размеры  и количество при работе над
                партией
              </p>
            </div>
          </div>

          <div>
            <Link
              to="/бланки"
              className={
                selectedColors.length > 0 &&
                selectedThickness != "" &&
                !props.blank.soldout
                  ? "btn-link"
                  : "btn-link disabled"
              }
              onClick={e => {
                if (selectedColors.length == 0) {
                  e.preventDefault();
                  setColorsHighlighted(true);
                }
              }}
            >
              {!props.selected ? (
                <div
                  className={
                    selectedColors.length > 0 &&
                    selectedThickness != "" &&
                    !props.blank.soldout
                      ? "button"
                      : "button disabled"
                  }
                  onClick={() => {
                    if (selectedColors.length != 0) {
                      document.body.classList.remove("no-scroll");
                      handleButtonAddClick(props.blank.name);
                    }
                  }}
                >
                  Добавить
                </div>
              ) : (
                ""
              )}
              {props.selected && !hasChanged ? (
                <div
                  className="button"
                  onClick={() => {
                    document.body.classList.remove("no-scroll");
                    props.removeBlank(props.blank.name);
                  }}
                >
                  Убрать
                </div>
              ) : (
                ""
              )}
              {props.selected && hasChanged ? (
                <div
                  className="button"
                  onClick={() => {
                    document.body.classList.remove("no-scroll");
                    toggleSaveBlank(props.blank.name);
                  }}
                >
                  Сохранить
                </div>
              ) : (
                ""
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
