import parse from "html-react-parser";
import React, { useState } from "react";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

import {
    QuestionAnswer,
    QuestionAnswerWrapper,
    QuestionButton,
    QuestionHighlight,
    QuestionIcon,
    QuestionItem,
    QuestionUrl
} from "./styled";

const RelatedQuestionsItem = ({ relatedQuestion }) => {
  const [toogle, setToogle] = useState(0);
  const {
    question,
    answer,
    highlight,
    extra_fields: { title, url },
  } = relatedQuestion;

  const formattedHighlight = `"... ${highlight} ..."`;

  return (
    <QuestionItem>
      <QuestionButton onClick={() => setToogle(toogle ? 0 : 1)}>
        {question}
        <QuestionIcon data-toogle={toogle}>
          {toogle ? <FaAngleUp /> : <FaAngleDown />}
        </QuestionIcon>
      </QuestionButton>
      {!!toogle && (
        <QuestionAnswerWrapper>
          <QuestionAnswer>{answer}</QuestionAnswer>
          <QuestionUrl href={url}>
            <div>{title}</div>
          </QuestionUrl>
          <QuestionHighlight>{parse(formattedHighlight)}</QuestionHighlight>
        </QuestionAnswerWrapper>
      )}
    </QuestionItem>
  );
};

export default RelatedQuestionsItem;
