import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function Menubar(props) {
  const logoRef = useRef(null);
  const blanksRef = useRef(null);
  const customRef = useRef(null);
  const faqRef = useRef(null);
  const [circlePosition, setCirclePosition] = useState(0);
  const [showNotice, setShowNotice] = useState(false);
  const [currentSection, setCurrentSection] = useState();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [menubarMobileOpen, setMenubarMobileOpen] = useState(false);

  useEffect(() => {
    window.innerWidth >= 814 ? setMobileMenu(false) : setMobileMenu(true);

    let pathname = props.pathname;
    handleSetCirclePosition(pathname);

    window.addEventListener("resize", function() {
      window.innerWidth >= 814 ? setMobileMenu(false) : setMobileMenu(true);
      handleSetCirclePosition(pathname);
    });
  });

  function handleSetCirclePosition(pathname) {
    if (window.innerWidth >= 814) {
      if (
        pathname == "/" ||
        pathname.includes("/пользовательское_соглашение")
      ) {
        let logoOffsetX = logoRef.current.offsetLeft;
        let logoWidth = logoRef.current.offsetWidth / 2;
        let circleMargin = 38;
        if (window.innerWidth <= 900) {
          circleMargin = 22;
        }
        let circlePosition = logoWidth / 2 + logoOffsetX + circleMargin;
        setCirclePosition(circlePosition);
        setCurrentSection("");
      } else if (pathname.includes("/бланки")) {
        let offsetX = blanksRef.current.offsetLeft;
        let width = blanksRef.current.offsetWidth;

        let circlePosition = width / 2 + offsetX - 4.5;
        setCirclePosition(circlePosition);
        setCurrentSection("бланки");
      } else if (pathname.includes("/пошив")) {
        let offsetX = customRef.current.offsetLeft;
        let width = customRef.current.offsetWidth;

        let circlePosition = width / 2 + offsetX - 4.5;
        setCirclePosition(circlePosition);
        setCurrentSection("пошив");
      } else if (pathname.includes("/FAQ")) {
        let offsetX = faqRef.current.offsetLeft;
        let width = faqRef.current.offsetWidth;

        let circlePosition = width / 2 + offsetX - 4.5;
        setCirclePosition(circlePosition);
        setCurrentSection("FAQ");
      }
    } else {
      if (pathname == "/" || "/пользовательское_соглашение") {
        let circlePosition = -100;
        setCirclePosition(circlePosition);
        setCurrentSection("");
      } else if (pathname.includes("/бланки") && menubarMobileOpen) {
        let offsetX = blanksRef.current.offsetLeft;
        let width = blanksRef.current.offsetWidth;

        let circlePosition = width / 2 + offsetX - 4.5;
        setCirclePosition(circlePosition);
        setCurrentSection("бланки");
      } else if (pathname.includes("/пошив") && menubarMobileOpen) {
        let offsetX = customRef.current.offsetLeft;
        let width = customRef.current.offsetWidth;

        let circlePosition = width / 2 + offsetX - 4.5;
        setCirclePosition(circlePosition);
        setCurrentSection("пошив");
      } else if (pathname.includes("/FAQ") && menubarMobileOpen) {
        let offsetX = faqRef.current.offsetLeft;
        let width = faqRef.current.offsetWidth;

        let circlePosition = width / 2 + offsetX - 4.5;
        setCirclePosition(circlePosition);
        setCurrentSection("FAQ");
      }
    }
  }

  function handleLinkClick(linkName) {
    if (linkName == "/" || linkName == "/пользовательское_соглашение") {
      let logoOffsetX = logoRef.current.offsetLeft;
      let logoWidth = logoRef.current.offsetWidth;

      let circlePosition = logoWidth / 2 + logoOffsetX + 3;
      setCirclePosition(circlePosition);
      setCurrentSection("");
    } else if (linkName == "/бланки") {
      let offsetX = blanksRef.current.offsetLeft;
      let width = blanksRef.current.offsetWidth;

      let circlePosition = width / 2 + offsetX - 4.5;
      setCirclePosition(circlePosition);
      setCurrentSection("бланки");
    } else if (linkName == "/пошив") {
      let offsetX = customRef.current.offsetLeft;
      let width = customRef.current.offsetWidth;

      let circlePosition = width / 2 + offsetX - 4.5;
      setCirclePosition(circlePosition);
      setCurrentSection("пошив");
    } else if (linkName == "/FAQ") {
      let offsetX = faqRef.current.offsetLeft;
      let width = faqRef.current.offsetWidth;

      let circlePosition = width / 2 + offsetX - 4.5;
      setCirclePosition(circlePosition);
      setCurrentSection("FAQ");
    }
  }

  function handleMobileLinkClick() {
    props.handlePathnameChange();
    setMenubarMobileOpen(false);
  }

  if (!mobileMenu) {
    return (
      <div className="menubar">
        <div className="circle" style={{ left: circlePosition }} />
        <Link
          ref={logoRef}
          to="/"
          className="logo animatedLogo"
          onClick={props.handlePathnameChange}
        >
          делай
          <span></span>
        </Link>
        <div className="main-links">
          <a
            href="https://shop.delai.market"
            target="_blank"
            className={currentSection == "бланки" ? "current" : ""}
            ref={blanksRef}
            onClick={props.handlePathnameChange}
          >
            Бланки
          </a>
          <Link
            to="/пошив"
            className={currentSection == "пошив" ? "current" : ""}
            ref={customRef}
            onClick={props.handlePathnameChange}
          >
            Пошив
          </Link>
          <Link
            to="/FAQ"
            className={currentSection == "FAQ" ? "current" : ""}
            ref={faqRef}
            onClick={props.handlePathnameChange}
          >
            FAQ
          </Link>
        </div>
        <div className="contact">
          <a
            href="https://t.me/delai_tg"
            target="_blank"
            className="telegram"
          >
            telegram
          </a>
          <a
            href="https://www.instagram.com/delai.market/"
            target="_blank"
            className="instagram"
          >
            instagram
          </a>
          <a
            href="https://vk.com/delai.market"
            target="_blank"
            className="vk"
          >
            vk
          </a>
          {showNotice ? (
            <p className="notice">
              Пиши нам в любой из мессенджеров, если остались вопросы
            </p>
          ) : (
            ""
          )}
        </div>
      </div>
    );
  } else {
    return (
      <div className="menubarMobile">
        <div className="menubarClosed">
          <Link
            to="/"
            className="logo"
            onClick={props.handlePathnameChange}
          ></Link>
          <div
            className="burger"
            onClick={() => {
              setMenubarMobileOpen(true);
              document.body.classList.add("no-scroll");
            }}
          >
            <div />
            <div />
            <div />
          </div>
        </div>
        {menubarMobileOpen ? (
          <div className="menubarOpen">
            <div
              className="bg"
              onClick={() => {
                setMenubarMobileOpen(false);
                document.body.classList.remove("no-scroll");
              }}
            />
            <div className="menubarCard">
              <div className="mainSection">
                <div
                  className="close"
                  onClick={() => {
                    setMenubarMobileOpen(false);
                    document.body.classList.remove("no-scroll");
                  }}
                />
                <div className="circle" style={{ left: circlePosition }} />
                <div className="main-links">
                  <a
                    href="https://shop.delai.market"
                    target="_blank"
                    className={currentSection == "бланки" ? "current" : ""}
                    ref={blanksRef}
                    onClick={handleMobileLinkClick}
                  >
                    Бланки
                  </a>
                  <Link
                    to="/пошив"
                    className={currentSection == "пошив" ? "current" : ""}
                    ref={customRef}
                    onClick={handleMobileLinkClick}
                  >
                    Пошив
                  </Link>
                  <Link
                    to="/FAQ"
                    className={currentSection == "FAQ" ? "current" : ""}
                    ref={faqRef}
                    onClick={handleMobileLinkClick}
                  >
                    FAQ
                  </Link>
                </div>
              </div>

              <div className="bottomSection">
                <div className="contact">
                  <a
                    href="https://teleg.run/delai_tg"
                    target="_blank"
                    className="telegram"
                  >
                    телеграм
                  </a>
                  <a
                    href="https://www.instagram.com/delai.market/"
                    target="_blank"
                    className="instagram"
                  >
                    instagram
                  </a>
                  <a
                    href="https://vk.com/delai.market"
                    target="_blank"
                    className="vk"
                  >
                    vk
                  </a>
                </div>

                <p className="notice">
                  Пиши нам в любой из мессенджеров, если остались вопросы
                </p>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default Menubar;
