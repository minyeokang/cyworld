import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Gnb = styled.ul`
  position: absolute;
  top: 20rem;
  right: 0;
  transform: translateX(100%);

  @media (max-width: 540px){
    right: auto; 
    left: 0;
    top:5%;
    transform: translateX(0);
    width: 100%;
    text-align: center;
  }

  li{
    @media (max-width: 540px){
      display: inline-block;
      margin-right: 10rem;
    }
  }

  li a {
    display: block;
    padding: 7rem;
    margin-bottom: 3rem;
    background: var(--main);
    border: 1rem solid var(--border);
    border-radius: 0 5rem 5rem 0;
    border-left: 0;
    font-size: 14rem;
    color: var(--white);
    text-align: center;

    @media (max-width: 540px){
      font-size: 12rem;
      border-left: 1rem solid var(--border);
      border-radius: 5rem;
    }
  }

  li a.active {
    background: var(--white);
    color: #000;
  }
`;

const Nav = () => {
  return (
    <Gnb>
      <li>
          <NavLink to="/" activeclassname="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/diary">Diary</NavLink>
        </li>
        <li>
          <NavLink to="/photo">Photo</NavLink>
        </li>
        <li>
          <NavLink to="/Comment">Comment</NavLink>
        </li>
    </Gnb>
  );
};

export default Nav;
