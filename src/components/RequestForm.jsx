import React, { useState, useRef } from "react";

export default function RequestForm(props) {
  const formRef = useRef(null);
  const btnRef = useRef(null);
  const inputRef = useRef(null);

  function getFormData(form) {
    var elements = form.elements;
    var honeypot;

    var fields = Object.keys(elements)
      .filter(function(k) {
        if (elements[k].name === "honeypot") {
          honeypot = elements[k].value;
          return false;
        }
        return true;
      })
      .map(function(k) {
        if (elements[k].name !== undefined) {
          return elements[k].name;
          // special case for Edge's html collection
        } else if (elements[k].length > 0) {
          return elements[k].item(0).name;
        }
      })
      .filter(function(item, pos, self) {
        return self.indexOf(item) == pos && item;
      });

    var formData = {};
    fields.forEach(function(name) {
      var element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        var data = [];
        for (var i = 0; i < element.length; i++) {
          var item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(", ");
      }
    });

    if (props.custom) {
      formData.custom = true;
    }

    if (props.selectedBlanks && props.selectedBlanks.length > 0) {
      let blanks = props.selectedBlanks.map(selectedBlank => {
        let blank = `${selectedBlank.name}, ${selectedBlank.thickness}, ${selectedBlank.colors}`;
        return blank;
      });
      formData.selectedBlanks = blanks.join(" | ");
    }

    if (props.selectedPrints && props.selectedPrints.length > 0) {
      formData.selectedPrints = props.selectedPrints.toString();
    }

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail = form.dataset.email || ""; // no email by default

    return { data: formData, honeypot: honeypot };
  }

  function validateContact(contact) {
    let emailRe = /\S+@\S+\.\S+/;
    let emailValid = emailRe.test(contact);

    let numberRe = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    let numberValid = numberRe.test(contact);

    let telegramRe = /^[a-zA-Z0-9\_]{5,}$/gi;
    let telegramValid = telegramRe.test(contact);

    if (emailValid || numberValid || telegramValid) {
      return true;
    }
  }

  function postToTrello(key, token, idList, pos, name, desc) {
    fetch(
      `https://api.trello.com/1/cards?key=${key}&token=${token}&idList=${idList}&pos=${pos}&name=${name}&desc=${desc}`,
      {
        method: "POST"
      }
    )
      .then(response => {
        return response.text();
      })
      .then(text => {
        var form = formRef.current;
        form.reset();
        var formElements = form.querySelector(".form-elements");
        if (formElements) {
          formElements.style.display = "none"; // hide form
        }
        var thankYouMessage = form.querySelector(".thankyou_message");
        if (thankYouMessage) {
          thankYouMessage.style.display = "block";
        }
      })
      .catch(err => console.error("ERROR", err));
  }

  function handleFormSubmit(event) {
    // handles form submit without any jquery
    event.preventDefault(); // we are submitting via xhr below

    if (inputRef.current.value != "") {
      const key = process.env.REACT_APP_TRELLO_KEY;
      const token = process.env.REACT_APP_TRELLO_TOKEN;
      const idList = process.env.REACT_APP_TRELLO_ID_LIST;

      const pos = "top";
      const contact = inputRef.current.value;
      const name = `Заказ от ${contact}`;
      const currentdate = new Date();
      const datetime =
        currentdate.getDate() +
        "/" +
        (currentdate.getMonth() + 1) +
        "/" +
        currentdate.getFullYear() +
        " @ " +
        currentdate.getHours() +
        ":" +
        currentdate.getMinutes();
      let desc, custom, blanks, prints;

      if (props.selectedBlanks && props.selectedBlanks.length > 0) {
        blanks = props.selectedBlanks.map(selectedBlank => {
          let blank = `${selectedBlank.name} ${
            selectedBlank.thickness
          } ${selectedBlank.colors.join(", ").toString()}`;
          return blank;
        });
        if (props.selectedPrints && props.selectedPrints.length > 0) {
          prints = props.selectedPrints.join(", ").toString();
        }

        desc = `Контакт: ${contact} %0A Бланки: ${blanks
          .join(" / ")
          .toString()} %0A Нанесение: ${prints} %0A Дата заказа: ${datetime}`;

        custom = props.custom;
        if (custom) {
          desc = `Контакт: ${contact} %0A Кастомный заказ %0A Дата заказа: ${datetime}`;
        }
      } else {
        if (props.selectedPrints && props.selectedPrints.length > 0) {
          prints = props.selectedPrints.join(", ").toString();
        }
        desc = `Контакт: ${contact} %0A Нанесение: ${prints} %0A Дата заказа: ${datetime}`;

        custom = props.custom;
        if (custom) {
          desc = `Контакт: ${contact} %0A Кастомный заказ %0A Дата заказа: ${datetime}`;
        }
      }
      btnRef.current.classList.add("loadingBtn");

      postToTrello(key, token, idList, pos, name, desc);

      var form = formRef.current;
      var formData = getFormData(form);
      var data = formData.data;

      // If a honeypot field is filled, assume it was done so by a spam bot.
      if (formData.honeypot) {
        return false;
      }

      disableAllButtons(form);
      var url = form.action;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", url);
      // xhr.withCredentials = true;
      xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          console.log("SUCCESS");
        }
      };
      // url encode form data for sending as post data
      var encoded = Object.keys(data)
        .map(function(k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        })
        .join("&");
      xhr.send(encoded);
    }
  }

  function disableAllButtons(form) {
    var buttons = form.querySelectorAll("button");
    for (var i = 0; i < buttons.length; i++) {
      buttons[i].disabled = true;
    }
  }

  function playAnimation() {
    btnRef.current.classList.add("animated");
  }

  function stopAnimation() {
    btnRef.current.classList.remove("animated");
  }

  return (
    <form
      className="gform requestForm"
      id="requestForm"
      method="POST"
      ref={formRef}
      action="https://script.google.com/macros/s/AKfycbxPIbY8t5jg-MsLuAJB7ss7ciRvr5duzV-bPUr55Q/exec"
    >
      <div className="form-elements">
        <input
          type="text"
          name="contact"
          autoComplete="off"
          placeholder="Email"
          ref={inputRef}
        />
        {props.selectedBlanks ? (
          <button
            onMouseEnter={playAnimation}
            onMouseLeave={stopAnimation}
            onClick={handleFormSubmit}
            ref={btnRef}
          >
            Поехали!
          </button>
        ) : (
          <button
            onMouseEnter={playAnimation}
            onMouseLeave={stopAnimation}
            onClick={handleFormSubmit}
            ref={btnRef}
          >
            Поехали!
          </button>
        )}
        {props.overload && props.overload.overload == true ? (
          <div className="soldoutNotice">
            <p>{props.overload.caption}</p>
          </div>
        ) : (
          ""
        )}
      </div>

      <div className="thankyou_message" style={{ display: "none" }}>
        <h2>Пишем тебе и ждём начала работы!</h2>
      </div>
    </form>
  );
}
