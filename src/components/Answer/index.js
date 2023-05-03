import React from "react";
import { AnswerContent, AnswerTitle } from "./styled";

const Answer = ({ answer }) => {
  return (
      <AnswerTitle>
        <AnswerContent>{answer}</AnswerContent>
      </AnswerTitle>
  );
};

export default Answer;
