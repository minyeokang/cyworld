import miffyWithBear from "../assets/imgs/miffyWithBear.png";
import styled from "styled-components";

const ProfileContainer = styled.div`
  text-align: center;
  margin: 10rem 0 20rem;

  div {
    clip-path: circle(70rem at center);
    display: inline-block;
    max-width: 140rem;

    @media (max-width: 768px){
      clip-path: circle(50rem at center);
      max-width: 100rem;
    }
  }

  div img {
    width: 100%;
    display: block;
    height: auto;
    background: wheat;
    object-fit: cover;
    aspect-ratio: 1;
  }
`;

const BioContainer = styled.div`
  padding-top: 25rem;
  position: relative;

  @media (max-width: 540px){
    padding-top: 15rem;
  }

  &::before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 1px;
    background: var(--border);
  }

  p {
    margin-bottom: 12rem;
    line-height: 1.3;
  }

  p:last-of-type {
    margin-bottom: 0;
  }

`;

const Profile = () => {
  return (
    <>
      <ProfileContainer>
        <div>
          <img src={miffyWithBear} alt="" />
        </div>
      </ProfileContainer>

      <BioContainer>
        <p>
          Welcomeeeee <br /> to my world 😉
        </p>
        <p>Thank you for visiting 💕</p>
        <p>
          Make sure you explore! move miffy and click all the menus and news
        </p>
      </BioContainer>
     
    </>
  );
};

export default Profile;
