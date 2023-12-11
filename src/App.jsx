import React, { useState } from "react";
import "./stylesheets/App.scss";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

import Menubar from "./components/Menubar.jsx";
import MainPage from "./components/MainPage.jsx";
import BlanksPage from "./components/BlanksPage.jsx";
import CustomPage from "./components/CustomPage.jsx";
import AboutUsPage from "./components/AboutUsPage.jsx";
import FaqPage from "./components/FaqPage.jsx";
import Footer from "./components/Footer.jsx";
import BlankPopup from "./components/BlankPopup.jsx";
import ConfPage from "./components/ConfPage.jsx";

function App(props) {
  const [pathname, setPathname] = useState(() => {
    let pathname = decodeURI(window.location.pathname);
    return pathname;
  });
  const [selectedBlanks, setSelectedBlanks] = useState([]);
  const [selectedBlanksNames, setSelectedBlanksNames] = useState(() => {
    let selectedBlanksNames = selectedBlanks.map(selectedBlank => {
      return selectedBlank.name;
    });
    return selectedBlanksNames;
  });
  const [selectedPrints, setSelectedPrints] = useState(() => {
    let prints = [];
    props.printings.map(printing => {
      if (printing.selected) {
        prints.push(printing.name);
      }
    });
    return prints;
  });
  const [noticeVisible, setNoticeVisible] = useState(false);
  const [noticeScroll, setNoticeScroll] = useState();
  const [noticeText, setNoticeText] = useState();

  function handlePathnameChange() {
    setTimeout(function() {
      let newPathnmae = decodeURI(window.location.pathname);
      setPathname(newPathnmae);
      document.body.classList.remove("no-scroll");
    }, 10);
  }

  function addBlank(blank) {
    let newBlanks = selectedBlanks;
    newBlanks.push(blank);
    setSelectedBlanks(newBlanks);

    let newSelectedBlanksNames = selectedBlanksNames;
    newSelectedBlanksNames.push(blank.name);
    setSelectedBlanksNames(newSelectedBlanksNames);
  }

  function removeBlank(name) {
    let newBlanks = [];
    selectedBlanks.map(blank => {
      if (blank.name != name) {
        newBlanks.push(blank);
      }
    });
    setSelectedBlanks(newBlanks);

    let newSelectedBlanksNames = [];
    selectedBlanksNames.map(blankName => {
      if (blankName != name) {
        newSelectedBlanksNames.push(blankName);
      }
    });
    setSelectedBlanksNames(newSelectedBlanksNames);
  }

  function saveBlank(blank) {
    let newSelectedBlanks = selectedBlanks.map(sBlank => {
      if (blank.name == sBlank.name) {
        sBlank.thickness = blank.thickness;
        sBlank.colors = blank.colors;
        return sBlank;
      } else {
        return sBlank;
      }
    });
  }

  function showNotice(text, scroll) {
    setNoticeText(text);
    setNoticeVisible(true);
    setNoticeScroll(scroll);
    setTimeout(function() {
      setNoticeVisible(false);
    }, 4900);
  }

  function togglePrinting(name) {
    let newPrints = selectedPrints;

    if (selectedPrints.includes(name)) {
      selectedPrints.map((print, i) => {
        if (print == name) {
          newPrints.splice(i, 1);
        }
      });
    } else {
      newPrints.push(name);
      // let text = "Ура! Оставь свой контакт и мы напишем тебе!";
      // let scroll = "form";
      // if (selectedPrints.length == 1) {
      //   showNotice(text, scroll);
      // }
    }

    setTimeout(function() {
      setSelectedPrints([]);
      setSelectedPrints(newPrints);
    }, 10);
  }

  function scrollToPrinting() {
    let printingSection = document.getElementById("printingSection");
    let offsetTop = printingSection.offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  }

  function scrollToForm() {
    let form = document.getElementById("third");
    let offsetTop = form.offsetTop;
    window.scrollTo({
      top: offsetTop,
      behavior: "smooth"
    });
  }

  return (
    <Router>
      <Menubar
        pathname={pathname}
        handlePathnameChange={handlePathnameChange}
      />
      <Switch>
        {/* <Route path="/бланки/:blankName">
          <BlanksPage
            blanks={props.blanks}
            printings={props.printings}
            removeBlank={removeBlank}
            selectedBlanks={selectedBlanks}
            selectedPrints={selectedPrints}
            handlePathnameChange={handlePathnameChange}
            togglePrinting={togglePrinting}
            selectedBlanksNames={selectedBlanksNames}
            showNotice={showNotice}
          />
          <BlankPopupWrapper
            blanks={props.blanks}
            addBlank={addBlank}
            removeBlank={removeBlank}
            saveBlank={saveBlank}
            selectedPrints={selectedPrints}
            selectedBlanks={selectedBlanks}
            showNotice={showNotice}
            selectedBlanksNames={selectedBlanksNames}
          />
        </Route>
        <Route path="/бланки">
          <BlanksPage
            blanks={props.blanks}
            printings={props.printings}
            removeBlank={removeBlank}
            selectedBlanks={selectedBlanks}
            selectedPrints={selectedPrints}
            handlePathnameChange={handlePathnameChange}
            togglePrinting={togglePrinting}
            selectedBlanksNames={selectedBlanksNames}
            showNotice={showNotice}
          />
        </Route> */}
        <Route path="/пошив">
          <CustomPage overload={props.overloads[0]} />
        </Route>
        <Route path="/о_нас">
          <AboutUsPage />
        </Route>
        <Route path="/FAQ">
          <FaqPage questions={props.questions} />
        </Route>
        <Route path="/пользовательское_соглашение">
          <ConfPage text={props.legals[0].text} />
        </Route>
        <Route path="/">
          <MainPage handlePathnameChange={handlePathnameChange} />
        </Route>
      </Switch>

      {noticeVisible ? (
        <div
          className="popup-notice"
          onClick={
            noticeScroll == "printings" ? scrollToPrinting : scrollToForm
          }
        >
          {noticeText}
        </div>
      ) : (
        ""
      )}
      <Footer handlePathnameChange={handlePathnameChange} />
    </Router>
  );
}

function BlankPopupWrapper(props) {
  let params = useParams();
  let blank;

  props.blanks.map((b, i) => {
    if (b.name.toLowerCase().replace(/\s+/g, "-") == params.blankName) {
      blank = b;
    }
  });

  let selected = false;
  let selectedBlankProp;
  props.selectedBlanks.forEach((selectedBlank, i) => {
    if (selectedBlank.name == blank.name) {
      selected = true;
      selectedBlankProp = selectedBlank;
    }
  });

  return (
    <BlankPopup
      blank={blank}
      addBlank={props.addBlank}
      removeBlank={props.removeBlank}
      saveBlank={props.saveBlank}
      selectedPrints={props.selectedPrints}
      selectedBlanks={props.selectedBlanks}
      selected={selected}
      showNotice={props.showNotice}
      selectedBlank={selectedBlankProp}
    />
  );
}

export default App;
