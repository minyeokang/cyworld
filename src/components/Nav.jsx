import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Gnb = styled.ul`
  position: absolute;
  top: 20px;
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
      margin-right: 10px;
    }
  }

  li a {
    display: block;
    padding: 7px;
    margin-bottom: 3px;
    background: var(--main);
    border: 1px solid var(--border);
    border-radius: 0 5px 5px 0;
    border-left: 0;
    font-size: 14px;
    color: var(--white);
    text-align: center;

    @media (max-width: 540px){
      font-size: 12px;
      border-left: 1px solid var(--border);
      border-radius: 5px;
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
