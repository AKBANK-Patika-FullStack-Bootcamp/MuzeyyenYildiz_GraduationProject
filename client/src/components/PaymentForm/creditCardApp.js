import { useState } from "react";
import {
  CardHolder,
  CardNumber,
  CardSecurityCode,
  ValidThruMonth,
  ValidThruYear,
} from "reactjs-credit-card/form";
import Card from "reactjs-credit-card/card";
import { useCardForm } from "reactjs-credit-card";
import toastr from "toastr";

import "./style.css";

function CreditCardApp({ data }) {
  //useCardForm is a hook which returns a function.If this function calls,function returns credit card form data values and their validations
  const getFormData = useCardForm();
  const [numberValid, setNumberValid] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    const [data, isValid] = getFormData();
    if (!data.number.isValid) setNumberValid(false); //we'll set a hook to show a error if card number is invalid

    if (!isValid)
      toastr.warning(
        `${data.holder.value} form data values invalid :) and holder also ${
          data.holder.isValid ? "valid" : "invalid"
        }`,
        "Bilgi"
      );
  }

  //We can set any form element attribute
  function handleFocus() {
    setNumberValid(true);
  }

  return (
    <div className="container-card container">
      <div className="form-box">
        <h1>
          Ödeme Tutarı: <span>{data} TL</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <CardNumber
            placeholder="Card Number"
            className={`input-text${!numberValid ? " error" : ""}`}
            onFocus={handleFocus}
          />
          <CardHolder placeholder="Card Holder" className="input-text" />
          <div className="flex-wrapper">
            <div className="semi flex-wrapper">
              <ValidThruMonth
                placeholder="Card Holder"
                className="input-text semi"
              />
              <ValidThruYear
                placeholder="Card Holder"
                className="input-text semi"
              />
            </div>
            <CardSecurityCode placeholder="CVV" className="input-text semi" />
          </div>
          <button className="btn-card">Submit</button>
        </form>
      </div>
      <Card fixClass="fix-new" cardClass="card-new" />
    </div>
  );
}

export default CreditCardApp;
