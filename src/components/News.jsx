import styled from "styled-components";
import { Link } from "react-router-dom";

const UpdatedNewsContainer = styled.div`
  h2 {
    font-size: 13rem;
    color: var(--mint);
    border-bottom: 1rem solid var(--border);
    padding-bottom: 5rem;
  }

  ul {
    margin-top: 5rem;
  }

  ul li {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-left: 20rem;
    margin-bottom: 5rem;
    font-size: 14rem;

    &::before {
      content: "📌";
      width: 10rem;
      height: 10rem;
      position: absolute;
      left: 1rem;
      top: 6rem;
      font-size: 10rem;
    }
  }

  .tag {
    display: inline-block;
    border-radius: 5rem;
    color: #fff;
    font-size: 13rem;
    padding: 3rem;
    margin-right: 5rem;

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
    font-size: 13rem;
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