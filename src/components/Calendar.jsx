import React from "react";
import { FaAngleRight } from "react-icons/fa";
import { FaAngleLeft } from "react-icons/fa";
import styled from "styled-components";
import { gsap } from "gsap";

const TextContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-bottom: 1rem solid #ccc;

  .title {
    cursor: pointer;
    margin-bottom: 20rem;
  }

  // form {
  //   width: 100%;
  //   height: 100%;
  // }

  input {
    width: 200rem;
    height: 100rem;
    border: 0;
    border-bottom: 1rem solid #ccc;
    outline: none;
  }

  button[type="submit"] {
    display: block;
    padding: 10rem;
    margin-top: 20rem;
    border-radius: 5rem;
    position: relative;
    overflow: hidden;
    border: 1rem solid var(--border);

    .gradient {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      border-radius: 5rem;
      margin-top: 20rem;
      background-image: linear-gradient(
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 0.3)
      );
    }

    .label {
      position: relative;
      top: 0;
      transition: color 0.3s;
    }

    .transition {
      transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
      transition-duration: 500ms;
      background-color: var(--main);
      border-radius: 9999px;
      width: 0;
      height: 0;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  button[type="submit"]:hover .transition {
    width: 80rem;
    height: 80rem;
  }
  button[type="submit"]:hover .label {
    color: var(--white);
  }
`;

const CalendarContainer = styled.div`
  position: absolute;
  right: 0;
  bottom: 0;
  height: 100%;

  .calendar {
    position: relative;
    max-width: 200rem;
    padding: 20rem;
    margin: 20rem;
    border-radius: 5rem;
    border: 1rem solid var(--border);

    @media (max-width: 540px) {
      padding: 10rem;
    }
  }

  .nextPrev {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    display: flex;
    justify-content: space-between;
    pointer-events: none;

    @media (max-width: 540px) {
      position: relative;
      justify-content: end;
      margin-top: 10rem;
    }
    button {
      color: var(--border);
      pointer-events: auto;
    }
  }

  .dates {
    margin-bottom: 5rem;
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    font-size: 10rem;
    justify-items: center;
    font-weight: bold;
  }
  .date {
    padding: 4rem 5rem;
    display: inline-block;
    border-radius: 5rem;
  }
  .date:nth-child(7n) {
    color: var(--deepblue);
  }
  .date:nth-child(7n + 1) {
    color: var(--main);
  }

  .days {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    justify-items: center;
    font-size: 10rem;
    row-gap: 5rem;
  }
  .days span {
    padding: 4rem 5rem;
    display: inline-block;
    border-radius: 5rem;
    cursor: pointer;
  }
  .days .todayDate {
    background: var(--bg);
    color: var(--white);
  }
  .days .nextMonth {
    opacity: 0.3;
  }
  .day:nth-child(7n) {
    color: var(--deepblue);
  }
  .day:nth-child(7n + 1) {
    color: var(--main);
  }
`;

const ListContainer = styled.div`
  width: 100%;
  height: 100%;

  .list-wrap {
    overflow-y: scroll;
    max-height: 100rem;
  }

  .list {
    margin-top: 20rem;
    padding-left: 20rem;
    position: relative;
  }
  .list:before {
    content: "-";
    position: absolute;
    left: 0;
    top: 0;
  }
`;

class Calendar extends React.Component {
  state = {
    date: new Date(),
    selectedDate: new Date(),
    inputValue: "",
    submittedValues: [],
  };
  handleInputChange = (event) => {
    this.setState({
      inputValue: event.target.value,
    });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { inputValue, submittedValues } = this.state;

    // Add the input value to the submittedValues array
    this.setState({
      submittedValues: [...submittedValues, inputValue],
      inputValue: "",
    });
  };
  goToPreviousMonth = () => {
    const { date } = this.state;
    this.setState({
      date: new Date(date.getFullYear(), date.getMonth() - 1),
    });
  };

  goToNextMonth = () => {
    const { date } = this.state;
    this.setState({
      date: new Date(date.getFullYear(), date.getMonth() + 1),
    });
  };

  isToday = (date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };
  componentDidMount() {
    gsap.fromTo(
      ".this-month-btn",
      { scale: 1 },
      { scale: 1.2, repeat: -1, duration: 1, yoyo: true, ease: "bounce" }
    );
  }
  render() {
    const { date, selectedDate } = this.state;
    const { inputValue, submittedValues } = this.state;

    const year = date.getFullYear();
    const month = date.getMonth();
    //month + 1 == next month so .getDate() will be last date on the month
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    //ex) it's June, junt 1st is Thursday in 2023, thursday index is 4. the firstDay returns 4
    const firstDay = new Date(year, month, 1).getDay();

    //make array of 'days' which contains each days of each month
    const days = [
      ...Array(firstDay).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    return (
      <>
        <TextContainer>
          <div className="title">
            {selectedDate && (
              <>
                {`${selectedDate.toLocaleString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })} `}
                <button className="this-month-btn">🧡</button>
              </>
            )}
          </div>
          <form onSubmit={this.handleSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={this.handleInputChange}
            />
            <button type="submit">
              <span className="gradient"></span>
              <span className="transition"></span>
              <span className="label">Submit</span>
            </button>
          </form>

          <CalendarContainer>
            <div className="calendar">
              <div className="dates">
                <div className="date">S</div>
                <div className="date">M</div>
                <div className="date">T</div>
                <div className="date">W</div>
                <div className="date">T</div>
                <div className="date">F</div>
                <div className="date">S</div>
              </div>
              {/* <div className="days">{renderedDates}</div> */}
              {Array.from(
                { length: Math.ceil(days.length / 7) },
                (_, i) => i * 7
              ).map((weekStart, index) => (
                <div key={index} className="days">
                  {days.slice(weekStart, weekStart + 7).map((day, index) => (
                    <span
                      key={index}
                      onClick={() =>
                        this.setState({
                          selectedDate: new Date(year, month, day),
                        })
                      }
                      className={
                        this.isToday(new Date(year, month, day))
                          ? "todayDate"
                          : ""
                      }
                    >
                      {day}
                    </span>
                  ))}
                </div>
              ))}
              <div className="nextPrev">
                <button onClick={this.goToPreviousMonth}>
                  <FaAngleLeft />
                </button>
                <button onClick={this.goToNextMonth}>
                  <FaAngleRight />
                </button>
              </div>
            </div>
          </CalendarContainer>
        </TextContainer>

        <ListContainer>
          <p>Previous diary...</p>
          <div className="list-wrap">
            {submittedValues.map((value, index) => (
              <div className="list" key={index}>
                {value}
                {selectedDate && (
                  <>
                    {" "}
                    {selectedDate.toLocaleString("en-US", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </>
                )}
              </div>
            ))}
          </div>
        </ListContainer>
      </>
    );
  }
}

export default Calendar;
