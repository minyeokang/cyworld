import styled from "styled-components";
import { Link } from "react-router-dom";

const UpdatedNewsContainer = styled.div`
  h2 {
    font-size: 13px;
    color: var(--mint);
    border-bottom: 1px solid var(--border);
    padding-bottom: 5px;
  }

  ul {
    margin-top: 5px;
  }

  ul li {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20px;
    margin-bottom: 5px;
    font-size: 14px;

    &::before {
      content: "📌";
      width: 10px;
      height: 10px;
      position: absolute;
      left: 1px;
      top: 6px;
      font-size: 10px;
    }
  }

  .tag {
    display: inline-block;
    border-radius: 5px;
    color: #fff;
    font-size: 13px;
    padding: 3px;
    margin-right: 5px;

    &.blue {
      background: var(--blue);
    }

    &.red {
      background: var(--red);
    }

    &.yellow {
      background: var(--yellow);
    }
  }

  .date {
    font-size: 13px;
    color: var(--darkgray);
  }
`;

const News = () => {
  return (
    <UpdatedNewsContainer>
          <h2>updated news</h2>
          <ul>
            <li>
              <Link to="/diary">
                <span className="tag blue">다이어리</span>
                diary title
              </Link>
              <span className="date">2022.12.26</span>
            </li>
            <li>
              <Link to="/photo">
                <span className="tag red">사진첩</span>
                photo title
              </Link>
              <span className="date">2022.12.26</span>
            </li>
            <li>
              <Link to="/comment">
                <span className="tag yellow">방명록</span>
                comment title
              </Link>
              <span className="date">2022.12.26</span>
            </li>
          </ul>
    </UpdatedNewsContainer>
  )
}

export default News