import styled from "styled-components";
const TodayContainer = styled.ul`
  text-align: center;
  height: 16rem;

  @media (max-width: 340px){
    font-size:12rem;
  }

  li {
    display: inline-block;
    position: relative;
    padding: 0 10rem;
  }

  li:first-child::after {
    content: "";
    width: 1rem;
    height: 16rem;
    background: var(--border);
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;
const Today = () => {
  return (
    <>
      <TodayContainer>
        <li>Today : 25487</li>
        <li>
          <select name="status" id="status">
            <option value="">💗</option>
            <option value="">🧡</option>
            <option value="">💛</option>
          </select>
        </li>
      </TodayContainer>
    </>
  );
};

export default Today;
