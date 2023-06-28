/* eslint-disable no-unused-vars */
import React from "react";
import Calendar from "../components/Calendar";
import styled from "styled-components";

const DiaryContainer = styled.div`
  display: grid;
  grid-template-rows: 2fr 1fr;
  row-gap: 20rem;
  height: 100vh;
  max-height: 370rem;
`;

const Diary = () => {
  return (
    <>
    <DiaryContainer>

      <Calendar />
    </DiaryContainer>
    </>
  );
};

export default Diary;
