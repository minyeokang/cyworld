import { Link } from "react-router-dom";
import styled from "styled-components";

const TitleContainer = styled.ul`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16rem;
  height: 16rem;
  
  li:last-child a {
    color: var(--darkgray);
  }
`;

const Title = () => {
  return (
    <TitleContainer>
      <li>title</li>
      <li>
        <Link to="/">www.fakecyworld.com/minyeo</Link>
      </li>
    </TitleContainer>
  );
};

export default Title;
