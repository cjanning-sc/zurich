import styled from "styled-components";

const QuestionItem = styled.li``;

const QuestionButton = styled.button`
    background-color: unset;
    font-size: 16px;
    color: #000;
    text-align: left;
    font-weight: 700;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding: 18px 8px 18px 0px;
    cursor: pointer;
    border: none;
    border-top: 1px solid #ecedef;
`;

const QuestionIcon = styled.div`
    cursor: pointer;
    float: right;

    svg {
        height: 20px;
        width: 20px;
    }
`;

const QuestionAnswerWrapper = styled.div``;

const QuestionAnswer = styled.div`
    padding: 0px 8px 18px 0px;
`;

const QuestionUrl = styled.a`
    div {
        color: #6c7ac9;
        font-weight: 600;  
        padding: 0px 8px 5px 0px;
    }
`;

const QuestionHighlight = styled.div`
    font-size: 14px;
    font-style: italic;
    padding: 0px 8px 18px 0px;
`;

export {
    QuestionItem,
    QuestionButton,
    QuestionIcon,
    QuestionAnswerWrapper,
    QuestionAnswer,
    QuestionUrl,
    QuestionHighlight,
};

