import React from "react";
import { useState } from "react";
import Header from "./Header";
import "./FilterComponents.css";

function Date(props) {
  const [isVisible, setVisible] = useState(true);
  const [checkedDate, setCheckedDate] = useState('');

  function handleChange(e) {
    props.setfilter("published", e.target.value, "published", e.target.value);
    setCheckedDate(e.target.id);
  }

  function onRadioButtonChange() {  // this function is only for to silent the react error

  }

  React.useEffect(() => {
    var state = props.state;
    if (state === undefined) {
      setCheckedDate('')
    } else {
      setCheckedDate(state.queryValue)
    }
  }, [props.state]);

  return (
    <div className="category border rounded filterContainer">
      <div onClick={() => setVisible(!isVisible)}>
        <Header title="Dato" />
      </div>
      {isVisible && (
        <div
          id="category-content"
          className="filterBody"
          onChange={handleChange.bind(this)}         
        >
          <div className="form-check">
            <input
              className="form-check-input"
              value="today"
              type="radio"
              name="flexRadioDefault"
              id="today"
              checked={checkedDate === "today" && true}
              onChange={() => onRadioButtonChange()}
            />
            <label className="form-check-label" htmlFor="radio-today">
              I dag
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              value="week"
              type="radio"
              name="flexRadioDefault"
              id="week"
              checked={checkedDate === "week" && true}
              onChange={() => onRadioButtonChange()}
            />
            <label className="form-check-label" htmlFor="radio-week">
              I uka
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              value="month"
              type="radio"
              name="flexRadioDefault"
              id="month"
              checked={checkedDate === "month" && true}
              onChange={() => onRadioButtonChange()}
            />
            <label className="form-check-label" htmlFor="radio-month">
              I m??ned
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default Date;
