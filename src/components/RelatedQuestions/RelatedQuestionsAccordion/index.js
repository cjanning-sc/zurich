import React, { useContext } from "react";
import { SearchCtx } from "../../../hooks/SearchProvider";
import RelatedQuestionsHeader from "../RelatedQuestionsHeader";
import AccordionItem from "../RelatedQuestionsItem";
import { StyledList } from "./styled";

const RelatedQuestionsAccordion = () => {
    const searchCtx = useContext(SearchCtx);
    // @ts-ignore
    const { relatedQuestions } = searchCtx;

    if(!relatedQuestions.length)
        return null;

    return (
        <>
            <RelatedQuestionsHeader></RelatedQuestionsHeader>
            <StyledList>
                {relatedQuestions.map((relatedQuestion, index) => (
                <AccordionItem key={index} relatedQuestion={relatedQuestion} />
                ))}
            </StyledList>
        </>
  );
};

export default RelatedQuestionsAccordion;
