import styled, { keyframes } from 'styled-components';

const spinnerAnimation = keyframes`
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
`;

export const StyledLoader = styled.div`
    img {
        width: 125px;
        display: block;
        margin-bottom: 10px;
    }
    animation: ${spinnerAnimation} 1s infinite alternate;
    height: 150px;
    width: 100%;
    text-align: center;
    font-size: 18px;
`;
